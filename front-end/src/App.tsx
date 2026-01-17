import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './neon-styles.css';
import Navbar from './components/Navbar';
import ChatAssistant from './components/ChatAssistant';
import VideoPlayer from './components/VideoPlayer';
import Login from './components/Login';
import SeasonCard from './components/SeasonCard';
import SeasonDetailsPage from './components/SeasonDetailsPage';
import SystemHealth from './components/SystemHealth';
import HeroSection from './components/HeroSection';
import { supabase } from './lib/supabaseClient';
import { seasonsAPI } from './services/api';
import { Season } from './types';
import type { MissionModule } from './types';

// --- Page Components ---

const LandingPage = ({ seasons }: { seasons: Season[] }) => {
  const navigate = useNavigate();

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

const MissoesPage = ({ temporadasData }: { temporadasData: Season[] }) => {
  const navigate = useNavigate();

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
  const [user, setUser] = useState<User | null>(null);
  const [playingModule, setPlayingModule] = useState<MissionModule | null>(null);
  const [temporadasData, setTemporadasData] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rows = await seasonsAPI.getAll();
        setTemporadasData(
          rows.map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description,
            image: row.image ?? undefined,
          }))
        );
      } catch {
        setTemporadasData([]);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    setLoading(false);
  };

  if (loading && user && temporadasData.length === 0) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#000', color: '#0f0' }}>
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
            <Route path="/status" element={<SystemHealth />} />
            
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
                <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{playingModule.title || playingModule.titulo}</h2>
                <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{playingModule.description || playingModule.descricao}</p>
                <span style={{ background: '#333', padding: '4px 12px', borderRadius: '4px', fontSize: '0.9rem', color: '#fff' }}>{playingModule.category}</span>
                </div>
            </div>
        </div>
    )}
    </div>
  );
};

export default App;
