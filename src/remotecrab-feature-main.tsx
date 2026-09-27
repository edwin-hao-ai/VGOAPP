import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/LanguageContext'
import RemoteCrabFeaturePage from './pages/RemoteCrabFeaturePage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <RemoteCrabFeaturePage />
    </LanguageProvider>
  </StrictMode>,
)
