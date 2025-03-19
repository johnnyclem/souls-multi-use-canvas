import React from 'react';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

interface InfinityCanvasProps {
  url?: string;
}

export const InfinityCanvas: React.FC<InfinityCanvasProps> = ({ url }) => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Tldraw />
    </div>
  );
}; 