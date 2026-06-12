import windowWrapper from "#hoc/windowWrapper.jsx";
import { WindowControlls } from "#components";
import useWindowStore from "#store/window.js";
import React from "react";
import clsx from "clsx";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl, subtitle, description } = data;
  const hasMetadata = subtitle || (Array.isArray(description) && description.length > 0);

  return (
    <div className="w-full flex flex-col bg-[#f5f5f7] text-[#1d1d1f] rounded-xl overflow-hidden font-sans select-none border border-black/15 shadow-2xl">
      {/* Unified macOS Light Header */}
      <div className="flex items-center px-4 h-11 bg-[#ececec] border-b border-[#dcdcdc] select-none relative shrink-0">
        <WindowControlls target="imgfile" />
        <span className="absolute left-1/2 -translate-x-1/2 text-[13px] text-neutral-700 font-semibold pointer-events-none">
          {name}
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ minHeight: "360px", maxHeight: "550px" }}>
        {/* Left Pane: Image Container */}
        <div className="flex-1 bg-white flex items-center justify-center p-5 relative min-h-[320px]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="max-w-full max-h-[460px] object-contain rounded shadow-md border border-black/5"
            />
          ) : (
            <div className="text-neutral-400 text-sm">No Image Available</div>
          )}
        </div>

        {/* Right Pane: macOS Inspector Sidebar (if metadata exists) */}
        {hasMetadata && (
          <div className="w-60 border-l border-[#dcdcdc] bg-[#f5f5f7] flex flex-col p-5 overflow-y-auto shrink-0 select-text">
            {/* Title / Header in Sidebar */}
            <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 select-none">
              Info
            </h4>
            
            {subtitle && (
              <h3 className="text-sm font-semibold text-neutral-800 mb-3 border-b border-black/5 pb-2">
                {subtitle}
              </h3>
            )}

            {Array.isArray(description) && description.length > 0 && (
              <div className="space-y-2.5 text-xs text-neutral-600 leading-relaxed">
                {description.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ImageWindow = windowWrapper(Image, "imgfile");

export default ImageWindow;
