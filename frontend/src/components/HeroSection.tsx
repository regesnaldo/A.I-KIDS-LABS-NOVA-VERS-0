const HeroSection = () => {
  return (
    <div className="hero" style={{ 
      position: 'relative', 
      height: '70vh', 
      width: '100%', 
      backgroundImage: 'url(/assets/hero-bg.jpg)', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginBottom: '-50px',
      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)'
    }}>
      <div className="hero-content" style={{ position: 'absolute', bottom: '150px', left: '4%', maxWidth: '40%' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>A.I. KIDS LABS</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
          Aprenda Inteligência Artificial e Programação se divertindo. Missões interativas para todas as idades.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ padding: '0.8rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', borderRadius: '4px', background: 'white', color: 'black', cursor: 'pointer' }}>▶ Assistir</button>
          <button style={{ padding: '0.8rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', borderRadius: '4px', background: 'rgba(109, 109, 110, 0.7)', color: 'white', cursor: 'pointer' }}>ℹ️ Mais Info</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
