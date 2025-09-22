import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function Playlist() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [playedIndices, setPlayedIndices] = useState(new Set());
  const [commentLikes, setCommentLikes] = useState({});
  
  const audioRef = useRef(null);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setError(null);
      const { data, error } = await supabase.from('songs').select('*').order('created_at', { ascending: true });
      if (error) {
        console.error('Error fetching songs:', error);
        setError('Failed to load songs');
        return;
      }
      if (data && data.length > 0) {
        setSongs(data);
        setCurrentSong(data[0]);
      } else {
        setError('No songs available');
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
      setError('Failed to load songs');
    }
  };

  const getPublicUrl = (path, bucket = 'pli5t-songs') => {
    if (!path) {
      console.error('No path provided');
      return null;
    }
    try {
      const { data, error } = supabase.storage.from(bucket).getPublicUrl(path);
      if (error) {
        console.error('Error getting public URL:', error);
        return null;
      }
      return data.publicUrl;
    } catch (error) {
      console.error('Error in getPublicUrl:', error);
      return null;
    }
  };

  const handlePlayPause = async () => {
    if (!currentSong) {
      setError('No song selected');
      return;
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setError(null);
        try {
          const audioUrl = getPublicUrl(currentSong.song_path);
          if (!audioUrl) {
            throw new Error('Could not get audio URL');
          }
          if (audioRef.current.src !== audioUrl) {
            audioRef.current.src = audioUrl;
            await new Promise((resolve, reject) => {
              audioRef.current.onloadedmetadata = resolve;
              audioRef.current.onerror = reject;
            });
          }
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing audio:', error);
          setError('Failed to play audio');
          setIsPlaying(false);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  const playSong = async (song) => {
    setCurrentSong(song);
    setIsLoading(true);
    setError(null);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      try {
        const audioUrl = getPublicUrl(song.song_path);
        if (!audioUrl) {
          throw new Error('Could not get audio URL');
        }
        audioRef.current.src = audioUrl;
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing song:', error);
        setError('Failed to play song');
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && audioRef.current.duration !== duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current && duration) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const progressWidth = rect.width;
      const newTime = (clickPosition / progressWidth) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRandomSongIndex = () => {
    if (songs.length === 0) return 0;
    if (playedIndices.size >= songs.length) {
      setPlayedIndices(new Set());
    }
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (playedIndices.has(randomIndex));
    setPlayedIndices(prev => new Set([...prev, randomIndex]));
    return randomIndex;
  };

  const nextSong = () => {
    if (songs.length > 0 && currentSong) {
      let nextIndex;
      if (shuffle) {
        nextIndex = getRandomSongIndex();
      } else {
        const currentIndex = songs.findIndex(song => song.id === currentSong.id);
        nextIndex = (currentIndex + 1) % songs.length;
      }
      playSong(songs[nextIndex]);
    }
  };

  const prevSong = () => {
    if (songs.length > 0 && currentSong) {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      playSong(songs[prevIndex]);
    }
  };

  const handleShuffle = () => {
    setShuffle(!shuffle);
    setPlayedIndices(new Set());
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  const handleEnded = () => {
    if (repeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      nextSong();
    }
  };

  const toggleCommentLike = (id) => setCommentLikes(prev => ({...prev, [id]: !prev[id]}));
  
  return (
    <div>
      <Head>
        <title>Playlist - Shamana</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <style jsx global>{`
          *{margin:0;padding:0;box-sizing:border-box;}
          body{font-family:'Work Sans',sans-serif;background:#000;color:#fff;letter-spacing:-0.5px;max-width:1600px;margin:0 auto;padding-bottom:100px;}
          a{text-decoration:none;color:inherit;}
          .container{max-width:1200px;margin:0 auto;padding:0 15px;}
          .header{display:flex;align-items:center;justify-content:space-between;padding:20px;position:relative;max-width:1600px;margin:0 auto;}
          .logo img{height:100%;max-width:180px;}
          .nav{display:flex;gap:30px;}
          .nav a{font-weight:500;position:relative;}
          .nav a.active:after{content:'';position:absolute;bottom:-5px;left:0;width:100%;height:2px;background:#fff;}
          .search-bar{flex:1;max-width:400px;margin:0 20px;position:relative;}
          .search-bar input{width:100%;padding:8px 15px;border-radius:20px;border:none;background:#222;color:#fff;}
          .search-bar i{position:absolute;right:15px;top:50%;transform:translateY(-50%);color:#999;}
          .actions{display:flex;align-items:center;gap:15px;position:relative;}
          .upload-btn{display:flex;align-items:center;gap:5px;font-weight:500;cursor:pointer;}
          .user-account{display:flex;align-items:center;gap:8px;cursor:pointer;position:relative;}
          .user-account i:first-child{font-size:24px;color:#fff;}
          .user-account i:last-child{font-size:14px;color:#ccc;}
          .dropdown-content{display:${showDropdown?'block':'none'};position:absolute;top:100%;right:0;background-color:#1a1a1a;min-width:160px;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);z-index:1000;border-radius:8px;overflow:hidden;margin-top:10px;}
          .dropdown-item{display:flex;align-items:center;gap:10px;padding:12px 16px;color:#fff;font-size:14px;transition:background-color 0.2s;}
          .dropdown-item:hover{background-color:#6a11cb;}
          .dropdown-item i{font-size:14px;width:20px;}
          .playlist-banner{position:relative;height:300px;border-radius:12px;overflow:hidden;margin:40px 0;display:flex;align-items:flex-end;padding:40px;background:linear-gradient(135deg,#6a11cb,#2575fc);}
          .playlist-info{position:relative;z-index:2;width:100%;}
          .playlist-title{font-size:2.5rem;font-weight:700;margin-bottom:10px;}
          .playlist-description{font-size:1.1rem;margin-bottom:20px;opacity:0.9;max-width:600px;}
          .playlist-stats{display:flex;gap:20px;font-size:0.9rem;color:#ccc;}
          .playlist-stat{display:flex;align-items:center;gap:5px;}
          .playlist-content{display:flex;gap:30px;margin-bottom:60px;}
          .playlist-main{flex:3;display:flex;flex-direction:column;gap:30px;}
          .playlist-sidebar{flex:1;display:flex;flex-direction:column;gap:30px;}
          .playlist-box{background:#111;border-radius:12px;padding:20px;}
          .comment-input{display:flex;gap:10px;margin-bottom:20px;}
          .commenter-avatar{width:40px;height:40px;border-radius:50%;object-fit:cover;flex-shrink:0;}
          .comment-input-field{flex:1;background:#222;border:none;border-radius:20px;padding:12px 15px;color:#fff;font-family:inherit;}
          .comment-input-field:focus{outline:none;}
          .action-buttons{display:flex;gap:15px;margin-bottom:20px;}
          .action-btn{display:flex;align-items:center;gap:5px;background:transparent;border:none;color:#ccc;cursor:pointer;font-size:0.9rem;transition:color 0.2s;}
          .action-btn:hover{color:#fff;}
          .action-btn.active{color:#6a11cb;}
          .song-list{display:flex;flex-direction:column;gap:10px;margin-bottom:25px;}
          .song-item{display:flex;align-items:center;gap:15px;padding:10px;border-radius:8px;transition:background 0.2s;cursor:pointer;}
          .song-item:hover{background:#1a1a1a;}
          .song-number{color:#6a11cb;font-weight:500;width:25px;text-align:center;}
          .song-info{flex:1;}
          .song-title{font-weight:500;margin-bottom:3px;}
          .song-artist{font-size:0.85rem;color:#999;}
          .song-duration{color:#999;font-size:0.9rem;margin:0 15px;}
          .song-actions{display:flex;gap:10px;}
          .song-action-btn{background:transparent;border:none;color:#999;cursor:pointer;font-size:0.9rem;}
          .song-action-btn:hover{color:#fff;}
          .comments-section{margin-top:25px;border-top:1px solid #222;padding-top:20px;}
          .comments-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;}
          .comments-title{font-size:1.2rem;font-weight:600;}
          .comments-filter{background:transparent;border:1px solid #333;color:#ccc;padding:5px 10px;border-radius:15px;font-size:0.8rem;cursor:pointer;}
          .comment{display:flex;gap:12px;padding:15px 0;border-bottom:1px solid #222;}
          .comment:last-child{border-bottom:none;}
          .comment-avatar{width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0;}
          .comment-content{flex:1;}
          .comment-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;}
          .commenter-name{font-weight:500;}
          .comment-time{font-size:0.8rem;color:#999;}
          .comment-text{font-size:0.95rem;color:#ccc;line-height:1.4;margin-bottom:8px;}
          .comment-actions{display:flex;gap:15px;}
          .comment-action{display:flex;align-items:center;gap:5px;background:transparent;border:none;color:#999;cursor:pointer;font-size:0.8rem;}
          .comment-action:hover{color:#fff;}
          .comment-action.active{color:#6a11cb;}
          .playlist-addition-box{background:#111;border-radius:12px;padding:20px;}
          .box-title{font-size:1.2rem;font-weight:600;margin-bottom:15px;}
          .song-queue{margin-bottom:25px;}
          .queue-item{display:flex;align-items:center;gap:10px;padding:8px 0;}
          .queue-item:not(:last-child){border-bottom:1px solid #222;}
          .queue-info{flex:1;}
          .queue-title{font-size:0.9rem;font-weight:500;}
          .queue-artist{font-size:0.8rem;color:#999;}
          .queue-duration{color:#999;font-size:0.8rem;}
          .avatar-group{display:flex;margin:15px 0 25px;}
          .avatar{width:35px;height:35px;border-radius:50%;object-fit:cover;border:2px solid #111;margin-left:-10px;}
          .avatar:first-child{margin-left:0;}
          .avatar-more{width:35px;height:35px;border-radius:50%;background:#6a11cb;display:flex;align-items:center;justify-content:center;font-size:0.8rem;margin-left:-10px;}
          .creator-playlists{margin-top:25px;}
          .creator-playlist{display:flex;gap:10px;padding:10px 0;}
          .creator-playlist:not(:last-child){border-bottom:1px solid #222;}
          .playlist-thumb-small{width:50px;height:50px;border-radius:8px;background:linear-gradient(135deg,#6a11cb,#2575fc);flex-shrink:0;}
          .playlist-info-small{flex:1;}
          .playlist-name-small{font-size:0.9rem;font-weight:500;margin-bottom:3px;}
          .playlist-songs-small{font-size:0.8rem;color:#999;}
          .player-bar{position:fixed;bottom:0;left:0;width:100%;background:linear-gradient(90deg, rgba(30,30,30,0.95), rgba(50,50,50,0.95));backdrop-filter:blur(10px);padding:20px;z-index:900;display:flex;align-items:center;justify-content:space-between;}
          .player-info{flex:1;max-width:30%;display:flex;align-items:center;gap:12px;}
          .player-image{width:48px;height:48px;border-radius:6px;object-fit:cover;background:#333;display:flex;align-items:center;justify-content:center;}
          .player-image i{color:#666;font-size:20px;}
          .player-details{flex:1;min-width:0;}
          .song-name{font-weight:600;font-size:0.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
          .artist-name{font-size:0.8rem;color:#ccc;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
          .player-controls{display:flex;align-items:center;gap:15px;}
          .player-controls button{background:none;border:none;color:#fff;font-size:16px;cursor:pointer;opacity:0.8;transition:opacity 0.2s;}
          .player-controls button:hover{opacity:1;}
          .player-controls button.active{color:#6a11cb;}
          .player-controls .play-pause{font-size:28px;position:relative;}
          .loading-spinner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:20px;height:20px;border:2px solid transparent;border-top:2px solid #6a11cb;border-radius:50%;animation:spin 1s linear infinite;}
          @keyframes spin{0%{transform:translate(-50%,-50%) rotate(0deg);}100%{transform:translate(-50%,-50%) rotate(360deg);}}
          .player-progress{flex:2;max-width:40%;display:flex;align-items:center;gap:10px;}
          .progress-bar{flex:1;height:4px;background:rgba(255,255,255,0.3);border-radius:2px;cursor:pointer;position:relative;overflow:hidden;}
          .progress{position:absolute;height:100%;background:#fff;border-radius:2px;width:${duration?(currentTime/duration)*100:0}%;transition:width 0.1s ease;}
          .time{font-size:0.7rem;color:#ccc;min-width:35px;}
          .time:first-child{text-align:right;}
          .volume-control{display:flex;align-items:center;gap:8px;margin-left:15px;}
          .volume-control i{font-size:16px;color:#ccc;}
          .volume-slider{width:80px;height:4px;background:rgba(255,255,255,0.3);border-radius:2px;outline:none;-webkit-appearance:none;}
          .volume-slider::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:#fff;cursor:pointer;}
          .volume-slider::-moz-range-thumb{width:12px;height:12px;border-radius:50%;background:#fff;cursor:pointer;border:none;}
          .player-actions{flex:1;max-width:30%;display:flex;justify-content:flex-end;gap:15px;position:relative;}
          .player-actions button{background:none;border:none;color:#fff;font-size:16px;cursor:pointer;opacity:0.8;transition:opacity 0.2s;}
          .player-actions button:hover{opacity:1;}
          .player-actions button.active{color:#6a11cb;}
          .playlist-popup{position:absolute;bottom:100%;right:0;background:#1a1a1a;border-radius:12px;padding:15px;min-width:300px;max-height:400px;overflow-y:auto;box-shadow:0 -4px 20px rgba(0,0,0,0.5);border:1px solid #333;margin-bottom:10px;}
          .playlist-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #333;}
          .playlist-header h3{font-size:1.1rem;font-weight:600;}
          .close-playlist{background:none;border:none;color:#ccc;font-size:18px;cursor:pointer;}
          .playlist-song-item{display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;cursor:pointer;transition:background 0.2s;}
          .playlist-song-item:hover{background:#2a2a2a;}
          .playlist-song-item.active{background:#6a11cb;}
          .song-thumbnail{width:40px;height:40px;border-radius:4px;object-fit:cover;background:#333;display:flex;align-items:center;justify-content:center;}
          .song-thumbnail i{color:#666;font-size:16px;}
          .song-info{flex:1;min-width:0;}
          .song-info .song-title{font-weight:500;font-size:0.9rem;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
          .song-info .song-artist{font-size:0.8rem;color:#ccc;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
          .mobile-nav{display:none;position:fixed;bottom:0;left:0;width:100%;background-color:#111;z-index:1000;padding:10px 0;}
          .mobile-nav-items{display:flex;justify-content:space-around;}
          .mobile-nav-item{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:12px;}
          .mobile-nav-item i{font-size:18px;}
          @media (max-width:1024px){.logo img{max-width:150px;}.playlist-banner{height:250px;padding:30px;}.playlist-title{font-size:2rem;}}
          @media (max-width:768px){
            .nav,.search-bar{display:none;}
            .logo img{max-width:120px;}
            .mobile-nav{display:block;}
            .player-bar{bottom:60px;background:linear-gradient(90deg, rgba(30,30,30,0.95), rgba(50,50,50,0.95));backdrop-filter:blur(15px);margin:10px;border-radius:30px;width:calc(100% - 20px);left:10px;padding:15px;flex-direction:row;align-items:center;gap:10px;}
            .player-info{max-width:none;flex:1;text-align:left;order:2;}
            .player-controls{order:1;gap:0;flex:0 0 auto;}
            .player-controls .shuffle,.player-controls .repeat,.player-controls .step-backward,.player-controls .step-forward{display:none;}
            .player-controls .play-pause{font-size:24px;margin-right:10px;}
            .player-progress{display:none;}
            .volume-control{display:none;}
            .player-actions{max-width:none;order:3;justify-content:flex-end;gap:15px;position:static;flex:0 0 auto;}
            .playlist-content{flex-direction:column;}
            .playlist-main,.playlist-sidebar{width:100%;}
            .playlist-banner{height:200px;margin:20px 0;padding:20px;}
            .playlist-title{font-size:1.8rem;}
            .upload-btn{background:#555;padding:8px;border-radius:50%;}
            .upload-btn span{display:none;}
            .user-account i:last-child{display:none;}
            .dropdown-content{right:-20px;}
            .playlist-popup{right:-50px;min-width:250px;}
          }
        `}</style>
      </Head>

      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleEnded} 
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }} 
        onError={(e) => {
          console.error('Audio error:', e);
          setError('Audio playback error');
        }}
      />

      <header>
        <div className="header">
          <a href="#" className="logo"><img src="https://res.cloudinary.com/dqhawdcol/image/upload/v1758379129/hkyfzlvauys6paoqo6on.png" alt="Shamana"/></a>
          <nav className="nav">
            <a href="#">Home</a>
            <a href="#">Trybe</a>
            <a href="#" className="active">Library</a>
          </nav>
          <div className="search-bar">
            <input type="text" placeholder="Search..."/>
            <i className="fas fa-search"></i>
          </div>
          <div className="actions">
            <div className="upload-btn">
              <i className="fas fa-cloud-upload-alt"></i>
              <span>Upload</span>
            </div>
            <div className="user-account" onClick={toggleDropdown}>
              <i className="fas fa-user-circle"></i>
              <i className="fas fa-chevron-down"></i>
              <div className="dropdown-content">
                <a href="#" className="dropdown-item"><i className="fas fa-user"></i><span>Profile</span></a>
                <a href="#" className="dropdown-item"><i className="fas fa-award"></i><span>Rewards</span></a>
                <a href="#" className="dropdown-item"><i className="fas fa-sign-out-alt"></i><span>Logout</span></a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="playlist-banner">
            <div className="playlist-info">
              <h1 className="playlist-title">Indie Rock Essentials</h1>
              <p className="playlist-description">The best indie rock tracks that defined a generation. Curated by Alex Turner.</p>
              <div className="playlist-stats">
                <div className="playlist-stat"><i className="fas fa-music"></i><span>24 songs</span></div>
                <div className="playlist-stat"><i className="fas fa-clock"></i><span>1h 42m</span></div>
                <div className="playlist-stat"><i className="fas fa-heart"></i><span>2.4K likes</span></div>
                <div className="playlist-stat"><i className="fas fa-play"></i><span>45.7K plays</span></div>
              </div>
            </div>
          </section>

          <section className="playlist-content">
            <div className="playlist-main">
              <div className="playlist-box">
                <div className="comment-input">
                  <img src="https://res.cloudinary.com/dqhawdcol/image/upload/v1758202400/e9ifs1tewfgemgxfc5kc.jpg" alt="You" className="commenter-avatar" />
                  <input type="text" className="comment-input-field" placeholder="Write a comment..." />
                </div>
                <div className="action-buttons">
                  <button className={`action-btn ${isPlaying ? 'active' : ''}`} onClick={handlePlayPause}>
                    <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                  <button className={`action-btn ${isLiked ? 'active' : ''}`} onClick={handleLike}>
                    <i className={`${isLiked ? 'fas' : 'far'} fa-heart`}></i>
                    <span>Like</span>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-share-alt"></i>
                    <span>Share</span>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-ellipsis-h"></i>
                    <span>More</span>
                  </button>
                </div>
                <div className="song-list">
                  {songs.map((song, index) => (
                    <div key={song.id} className="song-item" onClick={() => playSong(song)}>
                      <span className="song-number">{index + 1}</span>
                      <div className="song-info">
                        <div className="song-title">{song.title}</div>
                        <div className="song-artist">{song.author}</div>
                      </div>
                      <span className="song-duration">3:45</span>
                      <div className="song-actions">
                        <button className="song-action-btn"><i className="far fa-heart"></i></button>
                        <button className="song-action-btn"><i className="fas fa-plus"></i></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="comments-section">
                  <div className="comments-header">
                    <h3 className="comments-title">Comments</h3>
                    <select className="comments-filter">
                      <option>Newest first</option>
                      <option>Most liked</option>
                    </select>
                  </div>
                  {[
                    {id:1, name:'Sarah Chen', time:'2 hours ago', text:'This playlist is absolutely fire! The transition between tracks is seamless. Perfect for my morning commute.', likes:24},
                    {id:2, name:'Marcus Brown', time:'5 hours ago', text:'Needs more Arctic Monkeys! Maybe add "R U Mine?" to the mix? Otherwise solid playlist.', likes:12},
                    {id:3, name:'Jamal Williams', time:'1 day ago', text:'Discovered so many new artists from this playlist. That MGMT track is now on repeat!', likes:42},
                    {id:4, name:'Elena Rodriguez', time:'2 days ago', text:'The sequencing is perfect! Love how each track flows into the next. This is my go-to playlist for coding sessions.', likes:31}
                  ].map(comment => (
                    <div key={comment.id} className="comment">
                      <img src="https://res.cloudinary.com/dqhawdcol/image/upload/v1758202400/e9ifs1tewfgemgxfc5kc.jpg" alt="User" className="comment-avatar" />
                      <div className="comment-content">
                        <div className="comment-header">
                          <span className="commenter-name">{comment.name}</span>
                          <span className="comment-time">{comment.time}</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                        <div className="comment-actions">
                          <button className={`comment-action ${commentLikes[comment.id] ? 'active' : ''}`} onClick={() => toggleCommentLike(comment.id)}>
                            <i className={`${commentLikes[comment.id] ? 'fas' : 'far'} fa-heart`}></i>
                            <span>{comment.likes + (commentLikes[comment.id] ? 1 : 0)}</span>
                          </button>
                          <button className="comment-action">
                            <i className="far fa-comment"></i>
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="playlist-sidebar">
              <div className="playlist-addition-box">
                <h3 className="box-title">Song Queue</h3>
                <div className="song-queue">
                  {songs.slice(0, 2).map((song, i) => (
                    <div key={song.id} className="queue-item">
                      <div className="queue-info">
                        <div className="queue-title">{i === 0 ? 'Next: ' : 'Then: '}{song.title}</div>
                        <div className="queue-artist">{song.author}</div>
                      </div>
                      <span className="queue-duration">3:45</span>
                    </div>
                  ))}
                </div>

                <h3 className="box-title">Liked By</h3>
                <div className="avatar-group">
                  {[1,2,3].map(i => <img key={i} src="https://res.cloudinary.com/dqhawdcol/image/upload/v1758202400/e9ifs1tewfgemgxfc5kc.jpg" alt="User" className="avatar" />)}
                  <div className="avatar-more">+27</div>
                </div>

                <h3 className="box-title">Contributors</h3>
                <div className="avatar-group">
                  {[1,2].map(i => <img key={i} src="https://res.cloudinary.com/dqhawdcol/image/upload/v1758202400/e9ifs1tewfgemgxfc5kc.jpg" alt="User" className="avatar" />)}
                  <div className="avatar-more">+5</div>
                </div>

                <div className="creator-playlists">
                  <h3 className="box-title">More by Alex Turner</h3>
                  {[
                    {name:'Alternative Classics', songs:'18 songs', likes:'1.2K likes', gradient:'linear-gradient(135deg,#6a11cb,#2575fc)'},
                    {name:'Late Night Vibes', songs:'15 songs', likes:'987 likes', gradient:'linear-gradient(135deg, #ff6b6b, #ff9e6b)'},
                    {name:'Road Trip Mix', songs:'22 songs', likes:'1.5K likes', gradient:'linear-gradient(135deg, #0cebeb, #20e3b2)'}
                  ].map((playlist, i) => (
                    <div key={i} className="creator-playlist">
                      <div className="playlist-thumb-small" style={{background: playlist.gradient}}></div>
                      <div className="playlist-info-small">
                        <div className="playlist-name-small">{playlist.name}</div>
                        <div className="playlist-songs-small">{playlist.songs} • {playlist.likes}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className="player-bar">
        <div className="player-info">
          {currentSong?.image_path ? (
            <img src={getPublicUrl(currentSong.image_path, 'pli5t-images')} alt={currentSong.title} className="player-image"/>
          ) : (
            <div className="player-image">
              <i className="fas fa-music"></i>
            </div>
          )}
          <div className="player-details">
            <div className="song-name">{currentSong?.title || 'No song selected'}</div>
            <div className="artist-name">{currentSong?.author || 'Select a song to play'}</div>
          </div>
        </div>
        <div className="player-controls">
          <button className={`shuffle ${shuffle ? 'active' : ''}`} onClick={handleShuffle}>
            <i className="fas fa-random"></i>
          </button>
          <button className="step-backward" onClick={prevSong}>
            <i className="fas fa-step-backward"></i>
          </button>
          <button className="play-pause" onClick={handlePlayPause} disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <i className={isPlaying ? "fas fa-pause-circle" : "fas fa-play-circle"}></i>
            )}
          </button>
          <button className="step-forward" onClick={nextSong}>
            <i className="fas fa-step-forward"></i>
          </button>
          <button className={`repeat ${repeat ? 'active' : ''}`} onClick={handleRepeat}>
            <i className="fas fa-redo"></i>
          </button>
        </div>
        <div className="player-progress">
          <div className="time">{formatTime(currentTime)}</div>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div className="progress"></div>
          </div>
          <div className="time">{formatTime(duration)}</div>
        </div>
        <div className="volume-control">
          <i className={`fas ${volume === 0 ? 'fa-volume-mute' : volume > 0.5 ? 'fa-volume-up' : 'fa-volume-down'}`}></i>
          <input type="range" className="volume-slider" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        </div>
        <div className="player-actions">
          <button className={`like ${isLiked ? 'active' : ''}`} onClick={handleLike}>
            <i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i>
          </button>
          <button className="playlist" onClick={togglePlaylist}>
            <i className="fas fa-list"></i>
          </button>
          {showPlaylist && (
            <div className="playlist-popup">
              <div className="playlist-header">
                <h3>Playlist</h3>
                <button className="close-playlist" onClick={togglePlaylist}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              {songs.map((song) => (
                <div key={song.id} className={`playlist-song-item ${currentSong?.id === song.id ? 'active' : ''}`} onClick={() => playSong(song)}>
                  {song.image_path ? (
                    <img src={getPublicUrl(song.image_path, 'pli5t-images')} alt={song.title} className="song-thumbnail"/>
                  ) : (
                    <div className="song-thumbnail">
                      <i className="fas fa-music"></i>
                    </div>
                  )}
                  <div className="song-info">
                    <div className="song-title">{song.title}</div>
                    <div className="song-artist">{song.author}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <nav className="mobile-nav">
        <div className="mobile-nav-items">
          <a href="#" className="mobile-nav-item"><i className="fas fa-home"></i><span>Home</span></a>
          <a href="#" className="mobile-nav-item"><i className="fas fa-users"></i><span>Trybe</span></a>
          <a href="#" className="mobile-nav-item"><i className="fas fa-book"></i><span>Library</span></a>
          <a href="#" className="mobile-nav-item"><i className="fas fa-search"></i><span>Search</span></a>
        </div>
      </nav>
    </div>
  );
}
