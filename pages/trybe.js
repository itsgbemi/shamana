import React from 'react';
import Head from 'next/head';

export default function Trybes() {
  const afrobeatTrybes = [
    {
      id: 1,
      name: "Afrobeat Pioneers",
      members: "12.4K",
      gradient: "linear-gradient(135deg, #6a11cb, #2575fc)",
      image: "https://res.cloudinary.com/dqhawdcol/image/upload/v1758378695/gof3qpnmxlx9sa529c0v.jpg"
    },
    {
      id: 2,
      name: "Modern Afro Fusion",
      members: "8.7K",
      gradient: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
      image: "https://res.cloudinary.com/dqhawdcol/image/upload/v1758378696/oiftniuktkros8hsnrpi.jpg"
    },
    {
      id: 3,
      name: "Afro House Collective",
      members: "15.2K",
      gradient: "linear-gradient(135deg, #0cebeb, #20e3b2, #29ffc6)",
      image: "https://res.cloudinary.com/dqhawdcol/image/upload/v1758378688/bqbsveb0m8l9vcirstmd.jpg"
    },
    {
      id: 4,
      name: "Naija Vibes",
      members: "22.1K",
      gradient: "linear-gradient(135deg, #8360c3, #2ebf91)",
      image: "https://res.cloudinary.com/dqhawdcol/image/upload/v1758202400/e9ifs1tewfgemgxfc5kc.jpg"
    },
    {
      id: 5,
      name: "Afro Dancehall",
      members: "9.8K",
      gradient: "linear-gradient(135deg, #ff5e62, #ff9966)",
      image: "https://res.cloudinary.com/dqhawdcol/image/upload/v1758379129/hkyfzlvauys6paoqo6on.png"
    },
    {
      id: 6,
      name: "Amapiano Fusion",
      members: "18.5K",
      gradient: "linear-gradient(135deg, #fad0c4, #ffd1ff)",
      image: "https://res.cloudinary.com/dqhawdcol/image/upload/v1758378695/gof3qpnmxlx9sa529c0v.jpg"
    }
  ];

  return (
    <>
      <Head>
        <title>Afrobeat Trybes | Shamana</title>
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
        .trybes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
        }
        .trybe-card {
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .trybe-card:hover {
          transform: translateY(-5px);
        }
        .trybe-banner {
          height: 120px;
          position: relative;
          overflow: hidden;
        }
        .trybe-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .trybe-avatar {
          position: absolute;
          bottom: -30px;
          left: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid #1a1a1a;
          background: #333;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .trybe-avatar i {
          color: #666;
          font-size: 24px;
        }
        .trybe-info {
          padding: 40px 20px 20px;
        }
        .trybe-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .trybe-members {
          font-size: 0.85rem;
          color: #ccc;
          margin-bottom: 15px;
        }
        .follow-btn {
          background: transparent;
          border: 1px solid #6a11cb;
          color: #6a11cb;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }
        .follow-btn:hover {
          background: #6a11cb;
          color: #fff;
        }
        .follow-btn.following {
          background: #6a11cb;
          color: #fff;
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
          .trybes-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 15px;
          }
          .trybe-banner {
            height: 100px;
          }
          .trybe-avatar {
            width: 50px;
            height: 50px;
            bottom: -25px;
          }
          .trybe-info {
            padding: 35px 15px 15px;
          }
          .mobile-nav {
            display: block;
          }
        }
        @media (max-width: 480px) {
          .trybes-grid {
            grid-template-columns: 1fr;
          }
          .section-header h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
      
      <div className="container">
        <div className="section-header">
          <h2>Afrobeat Trybes</h2>
          <a href="#" className="view-all">View all</a>
        </div>
        
        <div className="trybes-grid">
          {afrobeatTrybes.map(trybe => (
            <div key={trybe.id} className="trybe-card">
              <div className="trybe-banner" style={{ background: trybe.gradient }}>
                <img src={trybe.image} alt={trybe.name} />
                <div className="trybe-avatar">
                  <i className="fas fa-users"></i>
                </div>
              </div>
              <div className="trybe-info">
                <div className="trybe-name">{trybe.name}</div>
                <div className="trybe-members">{trybe.members} members</div>
                <button className="follow-btn">Follow</button>
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
          <a href="#" className="mobile-nav-item active">
            <i className="fas fa-users"></i>
            <span>Trybe</span>
          </a>
          <a href="#" className="mobile-nav-item">
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
