# Multi-Use Canvas

A versatile React application that provides a unified interface for displaying various types of content, including images, videos, code snippets, maps, charts, PDFs, terminal emulators, and 3D models.

## Features

### Content Types
- **Images**: Display images with proper scaling and aspect ratio
- **Videos**: YouTube video player integration
- **Code**: Syntax-highlighted code snippets
- **Maps**: Interactive maps with customizable markers
- **Charts**: Dynamic chart rendering with various chart types
- **PDFs**: PDF document viewer
- **Terminal**: Interactive terminal emulator with custom commands
- **3D Models**: GLTF/GLB model viewer with controls

### Terminal Features
- Basic commands: help, clear, echo, date, whoami, ls, pwd
- Custom command support
- Command history
- Configurable prompt
- Matrix-style visual effects
- Progress tracking and error handling

### 3D Model Features
- GLTF/GLB model loading
- Orbit controls (rotate, pan, zoom)
- Auto-centering and scaling
- Animation support
- Progress tracking
- Reference grid
- Proper lighting setup

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd multi-use-canvas
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Dependencies

- React
- @react-three/fiber - For 3D rendering
- @react-three/drei - For 3D controls and utilities
- @xterm/xterm - For terminal emulation
- @xterm/addon-fit - For terminal resizing
- Three.js - For 3D graphics
- Chart.js - For charts
- Prism.js - For code syntax highlighting
- React-PDF - For PDF viewing
- Leaflet - For maps

## Usage

### Basic Content Display
```typescript
const contentData: ContentData = {
  type: "image",
  src: "path/to/image.jpg"
};

<ContentRouter contentType="image" data={contentData} />
```

### Terminal Usage
```typescript
const terminalData: ContentData = {
  type: "terminal",
  terminalOptions: {
    initialText: "Welcome to the terminal!",
    prompt: "custom$ ",
    customCommands: {
      greet: (args) => `Hello, ${args[0] || 'World'}!`
    }
  }
};

<ContentRouter contentType="terminal" data={terminalData} />
```

### 3D Model Display
```typescript
const modelData: ContentData = {
  type: "3d-model",
  modelUrl: "/path/to/model.gltf"
};

<ContentRouter contentType="3d-model" data={modelData} />
```

## Component Structure

- `ContentRouter`: Main component for routing content types
- Content-specific components:
  - `ImageComponent`
  - `VideoComponent`
  - `CodeComponent`
  - `MapComponent`
  - `ChartComponent`
  - `PDFComponent`
  - `TerminalComponent`
  - `ThreeDModelComponent`

## Development

### Adding New Content Types

1. Update `ContentType` in `types.ts`:
```typescript
export type ContentType = "existing-types" | "new-type";
```

2. Add corresponding data interface in `ContentData`:
```typescript
export interface ContentData {
  // existing fields
  newTypeSpecificField?: string;
}
```

3. Create new component in `components/`:
```typescript
const NewTypeComponent: React.FC<{ data: ContentData }> = ({ data }) => {
  // Implementation
};
```

4. Add to `ContentRouter` switch statement:
```typescript
case "new-type":
  return <NewTypeComponent data={data} />;
```

## Browser Support

- Chrome (recommended for best WebGL support)
- Firefox
- Safari
- Edge

## Known Issues

- Terminal resizing might need manual refresh
- Some 3D models might need specific scaling adjustments
- CORS issues might occur with external 3D models

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
