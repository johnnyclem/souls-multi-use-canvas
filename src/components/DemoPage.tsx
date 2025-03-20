// src/components/DemoPage.tsx
import React, { useState } from "react";
import TerminalComponent from "./TerminalComponent";
import ThreeDModelComponent from "./ThreeDModelComponent";
import WebComponent from "./WebComponent";
import { InfinityCanvas } from "./InfinityCanvas";
import { terminalDemos, threeDModelDemos, webContentDemos, canvasDemos } from "../demos";
import { ThemeProvider } from "./ThemeProvider";

interface Demo {
  name: string;
  data: any;
}

const DemoPage: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="container mx-auto px-4 py-8 bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-8 text-center">Component Demos</h1>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Terminal Demos</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Select a demo:
            </label>
            <select
              className="block w-full max-w-md rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
              defaultValue="0"
              onChange={(e) => {
                // Demo selection logic
              }}
            >
              {terminalDemos.map((demo, index) => (
                <option key={index} value={index}>
                  {demo.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              These examples showcase the terminal component's capabilities.
            </p>
          </div>
          {terminalDemos[0] && <TerminalComponent data={terminalDemos[0]} />}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">3D Model Demos</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Select a demo:
            </label>
            <select
              className="block w-full max-w-md rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
              defaultValue="0"
              onChange={(e) => {
                // Demo selection logic
              }}
            >
              {threeDModelDemos.map((demo, index) => (
                <option key={index} value={index}>
                  {demo.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              These examples demonstrate loading and viewing 3D models.
            </p>
            <p className="text-sm text-muted-foreground">
              You can rotate the model by dragging, zoom with scroll, and pan with right-click drag.
            </p>
          </div>
          {threeDModelDemos[0] && <ThreeDModelComponent data={threeDModelDemos[0]} />}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Web Content Demos</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Select a demo:
            </label>
            <select
              className="block w-full max-w-md rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
              defaultValue="0"
              onChange={(e) => {
                // Demo selection logic
              }}
            >
              {webContentDemos.map((demo, index) => (
                <option key={index} value={index}>
                  {demo.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              These examples show how to embed external web content.
            </p>
            <p className="text-sm text-muted-foreground">
              Note: Some websites might block iframe embedding due to X-Frame-Options headers.
            </p>
          </div>
          {webContentDemos[0] && (
            <WebComponent 
              url={webContentDemos[0].url || ""} 
              type={webContentDemos[0].contentType || 'web'} 
            />
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Infinite Canvas Demos</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Select a demo:
            </label>
            <select
              className="block w-full max-w-md rounded-md border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary"
              defaultValue="0"
              onChange={(e) => {
                // Demo selection logic
              }}
            >
              {canvasDemos.map((demo, index) => (
                <option key={index} value={index}>
                  {demo.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              These examples demonstrate the infinite canvas capabilities.
            </p>
            <p className="text-sm text-muted-foreground">
              You can draw, add shapes, text, and more on this infinite canvas.
            </p>
          </div>
          {canvasDemos[0] && <InfinityCanvas url={canvasDemos[0].url} />}
        </section>
      </div>
    </ThemeProvider>
  );
};

export default DemoPage; 