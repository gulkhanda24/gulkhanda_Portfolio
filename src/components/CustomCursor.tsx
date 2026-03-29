import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const dotX = useSpring(0, { stiffness: 1000, damping: 50, mass: 0.1 });
  const dotY = useSpring(0, { stiffness: 1000, damping: 50, mass: 0.1 });

  const ringX = useSpring(0, { stiffness: 180, damping: 28, mass: 0.5 });
  const ringY = useSpring(0, { stiffness: 180, damping: 28, mass: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    const checkPointer = () => {
      const el = document.elementFromPoint(mouseX.current, mouseY.current);
      if (el) {
        const computed = window.getComputedStyle(el).cursor;
        setIsPointer(computed === "pointer");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    const interval = setInterval(checkPointer, 100);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      clearInterval(interval);
    };
  }, [dotX, dotY, ringX, ringY, isVisible]);

  return (
    <>
      {/* Dot — snappy */}
      <motion.div
        className="custom-cursor cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 0 : 1,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />

      {/* Ring — lagging */}
      <motion.div
        className="custom-cursor cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 1.6 : 1,
        }}
        animate={{ scale: isPointer ? 1.6 : 1 }}
        transition={{ scale: { duration: 0.3, ease: "easeOut" }, opacity: { duration: 0.2 } }}
      />
    </>
  );
};

export default CustomCursor;
