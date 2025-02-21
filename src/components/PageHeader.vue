<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import IconSwitch from "@/components/IconSwitch.vue";
import { useToggle } from "@vueuse/shared";
import { useDark } from "@vueuse/core";

const route = useRoute();
const activeIndex = ref("1");
const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: "useDarkKEY",
  // 暗黑class名字
  valueDark: "dark",
  // 高亮class名字
  valueLight: "light",
});

// 监听暗黑模式变化
const toggle = useToggle(isDark);
const changeSwitch = (val: any) => {
  console.log(val.value);
  toggle();
  // 同步 switchModel 的值
  switchModel.value = isDark.value;
};

const switchRef = ref();
// 初始化时同步 isDark 的值
const switchModel = ref(isDark.value);

// 判断是否在首页
const isIndexPage = computed(() => {
  return route.path === '/' || route.path === '/index';
});

/*  watch(()=>switchModel,(newvalue,oldvalue)=>{
   console.log(newvalue,oldvalue);

}) */
</script>

<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo flex justify-between w-full" mode="horizontal" :ellipsis="false">
    <el-menu-item index="0">
      <el-avatar
        :size="32"
        class="border-2 border-primary-100 !bg-transparent p-1 transition-transform hover:scale-105"
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
    </el-menu-item>

    <div class="flex items-center mr-auto">
      <IconSwitch v-if="!isIndexPage" v-model="switchModel" ref="switchRef" @changeSwitch="changeSwitch"></IconSwitch>
    </div>
  </el-menu>
</template>

<style scoped lang="less">
.flex-grow {
  flex-grow: 1;
}

:deep(.el-avatar) {
  background-color: transparent !important;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
