<script setup lang="ts">
import { computed } from 'vue';
import { darkTheme, GlobalThemeOverrides } from 'naive-ui';
import { useThemeStore } from './store/theme';

const themeStore = useThemeStore();

const theme = computed(() => (themeStore.isDark ? darkTheme : null));

const themeOverrides = computed<GlobalThemeOverrides>(() => {
  return {
    common: {
      primaryColor: '#8b5cf6',
      primaryColorHover: '#a78bfa',
      primaryColorPressed: '#7c3aed',
      primaryColorSuppl: '#8b5cf6',
      borderRadius: '0px',
      borderRadiusSmall: '0px',
    },
    Button: {
      borderRadiusMedium: '0px',
      borderRadiusLarge: '0px',
      borderRadiusSmall: '0px',
    },
    Input: {
      borderRadius: '0px',
    },
    Tag: {
      borderRadius: '0px',
    },
    Card: {
      borderRadius: '0px',
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
