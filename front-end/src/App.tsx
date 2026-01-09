import React, { useState, useEffect } from 'react'
import './neon-styles.css'
import Navbar from './components/Navbar';
import Recommendations from './components/Recommendations';
import ChatAssistant from './components/ChatAssistant';
import VideoPlayer from './components/VideoPlayer';
import Login from './components/Login';
import SeasonRow from './components/SeasonRow';
import HeroSection from './components/HeroSection';
import { modulesAPI, waitForBackend, onConnectionChange } from './services/api';
import { Season, MissionModule, PedagogicalPhase } from './types';

const App = () => {
  const [user, setUser] = useState<unknown>(null);
  const [playingModule, setPlayingModule] = React.useState<MissionModule | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [allModules, setAllModules] = useState<MissionModule[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Connection States: 'checking' (initial), 'online', 'reconnecting', 'offline'
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'online' | 'reconnecting' | 'offline'>('checking');

  // Monitor Connection
  useEffect(() => {
    // 1. Subscribe to connection changes from API interceptors
    const unsubscribe = onConnectionChange((status) => {
      setConnectionStatus(status);
      if (status === 'offline') {
        // Auto-retry connection when we go offline
        waitForBackend().then(success => {
            if (!success) setConnectionStatus('offline');
        });
      }
    });

    // 2. Initial Check
    const checkServer = async () => {
      const isReady = await waitForBackend(5, 1000); // Quick check on load
      if (isReady) {
        setConnectionStatus('online');
      } else {
        setConnectionStatus('offline');
      }
    };
    checkServer();

    return () => unsubscribe();
  }, []);

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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = (userData: any) => {
      setUser(userData);
      setLoading(true); // Trigger loading to fetch data
  };

  // --- CONNECTION SCREENS ---

  if (connectionStatus === 'offline') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#050505', color: '#ff4444' }}>
            <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '1rem' }}>SISTEMA OFFLINE</h2>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Não foi possível conectar ao servidor neural.</p>
            <button 
                onClick={() => {
                    setConnectionStatus('reconnecting');
                    waitForBackend();
                }} 
                style={{ 
                    padding: '12px 30px', 
                    background: 'var(--primary)', 
                    color: '#000', 
                    border: 'none', 
                    borderRadius: '50px', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    fontSize: '1rem'
                }}
            >
                TENTAR NOVAMENTE
            </button>
        </div>
      );
  }

  if (connectionStatus === 'checking' || connectionStatus === 'reconnecting') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#050505', color: '#0f0' }}>
            <h2 className="text-gradient" style={{ animation: 'pulse 2s infinite' }}>
                {connectionStatus === 'reconnecting' ? 'RECONECTANDO SISTEMA...' : 'INICIANDO PROTOCOLOS...'}
            </h2>
            <div className="loading-bar" style={{ width: '200px', height: '4px', background: '#333', marginTop: '20px', overflow: 'hidden', borderRadius: '2px' }}>
                <div style={{ width: '50%', height: '100%', background: 'var(--primary)', animation: 'loading 1s infinite' }}></div>
            </div>
            {connectionStatus === 'reconnecting' && (
                <p style={{ marginTop: '20px', color: '#666', fontSize: '0.9rem' }}>Aguardando servidor...</p>
            )}
        </div>
      );
  }

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
      <Navbar />
      <HeroSection />
      
      <main className="main-content" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ padding: '0 4%', marginBottom: '2rem' }}>
          <Recommendations />
        </div>
        <ChatAssistant />
        
        <section style={{ padding: '2rem 4%' }}>
          <h2 className="text-gradient" style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Jornadas A.I. Kids</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {temporadasData.map((season) => (
              <SeasonCard 
                key={season.id}
                title={season.title}
                description={season.description}
                image={season.image}
              />
            ))}
          </div>
        </section>
        
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

export default App;
