import React, { useRef, useState } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';

export default function DockItem({
  id,
  title,
  img,
  mouseX,
  openApp,
  isOpen,
  isBouncing,
}) {
  const ref = useRef(null);

  // Compute distance from mouse pointer to the middle of the item
  const distance = useTransform(mouseX, (val) => {
    if (val === null || val === Infinity || val === undefined || !ref.current) {
      return 9999;
    }
    const bounds = ref.current.getBoundingClientRect();
    const center = bounds.left + bounds.width / 2;
    return val - center;
  });

  // Calculate size based on distance
  const baseWidth = 50;
  const hoverWidth = 80;
  
  // Transform distance into width
  const widthTransform = useTransform(distance, [-120, 0, 120], [baseWidth, hoverWidth, baseWidth]);
  
  const size = useSpring(widthTransform, {
    stiffness: 180,
    damping: 18,
    mass: 0.1,
  });

  const [isHovered, setIsHovered] = useState(false);

  // Bounce animation variants for launch
  const bounceVariants = {
    bounce: {
      y: [0, -16, 0, -8, 0],
      transition: {
        duration: 0.7,
        ease: 'easeInOut',
      },
    },
    idle: {
      y: 0,
    },
  };

  return (
    <li
      ref={ref}
      className="relative flex flex-col items-center justify-end pb-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ overflow: 'visible' }}
    >
      {/* Tooltip */}
      {isHovered && (
        <div
          className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-normal text-slate-800 bg-white/75 backdrop-blur-md rounded-md shadow-md border border-white/20 whitespace-nowrap z-50 pointer-events-none"
        >
          {title}
        </div>
      )}

      {/* App Icon Button */}
      <motion.button
        type="button"
        onClick={() => openApp(id)}
        className="flex items-center justify-center p-0 m-0 border-none bg-transparent outline-none cursor-pointer origin-bottom select-none"
        animate={isBouncing ? 'bounce' : 'idle'}
        variants={bounceVariants}
        style={{
          width: size,
          height: size,
        }}
      >
        <img
          src={img}
          alt={title}
          draggable="false"
          className="w-full h-full object-contain pointer-events-none select-none"
        />
      </motion.button>

      {/* Indicator Dot */}
      {isOpen && (
        <span
          className="absolute -bottom-1.5 w-1.5 h-1.5 bg-white rounded-full opacity-80 shadow-sm"
        />
      )}
    </li>
  );
}
