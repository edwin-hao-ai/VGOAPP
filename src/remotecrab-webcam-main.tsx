import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/LanguageContext'
import RemoteCrabWebcamPage from './pages/RemoteCrabWebcamPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <RemoteCrabWebcamPage />
    </LanguageProvider>
  </StrictMode>,
)
