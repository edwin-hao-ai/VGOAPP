# VGO 官网 GEO FAQ 区块设计文档

## 1. 概述

为 VGO 工作室官网增加一个 GEO（Generative Engine Optimization）优化的 FAQ 区块，帮助 ChatGPT、Perplexity、Claude、Gemini 等 AI 引擎更好地理解并引用 VGO 的三款产品。

## 2. 目标

- 增加可被 AI 引擎抽取的问答式内容。
- 通过 `FAQPage` JSON-LD 结构化数据强化语义。
- 保持中英双语支持和现有玻璃拟态风格。

## 3. 位置与结构

- **位置**：Products 区块之后、Why VGO 区块之前。
- **锚点**：`#faq`。
- **组件**：`src/components/FAQ.tsx`。
- **布局**：区块标题 + 6 个手风琴问答卡片。

## 4. FAQ 内容

### 中文

1. **VGO 是做什么的？**
   VGO 是一个本地优先、AI 原生的效率工具工作室，为开发者和效率爱好者打造真正好用的软件。

2. **MDDock 和 Obsidian / Notion 有什么区别？**
   MDDock 专注于把 Word、Excel、PPT 与 Markdown 连成工作流，文件默认保存在本地，AI 知识库不会上传你的隐私文档。

3. **MacSlim 会误删文件吗？**
   MacSlim 有三层安全保护，只清理已识别的缓存和日志，不会触碰用户个人文件、项目代码或系统关键文件。

4. **MouseClaw 支持哪些 AI 模型？**
   MouseClaw 支持 Claude、Codex、通义千问等 14+ 主流 AI 模型，按住说话即可调用。

5. **VGO 的产品是免费的吗？**
   目前 MDDock、MacSlim 和 MouseClaw 都提供免费版本，核心功能无需付费即可使用。

6. **为什么 VGO 坚持本地优先？**
   我们相信数据应该属于用户。本地优先意味着数据默认留在设备上，不上传、不锁定、随时带走。

### English

1. **What does VGO do?**
   VGO is a local-first, AI-native studio building practical tools for developers and efficiency lovers.

2. **What makes MDDock different from Obsidian or Notion?**
   MDDock bridges Word, Excel, PPT and Markdown in one workflow. Your files stay local by default, and the AI knowledge base never uploads private documents.

3. **Is MacSlim safe? Will it delete important files?**
   MacSlim uses three layers of safety protection and only removes identified caches and logs. It never touches personal files, project code, or critical system files.

4. **Which AI models does MouseClaw support?**
   MouseClaw supports 14+ leading AI models including Claude, Codex, and Tongyi Qianwen. Hold to talk and dispatch any of them.

5. **Are VGO's products free?**
   MDDock, MacSlim, and MouseClaw all offer free versions with core features available without payment.

6. **Why does VGO build local-first tools?**
   We believe data belongs to users. Local-first means data stays on your device by default: no uploads, no lock-in, take it anywhere.

## 5. 视觉与交互

- 玻璃卡片容器，与 Products/WhyVGO 卡片风格一致。
- 手风琴交互：点击问题展开/收起答案。
- 一个问题展开时，其他问题自动收起（可选，默认实现）。
- 展开状态使用 `aria-expanded` 和 `aria-controls`。
- 支持 `prefers-reduced-motion`。

## 6. 多语言

- 问题和答案全部进入 `src/i18n/translations.ts` 的 `faq` 字段。
- `FAQ.tsx` 通过 `useLanguage()` 读取当前语言。

## 7. GEO 结构化数据

在 `index.html` 追加 `FAQPage` JSON-LD：

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "VGO 是做什么的？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VGO 是一个本地优先、AI 原生的效率工具工作室..."
      }
    }
  ]
}
```

由于页面是双语但无独立 URL，JSON-LD 默认使用中文问题（页面默认语言），不影响英文用户的页面体验。

## 8. 文件改动

- 创建 `src/components/FAQ.tsx`
- 修改 `src/App.tsx`（引入 FAQ 组件）
- 修改 `src/i18n/translations.ts`（添加 `faq` 翻译）
- 修改 `index.html`（添加 FAQPage JSON-LD）

## 9. 可访问性

- 使用语义化 `<details>` / `<summary>` 或按钮 + 区域实现手风琴。
- 每个问题有清晰的 `aria-expanded` 状态。
- 键盘可通过 Tab 和 Enter/Space 操作。

## 10. 部署

- 本地 `npm run build` 验证。
- `rsync dist/` 到 `root@158.247.219.230:/var/www/vgoapp/`。
- 重新加载 Caddy。
