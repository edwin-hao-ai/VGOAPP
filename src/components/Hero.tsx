import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import VGOLogo from './VGOLogo'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-8"
      >
        <VGOLogo size={120} className="animate-float drop-shadow-[0_0_40px_rgba(96,165,250,0.4)]" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6"
      >
        VGO
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-2xl md:text-3xl font-medium gradient-text mb-4"
      >
        做你真正会用的工具
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg text-vgo-muted max-w-xl mb-10"
      >
        本地优先、AI 原生，为开发者和效率爱好者打造。
      </motion.p>

      <motion.a
        href="#products"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-vgo-primary to-vgo-secondary text-white font-semibold shadow-lg shadow-vgo-primary/25 hover:shadow-vgo-primary/40 transition-shadow"
      >
        探索产品 <ArrowDown size={18} />
      </motion.a>
    </section>
  )
}
