// src/components/VideoComponent.tsx
import React from "react";
import ReactPlayer from "react-player";
import { ContentData } from "../types";

interface VideoComponentProps {
  data: ContentData;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ data }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative aspect-video">
        <ReactPlayer
          url={data.src}
          width="100%"
          height="100%"
          controls
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default VideoComponent;