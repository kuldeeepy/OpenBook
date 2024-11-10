import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { createBrowserRouter } from 'react-router-dom'
import './styles/home.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
