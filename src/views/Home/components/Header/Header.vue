<template>
  <header class="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-4">
        <!-- Left: Logo -->
        <div class="shrink-0">
          <Logo />
        </div>

        <!-- Center: Navigation Menu -->
        <div class="hidden lg:flex grow justify-center overflow-hidden">
          <NavMenu />
        </div>

        <!-- Right: Search and Actions -->
        <div class="flex items-center gap-4 shrink-0">
          <div class="hidden md:block">
            <SearchBar />
          </div>
          <ActionButtons />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Logo from "./Logo.vue";
import NavMenu from "./NavMenu.vue";
import SearchBar from "./SearchBar.vue";
import ActionButtons from "./ActionButtons.vue";

defineOptions({ name: 'HomeHeader' });
</script>

<style scoped>
/* Header specific styles */
</style>
