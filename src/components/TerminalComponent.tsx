import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { ContentData } from '../types';

interface TerminalComponentProps {
  data: ContentData;
}

const TerminalComponent: React.FC<TerminalComponentProps> = ({ data }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const currentLineRef = useRef<string>('');
  const promptRef = useRef<string>(data.terminalOptions?.prompt || '$ ');

  // Define command outputs
  const getOutput = (cmd: string, args: string[]): string => {
    // Check for custom commands first
    if (data.terminalOptions?.customCommands?.[cmd.toLowerCase()]) {
      return data.terminalOptions.customCommands[cmd.toLowerCase()](args);
    }

    // Default commands
    switch (cmd.toLowerCase()) {
      case 'help':
        const customCommands = data.terminalOptions?.customCommands
          ? Object.keys(data.terminalOptions.customCommands).map(cmd => 
              `  ${cmd.padEnd(8)} - Custom command`
            )
          : [];
        
        return [
          'Available commands:',
          '  help     - Show this help message',
          '  clear    - Clear the terminal screen',
          '  echo     - Echo the arguments',
          '  date     - Show current date and time',
          '  whoami   - Show current user',
          '  ls       - List files (simulated)',
          '  pwd      - Print working directory (simulated)',
          ...(customCommands.length > 0 ? ['\nCustom commands:', ...customCommands] : []),
        ].join('\r\n');
      case 'echo':
        return args.join(' ');
      case 'date':
        return new Date().toLocaleString();
      case 'whoami':
        return 'guest@terminal';
      case 'ls':
        return [
          'Documents/',
          'Downloads/',
          'Pictures/',
          'README.md',
          'package.json',
        ].join('\r\n');
      case 'pwd':
        return '/home/guest';
      default:
        return `Command not found: ${cmd}. Type "help" for available commands.`;
    }
  };

  useEffect(() => {
    if (!terminalRef.current) return;

    // Clean up previous terminal instance if it exists
    if (termRef.current) {
      termRef.current.dispose();
    }

    // Initialize the terminal with custom options
    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#1a1a1a',
        foreground: '#ffffff',
        cursor: '#ffffff',
        black: '#000000',
        red: '#ff5555',
        green: '#50fa7b',
        yellow: '#f1fa8c',
        blue: '#bd93f9',
        magenta: '#ff79c6',
        cyan: '#8be9fd',
        white: '#f8f8f2',
        brightBlack: '#6272a4',
        brightRed: '#ff6e6e',
        brightGreen: '#69ff94',
        brightYellow: '#ffffa5',
        brightBlue: '#d6acff',
        brightMagenta: '#ff92df',
        brightCyan: '#a4ffff',
        brightWhite: '#ffffff',
        selectionBackground: '#404040',
        selectionForeground: '#ffffff'
      },
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      rows: 20,
    });
    termRef.current = term;

    // Initialize the fit addon
    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;
    term.loadAddon(fitAddon);

    // Open the terminal in the container
    term.open(terminalRef.current);

    // Use setTimeout to ensure the terminal is properly mounted
    setTimeout(() => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }

      // Write initial text if provided
      if (data.terminalOptions?.initialText) {
        term.writeln(data.terminalOptions.initialText);
      } else {
        term.writeln('Welcome to the Terminal Emulator');
        term.writeln('Type "help" for a list of available commands');
      }
      term.write(`\r\n${promptRef.current}`);
    }, 0);

    // Handle window resize
    const handleResize = () => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    };
    window.addEventListener('resize', handleResize);

    // Handle user input
    term.onData((data) => {
      const term = termRef.current;
      if (!term) return;

      if (data === '\r') { // Enter key
        const input = currentLineRef.current.trim();
        if (input) {
          const [cmd, ...args] = input.split(' ');
          if (cmd === 'clear') {
            term.clear();
            term.write(promptRef.current);
          } else {
            const output = getOutput(cmd, args);
            term.writeln('\r\n' + output);
            term.write(`\r\n${promptRef.current}`);
          }
        } else {
          term.write(`\r\n${promptRef.current}`);
        }
        currentLineRef.current = '';
      } else if (data === '\u007f') { // Backspace
        if (currentLineRef.current.length > 0) {
          currentLineRef.current = currentLineRef.current.slice(0, -1);
          term.write('\b \b');
        }
      } else if (data >= ' ' && data <= '~') { // Printable characters
        currentLineRef.current += data;
        term.write(data);
      }
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (termRef.current) {
        termRef.current.dispose();
      }
    };
  }, [data.terminalOptions]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="w-full h-96 rounded-lg shadow-md overflow-hidden bg-[#1a1a1a]">
        <div ref={terminalRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default TerminalComponent; 