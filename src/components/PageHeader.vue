<!--
 * @Description: 
 * @Autor: Southern Wind
 * @Date: 2024-05-13 15:21:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-27 09:50:41
-->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import IconSwitch from '@/components/IconSwitch.vue';
import { useToggle } from '@vueuse/shared'
import { useDark } from "@vueuse/core";
const router = useRouter()
const activeIndex = ref('1');
const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: 'useDarkKEY',
  // 暗黑class名字
  valueDark: 'dark',
  // 高亮class名字
  valueLight: 'light',
})
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  router.push({
    path: '',
    query: {}
  }
  )
}
const toggle = useToggle(isDark);
const changeSwitch = (val: any) => {
  console.log(val.value);
  toggle()
}

const switchRef = ref()
const switchModel = ref<boolean>(false)

/*  watch(()=>switchModel,(newvalue,oldvalue)=>{
   console.log(newvalue,oldvalue);

}) */



</script>

<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item index="0">
      <!--      <img
        style="width: 100px"
        src="/images/element-plus-logo.svg"
        alt="Element logo"
      /> -->
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <div class="flex items-center">
      <IconSwitch v-model="switchModel" ref="switchRef" @changeSwitch="changeSwitch"></IconSwitch>
    </div>
  </el-menu>
</template>

<style scoped lang="less">
.flex-grow {
  flex-grow: 1;
}
</style>
