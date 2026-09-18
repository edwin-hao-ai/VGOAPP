import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/LanguageContext'
import RemoteCrabPrivacyPage from './pages/RemoteCrabPrivacyPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <RemoteCrabPrivacyPage />
    </LanguageProvider>
  </StrictMode>,
)
