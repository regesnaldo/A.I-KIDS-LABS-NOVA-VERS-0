import React, { useState } from 'react';

// Interface para tipagem do Módulo/Vídeo
export interface MissionModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  seasonId: string;
  state?: 'locked' | 'available' | 'completed';
  videoUrl: string;
  thumbnailUrl?: string;
  category: string;
}

interface VideoCardProps {
  module: MissionModule;
  onPlay: (m: MissionModule) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ module, onPlay }) => {
  const [imgError, setImgError] = useState(false);
  
  // Lógica para determinar a imagem: URL da API -> SVG da Temporada -> Default SVG
  const thumbnailSrc = imgError 
      ? '/assets/modules/default.svg' 
      : (module.thumbnailUrl || `/assets/modules/${module.seasonId}.svg`);

  return (
    <article 
        className={`lab-card ${module.difficulty}`} 
        onClick={() => onPlay(module)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onPlay(module)}
    >
      {/* Imagem do Card */}
      <img 
        src={thumbnailSrc} 
        alt={module.title}
        onError={() => setImgError(true)}
      />

      {/* Overlay com Informações (Aparece no Hover via CSS) */}
      <div className="card-overlay">
        <h3 className="card-title-overlay">{module.title}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#ccc' }}>{module.duration}</span>
            <span style={{ 
                fontSize: '0.7rem', 
                padding: '2px 6px', 
                borderRadius: '2px', 
                background: module.difficulty === 'easy' ? 'green' : module.difficulty === 'medium' ? 'orange' : 'red' 
            }}>
                {module.difficulty.toUpperCase()}
            </span>
        </div>
        <div className="card-actions" style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
             <button style={{ 
                 border: 'none', 
                 background: '#fff', 
                 color: '#000', 
                 borderRadius: '50%', 
                 width: '30px', 
                 height: '30px', 
                 cursor: 'pointer', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center' 
             }}>▶</button>
             <button style={{ 
                 border: '1px solid #fff', 
                 background: 'transparent', 
                 color: '#fff', 
                 borderRadius: '50%', 
                 width: '30px', 
                 height: '30px', 
                 cursor: 'pointer',
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center' 
             }}>+</button>
        </div>
      </div>
    </article>
  );
};

export default VideoCard;
