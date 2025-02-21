# vue3-blog帮助文档
### 部署
```ts
pnpm install gh-pages -D
pnpm run deploy
```


### tsParticles安装
```ts
pnpm install @tsparticles/vue3
pnpm install @tsparticles/slim
```

vite.config.ts中添加
```ts
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim"; 

createApp(App).use(Particles, {
  init: async engine => {
    await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
  },
});
```

在App.vue页面中使用
```html

<script setup lang="ts">
// <!--引入粒子特效的相关配置-->
const options = {
  background: {
    color: {
      
    },
   
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
      color: "#ffffff", //'#dedede'。线条颜色。
      distance: 150, //线条长度
      enable: true, //是否有线条
      opacity: 0.5, //线条透明度。
      width: 1, //线条宽度。
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
      value: 80, //粒子数量。
    },
    opacity: {
      value: 0.5, //粒子透明度。
    },
    shape: {
      type: "circle", //可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};

const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};
</script>

<template>
  <!-- <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" url="http://foo.bar/particles.json" /> -->
 <div class="box">
  <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" :options="options" />
 </div>

</template>

<style scoped>
.box{
  background-image: url(./assets/01.jpg); // 背景图
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;

}
</style>

```
效果：
![Alt text](assets/README/recording.gif)


## 关于打字机
![Alt text](assets/README/recording-1.gif)
```ts
pnpm install typed.js
```

#### 全局引入
```ts
import vuetyped from 'vue3typed'
createApp(App).use(vuetyped).mount('#app')
```
#### 使用
```html
    <vuetyped :strings="['Hi', 'This is Southern Wind blog', 'Welcome to visit']" :loop="true" :startDelay="300" :typeSpeed="100" :backSpeed="50" :smart-backspace="true">
      <div class="typing" />
    </vuetyped>
```
#### 特性
<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td>strings</td>
<td>Array</td>
<td>要输入的字符串		</td>
<td><code>:strings="['Text 1', 'Text 2']"</code></td>
</tr>
<tr>
<td>stringsElement</td>
<td>String</td>
<td>包含字符串子元素的元素的 ID		</td>
<td><code>:stringsElement="'myId'"</code></td>
</tr>
<tr>
<td>typeSpeed</td>
<td>Number</td>
<td>输入速度（以毫秒为单位）		</td>
<td><code>:typeSpeed="50"</code></td>
</tr>
<tr>
<td>startDelay</td>
<td>Number</td>
<td>打字前的时间以毫秒为单位	</td>
<td><code>:startDelay="1000"</code></td>
</tr>
<tr>
<td>backSpeed</td>
<td>Number</td>
<td>退格速度（以毫秒为单位）		</td>
<td><code>:backSpeed="10"</code></td>
</tr>
<tr>
<td>smartBackspace</td>
<td>Boolean</td>
<td>仅退格与前一个字符串不匹配的内容		</td>
<td><code>:smartBackspace="true"</code></td>
</tr>
<tr>
<td>shuffle</td>
<td>Boolean</td>
<td>打乱顺序	</td>
<td><code>:shuffle="true"</code></td>
</tr>
<tr>
<td>backDelay</td>
<td>Number</td>
<td>退格之前的时间（以毫秒为单位）		</td>
<td><code>:backDelay="100"</code></td>
</tr>
<tr>
<td>fadeOut</td>
<td>Boolean</td>
<td>淡出而不是退格		</td>
<td><code>:fadeOut="true"</code></td>
</tr>
<tr>
<td>fadeOutClass</td>
<td>String</td>
<td>淡入淡出动画的 css 类	</td>
<td><code>:fadeOutClass="'fadeOutClass'"</code></td>
</tr>
<tr>
<td>fadeOutDelay</td>
<td>Number</td>
<td>淡出延迟（以毫秒为单位）	</td>
<td><code>:fadeOutDelay="500"</code></td>
</tr>
<tr>
<td>loop</td>
<td>Boolean</td>
<td>循环字符串	</td>
<td><code>:loop="true"</code></td>
</tr>
<tr>
<td>loopCount</td>
<td>Number</td>
<td>循环次数	</td>
<td><code>:loopCount="3"</code></td>
</tr>
<tr>
<td>showCursor</td>
<td>Boolean</td>
<td>显示光标	</td>
<td><code>:showCursor="true"</code></td>
</tr>
<tr>
<td>cursorChar</td>
<td>String</td>
<td>光标字符	</td>
<td><code>:cursorChar="'_'"</code></td>
</tr>
<tr>
<td>autoInsertCss</td>
<td>Boolean</td>
<td>将光标和淡出的 CSS 插入 HTML	</td>
<td><code>:autoInsertCss="true"</code></td>
</tr>
<tr>
<td>attr</td>
<td>String</td>
<td>用于输入的属性 例如：输入占位符、值或仅 HTML 文本	</td>
<td><code>:attr="'placeholder'"</code></td>
</tr>
<tr>
<td>bindInputFocusEvents</td>
<td>Boolean</td>
<td>如果 el 是文本输入，则绑定到焦点和模糊	</td>
<td><code>:bindInputFocusEvents="true"</code></td>
</tr>
<tr>
<td>contentType</td>
<td>String</td>
<td>'html' 或 'null' 表示纯文本	</td>
<td><code>:contentType="'html'"</code></td>
</tr>
</tbody>
</table>

#### 事件
<table>
<thead>
<tr>
<th>Event</th>
<th>Description</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td>onComplete</td>
<td>全部输入完成	</td>
<td><code>@onComplete="doSmth()"</code></td>
</tr>
<tr>
<td>preStringTyped</td>
<td>在输入每个字符串之前	</td>
<td><code>@preStringTyped="doSmth()"</code></td>
</tr>
<tr>
<td>onStringTyped</td>
<td>输入每个字符串后	</td>
<td><code>@onStringTyped="doSmth()"</code></td>
</tr>
<tr>
<td>onLastStringBackspaced</td>
<td>循环期间，在输入最后一个字符串之后	</td>
<td><code>@onLastStringBackspaced="doSmth()"</code></td>
</tr>
<tr>
<td>onTypingPaused</td>
<td>打字已停止	</td>
<td><code>@onTypingPaused="doSmth()"</code></td>
</tr>
<tr>
<td>onTypingResumed</td>
<td>停止输入后又开​​始输入	</td>
<td><code>@onTypingResumed="doSmth()"</code></td>
</tr>
<tr>
<td>onReset</td>
<td>重置后</td>
<td><code>@onReset="doSmth()"</code></td>
</tr>
<tr>
<td>onStop</td>
<td>停止后	</td>
<td><code>@onStop="doSmth()"</code></td>
</tr>
<tr>
<td>onStart</td>
<td>启动后	</td>
<td><code>@onStart="doSmth()"</code></td>
</tr>
<tr>
<td>onDestroy</td>
<td>销毁后	</td>
<td><code>@onDestroy="doSmth()"</code></td>
</tr>
</tbody>
</table>

**注意！！ 如果在部署时报以下错误(如没有可以直接跳过)**
```ts
src/main.ts(15,22): error TS7016: Could not find a declaration file for module 'vue3typed'. 'D:/Ademo/vite-southern-wind-blog/node_modules/.pnpm/vue3typed@0.1.5_typescript@5.3.3/node_modules/vue3typed/libs/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/vue3typed` if it exists or add a new declaration (.d.ts) file containing `declare module 'vue3typed';`

```
那么在src目录下新建`types/index.d.ts`
```ts
declare module "vue3typed";
```


## 移动端自适应
可以拉到最下方查找
[Vue3+TS+Vant3+Pinia(H5端)配置教程](http://t.csdnimg.cn/B8t6Q)
![Alt text](assets/README/image.png)

因为主适配网站为pc，所以可以用下方的模板替换到`vite.config.ts`中
```ts
 // 适配
 css: {
    postcss: {
      plugins: [
        postcssImport({
          // 这里的rootValue就是你的设计稿大小
          rootValue({ file }) {
            return file.indexOf('vant') !== -1 ? 37.5 : 192;
          },
          propList: ['*'],
        })
      ]
    }
  }
```


## GSAP复杂动画
