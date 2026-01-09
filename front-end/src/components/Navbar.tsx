import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User, Menu } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.4s ease',
      background: isScrolled ? 'rgba(5, 5, 5, 0.95)' : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
      padding: '0 4%',
      boxSizing: 'border-box'
    }}>
      <div className="navbar-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Logo */}
        <div className="navbar-left" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <Link to="/" className="logo text-gradient" style={{ 
            fontSize: '1.8rem', 
            fontWeight: '900', 
            textDecoration: 'none',
            letterSpacing: '-1px'
          }}>
            A.I. KIDS
          </Link>
          
          <div className="desktop-menu" style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>Início</Link>
            <Link to="/series" style={{ color: '#e5e5e5', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>Missões</Link>
            <Link to="/filmes" style={{ color: '#e5e5e5', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>Labs</Link>
            <Link to="/minha-lista" style={{ color: '#e5e5e5', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>Conquistas</Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="search-box" style={{ opacity: 0.7 }}>
             <span style={{ cursor: 'pointer' }}>🔍</span>
          </div>
          
          <div className="profile-menu" style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
            <div className="avatar" style={{ 
              width: '35px', 
              height: '35px', 
              borderRadius: '8px', 
              background: 'linear-gradient(45deg, #333, #555)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <User size={20} color="white" />
            </div>
            <LogOut size={20} color="#ff4444" style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => {
              console.log('Logout clicked');
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              window.location.reload();
            }}/>
            
            {/* Mobile Menu Toggle */}
            <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: 'pointer', display: 'none' }}>
              <Menu size={24} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          width: '100%',
          height: 'calc(100vh - 70px)',
          background: 'rgba(5, 5, 5, 0.95)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          zIndex: 999,
          animation: 'slide-up 0.3s ease-out forwards'
        }}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: '700', fontSize: '1.5rem' }}>Início</Link>
            <Link to="/series" onClick={() => setMobileMenuOpen(false)} style={{ color: '#e5e5e5', textDecoration: 'none', fontWeight: '700', fontSize: '1.5rem' }}>Missões</Link>
            <Link to="/filmes" onClick={() => setMobileMenuOpen(false)} style={{ color: '#e5e5e5', textDecoration: 'none', fontWeight: '700', fontSize: '1.5rem' }}>Labs</Link>
            <Link to="/minha-lista" onClick={() => setMobileMenuOpen(false)} style={{ color: '#e5e5e5', textDecoration: 'none', fontWeight: '700', fontSize: '1.5rem' }}>Conquistas</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
