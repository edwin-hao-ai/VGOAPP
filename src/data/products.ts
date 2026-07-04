import { FileText, Monitor, MousePointerClick, type LucideIcon } from 'lucide-react'

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  features: string[]
  link: string
  linkLabel: string
}

export const products: Product[] = [
  {
    id: 'mddock',
    name: 'MDDock',
    tagline: '本地优先的 Markdown 办公套件',
    description: '把 Word、Excel、PPT 和 Markdown 连成一条工作流，AI 能真正读懂你的笔记。',
    icon: FileText,
    features: [
      'Word / Excel / PPT ↔ Markdown 双向转换',
      'AI 知识库，文件永远在本机',
      '免费浏览器工具 + 桌面端深度体验',
    ],
    link: 'https://mddock.com/',
    linkLabel: '访问官网',
  },
  {
    id: 'macslim',
    name: 'MacSlim',
    tagline: '开发者信任的 Mac 清理工具',
    description: 'Rust + Tauri 打造的 Mac 清理工具，轻巧、快速、透明，不会碰不该碰的文件。',
    icon: Monitor,
    features: [
      'Rust + Tauri，安装包仅 ~12 MB',
      '支持 npm、Docker、Xcode、Homebrew 等开发者缓存',
      '三层安全保护，零上传隐私',
    ],
    link: 'https://github.com/edwin-hao-ai/MacSlim',
    linkLabel: '查看 GitHub',
  },
  {
    id: 'mouseclaw',
    name: 'MouseClaw',
    tagline: '像素风桌面 AI 宠物',
    description: '一只睡在屏幕角落的像素老鼠，按住说话就能让 AI 帮你干活。',
    icon: MousePointerClick,
    features: [
      '按住说话即可调用 Claude / Codex / 通义千问等 14+ AI',
      '100% 本地语音识别，零数据上传',
      '9 款皮肤、长期记忆、定时任务',
    ],
    link: 'https://github.com/edwin-hao-ai/MouseClaw',
    linkLabel: '查看 GitHub',
  },
]
