import { ContentData, ContentType } from './types';

// Terminal Demo Examples
export const terminalDemos: {
  name: string;
  contentType: ContentType;
  contentData: ContentData;
}[] = [
  {
    name: "Basic Terminal Demo",
    contentType: "terminal",
    contentData: {
      commands: [
        { input: "echo 'Hello, world!'", output: "Hello, world!" },
        { input: "ls -la", output: "total 24\ndrwxr-xr-x  5 user group   160 Mar 14 15:30 .\ndrwxr-xr-x  3 user group    96 Mar 14 15:28 ..\n-rw-r--r--  1 user group   127 Mar 14 15:30 index.js\n-rw-r--r--  1 user group 11357 Mar 14 15:29 package-lock.json\n-rw-r--r--  1 user group   284 Mar 14 15:29 package.json" },
        { input: "node -v", output: "v18.15.0" },
      ],
      terminalOptions: {
        initialText: "Welcome to the Basic Terminal Demo!\nThis is a simple terminal with default commands.",
        prompt: "demo$ ",
      }
    }
  },
  {
    name: "Git Workflow Demo",
    contentType: "terminal",
    contentData: {
      commands: [
        { input: "git status", output: "On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n  (use \"git restore <file>...\" to discard changes in working directory)\n        modified:   src/App.tsx\n\nno changes added to commit (use \"git add\" and/or \"git commit -a\")" },
        { input: "git add src/App.tsx", output: "" },
        { input: "git commit -m 'Update App component'", output: "[main 42a5f21] Update App component\n 1 file changed, 15 insertions(+), 5 deletions(-)" },
        { input: "git push origin main", output: "Enumerating objects: 7, done.\nCounting objects: 100% (7/7), done.\nDelta compression using up to 10 threads\nCompressing objects: 100% (4/4), done.\nWriting objects: 100% (4/4), 550 bytes | 550.00 KiB/s, done.\nTotal 4 (delta 3), reused 0 (delta 0), pack-reused 0\nremote: Resolving deltas: 100% (3/3), completed with 3 local objects.\nTo github.com:username/repo.git\n   a1b2c3d..42a5f21  main -> main" },
      ],
      terminalOptions: {
        customCommands: {
          clear: () => "",
          help: () => "Available commands: clear, help, echo, git",
          echo: (args: string[]) => args.join(" "),
          git: (args: string[]) => {
            if (args[0] === "status") return "On branch main\nYour branch is up to date with 'origin/main'.";
            if (args[0] === "add") return `Added ${args[1]} to staging area`;
            return "Unknown git command";
          }
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
    url: "https://sou.ls",
    description: "Souls Web Page",
    contentType: "web"
  },
  {
    type: "web-content",
    url: "/milkTruck.gltf",
    description: "Interactive 3D Milk Truck Model",
    contentType: "3d"
  }
];

// Canvas Demo Examples
export const canvasDemos: ContentData[] = [
  {
    type: "canvas",
    description: "Infinite Canvas for Drawing and Diagramming"
  }
]; 