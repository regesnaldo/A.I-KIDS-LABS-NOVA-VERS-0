import { useState, FormEvent } from 'react';
import { authAPI } from '../services/api';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const data = isLogin
        ? await authAPI.login({ email, password })
        : await authAPI.register({ name, email, password });

      if (!data.success) {
        setError(data.error);
        return;
      }
      if (!data.token) {
        setError('Confirme seu email para concluir o acesso.');
        return;
      }
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      minHeight: '100vh', width: '100%', padding: '20px', boxSizing: 'border-box'
    }}>
      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
        background: 'radial-gradient(circle at center, rgba(0,255,136,0.1) 0%, transparent 70%)', 
        zIndex: -1, pointerEvents: 'none'
      }}></div>

      <h1 className="text-gradient" style={{ 
        fontSize: '3.5rem', marginBottom: '2rem', textAlign: 'center', 
        fontWeight: '900', letterSpacing: '-2px', textShadow: '0 10px 30px rgba(0,0,0,0.5)' 
      }}>
        A.I. KIDS LABS
      </h1>
      
      <div className="glass-panel animate-slide-up" style={{ 
        padding: '3rem', borderRadius: '24px', width: '100%', maxWidth: '400px',
        animation: 'float 6s ease-in-out infinite'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>
          {isLogin ? 'Bem-vindo!' : 'Criar Conta'}
        </h2>
        
        {error && (
          <div style={{ 
            background: 'rgba(255, 68, 68, 0.1)', border: '1px solid #ff4444', 
            color: '#ff4444', padding: '10px', borderRadius: '8px', marginBottom: '1rem', 
            fontSize: '0.9rem', textAlign: 'center' 
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {!isLogin && (
            <input 
              type="text" placeholder="Seu Nome" value={name} onChange={e => setName(e.target.value)}
              style={{ 
                padding: '1rem', background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', color: 'white', 
                borderRadius: '12px', outline: 'none', fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          )}
          <input 
            type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            style={{ 
              padding: '1rem', background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)', color: 'white', 
              borderRadius: '12px', outline: 'none', fontSize: '1rem',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          <input 
            type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}
            style={{ 
              padding: '1rem', background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)', color: 'white', 
              borderRadius: '12px', outline: 'none', fontSize: '1rem',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          
          <button type="submit" disabled={loading} style={{ 
            padding: '1rem', background: 'var(--primary)', color: '#000', fontWeight: '800', 
            border: 'none', borderRadius: '12px', cursor: 'pointer', marginTop: '1rem',
            fontSize: '1.1rem', letterSpacing: '1px', transition: 'transform 0.2s',
            opacity: loading ? 0.7 : 1
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {loading ? 'CARREGANDO...' : (isLogin ? 'ACESSAR' : 'COMEÇAR AVENTURA')}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#888' }}>
          {isLogin ? 'Ainda não é um explorador?' : 'Já tem seu passaporte?'}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: 'var(--primary)', cursor: 'pointer', marginLeft: '8px', fontWeight: 'bold' }}
          >
            {isLogin ? 'Criar conta grátis' : 'Entrar agora'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
