import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');
  const userInfoStr = localStorage.getItem('userInfo');
  const userInfo = ref<Record<string, any> | null>(userInfoStr ? JSON.parse(userInfoStr) : null);

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  };

  const setUserInfo = (info: Record<string, any>) => {
    userInfo.value = info;
    localStorage.setItem('userInfo', JSON.stringify(info));
  };

  const logout = () => {
    token.value = '';
    userInfo.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  };

  const isLoggedIn = computed(() => !!token.value);

  return { token, userInfo, setToken, setUserInfo, logout, isLoggedIn };
});
