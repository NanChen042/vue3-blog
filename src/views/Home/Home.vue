<template>
  <div class="relative min-h-screen bg-[#f8f9fa] dark:bg-black overflow-hidden selection:bg-indigo-500/30">
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 dark:bg-indigo-600/20 blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>

    <section class="relative z-10 pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md mb-6 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
        <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
        <span class="text-xs font-semibold tracking-wide uppercase text-slate-800 dark:text-slate-200">{{ $t('home.hero.badge') }}</span>
      </div>

      <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
        {{ $t('home.hero.title_prefix') }}
        <br class="hidden sm:block" />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400">
          {{ $t('home.hero.title_highlight') }}
        </span>
      </h1>

      <p class="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-normal opacity-90">
        {{ $t('home.hero.description') }}
      </p>

      <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button class="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:scale-95">
          {{ $t('home.hero.primary_btn') }}
        </button>
        <button class="px-8 py-3.5 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold rounded-2xl hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
          {{ $t('home.hero.secondary_btn') }}
        </button>
      </div>
    </section>
    <section class="premium-bento-section relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pb-32 overflow-hidden">

      <div class="absolute inset-0 bento-grid-bg pointer-events-none"></div>
      <div class="absolute inset-0 noise-overlay pointer-events-none opacity-[0.04] dark:opacity-[0.06]"></div>

      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-pulse-slow"></div>
      <div class="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-700"></div>

      <div class="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(240px,auto)]">

        <!-- AI Laboratory Card -->
        <div class="bento-card card-ai md:col-span-2 md:row-span-2 group">
          <div class="animated-border"></div>
          <div class="card-inner relative h-full flex flex-col justify-between overflow-hidden p-8 sm:p-10">
            <div class="ambient-glow glow-purple opacity-40 group-hover:opacity-70 transition-opacity duration-700"></div>
            <div class="ambient-glow glow-blue delay-1000 opacity-30 group-hover:opacity-60 transition-opacity duration-700"></div>
            
            <div class="holo-grid opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div class="relative z-20 flex justify-between items-start">
              <div class="icon-wrapper ai-icon-wrapper shadow-2xl shadow-indigo-500/20 dark:shadow-indigo-500/40">
                <div class="icon-inner flex items-center justify-center">
                  <svg class="w-8 h-8 text-indigo-600 dark:text-white animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 backdrop-blur-md">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse-fast"></span>
                <span class="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">System Active</span>
              </div>
            </div>

            <div class="relative z-20 mt-auto">
              <h3 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-500">
                {{ $t('home.features.lab.title') }}
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-sm group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors duration-500">
                {{ $t('home.features.lab.desc') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Tech Blog Card -->
        <div class="bento-card card-blog md:col-span-2 group">
          <div class="card-inner relative h-full flex flex-col justify-center overflow-hidden p-8 sm:p-10">
            <div class="shimmer-effect"></div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-20">
              <div class="icon-wrapper blog-icon-wrapper shrink-0">
                <div class="icon-inner flex items-center justify-center">
                  <svg class="w-7 h-7 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 4v5h5M8 12h8m-8 4h6" />
                  </svg>
                </div>
              </div>
              <div class="flex-grow">
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{{ $t('home.features.blog.title') }}</h3>
                <p class="text-slate-600 dark:text-slate-400 leading-snug">{{ $t('home.features.blog.desc') }}</p>
              </div>
              <div class="hidden sm:flex ml-auto opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                <div class="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Toolkit Card -->
        <div class="bento-card card-tools group">
          <div class="card-inner relative h-full flex flex-col justify-between overflow-hidden p-8">
            <div class="ambient-glow glow-emerald opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
            <div class="relative z-20 icon-wrapper tools-icon-wrapper">
              <div class="icon-inner flex items-center justify-center">
                <svg class="w-7 h-7 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
            </div>
            <div class="relative z-20">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">{{ $t('home.features.tools.title') }}</h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm leading-tight">{{ $t('home.features.tools.desc') }}</p>
            </div>
          </div>
        </div>

        <!-- Game Lounge Card -->
        <div class="bento-card card-games group">
          <div class="card-inner relative h-full flex flex-col justify-between overflow-hidden p-8">
            <div class="ambient-glow glow-rose opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
            <div class="relative z-20 icon-wrapper games-icon-wrapper">
              <div class="icon-inner flex items-center justify-center">
                <svg class="w-7 h-7 text-rose-600 dark:text-rose-400 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="relative z-20">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors">{{ $t('home.features.games.title') }}</h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm leading-tight">{{ $t('home.features.games.desc') }}</p>
            </div>
          </div>
        </div>

        <!-- Live Chatroom Card -->
        <div class="bento-card card-chat md:col-span-4 group">
          <div class="card-inner relative min-h-[180px] md:min-h-[200px] flex items-center overflow-hidden p-8 sm:p-12">
            <!-- Animated Background Pattern -->
            <div class="absolute inset-0 opacity-10 dark:opacity-[0.15] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent group-hover:scale-110 transition-transform duration-[5s]"></div>
            
            <div class="absolute -right-20 -top-20 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
            <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

            <div class="relative z-20 w-full flex flex-col md:flex-row items-center justify-between gap-8">
              <div class="flex items-center gap-8">
                <div class="icon-wrapper chat-icon-wrapper relative shrink-0">
                  <div class="absolute inset-0 bg-indigo-400 dark:bg-indigo-500 rounded-2xl animate-ping opacity-10"></div>
                  <div class="icon-inner flex items-center justify-center">
                    <svg class="w-9 h-9 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 class="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{{ $t('home.features.chat.title') }}</h3>
                  <p class="text-slate-600 dark:text-slate-400 text-lg max-w-xl leading-relaxed">{{ $t('home.features.chat.desc') }}</p>
                </div>
              </div>

              <button class="chat-action-btn relative overflow-hidden px-10 py-4 rounded-2xl font-bold text-white tracking-widest shadow-xl shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/40 hover:-translate-y-1 active:scale-95 shrink-0">
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
  --grid-color: rgba(99, 102, 241, 0.05);
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(99, 102, 241, 0.1);
  --glass-highlight: rgba(255, 255, 255, 0.8);
  --icon-bg: #f8fafc;
  --shadow-base: rgba(0, 0, 0, 0.03);
  --shadow-hover: rgba(99, 102, 241, 0.1);
  perspective: 2000px;
}

:global(.dark) .premium-bento-section {
  --grid-color: rgba(99, 102, 241, 0.03);
  --glass-bg: rgba(15, 23, 42, 0.3);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-highlight: rgba(255, 255, 255, 0.1);
  --icon-bg: #0f172a;
  --shadow-base: rgba(0, 0, 0, 0.2);
  --shadow-hover: rgba(0, 0, 0, 0.4);
}

.bento-grid-bg {
  background-image: radial-gradient(var(--grid-color) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
}

.bento-card {
  position: relative;
  border-radius: 2.5rem;
  transform-style: preserve-3d;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bento-card:hover {
  transform: translateY(-8px) scale(1.01);
}

.card-inner {
  border-radius: 2.5rem;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  box-shadow: 
    0 10px 30px -10px var(--shadow-base),
    inset 0 1px 1px var(--glass-highlight);
  transition: all 0.4s ease;
}

.bento-card:hover .card-inner {
  border-color: rgba(99, 102, 241, 0.3);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 
    0 25px 50px -12px var(--shadow-hover),
    inset 0 1px 1px var(--glass-highlight);
}

:global(.dark) .bento-card:hover .card-inner {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(99, 102, 241, 0.4);
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--glass-border);
  padding: 1px;
  transition: all 0.5s ease;
}

.icon-inner {
  width: 100%;
  height: 100%;
  background: var(--icon-bg);
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.4s ease;
}

.card-ai .animated-border {
  position: absolute;
  inset: -1px;
  border-radius: 2.6rem;
  background: conic-gradient(
    from var(--border-angle),
    transparent 20%,
    #6366f1 40%,
    #a855f7 60%,
    transparent 80%
  );
  animation: rotate-border 4s linear infinite;
  opacity: 0.15;
  filter: blur(8px);
  transition: opacity 0.5s ease;
}

:global(.dark) .card-ai .animated-border {
  opacity: 0.4;
}

.card-ai:hover .animated-border {
  opacity: 0.6;
  filter: blur(12px);
}

.holo-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  transform: perspective(1000px) rotateX(60deg) scale(1.5);
  transform-origin: center bottom;
  mask-image: radial-gradient(circle at center, black, transparent 80%);
}

.card-blog .shimmer-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 25%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 75%
  );
  background-size: 200% 200%;
  opacity: 0;
  transition: opacity 0.3s;
}

.card-blog:hover .shimmer-effect {
  opacity: 1;
  animation: shimmer-bg 2s linear infinite;
}

.chat-action-btn {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
}

.btn-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: translateX(-100%);
}

.chat-action-btn:hover .btn-glow {
  animation: shimmer 1.5s infinite;
}

@keyframes rotate-border {
  to { --border-angle: 1turn; }
}

@keyframes shimmer-bg {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes shimmer {
  100% { transform: translateX(200%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes pulse-fast {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-pulse-fast {
  animation: pulse-fast 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Dynamic Ambient Glows */
.ambient-glow {
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 1;
}

.glow-purple { background: rgba(139, 92, 246, 0.15); top: -10%; left: -10%; }
.glow-blue { background: rgba(59, 130, 246, 0.15); bottom: -10%; right: -10%; }
.glow-emerald { background: rgba(16, 185, 129, 0.15); top: 20%; left: 20%; }
.glow-rose { background: rgba(244, 63, 94, 0.1); top: 20%; right: 20%; }
</style>