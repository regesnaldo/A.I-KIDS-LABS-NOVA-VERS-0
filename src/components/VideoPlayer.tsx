import React, { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  onProgressUpdate: (progress: number) => void;
  onVideoComplete: () => void;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl, 
  thumbnailUrl, 
  onProgressUpdate, 
  onVideoComplete,
  title 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Simulate video loading and playback
  useEffect(() => {
    // Simulate loading time
    const loadTimer = setTimeout(() => {
      setVideoLoaded(true);
      setShowPlaceholder(false);
    }, 1500);

    return () => {
      clearTimeout(loadTimer);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate progress tracking
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    
    progressInterval.current = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        const newProgress = (newTime / 300) * 100; // Assuming 5 min video for demo
        
        setProgress(Math.min(newProgress, 100));
        onProgressUpdate(Math.min(newProgress, 100));
        
        if (newTime >= 300) { // 5 minutes in seconds
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
          onVideoComplete();
          setIsPlaying(false);
          return 300;
        }
        
        return newTime;
      });
    }, 1000); // Update every second
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const handleReset = () => {
    setCurrentTime(0);
    setProgress(0);
    setIsPlaying(false);
    onProgressUpdate(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-player-container">
      <div className="video-player-wrapper">
        {showPlaceholder ? (
          <div className="video-placeholder">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Carregando vídeo...</p>
            </div>
          </div>
        ) : (
          <div className="actual-video-content">
            <div className="video-display">
              <div className="placeholder-video">
                <div className="video-thumbnail" style={{ backgroundImage: `url(${thumbnailUrl})` }}>
                  <div className="play-overlay">
                    <div className="play-button" onClick={isPlaying ? handlePause : handlePlay}>
                      {isPlaying ? '⏸️' : '▶️'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="video-controls">
                <div className="progress-container">
                  <div 
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="time-info">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(300)}</span>
                </div>
              </div>
              
              <div className="control-buttons">
                <button 
                  className="play-pause-btn" 
                  onClick={isPlaying ? handlePause : handlePlay}
                >
                  {isPlaying ? '⏸️ Pausar' : '▶️ Assistir'}
                </button>
                <button className="reset-btn" onClick={handleReset}>
                  ↺ Reiniciar
                </button>
              </div>
            </div>
            
            <div className="video-info">
              <h3>{title}</h3>
              <p>Este é um vídeo educativo sobre o tema abordado no módulo.</p>
              <div className="video-stats">
                <span>🎯 Progresso: {Math.round(progress)}%</span>
                <span>⏱️ Tempo: {formatTime(currentTime)}/05:00</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .video-player-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          background: #0b0b0b;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .video-player-wrapper {
          width: 100%;
        }
        
        .video-placeholder {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 400px;
          background: linear-gradient(135deg, #1a1a1a, #0d0d0d);
        }
        
        .loading-spinner {
          text-align: center;
          color: white;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-left: 4px solid #7c3aed;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 15px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .actual-video-content {
          padding: 20px;
        }
        
        .video-display {
          background: #000;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 15px;
        }
        
        .placeholder-video {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
        }
        
        .video-thumbnail {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .play-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .play-button:hover {
          background: rgba(124, 58, 237, 1);
          transform: scale(1.1);
        }
        
        .video-controls {
          padding: 10px;
        }
        
        .progress-container {
          width: 100%;
          height: 6px;
          background: #333;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 5px;
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #7c3aed, #3b82f6);
          transition: width 0.1s ease;
        }
        
        .time-info {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #aaa;
        }
        
        .control-buttons {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }
        
        .play-pause-btn, .reset-btn {
          flex: 1;
          padding: 10px 15px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .play-pause-btn {
          background: #7c3aed;
          color: white;
        }
        
        .reset-btn {
          background: #374151;
          color: white;
        }
        
        .play-pause-btn:hover {
          background: #6d28d9;
        }
        
        .reset-btn:hover {
          background: #4b5563;
        }
        
        .video-info {
          background: #1a1a1a;
          padding: 15px;
          border-radius: 8px;
        }
        
        .video-info h3 {
          color: white;
          margin: 0 0 10px 0;
          font-size: 1.2em;
        }
        
        .video-info p {
          color: #ccc;
          margin: 0 0 10px 0;
          line-height: 1.4;
        }
        
        .video-stats {
          display: flex;
          justify-content: space-between;
          color: #7c3aed;
          font-weight: bold;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;