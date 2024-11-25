import { Loader2 } from 'lucide-react';

export function LoadingIndicator() {
  return (
    <div className="flex items-center gap-3 p-4 bg-surface/90 rounded-lg message-glow">
      <Loader2 className="w-5 h-5 animate-spin text-primary" />
      <p className="text-sm text-gray-300">Thinking...</p>
    </div>
  );
}