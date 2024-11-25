import { Bot } from 'lucide-react';
import { ModelSelector } from './ModelSelector';

interface HeaderProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function Header({ selectedModel, onModelChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-surface/50 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Bot className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-semibold text-gray-100">Ollama Chat</h1>
      </div>
      <ModelSelector selectedModel={selectedModel} onModelChange={onModelChange} />
    </header>
  );
}