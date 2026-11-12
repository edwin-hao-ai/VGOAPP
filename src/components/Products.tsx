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

        {/* 主力：RemoteCrab 大卡 + MDDock；其余开源/尝试型项目缩小排一行 */}
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <ProductCard product={products[0]} index={0} variant="primary" />
          <ProductCard product={products[1]} index={1} />
        </div>

        {products.length > 2 ? (
          <>
            <p className="mt-12 mb-4 text-xs uppercase tracking-[0.14em] text-vgo-muted/60">
              {t('products.others')}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(2).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index + 2} variant="compact" />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
