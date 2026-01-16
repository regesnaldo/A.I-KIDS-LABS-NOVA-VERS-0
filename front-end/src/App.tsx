import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './neon-styles.css'
import Navbar from './components/Navbar';
import ChatAssistant from './components/ChatAssistant';
import VideoPlayer from './components/VideoPlayer';
import Login from './components/Login';
import SeasonCard from './components/SeasonCard';
import SeasonDetailsPage from './components/SeasonDetailsPage';
import HeroSection from './components/HeroSection';
import api, { waitForBackend, onConnectionChange } from './services/api';
import { Season } from './types';
import type { MissionModule } from './types';

// --- Page Components ---

const LandingPage = ({ seasons }: { seasons: Season[] }) => {
  const navigate = useNavigate();
  console.log("Rendering LandingPage. Seasons:", seasons);

  // Defensive Leverage: Ensure content exists
  const hasContent = seasons && seasons.length > 0;
  const featured = hasContent ? seasons[0] : undefined;

  return (
  <>
    <HeroSection featuredSeason={featured} />
    <div style={{ padding: '0 4%', marginBottom: '2rem' }}>
      <h2 className="text-gradient" style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Todas as Temporadas</h2>
      
      {!hasContent && (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
          <p>Carregando missões de inteligência...</p>
        </div>
      )}

      <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem',
          padding: '1rem 0' 
      }}>
        {seasons.map((season) => (
          <SeasonCard 
            key={season.id}
            title={season.title || season.titulo || 'Sem título'}
            description={season.description || season.descricao || 'Sem descrição'}
            image={season.image || season.imagem}
            onClick={() => navigate(`/season/${season.id}`)}
          />
        ))}
      </div>
    </div>
  </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MissoesPage = ({ temporadasData }: { temporadasData: any[] }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn("Acesso não autorizado detectado em Missões.");
    } else {
      console.log("Credencial de acesso validada para Missões. Token presente.");
    }
  }, []);

  return (
    <section style={{ padding: '2rem 4%' }}>
      <h2 className="text-gradient" style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Jornadas A.I. KIDS</h2>
      <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem',
          padding: '1rem 0' 
      }}>
        {temporadasData.map((season) => (
          <SeasonCard 
            key={season.id}
            title={season.title || season.titulo || 'Sem título'}
            description={season.description || season.descricao || 'Sem descrição'}
            image={season.image}
            onClick={() => navigate(`/season/${season.id}`)}
          />
        ))}
      </div>
    </section>
  );
};

const AboutPage = () => (
    <div style={{ padding: '100px 4%', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Sobre o A.I. KIDS LABS</h1>
        <div style={{ background: 'rgba(20, 20, 20, 0.8)', padding: '2rem', borderRadius: '15px', border: '1px solid #333' }}>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc' }}>
                O <strong>A.I. KIDS LABS</strong> é uma iniciativa revolucionária para desmontar as barreiras do aprendizado tecnológico.
            </p>
            <br />
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc' }}>
                Nossa missão é transformar o aprendizado de Inteligência Artificial e Programação em uma aventura épica, onde cada linha de código é um superpoder e cada bug resolvido é uma vitória gloriosa.
            </p>
            <br />
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc' }}>
                Prepare-se para embarcar em missões que desafiam sua lógica e expandem sua criatividade. O futuro é agora, e você é o piloto.
            </p>
        </div>
    </div>
);

const LabsPage = () => (
    <div style={{ padding: '100px 4%', color: 'white', textAlign: 'center', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Labs</h1>
        <p style={{ fontSize: '1.5rem', color: '#888' }}>Laboratórios de experimentação prática em construção...</p>
        <div style={{ marginTop: '2rem', fontSize: '3rem' }}>🧪 🧬 🔬</div>
    </div>
);

const ConquistasPage = () => (
    <div style={{ padding: '100px 4%', color: 'white', textAlign: 'center', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Conquistas</h1>
        <p style={{ fontSize: '1.5rem', color: '#888' }}>Suas medalhas e troféus aparecerão aqui.</p>
        <div style={{ marginTop: '2rem', fontSize: '3rem' }}>🏆 🥇 🎖️</div>
    </div>
);

const App = () => {
  const [user, setUser] = useState<unknown>(null);
  const [playingModule, setPlayingModule] = React.useState<MissionModule | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [temporadasData, setTemporadasData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Connection States: 'checking' (initial), 'online', 'reconnecting', 'offline'
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'online' | 'reconnecting' | 'offline'>('checking');

  // Monitor Connection
  useEffect(() => {
    const unsubscribe = onConnectionChange((status) => {
      setConnectionStatus(status);
      if (status === 'offline') {
        waitForBackend().then(success => {
            if (!success) setConnectionStatus('offline');
        });
      }
    });

    const checkServer = async () => {
      const isReady = await waitForBackend(5, 1000);
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
        setLoading(false); // Stop loading if no user, allowing Landing Page to show
    }
  }, []);

  // Fetch Data (Only if online)
  useEffect(() => {
    const fetchData = async () => {
      if (connectionStatus !== 'online') {
          return;
      }
      
      try {
        const response = await api.get('/seasons');
        if (response.data) {
          const seasonsData = response.data;
          // Fix: Ensure seasons data is an array
          const validSeasons = Array.isArray(seasonsData) ? seasonsData : [];
          setTemporadasData(validSeasons);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, connectionStatus]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = (userData: any) => {
      setUser(userData);
      setLoading(true); 
  };

  // --- CONNECTION SCREENS ---

  const DebugOverlay = () => (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: '#0f0',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '10px',
      fontFamily: 'monospace',
      zIndex: 9999,
      pointerEvents: 'none',
      border: '1px solid #333'
    }}>
      <div>Status: {connectionStatus}</div>
      <div>Loading: {loading ? 'true' : 'false'}</div>
      <div>Seasons: {temporadasData.length}</div>
      <hr style={{ borderColor: '#333', margin: '5px 0' }}/>
    </div>
  );

  if (connectionStatus === 'offline') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#050505', color: '#ff4444' }}>
            <DebugOverlay />
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

  // Remove early return for !user to allow Landing Page
  // if (!user) return <Login onLogin={handleLogin} />;

  if (loading && user && temporadasData.length === 0) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#000', color: '#0f0' }}>
          <DebugOverlay />
          LOADING SYSTEM...
        </div>
      );
  }

  return (
    <div className="app" style={{ backgroundColor: '#141414', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
    <Navbar onOpenChat={() => setIsChatOpen(true)} />
    
    <main className="main-content" style={{ position: 'relative', zIndex: 10 }}>
        <ChatAssistant isOpen={isChatOpen} onToggle={setIsChatOpen} />
        
        <Routes>
            <Route path="/" element={<LandingPage seasons={temporadasData} />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Protected Routes */}
            <Route 
                path="/missoes" 
                element={user ? <MissoesPage temporadasData={temporadasData} /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
                path="/labs" 
                element={user ? <LabsPage /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
                path="/conquistas" 
                element={user ? <ConquistasPage /> : <Login onLogin={handleLogin} />} 
            />

            <Route path="/season/:id" element={<SeasonDetailsPage />} />
            
            {/* Fallback to Landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
                    videoUrl={playingModule.video_url || playingModule.videoUrl || ''} 
                    title={playingModule.title || playingModule.titulo}
                    thumbnailUrl={playingModule.thumbnailUrl || playingModule.thumb}
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

