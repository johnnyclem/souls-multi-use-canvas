// src/components/DemoPage.tsx
import React, { useState } from "react";
import TerminalComponent from "./TerminalComponent";
import ThreeDModelComponent from "./ThreeDModelComponent";
import WebComponent from "./WebComponent";
import { InfinityCanvas } from "./InfinityCanvas";
import { terminalDemos, threeDModelDemos, webContentDemos, canvasDemos } from "../demos";
import { ThemeProvider } from "./ThemeProvider";
import ContentRouter from "./ContentRouter";
import { ContentType, ContentData } from "../types";

// A reusable component for displaying demo sections
const DemoContainer: React.FC<{
  title: string;
  demos: {
    name: string;
    contentType: ContentType;
    contentData: ContentData;
  }[];
  description?: string;
  additionalInfo?: string;
}> = ({ title, demos, description, additionalInfo }) => {
  const [selectedDemo, setSelectedDemo] = useState(0);
  
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Select a demo:
        </label>
        <select
          className="block w-full max-w-md rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
          value={selectedDemo}
          onChange={(e) => setSelectedDemo(parseInt(e.target.value))}
        >
          {demos.map((demo, index) => (
            <option key={index} value={index}>
              {demo.name}
            </option>
          ))}
        </select>
      </div>
      {(description || additionalInfo) && (
        <div className="mb-4">
          {description && (
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
          )}
          {additionalInfo && (
            <p className="text-sm text-muted-foreground">{additionalInfo}</p>
          )}
        </div>
      )}
      <div className="w-full rounded-lg overflow-hidden border border-border" style={{ height: '500px' }}>
        {demos[selectedDemo] && <ContentRouter 
          contentType={demos[selectedDemo].contentType} 
          data={demos[selectedDemo].contentData} 
        />}
      </div>
    </section>
  );
};

const DemoPage: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="container mx-auto px-4 py-8 bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-8 text-center">Component Demos</h1>
        
        <DemoContainer 
          title="Terminal Demos" 
          demos={terminalDemos}
          description="These examples showcase the terminal component's capabilities."
        />
        
        <DemoContainer 
          title="3D Model Demos" 
          demos={threeDModelDemos}
          description="These examples demonstrate loading and viewing 3D models."
          additionalInfo="You can rotate the model by dragging, zoom with scroll, and pan with right-click drag."
        />
        
        <DemoContainer 
          title="Web Content Demos" 
          demos={webContentDemos}
          description="These examples show how to embed external web content."
          additionalInfo="Note: Some websites might block iframe embedding due to X-Frame-Options headers."
        />
        
        <DemoContainer 
          title="Infinite Canvas Demos" 
          demos={canvasDemos}
          description="These examples demonstrate the infinite canvas capabilities."
          additionalInfo="You can draw, add shapes, text, and more on this infinite canvas. Some demos support saving and loading as structured markdown."
        />
      </div>
    </ThemeProvider>
  );
};

export default DemoPage; 