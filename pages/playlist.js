import Head from 'next/head';
import { useState } from 'react';

export default function Playlist() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});
  
  const togglePlayState = () => setIsPlaying(!isPlaying);
  const toggleLike = () => setLiked(!liked);
  const toggleCommentLike = (id) => setCommentLikes(prev => ({...prev, [id]: !prev[id]}));
  
  return (
    <div>
      <Head>
        <title>Playlist - Shamana</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <style>{`*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Work Sans',sans-serif;background:#000;color:#fff;letter-spacing:-0.5px;max-width:1600px;margin:0 auto;}a{text-decoration:none;color:inherit;}.container{max-width:1200px;margin:0 auto;padding:0 15px;}.header{display:flex;align-items:center;justify-content:space-between;padding:20px;position:relative;max-width:1600px;margin:0 auto;}.logo img{height:100%;max-width:180px;}.nav{display:flex;gap:30px;}.nav a{font-weight:500;position:relative;}.nav a.active:after{content:'';position:absolute;bottom:-5px;left:0;width:100%;height:2px;background:#fff;}.search-bar{flex:1;max-width:400px;margin:0 20px;position:relative;}.search-bar input{width:100%;padding:8px 15px;border-radius:20px;border:none;background:#222;color:#fff;}.search-bar i{position:absolute;right:15px;top:50%;transform:translateY(-50%);color:#999;}.actions{display:flex;align-items:center;gap:15px;}.upload-btn{display:flex;align-items:center;gap:5px;font-weight:500;cursor:pointer;}.user-account{display:flex;align-items:center;gap:5px;cursor:pointer;}.user-account i{font-size:32px;color:#fff;}.playlist-banner{position:relative;height:300px;border-radius:12px;overflow:hidden;margin:40px 0;display:flex;align-items:flex-end;padding:40px;background:linear-gradient(135deg,#6a11cb,#2575fc);}.playlist-info{position:relative;z-index:2;width:100%;}.playlist-title{font-size:2.5rem;font-weight:700;margin-bottom:10px;}.playlist-description{font-size:1.1rem;margin-bottom:20px;opacity:0.9;max-width:600px;}.playlist-stats{display:flex;gap:20px;font-size:0.9rem;color:#ccc;}.playlist-stat{display:flex;align-items:center;gap:5px;}.playlist-content{display:flex;gap:30px;margin-bottom:60px;}.playlist-main{flex:3;display:flex;flex-direction:column;gap:30px;}.playlist-sidebar{flex:1;display:flex;flex-direction:column;gap:30px;}.playlist-box{background:#111;border-radius:12px;padding:20px;}.comment-input{display:flex;gap:10px;margin-bottom:20px;}.commenter-avatar{width:40px;height:40px;border-radius:50%;object-fit:cover;flex-shrink:0;}.comment-input-field{flex:1;background:#222;border:none;border-radius:20px;padding:12px 15px;color:#fff;font-family:inherit;}.comment-input-field:focus{outline:none;}.action-buttons{display:flex;gap:15px;margin-bottom:20px;}.action-btn{display:flex;align-items:center;gap:5px;background:transparent;border:none;color:#ccc;cursor:pointer;font-size:0.9rem;transition:color 0.2s;}.action-btn:hover{color:#fff;}.action-btn.active{color:#6a11cb;}.song-list{display:flex;flex-direction:column;gap:10px;margin-bottom:25px;}.song-item{display:flex;align-items:center;gap:15px;padding:10px;border-radius:8px;transition:background 0.2s;cursor:pointer;}.song-item:hover{background:#1a1a1a;}.song-number{color:#6a11cb;font-weight:500;width:25px;text-align:center;}.song-info{flex:1;}.song-title{font-weight:500;margin-bottom:3px;}.song-artist{font-size:0.85rem;color:#999;}.song-duration{color:#999;font-size:0.9rem;margin:0 15px;}.song-actions{display:flex;gap:10px;}.song-action-btn{background:transparent;border:none;color:#999;cursor:pointer;font-size:0.9rem;}.song-action-btn:hover{color:#fff;}.comments-section{margin-top:25px;border-top:1px solid #222;padding-top:20px;}.comments-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;}.comments-title{font-size:1.2rem;font-weight:600;}.comments-filter{background:transparent;border:1px solid #333;color:#ccc;padding:5px 10px;border-radius:15px;font-size:0.8rem;cursor:pointer;}.comment{display:flex;gap:12px;padding:15px 0;border-bottom:1px solid #222;}.comment:last-child{border-bottom:none;}.comment-avatar{width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0;}.comment-content{flex:1;}.comment-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;}.commenter-name{font-weight:500;}.comment-time{font-size:0.8rem;color:#999;}.comment-text{font-size:0.95rem;color:#ccc;line-height:1.4;margin-bottom:8px;}.comment-actions{display:flex;gap:15px;}.comment-action{display:flex;align-items:center;gap:5px;background:transparent;border:none;color:#999;cursor:pointer;font-size:0.8rem;}.comment-action:hover{color:#fff;}.comment-action.active{color:#6a11cb;}.playlist-addition-box{background:#111;border-radius:12px;padding:20px;}.box-title{font-size:1.2rem;font-weight:600;margin-bottom:15px;}.song-queue{margin-bottom:25px;}.queue-item{display:flex;align-items:center;gap:10px;padding:8px 0;}.queue-item:not(:last-child){border-bottom:1px solid #222;}.queue-info{flex:1;}.queue-title{font-size:0.9rem;font-weight:500;}.queue-artist{font-size:0.8rem;color:#999;}.queue-duration{color:#999;font-size:0.8rem;}.avatar-group{display:flex;margin:15px 0 25px;}.avatar{width:35px;height:35px;border-radius:50%;object-fit:cover;border:2px solid #111;margin-left:-10px;}.avatar:first-child{margin-left:0;}.avatar-more{width:35px;height:35px;border-radius:50%;background:#6a11cb;display:flex;align-items:center;justify-content:center;font-size:0.8rem;margin-left:-10px;}.creator-playlists{margin-top:25px;}.creator-playlist{display:flex;gap:10px;padding:10px 0;}.creator-playlist:not(:last-child){border-bottom:1px solid #222;}.playlist-thumb-small{width:50px;height:50px;border-radius:8px;background:linear-gradient(135deg,#6a11cb,#2575fc);flex-shrink:0;}.playlist-info-small{flex:1;}.playlist-name-small{font-size:0.9rem;font-weight:500;margin-bottom:3px;}.playlist-songs-small{font-size:0.8rem;color:#999;}.player-bar{position:fixed;bottom:0;left:0;width:100%;background:linear-gradient(90deg, rgba(30,30,30,0.95), rgba(50,50,50,0.95));backdrop-filter:blur(10px);padding:20px;z-index:900;display:flex;align-items:center;justify-content:space-between;}.player-info{flex:1;max-width:30%;}.song-name{font-weight:600;font-size:0.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.artist-name{font-size:0.8rem;color:#ccc;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.player-controls{display:flex;align-items:center;gap:15px;}.player-controls button{background:none;border:none;color:#fff;font-size:16px;cursor:pointer;opacity:0.8;transition:opacity 0.2s;}.player-controls button:hover{opacity:1;}.player-controls .play-pause{font-size:28px;}.player-progress{flex:2;max-width:40%;display:flex;align-items:center;gap:10px;}.progress-bar{flex:1;height:4px;background:rgba(255,255,255,0.3);border-radius:2px;cursor:pointer;position:relative;}.progress{position:absolute;height:100%;background:#fff;border-radius:2px;width:30%;}.time{font-size:0.7rem;color:#ccc;min-width:35px;}.time:first-child{text-align:right;}.player-actions{flex:1;max-width:30%;display:flex;justify-content:flex-end;gap:15px;}.player-actions button{background:none;border:none;color:#fff;font-size:16px;cursor:pointer;opacity:0.8;transition:opacity 0.2s;}.player-actions button:hover{opacity:1;}.player-actions button.active{color:#6a11cb;}.mobile-nav{display:none;position:fixed;bottom:0;left:0;width:100%;background:#111;z-index:1000;padding:10px 0;}.mobile-nav-items{display:flex;justify-content:space-around;}.mobile-nav-item{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:12px;}.mobile-nav-item i{font-size:18px;}@media (max-width:1024px){.logo img{max-width:150px;}.playlist-banner{height:250px;padding:30px;}.playlist-title{font-size:2rem;}}@media (max-width:768px){.nav,.search-bar{display:none;}.logo img{max-width:120px;}.mobile-nav{display:block;}.player-bar{bottom:60px;background:linear-gradient(90deg, rgba(30,30,30,0.95), rgba(50,50,50,0.95));backdrop-filter:blur(15px);margin:10px;border-radius:30px;width:calc(100% - 20px);left:10px;padding:15px;flex-direction:row;align-items:center;gap:10px;}.player-info{max-width:none;flex:1;text-align:left;order:2;}.player-controls{order:1;gap:0;flex:0 0 auto;}.player-controls .shuffle,.player-controls .repeat,.player-controls .step-backward,.player-controls .step-forward{display:none;}.player-controls .play-pause{font-size:24px;margin-right:10px;}.player-progress{display:none;}.player-actions{max-width:none;order:3;justify-content:flex-end;gap:15px;position:static;flex:0 0 auto;}.playlist-content{flex-direction:column;}.playlist-main,.playlist-sidebar{width:100%;}.playlist-banner{height:200px;margin:20px 0;padding:20px;}.playlist-title{font-size:1.8rem;}.upload-btn{background:#555;padding:8px;border-radius:50%;}.upload-btn span{display:none;}.user-account i:last-child{display:none;}}`}</style>
      </Head>

      <header>
        <div className="header">
          <a href="#" className="logo"><img src="https://res.cloudinary.com/dqhawdcol/image/upload/v1758201861/y3p2lwz2oq5gwny6ktyu.svg" alt="Shamana" /></a>
          <nav className="nav">
            <a href="#">Home</a>
            <a href="#">Trybe</a>
            <a href="#" className="active">Library</a>
          </nav>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <i className="fas fa-search"></i>
          </div>
          <div className="actions">
            <div className="upload-btn">
              <i className="fas fa-cloud-upload-alt"></i>
              <span>Upload</span>
            </div>
            <div className="user-account">
              <i className="fas fa-user-circle"></i>
              <i className="fas fa-chevron-down"></i>
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
                  <button className={`action-btn ${isPlaying ? 'active' : ''}`} onClick={togglePlayState}>
                    <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                  <button className={`action-btn ${liked ? 'active' : ''}`} onClick={toggleLike}>
                    <i className={`${liked ? 'fas' : 'far'} fa-heart`}></i>
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
                  {[
                    {number:1, title:'Do I Wanna Know?', artist:'Arctic Monkeys', duration:'4:32'},
                    {number:2, title:'Time to Pretend', artist:'MGMT', duration:'4:21'},
                    {number:3, title:'Last Nite', artist:'The Strokes', duration:'3:18'},
                    {number:4, title:'1901', artist:'Phoenix', duration:'3:13'},
                    {number:5, title:'Electric Feel', artist:'MGMT', duration:'3:50'}
                  ].map(song => (
                    <div key={song.number} className="song-item" onClick={() => {
                      document.querySelector('.song-name').textContent = song.title;
                      document.querySelector('.artist-name').textContent = song.artist;
                      setIsPlaying(true);
                    }}>
                      <span className="song-number">{song.number}</span>
                      <div className="song-info">
                        <div className="song-title">{song.title}</div>
                        <div className="song-artist">{song.artist}</div>
                      </div>
                      <span className="song-duration">{song.duration}</span>
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
                  {[
                    {title:'Fluorescent Adolescent', artist:'Arctic Monkeys', duration:'3:03'},
                    {title:'Reptilia', artist:'The Strokes', duration:'3:42'}
                  ].map((song, i) => (
                    <div key={i} className="queue-item">
                      <div className="queue-info">
                        <div className="queue-title">{i === 0 ? 'Next: ' : 'Then: '}{song.title}</div>
                        <div className="queue-artist">{song.artist}</div>
                      </div>
                      <span className="queue-duration">{song.duration}</span>
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
          <div className="song-name">Do I Wanna Know?</div>
          <div className="artist-name">Arctic Monkeys</div>
        </div>
        <div className="player-controls">
          <button className="shuffle"><i className="fas fa-random"></i></button>
          <button className="step-backward"><i className="fas fa-step-backward"></i></button>
          <button className="play-pause" onClick={togglePlayState}>
            <i className={`fas ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'}`}></i>
          </button>
          <button className="step-forward"><i className="fas fa-step-forward"></i></button>
          <button className="repeat"><i className="fas fa-redo"></i></button>
        </div>
        <div className="player-progress">
          <div className="time">1:20</div>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
          <div className="time">4:30</div>
        </div>
        <div className="player-actions">
          <button className={`like ${liked ? 'active' : ''}`} onClick={toggleLike}>
            <i className={`${liked ? 'fas' : 'far'} fa-heart`}></i>
          </button>
          <button className="playlist"><i className="fas fa-list"></i></button>
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
