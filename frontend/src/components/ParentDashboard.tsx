import React, { useState, useEffect } from 'react';

interface ChildProgress {
  id: string;
  name: string;
  age: number;
  totalModules: number;
  completedModules: number;
  totalStars: number;
  avgProgress: number;
  lastAccessed: string;
}

interface ParentDashboardProps {
  parentId: string;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ parentId: _parentId }) => {
  const [children, setChildren] = useState<ChildProgress[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [contentRestrictions, setContentRestrictions] = useState({
    maxDailyTime: 60, // in minutes
    maxDifficulty: 'medium', // 'easy', 'medium', 'hard'
    allowedHours: { start: '08:00', end: '20:00' },
    parentalPin: '1234'
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call to get children's progress
    setTimeout(() => {
      const mockChildren: ChildProgress[] = [
        {
          id: 'child-1',
          name: 'Joãozinho',
          age: 8,
          totalModules: 15,
          completedModules: 10,
          totalStars: 22,
          avgProgress: 78,
          lastAccessed: '2023-12-01T10:30:00Z'
        },
        {
          id: 'child-2',
          name: 'Mariazinha',
          age: 10,
          totalModules: 12,
          completedModules: 8,
          totalStars: 18,
          avgProgress: 65,
          lastAccessed: '2023-12-01T14:15:00Z'
        }
      ];
      setChildren(mockChildren);
      setSelectedChild('child-1');
      setLoading(false);
    }, 1000);
  }, []);

  const handleSaveRestrictions = () => {
    // In a real app, this would save to backend
    alert('Restrições salvas com sucesso!');
  };

  const handleGenerateReport = () => {
    // In a real app, this would generate a PDF report
    alert('Relatório gerado com sucesso!');
  };

  if (loading) {
    return (
      <div className="parent-dashboard">
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando informações...</p>
        </div>
      </div>
    );
  }

  const selectedChildData = children.find(child => child.id === selectedChild);

  return (
    <div className="parent-dashboard">
      <h1>Painel de Controle Parental</h1>
      
      <div className="dashboard-content">
        <div className="children-selector">
          <h2>Selecione a criança</h2>
          <div className="child-buttons">
            {children.map(child => (
              <button
                key={child.id}
                className={`child-btn ${selectedChild === child.id ? 'active' : ''}`}
                onClick={() => setSelectedChild(child.id)}
              >
                {child.name} (Idade: {child.age})
              </button>
            ))}
          </div>
        </div>
        
        {selectedChildData && (
          <div className="child-details">
            <h2>Progresso de {selectedChildData.name}</h2>
            
            <div className="progress-summary">
              <div className="stat-card">
                <h3>{selectedChildData.completedModules}/{selectedChildData.totalModules}</h3>
                <p>Módulos Completos</p>
              </div>
              
              <div className="stat-card">
                <h3>{selectedChildData.totalStars}</h3>
                <p>Total de Estrelas</p>
              </div>
              
              <div className="stat-card">
                <h3>{selectedChildData.avgProgress}%</h3>
                <p>Progresso Médio</p>
              </div>
            </div>
            
            <div className="progress-chart">
              <h3>Progresso por Fase</h3>
              <div className="chart-bars">
                {[1, 2, 3, 4, 5].map(phase => (
                  <div key={phase} className="chart-bar">
                    <div className="bar-label">Fase {phase}</div>
                    <div className="bar-container">
                      <div 
                        className="bar-fill" 
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                    <div className="bar-value">{Math.round(Math.random() * 100)}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="parental-controls">
          <h2>Controles Parentais</h2>
          
          <div className="control-group">
            <label>Tempo máximo diário (minutos):</label>
            <input
              type="number"
              value={contentRestrictions.maxDailyTime}
              onChange={(e) => setContentRestrictions({
                ...contentRestrictions,
                maxDailyTime: parseInt(e.target.value) || 0
              })}
            />
          </div>
          
          <div className="control-group">
            <label>Dificuldade máxima permitida:</label>
            <select
              value={contentRestrictions.maxDifficulty}
              onChange={(e) => setContentRestrictions({
                ...contentRestrictions,
                maxDifficulty: e.target.value
              })}
            >
              <option value="easy">Fácil</option>
              <option value="medium">Médio</option>
              <option value="hard">Difícil</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>Horário permitido:</label>
            <div className="time-inputs">
              <input
                type="time"
                value={contentRestrictions.allowedHours.start}
                onChange={(e) => setContentRestrictions({
                  ...contentRestrictions,
                  allowedHours: {
                    ...contentRestrictions.allowedHours,
                    start: e.target.value
                  }
                })}
              />
              <span>às</span>
              <input
                type="time"
                value={contentRestrictions.allowedHours.end}
                onChange={(e) => setContentRestrictions({
                  ...contentRestrictions,
                  allowedHours: {
                    ...contentRestrictions.allowedHours,
                    end: e.target.value
                  }
                })}
              />
            </div>
          </div>
          
          <div className="control-group">
            <label>PIN de controle parental:</label>
            <input
              type="password"
              value={contentRestrictions.parentalPin}
              onChange={(e) => setContentRestrictions({
                ...contentRestrictions,
                parentalPin: e.target.value
              })}
            />
          </div>
          
          <div className="control-actions">
            <button className="save-btn" onClick={handleSaveRestrictions}>
              Salvar Restrições
            </button>
            <button className="report-btn" onClick={handleGenerateReport}>
              Gerar Relatório
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;