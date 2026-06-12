import { WindowControlls } from "#components";
import windowWrapper from "#hoc/windowWrapper";
import { photosLinks, gallery } from "#constants/index.js";
import { useState } from "react";
import { Mail, Search, LayoutGrid, Image as ImageIcon } from "lucide-react";
import useWindowStore from "#store/window.js";
import clsx from "clsx";

const Photos = () => {
  const [activeLink, setActiveLink] = useState(photosLinks[0].id);
  const [viewMode, setViewMode] = useState("square"); // "square" or "aspect"
  const [timePeriod, setTimePeriod] = useState("all"); // "years", "months", "days", "all"
  const { openWindow, focusWindow } = useWindowStore();

  const handlePhotoClick = (photo, e) => {
    e.stopPropagation();
    const photoData = {
      name: `Photo ${photo.id}`,
      imageUrl: photo.img,
      subtitle: "Gallery Preview",
      description: ["Resolution: High Definition", "Captured and archived in your personal portfolio collection."],
    };
    openWindow("imgfile", photoData);
    setTimeout(() => focusWindow("imgfile"), 0);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border border-black/15 shadow-2xl rounded-xl overflow-hidden font-sans select-none text-[#1d1d1f]">
      {/* Unified macOS Photos Title & Toolbar */}
      <div className="flex items-center px-4 h-12 bg-[#ececec] border-b border-[#dcdcdc] select-none shrink-0 relative">
        <WindowControlls target="photos" />

        {/* Center Segmented Time Control (macOS Photos Library style) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex bg-black/5 p-0.5 rounded-md text-[11px] font-medium text-neutral-500 shadow-inner">
          {["Years", "Months", "Days", "All Photos"].map((tab) => {
            const key = tab.toLowerCase().split(" ")[0];
            const isActive = timePeriod === key;
            return (
              <button
                key={tab}
                onClick={() => setTimePeriod(key)}
                className={clsx(
                  "px-3 py-1 rounded transition-all cursor-default border-none outline-none",
                  isActive ? "bg-white text-neutral-800 shadow-sm" : "hover:text-neutral-800"
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Toolbar items on right */}
        <div className="ml-auto flex items-center gap-3 text-neutral-600">
          {/* Square/Aspect Grid View Toggle */}
          <div className="flex bg-black/5 p-0.5 rounded-md">
            <button
              onClick={() => setViewMode("square")}
              className={clsx(
                "p-1 rounded transition-colors border-none outline-none flex items-center justify-center cursor-default",
                viewMode === "square" ? "bg-white text-neutral-800 shadow-sm" : "hover:text-neutral-800"
              )}
              title="Square Grid"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode("aspect")}
              className={clsx(
                "p-1 rounded transition-colors border-none outline-none flex items-center justify-center cursor-default",
                viewMode === "aspect" ? "bg-white text-neutral-800 shadow-sm" : "hover:text-neutral-800"
              )}
              title="Aspect Grid"
            >
              <ImageIcon size={14} />
            </button>
          </div>

          <div className="h-4 w-px bg-black/10 mx-0.5" />

          <button className="p-1 rounded hover:bg-black/5 active:bg-black/10 transition-colors border-none outline-none flex items-center justify-center cursor-default">
            <Mail size={15} />
          </button>
          <button className="p-1 rounded hover:bg-black/5 active:bg-black/10 transition-colors border-none outline-none flex items-center justify-center cursor-default">
            <Search size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: "520px" }}>
        {/* Sidebar */}
        <div className="sidebar w-52 bg-[#f3f3f6]/80 backdrop-blur-md border-r border-[#e5e5e5] flex flex-col p-3 space-y-4 overflow-y-auto select-none">
          <div>
            <h3 className="px-3 text-[10px] font-semibold uppercase tracking-wider text-black/35 mb-1.5 select-none">
              Photos
            </h3>
            <ul className="space-y-0.5">
              {photosLinks.map((section) => {
                const isActive = activeLink === section.id;
                return (
                  <li
                    key={section.id}
                    onClick={() => setActiveLink(section.id)}
                    className={clsx(
                      "flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-default transition-all duration-150 text-[13px] font-normal select-none",
                      isActive
                        ? "bg-[#007aff] text-white shadow-sm font-medium"
                        : "text-black/85 hover:bg-black/5"
                    )}
                  >
                    <img
                      src={section.icon}
                      alt={section.title}
                      className="w-4 h-4 object-contain"
                      style={{
                        filter: isActive
                          ? "brightness(0) invert(1)"
                          : "none",
                      }}
                    />
                    <span>{section.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Photos Grid Container */}
        <div className="flex-1 bg-white flex flex-col overflow-y-auto p-6 scrollbar-thin">
          <div className="flex-1">
            {viewMode === "square" ? (
              <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3.5 list-none p-0 m-0 w-full">
                {gallery.map((item) => (
                  <li
                    key={item.id}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => handlePhotoClick(item, e)}
                    className="cursor-default overflow-hidden rounded-lg border border-black/[0.04] shadow-[0_1px_4px_rgba(0,0,0,0.04)] aspect-square bg-neutral-50 hover:scale-[1.03] transition-transform duration-200"
                  >
                    <img
                      src={item.img}
                      alt={`Gallery ${item.id}`}
                      className="w-full h-full object-cover block"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-wrap gap-4 items-start justify-start w-full">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => handlePhotoClick(item, e)}
                    className="cursor-default overflow-hidden rounded-lg border border-black/[0.05] shadow-[0_2px_8px_rgba(0,0,0,0.05)] bg-neutral-50 hover:scale-[1.03] transition-transform duration-200 p-1 flex-shrink-0"
                    style={{ height: "135px" }}
                  >
                    <img
                      src={item.img}
                      alt={`Gallery ${item.id}`}
                      className="h-full w-auto object-contain block rounded"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Authentic Footer */}
          <div className="mt-8 pt-4 border-t border-black/5 text-center flex flex-col items-center select-none text-neutral-400 shrink-0">
            <span className="text-[13px] font-semibold text-neutral-600">{gallery.length} Photos</span>
            <span className="text-[10px] text-neutral-400 mt-0.5">Updated Just Now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PhotosWindow = windowWrapper(Photos, "photos");

export default PhotosWindow;