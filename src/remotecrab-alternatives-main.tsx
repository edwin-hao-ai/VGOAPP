import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/LanguageContext'
import RemoteCrabAlternativesPage from './pages/RemoteCrabAlternativesPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <RemoteCrabAlternativesPage />
    </LanguageProvider>
  </StrictMode>,
)
