import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/LanguageContext'
import RemoteCrabSuitesPage from './pages/RemoteCrabSuitesPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <RemoteCrabSuitesPage />
    </LanguageProvider>
  </StrictMode>,
)
