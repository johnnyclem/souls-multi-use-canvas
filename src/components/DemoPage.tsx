// src/components/DemoPage.tsx
import React, { useState } from 'react';
import { terminalDemos, threeDModelDemos, webContentDemos } from '../demos';
import TerminalComponent from './TerminalComponent';
import ThreeDModelComponent from './ThreeDModelComponent';
import WebComponent from './WebComponent';

const DemoPage: React.FC = () => {
  const [selectedTerminalDemo, setSelectedTerminalDemo] = useState(0);
  const [selectedModelDemo, setSelectedModelDemo] = useState(0);
  const [selectedWebDemo, setSelectedWebDemo] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Terminal Demos */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Terminal Demos</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Demo:
          </label>
          <select
            className="block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedTerminalDemo}
            onChange={(e) => setSelectedTerminalDemo(Number(e.target.value))}
          >
            <option value={0}>Basic Terminal</option>
            <option value={1}>Custom Commands Terminal</option>
            <option value={2}>Matrix-Style Terminal</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            {selectedTerminalDemo === 0 && "Try basic commands like 'help', 'date', 'ls', etc."}
            {selectedTerminalDemo === 1 && "Try custom commands: 'calc 2 + 2', 'greet John', 'weather'"}
            {selectedTerminalDemo === 2 && "Type 'matrix' to see the Matrix effect"}
          </p>
        </div>
        <TerminalComponent data={terminalDemos[selectedTerminalDemo]} />
      </section>

      {/* 3D Model Demos */}
      <section>
        <h2 className="text-2xl font-bold mb-6">3D Model Demos</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Model:
          </label>
          <select
            className="block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedModelDemo}
            onChange={(e) => setSelectedModelDemo(Number(e.target.value))}
          >
            <option value={0}>Rotating Cube</option>
            <option value={1}>GLTF Duck</option>
            <option value={2}>Flight Helmet</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            {threeDModelDemos[selectedModelDemo].description}
          </p>
          <p className="text-sm text-gray-600">
            Use mouse to rotate, scroll to zoom, and right-click to pan
          </p>
        </div>
        <ThreeDModelComponent data={threeDModelDemos[selectedModelDemo]} />
      </section>

      {/* Web Content Demos */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Web Content Demos</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Demo:
          </label>
          <select
            className="block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedWebDemo}
            onChange={(e) => setSelectedWebDemo(Number(e.target.value))}
          >
            <option value={0}>Milk Truck 3D Model</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            {webContentDemos[selectedWebDemo].description}
          </p>
          <p className="text-sm text-gray-600">
            Use mouse to rotate, scroll to zoom, and right-click to pan
          </p>
        </div>
        {webContentDemos[selectedWebDemo].url && (
          <WebComponent 
            url={webContentDemos[selectedWebDemo].url as string} 
            type={webContentDemos[selectedWebDemo].contentType || 'web'} 
          />
        )}
      </section>
    </div>
  );
};

export default DemoPage; 