import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Importa o esqueleto e a página inicial que você criou
import { Route as rootRoute } from './routes/__root'
import { Route as indexRoute } from './index'

// Une as peças no mapa do site
const routeTree = rootRoute.addChildren([indexRoute])
const router = createRouter({ 
  routeTree,
  basepath: '/A.I-KIDS-LABS-NOVA-VERS-O/'
})

// Liga o motor no HTML
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}
