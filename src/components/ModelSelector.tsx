import { useState, useEffect } from 'react';
import { ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import type { Model } from '../types';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchModels = async () => {
      try {
        setError(null);
        const response = await fetch('http://localhost:11434/api/tags', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to connect to Ollama server (${response.status})`);
        }
        
        const data = await response.json();
        
        if (!data.models || !Array.isArray(data.models)) {
          throw new Error('Invalid response format from Ollama server');
        }

        // Sort models alphabetically
        const sortedModels = data.models.sort((a: Model, b: Model) => 
          a.name.localeCompare(b.name)
        );

        setModels(sortedModels);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        
        console.error('Error fetching models:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to connect to Ollama server';
        setError(errorMessage);
        
        // Set a fallback model list
        setModels([{ 
          name: 'llama2',
          modified_at: new Date().toISOString(),
          size: 0,
          digest: 'default'
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModels();

    // Cleanup function to abort fetch on unmount
    return () => controller.abort();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.model-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 text-gray-400 bg-surface/50 rounded-lg">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading models...</span>
      </div>
    );
  }

  return (
    <div className="relative model-selector">
      <div className="flex items-center gap-2">
        {error && (
          <div className="flex items-center gap-2 mr-2 text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Using default model</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-gray-200 bg-surface/50 rounded-lg hover:bg-surface/80 transition-colors duration-200"
          aria-label="Select model"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="text-sm font-medium">{selectedModel}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-1 w-48 py-1 bg-surface rounded-lg shadow-lg z-50 border border-surface-dark"
          role="listbox"
          aria-label="Select a model"
        >
          {models.map((model) => (
            <button
              key={model.name}
              onClick={() => {
                onModelChange(model.name);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-1.5 text-left text-sm hover:bg-surface-dark transition-colors duration-200
                ${model.name === selectedModel ? 'text-primary' : 'text-gray-200'}`}
              role="option"
              aria-selected={model.name === selectedModel}
            >
              {model.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}