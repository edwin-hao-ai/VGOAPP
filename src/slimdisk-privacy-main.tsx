import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/LanguageContext'
import SlimDiskPrivacyPage from './pages/SlimDiskPrivacyPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <SlimDiskPrivacyPage />
    </LanguageProvider>
  </StrictMode>,
)
