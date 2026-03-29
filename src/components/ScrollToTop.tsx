import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Circular floating button that appears after 400 px of scroll.
 * Shows a circular progress ring + an arrow. Clicking scrolls back to top.
 */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // SVG circle stroke-dashoffset driven by scroll progress
  const RADIUS = 20;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [CIRCUMFERENCE, 0]
  );

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setVisible(v > 0.08));
    return unsub;
  }, [scrollYProgress]);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
          aria-label="Scroll to top"
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            {/* Track */}
            <circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.15}
              strokeWidth="2.5"
            />
            {/* Fill */}
            <motion.circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="hsl(338 58% 72%)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset }}
            />
          </svg>

          <ArrowUp className="w-4 h-4 relative z-10" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
