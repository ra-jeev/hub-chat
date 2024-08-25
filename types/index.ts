export type LlmParams = {
  model: string;
  temperature: number;
  maxTokens: number;
  topP?: number;
  topK?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  systemPrompt: string;
  stream: boolean;
};

export type ChatMessage = {
  role: string;
  content: string;
};

export type LoadingType = 'idle' | 'stream' | 'message';
