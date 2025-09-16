import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import EmotionProvider from './EmotionProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmotionProvider>
      <App />
    </EmotionProvider>
  </StrictMode>,
)
