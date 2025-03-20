/**
 * markdownCanvasConverter.ts
 * 
 * Utility functions for converting tldraw canvas data to and from structured markdown.
 * This allows saving and loading infinity canvas documents as structured markdown files.
 */

import { Editor, TLAsset, TLAssetId, TLPage, TLPageId, TLShape, TLShapeId } from '@tldraw/tldraw';
import matter from 'gray-matter';
import yaml from 'js-yaml';

/**
 * Converts tldraw canvas data to structured markdown
 * @param editor The tldraw Editor instance
 * @returns A markdown string representation of the canvas data
 */
export const canvasToMarkdown = (editor: Editor): string => {
  // Get the current state of the editor
  const pages = editor.getPages();
  const currentPageId = editor.getCurrentPageId();
  const assets = Object.values(editor.getAssets());

  // Start with document-level front matter
  let markdown = `---
currentPage: ${currentPageId}
---

# Tldraw Document

## Pages

`;

  // Add each page and its shapes
  for (const page of pages) {
    markdown += `### ${page.name}
---
id: ${page.id}
name: ${page.name}
---

#### Shapes

`;

    // Get all shapes for this page by temporarily switching to it
    const originalPage = editor.getCurrentPageId();
    editor.setCurrentPage(page.id);
    const pageShapes = editor.getCurrentPageShapes();
    // Restore original page
    editor.setCurrentPage(originalPage);
    
    for (const shape of pageShapes) {
      markdown += `##### Shape ${shape.id}
---
type: ${shape.type}
id: ${shape.id}
x: ${shape.x}
y: ${shape.y}
rotation: ${shape.rotation}
props:
${serializeProps(shape.props)}
---

`;
    }
  }

  // Add assets section
  if (assets.length > 0) {
    markdown += `## Assets\n`;

    for (const asset of assets) {
      markdown += `---
id: ${asset.id}
type: ${asset.type}
`;

      // For image assets, include base64 data
      if (asset.type === 'image' && asset.props.src) {
        markdown += `data: "${asset.props.src}"
`;
      }

      markdown += `---\n\n`;
    }
  }

  return markdown;
};

/**
 * Converts structured markdown to tldraw canvas data
 * @param markdown The markdown string representation
 * @param editor The tldraw Editor instance
 * @returns boolean indicating success of the operation
 */
export const markdownToCanvas = async (markdown: string, editor: Editor): Promise<boolean> => {
  try {
    // Parse the markdown
    const { metadata, pages, shapes, assets } = parseMarkdown(markdown);

    // Clear the current document by deleting all shapes and pages except the default one
    const currentPages = editor.getPages();
    for (const page of currentPages) {
      // Delete all shapes on the page - use the editor API safely
      const currentPageId = editor.getCurrentPageId();
      editor.setCurrentPage(page.id);
      const pageShapeIds = editor.getCurrentPageShapeIds();
      
      if (pageShapeIds.size > 0) {
        // Convert Set to Array
        const shapeIdsArray = Array.from(pageShapeIds);
        editor.deleteShapes(shapeIdsArray);
      }
      
      // Restore the current page
      editor.setCurrentPage(currentPageId);
      
      // Delete all pages except the default one
      if (currentPages.length > 1 && page.id !== editor.getCurrentPageId()) {
        editor.deletePage(page.id);
      }
    }

    // Add assets first
    for (const asset of assets) {
      editor.createAssets([asset]);
    }

    // Create pages
    for (const page of pages) {
      // Check if the page already exists
      const existingPage = editor.getPage(page.id as TLPageId);
      if (existingPage) {
        editor.updatePage({ id: page.id as TLPageId, name: page.name });
      } else {
        editor.createPage({ id: page.id as TLPageId, name: page.name });
      }
    }

    // Create shapes
    for (const shape of shapes) {
      editor.createShapes([shape]);
    }

    // Set the current page
    if (metadata.currentPage) {
      editor.setCurrentPage(metadata.currentPage as TLPageId);
    }

    return true;
  } catch (error) {
    console.error('Error loading canvas from markdown:', error);
    return false;
  }
};

/**
 * Serializes props object to YAML format for markdown
 */
const serializeProps = (props: Record<string, any>): string => {
  let yaml = '';
  
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'object' && value !== null) {
      yaml += `  ${key}:\n${serializeNestedProps(value, 4)}`;
    } else {
      const stringValue = typeof value === 'string' ? `"${value}"` : value;
      yaml += `  ${key}: ${stringValue}\n`;
    }
  }
  
  return yaml;
};

/**
 * Serializes nested props with proper indentation
 */
const serializeNestedProps = (obj: Record<string, any>, indent: number): string => {
  let yaml = '';
  const spaces = ' '.repeat(indent);
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      yaml += `${spaces}${key}:\n${serializeNestedProps(value, indent + 2)}`;
    } else {
      const stringValue = typeof value === 'string' ? `"${value}"` : value;
      yaml += `${spaces}${key}: ${stringValue}\n`;
    }
  }
  
  return yaml;
};

/**
 * Parses markdown to extract canvas data
 */
interface ParsedMarkdown {
  metadata: {
    currentPage: string;
  };
  pages: Array<{
    id: string;
    name: string;
    index: number;
    meta: Record<string, any>;
  }>;
  shapes: TLShape[];
  assets: TLAsset[];
}

/**
 * Parses structured markdown to extract canvas data
 */
const parseMarkdown = (markdown: string): ParsedMarkdown => {
  const result: ParsedMarkdown = {
    metadata: {
      currentPage: '',
    },
    pages: [],
    shapes: [],
    assets: [],
  };

  // Parse front matter using gray-matter
  const { data, content } = matter(markdown);
  if (data.currentPage) {
    result.metadata.currentPage = data.currentPage;
  }

  // Helper function to extract sections using regex
  const extractSections = (
    content: string, 
    sectionRegex: RegExp, 
    callback: (match: RegExpExecArray) => void
  ) => {
    let match: RegExpExecArray | null;
    // Use exec in a loop instead of matchAll for better compatibility
    while ((match = sectionRegex.exec(content)) !== null) {
      callback(match);
    }
  };

  // Extract pages
  const pageRegex = /### (.*?)\n---\n([\s\S]*?)\n---/g;
  extractSections(content, pageRegex, (match) => {
    const pageName = match[1].trim();
    const pageContent = match[2];
    
    const idMatch = pageContent.match(/id: (.*)/);
    if (idMatch) {
      const pageId = idMatch[1].trim();
      result.pages.push({
        id: pageId,
        name: pageName,
        index: result.pages.length,
        meta: {},
      });
    }
  });

  // Extract shapes
  const shapeRegex = /##### Shape (.*?)\n---\n([\s\S]*?)\n---/g;
  extractSections(content, shapeRegex, (match) => {
    const shapeContent = match[2];
    
    // Use YAML parser for more reliable extraction
    try {
      const shapeData = yaml.load(`---\n${shapeContent}\n---`) as Record<string, any>;
      
      // Create shape with proper typing
      const shape: any = {
        id: shapeData.id as TLShapeId,
        type: shapeData.type,
        x: parseFloat(shapeData.x),
        y: parseFloat(shapeData.y),
        rotation: parseFloat(shapeData.rotation),
        props: shapeData.props || {},
      };
      
      result.shapes.push(shape as TLShape);
    } catch (error) {
      console.error('Error parsing shape:', error);
    }
  });

  // Extract assets
  const assetRegex = /## Assets\n---\n([\s\S]*?)\n---/g;
  extractSections(content, assetRegex, (match) => {
    const assetContent = match[1];
    
    try {
      const assetData = yaml.load(`---\n${assetContent}\n---`) as Record<string, any>;
      
      const asset: any = {
        id: assetData.id as TLAssetId,
        type: assetData.type,
        props: {},
      };
      
      // For image assets, extract data
      if (assetData.data && asset.type === 'image') {
        asset.props = {
          ...asset.props,
          src: assetData.data,
        };
      }
      
      result.assets.push(asset as TLAsset);
    } catch (error) {
      console.error('Error parsing asset:', error);
    }
  });

  return result;
};

/**
 * Downloads a string as a file
 */
export const downloadAsFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  
  URL.revokeObjectURL(url);
};

/**
 * Reads a file as text
 */
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}; 