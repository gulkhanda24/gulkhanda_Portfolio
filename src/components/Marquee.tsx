import {
  motion,
  useScroll,
  useSpring,
  useVelocity,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import { useRef } from "react";

/* ─── Wave constants ──────────────────────────────────────────────────── */
const FONT_PX    = 44;    // px font size
const AMPLITUDE  = 36;    // px — sine wave height
const WAVELENGTH = 960;   // px — spatial period (one full wave)
const PERIOD     = 2.8;   // s  — temporal period (speed of travel)

const RAW_TEXT     = "BUILDING DIGITAL PRODUCTS, FOCUSED ON CRAFT AND EXPERIENCE. ";
const DOUBLED_TEXT = RAW_TEXT.repeat(2); // exactly 2× → CSS -50% loops seamlessly

/* ─── Component ───────────────────────────────────────────────────────── */
const MarqueeText = () => {
  /* One ref per character span — direct DOM writes, zero React re-renders */
  const charRefs   = useRef<(HTMLSpanElement | null)[]>([]);

  /*
   * charXs stores each span's measured offsetLeft.
   * We measure once on the very first animation frame, after the browser
   * has performed natural text layout — so spacing is 100% typographically
   * correct (no guessed fixed widths).
   */
  const charXs     = useRef<number[]>([]);
  const measured   = useRef(false);

  useAnimationFrame((timeMs) => {
    /* Measure actual rendered positions on first frame */
    if (!measured.current) {
      charRefs.current.forEach((span, i) => {
        if (span) charXs.current[i] = span.offsetLeft;
      });
      measured.current = true;
    }

    const t = timeMs / 1000; // elapsed seconds

    charRefs.current.forEach((span, i) => {
      if (!span) return;
      const x = charXs.current[i] ?? 0;

      /*
       * True traveling-wave equation:
       *   y(x, t) = A · sin( 2π·x/λ  −  2π·t/T )
       *
       * Subtracting the time term makes the pattern move in the +x direction
       * (rightward) — counter to the leftward scroll — so the wave visibly
       * flows *through* the characters as they move across the screen.
       */
      const phase  = (2 * Math.PI * x) / WAVELENGTH - (2 * Math.PI * t) / PERIOD;
      const y      = AMPLITUDE * Math.sin(phase);

      /* Tangent rotation — letter tilts along the local slope of the wave */
      const dyDx   = AMPLITUDE * (2 * Math.PI / WAVELENGTH) * Math.cos(phase);
      const angle  = Math.atan(dyDx) * (180 / Math.PI);

      span.style.transform = `translateY(${y}px) rotate(${angle}deg)`;
    });
  });

  /* Velocity-based skew for kinetic page-scroll feel */
  const { scrollY }   = useScroll();
  const vel           = useVelocity(scrollY);
  const smoothVel     = useSpring(vel, { stiffness: 200, damping: 50 });
  const skewX         = useTransform(smoothVel, [-1400, 0, 1400], [-5, 0, 5]);

  const containerH = FONT_PX + AMPLITUDE * 2 + 32;

  return (
    <div className="relative overflow-hidden" style={{ height: containerH }}>
      <motion.div style={{ skewX }} className="absolute inset-0 flex items-center">

        {/* CSS horizontal scroll — browser lays out characters at natural widths */}
        <div
          className="animate-marquee-wave"
          style={{ paddingTop: AMPLITUDE + 4 }}
        >
          {DOUBLED_TEXT.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => { charRefs.current[i] = el; }}
              style={{
                display:         "inline-block",
                fontSize:        FONT_PX,
                fontFamily:      "var(--font-heading)",
                fontWeight:      900,
                color:           "rgba(255,255,255,0.90)",
                lineHeight:      1,
                userSelect:      "none",
                letterSpacing:   "0.02em",
                transformOrigin: "center bottom",
                /* useAnimationFrame drives the transform — no CSS wave animation */
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

      </motion.div>
    </div>
  );
};

export default MarqueeText;
