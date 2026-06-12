import { WindowControlls } from "#components";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Folder,
  File,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash2,
  Clock,
  Laptop,
  FolderOpen
} from "lucide-react";
import windowWrapper from "#hoc/windowWrapper";
import { locations } from "#constants/index.js";
import useLocationStore from "#store/location.js";
import useWindowStore from "#store/window.js";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [selectedItem, setSelectedItem] = useState(null);

  // Functional navigation history
  const [history, setHistory] = useState([activeLocation]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isNavigating = useRef(false);

  useEffect(() => {
    if (isNavigating.current) {
      isNavigating.current = false;
      return;
    }
    // Update history when location changes from outside (e.g. desktop)
    if (activeLocation && history[currentIndex]?.id !== activeLocation.id) {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(activeLocation);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    }
    setSelectedItem(null);
  }, [activeLocation]);

  const handleBack = () => {
    if (currentIndex > 0) {
      isNavigating.current = true;
      const prevLoc = history[currentIndex - 1];
      setCurrentIndex(currentIndex - 1);
      setActiveLocation(prevLoc);
    }
  };

  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      isNavigating.current = true;
      const nextLoc = history[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      setActiveLocation(nextLoc);
    }
  };

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.fileType === "txt") return openWindow("txtfile", item);
    if (item.fileType === "img") return openWindow("imgfile", item);
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");
  };

  const getFileIcon = (item) => {
    const size = viewMode === "grid" ? "w-10 h-10" : "w-4 h-4";
    return (
      <img
        src={item.icon || "/images/folder.png"}
        alt=""
        className={clsx(size, "object-contain select-none pointer-events-none")}
      />
    );
  };

  const getFileKind = (item) => {
    if (item.kind === "folder") return "Folder";
    if (item.fileType === "txt") return "Plain Text Document";
    if (item.fileType === "img") return "PNG Image";
    if (item.fileType === "pdf") return "PDF Document";
    return "Internet Shortcut";
  };

  const getFileSize = (item) => {
    if (item.kind === "folder") return "--";
    if (item.fileType === "txt") return "1.2 KB";
    if (item.fileType === "img") return "840 KB";
    if (item.fileType === "pdf") return "2.4 MB";
    return "180 bytes";
  };

  const getSidebarIcon = (item, isSelected) => {
    return (
      <img
        src={item.icon || "/images/folder.png"}
        className={clsx(
          "w-4 h-4 object-contain select-none pointer-events-none",
          isSelected ? "brightness-0 invert" : ""
        )}
        alt=""
      />
    );
  };

  const renderList = (name, items) => {
    if (!items || items.length === 0) return null;
    return (
      <div>
        <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-black/35 mb-1.5">
          {name}
        </h3>
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isSelected = activeLocation?.id === item.id;
            return (
              <li
                key={item.id}
                onClick={() => setActiveLocation(item)}
                className={clsx(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-default transition-all duration-150 text-[13px] font-normal select-none",
                  isSelected
                    ? "bg-[#007aff] text-white shadow-sm font-medium"
                    : "text-black/85 hover:bg-black/5"
                )}
              >
                {getSidebarIcon(item, isSelected)}
                <span className="truncate">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="w-full h-[32rem] flex flex-col bg-white border border-black/15 shadow-2xl rounded-xl overflow-hidden font-sans text-[#1d1d1f]">
      {/* macOS Finder Unified Titlebar/Toolbar */}
      <div className="flex items-center px-4 h-12 bg-[#ececec] border-b border-[#dcdcdc] select-none shrink-0 relative">
        <WindowControlls target="finder" />

        {/* Back and Forward Navigation chevrons */}
        <div className="flex items-center gap-1.5 ml-16">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="p-1 rounded hover:bg-black/5 active:bg-black/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors border-none outline-none flex items-center justify-center cursor-default text-neutral-600"
            aria-label="Back"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleForward}
            disabled={currentIndex === history.length - 1}
            className="p-1 rounded hover:bg-black/5 active:bg-black/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors border-none outline-none flex items-center justify-center cursor-default text-neutral-600"
            aria-label="Forward"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Segmented Grid/List View Controller */}
        <div className="flex bg-black/5 p-0.5 rounded-md ml-6 select-none shrink-0 border border-black/[0.03]">
          <button
            onClick={() => setViewMode("grid")}
            className={clsx(
              "p-1 rounded transition-colors border-none outline-none flex items-center justify-center cursor-default",
              viewMode === "grid" ? "bg-white text-neutral-800 shadow-sm" : "text-neutral-500 hover:text-neutral-800"
            )}
            title="Icon Grid View"
          >
            <LayoutGrid size={13} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={clsx(
              "p-1 rounded transition-colors border-none outline-none flex items-center justify-center cursor-default",
              viewMode === "list" ? "bg-white text-neutral-800 shadow-sm" : "text-neutral-500 hover:text-neutral-800"
            )}
            title="List Details View"
          >
            <List size={13} />
          </button>
        </div>



        {/* Search Input on right */}
        <div className="ml-auto flex items-center bg-black/5 border border-black/5 rounded-md px-2 py-0.5 w-44">
          <Search size={13} className="text-black/40 mr-1.5 shrink-0" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent border-none outline-none font-sans text-xs text-black/80 placeholder:text-black/35 cursor-default"
            disabled
          />
        </div>
      </div>

      {/* Main Panel split layout */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "460px" }}>
        
        {/* Left Sidebar */}
        <div className="sidebar w-48 bg-[#f3f3f6]/80 backdrop-blur-md border-r border-[#e5e5e5] flex flex-col p-3 space-y-4 overflow-y-auto select-none">
          {renderList("Favorites", Object.values(locations))}
        </div>

        {/* Right Content View */}
        <div
          className="flex-1 bg-white overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          {viewMode === "grid" ? (
            /* ── Icon Grid View ── */
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-6 p-6">
              {activeLocation?.children?.map((item) => {
                const isSelected = selectedItem === item.id;
                return (
                  <div
                    key={item.id}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item.id);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      openItem(item);
                    }}
                    className="flex flex-col items-center gap-1.5 cursor-default group"
                    style={{ width: "80px" }}
                  >
                    {/* Icon Container */}
                    <div
                      className={clsx(
                        "w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-150",
                        isSelected ? "bg-black/5 border border-black/10" : "group-hover:bg-black/[0.03]"
                      )}
                    >
                      <div className="group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
                        {getFileIcon(item)}
                      </div>
                    </div>

                    {/* File/Folder Title */}
                    <span
                      className={clsx(
                        "text-[12px] text-center font-sans tracking-wide leading-tight px-1.5 py-0.5 rounded-md break-words whitespace-normal max-w-full",
                        isSelected
                          ? "bg-[#007aff] text-white"
                          : "text-neutral-800 group-hover:bg-neutral-100"
                      )}
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "anywhere"
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── List Details View ── */
            <table className="w-full text-left border-collapse select-none">
              <thead>
                <tr className="border-b border-neutral-100 text-[11px] font-semibold text-neutral-400 select-none bg-neutral-50/50">
                  <th className="py-2 px-4 font-semibold w-1/2">Name</th>
                  <th className="py-2 px-4 font-semibold">Kind</th>
                  <th className="py-2 px-4 font-semibold text-right pr-6">Size</th>
                </tr>
              </thead>
              <tbody>
                {activeLocation?.children?.map((item) => {
                  const isSelected = selectedItem === item.id;
                  return (
                    <tr
                      key={item.id}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item.id);
                      }}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        openItem(item);
                      }}
                      className={clsx(
                        "text-xs border-b border-neutral-50 cursor-default transition-all",
                        isSelected
                          ? "bg-[#007aff]/15 text-[#007aff]"
                          : "text-neutral-800 hover:bg-neutral-50/80 odd:bg-white even:bg-neutral-50/30"
                      )}
                    >
                      <td className="py-2.5 px-4 font-medium flex items-center gap-2 min-w-0">
                        {getFileIcon(item)}
                        <span className="truncate">{item.name}</span>
                      </td>
                      <td className="py-2.5 px-4 text-neutral-500 font-normal">
                        {getFileKind(item)}
                      </td>
                      <td className="py-2.5 px-4 text-neutral-500 font-normal text-right pr-6">
                        {getFileSize(item)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const FinderWindow = windowWrapper(Finder, "finder");

export default FinderWindow;