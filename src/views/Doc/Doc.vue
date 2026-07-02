<template>
  <div class="min-h-[calc(100vh-4rem)] bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
    <div class="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8" :style="themeCssVars">
      
      <!-- 3 Column Layout -->
      <div class="flex flex-col lg:flex-row">
        
        <!-- 左侧: 全局文档目录 (Left Sidebar) -->
        <div class="hidden lg:block w-64 shrink-0 py-10 pr-8 border-r border-zinc-200 dark:border-zinc-800/80">
          <div class="sticky top-[88px]">
            <button @click="router.push('/home')" class="group flex items-center gap-2 px-3 py-1.5 -ml-3 mb-6 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50 transition-all">
              <svg class="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回首页
            </button>

            <!-- 动态渲染分类树 -->
            <div class="overflow-y-auto max-h-[calc(100vh-12rem)] pr-2 -mr-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
              <n-collapse :default-expanded-names="expandedCategories" accordion>
                <n-collapse-item v-for="category in docMenus" :key="category.title" :name="category.title">
                  <template #header>
                    <span class="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">{{ getCategoryName(category.title) }}</span>
                  </template>
                  <ul class="space-y-1.5 border-l border-zinc-200 dark:border-zinc-800 ml-1 mt-1">
                    <li v-for="item in category.items" :key="item.id">
                      <router-link :to="`/doc/${item.id}`" class="block pl-4 -ml-px border-l text-[13px] leading-tight transition-colors py-1.5" :class="[
                        route.params.id === item.id 
                          ? 'font-semibold active-nav-link' 
                          : 'border-transparent hover:border-zinc-400 font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300'
                      ]">
                        {{ item.title }}
                      </router-link>
                    </li>
                  </ul>
                </n-collapse-item>
              </n-collapse>
            </div>

          </div>
        </div>

        <!-- 中间: 文章主体 (Main Content) -->
        <!-- 中间内容区 -->
        <div class="flex-1 min-w-0 py-8 lg:px-12 relative overflow-hidden min-h-[85vh]">
          <div class="max-w-3xl mx-auto">
            <!-- 移动端侧边栏触发器 -->
            <div class="lg:hidden mb-6 flex items-center justify-between">
              <button @click="showMobileMenu = true" class="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                <span class="text-sm font-medium">文档目录</span>
              </button>
            </div>
            <!-- 文档头部：原生地渲染标题和项目链接，完全消除 JS 延迟注入导致的闪烁 -->
            <div class="mb-10" v-if="currentDocData">
              <h1 class="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6">
                {{ currentDocData.title }}
              </h1>
              <n-button 
                v-if="currentDocData.projectLink" 
                tag="a" 
                :href="currentDocData.projectLink" 
                target="_blank"
                :type="themeStyles[currentTheme].naiveType as any"
                secondary
                size="medium"
                class="hover:-translate-y-0.5 transition-transform shadow-sm"
              >
                <template #icon>
                  <n-icon>
                    <FlaskOutline />
                  </n-icon>
                </template>
                立即前往实验室体验
              </n-button>
            </div>

            <article ref="articleRef" :class="articleClass">
              <component :is="currentDocComponent" v-if="currentDocComponent" :key="route.params.id" />
              <div v-else class="py-20 text-center text-zinc-500">
                <svg class="w-12 h-12 mx-auto mb-4 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                文档加载中或不存在...
              </div>
            </article>
          </div>
        </div>

        <!-- 右侧: 单页目录 (Right Sidebar TOC) -->
        <div class="hidden xl:block w-64 shrink-0 py-10 pl-8">
          <div class="sticky top-8">
            
            <!-- 文档主题切换器 -->
            <div class="mb-10">
              <h4 class="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">阅读主题</h4>
              <div class="flex gap-3">
                <button 
                  v-for="theme in availableThemes" 
                  :key="theme.name"
                  @click="currentTheme = theme.name"
                  class="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none"
                  :class="[
                    theme.color, 
                    currentTheme === theme.name ? `ring-2 ring-offset-2 ${theme.ringColor} dark:ring-offset-[#0A0A0A] scale-110 shadow-sm opacity-100` : 'opacity-40 hover:opacity-100 hover:scale-110'
                  ]"
                  :title="`切换到 ${theme.name} 主题`"
                ></button>
              </div>
            </div>

            <h4 class="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">本页目录</h4>
            <ul v-if="toc.length > 0" class="space-y-2.5 text-sm">
              <li v-for="heading in toc" :key="heading.text" :style="{ paddingLeft: `${(heading.level - 1) * 12}px` }">
                <a href="javascript:void(0)" @click.prevent="scrollTo(heading.text)" :class="activeHeading === heading.text ? 'font-bold active-toc-link' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300'" class="transition-colors block truncate" :title="heading.text">
                  {{ heading.text }}
                </a>
              </li>
            </ul>
            <div v-else class="text-xs text-zinc-400">暂无目录结构</div>
          </div>
        </div>

      </div>
    </div>

    <!-- 移动端侧边栏 (Mobile Drawer) -->
    <div v-if="showMobileMenu" class="fixed inset-0 z-50 lg:hidden flex">
      <!-- 遮罩层 -->
      <div class="fixed inset-0 bg-zinc-900/50 backdrop-blur-sm transition-opacity" @click="showMobileMenu = false"></div>
      
      <!-- 抽屉面板 -->
      <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-zinc-900 shadow-xl border-r border-zinc-200 dark:border-zinc-800 transition-transform transform overflow-y-auto">
        <div class="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h2 class="text-lg font-bold text-zinc-900 dark:text-white">文档目录</h2>
          <button @click="showMobileMenu = false" class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-6">
          <div v-for="category in docMenus" :key="category.title" class="mb-8">
            <h4 class="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">{{ category.title }}</h4>
            <ul class="space-y-2 border-l border-zinc-200 dark:border-zinc-800">
              <li v-for="item in category.items" :key="item.id">
                <router-link :to="`/doc/${item.id}`" @click="showMobileMenu = false" class="block pl-4 -ml-px border-l text-sm transition-colors" :class="[
                  route.params.id === item.id 
                    ? 'font-semibold active-nav-link' 
                    : 'border-transparent hover:border-zinc-400 font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300'
                ]">
                  {{ item.title }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { syncedDocMenus as docMenus } from '@/data/synced-docs';
import { useStorage, useMutationObserver } from '@vueuse/core';
import mermaid from 'mermaid';
import { FlaskOutline } from '@vicons/ionicons5';

const categoryMap: Record<string, string> = {
  'Vue': 'Vue3 系列',
  'AI': 'AI Agent',
  'deepseek': 'DeepSeek',
  'web': 'Web前端',
  'ThreeJS': 'Three.js',
  'Games': '游戏开发',
  'NodeJS': '后端专栏',
  'harmony-os-4.0-series': 'HarmonyOS 4.0',
  'Algorithm': '算法'
};

const getCategoryName = (key: string) => categoryMap[key] || key;

const expandedCategories = computed(() => {
  const activeCategory = docMenus.find(cat => cat.items.some(item => item.id === route.params.id));
  return activeCategory ? [activeCategory.title] : (docMenus[0] ? [docMenus[0].title] : []);
});

defineOptions({ name: 'DocViewer' });

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose'
});

const showMobileMenu = ref(false);
const articleRef = ref<HTMLElement | null>(null);

// === 文档主题配置 ===
const availableThemes = [
  { name: 'indigo', color: 'bg-indigo-500', ringColor: 'ring-indigo-400 dark:ring-indigo-500' },
  { name: 'blue', color: 'bg-blue-500', ringColor: 'ring-blue-400 dark:ring-blue-500' },
  { name: 'emerald', color: 'bg-emerald-500', ringColor: 'ring-emerald-400 dark:ring-emerald-500' },
  { name: 'amber', color: 'bg-amber-500', ringColor: 'ring-amber-400 dark:ring-amber-500' },
  { name: 'rose', color: 'bg-rose-500', ringColor: 'ring-rose-400 dark:ring-rose-500' }
] as const;

const themeStyles = {
  indigo: {
    naiveType: 'primary',
    btn: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border-indigo-100 dark:border-indigo-500/20',
    prose: 'prose-indigo prose-a:text-indigo-600 dark:prose-a:text-indigo-400',
    cssVars: { '--theme-bg-light': '#e0e7ff', '--theme-text-light': '#4f46e5', '--theme-bg-dark': 'rgba(99, 102, 241, 0.15)', '--theme-text-dark': '#818cf8' }
  },
  blue: {
    naiveType: 'info',
    btn: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 border-blue-100 dark:border-blue-500/20',
    prose: 'prose-blue prose-a:text-blue-600 dark:prose-a:text-blue-400',
    cssVars: { '--theme-bg-light': '#dbeafe', '--theme-text-light': '#2563eb', '--theme-bg-dark': 'rgba(59, 130, 246, 0.15)', '--theme-text-dark': '#60a5fa' }
  },
  emerald: {
    naiveType: 'success',
    btn: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border-emerald-100 dark:border-emerald-500/20',
    prose: 'prose-emerald prose-a:text-emerald-600 dark:prose-a:text-emerald-400',
    cssVars: { '--theme-bg-light': '#d1fae5', '--theme-text-light': '#059669', '--theme-bg-dark': 'rgba(16, 185, 129, 0.15)', '--theme-text-dark': '#34d399' }
  },
  amber: {
    naiveType: 'warning',
    btn: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/20 border-amber-100 dark:border-amber-500/20',
    prose: 'prose-amber prose-a:text-amber-600 dark:prose-a:text-amber-400',
    cssVars: { '--theme-bg-light': '#fef3c7', '--theme-text-light': '#d97706', '--theme-bg-dark': 'rgba(245, 158, 11, 0.15)', '--theme-text-dark': '#fbbf24' }
  },
  rose: {
    naiveType: 'error',
    btn: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 border-rose-100 dark:border-rose-500/20',
    prose: 'prose-rose prose-a:text-rose-600 dark:prose-a:text-rose-400',
    cssVars: { '--theme-bg-light': '#ffe4e6', '--theme-text-light': '#e11d48', '--theme-bg-dark': 'rgba(244, 63, 94, 0.15)', '--theme-text-dark': '#fb7185' }
  }
} as const;

type ThemeKey = keyof typeof themeStyles;
const currentTheme = useStorage<ThemeKey>('doc-theme', 'indigo');

const articleClass = computed(() => {
  return [
    'markdown-body', 'prose', 'prose-zinc', 'dark:prose-invert', 'max-w-none',
    'prose-headings:font-bold',
    'prose-pre:bg-[#282c34]', 'prose-pre:border', 'prose-pre:border-zinc-800', 'prose-img:rounded-xl',
    themeStyles[currentTheme.value].prose
  ].join(' ');
});

const themeCssVars = computed(() => themeStyles[currentTheme.value].cssVars);

const router = useRouter();
const route = useRoute();

const currentDocData = computed(() => {
  const currentId = route.params.id as string;
  for (const category of docMenus) {
    const found = category.items.find(item => item.id === currentId);
    if (found) return found;
  }
  return null;
});

const currentDocComponent = computed(() => currentDocData.value?.component || null);

interface TocItem {
  text: string;
  level: number;
}
const toc = ref<TocItem[]>([]);
const activeHeading = ref<string>('');

const scrollTo = (text: string) => {
  const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4');
  for (let i = 0; i < headings.length; i++) {
    const el = headings[i] as HTMLElement;
    if (el.textContent?.trim() === text) {
      if (window.getComputedStyle(el).display === 'none') {
        const scrollContainer = document.querySelector('.n-layout-scroll-container');
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.remove('heading-flash');
        void el.offsetWidth;
        el.classList.add('heading-flash');
      }
      break;
    }
  }
};

const initDocFeatures = () => {
  const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4');
  toc.value = Array.from(headings).map(h => ({
    text: h.textContent?.trim() || '',
    level: parseInt(h.tagName.substring(1))
  }));

  handleWindowScroll();

  document.querySelectorAll('.markdown-body pre').forEach((pre) => {
    // 防止重复处理
    if (pre.hasAttribute('data-processed')) return;
    pre.setAttribute('data-processed', 'true');

    const codeBlock = pre.querySelector('code');
    if (!codeBlock) return;
    
    // --- Mermaid 流程图处理 ---
    const isMermaid = codeBlock.className.includes('language-mermaid') || codeBlock.className.includes('mermaid') || pre.className.includes('language-mermaid') || pre.className.includes('mermaid');
    if (isMermaid) {
      const mermaidDiv = document.createElement('div');
      mermaidDiv.className = 'mermaid flex justify-center py-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl my-6 border border-zinc-200 dark:border-zinc-800';
      mermaidDiv.textContent = codeBlock.textContent || '';
      mermaidDiv.id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
      pre.parentNode?.replaceChild(mermaidDiv, pre);
      
      // 捕获可能渲染失败的错误，防止控制台崩溃
      try {
        mermaid.run({ nodes: [mermaidDiv] }).catch(e => console.warn('Mermaid render error:', e));
      } catch (e) {
        console.warn('Mermaid render error:', e);
      }
      return; // 是流程图就不需要注入代码复制按钮和角标了
    }

    // --- 极客风语言角标动态提取注入 ---
    let lang = '';
    const classList = Array.from(codeBlock.classList);
    for (const c of classList) {
      if (c !== 'hljs' && c.length > 0) {
        lang = c.replace('language-', '');
        break;
      }
    }
    if (!lang) lang = 'TEXT';
    
    const langMap: Record<string, string> = {
      'js': 'JS', 'javascript': 'JS', 'ts': 'TS', 'typescript': 'TS',
      'vue': 'VUE', 'html': 'HTML', 'xml': 'HTML', 'css': 'CSS',
      'json': 'JSON', 'yaml': 'YAML', 'yml': 'YAML', 'bash': 'BASH', 'sh': 'BASH', 'md': 'MD'
    };
    const displayLang = langMap[lang.toLowerCase()] || lang.toUpperCase();

    (pre as HTMLElement).style.position = 'relative';

    const badge = document.createElement('div');
    badge.className = 'absolute top-3 left-4 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-zinc-400 bg-zinc-800/80 border border-zinc-700 rounded pointer-events-none uppercase z-10 font-mono backdrop-blur-sm shadow-sm';
    badge.innerText = displayLang;
    pre.appendChild(badge);

    // --- 优雅的代码复制按钮 ---
    const btn = document.createElement('button');
    btn.className = 'copy-btn absolute top-3 right-4 p-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-xs rounded-md transition-colors border border-zinc-700 backdrop-blur-sm shadow-sm z-10 cursor-pointer flex items-center justify-center';
    btn.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`;
    
    btn.addEventListener('click', () => {
      const code = codeBlock.textContent || '';
      navigator.clipboard.writeText(code).then(() => {
        btn.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
        btn.classList.add('text-emerald-400', 'bg-emerald-500/20', 'border-emerald-500/30');
        setTimeout(() => {
          btn.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`;
          btn.classList.remove('text-emerald-400', 'bg-emerald-500/20', 'border-emerald-500/30');
        }, 2000);
      });
    });
    pre.appendChild(btn);
  });
};

// 监听 Markdown 容器的内容变化，瞬间触发特性注入，防止刷新和首次加载时闪烁或失效
useMutationObserver(articleRef, (mutations) => {
  const hasNewNodes = mutations.some(m => m.addedNodes.length > 0);
  if (hasNewNodes) {
    initDocFeatures();
  }
}, { childList: true, subtree: true });

const handleWindowScroll = () => {
  if (!toc.value.length) return;
  const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4');
  let currentActive = toc.value[0]?.text || '';
  headings.forEach((el) => {
    if (window.getComputedStyle(el).display === 'none') return;
    const rect = el.getBoundingClientRect();
    if (rect.top <= 150) {
      currentActive = el.textContent?.trim() || currentActive;
    }
  });
  activeHeading.value = currentActive;
};

onMounted(() => {
  window.addEventListener('scroll', handleWindowScroll, true);
});

watch(
  () => route.params.id,
  () => {
    // 切换文档时瞬间将滚动条重置到顶部，保障无缝切换体验
    const scrollContainer = document.querySelector('.n-layout-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'instant' });
    }

    nextTick(() => {
      setTimeout(initDocFeatures, 150);
    });
  },
  { immediate: true }
);

onUnmounted(() => {
  window.removeEventListener('scroll', handleWindowScroll, true);
});
</script>

<style>
@import 'highlight.js/styles/atom-one-dark.css';

.markdown-body pre {
  padding: 2.25rem 1rem 1rem 1rem !important;
  border-radius: 0.375rem !important;
  background-color: #282c34 !important;
}

.markdown-body h1:first-child {
  display: none;
}

.markdown-body pre code {
  background-color: transparent !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
}

.markdown-body {
  animation: fade-in 0.5s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 标题锚点滚动预留高度，避免贴顶 */
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4 {
  scroll-margin-top: 100px;
}

/* 标题颜色随主题变化 */
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
  color: var(--theme-text-light);
  transition: color 0.3s;
}
html.dark .markdown-body h1, html.dark .markdown-body h2, html.dark .markdown-body h3, html.dark .markdown-body h4, html.dark .markdown-body h5, html.dark .markdown-body h6 {
  color: var(--theme-text-dark);
}

/* 引用区块主题化 */
.markdown-body blockquote {
  border-left-color: var(--theme-text-light) !important;
  background-color: var(--theme-bg-light);
  padding: 1rem 1.25rem;
  border-radius: 0 0.5rem 0.5rem 0;
  margin: 1.5rem 0;
  font-style: normal;
  transition: all 0.3s;
}
html.dark .markdown-body blockquote {
  border-left-color: var(--theme-text-dark) !important;
  background-color: var(--theme-bg-dark);
}
.markdown-body blockquote > p {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

/* 水平分割线样式优化 */
.markdown-body hr {
  margin: 2rem 0 !important;
  border-top-width: 1px;
  border-color: #e4e4e7;
}
html.dark .markdown-body hr {
  border-color: #27272a;
}

/* 导航高亮样式 */
.active-nav-link {
  border-left-color: var(--theme-text-light);
  color: var(--theme-text-light);
}
html.dark .active-nav-link {
  border-left-color: var(--theme-text-dark);
  color: var(--theme-text-dark);
}
.active-toc-link {
  color: var(--theme-text-light);
}
html.dark .active-toc-link {
  color: var(--theme-text-dark);
}

/* 表格样式优化与主题化 */
.markdown-body table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 2rem 0; font-size: 0.875rem; border: 1px solid #e4e4e7; border-radius: 0.5rem; overflow: hidden; }
html.dark .markdown-body table { border-color: #27272a; }
.markdown-body th, .markdown-body td { padding: 0.75rem 1rem; border-bottom: 1px solid #e4e4e7; text-align: left; transition: all 0.3s; }
html.dark .markdown-body th, html.dark .markdown-body td { border-bottom-color: #27272a; }

.markdown-body th { background-color: var(--theme-bg-light); font-weight: 600; color: var(--theme-text-light); }
html.dark .markdown-body th { background-color: var(--theme-bg-dark); color: var(--theme-text-dark); }

.markdown-body tr:last-child td { border-bottom: none; }
.markdown-body tbody tr:nth-child(even) { background-color: #fafafa; }
html.dark .markdown-body tbody tr:nth-child(even) { background-color: #121212; }
.markdown-body tbody tr:hover { background-color: var(--theme-bg-light); }
html.dark .markdown-body tbody tr:hover { background-color: var(--theme-bg-dark); }

/* 优化内联代码块样式，随主题色动态变化 */
.markdown-body code::before,
.markdown-body code::after {
  content: none !important;
}

.markdown-body :not(pre) > code {
  background-color: var(--theme-bg-light);
  color: var(--theme-text-light);
  padding: 0.2rem 0.4rem;
  border-radius: 0.375rem;
  font-size: 0.85em;
  font-weight: 600;
  border: 1px solid rgba(0,0,0,0.03);
}

.markdown-body :not(pre) > code span {
  color: inherit !important;
}

/* 适配暗黑模式的内联代码 */
html.dark .markdown-body :not(pre) > code {
  background-color: var(--theme-bg-dark);
  color: var(--theme-text-dark);
  border: 1px solid rgba(255,255,255,0.05);
}

/* 极其克制的标题锚点高亮脉冲动画（只改变背景色，不改变布局和文字） */
@keyframes highlight-pulse {
  0% { background-color: rgba(99, 102, 241, 0.2); border-radius: 6px; box-shadow: 0 0 0 6px rgba(99, 102, 241, 0.2); }
  100% { background-color: transparent; border-radius: 6px; box-shadow: 0 0 0 6px transparent; }
}
.heading-flash {
  animation: highlight-pulse 1.5s ease-out;
}
</style>
