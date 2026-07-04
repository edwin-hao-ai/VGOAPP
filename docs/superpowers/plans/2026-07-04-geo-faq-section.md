# VGO 官网：GEO FAQ 区块实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 VGO 官网增加一个 GEO 优化的 FAQ 手风琴区块，包含中英双语文案和 FAQPage JSON-LD 结构化数据。

**Architecture:** 新增 `FAQ.tsx` 组件渲染手风琴问答；翻译文案集中进入 `translations.ts` 的 `faq` 字段；`index.html` 追加 `FAQPage` JSON-LD。组件复用现有玻璃卡片样式和 Framer Motion 滚动动效。

**Tech Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion

## Global Constraints

- 不引入新的运行时依赖。
- 保持 `prefers-reduced-motion` 支持。
- 所有 TypeScript 类型必须能通过 `npm run lint`。
- 用户可见文案必须同时提供 `zh` 和 `en` 翻译。
- 构建产物为纯静态文件，最终通过 `rsync` 同步到 `/var/www/vgoapp/`。
- FAQ 手风琴必须具备无障碍属性（`aria-expanded`、`aria-controls`）。

---

## File Structure

| 路径 | 用途 |
|------|------|
| `src/components/FAQ.tsx` | 新手风琴 FAQ 组件 |
| `src/App.tsx` | 在 Products 和 WhyVGO 之间插入 FAQ |
| `src/i18n/translations.ts` | 新增 `faq` 翻译字段 |
| `index.html` | 追加 `FAQPage` JSON-LD |

---

### Task 1: 创建 FAQ 翻译数据

**Files:**
- Modify: `src/i18n/translations.ts`

**Interfaces:**
- Produces: `translations[language].faq.title` 和 `translations[language].faq.items` 数组，每项含 `question` 和 `answer`。

- [ ] **Step 1: 在 translations.ts 中添加 faq 字段**

在 `zh` 和 `en` 对象中各增加：

```ts
faq: {
  title: '常见问题',
  items: [
    {
      question: 'VGO 是做什么的？',
      answer: 'VGO 是一个本地优先、AI 原生的效率工具工作室，为开发者和效率爱好者打造真正好用的软件。',
    },
    {
      question: 'MDDock 和 Obsidian / Notion 有什么区别？',
      answer: 'MDDock 专注于把 Word、Excel、PPT 与 Markdown 连成工作流，文件默认保存在本地，AI 知识库不会上传你的隐私文档。',
    },
    {
      question: 'MacSlim 会误删文件吗？',
      answer: 'MacSlim 有三层安全保护，只清理已识别的缓存和日志，不会触碰用户个人文件、项目代码或系统关键文件。',
    },
    {
      question: 'MouseClaw 支持哪些 AI 模型？',
      answer: 'MouseClaw 支持 Claude、Codex、通义千问等 14+ 主流 AI 模型，按住说话即可调用。',
    },
    {
      question: 'VGO 的产品是免费的吗？',
      answer: '目前 MDDock、MacSlim 和 MouseClaw 都提供免费版本，核心功能无需付费即可使用。',
    },
    {
      question: '为什么 VGO 坚持本地优先？',
      answer: '我们相信数据应该属于用户。本地优先意味着数据默认留在设备上，不上传、不锁定、随时带走。',
    },
  ],
}
```

英文版对应翻译。

- [ ] **Step 2: 运行 lint**

```bash
npm run lint
```

Expected: 无错误。

- [ ] **Step 3: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat(faq): add bilingual FAQ translations"
```

---

### Task 2: 创建 FAQ 组件

**Files:**
- Create: `src/components/FAQ.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `useLanguage()` from `src/i18n/LanguageContext.tsx`。
- Produces: 默认导出 `FAQ` 组件。

- [ ] **Step 1: 创建 FAQ.tsx**

```tsx
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
```

- [ ] **Step 2: 在 App.tsx 中插入 FAQ**

```tsx
import FAQ from './components/FAQ'

function App() {
  return (
    <LanguageProvider>
      <GlowBackground />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Products />
        <FAQ />
        <WhyVGO />
        <CTA />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
```

- [ ] **Step 3: 运行 lint 和 build**

```bash
npm run lint && npm run build
```

Expected: 无错误，dist 生成。

- [ ] **Step 4: Commit**

```bash
git add src/components/FAQ.tsx src/App.tsx
git commit -m "feat(faq): add accordion FAQ section between Products and WhyVGO"
```

---

### Task 3: 添加 FAQPage JSON-LD

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: 已有的 `<script type="application/ld+json">` 位置。
- Produces: 追加 `FAQPage` JSON-LD。

- [ ] **Step 1: 在 index.html 中追加 FAQPage JSON-LD**

在已有的 JSON-LD `</script>` 之后、`<script type="module" ...>` 之前，追加：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "VGO 是做什么的？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VGO 是一个本地优先、AI 原生的效率工具工作室，为开发者和效率爱好者打造真正好用的软件。"
      }
    },
    {
      "@type": "Question",
      "name": "MDDock 和 Obsidian / Notion 有什么区别？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MDDock 专注于把 Word、Excel、PPT 与 Markdown 连成工作流，文件默认保存在本地，AI 知识库不会上传你的隐私文档。"
      }
    },
    {
      "@type": "Question",
      "name": "MacSlim 会误删文件吗？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MacSlim 有三层安全保护，只清理已识别的缓存和日志，不会触碰用户个人文件、项目代码或系统关键文件。"
      }
    },
    {
      "@type": "Question",
      "name": "MouseClaw 支持哪些 AI 模型？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MouseClaw 支持 Claude、Codex、通义千问等 14+ 主流 AI 模型，按住说话即可调用。"
      }
    },
    {
      "@type": "Question",
      "name": "VGO 的产品是免费的吗？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "目前 MDDock、MacSlim 和 MouseClaw 都提供免费版本，核心功能无需付费即可使用。"
      }
    },
    {
      "@type": "Question",
      "name": "为什么 VGO 坚持本地优先？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "我们相信数据应该属于用户。本地优先意味着数据默认留在设备上，不上传、不锁定、随时带走。"
      }
    }
  ]
}
</script>
```

- [ ] **Step 2: 构建并检查 dist/index.html**

```bash
npm run build
```

Expected: 构建成功，`dist/index.html` 包含 FAQPage JSON-LD。

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(seo): add FAQPage JSON-LD for GEO"
```

---

### Task 4: 本地验证

**Files:**
- 无新文件。

- [ ] **Step 1: 类型检查与构建**

```bash
npm run lint && npm run build
```

Expected: 全部通过。

- [ ] **Step 2: 预览并验证**

```bash
npm run preview
```

打开 `http://localhost:4173/#faq`，验证：
- FAQ 区块出现在 Products 和 Why VGO 之间。
- 6 个问题正常显示。
- 点击问题可展开/收起答案。
- 切换中英文后，FAQ 文案同步切换。
- 查看页面源代码，确认 FAQPage JSON-LD 存在。
- 移动端布局正常。

- [ ] **Step 3: Commit（如有修复）**

```bash
git add -A
git commit -m "fix(faq): address local verification findings"
```

---

### Task 5: 部署到服务器

**Files:**
- 无代码文件改动。

- [ ] **Step 1: 构建并部署**

```bash
npm run build
sshpass -p 'X7b=BYDuaE?JJtYq' rsync -avz --delete -e 'ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no' dist/ root@158.247.219.230:/var/www/vgoapp/
```

- [ ] **Step 2: 重载 Caddy**

```bash
sshpass -p 'X7b=BYDuaE?JJtYq' ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no root@158.247.219.230 "docker exec mddock-caddy-1 caddy reload --config /etc/caddy/Caddyfile"
```

- [ ] **Step 3: 线上验证**

```bash
curl -s -H "Host: vgoapp.com" http://158.247.219.230/ | grep -i faq
```

Expected: 返回 HTML 中包含 `id="faq"` 或 FAQ 相关内容。

---

## 自我审查

### 1. Spec 覆盖检查

| Spec 要求 | 对应 Task |
|-----------|-----------|
| 6 组中英 FAQ 文案 | Task 1 |
| 手风琴交互 + 玻璃卡片 | Task 2 |
| 放在 Products 和 WhyVGO 之间 | Task 2 |
| FAQPage JSON-LD | Task 3 |
| 本地验证 | Task 4 |
| 部署 | Task 5 |

无遗漏。

### 2. Placeholder 扫描

- 无 TBD/TODO。
- 所有代码步骤提供真实代码。
- 所有命令明确。

### 3. 类型一致性

- `t('faq.items.N.question')` 与 translations.ts 中的结构一致。
- FAQ 组件默认导出，与 App.tsx 的 import 一致。

计划完成。
