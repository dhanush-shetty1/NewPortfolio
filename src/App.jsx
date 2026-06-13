import React, { useState } from 'react'
import gsap from 'gsap';
import { Boot, Login, Dock, Home, Navbar, Welcome, NotificationCenter } from "#components"
import { Text, Image, Notes, Finder, Resume, Safari, Terminal, Contact, Photos, Calculator, About, Spotify } from "#windows";
import Draggable from 'gsap/src/Draggable';
import { motion, AnimatePresence } from 'framer-motion';
import useWindowStore from '#store/window';
import useNotificationStore from '#store/notification';

gsap.registerPlugin(Draggable);

const App = () => {
  const [booting, setBooting] = useState(true);
  const [login, setLogin] = useState(false);
  const [restart, setRestart] = useState(false);
  const [sleep, setSleep] = useState(false);
  const { openWindow } = useWindowStore();
  const { showNotificationCenter, closeNotificationCenter, displayBrightness } = useNotificationStore();

  const handleSetBooting = (val) => {
    setBooting(val);
    if (!val) {
      setRestart(false);
      setSleep(false);
    }
  };

  const handleSleep = () => {
    setSleep(true);
    setBooting(true);
    setLogin(false);
  };

  const handleRestart = () => {
    setRestart(true);
    setBooting(true);
    setLogin(false);
  };

  const handleShutdown = () => {
    setRestart(false);
    setSleep(false);
    setBooting(true);
    setLogin(false);
  };

  return (
    <main
      className="w-dvw h-dvh overflow-hidden select-none"
      style={{
        background: booting 
          ? "black" 
          : 'url("/images/wp.jpg") center/cover no-repeat'
      }}
    >
      {/* Screen Brightness Overlay */}
      <div 
        style={{
          position: "fixed",
          inset: 0,
          background: "black",
          opacity: (100 - displayBrightness) / 150,
          pointerEvents: "none",
          zIndex: 9999999,
          transition: "opacity 0.05s ease-out",
        }}
      />
      <AnimatePresence mode="wait">
        {booting ? (
          <motion.div
            key="boot"
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Boot restart={restart} sleep={sleep} setBooting={handleSetBooting} />
          </motion.div>
        ) : !login ? (
          <motion.div
            key="login"
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Login
              setLogin={setLogin}
              sleepMac={handleSleep}
              restartMac={handleRestart}
              shutMac={handleShutdown}
            />
          </motion.div>
        ) : (
          <motion.div
            key="desktop"
            className="w-full h-full relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar
              onOpenAbout={() => openWindow("about")}
              sleepMac={handleSleep}
              restartMac={handleRestart}
              shutMac={handleShutdown}
              setLogin={setLogin}
            />
            <NotificationCenter show={showNotificationCenter} onClose={closeNotificationCenter} />
            <Welcome />
            <Dock />
            <Safari />
            <Terminal />
            <Resume />
            <Finder />
            <Text />
            <Image />
            <Notes />
            <Contact />
            <Photos />
            <Calculator />
            <About />
            <Spotify />
            <Home />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default App