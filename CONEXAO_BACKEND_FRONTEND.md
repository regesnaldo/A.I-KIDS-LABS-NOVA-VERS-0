# CONEXÃO_BACKEND_FRONTEND

**DATA:** 2026-01-09
**ESTADO:** EM ANDAMENTO

## PROBLEMA
Frontend quebra quando backend reinicia (devido a alterações no código ou falhas), deixando o usuário sem feedback ou com erros de requisição.

## SOLUÇÃO
Implementação de um sistema robusto de monitoramento de conexão com `waitForBackend()` no frontend e um endpoint `/api/health` no backend.

## PASSOS
1. **Criar endpoint health no backend**: Uma rota leve para verificar se o servidor está online.
2. **Implementar waitForBackend() no frontend**: Função que tenta reconectar periodicamente.
3. **Adicionar tela de carregamento**: Feedback visual para o usuário durante a reconexão.
4. **Criar fallback offline**: Modo que permite ao usuário tentar reconectar manualmente.

## CÓDIGOS

### 1. Backend (Health Endpoint)
*Arquivo: `backend/server.js`*

```javascript
// Endpoint de Status (Health Check)
app.get(['/api/status', '/api/health'], (req, res) => {
    res.json({ 
        status: 'online', 
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date()
    });
});
```

### 2. Frontend Service (Connection Logic)
*Arquivo: `front-end/src/services/api.ts`*

```typescript
// --- Connection Management ---

type ConnectionStatus = 'online' | 'offline' | 'reconnecting';
type ConnectionListener = (status: ConnectionStatus) => void;

const listeners: ConnectionListener[] = [];
let isReconnecting = false;

export const onConnectionChange = (listener: ConnectionListener) => {
    listeners.push(listener);
    return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
    };
};

const notifyListeners = (status: ConnectionStatus) => {
    listeners.forEach(l => l(status));
};

// Response interceptor to detect disconnection
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response || error.code === 'ERR_NETWORK' || error.response.status === 503) {
            if (!isReconnecting) {
                isReconnecting = true;
                notifyListeners('offline');
            }
        }
        return Promise.reject(error);
    }
);

export const checkBackendHealth = async (): Promise<boolean> => {
    try {
        await api.get('/health'); // Tries /api/health
        return true;
    } catch (error) {
        return false;
    }
};

export const waitForBackend = async (maxRetries = 20, interval = 2000): Promise<boolean> => {
    let retries = 0;
    notifyListeners('reconnecting');
    
    while (retries < maxRetries) {
        const isHealthy = await checkBackendHealth();
        if (isHealthy) {
            isReconnecting = false;
            notifyListeners('online');
            return true;
        }
        retries++;
        await new Promise(resolve => setTimeout(resolve, interval));
    }
    
    isReconnecting = false;
    notifyListeners('offline');
    return false;
};
```

### 3. Frontend UI (App Component)
*Arquivo: `front-end/src/App.tsx`*

```typescript
import { modulesAPI, waitForBackend, onConnectionChange } from './services/api';

// ... inside App component ...

  // Connection States: 'checking', 'online', 'reconnecting', 'offline'
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'online' | 'reconnecting' | 'offline'>('checking');

  // Monitor Connection
  useEffect(() => {
    // 1. Subscribe to connection changes from API interceptors
    const unsubscribe = onConnectionChange((status) => {
      setConnectionStatus(status);
      if (status === 'offline') {
        // Auto-retry connection when we go offline
        waitForBackend().then(success => {
            if (!success) setConnectionStatus('offline');
        });
      }
    });

    // 2. Initial Check
    const checkServer = async () => {
      const isReady = await waitForBackend(5, 1000); // Quick check on load
      if (isReady) {
        setConnectionStatus('online');
      } else {
        setConnectionStatus('offline');
      }
    };
    checkServer();

    return () => unsubscribe();
  }, []);

  // ... render logic ...

  if (connectionStatus === 'offline') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#050505', color: '#ff4444' }}>
            <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '1rem' }}>SISTEMA OFFLINE</h2>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Não foi possível conectar ao servidor neural.</p>
            <button 
                onClick={() => {
                    setConnectionStatus('reconnecting');
                    waitForBackend();
                }} 
                style={{ 
                    padding: '12px 30px', 
                    background: 'var(--primary)', 
                    color: '#000', 
                    border: 'none', 
                    borderRadius: '50px', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    fontSize: '1rem'
                }}
            >
                TENTAR NOVAMENTE
            </button>
        </div>
      );
  }

  if (connectionStatus === 'checking' || connectionStatus === 'reconnecting') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#050505', color: '#0f0' }}>
            <h2 className="text-gradient" style={{ animation: 'pulse 2s infinite' }}>
                {connectionStatus === 'reconnecting' ? 'RECONECTANDO SISTEMA...' : 'INICIANDO PROTOCOLOS...'}
            </h2>
            <div className="loading-bar" style={{ width: '200px', height: '4px', background: '#333', marginTop: '20px', overflow: 'hidden', borderRadius: '2px' }}>
                <div style={{ width: '50%', height: '100%', background: 'var(--primary)', animation: 'loading 1s infinite' }}></div>
            </div>
            {connectionStatus === 'reconnecting' && (
                <p style={{ marginTop: '20px', color: '#666', fontSize: '0.9rem' }}>Aguardando servidor...</p>
            )}
        </div>
      );
  }
```

### 4. Styles (CSS Animations)
*Arquivo: `front-end/src/neon-styles.css`*

```css
@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
```
