// src/components/PDFComponent.tsx
import React from "react";
import { ContentData } from "../types";

interface PDFComponentProps {
  data: ContentData;
}

const PDFComponent: React.FC<PDFComponentProps> = ({ data }) => {
  return (
    <div className="w-full max-w-2xl mx-auto h-96">
      <iframe
        src={data.src || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"}
        title="PDF Viewer"
        className="w-full h-full rounded-lg shadow-md"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default PDFComponent;