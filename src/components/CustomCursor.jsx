import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  const auraX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const auraY = useSpring(cursorY, { stiffness: 120, damping: 22 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden,   setIsHidden]   = useState(false);

  useEffect(() => {
    const onMove  = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const onEnter = () => setIsHidden(false);
    const onLeave = () => setIsHidden(true);
    const onDown  = () => setIsClicking(true);
    const onUp    = () => setIsClicking(false);

    const addHover = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);

    const t = setTimeout(addHover, 800);

    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      clearTimeout(t);
    };
  }, [cursorX, cursorY]);

  // No renderizar en táctil
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className={`cursor-aura ${isHovering ? 'hovering' : ''} ${isHidden ? 'hidden' : ''}`}
        style={{ translateX: auraX, translateY: auraY, x: '-50%', y: '-50%' }}
        animate={{ scale: isClicking ? 0.7 : isHovering ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      <motion.div
        className={`cursor-dot ${isHovering ? 'hovering' : ''} ${isHidden ? 'hidden' : ''}`}
        style={{ translateX: springX, translateY: springY, x: '-50%', y: '-50%' }}
        animate={{ scale: isClicking ? 0.5 : isHovering ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 600, damping: 35 }}
      />
    </>
  );
}