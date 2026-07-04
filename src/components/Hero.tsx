import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import VGOLogo from './VGOLogo'

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
        className="mb-8"
      >
        <VGOLogo size={120} className="animate-float drop-shadow-[0_0_40px_rgba(96,165,250,0.4)]" />
      </motion.div>

      <motion.h1
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2, duration: 0.6 }}
        className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6"
      >
        VGO
      </motion.h1>

      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.35, duration: 0.6 }}
        className="text-2xl md:text-3xl font-medium gradient-text mb-4"
      >
        {t('hero.subtitle')}
      </motion.p>

      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5, duration: 0.6 }}
        className="text-lg text-vgo-muted max-w-xl mb-10"
      >
        {t('hero.description')}
      </motion.p>

      <motion.a
        href="#products"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.65, duration: 0.6 }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-vgo-primary to-vgo-secondary text-white font-semibold shadow-lg shadow-vgo-primary/25 hover:shadow-vgo-primary/40 transition-shadow"
      >
        {t('hero.cta')} <ArrowDown size={18} />
      </motion.a>
    </section>
  )
}
