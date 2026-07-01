<template>
  <div style="color: var(--db-text-primary)">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 pt-8 pb-16">

      <!-- Header -->
      <div class="flex items-center gap-3 mb-6">
        <h1 class="text-4xl font-extrabold tracking-tight" style="color: var(--db-text-primary)">
          {{ $t('nav.lab') }}
        </h1>
        <n-tag size="small" type="success" :bordered="false" style="border-radius: 6px; font-weight: 700;">
          <template #icon>
            <svg width="7" height="7" viewBox="0 0 7 7">
              <circle cx="3.5" cy="3.5" r="3.5" fill="currentColor">
                <animate attributeName="r" values="3.5;5;3.5" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="3.5" cy="3.5" r="2" fill="currentColor"/>
            </svg>
          </template>
          实验中
        </n-tag>
        <p class="text-sm ml-1" style="color: var(--db-text-muted)">前沿 AI 能力探索与技术实验</p>
      </div>

      <!-- Top Row -->
      <n-grid x-gap="16" y-gap="16" item-responsive responsive="screen" :cols="12" class="mb-4">

        <!-- Progress Card -->
        <n-grid-item span="12 m:4">
          <n-card :bordered="false" style="border-radius: 12px; height: 100%;" content-style="padding: 24px;">
            <template #header>
              <span class="text-sm font-bold" style="color: var(--db-text-primary)">实验进度</span>
            </template>

            <div class="flex items-center justify-center py-2">
              <n-progress
                type="circle"
                :percentage="75"
                :stroke-width="10"
                color="var(--db-accent)"
                rail-color="rgba(0,0,0,0.06)"
                :size="130"
              >
                <div class="text-center">
                  <div class="text-3xl font-black" style="color: var(--db-text-primary)">75%</div>
                  <div class="text-[11px]" style="color: var(--db-text-muted)">完成度</div>
                </div>
              </n-progress>
            </div>

            <n-divider style="margin: 16px 0 12px;"/>

            <n-grid :cols="3" x-gap="8">
              <n-grid-item v-for="s in summaryStats" :key="s.label">
                <div class="text-center">
                  <div class="text-xl font-bold" style="color: var(--db-text-primary)">{{ s.value }}</div>
                  <div class="text-[10px] font-medium mt-0.5" style="color: var(--db-text-muted)">{{ s.label }}</div>
                </div>
              </n-grid-item>
            </n-grid>
          </n-card>
        </n-grid-item>

        <!-- Task List Card (dark) -->
        <n-grid-item span="12 m:4">
          <div style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; height: 100%; padding: 20px;">
            <div class="flex items-center justify-between mb-5">
              <span class="text-sm font-bold text-white">实验任务</span>
              <n-tag size="small" :bordered="false" style="background: rgba(245,200,66,0.15); color: var(--db-accent); font-weight: 700; border-radius: 4px;">
                2/{{ labTasks.length }}
              </n-tag>
            </div>

            <n-list :show-divider="false" style="background: transparent;" class="-mx-1">
              <n-list-item v-for="task in labTasks" :key="task.label" style="padding: 4px;">
                <div class="flex items-center gap-3 px-3 py-2.5 rounded-lg" style="background: rgba(255,255,255,0.04);">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style="background: rgba(255,255,255,0.07);">
                    <component :is="task.icon" class="w-4 h-4" style="color: rgba(255,255,255,0.45)"/>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-white leading-tight">{{ task.label }}</p>
                    <p class="text-[11px]" style="color: rgba(255,255,255,0.32)">{{ task.time }}</p>
                  </div>
                  <div
                    class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all"
                    :style="task.done ? 'background: var(--db-accent);' : 'background: rgba(255,255,255,0.08);'"
                  >
                    <svg v-if="task.done" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="#1a1a1a" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>
              </n-list-item>
            </n-list>
          </div>
        </n-grid-item>

        <!-- Activity Timeline Card -->
        <n-grid-item span="12 m:4">
          <n-card :bordered="false" style="border-radius: 12px; height: 100%;" content-style="padding: 20px;">
            <template #header>
              <span class="text-sm font-bold" style="color: var(--db-text-primary)">近期活动</span>
            </template>

            <!-- SVG animated decoration -->
            <svg class="absolute right-0 top-0 w-full h-full opacity-[0.04] pointer-events-none" viewBox="0 0 200 200" fill="none" preserveAspectRatio="xMidYMid slice">
              <path d="M 0 100 C 50 60 100 140 200 80" stroke="currentColor" stroke-width="1.5" stroke-dasharray="300" class="db-svg-draw"/>
            </svg>

            <n-timeline>
              <n-timeline-item
                v-for="act in activities"
                :key="act.label"
                :type="act.active ? 'success' : 'default'"
                :title="act.label"
                :time="act.time"
                :line-type="act.active ? 'default' : 'dashed'"
              />
            </n-timeline>
          </n-card>
        </n-grid-item>

      </n-grid>

      <!-- Feature Cards Row -->
      <n-grid x-gap="16" y-gap="16" :cols="1" :m="3" responsive="self">
        <n-grid-item v-for="feat in features" :key="feat.title">
          <n-card
            :bordered="false"
            hoverable
            class="cursor-pointer transition-all"
            style="border-radius: 12px;"
            content-style="padding: 20px;"
          >
            <!-- SVG bg decoration -->
            <svg class="absolute right-4 top-4 w-16 h-16 opacity-[0.05] pointer-events-none" viewBox="0 0 60 60" fill="none" stroke="currentColor">
              <component :is="feat.svgDecor"/>
            </svg>

            <div class="flex items-center gap-3 mb-4">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background: rgba(0,0,0,0.05);">
                <component :is="feat.icon" class="w-5 h-5" style="color: var(--db-text-secondary)"/>
              </div>
              <div>
                <div class="text-sm font-bold" style="color: var(--db-text-primary)">{{ feat.title }}</div>
                <div class="text-[11px]" style="color: var(--db-text-muted)">{{ feat.sub }}</div>
              </div>
              <n-tag size="small" :bordered="false" class="ml-auto" style="border-radius: 4px; font-weight: 600; font-size: 11px;"
                :style="feat.done ? 'background: rgba(34,197,94,0.1); color: #16a34a;' : 'background: rgba(0,0,0,0.05); color: var(--db-text-muted);'"
              >
                {{ feat.status }}
              </n-tag>
            </div>

            <n-progress
              type="line"
              :percentage="feat.progress"
              :height="5"
              :border-radius="3"
              :show-indicator="false"
              :color="feat.accent ? 'var(--db-accent)' : 'var(--db-text-primary)'"
              rail-color="rgba(0,0,0,0.07)"
            />
            <div class="flex justify-end mt-1.5">
              <span class="text-[11px] font-bold" style="color: var(--db-text-primary)">{{ feat.progress }}%</span>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>

    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import {
  NCard, NGrid, NGridItem, NTag, NProgress,
  NList, NListItem, NDivider, NTimeline, NTimelineItem
} from 'naive-ui';

defineOptions({ name: 'Lab' });

const summaryStats = [
  { value: 4,  label: '实验' },
  { value: 2,  label: '完成' },
  { value: 12, label: '提交' },
];

// Inline SVG icon components
const mkIcon = (d: string) => ({
  render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '1.5' },
    [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })])
});
const IconChat   = mkIcon('M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z');
const IconFlask  = mkIcon('M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5');
const IconChip   = mkIcon('M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z');
const IconSearch = mkIcon('m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z');
const IconImage  = mkIcon('m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z');

const SvgWave    = { render: () => h('g', {}, [h('path',{d:'M 5 30 Q 20 10 35 30 T 55 30',stroke:'currentColor','stroke-width':'2',fill:'none'}), h('path',{d:'M 5 40 Q 20 20 35 40 T 55 40',stroke:'currentColor','stroke-width':'1',fill:'none'})]) };
const SvgCircles = { render: () => h('g', {}, [h('circle',{cx:'30',cy:'30',r:'22','stroke-width':'2',fill:'none',stroke:'currentColor'}),h('circle',{cx:'30',cy:'30',r:'12','stroke-width':'1.5',fill:'none',stroke:'currentColor'}),h('circle',{cx:'30',cy:'30',r:'3',fill:'currentColor'})]) };
const SvgGrid    = { render: () => h('g', {}, [h('line',{x1:'0',y1:'20',x2:'60',y2:'20','stroke-width':'1',stroke:'currentColor'}),h('line',{x1:'0',y1:'40',x2:'60',y2:'40','stroke-width':'1',stroke:'currentColor'}),h('line',{x1:'20',y1:'0',x2:'20',y2:'60','stroke-width':'1',stroke:'currentColor'}),h('line',{x1:'40',y1:'0',x2:'40',y2:'60','stroke-width':'1',stroke:'currentColor'}),h('rect',{x:'13',y:'13',width:'14',height:'14',fill:'currentColor',rx:'2'})]) };

const labTasks = [
  { icon: IconChat,   label: 'AI 对话集成', time: '已完成', done: true  },
  { icon: IconFlask,  label: '流式响应',     time: '已完成', done: true  },
  { icon: IconSearch, label: '向量搜索',     time: '进行中', done: false },
  { icon: IconImage,  label: '图像生成接入', time: '计划中', done: false },
];

const activities = [
  { label: '完成 AI 对话功能', time: '2 天前', active: true  },
  { label: '集成流式输出',     time: '5 天前', active: false },
  { label: '实验室页面重构',   time: '1 周前', active: false },
  { label: '初始化项目',       time: '2 周前', active: false },
];

const features = [
  { title: 'AI 对话',  sub: '多角色智能助手', progress: 100, status: '已上线', accent: false, done: true,  icon: IconChat,   svgDecor: SvgWave    },
  { title: '向量搜索', sub: '语义检索引擎',   progress: 40,  status: '开发中', accent: true,  done: false, icon: IconSearch, svgDecor: SvgCircles },
  { title: '图像生成', sub: 'AI 创作工作台',  progress: 15,  status: '规划中', accent: false, done: false, icon: IconImage,  svgDecor: SvgGrid    },
];
</script>
