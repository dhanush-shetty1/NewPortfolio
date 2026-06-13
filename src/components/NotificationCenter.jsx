import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CalendarWidget from "./widgets/CalendarWidget";
import WeatherWidget from "./widgets/WeatherWidget";
import { useWindowSize } from "../hooks/useWindowSize";
import useNotificationStore from "#store/notification";

// Extend dayjs for relative time calculations (fromNow)
dayjs.extend(relativeTime);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.02 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const cardVariants = {
  hidden: { x: 64, opacity: 0, scale: 0.97 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 360, damping: 32, mass: 0.8 },
  },
  exit: {
    x: 64,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

export default function NotificationCenter({ show, onClose }) {
  const {
    notifications,
    dismissNotification,
    clearAllNotifications,
    focusMode,
    toggleFocus,
    darkMode,
  } = useNotificationStore();

  const cardStyle = {
    background: darkMode ? "rgba(28,28,30,0.75)" : "rgba(240,240,245,0.78)",
    backdropFilter: "blur(48px) saturate(190%)",
    WebkitBackdropFilter: "blur(48px) saturate(190%)",
    border: darkMode ? "0.5px solid rgba(255,255,255,0.13)" : "0.5px solid rgba(0,0,0,0.12)",
    borderRadius: 16,
  };

  const { winWidth } = useWindowSize();
  const isMobile = winWidth < 768;
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Transparent click-outside overlay — frosted on mobile */}
          <motion.div
            key="nc-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: isMobile ? 9998 : 9990,
              background: isMobile ? "rgba(0,0,0,0.3)" : "transparent",
              backdropFilter: isMobile ? "blur(10px)" : "none",
              WebkitBackdropFilter: isMobile ? "blur(10px)" : "none",
            }}
            onClick={onClose}
          />

          {/* Staggered column of discrete glass cards */}
          <motion.div
            key="nc-cards"
            variants={isMobile ? undefined : containerVariants}
            initial={isMobile ? { y: "-100%", opacity: 0.5 } : "hidden"}
            animate={isMobile ? { y: 0, opacity: 1 } : "visible"}
            exit={isMobile ? { y: "-100%", opacity: 0.5 } : "exit"}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            style={{
              position: "fixed",
              top: isMobile ? 0 : 44,
              right: isMobile ? 12 : 12,
              left: isMobile ? 12 : "auto",
              width: isMobile ? "calc(100% - 24px)" : 330,
              padding: isMobile ? "48px 0 20px" : 0,
              maxHeight: isMobile ? "calc(100vh - 40px)" : "calc(100vh - 60px)",
              overflowY: "auto",
              zIndex: isMobile ? 9999 : 9995,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              scrollbarWidth: "none", // For Firefox
              msOverflowStyle: "none", // For Internet Explorer
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header card */}
            <motion.div
              variants={cardVariants}
              style={{
                ...cardStyle,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: darkMode ? "white" : "#1c1c1e",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                Notification Center
                {unread > 0 && (
                  <span
                    style={{
                      background: "#ff453a",
                      color: "white",
                      borderRadius: 10,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "1px 6px",
                      marginLeft: 8,
                      verticalAlign: "middle",
                    }}
                  >
                    {unread}
                  </span>
                )}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    style={{
                      background: "none",
                      border: "none",
                      color: darkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)",
                      fontSize: 11,
                      fontWeight: 500,
                      cursor: "pointer",
                      padding: "2px 4px",
                    }}
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={toggleFocus}
                  style={{
                    background: focusMode ? "#af52de" : (darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)"),
                    border: "none",
                    borderRadius: 20,
                    padding: "4px 10px",
                    fontSize: 11,
                    color: focusMode ? "white" : (darkMode ? "white" : "#1c1c1e"),
                    cursor: "pointer",
                    fontWeight: 500,
                    transition: "background 0.2s ease",
                  }}
                >
                  {focusMode ? "Focus On" : "Focus"}
                </button>
              </div>
            </motion.div>

            {/* Notifications card */}
            <motion.div
              variants={cardVariants}
              style={{
                ...cardStyle,
                overflow: "hidden",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {notifications.length === 0 ? (
                <div
                  style={{
                    padding: "24px 16px",
                    textAlign: "center",
                    color: darkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)",
                    fontSize: 13,
                  }}
                >
                  No notifications
                </div>
              ) : (
                <div style={{ padding: "6px 8px", display: "flex", flexDirection: "column", gap: 6 }}>
                  <AnimatePresence initial={false}>
                    {notifications.map((n) => (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 40, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          x: 60,
                          scale: 0.92,
                          transition: { duration: 0.18 },
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                        style={{
                          background: n.read 
                            ? (darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)") 
                            : (darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"),
                          border: darkMode ? "0.5px solid rgba(255,255,255,0.08)" : "0.5px solid rgba(0,0,0,0.06)",
                          borderRadius: 12,
                          padding: "10px 12px",
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <img
                          src={n.icon}
                          alt={n.app}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            flexShrink: 0,
                            background: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                            padding: 2,
                            boxSizing: "border-box",
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: 2,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: darkMode ? "rgba(255,255,255,0.9)" : "#1c1c1e",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {n.title}
                            </span>
                            <span
                              style={{
                                fontSize: 9,
                                color: darkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.45)",
                                flexShrink: 0,
                                marginLeft: 6,
                              }}
                            >
                              {dayjs(n.timestamp).fromNow()}
                            </span>
                          </div>
                          <p
                            style={{
                              fontSize: 11,
                              color: darkMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)",
                              margin: 0,
                              lineHeight: 1.4,
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {n.message}
                          </p>
                        </div>
                        <button
                          onClick={() => dismissNotification(n.id)}
                          style={{
                            background: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
                            border: "none",
                            borderRadius: "50%",
                            width: 18,
                            height: 18,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            flexShrink: 0,
                            color: darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
                            fontSize: 11,
                            fontWeight: 500,
                            marginTop: -2,
                          }}
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            {/* Weather card */}
            <motion.div variants={cardVariants}>
              <WeatherWidget />
            </motion.div>

            {/* Calendar card */}
            <motion.div variants={cardVariants}>
              <CalendarWidget />
            </motion.div>

            {/* Edit Widgets */}
            <motion.div
              variants={cardVariants}
              style={{ display: "flex", justifyContent: "center", paddingTop: 2 }}
            >
              <button
                style={{
                  background: darkMode ? "rgba(120, 120, 128, 0.32)" : "rgba(0, 0, 0, 0.06)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: darkMode ? "none" : "0.5px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: 20,
                  padding: "5px 14px",
                  fontSize: 12,
                  fontWeight: 500,
                  color: darkMode ? "white" : "#1c1c1e",
                  cursor: "pointer",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = darkMode ? "rgba(120, 120, 128, 0.48)" : "rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = darkMode ? "rgba(120, 120, 128, 0.32)" : "rgba(0, 0, 0, 0.06)";
                }}
              >
                Edit Widgets
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
