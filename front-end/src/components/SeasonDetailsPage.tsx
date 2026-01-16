import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import SeasonMissions, { MissionData } from './SeasonMissions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SeasonDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [season, setSeason] = useState<any>(null);
    const [missions, setMissions] = useState<MissionData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await api.get(`/seasons/${id}/missions`);
                setSeason(response.data.season);
                const missionsData = response.data.missions;
                // Fix: Ensure missions is always an array to prevent "map is not a function" error
                setMissions(Array.isArray(missionsData) ? missionsData : []);
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

    if (loading && !season) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#050505' }}><SeasonMissions missions={[]} loading={true} /></div>;
    }

    if (!season) {
        return <div style={{ padding: '2rem', color: 'white' }}>Temporada não encontrada.</div>;
    }

    return (
        <div style={{ padding: '2rem 4%', minHeight: '100vh', background: '#050505', color: 'white', backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)' }}>
            <button 
                onClick={() => navigate(-1)} 
                style={{ 
                    background: 'rgba(255,255,255,0.1)', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    color: '#fff', 
                    padding: '8px 16px', 
                    borderRadius: '20px', 
                    cursor: 'pointer',
                    marginBottom: '2rem',
                    backdropFilter: 'blur(5px)',
                    transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
                ← Voltar
            </button>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: -2, background: 'linear-gradient(45deg, #00ff88, #00ccff)', borderRadius: '10px', filter: 'blur(10px)', opacity: 0.5 }}></div>
                    <img 
                        src={season.image} 
                        alt={season.title} 
                        style={{ position: 'relative', width: '300px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 1 }} 
                    />
                </div>
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '3.5rem', margin: 0, lineHeight: 1.1 }}>{season.title}</h1>
                    <p style={{ fontSize: '1.2rem', color: '#aaa', marginTop: '1rem', maxWidth: '600px' }}>{season.description}</p>
                </div>
            </div>

            <h2 style={{ 
                borderBottom: '1px solid rgba(0, 255, 136, 0.3)', 
                paddingBottom: '10px', 
                marginBottom: '20px',
                color: '#00ff88',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '1.5rem'
            }}>
                Missões da Temporada
            </h2>

            <SeasonMissions missions={missions} loading={loading} />
        </div>
    );
};

export default SeasonDetailsPage;
