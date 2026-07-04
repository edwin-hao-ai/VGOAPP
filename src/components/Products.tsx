import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'
import { getProducts } from '../data/products'
import { useLanguage } from '../i18n/LanguageContext'
import ProductCard from './ProductCard'

export default function Products() {
  const shouldReduceMotion = useReducedMotion()
  const { language, t } = useLanguage()
  const products = useMemo(() => getProducts(language), [language])

  return (
    <section id="products" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('products.title')}</h2>
          <p className="text-vgo-muted max-w-2xl mx-auto">
            {t('products.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
