import React, { useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { dockApps } from '#constants';
import useWindowStore from '#store/window';
import { useWindowSize } from '../hooks/useWindowSize';
import DockItem from './DockItem';

export default function Dock() {
  const { openWindow, windows } = useWindowStore();
  const [bouncingApp, setBouncingApp] = useState(null);

  const mouseX = useMotionValue(null);
  const { winWidth } = useWindowSize();
  const isMobile = winWidth < 768;

  const openApp = (id) => {
    // Trigger bounce animation if app is not already open
    if (!windows[id]?.isOpen) {
      setBouncingApp(id);
      setTimeout(() => setBouncingApp(null), 700);
    }
    openWindow(id);
  };

  const getIconSrc = (icon) => {
    const ext = icon.split('.').pop().toLowerCase();
    return ext === 'svg' ? `/icons/${icon}` : `/images/${icon}`;
  };

  // Keep compatibility with the user's split concept in case external apps are added later
  const desktopApps = dockApps.filter(app => {
    if (app.hideFromDock) return false;
    if (app.desktop === false) return false;
    if (isMobile) {
      return app.dockOnMobile !== false;
    }
    return true;
  });

  const externalApps = dockApps.filter(app => {
    if (app.hideFromDock) return false;
    if (app.desktop === false || app.link) return true;
    return false;
  });

  return (
    <motion.div
      id="dock"
      className="fixed inset-x-0 mx-auto bottom-2 w-max z-50 flex justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 35,
        mass: 0.8,
      }}
      style={{ overflow: 'visible' }}
    >
      {/* Ambient glow beneath dock */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: -8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: 28,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(180,200,255,0.22) 0%, rgba(120,160,255,0.10) 60%, transparent 100%)',
          filter: 'blur(10px)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      <ul
        className="flex items-end px-3 py-1.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/10 gap-3"
        onMouseMove={(e) => mouseX.set(e.nativeEvent.clientX)}
        onMouseLeave={() => mouseX.set(null)}
        style={{
          height: '64px',
          overflow: 'visible',
        }}
      >
        {desktopApps.map((app) => (
          <DockItem
            key={`dock-${app.id}`}
            id={app.id}
            title={app.name}
            img={getIconSrc(app.icon)}
            mouseX={mouseX}
            openApp={openApp}
            isOpen={windows[app.id]?.isOpen}
            isBouncing={bouncingApp === app.id}
          />
        ))}

        {/* Separator if external apps exist */}
        {externalApps.length > 0 && (
          <li className="flex items-center mx-1.5" style={{ height: '40px' }}>
            <div
              style={{
                width: '1px',
                height: '55%',
                background: 'rgba(255,255,255,0.25)',
                borderRadius: '1px',
              }}
            />
          </li>
        )}

        {externalApps.map((app) => (
          <DockItem
            key={`dock-${app.id}`}
            id={app.id}
            title={app.name}
            img={app.link ? app.icon : getIconSrc(app.icon)}
            mouseX={mouseX}
            openApp={app.link ? () => window.open(app.link, '_blank') : openApp}
            isOpen={app.link ? false : windows[app.id]?.isOpen}
            isBouncing={bouncingApp === app.id}
          />
        ))}
      </ul>
    </motion.div>
  );
}