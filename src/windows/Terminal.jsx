import React, { useState, useEffect, useRef } from "react";
import { WindowControlls } from "#components";
import { techStack } from "#constants";
import windowWrapper from "#hoc/windowWrapper";

const Terminal = () => {
  const [history, setHistory] = useState([
    { text: `Last login: ${new Date().toDateString()} on ttys001`, type: "system" },
    { text: "Welcome to macOS Terminal! Type 'help' to begin.", type: "system" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  // Auto scroll to bottom when history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) {
      setHistory((prev) => [...prev, { text: "dhanush@macbook ~ % ", type: "prompt" }]);
      return;
    }

    const args = trimmed.split(" ");
    const command = args[0].toLowerCase();
    const newHistory = [
      ...history,
      { text: `dhanush@macbook ~ % ${trimmed}`, type: "input" },
    ];

    switch (command) {
      case "help":
        newHistory.push({
          text: `Available commands:
  skills   - Show Dhanush Shetty's technical skills & tech stack
  about    - Learn more about Dhanush Shetty
  contact  - Get social and contact details
  neofetch - Show system information & system specifications
  date     - Show current date & time
  clear    - Clear terminal screen`,
          type: "output",
        });
        break;

      case "skills":
        const lines = techStack.map(
          (stack) => `  ${stack.category}: ${stack.items.join(", ")}`
        );
        newHistory.push({
          text: "Tech Stack Loaded Successfully:\n" + lines.join("\n"),
          type: "output",
        });
        break;

      case "about":
        newHistory.push({
          text: `Hey, I'm Dhanush Shetty!
I am a Full Stack Developer specializing in high-fidelity React interfaces, GSAP animations, responsive layouts, and interactive user experiences. I love bridging design and code.`,
          type: "output",
        });
        break;

      case "contact":
        newHistory.push({
          text: `Contact Info:
  Email:    dhanush@example.com
  GitHub:   github.com/dhanush-shetty1
  LinkedIn: linkedin.com/in/dhanush-shetty`,
          type: "output",
        });
        break;

      case "neofetch":
        newHistory.push({
          text: `dhanush@macbook
---------------
OS: macOS Sequoia 15.0
Kernel: Darwin 24.0.0
Uptime: 2 hours, 18 mins
Shell: zsh 5.9
Resolution: 2560x1600
DE: Aqua
WM: Quartz Compositor
Terminal: Dhanush Shetty's Terminal
CPU: Apple M3 Max
Memory: 32 GB`,
          type: "output",
        });
        break;

      case "date":
        newHistory.push({ text: new Date().toString(), type: "output" });
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        newHistory.push({
          text: `zsh: command not found: ${command}. Type 'help' for a list of available commands.`,
          type: "error",
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  // Focus terminal input on container click
  const focusTerminalInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="w-full h-full flex flex-col bg-white text-black font-mono border border-black/15 shadow-2xl rounded-xl overflow-hidden select-none">
      {/* macOS Light Terminal Titlebar */}
      <div
        className="flex items-center px-3 h-9 bg-[#eaeaea] border-b border-[#d1d1d1] select-none relative"
        onDoubleClick={focusTerminalInput}
      >
        <WindowControlls target="terminal" />
        <span className="absolute left-1/2 -translate-x-1/2 text-xs text-black/65 font-sans font-medium pointer-events-none">
          Dhanush Shetty's Terminal
        </span>
      </div>

      {/* Terminal Screen Body */}
      <div
        className="flex-1 p-4 overflow-y-auto text-[13px] leading-relaxed cursor-text select-text"
        onClick={focusTerminalInput}
        style={{
          maxHeight: "calc(100% - 36px)",
          fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
        }}
      >
        <div className="space-y-1">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap ${
                line.type === "system"
                  ? "text-black/50"
                  : line.type === "error"
                  ? "text-red-600"
                  : line.type === "input"
                  ? "font-semibold"
                  : "text-black"
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Input Prompter Line */}
        <div className="flex items-center mt-1 w-full">
          <span className="font-semibold shrink-0 select-none">
            dhanush@macbook ~ %&nbsp;
          </span>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none font-mono text-[13px] text-black select-text"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {/* Blinking Block Cursor indicator */}
            {inputRef.current !== document.activeElement && (
              <span className="absolute bg-black w-2 h-4 animate-pulse pointer-events-none" style={{ left: `${input.length * 7.8}px` }} />
            )}
          </div>
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

const TerminalWindow = windowWrapper(Terminal, "terminal");

export default TerminalWindow;