import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSearch, FaUpload, FaMusic, FaPlay, FaPause, FaStepForward, FaStepBackward, FaHome, FaUsers, FaBook, FaCaretDown, FaBars } from 'react-icons/fa';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', fontFamily: "'Work Sans', sans-serif", minHeight: '100vh', paddingBottom: '80px' }}>
      <Head>
        <title>Shamana</title>
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>

      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid #333' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://res.cloudinary.com/dqhawdcol/image/upload/v1758201861/y3p2lwz2oq5gwny6ktyu.svg" alt="Shamana Logo" style={{ height: '30px', marginRight: '2rem' }} />
          {!isMobile && (
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Home</a>
              <a href="#" style={{ color: '#999', textDecoration: 'none' }}>Trybe</a>
              <a href="#" style={{ color: '#999', textDecoration: 'none' }}>Library</a>
            </nav>
          )}
        </div>

        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Search..." style={{ backgroundColor: '#222', border: 'none', borderRadius: '20px', padding: '0.5rem 1rem 0.5rem 2.5rem', color: 'white', width: '250px' }} />
              <FaSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ff5500', border: 'none', borderRadius: '20px', padding: '0.5rem 1rem', color: 'white', cursor: 'pointer' }}>
              <FaUpload /> Upload
            </button>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isMobile && <FaBars style={{ fontSize: '1.2rem', cursor: 'pointer' }} />}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setShowDropdown(!showDropdown)}>
              <img src="https://res.cloudinary.com/dqhawdcol/image/upload/v1758202400/e9ifs1tewfgemgxfc5kc.jpg" alt="User" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
              <FaCaretDown />
            </div>
            {showDropdown && (
              <div style={{ position: 'absolute', right: 0, top: '100%', backgroundColor: '#222', borderRadius: '5px', padding: '0.5rem', minWidth: '150px', marginTop: '0.5rem', zIndex: 1000 }}>
                <div style={{ padding: '0.5rem', cursor: 'pointer' }}>Profile</div>
                <div style={{ padding: '0.5rem', cursor: 'pointer' }}>Settings</div>
                <div style={{ padding: '0.5rem', cursor: 'pointer' }}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Add your main content here */}
      </main>

      {/* Mobile Footer Navigation */}
      {isMobile && (
        <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#111', display: 'flex', justifyContent: 'space-around', padding: '0.5rem 0', zIndex: 1000 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem' }}>
            <FaHome style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }} />
            <span>Home</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem', color: '#999' }}>
            <FaUsers style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }} />
            <span>Trybe</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem', color: '#999' }}>
            <FaBook style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }} />
            <span>Library</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem', color: '#999' }}>
            <FaSearch style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }} />
            <span>Search</span>
          </div>
        </footer>
      )}

      {/* Player Bar */}
      <div style={{ position: 'fixed', bottom: isMobile ? '60px' : 0, left: 0, right: 0, backgroundColor: 'rgba(30, 30, 30, 0.8)', backdropFilter: 'blur(10px)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 999 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '30%' }}>
          <FaMusic style={{ fontSize: '1.5rem' }} />
          <div>
            <div style={{ fontWeight: '600' }}>Song Title</div>
            <div style={{ fontSize: '0.8rem', color: '#999' }}>Artist Name</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><FaStepBackward /></button>
          <button 
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><FaStepForward /></button>
        </div>
        
        <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '80%', height: '4px', backgroundColor: '#444', borderRadius: '2px', position: 'relative' }}>
            <div style={{ width: '30%', height: '100%', backgroundColor: '#ff5500', borderRadius: '2px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
