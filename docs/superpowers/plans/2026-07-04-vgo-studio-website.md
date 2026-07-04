# VGO 工作室官网实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现一个 Apple 精致玻璃风单页滚动官网，展示 VGO 工作室及 MDDock、MacSlim、MouseClaw 三款产品，并设计配套 SVG Logo。

**Architecture：** 使用 Vite + React + TypeScript 构建单页应用；Tailwind CSS v4 负责玻璃质感与响应式布局；Framer Motion 处理滚动揭示、悬浮和 Hero 动效；所有内容组件按页面区块拆分，保持单一职责。

**Tech Stack：** Vite 6、React 19、TypeScript 5、Tailwind CSS v4、Framer Motion 12、Lucide React

## Global Constraints

- 主背景色 `#0a0a0f`，主强调色 `#60a5fa`，辅强调色 `#a78bfa`
- 玻璃卡片规范：`backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-3xl`
- 中文优先，标题/正文使用系统字体栈
- 单页滚动，锚点：#products、#about、#contact
- 支持 `prefers-reduced-motion`，移动端简化动效
- 构建产物为静态文件，可部署到 GitHub Pages / Vercel / CDN
- 所有外部链接使用 `rel="noopener noreferrer"`

---

## 文件结构

```
/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── VGOLogo.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Products.tsx
│   │   ├── WhyVGO.tsx
│   │   ├── CTA.tsx
│   │   ├── Footer.tsx
│   │   └── GlowBackground.tsx
│   └── data/
│       └── products.ts
```

---

### Task 1: 项目脚手架

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/index.css`
- Create: `src/App.tsx`

**Interfaces:**
- Consumes: 无
- Produces: 可运行的 Vite + React + TS + Tailwind 空项目；`npm install` 成功；`npm run dev` 可启动开发服务器；`npm run build` 可生成 `dist/`。

- [ ] **Step 1: 写入 package.json**

```json
{
  "name": "vgo-studio-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.0.0",
    "lucide-react": "^0.469.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.0.0",
    "typescript": "~5.6.2",
    "vite": "^6.0.5"
  }
}
```

- [ ] **Step 2: 写入 vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
})
```

- [ ] **Step 3: 写入 tsconfig.json**

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

- [ ] **Step 4: 写入 tsconfig.app.json**

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 5: 写入 tsconfig.node.json**

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 6: 写入 index.html**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VGO — 做你真正会用的工具</title>
    <meta name="description" content="VGO 工作室官网，展示 MDDock、MacSlim、MouseClaw 等本地优先、AI 原生的效率工具。" />
    <meta property="og:title" content="VGO — 做你真正会用的工具" />
    <meta property="og:description" content="本地优先、AI 原生的效率工具工作室。" />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body class="bg-vgo-bg text-vgo-text antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: 写入 src/main.tsx**

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 8: 写入 src/index.css**

```css
@import "tailwindcss";

@theme {
  --color-vgo-bg: #0a0a0f;
  --color-vgo-card: #12121a;
  --color-vgo-primary: #60a5fa;
  --color-vgo-secondary: #a78bfa;
  --color-vgo-text: #f8fafc;
  --color-vgo-muted: #94a3b8;

  --font-sans: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;

  --animate-float: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-vgo-bg text-vgo-text font-sans antialiased;
  }

  ::selection {
    @apply bg-vgo-primary/30 text-white;
  }
}

@utility glass {
  @apply backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-3xl;
}

@utility glass-hover {
  @apply transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.14] hover:-translate-y-2 hover:shadow-2xl;
}

@utility gradient-text {
  @apply bg-gradient-to-r from-vgo-primary to-vgo-secondary bg-clip-text text-transparent;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 9: 写入初始 src/App.tsx**

```typescript
function App() {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl gradient-text">VGO Studio</h1>
    </main>
  )
}

export default App
```

- [ ] **Step 10: 安装依赖并验证**

Run: `npm install`
Expected: 无报错，`node_modules/` 生成

Run: `npm run build`
Expected: 生成 `dist/` 目录，构建成功

- [ ] **Step 11: Commit**

```bash
git add .
git commit -m "chore: scaffold Vite + React + TS + Tailwind project"
```

---

### Task 2: VGO Logo SVG 组件

**Files:**
- Create: `src/components/VGOLogo.tsx`
- Modify: `public/favicon.svg`

**Interfaces:**
- Consumes: 无
- Produces: `<VGOLogo className="..." size={48} />` 组件；`public/favicon.svg` 图标文件。

- [ ] **Step 1: 写入 VGOLogo.tsx**

```typescript
import type { SVGProps } from 'react'

interface VGOLogoProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export default function VGOLogo({ size = 48, className, ...props }: VGOLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="vgo-face-1" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="vgo-face-2" x1="120" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="vgo-face-3" x1="60" y1="0" x2="60" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
        </linearGradient>
        <filter id="vgo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter="url(#vgo-glow)">
        <path
          d="M60 10L110 40V90L60 115L10 90V40L60 10Z"
          fill="url(#vgo-face-1)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
        />
        <path
          d="M60 10L110 40L60 70L10 40L60 10Z"
          fill="url(#vgo-face-3)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
        <path
          d="M10 40L60 70V115L10 90V40Z"
          fill="url(#vgo-face-2)"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        <path
          d="M110 40L60 70V115L110 90V40Z"
          fill="url(#vgo-face-2)"
          fillOpacity="0.5"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
      </g>
    </svg>
  )
}
```

- [ ] **Step 2: 写入 public/favicon.svg**

复制 `VGOLogo.tsx` 中的 SVG 内容到 `public/favicon.svg`，去掉 React 属性，保留 `viewBox`、`paths`、`defs`。

- [ ] **Step 3: 在 App.tsx 中临时渲染验证**

```typescript
import VGOLogo from './components/VGOLogo'

function App() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <VGOLogo size={120} />
    </main>
  )
}

export default App
```

Run: `npm run build`
Expected: 构建成功

- [ ] **Step 4: Commit**

```bash
git add src/components/VGOLogo.tsx public/favicon.svg src/App.tsx
git commit -m "feat: add VGO crystal logo component and favicon"
```

---

### Task 3: 动态光晕背景组件

**Files:**
- Create: `src/components/GlowBackground.tsx`

**Interfaces:**
- Consumes: 无
- Produces: `<GlowBackground />` 组件，提供全局鼠标跟随光晕。

- [ ] **Step 1: 写入 GlowBackground.tsx**

```typescript
import { useEffect, useState } from 'react'

export default function GlowBackground() {
  const [position, setPosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)',
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
          right: '10%',
          top: '20%',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/GlowBackground.tsx
git commit -m "feat: add mouse-follow glow background"
```

---

### Task 4: 玻璃导航栏

**Files:**
- Create: `src/components/Navbar.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `VGOLogo`
- Produces: 固定顶部导航栏，滚动后添加背景实化效果。

- [ ] **Step 1: 写入 Navbar.tsx**

```typescript
import { useEffect, useState } from 'react'
import { Github, Menu, X } from 'lucide-react'
import VGOLogo from './VGOLogo'

const navLinks = [
  { label: '产品', href: '#products' },
  { label: '关于', href: '#about' },
  { label: '联系', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-vgo-bg/80 backdrop-blur-xl border-b border-white/[0.08]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <VGOLogo size={36} className="group-hover:scale-105 transition-transform" />
          <span className="text-xl font-bold tracking-tight">VGO</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-vgo-muted hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/edwin-hao-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-white/[0.08] transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-xl hover:bg-white/[0.08]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden glass mx-4 mb-4 p-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-vgo-muted hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/edwin-hao-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-vgo-muted hover:text-white"
              >
                <Github size={18} /> GitHub
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: 更新 App.tsx 引入 Navbar 和 GlowBackground**

```typescript
import GlowBackground from './components/GlowBackground'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="h-[80vh] flex items-center justify-center">
          <p className="text-vgo-muted">Navbar & background ready</p>
        </section>
      </main>
    </>
  )
}

export default App
```

- [ ] **Step 3: 验证构建**

Run: `npm run build`
Expected: 构建成功

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/App.tsx
git commit -m "feat: add glass navbar with mobile menu"
```

---

### Task 5: Hero 区域

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `VGOLogo`、`motion` from framer-motion
- Produces: Hero 区块，包含标题、副标题、CTA 和悬浮 Logo。

- [ ] **Step 1: 写入 Hero.tsx**

```typescript
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
```

- [ ] **Step 2: 更新 App.tsx 引入 Hero**

```typescript
import GlowBackground from './components/GlowBackground'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
      </main>
    </>
  )
}

export default App
```

- [ ] **Step 3: 验证构建**

Run: `npm run build`
Expected: 构建成功

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/App.tsx
git commit -m "feat: add Hero section with floating logo and CTA"
```

---

### Task 6: 产品数据与产品卡片

**Files:**
- Create: `src/data/products.ts`
- Create: `src/components/ProductCard.tsx`

**Interfaces:**
- Consumes: 无
- Produces: `Product` 类型和 `products` 数组；可复用的 `ProductCard` 组件。

- [ ] **Step 1: 写入 products.ts**

```typescript
import { FileText, Sparkles, Monitor, MousePointerClick, type LucideIcon } from 'lucide-react'

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
```

- [ ] **Step 2: 写入 ProductCard.tsx**

```typescript
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { Product } from '../data/products'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const Icon = product.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
          <li key={feature} className="flex items-start gap-3 text-sm text-vgo-text/90">
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
```

- [ ] **Step 3: 验证构建**

Run: `npm run build`
Expected: 构建成功

- [ ] **Step 4: Commit**

```bash
git add src/data/products.ts src/components/ProductCard.tsx
git commit -m "feat: add product data and reusable product card"
```

---

### Task 7: 产品展示区域

**Files:**
- Create: `src/components/Products.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `products` 数据、`ProductCard` 组件
- Produces: `#products` 区块，渲染三个产品卡片。

- [ ] **Step 1: 写入 Products.tsx**

```typescript
import { motion } from 'framer-motion'
import { products } from '../data/products'
import ProductCard from './ProductCard'

export default function Products() {
  return (
    <section id="products" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">我们的产品</h2>
          <p className="text-vgo-muted max-w-2xl mx-auto">
            每一款都从真实的工作流痛点出发，追求本地、快速、可信赖。
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
```

- [ ] **Step 2: 更新 App.tsx**

```typescript
import GlowBackground from './components/GlowBackground'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Products from './components/Products'

function App() {
  return (
    <>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Products />
      </main>
    </>
  )
}

export default App
```

- [ ] **Step 3: 验证构建**

Run: `npm run build`
Expected: 构建成功

- [ ] **Step 4: Commit**

```bash
git add src/components/Products.tsx src/App.tsx
git commit -m "feat: add products section with three app cards"
```

---

### Task 8: Why VGO 区域

**Files:**
- Create: `src/components/WhyVGO.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `motion` from framer-motion、`lucide-react` 图标
- Produces: `#about` 区块，展示三个工作室理念卡片。

- [ ] **Step 1: 写入 WhyVGO.tsx**

```typescript
import { motion } from 'framer-motion'
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
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
```

- [ ] **Step 2: 更新 App.tsx**

```typescript
import GlowBackground from './components/GlowBackground'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Products from './components/Products'
import WhyVGO from './components/WhyVGO'

function App() {
  return (
    <>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Products />
        <WhyVGO />
      </main>
    </>
  )
}

export default App
```

- [ ] **Step 3: 验证构建**

Run: `npm run build`
Expected: 构建成功

- [ ] **Step 4: Commit**

```bash
git add src/components/WhyVGO.tsx src/App.tsx
git commit -m "feat: add Why VGO section"
```

---

### Task 9: CTA 区域

**Files:**
- Create: `src/components/CTA.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `motion` from framer-motion
- Produces: `#contact` 区块，包含 GitHub CTA。

- [ ] **Step 1: 写入 CTA.tsx**

```typescript
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

export default function CTA() {
  return (
    <section id="contact" className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto glass p-10 md:p-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">关注 VGO 的下一款工具</h2>
        <p className="text-vgo-muted max-w-xl mx-auto mb-8">
          在 GitHub 上关注我们，第一时间获取新产品、更新和源码。
        </p>
        <motion.a
          href="https://github.com/edwin-hao-ai"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-vgo-bg font-semibold hover:bg-vgo-text transition-colors"
        >
          <Github size={20} /> 在 GitHub 上关注
        </motion.a>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: 更新 App.tsx**

```typescript
import GlowBackground from './components/GlowBackground'
import CTA from './components/CTA'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Products from './components/Products'
import WhyVGO from './components/WhyVGO'

function App() {
  return (
    <>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Products />
        <WhyVGO />
        <CTA />
      </main>
    </>
  )
}

export default App
```

- [ ] **Step 3: 验证构建**

Run: `npm run build`
Expected: 构建成功

- [ ] **Step 4: Commit**

```bash
git add src/components/CTA.tsx src/App.tsx
git commit -m "feat: add CTA section"
```

---

### Task 10: Footer

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `VGOLogo`
- Produces: 页脚组件。

- [ ] **Step 1: 写入 Footer.tsx**

```typescript
import VGOLogo from './VGOLogo'

const footerLinks = [
  { label: 'MDDock', href: 'https://mddock.com/' },
  { label: 'MacSlim', href: 'https://github.com/edwin-hao-ai/MacSlim' },
  { label: 'MouseClaw', href: 'https://github.com/edwin-hao-ai/MouseClaw' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.08] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <VGOLogo size={32} />
          <span className="font-bold">VGO</span>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-vgo-muted">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-vgo-muted">© {year} VGO. All rights reserved.</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: 更新 App.tsx**

```typescript
import GlowBackground from './components/GlowBackground'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Products from './components/Products'
import WhyVGO from './components/WhyVGO'

function App() {
  return (
    <>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Products />
        <WhyVGO />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
```

- [ ] **Step 3: 验证构建**

Run: `npm run build`
Expected: 构建成功

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx src/App.tsx
git commit -m "feat: add footer"
```

---

### Task 11: SEO / Open Graph 图片

**Files:**
- Create: `public/og-image.png`

**Interfaces:**
- Consumes: 无
- Produces: 1200×630 的 Open Graph 分享图。

- [ ] **Step 1: 生成 OG 图片**

使用任意设计工具或代码生成一张 1200×630 的 PNG，包含：
- 深色背景 `#0a0a0f`
- VGO Logo 晶体居中
- 标题 "VGO — 做你真正会用的工具"
- 副标题 "MDDock · MacSlim · MouseClaw"

如果环境支持 ImageMagick，可用以下命令生成占位图：

```bash
convert -size 1200x630 xc:'#0a0a0f' \
  -pointsize 64 -fill white -gravity center -annotate +0+0 "VGO" \
  -pointsize 24 -fill '#94a3b8' -annotate +0+80 "做你真正会用的工具" \
  public/og-image.png
```

若 ImageMagick 不可用，创建一个 1200×630 的纯色占位 PNG，或手工放置设计好的图片。

- [ ] **Step 2: 验证 OG 图片存在**

Run: `ls -lh public/og-image.png`
Expected: 文件存在，大小合理

- [ ] **Step 3: Commit**

```bash
git add public/og-image.png
git commit -m "feat: add Open Graph image"
```

---

### Task 12: 最终构建与验证

**Files:**
- Modify: 按需修复任何构建错误

**Interfaces:**
- Consumes: 所有组件
- Produces: 可部署的 `dist/` 目录。

- [ ] **Step 1: 类型检查**

Run: `npm run lint`
Expected: 无 TypeScript 错误

- [ ] **Step 2: 生产构建**

Run: `npm run build`
Expected: `dist/` 目录生成，包含 `index.html`、CSS、JS、资源文件

- [ ] **Step 3: 预览检查**

Run: `npm run preview`
Expected: 本地服务器启动，可访问 http://localhost:4173 查看效果

检查项：
- [ ] 导航栏固定顶部，滚动后背景变化
- [ ] Hero Logo 悬浮动效
- [ ] 三个产品卡片横向排列（桌面端），悬浮效果正常
- [ ] Why VGO 三个理念卡片正常显示
- [ ] CTA 区块和 Footer 正常
- [ ] 移动端汉堡菜单可展开
- [ ] 所有外部链接可点击
- [ ] 无控制台报错

- [ ] **Step 4: Commit 任何修复**

```bash
git add .
git commit -m "fix: final polish and build verification"
```

---

## 自检清单

### Spec 覆盖度

| 设计文档章节 | 对应任务 |
|--------------|----------|
| 3.1 色彩系统 | Task 1（Tailwind 配置 + CSS） |
| 3.2 字体 | Task 1（`--font-sans` in `@theme`） |
| 3.3 玻璃效果 | Task 1（`.glass` utilities） |
| 4. Logo | Task 2 |
| 5.1 Navigation | Task 4 |
| 5.2 Hero | Task 5 |
| 5.3 Products | Task 6、7 |
| 5.4 Why VGO | Task 8 |
| 5.6 CTA | Task 9 |
| 5.7 Footer | Task 10 |
| 6. 交互动效 | Task 3、5、7、8、9 |
| 7. 技术栈 | Task 1 |
| 8. 响应式 | 各组件 Tailwind 断点 |
| 10. 可访问性 | Task 4、各组件 aria-label、 reduced-motion |
| 11. SEO | Task 1（index.html）、Task 11（OG） |

### Placeholder 扫描

- 无 TBD / TODO
- 无 "implement later"
- 无未定义的类型或函数引用
- 所有外部链接明确

### 类型一致性

- `Product` 接口定义在 `src/data/products.ts`
- `ProductCard` 接收 `product: Product` 和 `index: number`
- `VGOLogo` 接收 `size?: number` 和 SVG 标准 props
- `GlowBackground` 无 props
