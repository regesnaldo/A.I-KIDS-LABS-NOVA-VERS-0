import React from 'react'
import ReactDOM from 'react-dom/client'
import './neon-styles.css'

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
}

// Dados das temporadas
const seasons: Season[] = [
  {
    id: 'season-001',
    order: 1,
    title: 'Temporada 01',
    phase: 1,
    description: 'Introdução à lógica de programação',
    ageRange: '6+',
    status: 'published',
    coverImage: '/images/season-001-cover.jpg',
    featured: true
  },
  {
    id: 'season-002',
    order: 2,
    title: 'Temporada 02',
    phase: 1,
    description: 'Conceitos básicos de matemática',
    ageRange: '6+',
    status: 'published',
    coverImage: '/images/season-002-cover.jpg',
    featured: false
  },
  {
    id: 'season-003',
    order: 3,
    title: 'Temporada 03',
    phase: 2,
    description: 'Lógica e raciocínio lógico',
    ageRange: '7+',
    status: 'published',
    coverImage: '/images/season-003-cover.jpg',
    featured: false
  },
  {
    id: 'season-004',
    order: 4,
    title: 'Temporada 04',
    phase: 2,
    description: 'Geometria e formas',
    ageRange: '7+',
    status: 'published',
    coverImage: '/images/season-004-cover.jpg',
    featured: false
  },
  {
    id: 'season-005',
    order: 5,
    title: 'Temporada 05',
    phase: 3,
    description: 'Álgebra e padrões',
    ageRange: '8+',
    status: 'published',
    coverImage: '/images/season-005-cover.jpg',
    featured: false
  }
];

// Gerar temporadas 6-50 programaticamente
for (let i = 5; i < 49; i++) { // i = 5 to 49 corresponds to seasons 6-50
  const seasonIndex = i + 1; // This will be 6-50
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
    coverImage: `/images/season-${String(seasonIndex).padStart(3, '0')}-cover.jpg`,
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
      title: `Missão ${i}`,
      description: `Conteúdo educativo da ${seasonId} - Missão ${i}`,
      duration: '10 min',
      difficulty: i <= 2 ? 'easy' : i <= 4 ? 'medium' : 'hard',
      seasonId,
      state: seasonNumber <= 2 || i <= 3 ? 'available' : 'locked'
    });
  }
  
  return modules;
};

// Componente de Card de Laboratório
const LabCard = ({ module }: { module: MissionModule }) => {
  return (
    <article className={`lab-card ${module.state}`} tabIndex={0}>
      <h3 className="card-title">{module.title}</h3>
      
      <div className="card-overlay">
        <div className="card-actions">
          <button className="btn-play">▶ Assistir</button>
          <button className="btn-like">👍 Mais Informações</button>
        </div>
        
        <div className="card-meta">
          <span className="duration">⏱️ {module.duration}</span>
          <span className={`difficulty ${module.difficulty}`}>
            {module.difficulty === 'easy' ? '🟢 Fácil' : 
             module.difficulty === 'medium' ? '🟡 Médio' : '🔴 Difícil'}
          </span>
        </div>
      </div>
    </article>
  );
};

// Componente de Linha de Temporada
const SeasonRow = ({ season }: { season: Season }) => {
  const modules = getMissionModules(season.id);
  
  return (
    <section className="season-container">
      <h2 className="season-title">{season.title}</h2>
      <p className="season-description">{season.description}</p>
      <div className="season-row">
        {modules.map(module => (
          <LabCard key={module.id} module={module} />
        ))}
      </div>
    </section>
  );
};

// Componente Principal do App
const App = () => {
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

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">A.I. KIDS LABS</h1>
        <p className="subtitle">Laboratório de Aprendizado Interativo</p>
      </header>
      
      <main className="main-content">
        {Object.entries(seasonsByPhase).map(([phase, seasonList]) => (
          <div key={phase} className="phase-section">
            <h2 className="phase-title">Fase Pedagógica {phase}</h2>
            <div className="labs-grid">
              {seasonList.map(season => (
                <SeasonRow key={season.id} season={season} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

// Renderizar o app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);