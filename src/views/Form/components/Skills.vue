<script setup lang="ts">
import { ref } from 'vue';

interface Skill {
  name: string;
  level: number;
  color: string;
  icon: string;
}

const skills = ref<Skill[]>([
  { 
    name: 'Vue.js', 
    level: 90, 
    color: '#42b883',
    icon: '🚀'
  },
  { 
    name: 'TypeScript', 
    level: 85, 
    color: '#3178c6',
    icon: '💪'
  },
  { 
    name: 'React', 
    level: 80, 
    color: '#61dafb',
    icon: '⚛️'
  },
  { 
    name: 'Node.js', 
    level: 75, 
    color: '#339933',
    icon: '🛠️'
  },
  { 
    name: 'CSS/SCSS', 
    level: 85, 
    color: '#cc6699',
    icon: '🎨'
  }
]);
</script>

<template>
  <div class="skills-container">
    <h2 class="section-title">专业技能</h2>
    
    <div class="skills-grid">
      <el-card 
        v-for="skill in skills" 
        :key="skill.name"
        class="skill-card"
        :style="{ '--skill-color': skill.color }"
      >
        <div class="skill-header">
          <span class="skill-icon">{{ skill.icon }}</span>
          <h3>{{ skill.name }}</h3>
        </div>
        
        <el-progress 
          :percentage="skill.level"
          :color="skill.color"
          :stroke-width="20"
          class="skill-progress"
        />
        
        <div class="skill-level">
          熟练度: {{ skill.level }}%
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.skills-container {
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.skill-card {
  --skill-color: #42b883;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  .skill-icon {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.2rem;
    color: var(--skill-color);
  }
}

.skill-progress {
  margin: 1rem 0;
}

.skill-level {
  text-align: right;
  color: var(--el-text-color-secondary);
  font-size: 0.9rem;
}
</style> 