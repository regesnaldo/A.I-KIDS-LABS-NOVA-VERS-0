import React from 'react';
import ReactDOM from 'react-dom/client';
import { seasons, seasonModules, missions } from './data/seasons';
import { AIContext, CompletedMission } from './types';

// Sample AI context for demonstration
const sampleAIContext: AIContext = {
  xp: 1500,
  completedMissions: [
    {
      missionId: 'season-001-mod-01-mission-01',
      completedAt: new Date().toISOString(),
      score: 95,
      attempts: 1
    },
    {
      missionId: 'season-001-mod-01-mission-02',
      completedAt: new Date().toISOString(),
      score: 87,
      attempts: 2
    }
  ],
  difficultyPreference: 'medium'
};

// Join data for display - group modules by season
const seasonsWithModules = seasons
  .filter(season => season.status === 'published') // Only show published seasons
  .map(season => ({
    ...season,
    modules: seasonModules
      .filter(module => module.seasonId === season.id)
      .map(module => ({
        ...module,
        // Get sample missions for display
        missions: missions
          .filter(mission => mission.moduleId === module.id)
          .slice(0, 3), // Show first 3 missions as examples
        // Determine visual state based on AI context
        state: getModuleState(module.id, sampleAIContext)
      }))
  }));

// Function to determine visual state without complex logic
function getModuleState(moduleId: string, context: AIContext): 'completed' | 'recommended' | 'locked' | 'available' {
  // Check if any mission in this module is completed
  const hasCompletedMission = context.completedMissions.some(cm => 
    cm.missionId.startsWith(moduleId)
  );
  
  if (hasCompletedMission) {
    return 'completed';
  }
  
  // For now, mark as available if not completed
  return 'available';
}

const AIStudioPortal = () => (
  <main className="app">
    {/* HERO SECTION - Temporada 01 destaque */}
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">A.I. KIDS LABS</h1>
        <p className="hero-description">
          Explore o fascinante mundo da Inteligência Artificial com missões divertidas e educativas! 
          Aprenda conceitos importantes enquanto se diverte em uma jornada tecnológica única.
        </p>
        <div className="hero-buttons">
          <button className="hero-button primary" onClick={() => console.log('Assistir clicado')}>
            ▶️ Assistir
          </button>
          <button className="hero-button secondary" onClick={() => console.log('Mais Informações clicado')}>
            ℹ️ Mais Informações
          </button>
        </div>
      </div>
    </section>
    
    {/* GRADE DE TEMPORADAS - LAYOUT NETFLIX */}
    <section className="labs-grid">
      {seasonsWithModules && seasonsWithModules.length > 0 ? (
        seasonsWithModules.map((season) => (
          <div key={season.id}>
            <h2 style={{ 
              color: '#7c3aed', 
              fontSize: '1.5rem', 
              fontWeight: 700,
              fontFamily: 'Orbitron, sans-serif',
              marginBottom: '15px',
              textShadow: '0 0 10px rgba(124, 58, 237, 0.5)'
            }}>{season.title}</h2>
            
            <section className="season-row">
              {season.modules && season.modules.length > 0 ? (
                season.modules.map((module) => (
                  <article 
                    className={`lab-card ${module.state}`}
                    key={module.id}
                    tabIndex={0}
                    style={{
                      opacity: module.state === 'locked' ? 0.5 : 1,
                      border: module.state === 'completed' ? '2px solid #10b981' : 
                             module.state === 'recommended' ? '2px solid #f59e0b' : 
                             '1px solid rgba(124, 58, 237, 0.3)'
                    }}
                  >
                    <h3 className="card-title">{module.title}</h3>
                    
                    <div className="card-overlay">
                      <div className="card-actions">
                        <button className="btn-play">▶</button>
                        <button className="btn-like">👍</button>
                      </div>
                      
                      <div className="card-meta">
                        <span className="duration">⏱️ 10 min</span>
                        <span className="difficulty easy">🟢 Fácil</span>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p style={{ color: '#6b7280', textAlign: 'center', width: '100%' }}>
                  Nenhum módulo disponível
                </p>
              )}
            </section>
          </div>
        ))
      ) : (
        <div style={{ 
          color: '#6b7280', 
          textAlign: 'center', 
          width: '100%',
          padding: '40px 0',
          fontSize: '1.5rem'
        }}>
          Conteúdo em preparação
        </div>
      )}
    </section>
  </main>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
);
