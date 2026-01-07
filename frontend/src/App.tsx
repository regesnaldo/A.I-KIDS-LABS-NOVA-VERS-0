import React, { useState, useEffect } from 'react';
import './neon-styles.css';
import Recommendations from './components/Recommendations';
import ChatAssistant from './components/ChatAssistant';
import VideoPlayer from './components/VideoPlayer';
import Login from './components/Login';
import HeroSection from './components/HeroSection';
import SeasonRow, { Season } from './components/SeasonRow';
import { MissionModule } from './components/VideoCard';
// @ts-ignore
import { modulesAPI } from './services/api';

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
          
          const uniqueSeasons = Array.from(new Set(fetchedModules.map((m: MissionModule) => m.seasonId)));
          const generatedSeasons: Season[] = uniqueSeasons.map((sid: string, index: number) => ({
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

  // Agrupar temporadas por fase pedagógica
  const seasonsByPhase: Record<number, Season[]> = {
      1: seasons
  };

  return (
    <div className="app" style={{ backgroundColor: '#141414', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
      <HeroSection />
      
      <main className="main-content" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ padding: '0 4%', marginBottom: '2rem' }}>
          <Recommendations />
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

export default App;
