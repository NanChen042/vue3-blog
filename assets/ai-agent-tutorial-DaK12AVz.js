import{H as e,S as t,x as n}from"./vue.runtime.esm-bundler-C5KGi-Jj.js";var r={class:`markdown-body prose dark:prose-invert max-w-none`},i={__name:`ai-agent-tutorial`,setup(i,{expose:a}){return a({frontmatter:{}}),(i,a)=>(e(),n(`div`,r,[...a[0]||=[t(`<h1>GitHub Reviewer Agent 架构指南</h1><p>欢迎来到我的 AI 实验室！这篇文档是<strong>直接由原生 Markdown 渲染成 Vue 组件的</strong>，没有经过任何中间转换脚本。</p><h2>核心设计理念</h2><p>这个 Agent 的主要目标是代替人工完成基础的 Code Review 工作，并在 PR 阶段拦截潜在的代码异味（Code Smell）。</p><h3>技术栈</h3><ul><li><strong>Vue 3 + Vite</strong>: 作为我们的宿主容器</li><li><strong>Unplugin Vue Markdown</strong>: 直接将这篇 <code>.md</code> 转化为原生的 Vue AST</li><li><strong>Tailwind Typography</strong>: 提供极具排版美感的样式库</li></ul><h3>快速接入代码</h3><p>如果你想在你自己的项目中接入这个 Agent，可以通过以下简单的脚本实现：</p><pre><code class="hljs language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ReviewAgent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;@nanchen/agents&#39;</span>;

<span class="hljs-keyword">const</span> agent = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ReviewAgent</span>({
  <span class="hljs-attr">apiKey</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">OPENAI_API_KEY</span>,
  <span class="hljs-attr">model</span>: <span class="hljs-string">&#39;gpt-4o&#39;</span>,
  <span class="hljs-attr">rules</span>: [
    <span class="hljs-string">&#39;No console.log allowed&#39;</span>,
    <span class="hljs-string">&#39;Prefer strictly typed interfaces&#39;</span>
  ]
});

<span class="hljs-comment">// 监听 PR 事件</span>
agent.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#39;pull_request&#39;</span>, <span class="hljs-title function_">async</span> (pr) =&gt; {
  <span class="hljs-keyword">const</span> diff = <span class="hljs-keyword">await</span> pr.<span class="hljs-title function_">getDiff</span>();
  <span class="hljs-keyword">const</span> suggestions = <span class="hljs-keyword">await</span> agent.<span class="hljs-title function_">analyze</span>(diff);
  <span class="hljs-keyword">await</span> pr.<span class="hljs-title function_">comment</span>(suggestions);
});
</code></pre><blockquote><p><strong>Note:</strong> 这是目前我们在内部使用的架构，后续我会将其开源到 GitHub，大家敬请期待！</p></blockquote><h2>未来展望</h2><p>接下来我会将这些 Agent 深度集成到我们的博客流水线里。不仅仅是 Reviewer，包括自动校对、自动翻译器（Auto-Translator Bot）等都会在后面的实验里陆续放出。</p>`,12)]]))}};export{i as default};