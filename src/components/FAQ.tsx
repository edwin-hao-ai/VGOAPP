import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const items = [
    { question: t('faq.items.0.question'), answer: t('faq.items.0.answer') },
    { question: t('faq.items.1.question'), answer: t('faq.items.1.answer') },
    { question: t('faq.items.2.question'), answer: t('faq.items.2.answer') },
    { question: t('faq.items.3.question'), answer: t('faq.items.3.answer') },
    { question: t('faq.items.4.question'), answer: t('faq.items.4.answer') },
    { question: t('faq.items.5.question'), answer: t('faq.items.5.answer') },
  ]

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('faq.title')}</h2>
        </motion.div>

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.05 }}
                className="glass overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.03] motion-safe:transition-colors"
                >
                  <span className="text-lg font-medium pr-4">{item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-vgo-muted shrink-0 motion-safe:transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden motion-safe:transition-all ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                >
                  <p className="px-6 pb-6 text-vgo-muted leading-relaxed">{item.answer}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
