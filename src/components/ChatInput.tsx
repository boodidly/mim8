import { Send, Loader2, Paperclip } from 'lucide-react';
import { FileAttachment } from './FileAttachment';
import { useState, useRef } from 'react';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent, attachment: File | null) => void;
}

export function ChatInput({ input, isLoading, onInputChange, onSubmit }: ChatInputProps) {
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e, attachment);
    setAttachment(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAttachment(file);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <footer className="sticky bottom-0 border-t border-surface/50 bg-background/95 backdrop-blur-sm p-4">
      <div className="max-w-3xl mx-auto space-y-2">
        <FileAttachment 
          file={attachment} 
          onRemove={() => setAttachment(null)} 
        />
        
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".txt,.md,.json,.csv,.yml,.yaml"
          />
          
          <button
            type="button"
            onClick={handleAttachmentClick}
            className="px-3 py-2 text-gray-400 hover:text-gray-200 hover:bg-surface/50 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg border border-surface bg-surface/80 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={isLoading || (!input.trim() && !attachment)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Send
          </button>
        </form>
      </div>
    </footer>
  );
}