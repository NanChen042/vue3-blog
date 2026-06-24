# Auto-Translator Bot

> 基于上下文的多语言 Markdown 沉浸式翻译引擎。

## 简介

在开源世界中，多语言文档的支持是极其昂贵的。Auto-Translator Bot 可以自动将你的 `README.md` 或项目文档无损翻译为全球 20 多种语言，并且**完美保留所有 Markdown 格式**。

## 核心算法

### 1. 结构树保留解析
Bot 在翻译前，会将 Markdown 文件解析为 AST 抽象语法树。
```javascript
const md = require('markdown-it')();
const tokens = md.parse(content, {});
// 仅翻译文本类型节点
```

### 2. 上下文记忆
翻译模型拥有强大的上下文记忆能力，能够识别术语并保持翻译连贯性。

## 高级用法

你可以在项目中放入一个 `.translate.json` 配置文件来自定义专有名词：
```json
{
  "glossary": {
    "Auto-Translator": "自动翻译器",
    "Agent": "智能体"
  }
}
```
