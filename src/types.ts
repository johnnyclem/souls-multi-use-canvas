// src/types.ts
export type ContentType =
  | "image"
  | "video"
  | "code"
  | "map"
  | "chart"
  | "pdf"
  | "3d-model"
  | "terminal"
  | "unsupported"
  | "agent-wallet";

export interface ContentData {
  type: ContentType;
  src?: string; // For images, videos, PDFs, etc.
  code?: string; // For code snippets
  language?: string; // For code snippets (e.g., "javascript")
  position?: [number, number]; // For map (latitude, longitude)
  zoom?: number; // For map
  chartType?: "bar" | "line" | "pie"; // For chart
  chartData?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string[];
      borderColor?: string;
      borderWidth?: number;
    }[];
  }; // For chart
  modelUrl?: string; // For 3D models (GLTF format)
  terminalOptions?: {
    initialText?: string;
    customCommands?: Record<string, (args: string[]) => string>;
    prompt?: string;
  }; // For terminal emulator
  walletAddress?: string;
  [key: string]: any; // Flexible for future content types
}