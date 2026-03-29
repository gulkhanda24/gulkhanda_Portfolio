import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import heroPhoto from "@/assets/hero-photo.png";

const WAVE_AMPLITUDE = 14;   // px up/down
const WAVE_DURATION  = 1.6;  // seconds per full cycle
const WAVE_STAGGER   = 0.08; // phase offset per character (seconds)

/** Splits text into characters, each with a phase-offset traveling wave */
const WaveText = ({
  text,
  entryDelay = 0,
}: {
  text: string;
  entryDelay?: number;
}) => (
  <span aria-label={text} className="inline-flex">
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ y: 70, opacity: 0, scale: 0.88 }}
        animate={{
          y:       [0, -WAVE_AMPLITUDE, 0],
          opacity: 1,
          scale:   1,
        }}
        transition={{
          /* entry */
          opacity: { duration: 0.45, delay: entryDelay + i * 0.045, ease: "easeOut" },
          scale:   { duration: 0.55, delay: entryDelay + i * 0.045, ease: [0.22, 1, 0.36, 1] },
          /* traveling wave — phase offset keeps the wave traveling indefinitely */
          y: {
            duration:   WAVE_DURATION,
            delay:      entryDelay + i * WAVE_STAGGER,
            repeat:     Infinity,
            ease:       "easeInOut",
          },
        }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });

  // PRODUCT — drifts up-left
  const productY = useTransform(smoothProgress, [0, 1], [0, -220]);
  const productX = useTransform(smoothProgress, [0, 1], [0, -90]);
  const productScale = useTransform(smoothProgress, [0, 0.6], [1, 1.18]);

  // DESIGNER — drifts down-right
  const designerY = useTransform(smoothProgress, [0, 1], [0, 220]);
  const designerX = useTransform(smoothProgress, [0, 1], [0, 90]);
  const designerScale = useTransform(smoothProgress, [0, 0.6], [1, 1.18]);

  // Photo — parallax depth
  const photoY = useTransform(smoothProgress, [0, 1], [0, 110]);
  const photoScale = useTransform(smoothProgress, [0, 0.5], [1, 1.06]);
  const photoOpacity = useTransform(smoothProgress, [0, 0.85], [1, 0]);

  // Scribble decorations
  const scribbleRotate = useTransform(smoothProgress, [0, 1], [0, -18]);
  const scribbleOpacity = useTransform(smoothProgress, [0, 0.55], [1, 0]);

  // Whole section fade
  const sectionOpacity = useTransform(smoothProgress, [0, 0.92], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen noise-bg flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(268 50% 75%), transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], rotate: [0, -8, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(330 65% 80%), transparent 70%)" }}
        />
      </div>

      <motion.div
        style={{ opacity: sectionOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
      >
        {/* PRODUCT */}
        <motion.h1
          style={{ y: productY, x: productX, scale: productScale }}
          className="text-hero text-[clamp(4rem,14.5vw,13.5rem)] text-foreground/90 tracking-tighter"
        >
          <WaveText text="PRODUCT" entryDelay={0} />
        </motion.h1>

        {/* DESIGNER */}
        <motion.h1
          style={{ y: designerY, x: designerX, scale: designerScale }}
          className="text-hero text-[clamp(4rem,14.5vw,13.5rem)] text-foreground/90 tracking-tighter -mt-4 md:-mt-6"
        >
          <WaveText text="DESIGNER" entryDelay={0.14} />
        </motion.h1>
      </motion.div>

      {/* Photo — centered, in front */}
      <motion.div
        initial={{ opacity: 0, y: 110, scale: 0.82 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.05, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: photoY, scale: photoScale, opacity: photoOpacity }}
        className="relative z-10 flex flex-col items-center"
      >
        <img
          src={heroPhoto}
          alt="Gulkhanda Jahan — Product Designer"
          width={500}
          height={625}
          className="w-[280px] md:w-[420px] lg:w-[480px] object-contain drop-shadow-2xl"
        />

        {/* Paintbrush scribble decoration */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{ rotate: scribbleRotate, opacity: scribbleOpacity }}
          className="absolute bottom-8 md:bottom-14 left-1/2 -translate-x-1/2 w-[260px] md:w-[380px]"
          viewBox="0 0 400 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M25 35 Q105 12 205 42 Q305 72 382 32"
            stroke="hsl(330 65% 78%)"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.95, ease: "easeOut" }}
          />
          <motion.path
            d="M45 60 Q128 38 225 65 Q318 88 375 55"
            stroke="hsl(330 65% 78%)"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 1.15, ease: "easeOut" }}
          />
          <motion.path
            d="M65 85 Q152 60 245 82 Q338 100 382 78"
            stroke="hsl(330 65% 78%)"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
            opacity="0.38"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 1.35, ease: "easeOut" }}
          />
        </motion.svg>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-foreground/40 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
