import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { CornerDownLeft, Moon, RotateCw, Power } from "lucide-react";

const user = {
  name: "Dhanush Shetty",
  avatar: "/images/pp.jpeg", // Matches the profile photo in public/images
};

export default function Login({ setLogin, sleepMac, restartMac, shutMac }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [time, setTime] = useState(dayjs().format("h:mm"));
  const [date, setDate] = useState(dayjs().format("dddd, MMMM D"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("h:mm"));
      setDate(dayjs().format("dddd, MMMM D"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const keyPress = (e) => {
    const keyCode = e.key;
    if (keyCode === "Enter" || keyCode === "Space" || keyCode === "Tab") {
      setLogin(true);
    }
  };

  return (
    <div
      className="w-full h-full text-center relative overflow-hidden select-none"
      style={{
        background: `url("/images/wp.jpg") center/cover no-repeat`,
      }}
      onClick={() => !isLoginOpen && setIsLoginOpen(true)}
    >
      <AnimatePresence mode="wait">
        {isLoginOpen ? (
          <motion.div
            key="login-panel"
            className="w-full h-full absolute inset-0 focus:outline-none"
            style={{
              backgroundColor: "rgba(0,0,0,0.15)",
              backdropFilter: "blur(60px) saturate(200%)",
              WebkitBackdropFilter: "blur(60px) saturate(200%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            onKeyDown={keyPress}
            tabIndex={0}
            autoFocus
          >
            <motion.div
              className="inline-block w-auto relative top-1/2"
              style={{ marginTop: "-160px" }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Avatar with ring */}
              <div
                style={{
                  width: "88px",
                  height: "88px",
                  margin: "0 auto",
                  borderRadius: "50%",
                  padding: "3px",
                  background: "rgba(255,255,255,0.2)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                <img
                  className="rounded-full w-full h-full object-cover"
                  src="/images/u.jpeg"
                  alt="avatar"
                  style={{
                    border: "2px solid rgba(255,255,255,0.15)",
                  }}
                  onError={(e) => {
                    // Fallback to a placeholder if the avatar fails to load
                    e.target.src = "/images/logo.svg";
                  }}
                />
              </div>

              {/* Name */}
              <div
                className="font-display font-medium text-[17px] text-white tracking-[0.3px]"
                style={{
                  marginTop: "12px",
                  textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
              >
                {user.name}
              </div>

              {/* Login button styled as password field */}
              <motion.div
                className="flex justify-center items-center mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "6px 24px",
                    borderRadius: "20px",
                    border: "0.5px solid rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    color: "white",
                    fontSize: "13px",
                    fontWeight: 400,
                    letterSpacing: "0.3px",
                    cursor: "pointer",
                    outline: "none",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLogin(true);
                  }}
                >
                  <CornerDownLeft className="w-3.5 h-3.5 opacity-80" />
                  Sign In
                </button>
              </motion.div>

              {/* Touch ID hint */}
              <motion.div
                className="text-[11px] text-white/50 tracking-[0.2px]"
                style={{ marginTop: "16px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Press Enter to sign in
              </motion.div>
            </motion.div>

            {/* Power buttons */}
            <motion.div
              className="fixed bottom-12 inset-x-0 mx-auto flex flex-row space-x-6 w-max"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {[
                { label: "Sleep", icon: Moon, action: sleepMac },
                { label: "Restart", icon: RotateCw, action: restartMac },
                { label: "Shut Down", icon: Power, action: shutMac },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center cursor-pointer group"
                  style={{ width: "72px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.action();
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/15 transition-all duration-200 group-hover:bg-white/20 group-hover:scale-108"
                  >
                    <item.icon className="text-white w-4 h-4" />
                  </div>
                  <span
                    className="text-[11px] text-white/70 font-normal mt-1.5"
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="lock-screen"
            className="w-full h-full flex flex-col justify-between items-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            {/* Lock screen clock */}
            <motion.div
              className="flex flex-col items-center"
              style={{ paddingTop: "clamp(60px, 12vh, 120px)" }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div
                className="font-rounded font-semibold tracking-[-2px] text-white"
                style={{
                  fontSize: "clamp(72px, 12vw, 110px)",
                  lineHeight: 1,
                  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                }}
              >
                {time}
              </div>
              <div
                className="font-rounded font-semibold text-white/85 tracking-[0.5px]"
                style={{
                  marginTop: "8px",
                  fontSize: "clamp(16px, 2.5vw, 22px)",
                  textShadow: "0 1px 8px rgba(0,0,0,0.2)",
                }}
              >
                {date}
              </div>
            </motion.div>

            {/* Click to unlock hint */}
            <motion.div
              style={{
                paddingBottom: "48px",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div
                className="text-[13px] font-light text-white/60 tracking-[0.5px]"
                style={{
                  animation: "subtlePulse 3s ease-in-out infinite",
                  cursor: "pointer",
                }}
              >
                Click anywhere to unlock
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
