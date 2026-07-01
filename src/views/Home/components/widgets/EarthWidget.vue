<template>
  <div class="h-full w-full rounded-md bg-zinc-950 border border-zinc-800/60 shadow-inner flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer" @click="toggleRotation">
    
    <!-- 3D Canvas Container -->
    <div ref="container" class="absolute inset-0 z-0"></div>

    <!-- UI Overlay -->
    <div class="relative z-10 w-full h-full p-4 flex flex-col justify-between pointer-events-none">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5 text-zinc-300">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-[10px] font-bold uppercase tracking-widest">Earth 3D</span>
        </div>
        
        <!-- Holiday Badge -->
        <transition name="fade">
          <div v-if="holidayInfo" class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider backdrop-blur-md border" :class="holidayInfo.class">
            {{ holidayInfo.name }}
          </div>
        </transition>
      </div>

      <div class="mt-auto text-right">
        <div class="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Local Solar Time</div>
        <div class="text-xl font-black text-white tracking-tighter">{{ solarTime }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef } from 'vue';
import * as THREE from 'three';

const container = ref<HTMLElement | null>(null);
const solarTime = ref('');
let isRotating = true;

const toggleRotation = () => {
  isRotating = !isRotating;
};

// Holiday Engine
const holidayInfo = ref<{name: string, class: string, lightColor: number} | null>(null);

const checkHoliday = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  if (month === 12 && day >= 20 && day <= 26) {
    holidayInfo.value = { name: 'Merry Christmas', class: 'bg-red-500/20 text-red-300 border-red-500/30', lightColor: 0xff0000 };
  } else if (month === 10 && day >= 28 && day <= 31) {
    holidayInfo.value = { name: 'Halloween', class: 'bg-orange-500/20 text-orange-300 border-orange-500/30', lightColor: 0xff8800 };
  } else if ((month === 1 && day > 20) || (month === 2 && day < 20)) {
    // Rough Spring Festival window for demo
    holidayInfo.value = { name: 'Spring Festival', class: 'bg-rose-500/20 text-rose-300 border-rose-500/30', lightColor: 0xff3333 };
  } else {
    holidayInfo.value = null;
  }
};

// Three.js setup
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let earth: THREE.Mesh;
let sunLight: THREE.DirectionalLight;
let reqId: number;

const initThree = () => {
  if (!container.value) return;
  const rect = container.value.getBoundingClientRect();

  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(45, rect.width / rect.height, 0.1, 100);
  camera.position.z = 3.5;
  // Look slightly down at the earth
  camera.position.y = 0.5;
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(rect.width, rect.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.value.appendChild(renderer.domElement);

  // Earth Geometry & Material
  const geometry = new THREE.SphereGeometry(1.2, 64, 64);
  
  const textureLoader = new THREE.TextureLoader();
  // Using high quality public CDN texture
  const earthTexture = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
  const bumpTexture = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-topology.png');
  
  const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.05,
    roughness: 0.6,
    metalness: 0.1,
  });

  earth = new THREE.Mesh(geometry, material);
  scene.add(earth);

  // Lighting - Day/Night Simulation
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.05); // Very dark ambient for night side
  scene.add(ambientLight);

  // Sun light color depends on holiday!
  const lightColor = holidayInfo.value ? holidayInfo.value.lightColor : 0xffffff;
  sunLight = new THREE.DirectionalLight(lightColor, 2.5);
  scene.add(sunLight);

  // Resize handler
  const onWindowResize = () => {
    if (!container.value) return;
    const r = container.value.getBoundingClientRect();
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
    renderer.setSize(r.width, r.height);
  };
  window.addEventListener('resize', onWindowResize);

  // Animation Loop
  const animate = () => {
    reqId = requestAnimationFrame(animate);

    // Continuous smooth rotation if enabled
    if (isRotating) {
      earth.rotation.y += 0.002;
    }

    // Calculate sun position based on real world UTC time
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const utcSeconds = now.getUTCSeconds();
    
    // Time progress (0 to 1) through the day
    const timeProgress = (utcHours * 3600 + utcMinutes * 60 + utcSeconds) / 86400;
    
    // Position light (Sun)
    // 0 progress = Sun at prime meridian (approx)
    const angle = timeProgress * Math.PI * 2 + Math.PI;
    sunLight.position.x = Math.cos(angle) * 5;
    sunLight.position.z = Math.sin(angle) * 5;
    // Slight tilt for seasons
    sunLight.position.y = Math.sin((now.getMonth() / 11) * Math.PI) * 2;

    renderer.render(scene, camera);
  };
  
  animate();
};

let timer: number;
onMounted(() => {
  checkHoliday();
  
  // Set fake solar time for UI
  const updateUiTime = () => {
    const now = new Date();
    solarTime.value = now.toLocaleTimeString('en-US', { hour12: false });
  };
  updateUiTime();
  timer = window.setInterval(updateUiTime, 1000);
  
  // Init WebGL
  setTimeout(() => {
    initThree();
  }, 100); // slight delay to ensure DOM layout is complete
});

onUnmounted(() => {
  clearInterval(timer);
  if (reqId) cancelAnimationFrame(reqId);
  if (renderer && container.value) {
    container.value.removeChild(renderer.domElement);
    renderer.dispose();
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
