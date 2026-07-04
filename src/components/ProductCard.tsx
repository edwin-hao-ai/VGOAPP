import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { Product } from '../data/products'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const Icon = product.icon
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.5, delay: index * 0.1 }
      }
      className="glass glass-hover p-8 flex flex-col h-full"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-vgo-primary/20 to-vgo-secondary/20 flex items-center justify-center mb-6">
        <Icon size={28} className="text-vgo-primary" />
      </div>

      <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
      <p className="text-vgo-primary font-medium mb-3">{product.tagline}</p>
      <p className="text-vgo-muted mb-6 leading-relaxed">{product.description}</p>

      <ul className="space-y-3 mb-8 flex-1">
        {product.features.map((feature) => (
          <li key={`${product.id}-${feature}`} className="flex items-start gap-3 text-sm text-vgo-text/90">
            <Sparkles size={16} className="text-vgo-secondary mt-0.5 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-vgo-primary hover:text-white transition-colors font-medium"
      >
        {product.linkLabel} <ArrowUpRight size={18} />
      </a>
    </motion.article>
  )
}
