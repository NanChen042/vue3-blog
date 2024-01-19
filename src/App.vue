<!--
 * @Description: 
 * @Autor: Southern Wind
 * @Date: 2024-01-19 10:02:23
 * @LastEditors: Southern Wind
 * @LastEditTime: 2024-01-19 12:17:25
-->
<script setup lang="ts">
// <!--引入粒子特效的相关配置-->
import { ref } from "vue";

// import vuetyped from "vue3typed/libs/typed";
const options = {
  background: {
    color: {},
    position: "	50% 50%",
    repeat: "	no-repeat",
    size: "cover",
    opacity: 1,
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push", //可用的click模式有: "push", "remove", "repulse", "bubble"。
      },
      onHover: {
        enable: true,
        mode: "grab", //可用的hover模式有: "grab", "repulse", "bubble"。
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#fff", //'#dedede'。线条颜色。
      distance: 150, //线条长度
      enable: true, //是否有线条
      opacity: 0.5, //线条透明度。
      width: 2, //线条宽度。
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 4, //粒子运动速度。
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 40, //粒子数量。
    },
    opacity: {
      value: 0.5, //粒子透明度。
    },
    shape: {
      type: "star", //可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};

const particlesLoaded = async (container: any) => {
  console.log("Particles container loaded", container);
};
const status = ref(false);
const doSmth = () => {
  console.log(1);

  status.value = true;
};
</script>

<template>
  <!-- <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" url="http://foo.bar/particles.json" /> -->
  <div class="box">

    <vuetyped :strings="['我的沉思：', '......','穿越思想和经历的旅程', 'Welcome to visit Southern Wind Blog！']" :fadeOutDelay="1500" :loop="false" :startDelay="300" :typeSpeed="150" :backSpeed="50" :fadeOut="true" :backDelay="3000" :showCursor="true" :smart-backspace="true" @onComplete="doSmth()">
      <div v-if="status">
      </div>
      <div class="typing">

      </div>
      <!-- <div class="typing" /> -->
    </vuetyped>
    <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" :options="options" />
  </div>

</template>

<style scoped>
@media (max-width:750px) {
  .typed-element{
    /* font-size: .3rem !important; */
  }
}
.typed-element {
  height: 100vh;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  text-align: center;
  font-size: .28rem;
 
}
.typed-element .typing {
  letter-spacing: .04rem;
  font-family: MyCustomFont;
  font-weight: 700;
  font-size: .68rem;
}
.typed-element .typed-cursor {
  font-weight: 100 !important;
}
.h2 {
  width: 100%;
  font-size: 0.6rem;
}
.overall-header-left {
  align-self: center;
  justify-self: center;
  font-size: .3rem; /* 要给容器设置font-size */
}

.box {
  background-image: url(./assets/01.jpg);
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
