import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';
import dashjs from 'dashjs';

interface VideoPlayerProps {
    videoUrl: string;
    title: string;
    description?: string;
    category?: string;
    onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, description, category, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<any>(null); // Referência para instância do player (HLS ou DASH)

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.focus();
        
        // Bloquear rolagem do corpo
        document.body.style.overflow = 'hidden';

        // Detecção de Formato
        const isHLS = videoUrl.endsWith('.m3u8');
        const isDASH = videoUrl.endsWith('.mpd');

        // Limpeza de player anterior
        const cleanupPlayer = () => {
            if (playerRef.current) {
                if (isHLS && playerRef.current.destroy) {
                    playerRef.current.destroy();
                } else if (isDASH && playerRef.current.reset) {
                    playerRef.current.reset();
                }
                playerRef.current = null;
            }
        };

        cleanupPlayer();

        // Inicialização do Player
        if (isHLS && Hls.isSupported()) {
            // Configuração HLS
            const hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(e => console.log("Autoplay bloqueado:", e));
            });
            playerRef.current = hls;
        } 
        else if (isDASH) {
            // Configuração DASH
            const player = dashjs.MediaPlayer().create();
            player.initialize(video, videoUrl, true);
            playerRef.current = player;
        } 
        else {
            // Fallback MP4 nativo
            video.src = videoUrl;
            video.play().catch(e => console.log("Autoplay bloqueado:", e));
        }

        return () => {
            document.body.style.overflow = 'unset';
            cleanupPlayer();
        };
    }, [videoUrl]);

    return (
        <div className="modal-overlay" onClick={onClose} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)'
        }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
                width: '90%',
                maxWidth: '1200px',
                height: '90vh',
                backgroundColor: '#141414',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
                border: '1px solid rgba(0, 229, 255, 0.3)'
            }}>
                <button className="close-modal" onClick={onClose} style={{
                    position: 'absolute',
                    top: '15px',
                    right: '20px',
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    zIndex: 10
                }}>&times;</button>
                
                <div className="video-container" style={{ flex: '1', backgroundColor: '#000', position: 'relative' }}>
                    <video 
                        ref={videoRef}
                        controls 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    >
                        Seu navegador não suporta a tag de vídeo.
                    </video>
                </div>

                <div className="video-info" style={{ padding: '20px', color: '#fff', borderTop: '1px solid #333' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h2 style={{ margin: 0, fontSize: '1.8rem' }}>
                            {title} 
                            <span style={{ 
                                fontSize: '0.9rem', 
                                color: '#00e5ff', 
                                border: '1px solid #00e5ff', 
                                padding: '2px 8px', 
                                borderRadius: '4px', 
                                marginLeft: '15px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                {category || 'Geral'}
                            </span>
                        </h2>
                    </div>
                    
                    <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: '1.5', maxWidth: '80%' }}>
                        {description || 'Sem descrição disponível.'}
                    </p>
                    
                    <div style={{ marginTop: '20px' }}>
                        <button style={{ 
                            padding: '10px 25px', 
                            background: 'rgba(255,255,255,0.1)', 
                            color: 'white', 
                            border: '1px solid rgba(255,255,255,0.2)', 
                            borderRadius: '4px', 
                            cursor: 'pointer', 
                            marginRight: '15px',
                            fontWeight: 'bold',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        >
                            👍 Gostei
                        </button>
                        <button style={{ 
                            padding: '10px 25px', 
                            background: 'rgba(255,255,255,0.1)', 
                            color: 'white', 
                            border: '1px solid rgba(255,255,255,0.2)', 
                            borderRadius: '4px', 
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        >
                            👎 Não Gostei
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
