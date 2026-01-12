import React from 'react';

interface SeasonCardProps {
    title: string;
    description: string;
    image?: string;
    onClick?: () => void;
}

const SeasonCard: React.FC<SeasonCardProps> = ({ title, description, image, onClick }) => {
    return (
        <div className="season-card" style={{
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            aspectRatio: '16/9',
            backgroundColor: '#1a1a1a',
            border: '1px solid #333'
        }}
        onClick={onClick}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <div style={{
                width: '100%',
                height: '100%',
                backgroundImage: image ? `url(${image})` : 'linear-gradient(45deg, #111, #222)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '15px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                height: '50%'
            }}>
                <h3 style={{ 
                    margin: 0, 
                    fontSize: '1.2rem', 
                    color: '#fff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    fontWeight: 'bold'
                }}>
                    {title}
                </h3>
                <p style={{ 
                    margin: '5px 0 0', 
                    fontSize: '0.9rem', 
                    color: '#ddd',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {description}
                </p>
            </div>
            
            <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0, 255, 136, 0.9)',
                color: '#000',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                boxShadow: '0 0 10px rgba(0, 255, 136, 0.4)'
            }}>
                NOVA
            </div>
        </div>
    );
};

export default SeasonCard;
