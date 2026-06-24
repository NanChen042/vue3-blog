# GitHub Reviewer Agent 架构指南

欢迎来到我的 AI 实验室！这篇文档是**直接由原生 Markdown 渲染成 Vue 组件的**，没有经过任何中间转换脚本。

## 核心设计理念

这个 Agent 的主要目标是代替人工完成基础的 Code Review 工作，并在 PR 阶段拦截潜在的代码异味（Code Smell）。

### 技术栈

- **Vue 3 + Vite**: 作为我们的宿主容器
- **Unplugin Vue Markdown**: 直接将这篇 `.md` 转化为原生的 Vue AST
- **Tailwind Typography**: 提供极具排版美感的样式库

### 快速接入代码

如果你想在你自己的项目中接入这个 Agent，可以通过以下简单的脚本实现：

```typescript
import { ReviewAgent } from '@nanchen/agents';

const agent = new ReviewAgent({
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4o',
  rules: [
    'No console.log allowed',
    'Prefer strictly typed interfaces'
  ]
});

// 监听 PR 事件
agent.on('pull_request', async (pr) => {
  const diff = await pr.getDiff();
  const suggestions = await agent.analyze(diff);
  await pr.comment(suggestions);
});
```

> **Note:** 这是目前我们在内部使用的架构，后续我会将其开源到 GitHub，大家敬请期待！

## 未来展望

接下来我会将这些 Agent 深度集成到我们的博客流水线里。不仅仅是 Reviewer，包括自动校对、自动翻译器（Auto-Translator Bot）等都会在后面的实验里陆续放出。
