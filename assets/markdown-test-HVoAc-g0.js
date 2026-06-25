import{H as e,S as t,x as n}from"./vue.runtime.esm-bundler-C5KGi-Jj.js";var r={class:`markdown-body prose dark:prose-invert max-w-none`},i={__name:`markdown-test`,setup(i,{expose:a}){return a({frontmatter:{}}),(i,a)=>(e(),n(`div`,r,[...a[0]||=[t(`<h1>Markdown 格式测试大全</h1><p>这是一个用于测试本系统 Markdown 渲染能力的全面演示文档。在这里，你可以看到所有的标准 Markdown 格式在我们的阅读器下是如何呈现的。</p><h2>基础排版</h2><p>这是一段普通的正文文本。在日常写作中，你可能需要用到<strong>粗体强调</strong>，或者是<em>斜体标示</em>，又或者是<s>删除线</s>来表示已过时的内容。</p><p>你还可以使用 <code>内联代码 (Inline Code)</code> 来标记变量或简短的命令，比如 <code>npm install</code>。</p><h3>引用区块</h3><blockquote><p><strong>注意：</strong> 这是一个引用区块 (Blockquote)。</p><p>引用区块经常被用来高亮一些重要的提示、名言或是警告。你可以在这里<strong>嵌套其他格式</strong>。</p></blockquote><h2>列表测试</h2><h3>无序列表</h3><ul><li>HTML5 与 CSS3</li><li>JavaScript (ES6+)</li><li>前端框架 <ul><li>Vue 3 &amp; Composition API</li><li>React &amp; Hooks</li></ul></li></ul><h3>有序列表</h3><ol><li>第一步：克隆项目仓库</li><li>第二步：安装所有依赖项</li><li>第三步：运行本地开发服务器 <ol><li>检查环境变量配置</li><li>确保端口未被占用</li></ol></li></ol><h2>链接与图片</h2><p><a href="https://github.com/">点击这里访问 GitHub</a>（外部链接测试）</p><p><img src="https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&amp;w=800&amp;auto=format&amp;fit=crop" alt="一束漂亮的测试图片"></p><h2>表格展示</h2><p>这里是一个基础的表格渲染演示，通常用于对比数据。</p><table><thead><tr><th style="text-align:left;">特性 / 框架</th><th style="text-align:center;">Vue 3</th><th style="text-align:center;">React 18</th><th style="text-align:center;">Angular</th></tr></thead><tbody><tr><td style="text-align:left;"><strong>响应式原理</strong></td><td style="text-align:center;">Proxy</td><td style="text-align:center;">Hooks</td><td style="text-align:center;">Zone.js</td></tr><tr><td style="text-align:left;"><strong>学习曲线</strong></td><td style="text-align:center;">平缓</td><td style="text-align:center;">中等</td><td style="text-align:center;">陡峭</td></tr><tr><td style="text-align:left;"><strong>体积大小</strong></td><td style="text-align:center;">较小</td><td style="text-align:center;">较小</td><td style="text-align:center;">较大</td></tr></tbody></table><h2>代码块渲染</h2><p>接下来是激动人心的代码块渲染和语法高亮测试！我们的引擎支持自动语言识别。</p><h3>JavaScript</h3><pre><code class="hljs language-javascript"><span class="hljs-comment">// 测试一个简单的防抖函数</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">debounce</span>(<span class="hljs-params">func, wait</span>) {
  <span class="hljs-keyword">let</span> timeout;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">executedFunction</span>(<span class="hljs-params">...args</span>) {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">later</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-built_in">clearTimeout</span>(timeout);
      <span class="hljs-title function_">func</span>(...args);
    };
    <span class="hljs-built_in">clearTimeout</span>(timeout);
    timeout = <span class="hljs-built_in">setTimeout</span>(later, wait);
  };
}
</code></pre><h3>Vue (SFC)</h3><pre><code class="hljs language-vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;hello-world&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{{ greeting }}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;increment&quot;</span>&gt;</span>点击了 {{ count }} 次<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { ref, computed } <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;vue&#39;</span>;

<span class="hljs-keyword">const</span> count = <span class="hljs-title function_">ref</span>(<span class="hljs-number">0</span>);
<span class="hljs-keyword">const</span> greeting = <span class="hljs-title function_">computed</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-string">\`Hello, Vue 3!\`</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">increment</span> = (<span class="hljs-params"></span>) =&gt; {
  count.<span class="hljs-property">value</span>++;
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="language-css">
<span class="hljs-selector-class">.hello-world</span> {
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#6366f1</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre><h3>Bash / Shell</h3><pre><code class="hljs language-bash"><span class="hljs-comment"># 构建生产环境代码</span>
npm run build

<span class="hljs-comment"># 将静态资源发布到服务器</span>
rsync -avz dist/ user@server:/var/www/html/
</code></pre><h3>JSON 配置文件</h3><pre><code class="hljs language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ESNext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;useDefineForClassFields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ESNext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;moduleResolution&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Node&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;preserve&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre><h2>流程图 (Mermaid 语法)</h2><p>以下是一个真实的 Mermaid 流程图演示：</p><pre><code class="hljs language-mermaid">graph TD
    A[用户请求] --&gt; B{路由判断}
    B --&gt;|找到页面| C[渲染 Vue 组件]
    B --&gt;|404| D[展示 NotFound 页面]
    C --&gt; E[拉取 Markdown 数据]
    E --&gt; F[解析 AST 语法树]
    F --&gt; G[高亮呈现给用户]
</code></pre><h2>结语</h2><hr><p>（上方是一条水平分割线 <code>---</code>）</p><p>至此，所有的基础测试都已经涵盖。你可以滚动页面检查右侧的<strong>大纲目录</strong>是否能精确锚定到每一个标题，以及测试代码块右上角的<strong>复制按钮</strong>是否好用！</p><pre><code class="hljs language-mermaid">graph TD;
    A--&gt;B;
    A--&gt;C;
    B--&gt;D;
    C--&gt;D;
</code></pre>`,36)]]))}};export{i as default};