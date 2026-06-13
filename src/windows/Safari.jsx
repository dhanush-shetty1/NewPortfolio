import { WindowControlls } from '#components'
import { safariSocialLinks, safariCodingLinks, safariNews } from '#constants'
import windowWrapper from '#hoc/windowWrapper'
import useNotificationStore from '#store/notification'
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
  WifiOff,
} from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const Safari = () => {
  const { wifiOn, activeNetwork } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const prevWifiOn = useRef(wifiOn);

  useEffect(() => {
    if (wifiOn && !prevWifiOn.current) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (!wifiOn) {
      setLoading(false);
    }
    prevWifiOn.current = wifiOn;
  }, [wifiOn]);

  return (
    <div className="w-full h-full flex flex-col bg-[#f3f3f6] rounded-xl overflow-hidden font-sans select-none text-[#1d1d1f]">
      {/* Unified macOS Safari Title & Toolbar */}
      <div className="flex items-center px-4 h-12 bg-[#ececec] border-b border-[#dcdcdc] select-none shrink-0 relative">
        <WindowControlls target="safari" />

        {/* Sidebar and Back/Forward Navigation */}
        <div className="flex items-center gap-1.5 ml-16">
          <button className="p-1 rounded hover:bg-black/5 active:bg-black/10 transition-colors border-none outline-none flex items-center justify-center cursor-default text-neutral-600">
            <PanelLeft size={16} />
          </button>
          <div className="flex items-center gap-1 ml-1.5">
            <button className="p-1 rounded hover:bg-black/5 active:bg-black/10 transition-colors border-none outline-none flex items-center justify-center cursor-default text-neutral-400">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 rounded hover:bg-black/5 active:bg-black/10 transition-colors border-none outline-none flex items-center justify-center cursor-default text-neutral-400">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Centered Search/URL bar */}
        <div className="flex-1 max-w-[480px] mx-auto relative">
          <div className="flex items-center justify-center gap-1.5 bg-[#e1e1e4]/75 hover:bg-[#dbdbdf] focus-within:bg-white focus-within:shadow-[0_1px_3px_rgba(0,0,0,0.06)] focus-within:ring-[1px] focus-within:ring-blue-500/50 rounded-lg px-3 py-1.5 text-xs text-neutral-600 border border-black/[0.03] transition-all overflow-hidden relative">
            <ShieldHalf size={13} className="text-neutral-500 shrink-0" />
            <span className="text-emerald-600 text-[10px] shrink-0 font-semibold select-none mr-0.5">🔒 dhanush.dev</span>
            <input
              type="text"
              placeholder="Search or enter website name"
              defaultValue="https://dhanushshetty.dev"
              className="flex-1 text-center focus:text-left outline-none bg-transparent text-neutral-800 placeholder:text-neutral-500 text-[11px] font-normal"
            />
            <span className="text-[11px] text-neutral-400 cursor-default font-semibold select-none hover:text-neutral-600 transition-colors">↻</span>

            {/* macOS blue page load progress indicator */}
            {loading && (
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "2.5px",
                  background: "#007aff",
                }}
              />
            )}
          </div>
        </div>

        {/* Action icons bar */}
        <div className="flex items-center gap-3 ml-auto text-neutral-600">
          <button className="p-1 rounded hover:bg-black/5 active:bg-black/10 transition-colors border-none outline-none flex items-center justify-center cursor-default">
            <Share size={15} />
          </button>
          <button className="p-1 rounded hover:bg-black/5 active:bg-black/10 transition-colors border-none outline-none flex items-center justify-center cursor-default">
            <Plus size={15} />
          </button>
          <button className="p-1 rounded hover:bg-black/5 active:bg-black/10 transition-colors border-none outline-none flex items-center justify-center cursor-default">
            <Copy size={15} />
          </button>
        </div>
      </div>

      {/* Safari Start Page Content */}
      {!wifiOn ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#f3f3f6] text-center select-none font-sans">
          <div className="w-16 h-16 bg-neutral-200/50 rounded-full flex items-center justify-center text-neutral-400 mb-6">
            <WifiOff size={28} />
          </div>
          <h2 className="text-[19px] font-semibold text-[#1d1d1f] mb-2">You are not connected to the Internet</h2>
          <p className="text-xs text-neutral-500 max-w-sm leading-relaxed mb-6">
            Safari can't open the page because your computer is offline. Turn on Wi-Fi from the menu bar to reconnect.
          </p>
          <button 
            onClick={() => alert("Checking connection status... Please turn on Wi-Fi in the menu bar to connect to Dhanush's portfolio.")}
            className="px-4 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-[11px] font-medium rounded border border-neutral-300/50 shadow-sm cursor-default active:bg-neutral-300/70 transition-colors"
          >
            Diagnostics...
          </button>
        </div>
      ) : loading ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#f3f3f6] text-center select-none font-sans">
          <div className="flex flex-col items-center gap-4">
            <svg 
              className="animate-spin h-7 w-7 text-[#007aff]" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="3"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-xs text-neutral-500 font-medium tracking-wide">
              Connecting to {activeNetwork || "Wi-Fi"} and loading page...
            </span>
          </div>
        </div>
      ) : (
        <div className="safari-content flex-1 p-8 overflow-y-auto max-h-[calc(100vh-200px)] bg-[#f3f3f6] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-sky-100/20 via-pink-100/10 to-[#f3f3f6] scrollbar-thin scrollbar-thumb-black/10">
          <div className="max-w-4xl mx-auto space-y-12">
          
          {/* SNS Links Section */}
          <div>
            <h2 className="text-[19px] font-semibold text-[#1d1d1f] tracking-tight mb-4 select-none">Find me online</h2>
            <div className="grid grid-cols-5 gap-6">
              {safariSocialLinks.map(({ id, name, color, letter, icon, link }) => (
                <a
                  key={id}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110"
                >
                  <div
                    style={{ backgroundColor: icon ? 'transparent' : color }}
                    className="w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:shadow-lg transition-shadow"
                  >
                    {icon ? (
                      <img src={icon} alt={name} className="w-full h-full object-contain p-2" />
                    ) : (
                      letter
                    )}
                  </div>
                  <p className="text-sm font-medium text-center text-gray-700">
                    {name}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Coding Links Section */}
          <div>
            <h2 className="text-[19px] font-semibold text-[#1d1d1f] tracking-tight mb-4 select-none">Developer Presence</h2>
            <div className="grid grid-cols-7 gap-4">
              {safariCodingLinks.map(({ id, name, color, letter, icon, link }) => (
                <a
                  key={id}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110"
                >
                  <div
                    style={{ backgroundColor: icon ? 'transparent' : color }}
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xs group-hover:shadow-lg transition-shadow"
                  >
                    {icon ? (
                      <img src={icon} alt={name} className="w-full h-full object-contain p-2" />
                    ) : (
                      letter
                    )}
                  </div>
                  <p className="text-xs font-medium text-center text-gray-700 line-clamp-2">
                    {name}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Frequently Visited Section */}
          <div>
            <h2 className="text-[19px] font-semibold text-[#1d1d1f] tracking-tight mb-4 select-none">Frequently Visited</h2>
            <div className="grid grid-cols-5 gap-6">
              {safariCodingLinks.slice(0, 5).map(({ id, name, color, letter, icon }) => (
                <div
                  key={id}
                  className="flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-110"
                >
                  <div
                    style={{ backgroundColor: icon ? 'transparent' : color }}
                    className="w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:shadow-lg transition-shadow"
                  >
                    {icon ? (
                      <img src={icon} alt={name} className="w-full h-full object-contain p-2" />
                    ) : (
                      letter
                    )}
                  </div>
                  <p className="text-sm font-medium text-center text-gray-700">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Report / Developer Updates Section */}
          <div>
            <h2 className="text-[19px] font-semibold text-[#1d1d1f] tracking-tight mb-4 select-none">Developer Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safariNews.map(({ id, title, source, date }) => (
                <div
                  key={id}
                  className="bg-white/70 border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)] backdrop-blur-md rounded-2xl p-4 transition-all duration-200 hover:border-black/[0.1] hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="text-xl bg-black/5 w-9 h-9 rounded-lg flex items-center justify-center select-none">📰</div>
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold tracking-wide uppercase text-neutral-400 mb-0.5">{source}</p>
                      <h3 className="font-semibold text-[13px] text-[#1d1d1f] leading-snug mb-1.5">{title}</h3>
                      <p className="text-[10px] text-neutral-400 font-medium">{date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          </div>
        </div>
      )}
    </div>
  )
}

const SafariWindow = windowWrapper(Safari, 'safari')

export default SafariWindow