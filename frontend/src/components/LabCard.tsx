import { useState } from 'react';
import { MissionModule } from '../types';

interface LabCardProps {
  module: MissionModule;
  level?: 'kids' | 'teens' | 'adults';
  onPlay: (m: MissionModule) => void;
}

const LabCard = ({ module, level, onPlay }: LabCardProps) => {
  const [imgError, setImgError] = useState(false);
  const isParentalLocked = module.difficulty === 'hard' && module.state !== 'completed';
  const cardLevel = level || 'kids';
  
  return (
    <article className={`lab-card ${module.state} card-${cardLevel} ${isParentalLocked ? 'parental-locked' : ''} ${imgError ? 'no-image' : ''}`} 
             tabIndex={0}
             onClick={() => onPlay(module)}
             onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                 e.preventDefault();
                 onPlay(module);
               }
             }}>
      
      {!imgError && (
        <img 
          src={module.thumbnailUrl || `/assets/modules/${module.seasonId}.jpg`} 
          alt={module.title}
          onError={() => setImgError(true)}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', zIndex: -1 }}
        />
      )}

      <div className="card-overlay">
        <h3 className="card-title-overlay" style={{ fontSize: '1rem', marginBottom: '10px' }}>{module.title}</h3>
        <div className="card-actions">
          <button className="btn-play" onClick={(e) => { e.stopPropagation(); onPlay(module); }}>▶ Assistir</button>
          <button className="btn-like" onClick={(e) => e.stopPropagation()}>ℹ️</button>
        </div>
        
        <div className="card-meta">
          <span className="duration">⏱️ {module.duration}</span>
          <span className={`difficulty ${module.difficulty}`}>
            {module.difficulty === 'easy' ? '🟢' : 
             module.difficulty === 'medium' ? '🟡' : '🔴'}
          </span>
        </div>
      </div>

      {imgError && <h3 className="card-title-fallback" style={{ position: 'relative', zIndex: 2 }}>{module.title}</h3>}
    </article>
  );
};

export default LabCard;
