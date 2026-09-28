import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/LanguageContext'
import MacSlimPrivacyPage from './pages/MacSlimPrivacyPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <MacSlimPrivacyPage />
    </LanguageProvider>
  </StrictMode>,
)
