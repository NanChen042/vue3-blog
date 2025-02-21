<script setup lang="ts">
import { ref } from 'vue';
import { 
  Link, 
  Picture, 
  Platform 
} from '@element-plus/icons-vue';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  time: string;
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
}

const projects = ref<Project[]>([
  {
    name: '个人博客系统',
    description: '基于 Vue3 + TypeScript 开发的个人博客系统，支持暗黑模式、文章管理等功能。实现了响应式布局、路由权限控制、状态管理等特性。',
    technologies: ['Vue3', 'TypeScript', 'Element Plus', 'Vite'],
    time: '2024.01 - 至今',
    githubUrl: 'https://github.com/yourusername/blog',
    demoUrl: 'https://your-blog-url.com',
    image: 'https://picsum.photos/800/400'
  },
  {
    name: '瀑布流图片展示',
    description: '实现了自适应的瀑布流布局，支持图片懒加载和动画效果。优化了图片加载性能，实现了流畅的用户体验。',
    technologies: ['Vue3', 'TypeScript', 'SCSS'],
    time: '2023.12 - 2024.01',
    githubUrl: 'https://github.com/yourusername/waterfall',
    image: 'https://picsum.photos/800/401'
  },
  {
    name: '在线简历生成器',
    description: '一个在线简历制作工具，支持多种模板选择，实时预览，导出 PDF 等功能。使用 Vue3 组合式 API 开发，实现了组件的高度复用。',
    technologies: ['Vue3', 'Pinia', 'TailwindCSS'],
    time: '2023.10 - 2023.12',
    githubUrl: 'https://github.com/yourusername/resume-builder',
    demoUrl: 'https://your-resume-builder.com',
    image: 'https://picsum.photos/800/402'
  }
]);
</script>

<template>
  <div class="projects-container">
    <h2 class="section-title">项目经历</h2>
    
    <div class="projects-grid">
      <el-card 
        v-for="project in projects" 
        :key="project.name"
        class="project-card"
        :body-style="{ padding: '0' }"
      >
        <el-image 
          :src="project.image" 
          fit="cover"
          class="project-image"
        >
          <template #error>
            <div class="image-placeholder">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>

        <div class="project-content">
          <div class="project-header">
            <h3>{{ project.name }}</h3>
            <span class="project-time">{{ project.time }}</span>
          </div>
          
          <p class="project-description">{{ project.description }}</p>
          
          <div class="project-tech">
            <el-tag
              v-for="tech in project.technologies"
              :key="tech"
              size="small"
              class="tech-tag"
            >
              {{ tech }}
            </el-tag>
          </div>
          
          <div class="project-links">
            <el-button 
              v-if="project.demoUrl"
              type="primary" 
              link
              :href="project.demoUrl"
              target="_blank"
            >
              <el-icon><Link /></el-icon>
              在线演示
            </el-button>
            <el-button 
              v-if="project.githubUrl"
              type="info" 
              link
              :href="project.githubUrl"
              target="_blank"
            >
              <el-icon><Platform /></el-icon>
              GitHub
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(120deg, var(--el-color-primary), var(--el-color-success));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  transition: transform 0.3s;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    
    .project-image {
      transform: scale(1.05);
    }
  }
}

.project-image {
  width: 100%;
  height: 200px;
  transition: transform 0.3s;
}

.image-placeholder {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-fill-color-light);
  
  .el-icon {
    font-size: 3rem;
    color: var(--el-text-color-secondary);
  }
}

.project-content {
  padding: 1.5rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.2rem;
    color: var(--el-text-color-primary);
    margin: 0;
  }
  
  .project-time {
    font-size: 0.9rem;
    color: var(--el-text-color-secondary);
  }
}

.project-description {
  color: var(--el-text-color-regular);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tech {
  margin-bottom: 1rem;
  
  .tech-tag {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
}

.project-links {
  display: flex;
  gap: 1rem;
  
  .el-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style> 