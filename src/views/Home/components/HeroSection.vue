<template>
  <div class="relative z-[100]">
    <section class="relative z-[100] flex flex-col items-center text-center pt-8 sm:pt-16 pb-6 sm:pb-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div class="group flex items-center gap-2 px-3 py-1.5 mb-6 sm:mb-8 rounded-full border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md cursor-pointer hover:bg-white dark:hover:bg-zinc-800/60 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-md hover:-translate-y-0.5">
        <span class="text-[13px] origin-bottom-right group-hover:animate-waving-hand">👋</span>
        <span class="text-xs font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
          {{ $t('home.hero.badge') }}
        </span>
      </div>

      <h1 class="text-[2.75rem] sm:text-[4.5rem] lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.1] text-zinc-900 dark:text-white mb-4 sm:mb-6 px-2">
        {{ $t('home.hero.title_prefix') }}<br />
        <span class="bg-linear-to-r from-indigo-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent">
          {{ $t('home.hero.title_highlight') }}
        </span>
      </h1>

      <p class="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed px-4">
        {{ $t('home.hero.description') }}
      </p>
    </section>


  </div>
</template>


