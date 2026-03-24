import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme-dark') === 'true');
  const primaryColor = ref(localStorage.getItem('theme-primary') || '#7c3aed');

  const toggleDark = () => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  const setPrimaryColor = (color: string) => {
    primaryColor.value = color;
    updateTheme();
  };

  const updateTheme = () => {
    localStorage.setItem('theme-dark', isDark.value.toString());
    localStorage.setItem('theme-primary', primaryColor.value);
    
    // Apply Class
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply CSS Variables
    const el = document.documentElement;
    el.style.setProperty('--color-primary', primaryColor.value);
    
    // Set Element Plus Primary Colors
    el.style.setProperty('--el-color-primary', primaryColor.value);
    for (let i = 1; i <= 9; i++) {
      const color = mixColor(primaryColor.value, '#ffffff', i * 0.1);
      el.style.setProperty(`--el-color-primary-light-${i}`, color);
    }
    const dark2 = mixColor(primaryColor.value, '#000000', 0.2);
    el.style.setProperty('--el-color-primary-dark-2', dark2);
  };

  const mixColor = (color1: string, color2: string, weight: number) => {
    color1 = color1.replace('#', '');
    color2 = color2.replace('#', '');
    const r1 = parseInt(color1.substring(0, 2), 16);
    const g1 = parseInt(color1.substring(2, 4), 16);
    const b1 = parseInt(color1.substring(4, 6), 16);
    const r2 = parseInt(color2.substring(0, 2), 16);
    const g2 = parseInt(color2.substring(2, 4), 16);
    const b2 = parseInt(color2.substring(4, 6), 16);
    const r = Math.round(r1 * (1 - weight) + r2 * weight);
    const g = Math.round(g1 * (1 - weight) + g2 * weight);
    const b = Math.round(b1 * (1 - weight) + b2 * weight);
    const _r = r.toString(16).padStart(2, '0');
    const _g = g.toString(16).padStart(2, '0');
    const _b = b.toString(16).padStart(2, '0');
    return `#${_r}${_g}${_b}`;
  };

  // Initial Sync
  const initTheme = () => {
    updateTheme();
  };

  return {
    isDark,
    primaryColor,
    toggleDark,
    setPrimaryColor,
    initTheme,
  };
});
