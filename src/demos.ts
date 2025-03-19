import { ContentData } from './types';

// Terminal Demo Examples
export const terminalDemos: ContentData[] = [
  {
    type: "terminal",
    terminalOptions: {
      initialText: "Welcome to the Basic Terminal Demo!\nThis is a simple terminal with default commands.",
      prompt: "demo$ ",
    }
  },
  {
    type: "terminal",
    terminalOptions: {
      initialText: "Custom Commands Terminal Demo\nTry these custom commands: calc, greet, weather",
      prompt: "custom$ ",
      customCommands: {
        calc: (args) => {
          try {
            // Simple calculator that evaluates basic math expressions
            const expr = args.join(' ');
            // Using Function instead of eval for better security
            const result = new Function('return ' + expr)();
            return `${expr} = ${result}`;
          } catch (e) {
            return 'Invalid expression. Try something like: 2 + 2';
          }
        },
        greet: (args) => {
          const name = args[0] || 'stranger';
          const time = new Date().getHours();
          let greeting = '';
          if (time < 12) greeting = 'Good morning';
          else if (time < 18) greeting = 'Good afternoon';
          else greeting = 'Good evening';
          return `${greeting}, ${name}!`;
        },
        weather: (args) => {
          const conditions = ['sunny', 'rainy', 'cloudy', 'windy', 'snowy'];
          const temps = [18, 22, 25, 28, 15];
          const i = Math.floor(Math.random() * conditions.length);
          return `Current weather: ${conditions[i]} with temperature of ${temps[i]}°C`;
        }
      }
    }
  },
  {
    type: "terminal",
    terminalOptions: {
      initialText: "Matrix-Style Terminal\nType 'matrix' to start the effect",
      prompt: "neo@matrix:~$ ",
      customCommands: {
        matrix: () => {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
          const lines = [];
          for (let i = 0; i < 10; i++) {
            let line = '';
            for (let j = 0; j < 40; j++) {
              line += chars[Math.floor(Math.random() * chars.length)];
            }
            lines.push(line);
          }
          return lines.join('\r\n');
        }
      }
    }
  }
];

// 3D Model Demo Examples
export const threeDModelDemos: ContentData[] = [
  {
    type: "3d-model",
    modelUrl: "/milkTruck.gltf",
    description: "Basic rotating cube demo"
  },
  {
    type: "3d-model",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf",
    description: "Classic GLTF Duck model"
  },
  {
    type: "3d-model",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/FlightHelmet/glTF/FlightHelmet.gltf",
    description: "Detailed Flight Helmet model"
  }
];

// Web Content Demo Examples
export const webContentDemos: ContentData[] = [
  {
    type: "web-content",
    url: "https://example.com",
    description: "Example Web Page",
    contentType: "web"
  },
  {
    type: "web-content",
    url: "/milkTruck.gltf",
    description: "Interactive 3D Milk Truck Model",
    contentType: "3d"
  }
]; 