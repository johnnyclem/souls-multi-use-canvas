// src/types.ts
export type ContentType =
  | "image"
  | "video"
  | "code"
  | "map"
  | "chart"
  | "pdf"
  | "unsupported";

export interface ContentData {
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
  [key: string]: any; // Flexible for future content types
}