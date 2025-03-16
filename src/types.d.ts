// Global type declarations

// Content data interface
export interface ContentData {
  type: string;
  content?: string;
  language?: string;
  code?: string;
  url?: string;
  position?: [number, number];
  zoom?: number;
  // Add other content type properties as needed
}

// Allow importing image files
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
} 