import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero" style={{ 
      position: 'relative', 
      height: '80vh', 
      width: '100%', 
      background: '#111', // Fallback color
      backgroundImage: 'url(/assets/hero-bg.jpg)', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'flex-end',
      paddingBottom: '150px',
      boxSizing: 'border-box',
      // maskImage removed for compatibility
    }}>
      <div style={{ 
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
        background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' 
      }}></div>

      <div className="hero-content animate-slide-up" style={{ 
        position: 'relative', 
        zIndex: 10, 
        paddingLeft: '4%', 
        maxWidth: '800px',
        width: '90%'
      }}>
        <h1 className="text-gradient" style={{ 
          fontSize: '4.5rem', 
          marginBottom: '1rem', 
          lineHeight: '1.1',
          fontWeight: '900',
          textShadow: '0 4px 10px rgba(0,0,0,0.5)'
        }}>
          A.I. KIDS LABS
        </h1>
        <p style={{ 
          fontSize: '1.4rem', 
          marginBottom: '2rem', 
          color: '#e0e0e0', 
          maxWidth: '600px',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)'
        }}>
          Aprenda Inteligência Artificial e Programação se divertindo. Missões interativas para todas as idades.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/missoes" style={{ textDecoration: 'none' }}>
            <button className="btn-play" style={{ 
              fontSize: '1.2rem', 
              padding: '12px 32px', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              ▶ COMEÇAR AGORA
            </button>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <button style={{ 
              padding: '12px 32px', 
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
              border: '2px solid rgba(255,255,255,0.3)', 
              borderRadius: '8px', 
              background: 'rgba(255,255,255,0.1)', 
              color: 'white', 
              cursor: 'pointer',
              backdropFilter: 'blur(5px)',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              ℹ️ SAIBA MAIS
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
