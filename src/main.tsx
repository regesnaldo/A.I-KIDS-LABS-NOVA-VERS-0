import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './neon-styles.css'
import RecommendationEngine from './components/RecommendationEngine';
import ChatAssistant from './components/ChatAssistant';
import VideoPlayer from './components/VideoPlayer';

console.log('API URL:', import.meta.env.VITE_API_URL);

// Tipos para as fases pedagógicas
type PedagogicalPhase = 1 | 2 | 3 | 4 | 5;

// Interface para temporadas
interface Season {
  id: string;
  order: number;
  title: string;
  phase: PedagogicalPhase;
  description: string;
  ageRange: string;
  status: 'draft' | 'published' | 'archived';
  coverImage?: string;
  featured?: boolean;
}

// Interface para módulos de missão
interface MissionModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  seasonId: string;
  state: 'locked' | 'available' | 'completed';
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
}

// Dados das temporadas
const seasons: Season[] = [
  {
    id: 'season-001',
    order: 1,
    title: 'Temporada 01: Lógica Básica',
    phase: 1,
    description: 'Introdução à lógica de programação para crianças.',
    ageRange: '6+',
    status: 'published',
    coverImage: '/assets/modules/season-001.jpg',
    featured: true
  },
  {
    id: 'season-002',
    order: 2,
    title: 'Temporada 02: Matemática Divertida',
    phase: 1,
    description: 'Conceitos básicos de matemática.',
    ageRange: '6+',
    status: 'published',
    coverImage: '/assets/modules/season-002.jpg',
    featured: false
  },
  {
    id: 'season-003',
    order: 3,
    title: 'Temporada 03: Raciocínio Lógico',
    phase: 2,
    description: 'Lógica e raciocínio para resolver problemas.',
    ageRange: '7+',
    status: 'published',
    coverImage: '/assets/modules/season-003.jpg',
    featured: false
  },
  {
    id: 'season-004',
    order: 4,
    title: 'Temporada 04: Formas e Cores',
    phase: 2,
    description: 'Geometria e reconhecimento de padrões.',
    ageRange: '7+',
    status: 'published',
    coverImage: '/assets/modules/season-004.jpg',
    featured: false
  },
  {
    id: 'season-005',
    order: 5,
    title: 'Temporada 05: Álgebra Inicial',
    phase: 3,
    description: 'Introdução a variáveis e equações simples.',
    ageRange: '8+',
    status: 'published',
    coverImage: '/assets/modules/season-005.jpg',
    featured: false
  }
];

// Gerar temporadas 6-50 programaticamente
for (let i = 5; i < 49; i++) {
  const seasonIndex = i + 1;
  const phaseValue = Math.floor((seasonIndex - 1) / 10) + 1;
  const validPhase = Math.min(Math.max(phaseValue, 1), 5) as PedagogicalPhase;
  
  seasons.push({
    id: `season-${String(seasonIndex).padStart(3, '0')}`,
    order: seasonIndex,
    title: `Temporada ${seasonIndex.toString().padStart(2, '0')}`,
    phase: validPhase,
    description: `Conteúdo educativo avançado ${seasonIndex.toString().padStart(2, '0')}`,
    ageRange: seasonIndex > 30 ? '12+' : '9+',
    status: 'published',
    coverImage: `/assets/modules/season-${String(seasonIndex).padStart(3, '0')}.jpg`,
    featured: false
  });
}

// Módulos de exemplo para cada temporada
const getMissionModules = (seasonId: string): MissionModule[] => {
  const modules: MissionModule[] = [];
  const seasonNumber = parseInt(seasonId.replace('season-', ''));
  
  for (let i = 1; i <= 5; i++) {
    modules.push({
      id: `${seasonId}-module-${i}`,
      title: `Missão ${i}: Desafio`,
      description: `Conteúdo educativo da ${seasonId} - Missão ${i}`,
      duration: '10 min',
      difficulty: i <= 2 ? 'easy' : i <= 4 ? 'medium' : 'hard',
      seasonId,
      state: seasonNumber <= 2 || i <= 3 ? 'available' : 'locked',
      videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnailUrl: `/assets/modules/${seasonId}-module-${i}.jpg`,
      category: 'Lógica'
    });
  }
  
  return modules;
};

// Componente de Card de Laboratório (Netflix Style)
const LabCard = ({ module, level, onPlay }: { module: MissionModule; level?: 'kids' | 'teens' | 'adults'; onPlay: (m: MissionModule) => void }) => {
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
          src={module.thumbnailUrl} 
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

// Componente de Linha de Temporada
const SeasonRow = ({ season, onPlay }: { season: Season; onPlay: (m: MissionModule) => void }) => {
  const modules = getMissionModules(season.id);
  
  // Determine UX Level based on age range
  let level: 'kids' | 'teens' | 'adults' = 'kids';
  if (season.ageRange === '6+' || season.ageRange === '7+' || season.ageRange === '8+') {
    level = 'kids';
  } else if (season.ageRange === '9+' || season.ageRange === '12+') {
    level = 'teens';
  } else {
    level = 'adults';
  }
  
  return (
    <section className="season-container" style={{ position: 'relative', zIndex: 5, marginTop: '20px', marginBottom: '40px' }}>
      <h2 className="season-title" style={{ marginLeft: '4%', marginBottom: '10px', fontSize: '1.4vw', color: '#e5e5e5' }}>{season.title}</h2>
      <div className="season-row" style={{ paddingLeft: '4%', display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '20px' }}>
        {modules.map(module => (
          <LabCard key={module.id} module={module} level={level} onPlay={onPlay} />
        ))}
      </div>
    </section>
  );
};

// Componente Hero Section
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

// Componente Principal do App
const App = () => {
  const [playingModule, setPlayingModule] = React.useState<MissionModule | null>(null);

  // Filtrar apenas temporadas publicadas
  const publishedSeasons = seasons.filter(season => season.status === 'published');
  
  // Agrupar temporadas por fase pedagógica
  const seasonsByPhase = publishedSeasons.reduce((acc, season) => {
    if (!acc[season.phase]) {
      acc[season.phase] = [];
    }
    acc[season.phase].push(season);
    return acc;
  }, {} as Record<PedagogicalPhase, Season[]>);

  const handlePlay = (module: MissionModule) => {
    setPlayingModule(module);
  };

  return (
    <div className="app" style={{ backgroundColor: '#141414', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
      <HeroSection />
      
      <main className="main-content" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ padding: '0 4%', marginBottom: '2rem' }}>
          <RecommendationEngine />
        </div>
        <ChatAssistant />
        
        {Object.entries(seasonsByPhase).map(([phase, seasonList]) => (
          <div key={phase} className="phase-section">
            <div className="labs-grid">
              {seasonList.map(season => (
                <SeasonRow key={season.id} season={season} onPlay={handlePlay} />
              ))}
            </div>
          </div>
        ))}
      </main>

      {playingModule && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <button 
                onClick={() => setPlayingModule(null)} 
                style={{ position: 'absolute', top: 30, right: 30, fontSize: '2.5rem', color: 'white', background: 'none', border: 'none', cursor: 'pointer', zIndex: 1001 }}
            >
                ×
            </button>
            <div style={{ width: '90%', height: '90%', maxWidth: '1400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <VideoPlayer 
                    videoUrl={playingModule.videoUrl} 
                    title={playingModule.title}
                    thumbnailUrl={playingModule.thumbnailUrl}
                    onProgressUpdate={() => {}}
                    onVideoComplete={() => {}}
                />
                <div style={{ marginTop: '20px', color: '#ccc', textAlign: 'left', maxWidth: '800px', margin: '20px auto' }}>
                   <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{playingModule.title}</h2>
                   <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{playingModule.description}</p>
                   <span style={{ background: '#333', padding: '4px 12px', borderRadius: '4px', fontSize: '0.9rem', color: '#fff' }}>{playingModule.category}</span>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)