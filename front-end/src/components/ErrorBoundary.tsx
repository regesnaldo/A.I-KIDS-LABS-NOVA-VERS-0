import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          color: '#ff4444', 
          background: '#111', 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontFamily: 'monospace',
          textAlign: 'center'
        }}>
          <h1>⚠️ CRITICAL SYSTEM FAILURE ⚠️</h1>
          <p>O sistema encontrou um erro fatal e precisou ser interrompido.</p>
          
          <div style={{ 
            background: '#000', 
            padding: '15px', 
            borderRadius: '5px', 
            border: '1px solid #333', 
            marginTop: '20px',
            maxWidth: '800px',
            overflow: 'auto',
            textAlign: 'left'
          }}>
            <p style={{ color: '#fff', marginBottom: '10px' }}><strong>Error:</strong> {this.state.error?.toString()}</p>
            <pre style={{ color: '#aaa', fontSize: '0.8rem' }}>
              {this.state.errorInfo?.componentStack}
            </pre>
          </div>

          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '30px',
              padding: '10px 20px',
              background: '#00ff88',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            REINICIAR SISTEMA
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
