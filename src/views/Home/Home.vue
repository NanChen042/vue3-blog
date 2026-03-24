<template>
  <div class="relative min-h-screen bg-[#f8f9fa] dark:bg-black overflow-hidden selection:bg-indigo-500/30">
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 dark:bg-indigo-600/20 blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>

    <header class="relative z-10 pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/10 border border-black/5 dark:border-white/10 backdrop-blur-md mb-8 shadow-sm">
        <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
        <span class="text-sm font-medium text-slate-800 dark:text-slate-200">{{ $t('home.hero.badge') }}</span>
      </div>

      <h1 class="text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
        {{ $t('home.hero.title_prefix') }}
        <br class="hidden sm:block" />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400">
          {{ $t('home.hero.title_highlight') }}
        </span>
      </h1>

      <p class="max-w-2xl text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-light">
        {{ $t('home.hero.description') }}
      </p>

      <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all duration-300 shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.5)] hover:-translate-y-1">
          {{ $t('home.hero.primary_btn') }}
        </button>
        <button class="px-8 py-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white font-medium rounded-full hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all duration-300 hover:-translate-y-1">
          {{ $t('home.hero.secondary_btn') }}
        </button>
      </div>
    </header>
    <section class="premium-bento-section relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pb-32 overflow-hidden">

      <div class="absolute inset-0 bento-grid-bg pointer-events-none"></div>
      <div class="absolute inset-0 noise-overlay pointer-events-none opacity-[0.04] dark:opacity-[0.06]"></div>

      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-pulse-slow"></div>
      <div class="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-700"></div>

      <div class="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[260px]">

        <div class="bento-card card-ai md:col-span-2 md:row-span-2 group">
          <div class="animated-border"></div>

          <div class="card-inner relative h-full flex flex-col justify-between overflow-hidden">
            <div class="ambient-glow glow-purple"></div>
            <div class="ambient-glow glow-blue delay-1000"></div>

            <div class="holo-grid opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div class="relative z-20 flex justify-between items-start">
              <div class="icon-wrapper ai-icon-wrapper shadow-2xl shadow-purple-500/30 dark:shadow-purple-500/50">
                <div class="icon-inner flex items-center justify-center">
                  <svg class="w-8 h-8 text-purple-600 dark:text-white animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 backdrop-blur-md">
                <span class="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse-fast shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
                <span class="text-xs font-mono text-slate-600 dark:text-slate-300">SYSTEM.ONLINE</span>
              </div>
            </div>

            <div class="relative z-20 mt-auto transform group-hover:translate-y-[-10px] transition-transform duration-700 ease-out">
              <h3 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-purple-600 to-indigo-600 dark:from-white dark:via-purple-200 dark:to-indigo-400 mb-4 tracking-tight drop-shadow-sm dark:drop-shadow-lg">
                {{ $t('home.features.lab.title') }}
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md font-light group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors duration-500">
                {{ $t('home.features.lab.desc') }}
              </p>
            </div>

            <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>
          </div>
        </div>

        <div class="bento-card card-blog md:col-span-2 group">
          <div class="card-inner relative h-full flex flex-col justify-center overflow-hidden">
            <div class="shimmer-effect"></div>
            <div class="flex items-center gap-6 relative z-20">
              <div class="icon-wrapper blog-icon-wrapper">
                <div class="icon-inner flex items-center justify-center">
                  <svg class="w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 4v5h5M8 12h8m-8 4h6" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">{{ $t('home.features.blog.title') }}</h3>
                <p class="text-slate-600 dark:text-slate-400">{{ $t('home.features.blog.desc') }}</p>
              </div>
              <div class="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-300">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bento-card card-tools group">
          <div class="card-inner relative h-full flex flex-col justify-between overflow-hidden">
            <div class="ambient-glow glow-emerald opacity-0 group-hover:opacity-50"></div>
            <div class="relative z-20 icon-wrapper tools-icon-wrapper">
              <div class="icon-inner flex items-center justify-center">
                <svg class="w-7 h-7 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
            </div>
            <div class="relative z-20">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">{{ $t('home.features.tools.title') }}</h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm">{{ $t('home.features.tools.desc') }}</p>
            </div>
          </div>
        </div>

        <div class="bento-card card-games group">
          <div class="card-inner relative h-full flex flex-col justify-between overflow-hidden">
            <div class="ambient-glow glow-rose opacity-0 group-hover:opacity-50"></div>
            <div class="relative z-20 icon-wrapper games-icon-wrapper">
              <div class="icon-inner flex items-center justify-center">
                <svg class="w-7 h-7 text-rose-600 dark:text-rose-400 group-hover:rotate-[15deg] group-hover:scale-110 transition-transform duration-500 origin-bottom-left" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="relative z-20">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors">{{ $t('home.features.games.title') }}</h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm">{{ $t('home.features.games.desc') }}</p>
            </div>
          </div>
        </div>

        <div class="bento-card card-chat md:col-span-4 group h-[180px] md:h-[220px]">
          <div class="card-inner relative h-full flex items-center overflow-hidden">

            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMSkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9InJnYmEoNiwgMTgyLCAyMTIsIDAuMSkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCA1MCBDIDIwMCAxNTAsIDQwMCAtNTAsIDYwMCA1MCBDIDgwMCAxNTAsIDEwMDAgLTUwLCAxMjAwIDUwIEwgMTIwMCAxMDAgTCAwIDEwMCBaIiBmaWxsPSJ1cmwoI2cpIiB0cmFuc2Zvcm09InNjYWxlKDEgMS41KSB0cmFuc2xhdGUoMCAtMjApIi8+PHBhdGggZD0iTTAgNTAgQyAyMDAgMTgwLCA0MDAgLTgwLCA2MDAgNTAgQyA4MDAgMTgwLCAxMDAwIC04MCwgMTIwMCA1MCBMIDEyMDAgMTAwIEwgMCAxMDAgWiIgZmlsbD0idXJsKCNnKSIgdHJhbnNmb3JtPSJzY2FsZSgxIDIuNSkgdHJhbnNsYXRlKDAgLTIwKSIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] bg-cover bg-center opacity-40 dark:opacity-20 mix-blend-color-burn dark:mix-blend-color-dodge transition-transform duration-[10s] ease-linear group-hover:scale-110"></div>

            <div class="absolute -right-20 -top-20 w-64 h-64 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

            <div class="p-8 w-full flex flex-col md:flex-row items-center justify-between z-20 relative">
              <div class="flex items-center gap-6 md:gap-8">
                <div class="icon-wrapper chat-icon-wrapper relative">
                  <div class="absolute inset-0 bg-cyan-400 dark:bg-cyan-500 rounded-full animate-ping opacity-20"></div>
                  <div class="icon-inner flex items-center justify-center">
                    <svg class="w-9 h-9 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">{{ $t('home.features.chat.title') }}</h3>
                  <p class="text-slate-600 dark:text-cyan-100/70 text-lg max-w-xl">{{ $t('home.features.chat.desc') }}</p>
                </div>
              </div>

              <button class="chat-action-btn relative overflow-hidden mt-6 md:mt-0 px-8 py-4 rounded-full font-bold text-white tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <span class="relative z-10">{{ $t('home.features.chat.action') }}</span>
                <div class="btn-glow"></div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
/* =========================================
   亮/暗双主题高级 CSS 架构
   配合 Tailwind 的 dark 模式运行
   ========================================= */

/* 1. 全局 CSS 变量 (默认白天模式) */
.premium-bento-section {
  --grid-color: rgba(0, 0, 0, 0.04);
  --glass-bg: rgba(255, 255, 255, 0.65);
  --glass-border: rgba(0, 0, 0, 0.06);
  --glass-highlight: rgba(255, 255, 255, 0.9);
  --icon-bg: rgba(255, 255, 255, 0.9);
  --shadow-base: rgba(0, 0, 0, 0.04);
  --shadow-hover: rgba(0, 0, 0, 0.08);
  perspective: 2000px;
}

/* 暗黑模式变量映射 (Tailwind 标准 .dark 类) */
:global(.dark) .premium-bento-section {
  --grid-color: rgba(255, 255, 255, 0.03);
  --glass-bg: rgba(15, 15, 20, 0.4);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-highlight: rgba(255, 255, 255, 0.15);
  --icon-bg: #111116;
  --shadow-base: rgba(0, 0, 0, 0.3);
  --shadow-hover: rgba(0, 0, 0, 0.5);
}

/* 全局网格背景 */
.bento-grid-bg {
  background-image: linear-gradient(
      to right,
      var(--grid-color) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    black 40%,
    transparent 80%
  );
}

.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* 2. 基础卡片外壳 (Bento Card Base) */
.bento-card {
  position: relative;
  border-radius: 32px;
  background: transparent;
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 10px 40px -10px var(--shadow-base);
  cursor: pointer;
}

.bento-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 30px 60px -15px var(--shadow-hover),
    0 0 40px var(--glass-highlight) inset;
}

/* 内部玻璃层 */
.card-inner {
  border-radius: 32px;
  background: var(--glass-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border);
  padding: 2.5rem;
  box-shadow: inset 0 1px 1px var(--glass-highlight);
  transition: border-color 0.4s ease, background 0.4s ease;
  z-index: 2;
}

:global(.dark) .bento-card:hover .card-inner {
  border-color: rgba(255, 255, 255, 0.2);
}
/* 白天模式下的 hover 边框高亮 */
.bento-card:hover .card-inner {
  border-color: rgba(0, 0, 0, 0.15);
}

/* 3. 图标容器体系 (Icon Wrappers) */
.icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--glass-border);
  border: 1px solid var(--glass-border);
  box-shadow: inset 0 2px 10px var(--glass-highlight);
  transition: all 0.5s ease;
  overflow: hidden;
}

.icon-wrapper::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(139, 92, 246, 0.4),
    transparent
  );
  animation: spin 4s linear infinite;
  opacity: 0;
  transition: opacity 0.5s;
}

.bento-card:hover .icon-wrapper::before {
  opacity: 1;
}

.icon-inner {
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background: var(--icon-bg);
  border-radius: 19px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.4s ease;
}

/* =========================================
   单体卡片特效
   ========================================= */

@property --border-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0turn;
}

.card-ai .animated-border {
  position: absolute;
  inset: -2px;
  border-radius: 34px;
  background: conic-gradient(
    from var(--border-angle),
    transparent 20%,
    #8b5cf6 40%,
    #3b82f6 60%,
    transparent 80%
  );
  animation: rotate-border 4s linear infinite;
  opacity: 0.3; /* 白天稍微降低发光度 */
  transition: opacity 0.5s ease;
  z-index: 0;
  filter: blur(4px);
}
:global(.dark) .card-ai .animated-border {
  opacity: 0.5;
}

.card-ai:hover .animated-border {
  opacity: 0.8;
  filter: blur(8px);
}
:global(.dark) .card-ai:hover .animated-border {
  opacity: 1;
}

.ai-icon-wrapper {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  border: none;
}

/* 全息网格跟随亮暗主题 */
.holo-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      to right,
      rgba(139, 92, 246, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  transform: perspective(500px) rotateX(60deg) scale(2);
  transform-origin: bottom center;
  mask-image: linear-gradient(to top, black, transparent);
  -webkit-mask-image: linear-gradient(to top, black, transparent);
}

/* 博客卡片扫光 */
.card-blog .shimmer-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent,
    var(--glass-highlight),
    transparent
  );
  transform: skewX(-20deg);
  z-index: 1;
  transition: none;
}
.card-blog:hover .shimmer-effect {
  animation: shimmer 1.5s ease-out forwards;
}

/* 聊天室按钮与特效 */
.card-chat {
  background: linear-gradient(
    90deg,
    rgba(8, 145, 178, 0.05),
    rgba(37, 99, 235, 0.05)
  );
}
.chat-action-btn {
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}
.chat-action-btn:hover {
  box-shadow: 0 0 30px rgba(6, 182, 212, 0.5);
  transform: scale(1.05);
}
.btn-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transform: translateX(-100%);
}
.chat-action-btn:hover .btn-glow {
  animation: shimmer 1s infinite;
}

/* =========================================
   核心动画
   ========================================= */

@keyframes rotate-border {
  to {
    --border-angle: 1turn;
  }
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
@keyframes shimmer {
  100% {
    left: 200%;
    transform: translateX(100%) skewX(-20deg);
  }
}
@keyframes pulse-fast {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}
.animate-pulse-fast {
  animation: pulse-fast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite alternate;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 动态光晕 */
.ambient-glow {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  filter: blur(50px);
  z-index: 1;
  pointer-events: none;
  animation: float 6s ease-in-out infinite;
}
.glow-purple {
  background: rgba(139, 92, 246, 0.2);
  top: -20px;
  left: -20px;
}
.glow-blue {
  background: rgba(59, 130, 246, 0.2);
  bottom: -20px;
  right: -20px;
}
.glow-emerald {
  background: rgba(16, 185, 129, 0.15);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.glow-rose {
  background: rgba(244, 63, 94, 0.15);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>