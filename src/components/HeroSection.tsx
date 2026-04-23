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

  const sectionOpacity = useTransform(smoothProgress, [0, 0.92], [1, 0]);

  const rm = Boolean(prefersReducedMotion);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden pt-24 pb-16 md:pt-28 noise-bg"
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

      {/* Reference-style background hints: soft diagram (left) + UI bars (right) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]" aria-hidden>
        <svg
          className="absolute -left-4 top-1/4 h-56 w-48 -rotate-6 text-white md:left-[2%] md:h-72 md:w-56"
          viewBox="0 0 200 240"
          fill="none"
        >
          <rect x="12" y="20" width="44" height="28" rx="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M56 34h28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="108" cy="34" r="14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M122 34h32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M88 62 L88 88 L32 88 L32 118" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M88 88h56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="132" y="74" width="48" height="32" rx="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M32 118v36h120" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="24" y="168" width="152" height="40" rx="8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg
          className="absolute -right-2 top-[22%] h-52 w-40 rotate-6 text-white md:right-[3%] md:h-64 md:w-48"
          viewBox="0 0 180 220"
          fill="none"
        >
          <rect x="16" y="24" width="148" height="10" rx="3" stroke="currentColor" strokeWidth="1.25" />
          <rect x="16" y="46" width="120" height="10" rx="3" stroke="currentColor" strokeWidth="1.25" />
          <rect x="16" y="68" width="132" height="10" rx="3" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="28" cy="102" r="6" stroke="currentColor" strokeWidth="1.25" />
          <rect x="42" y="96" width="110" height="12" rx="3" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="28" cy="128" r="6" stroke="currentColor" strokeWidth="1.25" />
          <rect x="42" y="122" width="92" height="12" rx="3" stroke="currentColor" strokeWidth="1.25" />
          <rect x="16" y="156" width="148" height="44" rx="8" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </div>

      <motion.div
        style={{ opacity: sectionOpacity }}
        className="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center"
      >
        <motion.h1
          style={{ y: productY, x: productX, scale: productScale }}
          className="text-hero text-[clamp(3.25rem,12vw,11.5rem)] tracking-tighter text-white/10 drop-shadow-[0_2px_24px_rgba(50,20,90,0.08)]"
        >
          <WaveText text="PRODUCT" entryDelay={0} reducedMotion={rm} />
        </motion.h1>

        <div className="relative -mt-3 md:-mt-5">
          <motion.h1
            style={{ y: designerY, x: designerX, scale: designerScale }}
            className="text-hero text-[clamp(3.25rem,12vw,11.5rem)] tracking-tighter text-white/10 drop-shadow-[0_2px_24px_rgba(80,30,120,0.06)]"
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

      {/* Foreground: identity */}
      <motion.div
        initial={{ opacity: 0, y: 88, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex w-full max-w-6xl flex-col items-center px-5"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex w-full justify-center md:mb-7"
        >
          <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48">
            <div
              className="absolute -inset-3 rounded-full bg-gradient-to-br from-fuchsia-400/50 via-white/20 to-violet-500/40 blur-md"
              aria-hidden
            />
            <div className="relative h-full w-full overflow-hidden rounded-full ring-[3px] ring-white/40 md:ring-4">
              <img
                src={heroPhoto}
                alt="Gulkhanda Jahan"
                width={400}
                height={400}
                className="block h-full w-full object-cover object-[center_15%]"
              />
            </div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-center font-heading text-[clamp(2.25rem,6.5vw,4rem)] font-bold leading-[1.06] tracking-tight text-white md:mb-7"
        >
          GULKHANDA JAHAN
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-2.5 md:mb-7 md:gap-3"
        >
          {["Product Design", "User Research", "Web Development"].map((label) => (
            <span
              key={label}
              className="rounded-lg border border-white/20 bg-[#151a2e]/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm backdrop-blur-sm md:px-5 md:py-2.5 md:text-sm"
            >
              {label}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.58 }}
          className="mb-10 max-w-2xl text-center text-base font-medium leading-relaxed text-white md:mb-12 md:text-lg md:leading-relaxed"
        >
          Fueled by a passion for user-centric design, I merge technology and HCI expertise to shape seamless solutions.
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
