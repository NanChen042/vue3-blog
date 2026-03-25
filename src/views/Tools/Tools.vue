<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- Page Header -->
      <div class="mb-12 lg:pl-72">
        <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {{ $t('nav.tools') }}
        </h1>
        <p class="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
          精选开发资源、框架文档与在线工具，助力高效开发。
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-12 items-start relative">
        <!-- Sidebar Navigation (Desktop) -->
        <ToolSidebar 
          :categories="NAV_DATA" 
          :active-category="activeCategory" 
          @scroll-to="handleScrollTo"
        />

        <!-- Main Content -->
        <main class="flex-1 min-w-0 px-2 lg:px-0">
          <!-- Mobile chips (shown only on small screens) -->
          <div class="lg:hidden sticky top-[64px] z-40 bg-slate-50 dark:bg-slate-950 -mx-4 px-4 py-4 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
            <div class="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                v-for="category in NAV_DATA"
                :key="category.title"
                @click="handleScrollTo(category.title)"
                class="whitespace-nowrap px-4 py-2 text-xs font-bold rounded-full border transition-all duration-200 cursor-pointer shadow-sm"
                :class="[
                  activeCategory === category.title
                    ? 'bg-purple-600 border-purple-600 text-white shadow-purple-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-300 dark:hover:border-purple-700'
                ]"
              >
                {{ $t(category.title) }}
              </button>
            </div>
          </div>

          <!-- Categories List -->
          <div class="space-y-16">
            <section
              v-for="category in NAV_DATA"
              :key="category.title"
              :id="`cat-${slugify(category.title)}`"
              class="scroll-mt-28 category-section"
              :data-category="category.title"
            >
              <!-- Section Header -->
              <div class="flex items-center gap-4 mb-8">
                <div class="w-1.5 h-8 bg-purple-600 dark:bg-purple-500 rounded-full"></div>
                <h2 class="text-2xl font-bold text-slate-800 dark:text-white">
                  {{ $t(category.title) }}
                </h2>
                <div class="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold tabular-nums">
                  {{ category.items.length }}
                  <span class="opacity-60 font-medium">TOOLS</span>
                </div>
              </div>

              <!-- Tool Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <ToolCard 
                  v-for="item in category.items" 
                  :key="item.title" 
                  :item="item" 
                />
              </div>
            </section>
          </div>
          
          <!-- Footer spacer -->
          <div class="h-40"></div>
        </main>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { NAV_DATA } from './data';
import ToolCard from './components/ToolCard.vue';
import ToolSidebar from './components/ToolSidebar.vue';

defineOptions({ name: 'Tools' });

const activeCategory = ref(NAV_DATA[0]?.title);

const slugify = (str: string) =>
  str.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-').toLowerCase();

const handleScrollTo = (title: string) => {
  const id = `cat-${slugify(title)}`;
  const el = document.getElementById(id);
  if (el) {
    const offset = 110; // Adjusted for header + spacing
    const elementRect = el.getBoundingClientRect().top;
    const bodyRect = document.body.getBoundingClientRect().top;
    const offsetPosition = elementRect - bodyRect - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// ScrollSpy logic
const handleScroll = () => {
  const sections = document.querySelectorAll('.category-section');
  const scrollPosition = window.scrollY + 130;

  for (const section of sections) {
    const el = section as HTMLElement;
    if (el.offsetTop <= scrollPosition && (el.offsetTop + el.offsetHeight) > scrollPosition) {
      activeCategory.value = el.dataset.category || '';
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
:global(html) {
  scroll-behavior: smooth;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
