// src/App.tsx
import React, { useState } from "react";
import "./index.css";
import ContentRouter from "./components/ContentRouter";
import { ContentType, ContentData } from "./types";
import { Link } from "react-router-dom";
import { terminalDemos, threeDModelDemos, webContentDemos, canvasDemos } from "./demos";
import { ThemeProvider, ThemeToggle } from "./components/ThemeProvider";

const App: React.FC = () => {
  const [contentType, setContentType] = useState<ContentType>("image");
  const [contentData, setContentData] = useState<ContentData>({
    src: "https://placehold.co/600x400/EEE/31343C",
  });

  const handleContentChange = (type: ContentType, data: ContentData) => {
    setContentType(type);
    setContentData(data);
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8">
        <header className="w-full flex justify-between items-center px-8 mb-6">
          <h1 className="text-3xl font-bold">Multi-Use Canvas</h1>
          <ThemeToggle />
        </header>

        {/* Controls for demo */}
        <div className="mb-6 space-x-4 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() =>
              handleContentChange("image", {
                src: "https://placehold.co/600x400/EEE/31343C",
              })
            }
            className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90"
          >
            Image
          </button>
          <button
            onClick={() =>
              handleContentChange("video", {
                src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
              })
            }
            className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90"
          >
            Video
          </button>
          <button
            onClick={() =>
              handleContentChange("code", {
                code: "const hello = () => console.log('Hello, World!');",
                language: "javascript",
              })
            }
            className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90"
          >
            Code
          </button>
          <button
            onClick={() =>
              handleContentChange("chart", {
                chartType: "line",
                chartData: {
                  labels: ["January", "February", "March", "April", "May"],
                  datasets: [
                    {
                      label: "Sales",
                      data: [50, 60, 70, 80, 90],
                      backgroundColor: ["rgb(75, 192, 192)"],
                      borderColor: "rgb(75, 192, 192)",
                      borderWidth: 1,
                    },
                  ],
                },
              })
            }
            className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90"
          >
            Chart
          </button>
          <button
            onClick={() =>
              handleContentChange("map", {
                position: [51.505, -0.09],
                zoom: 13,
              })
            }
            className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90"
          >
            Map
          </button>
          <button
            onClick={() => handleContentChange("terminal", { commands: [] })}
            className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90"
          >
            Terminal
          </button>
          <button
            onClick={() => handleContentChange("3d-model", { modelUrl: "" })}
            className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90"
          >
            3D Model
          </button>
          <button
            onClick={() => handleContentChange("web-content", { url: "" })}
            className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90"
          >
            Web Content
          </button>
          <button
            onClick={() => handleContentChange("canvas", { items: [] })}
            className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90"
          >
            Canvas
          </button>
        </div>

        <div className="w-full max-w-4xl mb-8">
          <ContentRouter contentType={contentType} data={contentData} />
        </div>

        <div className="mt-4">
          <Link to="/demos" className="text-primary hover:underline">
            View all demos →
          </Link>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;