import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import Quiz from './Quiz';

interface ModuleData {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  difficulty: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  phase: number;
  seasonId: string;
  quizzes: any[];
  progress: number;
  isCompleted: boolean;
  videoWatched: boolean;
  starsEarned: number;
  stoppedAt?: number;
}

interface ModuleProps {
  module: ModuleData;
  userId?: string;
  onProgressUpdate: (moduleId: string, progress: number, isCompleted: boolean) => void;
}

const Module: React.FC<ModuleProps> = ({ module, onProgressUpdate }) => {
  const [videoProgress, setVideoProgress] = useState(module.progress);
  const [videoWatched, setVideoWatched] = useState(module.videoWatched);
  const [starsEarned, setStarsEarned] = useState(module.starsEarned);
  const [currentView, setCurrentView] = useState<'video' | 'quiz' | 'completed'>('video');

  useEffect(() => {
    setVideoProgress(module.progress);
    setVideoWatched(module.videoWatched);
    setStarsEarned(module.starsEarned);
    
    if (module.isCompleted) {
      setCurrentView('completed');
    }
  }, [module]);

  const handleVideoProgress = async (progress: number) => {
    setVideoProgress(progress);
    
    // In a real app, this would update the backend
    // For now, just update local state and parent
    onProgressUpdate(module.id, progress, progress >= 100);
  };

  const handleVideoComplete = async () => {
    setVideoWatched(true);
    setVideoProgress(100);
    
    // In a real app, this would update the backend
    // For now, just update local state and parent
    onProgressUpdate(module.id, 100, false);
  };

  const handleQuizSubmit = async (_answers: string[], score: number) => {
    // Calculate stars based on score
    let newStarsEarned = 0;
    if (score >= 90) newStarsEarned = 3;
    else if (score >= 70) newStarsEarned = 2;
    else if (score >= 50) newStarsEarned = 1;
    
    setStarsEarned(newStarsEarned);
    
    // In a real app, this would submit to backend
    // For now, just update local state and parent
    onProgressUpdate(module.id, 100, true);
    setCurrentView('completed');
  };

  const handleStartQuiz = () => {
    setCurrentView('quiz');
  };

  const handleCancelQuiz = () => {
    setCurrentView('video');
  };

  const handleContinue = () => {
    setCurrentView('completed');
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>{module.title}</h2>
        <div className="module-meta">
          <span className={`difficulty ${module.difficulty}`}>Dificuldade: {module.difficulty}</span>
          <span className="duration">Duração: {module.duration}</span>
          <span className="phase">Fase: {module.phase}</span>
        </div>
      </div>
      
      <div className="module-content">
        {currentView === 'video' && (
          <div className="video-section">
            <VideoPlayer
              videoUrl={module.videoUrl}
              thumbnailUrl={module.thumbnailUrl}
              title={module.title}
              initialTime={module.stoppedAt} // Pass the resume time
              onProgressUpdate={handleVideoProgress}
              onVideoComplete={handleVideoComplete}
            />
            
            <div className="module-actions">
              {videoWatched ? (
                <button className="start-quiz-btn" onClick={handleStartQuiz}>
                  📝 Fazer Quiz
                </button>
              ) : (
                <div className="progress-info">
                  <p>Assista ao vídeo para liberar o quiz</p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>
                  <span>{Math.round(videoProgress)}% assistido</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {currentView === 'quiz' && (
          <div className="quiz-section">
            <Quiz
              moduleId={module.id}
              title={module.title}
              questions={module.quizzes}
              onSubmit={handleQuizSubmit}
              onCancel={handleCancelQuiz}
            />
          </div>
        )}
        
        {currentView === 'completed' && (
          <div className="completed-section">
            <div className="completion-badge">
              <h3>🎉 Módulo Concluído!</h3>
              <div className="stars-earned">
                <p>Estrelas ganhas:</p>
                <div className="stars">
                  {'⭐'.repeat(starsEarned)}
                  {'☆'.repeat(3 - starsEarned)}
                </div>
              </div>
              <p>Parabéns! Você completou este módulo.</p>
            </div>
            
            <div className="module-stats">
              <div className="stat">
                <span className="label">Vídeo:</span>
                <span className="value">{videoWatched ? '✓ Assistido' : '✗ Não assistido'}</span>
              </div>
              <div className="stat">
                <span className="label">Quiz:</span>
                <span className="value">{starsEarned > 0 ? `✓ ${starsEarned} estrelas` : '✗ Não realizado'}</span>
              </div>
            </div>
            
            <button className="continue-btn" onClick={handleContinue}>
              Continuar Aprendendo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Module;