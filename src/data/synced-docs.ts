import { defineAsyncComponent, h } from 'vue';

const LoadingComponent = {
  render() {
    return h('div', { class: 'py-32 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 w-full' }, [
      h('svg', { class: 'w-8 h-8 animate-spin text-indigo-500 mb-4', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24' }, [
        h('circle', { class: 'opacity-25', cx: '12', cy: '12', r: '10', stroke: 'currentColor', 'stroke-width': '4' }),
        h('path', { class: 'opacity-75', fill: 'currentColor', d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' })
      ]),
      h('span', { class: 'text-sm font-medium tracking-wider animate-pulse' }, '正在加载核心文档...')
    ]);
  }
};

const createDoc = (loader: any) => defineAsyncComponent({
  loader,
  loadingComponent: LoadingComponent,
  delay: 50,
});

export const syncedDocMenus = [
  {
    title: 'AI',
    items: [
      { id: 'ai-skill-server-', title: `《AI Skill Server 动态技能中台 - 完整技术文档》`, description: `本文档是对开源项目 **AI Skill Server**（地址：https://github.com/NanChen042/skills）的深度技术分析与详细设计文档。该项目基于 Node.js +...`, component: createDoc(() => import('@/docs/articles/ai-skill-server-.md')) },
      { id: 'ai-01-cursor-mcp-magic-ai-', title: `AI系列——01、用cursor接入mcp协议并体验Magic生成AI网站`, description: `效果实现：`, component: createDoc(() => import('@/docs/articles/ai-01-cursor-mcp-magic-ai-.md')) },
      { id: 'ai-02-ai-api-', title: `AI系列——02、探索AI的无限可能，体验智能对话的未来，vistaAI 演示`, description: `效果展示：`, component: createDoc(() => import('@/docs/articles/ai-02-ai-api-.md')) },
      { id: 'ai-03-vista-ai-', title: `Vista AI 情景模拟类——游戏开发指南`, description: `本指南详细介绍了基于大模型开发交互式文字游戏的方法，包括场景生成、角色关系管理和故事线构建。`, component: createDoc(() => import('@/docs/articles/ai-03-vista-ai-.md')) },
      { id: 'atlas', title: `Atlas —— 从零搭建一个 AI 增强的个人知识与生产力系统`, description: `首页`, component: createDoc(() => import('@/docs/articles/atlas.md')) },
      { id: 'hermes-agent-', title: `Hermes Agent 深度解析：从概念到应用实战`, description: `[https://github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)`, component: createDoc(() => import('@/docs/articles/hermes-agent-.md')) },
      { id: 'kolors-ai-studio', title: `AIVista Image Studio 是怎么做出来的：用 AI 画画的工具台背后的小故事`, description: `演示效果：`, component: createDoc(() => import('@/docs/articles/kolors-ai-studio.md')) },
      { id: 'notelyai', title: `谷记账：一个 Vue 3 批次记账 App 的完整拆解`, description: `体验地址：[https://notelyai.pages.dev/](https://notelyai.pages.dev/)`, component: createDoc(() => import('@/docs/articles/notelyai.md')) },
      { id: 'prompt-optimization-guide', title: ` AI提示词优化功能使用指南`, description: `AI提示词优化功能是一个基于Deepseek API的智能文本转换工具，能够将用户的简单描述转换为更精准、更有效的AI提示词。通过四种不同的优化模式，帮助用户获得更好的AI交互体验。`, component: createDoc(() => import('@/docs/articles/prompt-optimization-guide.md')) },
      { id: 'rules-skills-mcp-', title: `Rules、Skills、MCP 到底是什么？`, description: `我们常在 AI IDE（比如 Cursor、Windsurf、Cline 等）里看到过很多自带的 Rules 功能，还有之前的 MCP 工具，以及新出的 Skills 技能树。但这三者到底有什么关联，...`, component: createDoc(() => import('@/docs/articles/rules-skills-mcp-.md')) },
      { id: 'vistaai', title: `Vista平台 接入 智能体API`, description: `[Vista平台 接入 智能体API 演示文档及项目以上架github，点我直达](https://github.com/NanChen042/magicforge)`, component: createDoc(() => import('@/docs/articles/vistaai.md')) },
      { id: 'web-search-enhancement-guide', title: ` AI联网搜索增强功能使用指南`, description: `AI联网搜索增强功能是一个集成在发送流程中的真实网络搜索工具。当用户启用此功能后，系统会在发送查询给AI之前，自动进行真实的网络搜索，获取最新的相关信息，并将搜索结果整合到查询中，从而显著提升AI回答...`, component: createDoc(() => import('@/docs/articles/web-search-enhancement-guide.md')) },
      { id: '-vue3-ai-', title: `Vue3 接入 AI 后的前端范式转变：从静态到流式，从模板到Schema驱动`, description: `两年前，如果有人告诉我前端会因为AI而发生这样的变化，我可能会一笑而过。但当我真正在一个中等规模的Vue3项目中接入了大模型能力后，我发现自己过去积累的很多前端经验需要重新理解。`, component: createDoc(() => import('@/docs/articles/-vue3-ai-.md')) },
    ]
  },
  {
    title: 'Algorithm',
    items: [
      { id: '001-stack', title: `001_stack`, description: `点击查看详情...`, component: createDoc(() => import('@/docs/articles/001-stack.md')) },
      { id: '002-queue', title: `002_queue`, description: `点击查看详情...`, component: createDoc(() => import('@/docs/articles/002-queue.md')) },
      { id: '003-dictionary', title: `003_dictionary`, description: `点击查看详情...`, component: createDoc(() => import('@/docs/articles/003-dictionary.md')) },
      { id: '004-truee', title: `004_truee`, description: `点击查看详情...`, component: createDoc(() => import('@/docs/articles/004-truee.md')) },
      { id: 'index', title: `index`, description: `点击查看详情...`, component: createDoc(() => import('@/docs/articles/index.md')) },
    ]
  },
  {
    title: 'deepseek',
    items: [
      { id: 'deepseek', title: `DeepSeek AI 聊天助手集成指南`, description: `先看完整效果：`, component: createDoc(() => import('@/docs/articles/deepseek.md')) },
    ]
  },
  {
    title: 'Games',
    items: [
      { id: '-html5-canvas-', title: `从零开始打造HTML5拼图游戏：一个Canvas实战项目`, description: `在开始动手之前，我想分享一下为什么选择HTML5 Canvas来开发拼图游戏。相比于传统的DOM操作，Canvas提供了更高效的图形渲染能力和更灵活的像素级控制。对于拼图这种需要处理不规则形状和复杂交...`, component: createDoc(() => import('@/docs/articles/-html5-canvas-.md')) },
    ]
  },
  {
    title: 'harmony-os-4.0-series',
    items: [
      { id: 'harmonyos06', title: `HarmonyOS4.0 系列——06、渲染之条件渲染、循环渲染以及懒加载渲染`, description: `ArkTS 提供了渲染控制的能力。条件渲染可根据应用的不同状态，使用 if、else 和 else if 渲染对应状态下的 UI 内容。`, component: createDoc(() => import('@/docs/articles/harmonyos06.md')) },
      { id: 'harmonyos07-lifecycle', title: `自定义组件的生命周期`, description: `即被@Entry 装饰的组件生命周期，提供以下生命周期接口：`, component: createDoc(() => import('@/docs/articles/harmonyos07-lifecycle.md')) },
      { id: 'harmonyos4-0-01-', title: `HarmonyOS4.0系列——01、下载、安装、配置环境、搭建页面以及运行示例代码.md`, description: `这里安装windows版本为例`, component: createDoc(() => import('@/docs/articles/harmonyos4-0-01-.md')) },
      { id: 'harmonyos4-0-02-arkts-web-', title: `HarmonyOS4.0系列——02、汉化插件、声明式开发范式ArkTS和类web开发范式`, description: `我们在每次退出编辑器后再次打开会直接进入项目文件中，这样在新建项目用起来很是不方便，所以这里跟着设置一下就好`, component: createDoc(() => import('@/docs/articles/harmonyos4-0-02-arkts-web-.md')) },
      { id: 'harmonyos4-0-03-ui-', title: `HarmonyOS4.0系列——03、声明式UI、链式编程、事件方法、以及自定义组件简单案例`, description: `使用 Stage 模型的应用，需要在\` module.json5 \`配置文件中声明权限。`, component: createDoc(() => import('@/docs/articles/harmonyos4-0-03-ui-.md')) },
      { id: 'harmonyos4-0-04-styles-extend-extend-statestyles', title: `HarmonyOS4.0系列——04、@Styles、@Extend、@Extend事件以及多态样式stateStyles`, description: `通用样式`, component: createDoc(() => import('@/docs/articles/harmonyos4-0-04-styles-extend-extend-statestyles.md')) },
      { id: 'harmonyos4-0-05-prop-link-provide-consume-watch-', title: `HarmonyOS4.0系列——05、状态管理之@Prop、@Link、@Provide、@Consume，以及@Watch装饰器`, description: `看下面这张图:`, component: createDoc(() => import('@/docs/articles/harmonyos4-0-05-prop-link-provide-consume-watch-.md')) },
      { id: 'index', title: `index`, description: `点击查看详情...`, component: createDoc(() => import('@/docs/articles/index.md')) },
      { id: 'readme-en', title: `HarmonyOS4.0系列`, description: `HarmonyOS4.0系列语法及教程`, component: createDoc(() => import('@/docs/articles/readme-en.md')) },
      { id: 'readme', title: `HarmonyOS4.0系列`, description: `HarmonyOS4.0系列语法及教程,适合前端开发工程师阅读`, component: createDoc(() => import('@/docs/articles/readme.md')) },
    ]
  },
  {
    title: 'NodeJS',
    items: [
      { id: 'index', title: `别再用原生的 Socket 了！Nest.js 让你的实时聊天系统开发效率翻倍`, description: `先看效果：`, component: createDoc(() => import('@/docs/articles/index.md')) },
    ]
  },
  {
    title: 'ThreeJS',
    items: [
      { id: 'readme-en', title: `threejs文档`, description: `此篇将介绍threejs的基础属性的介绍`, component: createDoc(() => import('@/docs/articles/readme-en.md')) },
      { id: 'readme', title: `threejs文档`, description: `一些threejs的属性和方法，仅用来学习交流。`, component: createDoc(() => import('@/docs/articles/readme.md')) },
      { id: 'three01-', title: `速成Three.js——一、初识Three以及基础的前端场景搭建(结尾含源码)`, description: `title: Docs with VitePress`, component: createDoc(() => import('@/docs/articles/three01-.md')) },
      { id: 'three02', title: `光源对物体表面影响`, description: `接上个例子我们接着往下看`, component: createDoc(() => import('@/docs/articles/three02.md')) },
      { id: 'three03', title: `three03`, description: `threejs 可以借助 HTML5 的 API 请求动画帧 window.requestAnimationFrame 实现动画渲染。`, component: createDoc(() => import('@/docs/articles/three03.md')) },
      { id: 'three04', title: `three04`, description: `Three.js 常见的几何体：`, component: createDoc(() => import('@/docs/articles/three04.md')) },
      { id: 'three05', title: `关于几何体BufferGeomety`, description: `目录：本章节针对与几何体进行效果展示`, component: createDoc(() => import('@/docs/articles/three05.md')) },
      { id: 'three06', title: `three06`, description: `该类表示的是一个三维向量（3D vector）。 一个三维向量表示的是一个有顺序的、三个为一组的数字组合（标记为 x、y 和 z）， 可被用来表示很多事物，例如：`, component: createDoc(() => import('@/docs/articles/three06.md')) },
      { id: 'three07', title: `three07`, description: `通过 THREE.Group 类创建一个组对象 group,然后通过 add 方法把网格模型 mesh1、mesh2 作为设置为组对象 group 的子对象，然后在通过执行 scene.add(gro...`, component: createDoc(() => import('@/docs/articles/three07.md')) },
      { id: 'three08', title: `three08`, description: `基础坐标也就是模型的\`.position\`属性`, component: createDoc(() => import('@/docs/articles/three08.md')) },
      { id: 'three09', title: `three09`, description: `color 和 map 同时使用会出现重叠混合的现象，最好就是设置了 color 就不用设置 map，设置 map 就不用设置 color。color 的默认颜色为白色`, component: createDoc(() => import('@/docs/articles/three09.md')) },
      { id: 'three10', title: `Threejs——十、关于 gltf 模型的介绍、引入方法以及设置属性添加功能（结尾附代码）`, description: `前端推荐使用 Blender 三维建模软件，模型推荐使用 gltf 或者 glb 文件。`, component: createDoc(() => import('@/docs/articles/three10.md')) },
      { id: 'three11', title: `three11`, description: `金属度属性.metalness表示材质像金属的程度, 非金属材料,如木材或石材,使用0.0,金属使用1.0。`, component: createDoc(() => import('@/docs/articles/three11.md')) },
      { id: 'three12', title: `Three.js——十二、MeshPhysicalMaterial清漆层、粗糙度、物理材质透光率以及折射率（结尾附代码）`, description: `清漆层属性\`.clearcoat\`可以用来模拟物体表面刷了一层透明的模\`.clearcoat\`的范围0到1，默认0。`, component: createDoc(() => import('@/docs/articles/three12.md')) },
      { id: 'three13', title: `Three.js——十三、自定义大小画布、UI交互按钮以及3D场景交互、渲染画布为文件（图片）`, description: `画布随窗口变化`, component: createDoc(() => import('@/docs/articles/three13.md')) },
      { id: 'three14', title: `Threejs——十四、关于深度冲突、重叠、以及加载模型进度条效果实现（附完整代码）`, description: `两个模型重叠的模型，通过浏览器旋转预览，会发现模型旋转的时候会发生闪烁。`, component: createDoc(() => import('@/docs/articles/three14.md')) },
      { id: 'three15', title: `three15`, description: `正投影相机和透视相机的区别`, component: createDoc(() => import('@/docs/articles/three15.md')) },
      { id: 'three-glb-', title: `three模型Glb压缩教程`, description: `web开发基于Vue3对three.js加载3d模型过程中，往往会出现模型太大导致前端加载时间过长，降低用户使用的体验，我们这里选取gltf-pipeline的DRACOLoader方式来解压模型。`, component: createDoc(() => import('@/docs/articles/three-glb-.md')) },
      { id: 'three-', title: `three移动端虚拟摇杆`, description: `点击查看详情...`, component: createDoc(() => import('@/docs/articles/three-.md')) },
    ]
  },
  {
    title: 'Vue',
    items: [
      { id: 'vue-3-naive-ui-', title: `输出目录: dist/# 包含优化后的 JS、CSS、HTML# 支持 gzip 压缩和代码分割`, description: `先看成果`, component: createDoc(() => import('@/docs/articles/vue-3-naive-ui-.md')) },
      { id: 'vue-3-socket-io-', title: `Vue 3 + Socket.io 实时聊天项目完整开发文档`, description: `接上篇文档，这篇将展示前端界面及功能`, component: createDoc(() => import('@/docs/articles/vue-3-socket-io-.md')) },
    ]
  },
  {
    title: 'web',
    items: [
      { id: 'lowcode-form-builder', title: `低代码表单设计器项目源码解析`, description: `本文档记录了使用原生 JavaScript 实现低代码表单设计器的核心源码与模块实现。项目通过拖拽组件、配置属性，最终生成表单的 JSON 数据结构，完全使用原生 DOM API 构建。`, component: createDoc(() => import('@/docs/articles/lowcode-form-builder.md')) },
    ]
  },
];
