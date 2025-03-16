// src/components/ImageComponent.tsx
import React from "react";
import { ContentData } from "../types";

interface ImageComponentProps {
  data: ContentData;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ data }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <img
        src={data.src}
        alt="Dynamic Image"
        className="w-full h-auto rounded-lg shadow-md"
      />
    </div>
  );
};

export default ImageComponent;