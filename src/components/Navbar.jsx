import React, { useState, useRef, useEffect } from 'react'
import dayjs from 'dayjs'
import useWindowStore from '#store/window'
import useNotificationStore from '#store/notification'
import { Wifi, WifiOff, Lock, Check } from 'lucide-react'

const TopBarItem = React.forwardRef(({ children, className = "", onClick, onMouseEnter, forceHover }, ref) => {
  const [hovered, setHovered] = useState(false);
  const bg = forceHover || hovered ? "rgba(255,255,255,0.15)" : "transparent";

  return (
    <div
      ref={ref}
      className={`flex items-center gap-1 h-6 px-2 cursor-pointer rounded transition-colors duration-150 select-none ${className}`}
      style={{
        background: bg,
      }}
      onClick={onClick}
      onMouseEnter={() => {
        setHovered(true);
        if (onMouseEnter) onMouseEnter();
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
});

TopBarItem.displayName = "TopBarItem";

const AppleMenu = ({
  logout,
  shut,
  restart,
  sleep,
  onClose,
  openAboutMac,
  btnRef,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        (!btnRef.current || !btnRef.current.contains(event.target))
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [btnRef, onClose]);

  const handleSleep = () => {
    sleep();
    onClose();
  };
  const handleRestart = () => {
    restart();
    onClose();
  };
  const handleShut = () => {
    shut();
    onClose();
  };
  const handleAbout = () => {
    openAboutMac();
    onClose();
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "3px 10px",
    fontSize: "13px",
    lineHeight: "18px",
    cursor: "default",
    borderRadius: "4px",
    transition: "background 0.05s ease, color 0.05s ease",
    userSelect: "none",
    margin: "1px 5px",
  };

  const MenuItem = ({ children, onClick, hint }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <div
        className="text-black"
        style={{
          ...itemStyle,
          background: hovered ? "rgb(14, 115, 237)" : "transparent",
          color: hovered ? "#fff" : "inherit",
        }}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span>{children}</span>
        {hint && (
          <span
            style={{
              fontSize: "11px",
              opacity: hovered ? 0.9 : 0.4,
              marginLeft: "auto",
              letterSpacing: "1px",
            }}
          >
            {hint}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: "36px",
        left: "8px",
        width: "240px",
        padding: "5px 0",
        zIndex: 999999,
        background: "rgba(255, 255, 255, 0.72)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderTop: "1px solid rgba(255, 255, 255, 0.45)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontWeight: 400,
        color: "#1c1c1e",
      }}
    >
      <MenuItem onClick={handleAbout}>About This Mac</MenuItem>
      <div className="h-px bg-black/10 my-1 mx-2" />
      <MenuItem>System Settings...</MenuItem>
      <MenuItem>App Store...</MenuItem>
      <div className="h-px bg-black/10 my-1 mx-2" />
      <MenuItem>Recent Items ›</MenuItem>
      <div className="h-px bg-black/10 my-1 mx-2" />
      <MenuItem hint="⌥⌘⎋">Force Quit...</MenuItem>
      <div className="h-px bg-black/10 my-1 mx-2" />
      <MenuItem onClick={handleSleep}>Sleep</MenuItem>
      <MenuItem onClick={handleRestart}>Restart...</MenuItem>
      <MenuItem onClick={handleShut}>Shut Down...</MenuItem>
      <div className="h-px bg-black/10 my-1 mx-2" />
      <MenuItem onClick={logout} hint="⌃⌘Q">Lock Screen</MenuItem>
      <MenuItem onClick={logout} hint="⇧⌘Q">Log Out Dhanush Shetty...</MenuItem>
    </div>
  );
};

const WifiMenu = ({
  wifiOn,
  toggleWifi,
  onClose,
  btnRef,
  activeNetwork,
  connectNetwork,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        (!btnRef.current || !btnRef.current.contains(event.target))
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [btnRef, onClose]);

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "6px 12px",
    fontSize: "13px",
    lineHeight: "18px",
    cursor: "default",
    borderRadius: "6px",
    transition: "background 0.05s ease, color 0.05s ease",
    userSelect: "none",
    margin: "1px 6px",
    color: "#1c1c1e",
  };

  const WifiMenuItem = ({ children, onClick, active = false, checked = false, hasLock = false }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <div
        style={{
          ...itemStyle,
          background: hovered ? "rgb(14, 115, 237)" : "transparent",
          color: hovered ? "#fff" : "#1c1c1e",
          fontWeight: active ? 600 : 400,
        }}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ width: 16, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8 }}>
          {checked && <Check size={14} style={{ color: hovered ? "#fff" : "rgb(14, 115, 237)" }} />}
        </div>
        <span style={{ flex: 1 }}>{children}</span>
        {hasLock && <Lock size={11} style={{ opacity: hovered ? 0.9 : 0.4, marginLeft: "auto" }} />}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: "36px",
        right: "210px",
        width: "280px",
        padding: "8px 0",
        zIndex: 999999,
        background: "rgba(255, 255, 255, 0.72)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderTop: "1px solid rgba(255, 255, 255, 0.45)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
        borderRadius: "10px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#1c1c1e",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 14px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              background: wifiOn ? "rgb(14, 115, 237)" : "rgba(120, 120, 128, 0.2)",
              color: wifiOn ? "white" : "#1c1c1e",
              borderRadius: "50%",
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {wifiOn ? <Wifi size={14} /> : <WifiOff size={14} />}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "13px", fontWeight: 600 }}>Wi-Fi</span>
            <span style={{ fontSize: "10px", color: "rgba(0,0,0,0.5)", marginTop: -2 }}>
              {wifiOn ? "On" : "Off"}
            </span>
          </div>
        </div>
        <div
          onClick={toggleWifi}
          style={{
            width: "36px",
            height: "20px",
            borderRadius: "10px",
            background: wifiOn ? "#34c759" : "rgba(120, 120, 128, 0.32)",
            position: "relative",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "white",
              position: "absolute",
              top: "2px",
              left: wifiOn ? "18px" : "2px",
              transition: "left 0.2s ease",
              boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      </div>

      <div className="h-px bg-black/10 my-1.5 mx-3" />

      {wifiOn ? (
        <>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.4)", padding: "4px 14px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Known Networks
          </div>
          <WifiMenuItem 
            active={activeNetwork === "Dhanush_5G"} 
            checked={activeNetwork === "Dhanush_5G"}
            onClick={() => connectNetwork("Dhanush_5G")}
          >
            Dhanush_5G
          </WifiMenuItem>
          
          <div className="h-px bg-black/10 my-1.5 mx-3" />
          
          <div style={{ fontSize: "11px", fontWeight: 600, color: "rgba(0,0,0,0.4)", padding: "4px 14px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Other Networks
          </div>
          <WifiMenuItem 
            active={activeNetwork === "iPhone Hotspot"} 
            checked={activeNetwork === "iPhone Hotspot"}
            hasLock 
            onClick={() => connectNetwork("iPhone Hotspot")}
          >
            iPhone Hotspot
          </WifiMenuItem>
          <WifiMenuItem 
            active={activeNetwork === "Airport_Free_WiFi"} 
            checked={activeNetwork === "Airport_Free_WiFi"}
            hasLock 
            onClick={() => connectNetwork("Airport_Free_WiFi")}
          >
            Airport_Free_WiFi
          </WifiMenuItem>
          <WifiMenuItem 
            active={activeNetwork === "Home_Network"} 
            checked={activeNetwork === "Home_Network"}
            hasLock 
            onClick={() => connectNetwork("Home_Network")}
          >
            Home_Network
          </WifiMenuItem>
        </>
      ) : (
        <div style={{ padding: "12px 14px", fontSize: "12px", color: "rgba(0,0,0,0.45)", textAlign: "center", lineHeight: 1.4 }}>
          No networks available.<br />Turn on Wi-Fi to see nearby networks.
        </div>
      )}

      <div className="h-px bg-black/10 my-1.5 mx-3" />
      <WifiMenuItem onClick={() => alert("Wi-Fi Settings are managed by macOS System Preferences.")}>
        Wi-Fi Settings...
      </WifiMenuItem>
    </div>
  );
};

const BatteryIcon = ({ level, charging }) => {
  // Outline of battery has width 20, fill has width 15 max
  const fillWidth = Math.max(1, Math.min(15, 15 * (level / 100)));
  
  return (
    <svg viewBox="0 0 24 12" width="22" height="11" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-95 text-white">
      {/* Battery outline */}
      <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" />
      {/* Battery tip on right */}
      <path d="M22 3.5C22.5523 3.5 23 3.94772 23 4.5V7.5C23 8.05228 22.5523 8.5 22 8.5H21.5V3.5H22Z" fill="currentColor" />
      {/* Level fill */}
      <rect x="2.5" y="2.5" width={fillWidth} height="7" rx="1" fill="currentColor" />
      {/* Charging lightning bolt overlay */}
      {charging && (
        <path
          d="M10.5 1.5L6.5 6.5H10L9.5 10.5L14 5.5H10L10.5 1.5Z"
          fill="currentColor"
          stroke="black"
          strokeWidth="0.5"
          style={{ transform: "translate(1px, 0.5px) scale(0.85)" }}
        />
      )}
    </svg>
  );
};

const Navbar = ({ onOpenAbout, sleepMac, restartMac, shutMac, setLogin }) => {
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const appleBtnRef = useRef(null);

  const { 
    toggleNotificationCenter, 
    showNotificationCenter,
    wifiOn,
    toggleWifi,
    showWifiPopup,
    toggleWifiPopup,
    closeWifiPopup,
    activeNetwork,
    connectNetwork,
  } = useNotificationStore();
  const [time, setTime] = useState(dayjs());
  const wifiBtnRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleAppleMenu = () => {
    setShowAppleMenu(!showAppleMenu);
  };

  const handleLogout = () => {
    if (setLogin) setLogin(false);
  };

  useEffect(() => {
    let batteryObj = null;

    const updateBattery = () => {
      if (batteryObj) {
        setBatteryLevel(Math.round(batteryObj.level * 100));
        setIsCharging(batteryObj.charging);
      }
    };

    if (typeof navigator.getBattery === "function") {
      navigator.getBattery().then((battery) => {
        batteryObj = battery;
        updateBattery();

        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
      });
    }

    return () => {
      if (batteryObj) {
        batteryObj.removeEventListener("levelchange", updateBattery);
        batteryObj.removeEventListener("chargingchange", updateBattery);
      }
    };
  }, []);

  return (
    <nav
      className="w-full h-9 pt-1 px-4 fixed top-0 left-0 flex items-center justify-between text-white select-none"
      style={{
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        zIndex: 99999,
        textShadow: '0 0.5px 2px rgba(0,0,0,0.25)',
        fontSize: '13px',
        fontWeight: 400,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div className="flex items-center gap-1">
        <TopBarItem
          ref={appleBtnRef}
          forceHover={showAppleMenu}
          onClick={toggleAppleMenu}
          className="px-2"
        >
          <img
            src="/icons/settings.svg"
            className="w-5 h-5 object-contain invert"
            alt="Settings"
            style={{ filter: "drop-shadow(0 0.5px 1px rgba(0,0,0,0.15)) invert(1)" }}
          />
        </TopBarItem>
      </div>

      {showAppleMenu && (
        <AppleMenu
          logout={handleLogout}
          shut={shutMac}
          restart={restartMac}
          sleep={sleepMac}
          onClose={() => setShowAppleMenu(false)}
          openAboutMac={onOpenAbout}
          btnRef={appleBtnRef}
        />
      )}

      {showWifiPopup && (
        <WifiMenu
          wifiOn={wifiOn}
          toggleWifi={toggleWifi}
          onClose={closeWifiPopup}
          btnRef={wifiBtnRef}
          activeNetwork={activeNetwork}
          connectNetwork={connectNetwork}
        />
      )}

      <div className="flex items-center gap-1">
        <div className="flex items-center gap-0.5 max-sm:hidden">
          {/* Battery Status (Left of Wifi) */}
          <TopBarItem className="px-1.5 gap-1.5 flex items-center">
            <span className="text-[12px] font-tabular opacity-90">{batteryLevel}%</span>
            <BatteryIcon level={batteryLevel} charging={isCharging} />
          </TopBarItem>

          {/* Wifi */}
          <TopBarItem 
            ref={wifiBtnRef}
            forceHover={showWifiPopup}
            onClick={toggleWifiPopup}
            className="px-1.5"
          >
            <img
              src="/icons/wifi.svg"
              className={`w-5 h-5 object-contain invert transition-opacity duration-200 ${wifiOn ? "opacity-100" : "opacity-35"}`}
              alt="Wifi"
            />
          </TopBarItem>

          {/* Search */}
          <TopBarItem className="px-1.5">
            <img
              src="/icons/search.svg"
              className="w-5 h-5 object-contain invert"
              alt="Search"
            />
          </TopBarItem>

          {/* User Profile */}
          <TopBarItem className="px-1.5">
            <img
              src="/icons/user.svg"
              className="w-5 h-5 object-contain invert"
              alt="Profile"
            />
          </TopBarItem>

          {/* Mode toggle */}
          <TopBarItem className="px-1.5">
            <img
              src="/icons/mode.svg"
              className="w-5 h-5 object-contain invert"
              alt="Mode"
            />
          </TopBarItem>
        </div>

        {/* Date and Time */}
        <TopBarItem
          className="px-2 font-medium"
          onClick={toggleNotificationCenter}
          forceHover={showNotificationCenter}
        >
          {time.format("ddd MMM D h:mm A")}
        </TopBarItem>
      </div>
    </nav>
  )
}

export default Navbar