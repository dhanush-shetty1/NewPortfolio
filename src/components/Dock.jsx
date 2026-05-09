import { dockApps } from '#constants'
import { useGSAP } from '@gsap/react'
import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import useWindowStore from '#store/window'

const Dock = () => {
  const dockRef = useRef(null)
  const {openWindow, closeWindow, windows}=useWindowStore();

  const [tooltip, setTooltip] = useState({
    visible: false,
    name: '',
    id: null,
  })

  useGSAP(() => {
    const dock = dockRef.current
    if (!dock) return

    const icons = dock.querySelectorAll('.dock-icon')

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect()
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect()
        const center = iconLeft - left + width / 2
        const distance = Math.abs(mouseX - center)
        const intensity = Math.exp(-(distance ** 2.5) / 20000)
        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: 'power1.out',
        })
      })
    }

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect()
      animateIcons(e.clientX - left)
    }

    const resetIcons = () => {
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power1.out',
        })
      )
    }

    dock.addEventListener('mousemove', handleMouseMove)
    dock.addEventListener('mouseleave', resetIcons)

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove)
      dock.removeEventListener('mouseleave', resetIcons)
    }
  }, [])

  const toggleApp = (app) => {
    if(!app.canOpen)return;

    const window=windows[app.id];
    if(window.isOpen){
      closeWindow(app.id);
    }
    else{
      openWindow(app.id);
    }
    console.log(windows);
    
  }

  const getIconSrc = (icon) => {
    const ext = icon.split('.').pop().toLowerCase()
    return ext === 'svg' ? `/icons/${icon}` : `/images/${icon}`
  }

  return (
    <section id="dock" style={{ overflow: 'visible' }}>
      <div ref={dockRef} className="dock-container" style={{ overflow: 'visible' }}>
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'visible' }}>
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              disabled={!canOpen}
              onMouseEnter={() => setTooltip({ visible: true, name, id })}
              onMouseLeave={() => setTooltip({ visible: false, name: '', id: null })}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={getIconSrc(icon)}
                alt={name}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                className={!canOpen ? 'opacity-60' : ''}
              />
            </button>

            {tooltip.visible && tooltip.id === id && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 16px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(196, 213, 230, 0.5)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  color: '#0f172a',
                  fontSize: '13px',
                  fontWeight: '400',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  zIndex: 9999,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}
              >
                {name}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Dock