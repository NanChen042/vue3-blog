<template>
  <div class="max-w-[1440px] mx-auto px-4 sm:px-6 pt-8 pb-24" style="color: var(--db-text-primary)">
    <div class="mb-8">
      <h1 class="text-4xl font-extrabold tracking-tight mb-2" style="color: var(--db-text-primary)">{{ $t('nav.categories') }}</h1>
      <p class="text-sm" style="color: var(--db-text-muted)">按分类浏览所有文章</p>
    </div>
    <div class="db-card p-8 text-center">
      <div class="text-5xl mb-4">🏷️</div>
      <h2 class="text-xl font-bold mb-2" style="color: var(--db-text-primary)">文章分类</h2>
      <p class="text-sm" style="color: var(--db-text-muted)">Categories page content coming soon.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Categories' });
</script>
