export interface Message {
  role: 'user' | 'assistant';
  content: string;
  attachment?: {
    name: string;
    type: string;
    content: string;
  };
}

export interface OllamaResponse {
  model: string;
  created_at: string;
  message: {
    role: string;
    content: string;
  };
  done: boolean;
}

export interface Model {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
}