import React, { useState, useEffect } from 'react';

// Simple 3D-like animated elements using CSS transforms
const FloatingRocket = ({ onClick, completed = false }: { onClick?: () => void; completed?: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simple floating animation
    const interval = setInterval(() => {
      setPosition(prev => ({
        x: prev.x,
        y: Math.sin(Date.now() / 1000) * 10
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`floating-rocket ${hovered ? 'hovered' : ''} ${completed ? 'completed' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: `translateY(${position.y}px) rotate(${hovered ? 15 : 0}deg)`,
        transition: 'transform 0.3s ease, color 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        fontSize: '2rem',
        color: completed ? '#10b981' : '#3b82f6',
        margin: '20px'
      }}
    >
      🚀
      {/* Rocket trail effect */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '4px',
          height: '30px',
          background: 'linear-gradient(to top, #f59e0b, transparent)',
          borderRadius: '2px'
        }}
      ></div>
    </div>
  );
};

// Rotating badge component
const RotatingBadge = ({ icon = "🏆", onClick }: { icon?: string; onClick?: () => void }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 5);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onClick}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.1s linear',
        cursor: 'pointer',
        fontSize: '2rem',
        margin: '20px',
        color: '#fbbf24'
      }}
    >
      {icon}
    </div>
  );
};

// Interactive cube using CSS 3D transforms
const InteractiveCube = ({ onClick, color = "#ef4444" }: { onClick?: () => void; color?: string }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateY = ((e.clientX - centerX) / rect.width) * 20;
      const rotateX = ((e.clientY - centerY) / rect.height) * -20;
      
      setRotation({ x: rotateX, y: rotateY });
    }
  };

  return (
    <div
      onClick={() => { setActive(!active); onClick && onClick(); }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      style={{
        width: '80px',
        height: '80px',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease',
        margin: '20px',
        cursor: 'pointer'
      }}
    >
      {/* Front face */}
      <div 
        style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          background: active ? '#10b981' : color,
          transform: 'translateZ(40px)',
          border: '2px solid #ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}
      >
        🧩
      </div>
      {/* Back face */}
      <div 
        style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          background: active ? '#059669' : '#dc2626',
          transform: 'rotateY(180deg) translateZ(40px)',
          border: '2px solid #ffffff'
        }}
      ></div>
      {/* Top face */}
      <div 
        style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          background: active ? '#047857' : '#e11d48',
          transform: 'rotateX(90deg) translateZ(40px)',
          border: '2px solid #ffffff'
        }}
      ></div>
      {/* Bottom face */}
      <div 
        style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          background: active ? '#065f46' : '#be123c',
          transform: 'rotateX(-90deg) translateZ(40px)',
          border: '2px solid #ffffff'
        }}
      ></div>
      {/* Right face */}
      <div 
        style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          background: active ? '#064e3b' : '#ca8a04',
          transform: 'rotateY(90deg) translateZ(40px)',
          border: '2px solid #ffffff'
        }}
      ></div>
      {/* Left face */}
      <div 
        style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          background: active ? '#0f766e' : '#a16207',
          transform: 'rotateY(-90deg) translateZ(40px)',
          border: '2px solid #ffffff'
        }}
      ></div>
    </div>
  );
};

// Main 3D educational scene component
const EducationalScene3D = ({ 
  modules = [], 
  onModuleClick 
}: { 
  modules?: { id: string; title: string; completed: boolean }[]; 
  onModuleClick?: (id: string) => void; 
}) => {
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '500px', 
        background: 'linear-gradient(135deg, #0f172a, #1e293b)', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 20%),' +
                        'radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 20%)',
        zIndex: 0
      }}></div>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
        zIndex: 1,
        padding: '20px'
      }}>
        {/* Render rockets for modules */}
        {modules.map((module) => (
          <FloatingRocket
            key={module.id}
            onClick={() => onModuleClick && onModuleClick(module.id)}
            completed={module.completed}
          />
        ))}
        
        {/* Render badges for completed modules */}
        {modules.filter(m => m.completed).map((module) => (
          <RotatingBadge
            key={`badge-${module.id}`}
            icon="🏆"
            onClick={() => onModuleClick && onModuleClick(module.id)}
          />
        ))}
        
        {/* Add some interactive cubes */}
        <InteractiveCube onClick={() => console.log("Cube clicked!")} />
        <InteractiveCube color="#8b5cf6" onClick={() => console.log("Cube clicked!")} />
        <InteractiveCube color="#ec4899" onClick={() => console.log("Cube clicked!")} />
      </div>
    </div>
  );
};

export default EducationalScene3D;