import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { Product } from '../data/products'

interface ProductCardProps {
  product: Product
  index: number
  /** primary = 主力产品（大卡）；compact = 其他项目（小卡） */
  variant?: 'primary' | 'default' | 'compact'
}

export default function ProductCard({ product, index, variant = 'default' }: ProductCardProps) {
  const Icon = product.icon
  const shouldReduceMotion = useReducedMotion()
  const isExternal = product.link.startsWith('http')

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
      className={
        'glass glass-hover flex h-full flex-col ' +
        (variant === 'primary'
          ? 'p-9 md:p-10 border-vgo-primary/25'
          : variant === 'compact'
            ? 'p-6'
            : 'p-8')
      }
    >
      <div
        className={
          'mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-vgo-primary/20 to-vgo-secondary/20 ' +
          (variant === 'primary' ? 'h-16 w-16' : variant === 'compact' ? 'h-11 w-11' : 'h-14 w-14')
        }
      >
        <Icon size={variant === 'primary' ? 32 : variant === 'compact' ? 22 : 28} />
      </div>

      <h3 className={(variant === 'primary' ? 'text-3xl ' : variant === 'compact' ? 'text-lg ' : 'text-2xl ') + 'mb-2 font-bold'}>
        {product.name}
      </h3>
      <p className={(variant === 'compact' ? 'text-sm ' : '') + 'mb-3 font-medium text-vgo-primary'}>{product.tagline}</p>
      <p className={'mb-6 leading-relaxed text-vgo-muted ' + (variant === 'compact' ? 'text-sm' : '')}>
        {product.description}
      </p>

      {variant !== 'compact' ? (
        <ul className="mb-8 flex-1 space-y-3">
          {product.features.map((feature) => (
            <li key={`${product.id}-${feature}`} className="flex items-start gap-3 text-sm text-vgo-text/90">
              <Sparkles size={16} className="mt-0.5 shrink-0 text-vgo-secondary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1" />
      )}

      <a
        href={product.link}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="inline-flex items-center gap-2 text-vgo-primary hover:text-white transition-colors font-medium"
      >
        {product.linkLabel} <ArrowUpRight size={18} />
      </a>
    </motion.article>
  )
}
