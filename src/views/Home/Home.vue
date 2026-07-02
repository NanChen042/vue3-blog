<template>
  <div 
    class="min-h-screen transition-colors duration-300 relative pt-16 pb-12 overflow-hidden"
    @contextmenu.prevent="openContextMenu"
  >
    <!-- Background ambient blobs (Restored) -->
    <div class="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-400/20 dark:bg-indigo-500/10 blur-[120px] animate-blob z-0"></div>
    <div class="pointer-events-none absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full bg-violet-400/20 dark:bg-violet-500/10 blur-[120px] animate-blob animation-delay-2000 z-0"></div>

    <!-- Noise SVG Overlay (Restored) -->
    <div class="pointer-events-none absolute inset-0 noise-overlay opacity-[0.02] dark:opacity-[0.03] z-0"></div>

    <!-- Naive UI Context Menu -->
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="menuX"
      :y="menuY"
      :options="contextOptions"
      :show="showContextMenu"
      :on-clickoutside="closeContextMenu"
      @select="handleMenuSelect"
    />

    <div class="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
      <main class="w-full min-w-0">
        <!-- Giant Top Clock (Fixed Background Watermark) -->
        <div class="fixed inset-0 flex flex-col items-center pt-[15vh] pointer-events-none select-none z-0">
          <div class="text-[5.5rem] sm:text-[7rem] font-bold text-zinc-900 dark:text-white drop-shadow-sm leading-none tracking-tighter font-sans flex items-baseline">
            <span>{{ topTime }}</span>
          </div>
          <div class="text-lg sm:text-xl font-semibold text-zinc-500 dark:text-zinc-400 tracking-widest mt-2 sm:mt-1">
            {{ topDate }} <span class="mx-2 sm:mx-3 font-light opacity-50">|</span> {{ topDay }}
          </div>
        </div>

        <!-- Spotlight Search Bar -->
        <div class="flex justify-center mb-10 mt-[18vh] relative z-50">
          <div class="w-full max-w-xl">
            <GlobalSearch />
          </div>
        </div>

        <!-- Draggable Grid System -->
        <VueDraggable 
          v-model="gridItems" 
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5 auto-rows-[110px]"
          :animation="400"
          easing="cubic-bezier(0.33, 1, 0.68, 1)"
          :fallbackTolerance="5"
          ghostClass="opacity-30"
          chosenClass="card-chosen"
        >
          <div 
            v-for="item in gridItems" 
            :key="item.id" 
            :class="[item.spanClass, 'relative group/card transform transition-transform cursor-grab active:cursor-grabbing']"
            @contextmenu.stop.prevent="openWidgetContextMenu($event, item.id)"
          >
            <!-- Dynamic Component -->
            <component :is="getComponent(item.type)" :size="item.size" @change-size="changeSize(item.id, $event)" />
          </div>
        </VueDraggable>
      </main>
    </div>

    <!-- Widget Store Modal (Naive UI) -->
    <n-modal 
      v-model:show="showWidgetModal"
      class="custom-card"
      preset="card"
      title="添加小组件"
      :style="{ width: '900px', borderRadius: '12px' }"
      size="huge"
      :bordered="false"
      :segmented="{ content: 'soft', footer: 'soft' }"
    >
      <div class="flex h-[600px]">
        <!-- Left Sidebar Categories using NTabs -->
        <n-tabs type="line" placement="left" animated style="width: 100%; height: 100%;">
          
          <n-tab-pane name="time" tab="时间与日期">
            <div class="grid grid-cols-2 gap-4 p-4 pl-6 overflow-y-auto h-full pb-10">
              <WidgetStoreCard 
                v-for="widget in getWidgetsByTab('time')" 
                :key="widget.type" 
                :widget="widget" 
                :widgetComponent="getComponent(widget.type)"
                @add="addWidget"
              />
            </div>
          </n-tab-pane>

          <n-tab-pane name="info" tab="信息与工具">
            <div class="grid grid-cols-2 gap-4 p-4 pl-6 overflow-y-auto h-full pb-10">
              <WidgetStoreCard 
                v-for="widget in getWidgetsByTab('info')" 
                :key="widget.type" 
                :widget="widget" 
                :widgetComponent="getComponent(widget.type)"
                @add="addWidget"
              />
            </div>
          </n-tab-pane>

          <n-tab-pane name="utils" tab="娱乐与高级">
            <div class="grid grid-cols-2 gap-4 p-4 pl-6 overflow-y-auto h-full pb-10">
              <WidgetStoreCard 
                v-for="widget in getWidgetsByTab('utils')" 
                :key="widget.type" 
                :widget="widget" 
                :widgetComponent="getComponent(widget.type)"
                @add="addWidget"
              />
            </div>
          </n-tab-pane>
        </n-tabs>
      </div>
    </n-modal>

  </div>
</template>

<script setup lang="ts">
import { h, ref, onMounted, onUnmounted, nextTick } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { NDropdown, NModal, NTabs, NTabPane } from 'naive-ui';
import type { DropdownOption } from 'naive-ui';

// Widgets
import GlobalSearch from './components/widgets/GlobalSearch.vue';
import ClockWidget from './components/widgets/ClockWidget.vue';
import WeatherWidget from './components/widgets/WeatherWidget.vue';
import CalendarWidget from './components/widgets/CalendarWidget.vue';
import CountdownWidget from './components/widgets/CountdownWidget.vue';
import ExchangeWidget from './components/widgets/ExchangeWidget.vue';
import TodoWidget from './components/widgets/TodoWidget.vue';
import QuoteWidget from './components/widgets/QuoteWidget.vue';
import HotTopicsWidget from './components/widgets/HotTopicsWidget.vue';
import EarthWidget from './components/widgets/EarthWidget.vue';
import BlogWidget from './components/widgets/BlogWidget.vue';
import GameWidget from './components/widgets/GameWidget.vue';
import ChatWidget from './components/widgets/ChatWidget.vue';
import WidgetStoreCard from './components/widgets/WidgetStoreCard.vue';

defineOptions({ name: 'Home' });

const widgetStoreConfig = [
  // 时间与日期
  { tab: 'time', type: 'ClockWidget', name: '世界时钟', desc: '支持 3D 机械表盘与全球多地时间显示。', hot: '12.4万', sizes: ['2x2'] },
  { tab: 'time', type: 'CountdownWidget', name: '倒数日', desc: '记录和倒数您的重要纪念日与待办节点。', hot: '21.98万', sizes: ['2x1', '2x2'] },
  { tab: 'time', type: 'CalendarWidget', name: '系统日历', desc: '清晰查阅月历，与系统时间同步。', hot: '8.6万', sizes: ['2x2'] },
  
  // 信息与工具
  { tab: 'info', type: 'WeatherWidget', name: '天气预报', desc: '显示实时温度与天气动画。', hot: '26.41万', sizes: ['1x1', '2x1', '2x2'] },
  { tab: 'info', type: 'ExchangeWidget', name: '实时汇率', desc: '获取主流货币的最新汇率转换信息。', hot: '5.2万', sizes: ['1x1'] },
  { tab: 'info', type: 'HotTopicsWidget', name: '今日热点', desc: '聚合全球新闻热点，一眼看尽天下事。', hot: '34.1万', sizes: ['2x2'] },
  { tab: 'info', type: 'BlogWidget', name: '博客精选', desc: '展示最新前端技术博文与精选内容。', hot: '9.8万', sizes: ['2x1', '2x2'] },
  { tab: 'info', type: 'ChatWidget', name: 'AI 助理', desc: '桌面常驻 AI 大模型，提供实时智能问答。', hot: '15.6万', sizes: ['2x2'] },
  
  // 娱乐与高级
  { tab: 'utils', type: 'GameWidget', name: '井字棋', desc: '无聊时放松一下，支持与内置 AI 随时对战。', hot: '4.3万', sizes: ['1x1', '2x2'] },
  { tab: 'utils', type: 'EarthWidget', name: '3D 地球', desc: '基于 WebGL 渲染，感受地球实时昼夜交替。', hot: '42.7万', sizes: ['1x1', '2x2'] },
  { tab: 'utils', type: 'TodoWidget', name: '待办焦点', desc: '记录日常任务，保持极致专注力。', hot: '18.9万', sizes: ['2x2'] },
  { tab: 'utils', type: 'QuoteWidget', name: '每日一言', desc: '获取每日心灵鸡汤与极简座右铭。', hot: '11.2万', sizes: ['1x1', '2x1'] }
];

const getWidgetsByTab = (tabName: string) => widgetStoreConfig.filter(w => w.tab === tabName);

// Giant Top Clock logic
const topTime = ref('');
const topDate = ref('');
const topDay = ref('');

const updateTopClock = () => {
  const now = new Date();
  topTime.value = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  topDate.value = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  topDay.value = days[now.getDay()];
};

let timer: number;
onMounted(() => {
  updateTopClock();
  timer = window.setInterval(updateTopClock, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});

// Grid State Management
const defaultLayout = [
  { id: 'c1', type: 'ChatWidget', size: '2x2', spanClass: 'col-span-2 row-span-2' },
  { id: 'b1', type: 'BlogWidget', size: '2x2', spanClass: 'col-span-2 row-span-2' },
  { id: '1', type: 'ClockWidget', size: '2x2', spanClass: 'col-span-2 row-span-2' },
  { id: '2', type: 'WeatherWidget', size: '2x2', spanClass: 'col-span-2 row-span-2' },
  { id: '3', type: 'CalendarWidget', size: '2x2', spanClass: 'col-span-2 row-span-2' },
  { id: '4', type: 'CountdownWidget', size: '2x1', spanClass: 'col-span-2 row-span-1' },
  { id: '5', type: 'ExchangeWidget', size: '1x1', spanClass: 'col-span-1 row-span-1' },
  { id: '6', type: 'QuoteWidget', size: '1x1', spanClass: 'col-span-1 row-span-1' },
  { id: '7', type: 'TodoWidget', size: '2x2', spanClass: 'col-span-2 row-span-2' },
  { id: '8', type: 'HotTopicsWidget', size: '2x2', spanClass: 'col-span-2 row-span-2' },
  { id: '9', type: 'EarthWidget', size: '2x2', spanClass: 'col-span-2 row-span-2' }
];

const gridItems = ref([...defaultLayout]);

const getComponent = (type: string) => {
  const map: Record<string, any> = {
    WeatherWidget,
    CalendarWidget,
    EarthWidget,
    ClockWidget,
    CountdownWidget,
    ExchangeWidget,
    TodoWidget,
    QuoteWidget,
    HotTopicsWidget,
    BlogWidget,
    GameWidget,
    ChatWidget
  };
  return map[type];
};

const changeSize = (id: string, newSize: string) => {
  const item = gridItems.value.find(i => i.id === id);
  if (item) {
    item.size = newSize;
    if (newSize === '1x1') item.spanClass = 'col-span-1 row-span-1';
    if (newSize === '2x1') item.spanClass = 'col-span-2 row-span-1';
    if (newSize === '2x2') item.spanClass = 'col-span-2 row-span-2';
  }
};

const removeWidget = (id: string) => {
  gridItems.value = gridItems.value.filter(i => i.id !== id);
};

// Modal Widget Store
const showWidgetModal = ref(false);

const addWidget = (type: string, size: string) => {
  let spanClass = 'col-span-2 row-span-2';
  if (size === '1x1') spanClass = 'col-span-1 row-span-1';
  if (size === '2x1') spanClass = 'col-span-2 row-span-1';
  
  gridItems.value.unshift({
    id: type.toLowerCase() + '-' + Date.now(),
    type,
    size,
    spanClass
  });
  showWidgetModal.value = false;
};

// Desktop Context Menu Logic
const showContextMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const activeWidgetId = ref<string | null>(null);
const currentWidgetSize = ref('2x2');

const desktopContextOptions: DropdownOption[] = [
  { label: '添加小组件', key: 'add' },
  { type: 'divider', key: 'd1' },
  { label: '恢复默认布局', key: 'reset' }
];

const contextOptions = ref<DropdownOption[]>(desktopContextOptions);

const openContextMenu = (e: MouseEvent) => {
  contextOptions.value = desktopContextOptions;
  showContextMenu.value = false;
  nextTick(() => {
    showContextMenu.value = true;
    menuX.value = e.clientX;
    menuY.value = e.clientY;
  });
};

const openWidgetContextMenu = (e: MouseEvent, id: string) => {
  showContextMenu.value = false;
  activeWidgetId.value = id;
  const item = gridItems.value.find(i => i.id === id);
  if (item) {
    currentWidgetSize.value = item.size;
    
    // Load specific sizes for the widget
    const config = widgetStoreConfig.find(w => w.type === item.type);
    const supportedSizes = config ? config.sizes : ['1x1', '2x1', '2x2'];
    
    // Custom Render for Size Pills
    const renderSizePills = () => {
      return h('div', { class: 'flex gap-2 px-1 py-1 items-center justify-center cursor-default', onClick: (e: MouseEvent) => e.stopPropagation() }, [
        h('span', { class: 'text-xs text-zinc-500 font-bold mr-1' }, '尺寸'),
        ...supportedSizes.map(s => {
          const isActive = s === item.size;
          return h('button', {
            class: [
              'px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm',
              isActive 
                ? 'bg-blue-500 text-white' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            ],
            onClick: () => {
              applyWidgetSize(s);
              showContextMenu.value = false;
            }
          }, s);
        })
      ]);
    };

    contextOptions.value = [
      {
        key: 'size_selector',
        type: 'render',
        render: renderSizePills
      },
      { type: 'divider', key: 'd1' },
      { label: '删除组件', key: 'delete', props: { class: 'text-red-500 font-bold hover:text-red-600' } }
    ];
  }
  
  nextTick(() => {
    showContextMenu.value = true;
    menuX.value = e.clientX;
    menuY.value = e.clientY;
  });
};

const closeContextMenu = () => {
  showContextMenu.value = false;
};

const handleMenuSelect = (key: string | number) => {
  showContextMenu.value = false;
  if (key === 'add') {
    showWidgetModal.value = true;
  } else if (key === 'reset') {
    gridItems.value = [...defaultLayout];
  } else if (typeof key === 'string' && key.startsWith('size_')) {
    const newSize = key.replace('size_', '');
    applyWidgetSize(newSize);
  } else if (key === 'delete') {
    deleteActiveWidget();
  }
};

const applyWidgetSize = (size: string) => {
  if (activeWidgetId.value) {
    changeSize(activeWidgetId.value, size);
  }
};

const deleteActiveWidget = () => {
  if (activeWidgetId.value) {
    removeWidget(activeWidgetId.value);
  }
};
</script>

<style scoped>
/* 最轻微的网格背景已迁移至全局 style.css */
/* 极光流体呼吸动画 */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(40px, -60px) scale(1.1); }
  66% { transform: translate(-30px, 30px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 15s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}

.animation-delay-2000 {
  animation-delay: 4s;
}

.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* 高级物理拖拽特效：轻微的按压后坐力 */
.card-chosen {
  transform: scale(0.97) !important;
  transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1) !important;
}
</style>