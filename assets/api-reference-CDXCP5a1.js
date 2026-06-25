import{H as e,S as t,x as n}from"./vue.runtime.esm-bundler-C5KGi-Jj.js";var r={class:`markdown-body prose dark:prose-invert max-w-none`},i={__name:`api-reference`,setup(i,{expose:a}){return a({frontmatter:{}}),(i,a)=>(e(),n(`div`,r,[...a[0]||=[t(`<h1>API 参考文档</h1><p>本篇文档涵盖了所有 AI Agent 开放平台的基础 API。</p><h2>认证 (Authentication)</h2><p>所有的 API 请求都需要在 Header 中携带 Bearer Token：</p><pre><code class="hljs language-http"><span class="hljs-keyword">GET</span> <span class="hljs-string">/api/v1/agents</span> <span class="hljs-meta">HTTP/1.1</span>
<span class="hljs-attribute">Authorization</span><span class="hljs-punctuation">: </span>Bearer YOUR_API_KEY
</code></pre><h2>接口列表</h2><h3>1. 获取模型状态</h3><p><strong>Endpoint</strong>: <code>GET /api/v1/models/status</code></p><p><strong>Response</strong>:</p><pre><code class="hljs language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;models&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;gpt-4o&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;online&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;latency&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;120ms&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre><h3>2. 触发任务调度</h3><p><strong>Endpoint</strong>: <code>POST /api/v1/tasks</code></p><p>请求体格式：</p><pre><code class="hljs language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;agent_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;github-reviewer&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;payload&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;pr_url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://github.com/user/repo/pull/1&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>`,14)]]))}};export{i as default};