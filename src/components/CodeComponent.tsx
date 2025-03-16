// src/components/CodeComponent.tsx
import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // Include a Prism theme
import { ContentData } from "../types";

interface CodeComponentProps {
  data: ContentData;
}

const CodeComponent: React.FC<CodeComponentProps> = ({ data }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [data]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <pre className="rounded-lg shadow-md overflow-auto">
        <code className={`language-${data.language || "javascript"}`}>
          {data.code}
        </code>
      </pre>
    </div>
  );
};

export default CodeComponent;