// src/App.tsx
import React, { useState } from "react";
import "./index.css";
import ContentRouter from "./components/ContentRouter";
import { ContentType, ContentData } from "./types";

const App: React.FC = () => {
  const [contentType, setContentType] = useState<ContentType>("image");
  const [contentData, setContentData] = useState<ContentData>({
    src: "https://via.placeholder.com/600x400",
  });

  const handleContentChange = (type: ContentType, data: ContentData) => {
    setContentType(type);
    setContentData(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6">Multi-Use Canvas</h1>

      {/* Controls for demo */}
      <div className="mb-6 space-x-4 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() =>
            handleContentChange("image", {
              src: "https://via.placeholder.com/600x400",
            })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Image
        </button>
        <button
          onClick={() =>
            handleContentChange("video", {
              src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Code
        </button>
        <button
          onClick={() =>
            handleContentChange("map", {
              position: [40.7128, -74.006], // New York
              zoom: 12,
            })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Map
        </button>
        <button
          onClick={() =>
            handleContentChange("chart", {
              chartType: "bar",
              chartData: {
                labels: ["Jan", "Feb", "Mar"],
                datasets: [
                  {
                    label: "Sales",
                    data: [10, 20, 15],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    borderColor: "#000",
                    borderWidth: 1,
                  },
                ],
              },
            })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Chart
        </button>
        <button
          onClick={() =>
            handleContentChange("pdf", {
              src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          PDF
        </button>
      </div>

      {/* Dynamic content rendering */}
      <div className="w-full max-w-4xl">
        <ContentRouter contentType={contentType} data={contentData} />
      </div>
    </div>
  );
};

export default App;