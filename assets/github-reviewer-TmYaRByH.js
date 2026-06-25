import{H as e,S as t,x as n}from"./vue.runtime.esm-bundler-C5KGi-Jj.js";var r={class:`markdown-body prose dark:prose-invert max-w-none`},i={__name:`github-reviewer`,setup(i,{expose:a}){return a({frontmatter:{}}),(i,a)=>(e(),n(`div`,r,[...a[0]||=[t(`<h1>GitHub Reviewer Agent</h1><blockquote><p>自动化分析 PR 差异并提供深度代码审查建议的 AI Agent。</p></blockquote><h2>产品特色</h2><p>我们的 GitHub Reviewer 是一款集成在 CI/CD 流程中的审查工具，它能够：</p><ol><li>自动读取 Pull Request 中的 Diff。</li><li>进行深度的静态代码分析和业务逻辑推理。</li><li>给出包含详细建议的 Code Review 评论。</li></ol><h2>快速上手</h2><p>配置你的 <code>reviewer.yml</code>：</p><pre><code class="hljs language-yaml"><span class="hljs-attr">name:</span> <span class="hljs-string">&quot;AI Code Reviewer&quot;</span>
<span class="hljs-attr">on:</span>
  <span class="hljs-attr">pull_request:</span>
    <span class="hljs-attr">types:</span> [<span class="hljs-string">opened</span>, <span class="hljs-string">synchronize</span>]

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">review:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v3</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">Reviewer</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">ai-agent/github-reviewer@v1.2</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">token:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">secrets.GITHUB_TOKEN</span> <span class="hljs-string">}}</span>
          <span class="hljs-attr">openai_key:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">secrets.OPENAI_API_KEY</span> <span class="hljs-string">}}</span>
</code></pre><h2>常见问题</h2><p>Q: 审查速度如何？ A: 通常在 PR 提交后 30 秒内即可完成初步审查。</p>`,10)]]))}};export{i as default};