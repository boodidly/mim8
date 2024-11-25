import { File, X } from 'lucide-react';

interface FileAttachmentProps {
  file: File | null;
  onRemove: () => void;
}

export function FileAttachment({ file, onRemove }: FileAttachmentProps) {
  if (!file) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-surface/50 rounded-lg max-w-fit">
      <File className="w-4 h-4 text-primary" />
      <span className="text-sm text-gray-200">{file.name}</span>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-surface-dark rounded-full transition-colors"
        aria-label="Remove attachment"
      >
        <X className="w-3 h-3 text-gray-400" />
      </button>
    </div>
  );
}