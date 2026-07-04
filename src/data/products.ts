import type { ComponentType } from 'react'
import MDDockIcon from '../components/icons/MDDockIcon'
import MacSlimIcon from '../components/icons/MacSlimIcon'
import MouseClawIcon from '../components/icons/MouseClawIcon'
import { translations, type Language } from '../i18n/translations'

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  icon: ComponentType<{ size?: number; className?: string }>
  features: readonly string[]
  link: string
  linkLabel: string
}

export function getProducts(language: Language): Product[] {
  const t = translations[language].productsList
  return [
    {
      id: 'mddock',
      name: t.mddock.name,
      tagline: t.mddock.tagline,
      description: t.mddock.description,
      icon: MDDockIcon,
      features: t.mddock.features,
      link: 'https://mddock.com/',
      linkLabel: t.mddock.linkLabel,
    },
    {
      id: 'macslim',
      name: t.macslim.name,
      tagline: t.macslim.tagline,
      description: t.macslim.description,
      icon: MacSlimIcon,
      features: t.macslim.features,
      link: 'https://github.com/edwin-hao-ai/MacSlim',
      linkLabel: t.macslim.linkLabel,
    },
    {
      id: 'mouseclaw',
      name: t.mouseclaw.name,
      tagline: t.mouseclaw.tagline,
      description: t.mouseclaw.description,
      icon: MouseClawIcon,
      features: t.mouseclaw.features,
      link: 'https://github.com/edwin-hao-ai/MouseClaw',
      linkLabel: t.mouseclaw.linkLabel,
    },
  ]
}
