import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatArea } from './components/ChatArea';
import { ChatInput } from './components/ChatInput';
import type { Message, OllamaResponse } from './types';

const OLLAMA_HOST = 'http://localhost:11434';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState('llama2');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent, attachment: File | null) => {
    e.preventDefault();
    if ((!input.trim() && !attachment) || isLoading) return;

    let attachmentData = null;
    if (attachment) {
      try {
        const content = await attachment.text();
        attachmentData = {
          name: attachment.name,
          type: attachment.type,
          content: content
        };
      } catch (err) {
        setError('Failed to read attachment. Please try again.');
        return;
      }
    }

    const userMessage: Message = {
      role: 'user',
      content: input,
      ...(attachmentData && { attachment: attachmentData })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [...messages, {
            ...userMessage,
            content: attachmentData 
              ? `${input}\n\nAttached file (${attachment.name}):\n${attachmentData.content}`
              : input
          }],
          stream: false
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `Failed to connect to Ollama server (${response.status}): ${errorData}`
        );
      }

      const data: OllamaResponse = await response.json();
      
      if (!data.message?.content) {
        throw new Error('Invalid response format from Ollama server');
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message.content
      }]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to communicate with Ollama server. Please ensure Ollama is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header selectedModel={selectedModel} onModelChange={setSelectedModel} />
      <ChatArea
        messages={messages}
        isLoading={isLoading}
        error={error}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;