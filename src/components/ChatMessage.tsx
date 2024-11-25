import React from 'react';
import { Bot, User, FileText } from 'lucide-react';
import { Message } from '../types';
import { MessageAvatar } from './MessageAvatar';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';
  
  return (
    <div 
      className={`flex gap-3 ${
        isBot ? 'bg-surface/90 message-glow' : 'bg-surface/50'
      } p-4 rounded-lg transition-all duration-200`}
    >
      <MessageAvatar isBot={isBot} />
      <div className="flex-1 space-y-2">
        {message.attachment && (
          <div className="flex items-center gap-2 px-3 py-2 bg-surface-dark/50 rounded-lg max-w-fit">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-300">{message.attachment.name}</span>
          </div>
        )}
        <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
          {message.content}
        </p>
      </div>
    </div>
  );
}