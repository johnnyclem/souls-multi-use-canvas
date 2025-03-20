import React from 'react';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

interface InfinityCanvasProps {
  url?: string;
}

export const InfinityCanvas: React.FC<InfinityCanvasProps> = ({ url }) => {
  return (
    <div className="w-full h-full">
      <Tldraw />
    </div>
  );
}; 