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
    <h1 className="title">A.I. KIDS LABS</h1>
    
    {/* GRADE DE TEMPORADAS - LAYOUT NETFLIX */}
    <section className="labs-grid">
      {seasonsWithModules.map((season) => (
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
            {season.modules.map((module) => (
              <article 
                className={`lab-card ${module.state}`}
                key={module.id}
                style={{
                  opacity: module.state === 'locked' ? 0.5 : 1,
                  border: module.state === 'completed' ? '2px solid #10b981' : 
                         module.state === 'recommended' ? '2px solid #f59e0b' : 
                         '1px solid rgba(124, 58, 237, 0.3)'
                }}
              >
                <div style={{ 
                  fontSize: '4rem', 
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 0 10px rgba(124, 58, 237, 0.5))'
                }}>📚</div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  color: module.state === 'locked' ? '#6b7280' : 'white',
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 900,
                  letterSpacing: '0.05em',
                  textShadow: '0 0 15px rgba(124, 58, 237, 0.6)',
                  marginBottom: '12px'
                }}>{module.title}</h2>
                <p style={{ 
                  color: module.state === 'locked' ? '#6b7280' : '#9ca3af', 
                  fontSize: '1rem', 
                  marginTop: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  lineHeight: '1.4'
                }}>
                  {module.state === 'completed' ? '✓ Concluído' : 
                   module.state === 'locked' ? '🔒 Bloqueado' : 
                   `${module.missions.length} missões disponíveis`}
                </p>
              </article>
            ))}
          </section>
        </div>
      ))}
    </section>
  </main>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AIStudioPortal /></React.StrictMode>
);
