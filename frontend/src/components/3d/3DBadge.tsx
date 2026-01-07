import React, { useState, useEffect } from 'react';

interface Badge3DProps {
  icon?: string;
  title?: string;
  description?: string;
  earned?: boolean;
  onClick?: () => void;
}

const Badge3D: React.FC<Badge3DProps> = ({ 
  icon = "🏆", 
  title = "Conquista", 
  description = "Descrição da conquista", 
  earned = false, 
  onClick 
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (earned) {
      // Trigger pulse animation when badge is earned
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [earned]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateY = ((e.clientX - centerX) / rect.width) * 10;
      const rotateX = ((e.clientY - centerY) / rect.height) * -10;
      
      setRotation({ x: rotateX, y: rotateY });
    }
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className={`badge-3d ${earned ? 'earned' : ''} ${hovered ? 'hovered' : ''} ${pulse ? 'pulse' : ''}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { resetRotation(); setHovered(false); }}
      style={{
        width: '120px',
        height: '120px',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease, box-shadow 0.3s ease',
        margin: '20px',
        cursor: 'pointer',
        filter: earned ? 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.7))' : 'none'
      }}
    >
      {/* Badge front */}
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: earned ? 
            'linear-gradient(145deg, #10b981, #059669)' : 
            'linear-gradient(145deg, #64748b, #475569)',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translateZ(20px)',
          border: '3px solid white',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{
          fontSize: '2rem',
          marginBottom: '5px',
          filter: earned ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' : 'none'
        }}>
          {icon}
        </div>
        <div style={{
          fontSize: '0.7rem',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          {title}
        </div>
      </div>
      
      {/* Badge back (for 3D effect) */}
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: earned ? 
            'linear-gradient(145deg, #059669, #047857)' : 
            'linear-gradient(145deg, #475569, #334155)',
          borderRadius: '50%',
          transform: 'rotateY(180deg) translateZ(20px)',
          border: '3px solid white'
        }}
      ></div>
      
      {/* Badge sides for 3D effect */}
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '20px',
          background: earned ? '#047857' : '#334155',
          borderRadius: '50%',
          bottom: '-10px',
          left: 0,
          transform: 'rotateX(90deg) translateZ(50px)',
          transformOrigin: 'bottom',
          zIndex: -1
        }}
      ></div>
      
      {/* Tooltip on hover */}
      {hovered && (
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '0.8rem',
          whiteSpace: 'nowrap',
          zIndex: 10,
          maxWidth: '200px'
        }}>
          {description}
        </div>
      )}
      
      {/* Glow effect when earned */}
      {earned && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          boxShadow: '0 0 30px 10px rgba(16, 185, 129, 0.6)',
          animation: 'pulse 2s infinite',
          pointerEvents: 'none',
          zIndex: -1
        }}></div>
      )}
      
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 20px 5px rgba(16, 185, 129, 0.6); }
          50% { box-shadow: 0 0 40px 15px rgba(16, 185, 129, 0.8); }
          100% { box-shadow: 0 0 20px 5px rgba(16, 185, 129, 0.6); }
        }
        
        .pulse {
          animation: pulse 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Badge3D;