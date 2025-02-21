<template>
  <div class="form-container">
    <el-container>
      <el-header class="page-header">
        <PageHeader />
        <!-- 移动端菜单按钮 -->
        <div class="menu-trigger">
          <el-button type="primary" link @click="toggleDrawer">
            <el-icon :size="24"><Menu /></el-icon>
          </el-button>
        </div>
      </el-header>

      <el-container class="main-container">
        <!-- PC端侧边栏 -->
        <el-aside width="200px" class="page-aside">
          <el-menu
            :default-active="activeMenu"
            class="nav-menu"
            @select="handleSelect"
            router
          >
            <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 移动端抽屉菜单 -->
        <el-drawer
          v-model="drawerVisible"
          direction="rtl"
          size="200px"
          :with-header="false"
          class="mobile-drawer"
        >
          <el-menu
            :default-active="activeMenu"
            class="drawer-menu"
            @select="handleMobileSelect"
            router
          >
            <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-drawer>

        <!-- 主内容区域 -->
        <el-main class="page-main">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { User, Tools, Collection, Menu } from '@element-plus/icons-vue';


const route = useRoute();
const activeMenu = ref(route.path);
const drawerVisible = ref(false);

const menuItems = [
  { path: '/form/profile', icon: 'User', title: '个人信息' },
  { path: '/form/skills', icon: 'Tools', title: '专业技能' },
  { path: '/form/projects', icon: 'Collection', title: '项目经历' }
];

const handleSelect = (key: string) => {
  activeMenu.value = key;
};

const handleMobileSelect = (key: string) => {
  activeMenu.value = key;
  drawerVisible.value = false;
};

const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value;
};
</script>

<style scoped lang="scss">
.form-container {
  min-height: 100vh;
  background-color: var(--el-bg-color);
}

.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 60px;
  padding: 0;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .menu-trigger {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: none;

    @media (max-width: 768px) {
      display: block;
    }
  }
}

.main-container {
  padding-top: 60px;
  min-height: calc(100vh - 60px);
}

.page-aside {
  position: fixed;
  top: 60px;
  bottom: 0;
  background-color: var(--el-bg-color);
  border-right: 1px solid var(--el-border-color-light);
  transition: all 0.3s;

  @media (max-width: 768px) {
    display: none;
  }

  .nav-menu {
    height: 100%;
    border-right: none;
  }
}

.page-main {
  transition: all 0.3s;
  padding: 1rem;
  background-color: var(--el-bg-color-page);
  margin-left: 200px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
}

.mobile-drawer {
  :deep(.el-drawer__body) {
    padding: 0;
  }

  .drawer-menu {
    height: 100%;
    border: none;
    background-color: var(--el-bg-color);
  }
}

:deep(.el-menu-item) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
