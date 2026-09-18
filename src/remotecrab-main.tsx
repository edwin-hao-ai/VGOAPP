import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/LanguageContext'
import RemoteCrabPage from './pages/RemoteCrabPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <RemoteCrabPage />
    </LanguageProvider>
  </StrictMode>,
)
