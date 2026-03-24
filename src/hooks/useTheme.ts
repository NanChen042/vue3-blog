import { useThemeStore } from '../store/theme';
import { storeToRefs } from 'pinia';

export const useTheme = () => {
  const themeStore = useThemeStore();
  const { isDark, primaryColor } = storeToRefs(themeStore);

  const toggleTheme = () => {
    themeStore.toggleDark();
  };

  const setPrimary = (color: string) => {
    themeStore.setPrimaryColor(color);
  };

  return {
    isDark,
    primaryColor,
    toggleTheme,
    setPrimary,
    initTheme: themeStore.initTheme
  };
};
