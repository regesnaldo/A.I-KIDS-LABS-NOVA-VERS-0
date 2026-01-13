import React from 'react';

export interface MissionData {
    id: number;
    numero: number;
    titulo: string;
    description: string;
    thumb: string;
    locked: boolean;
}

interface SeasonMissionsProps {
    missions: MissionData[];
    loading: boolean;
}

const SeasonMissions: React.FC<SeasonMissionsProps> = ({ missions, loading }) => {
    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                padding: '4rem',
                color: '#00ff88',
                fontSize: '1.5rem',
                textShadow: '0 0 10px rgba(0, 255, 136, 0.5)'
            }}>
                SCANNING NEURAL NETWORK...
            </div>
        );
    }

    if (missions.length === 0) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '3rem', 
                border: '1px dashed #333',
                borderRadius: '12px',
                color: '#666'
            }}>
                <p>Nenhuma missão detectada nesta frequência.</p>
            </div>
        );
    }

    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2rem',
            padding: '1rem 0'
        }}>
            {missions.map((mission) => (
                <div 
                    key={mission.id}
                    className="mission-card"
                    style={{ 
                        background: '#121212', 
                        borderRadius: '12px', 
                        overflow: 'hidden', 
                        border: '1px solid rgba(0, 255, 136, 0.1)',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        cursor: mission.locked ? 'not-allowed' : 'pointer',
                        opacity: mission.locked ? 0.6 : 1,
                        position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                        if (!mission.locked) {
                            e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
                            e.currentTarget.style.borderColor = '#00ff88';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!mission.locked) {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.1)';
                        }
                    }}
                >
                    <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                        <img 
                            src={mission.thumb} 
                            alt={mission.titulo} 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover',
                                filter: mission.locked ? 'grayscale(100%)' : 'none'
                            }} 
                        />
                        {mission.locked && (
                            <div style={{ 
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                                background: 'rgba(0,0,0,0.8)', 
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                fontSize: '2rem'
                            }}>
                                🔒
                            </div>
                        )}
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(0,0,0,0.8)',
                            color: '#00ff88',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            border: '1px solid #00ff88'
                        }}>
                            #{mission.numero}
                        </div>
                    </div>
                    
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ 
                            fontSize: '1.2rem', 
                            margin: '0 0 0.5rem 0', 
                            color: '#fff',
                            fontFamily: 'Orbitron, sans-serif'
                        }}>
                            {mission.titulo}
                        </h3>
                        <p style={{ 
                            fontSize: '0.9rem', 
                            color: '#aaa', 
                            margin: 0, 
                            lineHeight: '1.5',
                            display: '-webkit-box', 
                            WebkitLineClamp: 3, 
                            WebkitBoxOrient: 'vertical', 
                            overflow: 'hidden' 
                        }}>
                            {mission.description}
                        </p>
                    </div>
                    
                    {!mission.locked && (
                        <div style={{
                            padding: '0 1.5rem 1.5rem',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <span style={{
                                color: '#00ff88',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Iniciar Missão →
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SeasonMissions;
