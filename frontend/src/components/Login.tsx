import React, { useState } from 'react';
import { authAPI } from '../services/api';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      let data;
      if (isLogin) {
        data = await authAPI.login({ email, password });
      } else {
        data = await authAPI.register({ name, email, password, age: 10 });
      }

      if (data.success || data.token) {
        localStorage.setItem('token', data.token);
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        onLogin(data.user || { name: 'User', email }); 
      } else {
        setError(data.msg || data.error || 'Erro na autenticação');
      }
    } catch (err) {
      console.error(err);
      setError('Erro de conexão com o servidor. Verifique se o backend está rodando.');
    }
  };

  return (
    <div className="login-container" style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      height: '100vh', background: '#000', color: '#fff' 
    }}>
      <h1 style={{ color: '#00ff00', textShadow: '0 0 10px #00ff00', marginBottom: '2rem' }}>A.I. KIDS LABS</h1>
      
      <div style={{ 
        background: '#1a1a1a', padding: '2rem', borderRadius: '8px', 
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)', width: '300px' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{isLogin ? 'Entrar' : 'Cadastrar'}</h2>
        
        {error && <div style={{ color: '#ff4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLogin && (
            <input 
              type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}
              style={{ padding: '0.8rem', background: '#333', border: '1px solid #444', color: 'white', borderRadius: '4px' }}
            />
          )}
          <input 
            type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            style={{ padding: '0.8rem', background: '#333', border: '1px solid #444', color: 'white', borderRadius: '4px' }}
          />
          <input 
            type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}
            style={{ padding: '0.8rem', background: '#333', border: '1px solid #444', color: 'white', borderRadius: '4px' }}
          />
          
          <button type="submit" style={{ 
            padding: '0.8rem', background: '#00ff00', color: 'black', fontWeight: 'bold', 
            border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' 
          }}>
            {isLogin ? 'ACESSAR' : 'CRIAR CONTA'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#ccc' }}>
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: '#00ff00', cursor: 'pointer', marginLeft: '5px' }}
          >
            {isLogin ? 'Registre-se' : 'Faça login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;