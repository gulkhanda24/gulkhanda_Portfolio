import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import heroPhoto from "@/assets/hero-photo.png";

const WAVE_AMPLITUDE = 12;
const WAVE_DURATION = 1.65;
const WAVE_STAGGER = 0.075;

const WaveText = ({
  text,
  entryDelay = 0,
  spanExtra = "",
  reducedMotion = false,
}: {
  text: string;
  entryDelay?: number;
  spanExtra?: string;
  reducedMotion?: boolean;
}) => (
  <span aria-label={text} className="inline-flex">
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        className={`inline-block ${spanExtra}`.trim()}
        initial={{ y: 64, opacity: 0, scale: 0.9 }}
        animate={{
          y: reducedMotion ? 0 : [0, -WAVE_AMPLITUDE, 0],
          opacity: 1,
          scale: 1,
        }}
        transition={{
          opacity: { duration: 0.5, delay: entryDelay + i * 0.04, ease: "easeOut" },
          scale: { duration: 0.55, delay: entryDelay + i * 0.04, ease: [0.22, 1, 0.36, 1] },
          y: reducedMotion
            ? { duration: 0.55, delay: entryDelay + i * 0.04, ease: [0.22, 1, 0.36, 1] }
            : {
                duration: WAVE_DURATION,
                delay: entryDelay + i * WAVE_STAGGER,
                repeat: Infinity,
                ease: "easeInOut",
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
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });

  const productY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const productX = useTransform(smoothProgress, [0, 1], [0, -72]);
  const productScale = useTransform(smoothProgress, [0, 0.6], [1, 1.14]);

  const designerY = useTransform(smoothProgress, [0, 1], [0, 200]);
  const designerX = useTransform(smoothProgress, [0, 1], [0, 72]);
  const designerScale = useTransform(smoothProgress, [0, 0.6], [1, 1.14]);

  const photoY = useTransform(smoothProgress, [0, 1], [0, 100]);
  const photoScale = useTransform(smoothProgress, [0, 0.5], [1, 1.05]);
  const photoOpacity = useTransform(smoothProgress, [0, 0.85], [1, 0]);

  const scribbleRotate = useTransform(smoothProgress, [0, 1], [0, -14]);
  const scribbleOpacity = useTransform(smoothProgress, [0, 0.55], [1, 0]);

  const sectionOpacity = useTransform(smoothProgress, [0, 0.92], [1, 0]);

  const rm = Boolean(prefersReducedMotion);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden pt-20 pb-16 noise-bg"
      aria-label="Hero"
    >
      {/* Soft center spotlight — depth without new colors */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[min(68vh,520px)] w-[min(92vw,780px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.09] blur-[80px]"
        aria-hidden
      />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          animate={rm ? undefined : { scale: [1, 1.06, 1], rotate: [0, 4, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 -top-28 h-[28rem] w-[28rem] rounded-full opacity-[0.22]"
          style={{ background: "radial-gradient(circle, hsl(268 55% 72%) 0%, transparent 68%)" }}
        />
        <motion.div
          animate={rm ? undefined : { scale: [1, 1.08, 1], rotate: [0, -6, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -bottom-24 -right-16 h-[22rem] w-[22rem] rounded-full opacity-[0.18]"
          style={{ background: "radial-gradient(circle, hsl(330 70% 78%) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={rm ? undefined : { y: [0, -12, 0], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/3 left-[8%] h-40 w-40 rounded-full blur-2xl opacity-20"
          style={{ background: "hsl(275 60% 65%)" }}
        />
      </div>

      {/* Diagonal mesh accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)`,
          backgroundSize: "200% 200%",
        }}
        aria-hidden
      />

      <motion.div
        style={{ opacity: sectionOpacity }}
        className="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center"
      >
        <motion.h1
          style={{ y: productY, x: productX, scale: productScale }}
          className="text-hero text-[clamp(3.25rem,12vw,11.5rem)] tracking-tighter text-white/90 drop-shadow-[0_4px_48px_rgba(50,20,90,0.35)]"
        >
          <WaveText text="PRODUCT" entryDelay={0} reducedMotion={rm} />
        </motion.h1>

        <div className="relative -mt-3 md:-mt-5">
          <motion.h1
            style={{ y: designerY, x: designerX, scale: designerScale }}
            className="text-hero text-[clamp(3.25rem,12vw,11.5rem)] tracking-tighter text-white drop-shadow-[0_6px_40px_rgba(80,30,120,0.28)]"
          >
            <WaveText text="DESIGNER" entryDelay={0.12} reducedMotion={rm} />
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-1 left-[6%] right-[6%] h-px origin-center bg-gradient-to-r from-transparent via-white/70 to-transparent md:-bottom-1.5"
            aria-hidden
          />
        </div>
      </motion.div>

      {/* Foreground: identity + photo */}
      <motion.div
        initial={{ opacity: 0, y: 88, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: photoY, scale: photoScale, opacity: photoOpacity }}
        className="relative z-10 flex w-full max-w-6xl flex-col items-center px-5"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.45 }}
          className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.35em] text-white/70 md:mb-6 md:text-xs"
        >
          Gulkhanda Jahan
        </motion.p>

        <div className="relative">
          <div
            className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-white/25 via-white/[0.08] to-violet-400/20 blur-md md:-inset-4 md:rounded-[2.25rem]"
            aria-hidden
          />
          <div className="relative h-[268px] w-[260px] overflow-hidden rounded-3xl ring-2 ring-white/50 ring-offset-2 ring-offset-transparent shadow-[0_24px_80px_-12px_rgba(45,15,80,0.45)] sm:h-[308px] sm:w-[300px] md:h-[412px] md:w-[400px] lg:h-[454px] lg:w-[440px] md:rounded-[1.75rem] md:ring-[3px]">
            <img
              src={heroPhoto}
              alt="Gulkhanda Jahan — Product Designer"
              width={768}
              height={1024}
              className="h-full w-full object-cover object-[center_18%] drop-shadow-[0_20px_50px_rgba(25,10,55,0.25)]"
            />
          </div>

          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.9 }}
            style={{ rotate: scribbleRotate, opacity: scribbleOpacity }}
            className="pointer-events-none absolute -bottom-6 left-1/2 w-[240px] -translate-x-1/2 md:-bottom-10 md:w-[340px]"
            viewBox="0 0 400 110"
            fill="none"
            aria-hidden
          >
            <motion.path
              d="M25 35 Q105 12 205 42 Q305 72 382 32"
              stroke="hsl(330 70% 82%)"
              strokeWidth="14"
              strokeLinecap="round"
              opacity={0.85}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.85, ease: "easeOut" }}
            />
            <motion.path
              d="M45 60 Q128 38 225 65 Q318 88 375 55"
              stroke="hsl(268 55% 78%)"
              strokeWidth="12"
              strokeLinecap="round"
              opacity={0.65}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.02, ease: "easeOut" }}
            />
            <motion.path
              d="M65 85 Q152 60 245 82 Q338 100 382 78"
              stroke="hsl(330 65% 80%)"
              strokeWidth="10"
              strokeLinecap="round"
              opacity={0.45}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.18, ease: "easeOut" }}
            />
          </motion.svg>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.5 }}
          className="mt-14 max-w-md text-center text-sm font-medium leading-relaxed text-white/65 md:mt-16 md:text-[0.9375rem]"
        >
          Digital product design — systems, research, and craft.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.45 }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">Scroll</span>
        <motion.div
          animate={rm ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-px bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
