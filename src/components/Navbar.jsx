import React, { useState, useRef, useEffect } from 'react'
import dayjs from 'dayjs'
import useWindowStore from '#store/window'

const TopBarItem = React.forwardRef(({ children, className = "", onClick, onMouseEnter, forceHover }, ref) => {
  const [hovered, setHovered] = useState(false);
  const bg = forceHover || hovered ? "bg-white/15" : "transparent";

  return (
    <div
      ref={ref}
      className={`flex items-center gap-1 h-6 px-2 cursor-default rounded transition-colors duration-150 select-none ${className}`}
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

      <div className="flex items-center gap-1">
        <div className="flex items-center gap-0.5 max-sm:hidden">
          {/* Battery Status (Left of Wifi) */}
          <TopBarItem className="px-1.5 gap-1.5 flex items-center">
            <span className="text-[12px] font-tabular opacity-90">{batteryLevel}%</span>
            <BatteryIcon level={batteryLevel} charging={isCharging} />
          </TopBarItem>

          {/* Wifi */}
          <TopBarItem className="px-1.5">
            <img
              src="/icons/wifi.svg"
              className="w-5 h-5 object-contain invert"
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
        <TopBarItem className="px-2 font-medium">
          {dayjs().format("ddd MMM D h:mm A")}
        </TopBarItem>
      </div>
    </nav>
  )
}

export default Navbar