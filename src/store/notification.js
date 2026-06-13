import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useNotificationStore = create(
  immer((set) => ({
    notifications: [
      {
        id: 1,
        app: "GitHub",
        title: "New Repository Star",
        message: "Someone starred your NewPortfolio repository! Keep up the great work.",
        timestamp: Date.now() - 1000 * 60 * 5, // 5 mins ago
        read: false,
        icon: "/icons/github.svg",
      },
      {
        id: 2,
        app: "Calendar",
        title: "Project Review Meeting",
        message: "Portfolio walkthrough and tech stack discussion with the team at 3:00 PM.",
        timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
        read: false,
        icon: "/icons/work.svg",
      },
      {
        id: 3,
        app: "LinkedIn",
        title: "New Direct Message",
        message: "Hiring Manager: 'Hey Dhanush, I saw your portfolio and was really impressed. Let's connect!'",
        timestamp: Date.now() - 1000 * 60 * 90, // 1.5 hours ago
        read: false,
        icon: "/icons/linkedin.svg",
      },
      {
        id: 4,
        app: "System Settings",
        title: "System Update",
        message: "macOS Sequoia 15.1 update is downloaded and ready to install.",
        timestamp: Date.now() - 1000 * 60 * 240, // 4 hours ago
        read: true,
        icon: "/icons/settings.svg",
      },
    ],
    focusMode: false,
    showNotificationCenter: false,
    wifiOn: true,
    showWifiPopup: false,
    activeNetwork: "Dhanush_5G",

    dismissNotification: (id) =>
      set((state) => {
        state.notifications = state.notifications.filter((n) => n.id !== id);
      }),

    clearAllNotifications: () =>
      set((state) => {
        state.notifications = [];
      }),

    toggleFocus: () =>
      set((state) => {
        state.focusMode = !state.focusMode;
      }),

    toggleNotificationCenter: () =>
      set((state) => {
        state.showNotificationCenter = !state.showNotificationCenter;
      }),

    closeNotificationCenter: () =>
      set((state) => {
        state.showNotificationCenter = false;
      }),

    toggleWifi: () =>
      set((state) => {
        state.wifiOn = !state.wifiOn;
        if (!state.wifiOn) {
          state.activeNetwork = null;
        } else {
          state.activeNetwork = "Dhanush_5G";
        }
      }),

    toggleWifiPopup: () =>
      set((state) => {
        state.showWifiPopup = !state.showWifiPopup;
      }),

    closeWifiPopup: () =>
      set((state) => {
        state.showWifiPopup = false;
      }),

    connectNetwork: (name) =>
      set((state) => {
        state.activeNetwork = name;
        state.wifiOn = true;
      }),
  })),
);

export default useNotificationStore;
