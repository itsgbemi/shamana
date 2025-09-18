import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FaSearch, FaUpload, FaMusic, FaPlay, FaPause, FaStepForward, FaStepBackward, FaHome, FaUsers, FaBook, FaCaretDown, FaBars, FaTimes } from 'react-icons/fa';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileMenuOpen(false); // Close mobile menu when resizing to desktop
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', fontFamily: "'Work Sans', sans-serif", minHeight: '100vh', paddingBottom: isMobile ? '140px' : '80px' }}>
      <Head>
        <title>Shamana</title>
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '1rem' : '1rem 2rem', borderBottom: '1px solid #333' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://res.cloudinary.com/dqhawdcol/image/upload/v1758201861/y3p2lwz2oq5gwny6ktyu.svg" alt="Shamana Logo" style={{ height: isMobile ? '25px' : '30px', marginRight: isMobile ? '1rem' : '2rem' }} />
          {!isMobile && (
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '1rem' }}>Home</a>
              <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1rem' }}>Trybe</a>
              <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1rem' }}>Library</a>
            </nav>
          )}
        </div>

        {!isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Search..." style={{ backgroundColor: '#222', border: 'none', borderRadius: '20px', padding: '0.5rem 1rem 0.5rem 2.5rem', color: 'white', width: '250px' }} />
              <FaSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ff5500', border: 'none', borderRadius: '20px', padding: '0.5rem 1rem', color: 'white', cursor: 'pointer', fontSize: '0.9rem' }}>
              <FaUpload /> Upload
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setShowDropdown(!showDropdown)}>
              <img src="https://res.cloudinary.com/dqhawdcol/image/upload/v1758202400/e9ifs1tewfgemgxfc5kc.jpg" alt="User" style={{ width: isMobile ? '28px' : '32px', height: isMobile ? '28px' : '32px', borderRadius: '50%' }} />
              {!isMobile && <FaCaretDown />}
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

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 999, display: 'flex', flexDirection: 'column', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
            <button 
              style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '1.5rem' }}>Home</a>
            <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1.5rem' }}>Trybe</a>
            <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1.5rem' }}>Library</a>
            <div style={{ position: 'relative', width: '100%', maxWidth: '300px', marginTop: '1rem' }}>
              <input type="text" placeholder="Search..." style={{ backgroundColor: '#222', border: 'none', borderRadius: '25px', padding: '0.8rem 1rem 0.8rem 3rem', color: 'white', width: '100%', fontSize: '1rem' }} />
              <FaSearch style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '1.2rem' }} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#ff5500', border: 'none', borderRadius: '25px', padding: '0.8rem 1.5rem', color: 'white', cursor: 'pointer', fontSize: '1.1rem', marginTop: '1rem' }}>
              <FaUpload /> Upload
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main style={{ padding: isMobile ? '1rem' : '2rem' }}>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', marginBottom: '1rem' }}>Welcome to Shamana</h1>
          <p style={{ color: '#ccc', fontSize: isMobile ? '1rem' : '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Discover new music, connect with artists, and explore our extensive library of tracks.
          </p>
        </div>
      </main>

      {/* Mobile Footer Navigation */}
      {isMobile && (
        <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#111', display: 'flex', justifyContent: 'space-around', padding: '0.8rem 0', zIndex: 1000, borderTop: '1px solid #333' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.7rem', color: 'white' }}>
            <FaHome style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }} />
            <span>Home</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.7rem', color: '#999' }}>
            <FaUsers style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }} />
            <span>Trybe</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.7rem', color: '#999' }}>
            <FaBook style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }} />
            <span>Library</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.7rem', color: '#999' }}>
            <FaSearch style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }} />
            <span>Search</span>
          </div>
        </footer>
      )}

      {/* Player Bar */}
      <div style={{ 
        position: 'fixed', 
        bottom: isMobile ? '60px' : 0, 
        left: 0, 
        right: 0, 
        backgroundColor: 'rgba(30, 30, 30, 0.95)', 
        backdropFilter: 'blur(10px)', 
        padding: isMobile ? '0.8rem' : '1rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        zIndex: 998,
        borderTop: '1px solid #333'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.7rem' : '1rem', width: isMobile ? '40%' : '30%' }}>
          <FaMusic style={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: '600', fontSize: isMobile ? '0.9rem' : '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Song Title</div>
            <div style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Artist Name</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
          <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: isMobile ? '0.9rem' : '1rem' }}>
            <FaStepBackward />
          </button>
          <button 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer', 
              fontSize: isMobile ? '1.3rem' : '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isMobile ? '40px' : '50px',
              height: isMobile ? '40px' : '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: isMobile ? '0.9rem' : '1rem' }}>
            <FaStepForward />
          </button>
        </div>
        
        <div style={{ width: isMobile ? '20%' : '30%', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: isMobile ? '100%' : '80%', height: '4px', backgroundColor: '#444', borderRadius: '2px', position: 'relative' }}>
            <div style={{ width: '30%', height: '100%', backgroundColor: '#ff5500', borderRadius: '2px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
