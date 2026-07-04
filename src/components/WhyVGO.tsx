import { motion, useReducedMotion } from 'framer-motion'
import { HardDrive, Bot, Code2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const values = [
  {
    icon: HardDrive,
    titleKey: 'why.localFirst.title',
    descKey: 'why.localFirst.description',
  },
  {
    icon: Bot,
    titleKey: 'why.aiNative.title',
    descKey: 'why.aiNative.description',
  },
  {
    icon: Code2,
    titleKey: 'why.developerTaste.title',
    descKey: 'why.developerTaste.description',
  },
]

export default function WhyVGO() {
  const shouldReduceMotion = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('why.title')}</h2>
          <p className="text-vgo-muted max-w-2xl mx-auto">
            {t('why.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.titleKey}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
                className="glass glass-hover p-8 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-vgo-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t(value.titleKey)}</h3>
                <p className="text-vgo-muted leading-relaxed">{t(value.descKey)}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
