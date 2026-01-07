import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div style={{ 
      backgroundColor: 'black', 
      minHeight: '100vh', 
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      {/* O Outlet é onde o conteúdo das suas missões (Home, Aulas) vai aparecer */}
      <Outlet />
      
      {/* Esta é a ferramenta de espião (DevTools). 
          Ela aparecerá como uma bolinha no canto da tela! */}
      <TanStackRouterDevtools />
    </div>
  ),
});
