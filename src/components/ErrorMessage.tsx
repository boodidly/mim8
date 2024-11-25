interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-4 bg-red-900/20 border border-red-900/50 text-red-400 rounded-lg">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Error:</p>
        <p className="text-sm">{message}</p>
        <p className="text-xs text-red-400/80 mt-2">
          Make sure Ollama is running with: <code className="px-1 py-0.5 bg-red-900/30 rounded">systemctl --user start ollama</code>
        </p>
      </div>
    </div>
  );
}