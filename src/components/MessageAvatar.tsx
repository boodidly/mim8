import { Bot, User } from 'lucide-react';

interface MessageAvatarProps {
  isBot: boolean;
}

export function MessageAvatar({ isBot }: MessageAvatarProps) {
  return (
    <div 
      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isBot ? 'bg-surface-dark text-primary' : 'bg-surface-dark text-emerald-400'
      }`}
    >
      {isBot ? <Bot size={20} /> : <User size={20} />}
    </div>
  );
}