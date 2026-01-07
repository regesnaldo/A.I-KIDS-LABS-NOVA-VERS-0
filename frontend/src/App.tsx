import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VideoCard, { MissionModule } from './components/VideoCard';
import VideoPlayer from './components/VideoPlayer';
import Recommendations from './components/Recommendations';
import { modulesAPI, authAPI } from './services/api';
import './styles/styles.css';

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [modules, setModules] = useState<MissionModule[]>([]);
  const [playingModule, setPlayingModule] = useState<MissionModule | null>(null);
  
  // Estados de Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // 1. Verificar Autenticação ao carregar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      fetchModules();
    }
  }, []);

  // 2. Buscar Módulos/Vídeos
  const fetchModules = async () => {
    try {
      const data = await modulesAPI.getAllModules();
      // Ajuste de dados se necessário (mapeamento backend -> frontend)
      const formattedData = data.map((m: any) => ({
          ...m,
          // Garante campos obrigatórios
          videoUrl: m.videoUrl || m.videoPlaceholder,
          thumbnailUrl: m.thumbnail,
          seasonId: m.seasonId || 'season-01'
      }));
      setModules(formattedData);
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
    }
  };

  // 3. Handler de Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await authAPI.login({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setLoginError('');
      fetchModules();
    } catch (error) {
      setLoginError('Email ou senha inválidos.');
    }
  };

  // 4. Handler de Logout
  // (Implementado dentro do Navbar, mas poderíamos ter aqui)

  // 5. Agrupamento de Vídeos por Categoria
  const categories = ['IA', 'Robótica', 'Espaço', 'Ciência'];
  const getVideosByCategory = (cat: string) => modules.filter(m => m.category === cat);

  // --- Renderização Condicional: Login vs App ---
  if (!user) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1 style={{ color: '#e50914', marginBottom: '20px', textAlign: 'center' }}>Entrar</h1>
          {loginError && <div style={{ color: 'orange', marginBottom: '10px' }}>{loginError}</div>}
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email" 
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Senha" 
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-btn">Entrar</button>
            <div style={{ marginTop: '20px', color: '#737373', fontSize: '13px' }}>
              Novo por aqui? <span style={{ color: '#fff', cursor: 'pointer' }}>Assine agora (Mock: use qualquer email)</span>.
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      
      <div className="main-content">
        
        {/* Seção de Destaque (Hero) - Opcional, pega o primeiro vídeo */}
        {modules.length > 0 && (
            <div style={{ 
                height: '60vh', 
                background: `linear-gradient(to top, #141414, transparent), url(${modules[0].thumbnailUrl || '/assets/modules/season-01.svg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 4%',
                marginBottom: '40px'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textShadow: '2px 2px 4px black' }}>{modules[0].title}</h1>
                <p style={{ fontSize: '1.2rem', maxWidth: '600px', textShadow: '1px 1px 2px black' }}>{modules[0].description}</p>
                <button 
                    onClick={() => setPlayingModule(modules[0])}
                    style={{ 
                        marginTop: '20px', 
                        padding: '10px 30px', 
                        fontSize: '1.2rem', 
                        background: '#fff', 
                        color: '#000', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        width: 'fit-content'
                    }}
                >
                    ▶ Assistir
                </button>
            </div>
        )}

        {/* Componente de Recomendações da IA */}
        <Recommendations onPlay={setPlayingModule} />

        {/* Listas de Vídeos por Categoria */}
        {categories.map((cat) => {
            const videos = getVideosByCategory(cat);
            if (videos.length === 0) return null;
            return (
                <div key={cat} className="season-row">
                    <h2 className="season-title">{cat}</h2>
                    <div className="row-container">
                        {videos.map(module => (
                            <VideoCard 
                                key={module.id} 
                                module={module} 
                                onPlay={setPlayingModule} 
                            />
                        ))}
                    </div>
                </div>
            );
        })}

        {/* Modal Player */}
        {playingModule && (
            <VideoPlayer 
                videoUrl={playingModule.videoUrl} 
                title={playingModule.title}
                description={playingModule.description}
                category={playingModule.category}
                onClose={() => setPlayingModule(null)}
            />
        )}

      </div>
    </div>
  );
};

export default App;
