// src/components/PDFComponent.tsx
import React from "react";
import { ContentData } from "../types";

interface PDFComponentProps {
  data: ContentData;
}

const PDFComponent: React.FC<PDFComponentProps> = ({ data }) => {
  const pdfUrl = data.src || `${process.env.PUBLIC_URL}/dummy.pdf`;
  // Use the browser's PDF viewer
  const viewerUrl = `${window.location.origin}${pdfUrl}`;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="w-full h-[600px] rounded-lg shadow-md overflow-hidden">
          <embed
            src={viewerUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        </div>
        <a 
          href={viewerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open PDF in New Tab
        </a>
      </div>
    </div>
  );
};

export default PDFComponent;