import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SeasonDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [season, setSeason] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [missions, setMissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await api.get(`/seasons/${id}/missions`);
                setSeason(response.data.season);
                setMissions(response.data.missions);
            } catch (error) {
                console.error("Failed to fetch missions", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMissions();
        }
    }, [id]);

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#0f0' }}>LOADING MISSIONS...</div>;
    }

    if (!season) {
        return <div style={{ padding: '2rem', color: 'white' }}>Temporada não encontrada.</div>;
    }

    return (
        <div style={{ padding: '2rem 4%', minHeight: '100vh', background: '#141414', color: 'white' }}>
            <button 
                onClick={() => navigate(-1)} 
                style={{ 
                    background: 'none', 
                    border: '1px solid #333', 
                    color: '#ccc', 
                    padding: '8px 16px', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    marginBottom: '2rem'
                }}
            >
                ← Voltar
            </button>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '3rem' }}>
                <img 
                    src={season.image} 
                    alt={season.title} 
                    style={{ width: '300px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} 
                />
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', margin: 0 }}>{season.title}</h1>
                    <p style={{ fontSize: '1.2rem', color: '#aaa', marginTop: '1rem' }}>{season.description}</p>
                </div>
            </div>

            <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Missões da Temporada</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {missions.map((mission) => (
                    <div 
                        key={mission.id}
                        style={{ 
                            background: '#1f1f1f', 
                            borderRadius: '8px', 
                            overflow: 'hidden', 
                            border: '1px solid #333',
                            transition: 'transform 0.2s',
                            cursor: mission.locked ? 'not-allowed' : 'pointer',
                            opacity: mission.locked ? 0.7 : 1
                        }}
                        onMouseEnter={(e) => !mission.locked && (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseLeave={(e) => !mission.locked && (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                            <img 
                                src={mission.thumb} 
                                alt={mission.titulo} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                            {mission.locked && (
                                <div style={{ 
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                                    background: 'rgba(0,0,0,0.7)', 
                                    display: 'flex', justifyContent: 'center', alignItems: 'center' 
                                }}>
                                    🔒
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: '#fff' }}>{mission.numero}. {mission.titulo}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#888', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {mission.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeasonDetailsPage;
