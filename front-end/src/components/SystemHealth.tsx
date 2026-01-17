import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const SystemHealth = () => {
    const [status, setStatus] = useState<{ auth: 'online' | 'offline'; database: 'connected' | 'disconnected' } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const sessionResult = await supabase.auth.getSession();
                const auth = sessionResult.data.session ? 'online' : 'offline';
                const dbResult = await supabase.from('seasons').select('id').limit(1);
                const database = dbResult.error ? 'disconnected' : 'connected';
                setStatus({ auth, database });
            } catch {
                setStatus({ auth: 'offline', database: 'disconnected' });
            } finally {
                setLoading(false);
            }
        };
        checkHealth();
    }, []);

    const isAuthOnline = status?.auth === 'online';
    const isDbConnected = status?.database === 'connected';

    if (loading) {
        return <div style={{ padding: '100px 4%', color: 'white', textAlign: 'center' }}>Carregando diagnósticos...</div>;
    }

    return (
        <div style={{ padding: '100px 4%', color: 'white', minHeight: '100vh', background: '#050505' }}>
            <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Sistema de Diagnóstico e Monitoramento</h1>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '2rem',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {/* Supabase Auth Card */}
                <div style={{ 
                    background: '#121212', 
                    padding: '2rem', 
                    borderRadius: '15px', 
                    border: `1px solid ${isAuthOnline ? '#00ff88' : '#ff4444'}`,
                    boxShadow: `0 0 20px ${isAuthOnline ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 68, 68, 0.1)'}`,
                    transition: 'transform 0.3s ease'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>🔐 Supabase Auth</h2>
                        <div style={{ 
                            width: '12px', 
                            height: '12px', 
                            borderRadius: '50%', 
                            background: isAuthOnline ? '#00ff88' : '#ff4444',
                            boxShadow: `0 0 10px ${isAuthOnline ? '#00ff88' : '#ff4444'}`
                        }}></div>
                    </div>
                    <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>Status: <strong style={{ color: isAuthOnline ? '#00ff88' : '#ff4444' }}>{isAuthOnline ? 'ATIVO' : 'SEM SESSÃO'}</strong></p>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Provider: Supabase</p>
                </div>

                {/* Supabase Database Card */}
                <div style={{ 
                    background: '#121212', 
                    padding: '2rem', 
                    borderRadius: '15px', 
                    border: `1px solid ${isDbConnected ? '#00ccff' : '#ff4444'}`,
                    boxShadow: `0 0 20px ${isDbConnected ? 'rgba(0, 204, 255, 0.1)' : 'rgba(255, 68, 68, 0.1)'}`,
                    transition: 'transform 0.3s ease'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>🗄️ Supabase Database</h2>
                        <div style={{ 
                            width: '12px', 
                            height: '12px', 
                            borderRadius: '50%', 
                            background: isDbConnected ? '#00ccff' : '#ff4444',
                            boxShadow: `0 0 10px ${isDbConnected ? '#00ccff' : '#ff4444'}`
                        }}></div>
                    </div>
                    <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>Status: <strong style={{ color: isDbConnected ? '#00ccff' : '#ff4444' }}>{isDbConnected ? 'CONECTADO' : 'DESCONECTADO'}</strong></p>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Provider: Supabase</p>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button 
                    onClick={() => window.location.reload()}
                    style={{
                        background: 'transparent',
                        border: '1px solid #333',
                        color: '#888',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    🔄 Atualizar Status
                </button>
            </div>
        </div>
    );
};

export default SystemHealth;
