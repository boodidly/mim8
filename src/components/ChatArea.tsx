import { Loader2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { EmptyState } from './EmptyState';
import { ErrorMessage } from './ErrorMessage';
import { LoadingIndicator } from './LoadingIndicator';
import type { Message } from '../types';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function ChatArea({ messages, isLoading, error, messagesEndRef }: ChatAreaProps) {
  return (
    <main className="flex-1 overflow-y-auto p-6 bg-background/95 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.length === 0 && <EmptyState />}
        
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        
        {isLoading && <LoadingIndicator />}
        
        {error && <ErrorMessage message={error} />}
        
        <div ref={messagesEndRef} />
      </div>
    </main>
  );
}