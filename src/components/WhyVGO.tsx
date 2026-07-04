import { motion, useReducedMotion } from 'framer-motion'
import { HardDrive, Bot, Code2 } from 'lucide-react'

const values = [
  {
    icon: HardDrive,
    title: '本地优先',
    description: '你的数据默认留在设备上，不上传、不锁定，随时带走。',
  },
  {
    icon: Bot,
    title: 'AI 原生',
    description: '不是后期加功能，而是从设计之初就为 AI 工作流打造。',
  },
  {
    icon: Code2,
    title: '开发者品味',
    description: '追求性能、隐私和细节，拒绝臃肿，做真正好用的工具。',
  },
]

export default function WhyVGO() {
  const shouldReduceMotion = useReducedMotion()

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">为什么选 VGO</h2>
          <p className="text-vgo-muted max-w-2xl mx-auto">
            我们相信好的工具应该安静、可靠、为你工作，而不是反过来。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
                className="glass glass-hover p-8 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-vgo-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-vgo-muted leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
