# GitHub Reviewer Agent

> 自动化分析 PR 差异并提供深度代码审查建议的 AI Agent。

## 产品特色

我们的 GitHub Reviewer 是一款集成在 CI/CD 流程中的审查工具，它能够：
1. 自动读取 Pull Request 中的 Diff。
2. 进行深度的静态代码分析和业务逻辑推理。
3. 给出包含详细建议的 Code Review 评论。

## 快速上手

配置你的 `reviewer.yml`：

```yaml
name: "AI Code Reviewer"
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Reviewer
        uses: ai-agent/github-reviewer@v1.2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          openai_key: ${{ secrets.OPENAI_API_KEY }}
```

## 常见问题

Q: 审查速度如何？
A: 通常在 PR 提交后 30 秒内即可完成初步审查。
