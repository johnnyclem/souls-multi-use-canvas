// src/components/ContentRouter.tsx
import React from "react";
import { ContentType, ContentData } from "../types";
import ImageComponent from "./ImageComponent";
import VideoComponent from "./VideoComponent";
import CodeComponent from "./CodeComponent";
import MapComponent from "./MapComponent";
import ChartComponent from "./ChartComponent";
import PDFComponent from "./PDFComponent";
import TerminalComponent from "./TerminalComponent";
import ThreeDModelComponent from "./ThreeDModelComponent";
import AgentWalletComponent from "./AgentWalletComponent";

interface ContentRouterProps {
  contentType: ContentType;
  data: ContentData;
}

const ContentRouter: React.FC<ContentRouterProps> = ({ contentType, data }) => {
  switch (contentType) {
    case "image":
      return <ImageComponent data={data} />;
    case "video":
      return <VideoComponent data={data} />;
    case "code":
      return <CodeComponent data={data} />;
    case "map":
      return <MapComponent data={data} />;
    case "chart":
      return <ChartComponent data={data} />;
    case "pdf":
      return <PDFComponent data={data} />;
    case "terminal":
      return <TerminalComponent data={data} />;
    case "3d-model":
      return <ThreeDModelComponent data={data} />;
    case "agent-wallet":
      if (!data.walletAddress) {
        return <div className="text-red-500">Wallet address is required</div>;
      }
      return <AgentWalletComponent walletAddress={data.walletAddress} />;
    default:
      return <div className="text-red-500">Unsupported content type: {contentType}</div>;
  }
};

export default ContentRouter;