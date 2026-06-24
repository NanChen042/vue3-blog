<script setup lang="ts">
import { computed } from 'vue';
import { darkTheme, GlobalThemeOverrides } from 'naive-ui';
import { useThemeStore } from './store/theme';

const themeStore = useThemeStore();

const theme = computed(() => (themeStore.isDark ? darkTheme : null));

const themeOverrides = computed<GlobalThemeOverrides>(() => {
  const primary = themeStore.primaryColor;
  return {
    common: {
      primaryColor: primary,
      primaryColorHover: '#9333ea', // Slightly lighter/different for hover
      primaryColorPressed: '#6b21a8',
      primaryColorSuppl: primary,
    },
  };
});
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides" class="h-full">
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <router-view></router-view>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style></style>
