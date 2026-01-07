import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ 
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 4%',
      background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 100%)',
      backdropFilter: 'blur(6px)',
      borderBottom: '1px solid rgba(59, 130, 246, 0.2)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: 32, height: 32, borderRadius: 6, 
          background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
          boxShadow: '0 0 12px rgba(59, 130, 246, 0.5)'
        }} />
        <span style={{ fontWeight: 700, letterSpacing: 0.5 }}>A.I. KIDS LABS</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <a href="#" style={{ color: '#cbd5e1' }}>Início</a>
        <a href="#" style={{ color: '#cbd5e1' }}>Missões</a>
        <a href="#" style={{ color: '#cbd5e1' }}>Troféus</a>
        <button style={{ 
          padding: '8px 14px',
          borderRadius: 8,
          border: '1px solid rgba(59, 130, 246, 0.4)',
          background: 'rgba(30, 41, 59, 0.5)',
          color: '#e2e8f0'
        }}>Perfil</button>
      </div>
    </nav>
  );
};

export default Navbar;

