import { motion, useReducedMotion } from 'framer-motion'
import { Github } from 'lucide-react'
import { GITHUB_URL } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

export default function CTA() {
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-24 px-6">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
        className="max-w-4xl mx-auto glass p-10 md:p-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
        <p className="text-vgo-muted max-w-xl mx-auto mb-8">
          {t('cta.description')}
        </p>
        <motion.a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-vgo-bg font-semibold hover:bg-vgo-text transition-colors"
        >
          <Github size={20} /> {t('cta.button')}
        </motion.a>
      </motion.div>
    </section>
  )
}
