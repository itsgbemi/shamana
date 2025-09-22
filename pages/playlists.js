import React from 'react';
import Head from 'next/head';

export default function Playlists() {
  const afrobeatPlaylists = [
    {
      id: 1,
      title: "Afrobeat Essentials",
      creator: "Burna Boy",
      songs: 24,
      gradient: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
      image: "https://res.cloudinary.com/dqhawdcol/image/upload/v1758378695/gof3qpnmxlx9sa529c0v.jpg"
    },
    {
      id: 2,
      title: "African Giant Mix",
      creator: "Wizkid",
      songs: 18,
      gradient: "linear-gradient(135deg, #6a11cb, #2575fc)",
      image: "https://res.cloudinary.com/dqhawdcol/image/upload/v1758378696/oiftniuktkros8hsnrpi.jpg"
    },
    {
      id: 3,
      title: "Afrobeats Dance Party",
      creator: "Davido",
      songs: 22,
      gradient: "linear-gradient(135deg, #0cebeb, #20e3b2, #29ffc6)",
      image: "https://res.cloudinary.com/dqhawdcol/image/upload/v1758378688/bqbsveb0m8l9vcirstmd.jpg"
    },
    {
      id: 4,
      title: "Modern Afro Fusion",
      creator: "Tems",
      songs: 16,
      gradient: "linear-gradient(135deg, #8360c3, #2ebf91)",
      image: "https://res.cloudinary.com/dqhawdcol/image/upload/v1758202400/e9ifs1tewfgemgxfc5kc.jpg"
    },
    {
      id: 5,
      title: "Afro House Vibes",
      creator: "Black Coffee",
      songs: 20,
      gradient: "linear-gradient(135deg, #ff5e62, #ff9966)",
      image: "https://res.cloudinary.com/dqhawdcol/image/upload/v1758379129/hkyfzlvauys6paoqo6on.png"
    }
  ];

  return (
    <>
      <Head>
        <title>Afrobeat Playlists | Shamana</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
      </Head>
      
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Work Sans', sans-serif;
          background-color: #000;
          color: #fff;
          letter-spacing: -0.5px;
          max-width: 1600px;
          margin: 0 auto;
          padding-bottom: 100px;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-top: 20px;
        }
        .section-header h2 {
          font-size: 1.8rem;
          font-weight: 600;
        }
        .view-all {
          color: #6a11cb;
          font-weight: 500;
        }
        .playlists-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
        }
        .playlist-card {
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .playlist-card:hover {
          transform: translateY(-5px);
        }
        .playlist-thumb {
          height: 180px;
          position: relative;
          overflow: hidden;
        }
        .playlist-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.9);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .playlist-card:hover .play-button {
          opacity: 1;
        }
        .play-button i {
          color: #000;
          font-size: 20px;
        }
        .playlist-info {
          padding: 15px;
        }
        .playlist-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .playlist-details {
          font-size: 0.85rem;
          color: #ccc;
        }
        .mobile-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: #111;
          z-index: 1000;
          padding: 10px 0;
        }
        .mobile-nav-items {
          display: flex;
          justify-content: space-around;
        }
        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          font-size: 12px;
        }
        .mobile-nav-item i {
          font-size: 18px;
        }
        @media (max-width: 768px) {
          .playlists-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 15px;
          }
          .playlist-thumb {
            height: 150px;
          }
          .mobile-nav {
            display: block;
          }
        }
        @media (max-width: 480px) {
          .playlists-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .section-header h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
      
      <div className="container">
        <div className="section-header">
          <h2>Afrobeat Playlists</h2>
          <a href="#" className="view-all">View all</a>
        </div>
        
        <div className="playlists-grid">
          {afrobeatPlaylists.map(playlist => (
            <div key={playlist.id} className="playlist-card">
              <div className="playlist-thumb" style={{ background: playlist.gradient }}>
                <img src={playlist.image} alt={playlist.title} />
                <div className="play-button">
                  <i className="fas fa-play"></i>
                </div>
              </div>
              <div className="playlist-info">
                <div className="playlist-title">{playlist.title}</div>
                <div className="playlist-details">By {playlist.creator} • {playlist.songs} songs</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <nav className="mobile-nav">
        <div className="mobile-nav-items">
          <a href="#" className="mobile-nav-item">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </a>
          <a href="#" className="mobile-nav-item">
            <i className="fas fa-users"></i>
            <span>Trybe</span>
          </a>
          <a href="#" className="mobile-nav-item active">
            <i className="fas fa-book"></i>
            <span>Library</span>
          </a>
          <a href="#" className="mobile-nav-item">
            <i className="fas fa-search"></i>
            <span>Search</span>
          </a>
        </div>
      </nav>
    </>
  );
}
