import React, { useRef, useState, useEffect } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  initialTime?: number;
  onProgressUpdate: (progress: number, currentTime: number) => void;
  onVideoComplete: () => void;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl, 
  thumbnailUrl, 
  initialTime = 0,
  onProgressUpdate, 
  onVideoComplete,
  title 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoRef.current && initialTime > 0) {
        videoRef.current.currentTime = initialTime;
    }
  }, [initialTime]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      const progress = (current / total) * 100;
      
      setCurrentTime(current);
      onProgressUpdate(progress, current);
      
      if (current >= total && total > 0) {
          onVideoComplete();
          setIsPlaying(false);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-player-container" style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnailUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        style={{ width: '100%', display: 'block' }}
      />
      
      {/* Play Overlay */}
      {!isPlaying && (
        <div 
          onClick={togglePlay}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '4rem', color: 'white', opacity: 0.8 }}>▶</div>
        </div>
      )}

      {/* Controls */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
        padding: '10px 20px',
        display: 'flex', alignItems: 'center', gap: '15px',
        opacity: isPlaying ? 0 : 1,
        transition: 'opacity 0.3s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
      onMouseLeave={(e) => isPlaying && (e.currentTarget.style.opacity = '0')}
      >
        <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#ddd', fontSize: '0.8rem', marginBottom: '5px' }}>{title}</span>
            <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            value={currentTime}
            onChange={(e) => {
                const time = Number(e.target.value);
                if (videoRef.current) videoRef.current.currentTime = time;
                setCurrentTime(time);
            }}
            style={{ width: '100%', cursor: 'pointer' }}
            />
        </div>
        
        <span style={{ color: 'white', fontSize: '0.9rem', minWidth: '80px', textAlign: 'right' }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default VideoPlayer;
