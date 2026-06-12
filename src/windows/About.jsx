import React from "react";
import windowWrapper from "#hoc/windowWrapper.jsx";
import { WindowControlls } from "#components";

const MacBookSVG = () => (
  <svg
    width="120"
    height="80"
    viewBox="0 0 120 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Screen */}
    <rect x="18" y="6" width="84" height="54" rx="4" fill="#c8c8cc" />
    <rect x="20" y="8" width="80" height="50" rx="3" fill="#1c1c1e" />
    {/* Apple logo on screen */}
    <text
      x="60"
      y="38"
      textAnchor="middle"
      fontSize="16"
      fill="rgba(255,255,255,0.15)"
    ></text>
    {/* Base */}
    <path d="M10 62 L14 60 H106 L110 62 L114 70 H6 L10 62Z" fill="#b0b0b5" />
    <rect x="6" y="70" width="108" height="3" rx="1.5" fill="#a0a0a5" />
    {/* Notch */}
    <rect x="52" y="6" width="16" height="4" rx="2" fill="#b0b0b5" />
  </svg>
);

const SPECS = [
  { label: "Chip", value: "Apple M4" },
  { label: "Memory", value: "8 GB" },
  { label: "Serial number", value: "XXXX000XXXXX" },
  { label: "macOS", value: "Tahoe 26.0" },
];

const About = () => {
  return (
    <div 
      style={{
        width: 340,
        background: "#f6f6f6",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderTop: "1px solid rgba(255, 255, 255, 0.45)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
      className="flex flex-col text-black pb-4 select-none"
    >
      {/* Header with Traffic lights */}
      <div className="flex items-center px-3.5 h-9 flex-shrink-0 bg-transparent relative">
        <WindowControlls target="about" />
      </div>

      {/* MacBook image */}
      <div className="flex justify-center pt-2 pb-2">
        <MacBookSVG />
      </div>

      {/* Model name */}
      <div style={{ textAlign: "center", paddingBottom: 14 }}>
        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: "#1c1c1e",
            lineHeight: 1.3,
          }}
        >
          MacBook Air
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(100,100,100,0.75)",
            marginTop: 2,
          }}
        >
          26, 2025
        </div>
      </div>

      {/* Spec rows */}
      <div
        style={{
          margin: "0 16px 12px",
          borderRadius: 10,
          overflow: "hidden",
          border: "0.5px solid rgba(0,0,0,0.1)",
        }}
      >
        {SPECS.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 14px",
              background:
                i % 2 === 0 ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.6)",
              borderBottom:
                i < SPECS.length - 1 ? "0.5px solid rgba(0,0,0,0.07)" : "none",
              fontSize: 12,
            }}
          >
            <span style={{ color: "rgba(0,0,0,0.55)" }}>{row.label}</span>
            <span style={{ color: "#1c1c1e", fontWeight: 500 }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* More info button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 12,
        }}
      >
        <button
          style={{
            background: "rgba(0,0,0,0.06)",
            border: "0.5px solid rgba(0,0,0,0.12)",
            borderRadius: 7,
            padding: "5px 16px",
            fontSize: 12,
            color: "#1c1c1e",
            cursor: "pointer",
          }}
        >
          More info...
        </button>
      </div>

      {/* Copyright */}
      <div
        style={{
          textAlign: "center",
          padding: "0 16px 4px",
          fontSize: 10,
          color: "rgba(0,0,0,0.35)",
          lineHeight: 1.5,
        }}
      >
        <div>Dhanush Shetty</div>
        <div>© 2024–2025 Dhanush Shetty. All rights reserved.</div>
      </div>
    </div>
  );
};

const AboutWindow = windowWrapper(About, "about");
export default AboutWindow;
