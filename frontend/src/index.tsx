import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <div style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: 'black', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '4rem', color: '#0ff', textShadow: '0 0 20px #0ff' }}>
        A.I. KIDS LABS
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#f0f', marginTop: '20px' }}>
        Missão Neon: Iniciada
      </p>
      <button style={{ marginTop: '40px', padding: '15px 40px', backgroundColor: '#0ff', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' }}>
        ENTRAR NO LAB
      </button>
    </div>
  ),
});
