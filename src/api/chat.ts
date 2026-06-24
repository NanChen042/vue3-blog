import axios from 'axios';

const SILICON_FLOW_BASE_URL = 'https://api.siliconflow.cn/v1';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ChatCompletionResponse {
  id: string;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function createChatCompletion(
  apiKey: string,
  payload: ChatCompletionRequest
): Promise<ChatCompletionResponse> {
  const response = await axios.post<ChatCompletionResponse>(
    `${SILICON_FLOW_BASE_URL}/chat/completions`,
    payload,
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 60000,
    }
  );
  return response.data;
}

export async function createChatCompletionStream(
  apiKey: string,
  payload: ChatCompletionRequest,
  onChunk: (content: string) => void,
  onDone: () => void,
  onError: (err: any) => void,
  signal?: AbortSignal
): Promise<void> {
  try {
    const response = await fetch(`${SILICON_FLOW_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload, stream: true }),
      signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errText}`);
    }

    if (!response.body) {
      throw new Error('Response body is missing.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    const readChunk = async () => {
      try {
        const { done, value } = await reader.read();
        if (done) {
          onDone();
          return;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          if (trimmed === 'data: [DONE]') {
            onDone();
            return;
          }
          if (!trimmed.startsWith('data: ')) continue;
          const dataStr = trimmed.slice(6);
          try {
            const data = JSON.parse(dataStr);
            const content = data.choices?.[0]?.delta?.content;
            if (content) onChunk(content);
          } catch {}
        }
        readChunk();
      } catch (err) {
        onError(err);
      }
    };

    readChunk();
  } catch (err) {
    onError(err);
  }
}
