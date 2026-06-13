import React, { useState, useEffect } from "react";

const loadingInterval = 10; 
const bootingInterval = 500;

export default function Boot({ restart, sleep, setBooting }) {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Fade in the Apple logo
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (restart && !sleep) {
      const timer = setTimeout(() => {
        setLoading(true);
        setPercent(0);
      }, 1000); // 1-second delay to allow smooth fade out/in transitions
      return () => clearTimeout(timer);
    }
  }, [restart, sleep]);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setPercent((prev) => {
        const newPercent = prev + 0.6; // Smoother and more realistic progress speed
        if (newPercent >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setBooting(false);
            setLoading(false);
          }, bootingInterval);
          return 100;
        }
        return newPercent;
      });
    }, loadingInterval);
    return () => clearInterval(interval);
  }, [loading, setBooting]);

  const handleClick = () => {
    if (sleep) {
      setBooting(false);
    } else if (restart || loading) {
      return;
    } else {
      setLoading(true);
      setPercent(0);
    }
  };

  return (
    <div
      className="w-full h-full bg-black flex flex-col items-center justify-center select-none"
      onClick={handleClick}
      style={{ cursor: sleep ? "pointer" : "default" }}
    >
      <div className="flex flex-col items-center gap-16 relative">
        <div
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? "scale(1)" : "scale(0.9)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <img
            src="/images/awapple.png"
            alt="Apple Logo"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
            onError={(e) => {
              e.currentTarget.src = "/images/apple.png";
            }}
          />
        </div>

        {/* Loading progress / Action hint */}
        <div className="h-10 w-48 sm:w-56 flex items-center justify-center relative">
          {loading && (
            <div
              className="w-full overflow-hidden relative"
              style={{
                height: "4px",
                borderRadius: "2px",
                backgroundColor: "rgba(255,255,255,0.15)",
                opacity: showContent ? 1 : 0,
                transition: "opacity 0.4s ease 0.2s",
              }}
            >
              <span
                className="absolute top-0 left-0 h-full"
                style={{
                  width: `${percent}%`,
                  borderRadius: "2px",
                  background: "linear-gradient(90deg, rgba(255,255,255,0.9), white)",
                  transition: "width 0.05s linear",
                }}
              />
            </div>
          )}
          {!restart && !loading && (
            <div
              style={{
                opacity: showContent ? 0.6 : 0,
                transition: "opacity 0.8s ease 0.5s",
                animation: showContent
                  ? "subtlePulse 2s ease-in-out infinite 1.5s"
                  : "none",
              }}
            >
              <span className="text-sm text-gray-300 tracking-wide">
                Click to {sleep ? "wake up" : "boot"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
