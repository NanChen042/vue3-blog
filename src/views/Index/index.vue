<!-- author: Mr.J -->
<!-- date: 2024-01-31 10:34:16 -->
<!-- description: Vue3+JS代码块模板 -->
<template>
  <!-- <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" url="http://foo.bar/particles.json" /> -->
  <div class="box">
    <!-- <div v-if="status"> -->
    <ButtonStyle></ButtonStyle>
    <!-- </div> -->
    <vuetyped :strings="['开篇......','无聊是非常有必要的，一个人在空白时间做的事，决定了这个人和其他人的根本不同。']" :fadeOutClass="'fadeOutClass'" :fadeOutDelay="10" :loop="false" :startDelay="10" :typeSpeed="100" :backSpeed="10" :fadeOut="true" :autoInsertCss="true" :backDelay="1500" :showCursor="false" :smart-backspace="true" @onComplete="doSmth()">

      <div class="typing">

      </div>
      <!-- <div class="typing" /> -->
    </vuetyped>
    <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" :options="options" />

    <div class="btn">
      <div class="item button-parrot" style="--bg-color: #2c3e50">
        <button @click="FormRouter">来不及了!
          <div class="parrot"></div>
          <div class="parrot"></div>
          <div class="parrot"></div>
          <div class="parrot"></div>
          <div class="parrot"></div>
          <div class="parrot"></div>
        </button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
// <!--引入粒子特效的相关配置-->
import { ref } from "vue";
import ButtonStyle from "../../components/ButtonStyle.vue";
// import vuetyped from "vue3typed/libs/typed";
import {useRouter} from 'vue-router';
const router = useRouter();
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
  status.value = true;
};

// 渐变色
let colors = [
  "#f00",
  "#000",
  "yellow",
  "blue",
  "black",
  "gold",
  "orange",
  "gray",
  "pink",
  "maroon",
  "green",
  "rgb(42, 75, 165)",
  "#009393",
  "#bbffbb",
  "#ceceff",
  "purple",
];
const color = ref("");
let f1 = () => {
  let math = Math.floor(Math.random() * colors.length);
  // 获取随机数
  //   div.style.backgroundColor = color[math]; //随机的背景颜色
  color.value = colors[math]; //设置随机颜色
};
setInterval(f1, 1000);
f1();

const FormRouter =()=>{
  router.push('/form')
}
</script>

<style scoped lang="less">
@media (max-width: 768px) {
  button{
    padding: 20px !important;
  }
  .typed-element {
    /* font-size: .3rem !important; */
    letter-spacing: 0.04rem;
    font-family: "宋体";
    background: var(--vp-home-hero-name-background);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: var(--vp-home-hero-name-color);
    animation: hueRotate 3s infinite alternate;

    font-weight: bold;
    font-size: 38px;
    @keyframes hueRotate {
      100% {
        filter: hue-rotate(360deg);
      }
    }
    .typing {
      letter-spacing: 0.04rem;
      font-family: "微软雅黑"  ;
      font-weight: 700;
      font-size: 18px !important;
    }
  }
}
/* This is an example, feel free to delete this code */
.tooltip-container {
  --background: #333333;
  --color: #e8e8e8;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  font-size: 18px;
  font-weight: 600;
  color: var(--color);
  padding: 0.7em 1.8em;
  border-radius: 8px;
  text-transform: uppercase;
  height: 60px;
  width: 180px;
  display: grid;
  place-items: center;
  border: 2px solid var(--color);
}

.text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  transform-origin: -100%;
  transform: scale(1);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.tooltip-container span:last-child {
  position: absolute;
  top: 0%;
  left: 100%;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  opacity: 1;
  background-color: var(--background);
  z-index: -1;
  border: 2px solid var(--background);
  transform: scale(0);
  transform-origin: 0;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  display: grid;
  place-items: center;
}

.tooltip {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.3em 0.6em;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  background: var(--background);
  z-index: -1;
  border-radius: 8px;
  scale: 0;
  transform-origin: 0 0;
  text-transform: capitalize;
  font-weight: 400;
  font-size: 16px;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
}

.tooltip::before {
  position: absolute;
  content: "";
  height: 0.6em;
  width: 0.6em;
  bottom: -0.2em;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  background: var(--background);
}

.tooltip-container:hover .tooltip {
  top: -100%;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  scale: 1;
  animation: shake 0.5s ease-in-out both;
}

.tooltip-container:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  color: white;
  border-color: transparent;
}

.tooltip-container:hover span:last-child {
  transform: scale(1);
  left: 0;
}

.tooltip-container:hover .text {
  opacity: 0;
  top: 0%;
  left: 100%;
  transform: scale(0);
}

@keyframes shake {
  0% {
    rotate: 0;
  }

  25% {
    rotate: 7deg;
  }

  50% {
    rotate: -7deg;
  }

  75% {
    rotate: 1deg;
  }

  100% {
    rotate: 0;
  }
}

.box {
  background-image: url(../../assets/01.jpg);
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  .typed-element {
    height: 100vh;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    text-align: center;
    font-size: 0.28rem;
    animation: hueRotate 3s infinite alternate;

    @keyframes hueRotate {
      100% {
        filter: hue-rotate(360deg);
      }
    }
    .typing {
      letter-spacing: 0.04rem;
      font-family: "宋体";
      background: var(--vp-home-hero-name-background);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: var(--vp-home-hero-name-color);
      animation: hueRotate 3s infinite alternate;

      @keyframes hueRotate {
        100% {
          filter: hue-rotate(360deg);
        }
      }
      padding:0 40px;
      box-sizing: border-box;

        font-weight: bold;
      font-size: 50px;

      .typed-cursor {
        font-weight: 100 !important;
      }
    }
  }
}

.overall-header-left {
  align-self: center;
  justify-self: center;
  font-size: 0.3rem; /* 要给容器设置font-size */
}

.btn{
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
}

button {
  background: transparent;
  color: #fff;
  border: 3px solid #fff;
  border-radius: 50px;
  padding: 10px;
  box-sizing: border-box;
  font: 18px "Margarine", sans-serif;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: 0.2s ease-in-out;
  letter-spacing: 2px;
}

.name {
  width: 100%;
  text-align: center;
  padding: 0 0 30px;
  padding-top: 40px;
  font: 500 14px "Rubik", sans-serif;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
}

.button-parrot .parrot {
  position: absolute;
  width: 60px;
  text-align: center;
  animation: blink 0.8s infinite;
  color: transparent;
}

.button-parrot .parrot:before {
  content: "Click Me!";
}

.button-parrot .parrot:nth-child(1) {
  top: -30px;
  left: -40px;
  font: 12px/1 "Margarine", sans-serif;
  transform: rotate(-20deg);
  animation-duration: 0.5s;
}

.button-parrot .parrot:nth-child(2) {
  font: 12px/1 "Margarine", sans-serif;
  right: -40px;
  top: -20px;
  transform: rotate(15deg);
  animation-duration: 0.3s;
}

.button-parrot .parrot:nth-child(3) {
  font: 16px/1 "Margarine", sans-serif;
  top: -60px;
  left: 15px;
  transform: rotate(10deg);
  animation-duration: 1s;
}

.button-parrot .parrot:nth-child(4) {
  font: 18px/1 "Margarine", sans-serif;
  top: -70px;
  left: 95px;
  transform: rotate(2deg);
  animation-duration: 0.7s;
}

.button-parrot .parrot:nth-child(5) {
  font: 14px/1 "Margarine", sans-serif;
  top: 80px;
  left: 105px;
  transform: rotate(-20deg);
  animation-duration: 0.8s;
}

.button-parrot .parrot:nth-child(6) {
  font: 12px/1 "Margarine", sans-serif;
  top: 80px;
  left: 5px;
  transform: rotate(10deg);
  animation-duration: 1.2s;
}

.button-parrot button:hover .parrot:before {
  content: "Do it!";
  width: 70px;
}

@keyframes blink {
  25%,
  75% {
    color: transparent;
  }

  40%,
  60% {
    color: #fff;
  }
}
</style>