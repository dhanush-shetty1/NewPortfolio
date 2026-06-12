import React, { useState, useEffect } from "react";
import windowWrapper from "#hoc/windowWrapper.jsx";
import { WindowControlls } from "#components";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [activeOp, setActiveOp] = useState(null);
  const [activeOpHighlight, setActiveOpHighlight] = useState(null);
  const [shouldReset, setShouldReset] = useState(false);

  const handleNum = (num) => {
    if (display === "0" || shouldReset) {
      setDisplay(String(num));
      setShouldReset(false);
    } else {
      if (display.replace(/[^0-9]/g, "").length < 9) {
        setDisplay(display + num);
      }
    }
    setActiveOpHighlight(null);
  };

  const handleDot = () => {
    if (shouldReset) {
      setDisplay("0.");
      setShouldReset(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
    setActiveOpHighlight(null);
  };

  const handleClear = () => {
    setDisplay("0");
    setStoredValue(null);
    setActiveOp(null);
    setActiveOpHighlight(null);
    setShouldReset(false);
  };

  const handleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleOp = (op) => {
    const value = parseFloat(display);
    if (activeOp && !shouldReset) {
      const result = calculate(storedValue, value, activeOp);
      setDisplay(String(result));
      setStoredValue(result);
    } else {
      setStoredValue(value);
    }
    setActiveOp(op);
    setActiveOpHighlight(op);
    setShouldReset(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b !== 0 ? a / b : "Error";
      default:
        return b;
    }
  };

  const handleEqual = () => {
    if (!activeOp) return;
    const value = parseFloat(display);
    const result = calculate(storedValue, value, activeOp);

    if (typeof result === "number") {
      if (result.toString().length > 10) {
        setDisplay(result.toPrecision(7));
      } else {
        setDisplay(String(result));
      }
    } else {
      setDisplay(result);
    }

    setStoredValue(null);
    setActiveOp(null);
    setActiveOpHighlight(null);
    setShouldReset(true);
  };

  // Bind physical keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore key events if user is typing in an input or textarea
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }

      const key = e.key;
      if (/[0-9]/.test(key)) {
        handleNum(parseInt(key));
      } else if (key === ".") {
        handleDot();
      } else if (key === "+") {
        handleOp("+");
      } else if (key === "-") {
        handleOp("-");
      } else if (key === "*") {
        handleOp("*");
      } else if (key === "/") {
        handleOp("/");
      } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        handleEqual();
      } else if (key === "Escape" || key.toLowerCase() === "c") {
        handleClear();
      } else if (key === "Backspace") {
        e.preventDefault();
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay("0");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, storedValue, activeOp, shouldReset]);

  // Dynamic font size scaling
  const getFontSizeClass = () => {
    const len = display.length;
    if (len <= 6) return "text-[38px]";
    if (len === 7) return "text-[32px]";
    if (len === 8) return "text-[28px]";
    return "text-[22px]";
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#f4f4f4] text-black rounded-xl border border-black/5 shadow-2xl overflow-hidden font-display">
      {/* Unified Light Window Header */}
      <div className="flex items-center px-3.5 select-none h-9 flex-shrink-0 bg-[#f4f4f4] border-none relative">
        <WindowControlls target="calculator" />
        <span className="absolute left-1/2 -translate-x-1/2 text-[11px] text-black/30 font-medium">
          Calculator
        </span>
      </div>

      {/* Screen Display */}
      <div className="flex flex-col justify-end items-end h-[72px] bg-[#f4f4f4] px-5 select-text">
        <div
          className={`${getFontSizeClass()} font-light tracking-wide truncate max-w-full text-right leading-none pb-2 transition-all duration-150 text-[#1d1d1f]`}
        >
          {display}
        </div>
      </div>

      {/* Button Grid (macOS/iOS light mode layout) */}
      <div className="grid grid-cols-4 gap-2.5 px-3 pb-4 pt-1 flex-1 bg-[#f4f4f4] justify-items-center">
        {/* Row 1 */}
        <button
          onClick={handleClear}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#e4e4e6] text-black text-[14px] font-medium hover:bg-[#d4d4d6] active:bg-[#c4c4c6] cursor-pointer transition-all duration-150"
        >
          {display === "0" && !storedValue ? "AC" : "C"}
        </button>
        <button
          onClick={handleSign}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#e4e4e6] text-black text-[14px] font-medium hover:bg-[#d4d4d6] active:bg-[#c4c4c6] cursor-pointer transition-all duration-150"
        >
          +/-
        </button>
        <button
          onClick={handlePercent}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#e4e4e6] text-black text-[14px] font-medium hover:bg-[#d4d4d6] active:bg-[#c4c4c6] cursor-pointer transition-all duration-150"
        >
          %
        </button>
        <button
          onClick={() => handleOp("/")}
          className={`flex items-center justify-center h-10 w-10 rounded-full text-[19px] font-semibold cursor-pointer transition-all duration-150 active:bg-white active:text-[#ff9f0a] ${
            activeOpHighlight === "/"
              ? "bg-white text-[#ff9f0a] border border-[#ff9f0a]/30 shadow-sm"
              : "bg-[#ff9f0a] text-white hover:bg-[#e08c02]"
          }`}
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => handleNum(7)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ffffff] text-black text-[16px] font-medium border border-[#e5e5e7]/60 shadow-sm hover:bg-[#f4f4f6] active:bg-[#e9e9eb] cursor-pointer transition-all duration-150"
        >
          7
        </button>
        <button
          onClick={() => handleNum(8)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ffffff] text-black text-[16px] font-medium border border-[#e5e5e7]/60 shadow-sm hover:bg-[#f4f4f6] active:bg-[#e9e9eb] cursor-pointer transition-all duration-150"
        >
          8
        </button>
        <button
          onClick={() => handleNum(9)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ffffff] text-black text-[16px] font-medium border border-[#e5e5e7]/60 shadow-sm hover:bg-[#f4f4f6] active:bg-[#e9e9eb] cursor-pointer transition-all duration-150"
        >
          9
        </button>
        <button
          onClick={() => handleOp("*")}
          className={`flex items-center justify-center h-10 w-10 rounded-full text-[19px] font-semibold cursor-pointer transition-all duration-150 active:bg-white active:text-[#ff9f0a] ${
            activeOpHighlight === "*"
              ? "bg-white text-[#ff9f0a] border border-[#ff9f0a]/30 shadow-sm"
              : "bg-[#ff9f0a] text-white hover:bg-[#e08c02]"
          }`}
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => handleNum(4)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ffffff] text-black text-[16px] font-medium border border-[#e5e5e7]/60 shadow-sm hover:bg-[#f4f4f6] active:bg-[#e9e9eb] cursor-pointer transition-all duration-150"
        >
          4
        </button>
        <button
          onClick={() => handleNum(5)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ffffff] text-black text-[16px] font-medium border border-[#e5e5e7]/60 shadow-sm hover:bg-[#f4f4f6] active:bg-[#e9e9eb] cursor-pointer transition-all duration-150"
        >
          5
        </button>
        <button
          onClick={() => handleNum(6)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ffffff] text-black text-[16px] font-medium border border-[#e5e5e7]/60 shadow-sm hover:bg-[#f4f4f6] active:bg-[#e9e9eb] cursor-pointer transition-all duration-150"
        >
          6
        </button>
        <button
          onClick={() => handleOp("-")}
          className={`flex items-center justify-center h-10 w-10 rounded-full text-[19px] font-semibold cursor-pointer transition-all duration-150 active:bg-white active:text-[#ff9f0a] ${
            activeOpHighlight === "-"
              ? "bg-white text-[#ff9f0a] border border-[#ff9f0a]/30 shadow-sm"
              : "bg-[#ff9f0a] text-white hover:bg-[#e08c02]"
          }`}
        >
          −
        </button>

        {/* Row 4 */}
        <button
          onClick={() => handleNum(1)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ffffff] text-black text-[16px] font-medium border border-[#e5e5e7]/60 shadow-sm hover:bg-[#f4f4f6] active:bg-[#e9e9eb] cursor-pointer transition-all duration-150"
        >
          1
        </button>
        <button
          onClick={() => handleNum(2)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ffffff] text-black text-[16px] font-medium border border-[#e5e5e7]/60 shadow-sm hover:bg-[#f4f4f6] active:bg-[#e9e9eb] cursor-pointer transition-all duration-150"
        >
          2
        </button>
        <button
          onClick={() => handleNum(3)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ffffff] text-black text-[16px] font-medium border border-[#e5e5e7]/60 shadow-sm hover:bg-[#f4f4f6] active:bg-[#e9e9eb] cursor-pointer transition-all duration-150"
        >
          3
        </button>
        <button
          onClick={() => handleOp("+")}
          className={`flex items-center justify-center h-10 w-10 rounded-full text-[19px] font-semibold cursor-pointer transition-all duration-150 active:bg-white active:text-[#ff9f0a] ${
            activeOpHighlight === "+"
              ? "bg-white text-[#ff9f0a] border border-[#ff9f0a]/30 shadow-sm"
              : "bg-[#ff9f0a] text-white hover:bg-[#e08c02]"
          }`}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => handleNum(0)}
          className="flex items-center pl-4 h-10 w-[90px] col-span-2 rounded-full bg-[#ffffff] text-black text-[16px] font-medium border border-[#e5e5e7]/60 shadow-sm hover:bg-[#f4f4f6] active:bg-[#e9e9eb] cursor-pointer transition-all duration-150"
        >
          0
        </button>
        <button
          onClick={handleDot}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ffffff] text-black text-[16px] font-medium border border-[#e5e5e7]/60 shadow-sm hover:bg-[#f4f4f6] active:bg-[#e9e9eb] cursor-pointer transition-all duration-150"
        >
          .
        </button>
        <button
          onClick={handleEqual}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ff9f0a] text-white text-[19px] font-semibold hover:bg-[#e08c02] active:bg-[#c67b00] cursor-pointer transition-all duration-150 shadow-sm"
        >
          =
        </button>
      </div>
    </div>
  );
};

const CalculatorWindow = windowWrapper(Calculator, "calculator");

export default CalculatorWindow;
