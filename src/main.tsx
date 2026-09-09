import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AmbientAudioProvider } from './context/AmbientAudioContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AmbientAudioProvider>
        <App />
      </AmbientAudioProvider>
    </BrowserRouter>
  </StrictMode>,
)
