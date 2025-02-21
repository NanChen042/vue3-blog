<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  RadarChart,
  PieChart,
  BarChart,
  GraphChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { useDark } from '@vueuse/core';

// 注册必须的组件
use([
  CanvasRenderer,
  RadarChart,
  PieChart,
  BarChart,
  GraphChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

// 添加 window 的类型声明
declare const window: Window & typeof globalThis;

// 添加 ECharts 选项类型
type EChartsOption = echarts.EChartsOption;

const personalInfo:any = ref({
  name: 'Southern Wind',
  title: 'Web前端开发工程师',
  email: 'nanchen1221@163.com',
  phone: '18256097829',
  age: '25岁',
  gender: '男',
  location: '安徽',
  education: '计算机应用与技术',
  degree: '专科',
  about: '热爱前端开发，对新技术充满热情。擅长Vue全家桶和TypeScript开发，注重代码质量和用户体验。具有良好的代码规范意识和团队协作能力，积极关注前端技术发展动态。',
  experience: '4年前端开发经验',
  workHistory: [
    {
      company: '上海xxxx科技有限公司',
      position: '前端开发工程师',
      period: '2022.04 -- 至今',
      achievements: [
        '独立负责WEB端、小程序、H5、APP进行开发',
        '主要使用 Vue3 中的 UView-Plus、ELement-Plus、uni-app x、Vant4框架开发项目',
        '利用 PS、即使设计、蓝湖或慕客等专业设计工具进行精确切图，以满足不同项目需求',
        '使用Vite高效搭建项目架构，选择Vue3、Tailwindcss、TypeScript、Pinia 模式开发页面',
        '制作节假日的 h5 小游戏、web端特效以及 开发三维模型常规的渲染以及动画交互效果',
        '根据用户反馈优化网站，如首屏加载、资源压缩、大数据虚拟列表等，来提升用户使用体验',
        '设计并维护低代码平台以及网站，维护医院内部考核的表单项目'
      ]
    },
    {
      company: '安徽xxxx科技有限公司',
      position: '前端开发工程师',
      period: '2021.02 -- 2022.03',
      achievements: [
        '使用 vue-cli 搭建前端框架，开发公司安排的项目',
        '使用 Vue.js 中的 UniApp、Vant 和 Element-UI 等框架实现页面交互效果',
        '配合项目经理做好日常工作，保质保量完成分配工作',
        '根据 UI 设计图纸，高度还原设计稿',
        '设计并实现高度可复用基础组件和业务组件',
        '使用 webpack 对项目进行打包压缩'
      ]
    }
  ],
  socialLinks: [
    {
      icon: 'Promotion',
      url: 'https://blog.csdn.net/nanchen_J?type=blog',
      name: 'CSDN博客'
    },
    {
      icon: 'Edit',
      url: 'https://juejin.cn/user/1588130256005415/posts',
      name: '掘金主页'
    },
    {
      icon: 'Link',
      url: 'https://nanchen042.github.io/docs/',
      name: '个人博客'
    }
  ]
});

// 修改技能关系图配置为旭日图配置
const colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
const bgColor = 'transparent'; // 改为透明背景

const skillsData = [
  {
    name: '前端开发',
    itemStyle: {
      color: colors[0]
    },
    children: [
      {
        name: 'Vue生态',
        children: [
          {
            name: '精通',
            children: [
              { name: 'Vue3', value: 5 },
              { name: 'Vuex/Pinia', value: 5 },
              { name: 'Vue Router', value: 5 }
            ]
          },
          {
            name: '熟练',
            children: [
              { name: 'TypeScript', value: 4 },
              { name: 'Element Plus', value: 4 },
              { name: 'Vite', value: 4 }
            ]
          }
        ]
      },
      {
        name: '基础技术',
        children: [
          {
            name: '精通',
            children: [
              { name: 'HTML5', value: 5 },
              { name: 'CSS3', value: 5 },
              { name: 'JavaScript', value: 5 }
            ]
          },
          {
            name: '熟练',
            children: [
              { name: 'Webpack', value: 4 },
              { name: 'Git', value: 4 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: '跨平台开发',
    itemStyle: {
      color: colors[1]
    },
    children: [
      {
        name: '移动端',
        children: [
          {
            name: '精通',
            children: [
              { name: 'UniApp', value: 5 },
              { name: 'Vant', value: 5 }
            ]
          },
          {
            name: '熟练',
            children: [
              { name: '小程序', value: 4 },
              { name: 'uView', value: 4 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: '可视化',
    itemStyle: {
      color: colors[2]
    },
    children: [
      {
        name: '图表',
        children: [
          {
            name: '熟练',
            children: [
              { name: 'Echarts', value: 4 },
              { name: 'Three.js', value: 4 }
            ]
          },
          {
            name: '掌握',
            children: [
              { name: 'Canvas', value: 3 },
              { name: 'WebGL', value: 3 }
            ]
          }
        ]
      }
    ]
  }
];

// 处理数据，添加样式
const processData = (data: any) => {
  const itemStyle:any = {
    精通: { color: colors[0] },
    熟练: { color: colors[1] },
    掌握: { color: colors[2] }
  };

  for (let j = 0; j < data.length; ++j) {
    let level1 = data[j].children;
    for (let i = 0; i < level1.length; ++i) {
      let block = level1[i].children;
      for (let star = 0; star < block.length; ++star) {
        const style = itemStyle[block[star].name] || { color: colors[3] };
        block[star].label = {
          color: style.color,
          downplay: {
            opacity: 0.5
          }
        };

        if (block[star].children) {
          const bookStyle = {
            opacity: 1,
            color: style.color
          };
          block[star].children.forEach(function (skill: any) {
            skill.itemStyle = bookStyle;
            skill.label = {
              color: style.color
            };
          });
        }
      }
      level1[i].itemStyle = {
        color: data[j].itemStyle.color
      };
    }
  }
  return data;
};

// 改回原来的关系图配置
const graphOption = ref<EChartsOption>({
  backgroundColor: 'transparent',
  title: {
    text: '技术栈关系图',
    textStyle: {
      color: 'var(--el-text-color-primary)'
    }
  },
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [{
    type: 'graph',
    layout: 'force',
    force: {
      repulsion: 100,
      edgeLength: 100
    },
    roam: true,
    label: {
      show: true
    },
    data: [
      { name: 'Vue.js', value: 90, category: 0, symbolSize: 70 },
      { name: 'TypeScript', value: 85, category: 1, symbolSize: 65 },
      { name: 'Three.js', value: 80, category: 2, symbolSize: 60 },
      { name: 'Element Plus', value: 85, category: 3, symbolSize: 65 },
      { name: 'Vite', value: 80, category: 4, symbolSize: 60 },
      { name: 'UniApp', value: 75, category: 5, symbolSize: 55 },
      { name: 'HTML5/CSS3', value: 90, category: 6, symbolSize: 70 },
      { name: 'Echarts', value: 85, category: 7, symbolSize: 65 }
    ],
    links: [
      { source: 'Vue.js', target: 'TypeScript' },
      { source: 'Vue.js', target: 'Element Plus' },
      { source: 'Vue.js', target: 'Vite' },
      { source: 'TypeScript', target: 'Three.js' },
      { source: 'HTML5/CSS3', target: 'Vue.js' },
      { source: 'Vue.js', target: 'UniApp' },
      { source: 'Vue.js', target: 'Echarts' }
    ],
    categories: [
      { name: '前端框架' },
      { name: '编程语言' },
      { name: '3D可视化' },
      { name: 'UI框架' },
      { name: '构建工具' },
      { name: '跨平台开发' },
      { name: '基础技术' },
      { name: '数据可视化' }
    ],
    lineStyle: {
      color: 'source',
      curveness: 0.3
    }
  }]
});

// 修改 radarOption 的配置
const radarOption = ref<EChartsOption>({
  backgroundColor: 'transparent',
  title: {
    text: '技能体系',
    textStyle: {
      color: 'var(--el-text-color-primary)'
    }
  },
  series: [{
    type: 'sunburst',
    center: ['50%', '48%'],
    data: processData(skillsData),
    label: {
      rotate: 'radial',
      color: 'var(--el-text-color-primary)'
    },
    itemStyle: {
      borderColor: bgColor,
      borderWidth: 1
    },
    levels: [
      {},
      {
        r0: 0,
        r: 40,
        label: {
          rotate: 0
        }
      },
      {
        r0: 40,
        r: 100
      },
      {
        r0: 100,
        r: 140,
        itemStyle: {
          color: 'transparent'
        },
        label: {
          rotate: 'tangential',
          fontSize: 10,
          color: colors[0]
        }
      },
      {
        r0: 140,
        r: 145,
        label: {
          position: 'outside',
          color: 'var(--el-text-color-primary)',
          opacity: 0.5
        }
      }
    ]
  }]
});

// 项目经验分布
const barOption = ref<EChartsOption>({
  backgroundColor: 'transparent',
  title: {
    text: '技术应用分布',
    textStyle: {
      color: 'var(--el-text-color-primary)'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
    axisLabel: {
      color: 'var(--el-text-color-regular)'
    }
  },
  yAxis: {
    type: 'category',
    data: ['Vue项目', 'UniApp项目', 'Three.js项目', '可视化项目'],
    axisLabel: {
      color: 'var(--el-text-color-regular)'
    }
  },
  series: [
    {
      name: '项目数量',
      type: 'bar',
      data: [8, 4, 3, 5],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      }
    }
  ]
});

// 修改 activeTab 的默认值为空字符串
const activeTab = ref('');  // 或者保持 'skills' 但确保 el-tabs 的配置正确

// 修改自定义颜色配置
const customColors = [
  [
    { offset: 0, color: '#67C23A' },
    { offset: 1, color: '#409EFF' }
  ],
  [
    { offset: 0, color: '#409EFF' },
    { offset: 1, color: '#E6A23C' }
  ],
  [
    { offset: 0, color: '#E6A23C' },
    { offset: 1, color: '#F56C6C' }
  ]
];

// 获取技能等级对应的颜色
const getSkillColor = (level: number) => {
  if (level >= 90) return `linear-gradient(90deg, ${customColors[0][0].color}, ${customColors[0][1].color})`;
  if (level >= 80) return `linear-gradient(90deg, ${customColors[1][0].color}, ${customColors[1][1].color})`;
  return `linear-gradient(90deg, ${customColors[2][0].color}, ${customColors[2][1].color})`;
};

// 修改 skills 数据，添加颜色属性
const skills = ref([
  {
    name: '前端开发',
    icon: 'Monitor',
    items: [
      { name: 'Vue.js/Vue3', level: 90, color: getSkillColor(90) },
      { name: 'TypeScript', level: 85, color: getSkillColor(85) },
      { name: 'HTML5/CSS3', level: 90, color: getSkillColor(90) },
      { name: 'Three.js', level: 80, color: getSkillColor(80) }
    ]
  },
  {
    name: 'UI框架',
    icon: 'Connection',
    items: [
      { name: 'Element Plus', level: 90, color: getSkillColor(90) },
      { name: 'Vant', level: 85, color: getSkillColor(85) },
      { name: 'uView', level: 85, color: getSkillColor(85) },
      { name: 'Layui', level: 80, color: getSkillColor(80) }
    ]
  },
  {
    name: '工程化工具',
    icon: 'Setting',
    items: [
      { name: 'Vite', level: 85, color: getSkillColor(85) },
      { name: 'Webpack', level: 80, color: getSkillColor(80) },
      { name: 'npm/yarn/pnpm', level: 85, color: getSkillColor(85) },
      { name: 'Git', level: 85, color: getSkillColor(85) }
    ]
  },
  {
    name: '跨平台开发',
    icon: 'Platform',
    items: [
      { name: 'UniApp', level: 85, color: getSkillColor(85) },
      { name: 'ArkTS', level: 75, color: getSkillColor(75) },
      { name: '小程序开发', level: 85, color: getSkillColor(85) }
    ]
  },
  {
    name: '可视化',
    icon: 'PieChart',
    items: [
      { name: 'Echarts', level: 85, color: getSkillColor(85) },
      { name: '大数据可视化', level: 80, color: getSkillColor(80) },
      { name: 'Canvas', level: 75, color: getSkillColor(75) }
    ]
  }
]);

// 添加联系信息配置
const contactItems = [
  { icon: 'User', label: '年龄', key: 'age' },
  { icon: 'Location', label: '所在地', key: 'location' },
  { icon: 'School', label: '学历', key: 'degree' },
  { icon: 'Message', label: '邮箱', key: 'email' },
  { icon: 'Phone', label: '电话', key: 'phone' },
  { icon: 'Education', label: '专业', key: 'education' }
];

// 可以添加一个打开链接的方法来处理点击事件
const openLink = (url: string) => {
  window.open(url, '_blank');
};

// 添加暗色模式配置
const isDark = useDark({
  storageKey: "useDarkKEY",
  valueDark: "dark",
  valueLight: "light",
});

// 添加 handleClick 方法
const handleClick = (tab: any) => {
  activeTab.value = tab.props.name;
};

// 添加图表实例引用
const chartRef = ref();
const radarChartRef = ref();
const barChartRef = ref();

// 添加初始化函数
onMounted(async () => {
  await nextTick();
  // 确保 DOM 已经渲染完成后再初始化图表
  if (chartRef.value) {
    chartRef.value.initChart();
  }
  if (radarChartRef.value) {
    radarChartRef.value.initChart();
  }
  if (barChartRef.value) {
    barChartRef.value.initChart();
  }
});
</script>

<template>
  <div class="w-full p-2 md:p-4">
    <!-- 个人信息头部 -->
    <el-row :gutter="20" class="mb-4">
      <!-- 左侧个人卡片 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="6" class="mb-4 " >
        <el-card class="text-center " shadow="hover">
          <div class="relative inline-block mb-4">
            <el-avatar
              :size="80"
              class="border-2 border-primary-100 !bg-transparent !p-3 transition-transform hover:scale-105"
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 68.000000 61.000000"
                preserveAspectRatio="xMidYMid meet"
                :style="{ fill: isDark ? '#ffffff' : '#000000' }"
              >
                <g transform="translate(0.000000,61.000000) scale(0.100000,-0.100000)" stroke="none">
                  <path d="M364 596 c-31 -14 -74 -60 -74 -79 0 -6 9 -2 19 7 16 15 25 16 57 7 21 -6 40 -8 42 -6 5 5 -43 25 -59 25 -20 0 -8 18 20 30 44 18 83 9 100 -22 13 -23 13 -37 3 -97 -17 -102 -16 -186 4 -206 22 -21 41 -5 50 43 8 41 -21 223 -42 263 -7 15 -28 32 -45 38 -39 13 -37 13 -75 -3z" />
                  <path d="M108 497 c-35 -29 -48 -58 -48 -104 0 -79 48 -111 171 -114 46 -1 89 -4 96 -6 14 -5 10 -61 -7 -102 -14 -34 -33 -38 -104 -22 -69 17 -210 25 -202 12 4 -6 28 -11 53 -11 124 0 345 -46 502 -105 52 -19 96 -34 98 -32 4 5 -129 61 -183 77 -39 12 -43 16 -59 71 -15 48 -16 61 -5 74 8 10 9 15 1 15 -17 0 -13 28 7 40 16 10 15 10 -3 8 -11 -2 -26 -16 -33 -31 -16 -33 -30 -34 -41 -3 -9 22 -15 24 -117 28 -101 5 -109 6 -131 32 -43 50 -43 102 1 153 21 24 32 28 78 28 29 0 64 -4 78 -8 24 -8 24 -7 6 7 -31 25 -125 21 -158 -7z m295 -316 c24 -69 24 -70 -30 -60 -25 5 -48 11 -50 13 -2 1 3 16 12 32 8 16 15 37 15 47 0 10 8 17 18 17 12 0 23 -15 35 -49z" />
                  <path d="M320 449 c0 -5 5 -7 10 -4 6 3 10 8 10 11 0 2 -4 4 -10 4 -5 0 -10 -5 -10 -11z" />
                  <path d="M370 450 c0 -7 3 -10 7 -7 3 4 3 10 0 14 -4 3 -7 0 -7 -7z" />
                  <path d="M115 420 c-11 -17 5 -30 36 -30 22 0 29 5 29 20 0 15 -7 20 -29 20 -17 0 -33 -4 -36 -10z" />
                </g>
              </svg>
            </el-avatar>
            <el-tag type="success" class="absolute -bottom-2 -right-2" size="small">在线</el-tag>
          </div>
          <h2 class="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            {{ personalInfo.name }}
          </h2>
          <div class="flex flex-wrap justify-center gap-2 p-2">
            <el-tag effect="plain">{{ personalInfo.title }}</el-tag>
            <el-tag type="warning" effect="plain">{{ personalInfo.experience }}</el-tag>
          </div>
        </el-card>
      </el-col>

      <!-- 右侧信息卡片 -->
      <el-col :xs="24" :sm="24" :md="16" :lg="18">
        <el-card shadow="hover">
          <template #header>
            <div class="flex flex-wrap justify-between items-center gap-2">
              <span class="text-lg font-medium">个人简介</span>
              <el-tag type="info" effect="plain">{{ personalInfo.education }}</el-tag>
            </div>
          </template>

          <p class="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ personalInfo.about }}
          </p>

          <el-divider>基本信息</el-divider>

          <!-- 基本信息网格 -->
          <el-row :gutter="20">
            <el-col
              v-for="(item, index) in contactItems"
              :key="index"
              :xs="24"
              :sm="12"
              :md="8"
              class="mb-4 "
            >
              <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <el-icon class="text-primary text-xl"><component :is="item.icon" /></el-icon>
                <div>
                  <div class="text-xs text-gray-500">{{ item.label }}</div>
                  <div class="text-sm font-medium">{{ personalInfo[item.key] }}</div>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-divider>社交链接</el-divider>

          <!-- 社交链接按钮组 -->
          <div class="flex flex-wrap gap-2">
            <el-button
              v-for="link in personalInfo.socialLinks"
              :key="link.url"
              :icon="link.icon"
              type="primary"
              link
              class="!flex !items-center"
              @click="openLink(link.url)"
            >
              {{ link.name }}
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 主要内容区域 -->
    <el-card class="w-full">
      <el-tabs v-model="activeTab" class="w-full" @tab-click="handleClick">
        <!-- 技能概览 -->
        <el-tab-pane label="技能概览" name="skills">
          <!-- 图表部分 -->
          <div class="space-y-4">
            <div class="w-full h-[300px] md:h-[400px]">
              <v-chart 
                ref="chartRef"
                class="w-full h-full" 
                :option="graphOption" 
                :manual-update="true"
                autoresize 
              />
            </div>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="12" class="mb-4">
                <div class="w-full h-[300px]">
                  <v-chart 
                    ref="radarChartRef"
                    class="w-full h-full" 
                    :option="radarOption" 
                    :manual-update="true"
                    autoresize 
                  />
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12">
                <div class="w-full h-[300px]">
                  <v-chart 
                    ref="barChartRef"
                    class="w-full h-full" 
                    :option="barOption" 
                    :manual-update="true"
                    autoresize 
                  />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>

        <!-- 技能详情 -->
        <el-tab-pane label="技能详情" name="skill-details">
          <el-collapse accordion>
            <el-collapse-item v-for="category in skills" :key="category.name">
              <template #title>
                <div class="flex items-center gap-2">
                  <el-icon><component :is="category.icon" /></el-icon>
                  <span>{{ category.name }}</span>
                </div>
              </template>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 md:p-4">
                <div v-for="skill in category.items" :key="skill.name" class="w-full">
                  <div class="flex justify-between mb-2">
                    <span class="text-sm">{{ skill.name }}</span>
                    <span class="text-sm font-bold">{{ skill.level }}%</span>
                  </div>
                  <el-progress
                    :percentage="skill.level"
                    :color="skill.color"
                    :stroke-width="12"
                    :show-text="false"
                  />
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>

        <!-- 工作经历 -->
        <el-tab-pane label="工作经历" name="work">
          <el-timeline>
            <el-timeline-item
              v-for="(job, index) in personalInfo.workHistory"
              :key="index"
              :timestamp="job.period"
              placement="top"
              :type="index === 0 ? 'primary' : 'info'"
            >
              <el-card class="w-full">
                <template #header>
                  <div class="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <h3 class="text-base md:text-lg font-bold m-0">{{ job.company }}</h3>
                    <el-tag :type="index === 0 ? 'primary' : 'info'">{{ job.position }}</el-tag>
                  </div>
                </template>
                <ul class="list-disc pl-4 space-y-2 text-sm md:text-base">
                  <li
                    v-for="(achievement, i) in job.achievements"
                    :key="i"
                    class="text-gray-600 dark:text-gray-400"
                  >
                    {{ achievement }}
                  </li>
                </ul>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped lang="less">
/* 只保留必要的自定义样式 */
:deep(.el-progress-bar__inner) {
  background-image: linear-gradient(
    90deg,
    var(--el-color-primary) 0%,
    var(--el-color-success) 100%
  );
}
:deep(.el-avatar) {
  background-color: transparent !important;

  &:hover {
    transform: scale(1.05);
  }
}

/* 确保图表容器响应式 */
:deep(.echarts) {
  width: 100% !important;
  height: 100% !important;
}
</style>
