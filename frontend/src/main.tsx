import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './neon-styles.css'
import RecommendationEngine from './components/RecommendationEngine';
import ChatAssistant from './components/ChatAssistant';
import VideoPlayer from './components/VideoPlayer';
import Login from './components/Login';
import { modulesAPI } from './services/api';

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

// Componente de Linha de Temporada
const SeasonRow = ({ season, modules, onPlay }: { season: Season; modules: MissionModule[]; onPlay: (m: MissionModule) => void }) => {
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
  const [user, setUser] = useState<any>(null);
  const [playingModule, setPlayingModule] = React.useState<MissionModule | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [allModules, setAllModules] = useState<MissionModule[]>([]);
  const [loading, setLoading] = useState(true);

  // Load User from LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
        setLoading(false);
    }
  }, []);

  // Fetch Data (Only if logged in)
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
          return;
      }
      
      try {
        const response = await modulesAPI.getAllModules();
        if (response.success && response.data) {
          const fetchedModules: MissionModule[] = response.data.map((m: any) => ({
             ...m,
             videoUrl: m.videoPlaceholder || m.videoUrl, // Adapt backend field to frontend interface
             thumbnailUrl: m.thumbnail,
             seasonId: m.seasonId || 'season-01'
          }));
          
          setAllModules(fetchedModules);
          
          const uniqueSeasons = Array.from(new Set(fetchedModules.map(m => m.seasonId)));
          const generatedSeasons: Season[] = uniqueSeasons.map((sid, index) => ({
             id: sid,
             order: index + 1,
             title: `Temporada ${sid.replace('season-', '')}`,
             phase: 1, // Simplify for now
             description: 'Conteúdo da Temporada',
             ageRange: '6+',
             status: 'published',
             coverImage: `/assets/modules/${sid}.jpg`
          }));
          
          setSeasons(generatedSeasons.length > 0 ? generatedSeasons : [
              { id: 'season-01', order: 1, title: 'Temporada 01', phase: 1, description: '', ageRange: '6+', status: 'published' }
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handlePlay = (module: MissionModule) => {
    setPlayingModule(module);
  };
  
  const handleLogin = (userData: any) => {
      setUser(userData);
      setLoading(true); // Trigger loading to fetch data
  };

  if (!user) {
      return <Login onLogin={handleLogin} />;
  }

  if (loading && allModules.length === 0) {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#000', color: '#0f0' }}>LOADING SYSTEM...</div>;
  }

  // Agrupar temporadas por fase pedagógica (Simulada aqui, pois backend não retorna fase na temporada ainda)
  const seasonsByPhase = {
      1: seasons
  } as Record<PedagogicalPhase, Season[]>;

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
              {seasonList.map(season => {
                const seasonModules = allModules.filter(m => m.seasonId === season.id);
                if (seasonModules.length === 0) return null;
                return <SeasonRow key={season.id} season={season} modules={seasonModules} onPlay={handlePlay} />;
              })}
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