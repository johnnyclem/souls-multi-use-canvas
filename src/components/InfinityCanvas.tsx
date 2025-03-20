import React, { useRef, useState } from 'react';
import { Tldraw, Editor, useEditor } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { canvasToMarkdown, downloadAsFile, markdownToCanvas, readFileAsText } from '../lib/markdownCanvasConverter';

interface InfinityCanvasProps {
  url?: string;
  enableMarkdownSupport?: boolean;
}

// Save and load buttons component
const CanvasActions: React.FC<{ enableMarkdownSupport?: boolean }> = ({ enableMarkdownSupport }) => {
  const editorRef = useEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadStatus, setLoadStatus] = useState<string | null>(null);

  // If markdown support is not enabled, don't show the buttons
  if (!enableMarkdownSupport) {
    return null;
  }

  const handleSaveAsMarkdown = () => {
    if (editorRef) {
      try {
        const markdown = canvasToMarkdown(editorRef);
        downloadAsFile(markdown, 'tldraw-canvas.md', 'text/markdown');
      } catch (error) {
        console.error('Error exporting to markdown:', error);
      }
    }
  };

  const handleLoadFromMarkdown = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editorRef) return;

    try {
      setLoadStatus('Loading...');
      const markdown = await readFileAsText(file);
      const success = await markdownToCanvas(markdown, editorRef);
      
      if (success) {
        setLoadStatus('Successfully loaded canvas');
        // Clear status message after 3 seconds
        setTimeout(() => setLoadStatus(null), 3000);
      } else {
        setLoadStatus('Failed to load canvas');
      }
    } catch (error) {
      console.error('Error importing from markdown:', error);
      setLoadStatus('Error loading canvas');
    }
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="absolute top-4 right-4 z-10 flex gap-2">
      <input
        type="file"
        accept=".md"
        ref={fileInputRef}
        onChange={handleLoadFromMarkdown}
        className="hidden"
        id="markdown-file-input"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-3 py-1.5 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md text-sm shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
      >
        Import
      </button>
      <button
        onClick={handleSaveAsMarkdown}
        className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm shadow-sm hover:bg-blue-600 font-medium"
      >
        Export
      </button>
      {loadStatus && (
        <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">
          {loadStatus}
        </div>
      )}
    </div>
  );
};

export const InfinityCanvas: React.FC<InfinityCanvasProps> = ({ url, enableMarkdownSupport }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div style={{ width: '100%', height: '100%' }}>
        <Tldraw>
          <CanvasActions enableMarkdownSupport={enableMarkdownSupport} />
        </Tldraw>
      </div>
    </div>
  );
}; 