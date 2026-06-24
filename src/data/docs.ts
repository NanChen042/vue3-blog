import { defineAsyncComponent, h } from 'vue';

const LoadingComponent = {
  render() {
    return h('div', { class: 'py-32 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 w-full' }, [
      h('svg', { class: 'w-8 h-8 animate-spin text-indigo-500 mb-4', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24' }, [
        h('circle', { class: 'opacity-25', cx: '12', cy: '12', r: '10', stroke: 'currentColor', 'stroke-width': '4' }),
        h('path', { class: 'opacity-75', fill: 'currentColor', d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' })
      ]),
      h('span', { class: 'text-sm font-medium tracking-wider animate-pulse' }, '正在加载核心文档...')
    ]);
  }
};

const createDoc = (loader: any) => defineAsyncComponent({
  loader,
  loadingComponent: LoadingComponent,
  delay: 50, // 超过 50ms 还没加载完就显示 Loading
});

export interface DocItem {
  id: string;
  title: string;
  projectLink?: string;
  component: any;
}

export interface DocCategory {
  title: string;
  items: DocItem[];
}

export const docMenus: DocCategory[] = [
  {
    title: 'AI Agents',
    items: [
      { id: 'github-reviewer', title: 'GitHub Reviewer', projectLink: 'https://github.com/your-org/github-reviewer', component: createDoc(() => import('@/docs/github-reviewer.md')) },
      { id: 'auto-translator', title: 'Auto-Translator', projectLink: 'https://github.com/your-org/auto-translator', component: createDoc(() => import('@/docs/auto-translator.md')) },
      { id: 'code-generator', title: 'Code Generator', projectLink: 'https://github.com/your-org/code-generator', component: createDoc(() => import('@/docs/code-generator.md')) },
    ]
  },
  {
    title: '教程系列',
    items: [
      { id: 'ai-agent-tutorial', title: '快速开始指南', projectLink: 'https://github.com/your-org/ai-agent-tutorial', component: createDoc(() => import('@/docs/ai-agent-tutorial.md')) },
      { id: 'api-reference', title: 'API 参考文档', projectLink: 'https://github.com/your-org/api-reference', component: createDoc(() => import('@/docs/api-reference.md')) },
      { id: 'markdown-test', title: 'Markdown 格式测试大全', component: createDoc(() => import('@/docs/markdown-test.md')) }
    ]
  }
];
