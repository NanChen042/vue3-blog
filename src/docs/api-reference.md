# API 参考文档

本篇文档涵盖了所有 AI Agent 开放平台的基础 API。

## 认证 (Authentication)

所有的 API 请求都需要在 Header 中携带 Bearer Token：

```http
GET /api/v1/agents HTTP/1.1
Authorization: Bearer YOUR_API_KEY
```

## 接口列表

### 1. 获取模型状态

**Endpoint**: `GET /api/v1/models/status`

**Response**:
```json
{
  "models": [
    {
      "id": "gpt-4o",
      "status": "online",
      "latency": "120ms"
    }
  ]
}
```

### 2. 触发任务调度

**Endpoint**: `POST /api/v1/tasks`

请求体格式：
```json
{
  "agent_id": "github-reviewer",
  "payload": {
    "pr_url": "https://github.com/user/repo/pull/1"
  }
}
```
