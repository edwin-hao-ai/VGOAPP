import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/LanguageContext'
import SlimDiskPage from './pages/SlimDiskPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <SlimDiskPage />
    </LanguageProvider>
  </StrictMode>,
)
