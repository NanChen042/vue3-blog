import{H as e,S as t,x as n}from"./vue.runtime.esm-bundler-C5KGi-Jj.js";var r={class:`markdown-body prose dark:prose-invert max-w-none`},i={__name:`auto-translator`,setup(i,{expose:a}){return a({frontmatter:{}}),(i,a)=>(e(),n(`div`,r,[...a[0]||=[t(`<h1>Auto-Translator Bot</h1><blockquote><p>基于上下文的多语言 Markdown 沉浸式翻译引擎。</p></blockquote><h2>简介</h2><p>在开源世界中，多语言文档的支持是极其昂贵的。Auto-Translator Bot 可以自动将你的 <code>README.md</code> 或项目文档无损翻译为全球 20 多种语言，并且<strong>完美保留所有 Markdown 格式</strong>。</p><h2>核心算法</h2><h3>1. 结构树保留解析</h3><p>Bot 在翻译前，会将 Markdown 文件解析为 AST 抽象语法树。</p><pre><code class="hljs language-javascript"><span class="hljs-keyword">const</span> md = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#39;markdown-it&#39;</span>)();
<span class="hljs-keyword">const</span> tokens = md.<span class="hljs-title function_">parse</span>(content, {});
<span class="hljs-comment">// 仅翻译文本类型节点</span>
</code></pre><h3>2. 上下文记忆</h3><p>翻译模型拥有强大的上下文记忆能力，能够识别术语并保持翻译连贯性。</p><h2>高级用法</h2><p>你可以在项目中放入一个 <code>.translate.json</code> 配置文件来自定义专有名词：</p><pre><code class="hljs language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;glossary&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Auto-Translator&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;自动翻译器&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Agent&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;智能体&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>`,13)]]))}};export{i as default};