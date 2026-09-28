import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/LanguageContext'
import MacSlimPage from './pages/MacSlimPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <MacSlimPage />
    </LanguageProvider>
  </StrictMode>,
)
