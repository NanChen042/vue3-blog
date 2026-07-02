<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AnimatedForm from '@/components/ui/AnimatedForm.vue';
import type { Field } from '@/components/ui/AnimatedForm.vue';
import TechOrbitDisplay from '@/components/ui/TechOrbitDisplay.vue';
import Ripple from '@/components/ui/Ripple.vue';
import { LogoVue, LogoReact, LogoNodejs, LogoGithub, LogoFirebase } from '@vicons/ionicons5';
import { useAuthStore } from '@/store/auth';

defineOptions({ name: 'Login' });

const router = useRouter();
const authStore = useAuthStore();

const isLogin = ref(true);

const loginFields: Field[] = [
  { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'name@example.com' },
  { name: 'password', label: 'Password', type: 'password', required: true, placeholder: '••••••••' }
];

const registerFields: Field[] = [
  { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
  { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'name@example.com' },
  { name: 'password', label: 'Password', type: 'password', required: true, placeholder: '••••••••' }
];

const handleFormSubmit = async (_data: any) => {
  // Mock login success
  authStore.token = 'dummy-token-for-now';
  localStorage.setItem('token', authStore.token);
  router.push('/home');
};

const toggleMode = () => {
  isLogin.value = !isLogin.value;
};

const iconsArray = [
  { class: 'text-emerald-500 w-10 h-10', duration: 15, delay: 0, radius: 100, component: LogoVue },
  { class: 'text-blue-500 w-8 h-8', duration: 20, delay: 5, radius: 160, component: LogoReact, reverse: true },
  { class: 'text-green-600 w-12 h-12', duration: 25, delay: 10, radius: 220, component: LogoNodejs },
  { class: 'text-zinc-800 dark:text-white w-10 h-10', duration: 30, delay: 15, radius: 280, component: LogoGithub, reverse: true },
  { class: 'text-orange-500 w-9 h-9', duration: 22, delay: 8, radius: 340, component: LogoFirebase }
];
</script>

<template>
  <div class="flex h-screen w-full bg-white dark:bg-black font-sans">
    
    <!-- Back to home button (absolute top left) -->
    <button @click="router.push('/')" class="absolute top-8 left-8 z-20 flex items-center gap-2 text-sm font-medium transition-all group text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer">
      <svg class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      <span>Back</span>
    </button>

    <!-- Left Side: Visual Showcase -->
    <div class="hidden lg:flex w-1/2 relative flex-col justify-center items-center border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <!-- Ambient Ripple -->
      <Ripple :num-circles="8" :main-circle-size="150" />
      
      <!-- Orbiting Tech Display -->
      <div class="absolute inset-0 flex items-center justify-center">
        <TechOrbitDisplay :iconsArray="iconsArray" :text="isLogin ? 'Welcome\nBack' : 'Join\nUs'" />
      </div>
    </div>

    <!-- Right Side: Auth Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center bg-white dark:bg-black p-8 relative overflow-hidden">
      <!-- Mobile Ripple Fallback -->
      <Ripple class="lg:hidden opacity-30" :num-circles="6" :main-circle-size="100" />
      
      <AnimatedForm
        v-if="isLogin"
        key="login"
        header="Sign In"
        subHeader="Enter your email and password to access your dashboard."
        :fields="loginFields"
        submitButton="Sign In"
        textVariantButton="Don't have an account? Sign up"
        googleLogin="Continue with Google"
        @submit="handleFormSubmit"
        @goTo="toggleMode"
      />

      <AnimatedForm
        v-else
        key="register"
        header="Create an account"
        subHeader="Enter your information to get started."
        :fields="registerFields"
        submitButton="Create Account"
        textVariantButton="Already have an account? Sign in"
        googleLogin="Sign up with Google"
        @submit="handleFormSubmit"
        @goTo="toggleMode"
      />
    </div>
  </div>
</template>
