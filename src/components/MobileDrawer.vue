<template>
  <div class="mobile-drawer">
    <!-- 抽屉遮罩层 -->
    <div
      v-if="modelValue"
      class="drawer-mask"
      @click="$emit('update:modelValue', false)"
    ></div>

    <!-- 抽屉内容 -->
    <div
      class="drawer-content"
      :class="{ 'drawer-open': modelValue }"
    >
      <div class="drawer-header">
        <span>菜单</span>
        <button class="close-btn" @click="$emit('update:modelValue', false)">×</button>
      </div>
      <div class="drawer-body">
        <div class="menu-item">
          <span>暗黑模式</span>
          <IconSwitch v-model="switchModel" @changeSwitch="changeSwitch"></IconSwitch>
        </div>
        <!-- 可以添加其他菜单项 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconSwitch from './IconSwitch.vue';

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

defineEmits(['update:modelValue']);

const switchModel = ref(false);

const changeSwitch = (val: boolean) => {
  // 处理主题切换逻辑
  switchModel.value = val;
};
</script>

<script lang="ts">
export default {
  name: 'MobileDrawer'
}
</script>

<style scoped lang="less">
.mobile-drawer {
  .drawer-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }

  .drawer-content {
    position: fixed;
    top: 0;
    right: -80%;
    width: 80%;
    height: 100%;
    background: #fff;
    z-index: 999;
    transition: right 0.3s ease;

    &.drawer-open {
      right: 0;
    }
  }

  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;

    .close-btn {
      border: none;
      background: none;
      font-size: 24px;
      cursor: pointer;
    }
  }

  .drawer-body {
    padding: 16px;

    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }
  }
}

// 暗黑模式样式
:root[class='dark'] {
  .drawer-content {
    background: #1a1a1a;
    color: #fff;
  }

  .menu-item {
    border-bottom-color: #333;
  }
}
</style>
