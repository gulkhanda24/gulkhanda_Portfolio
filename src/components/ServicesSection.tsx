import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useRef } from "react";

const principles = [
  {
    num: "01",
    name: "Clarity First",
    short: "COMMUNICATE INSTANTLY",
    description:
      "Great design needs no manual. Every layout, colour, and type choice speaks before a single word is read. I strip away noise until only signal remains.",
    color: "#7c4dff",
    bg: "rgba(124,77,255,0.07)",
    emoji: "◎",
  },
  {
    num: "02",
    name: "Empathy Drives",
    short: "ROOTED IN REAL HUMANS",
    description:
      "I obsess over the person on the other side of the screen — their goals, frustrations and delights. Research isn't a phase; it's a mindset woven into every decision.",
    color: "#e91e8c",
    bg: "rgba(233,30,140,0.07)",
    emoji: "◈",
  },
  {
    num: "03",
    name: "System Thinking",
    short: "SCALE WITH CONSISTENCY",
    description:
      "Individual screens are symptoms. I design the system: tokens, components, patterns — so that 1 decision propagates everywhere and nothing breaks at scale.",
    color: "#2979ff",
    bg: "rgba(41,121,255,0.07)",
    emoji: "⬡",
  },
  {
    num: "04",
    name: "Less, Better",
    short: "RADICAL REDUCTION",
    description:
      "Perfection is not when there is nothing more to add, but nothing left to remove. Every element must earn its place or it's gone.",
    color: "#00bfa5",
    bg: "rgba(0,191,165,0.07)",
    emoji: "—",
  },
  {
    num: "05",
    name: "Motion Tells Stories",
    short: "ANIMATION AS LANGUAGE",
    description:
      "Transitions are not decoration — they are the punctuation of an interface. Timing, easing and choreography turn a static layout into a living experience.",
    color: "#ff8f00",
    bg: "rgba(255,143,0,0.07)",
    emoji: "◌",
  },
  {
    num: "06",
    name: "Details Delight",
    short: "THE LAST 10% IS EVERYTHING",
    description:
      "Microinteractions, hover states, loading skeletons, error messages — the finishing touches nobody notices until they're missing. I notice.",
    color: "#d500f9",
    bg: "rgba(213,0,249,0.07)",
    emoji: "✦",
  },
];

/* ─── Principle row ──────────────────────────────────────────────────── */
const PrincipleRow = ({
  principle,
  index,
}: {
  principle: (typeof principles)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group cursor-default"
    >
      {/* Top divider */}
      <div className="h-px w-full bg-gray-100" />

      {/* Hover background flood */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: principle.bg }}
      />

      {/* Animated left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        initial={{ scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: principle.color, transformOrigin: "top" }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-0 py-8 px-6 md:px-8">

        {/* Number */}
        <motion.span
          animate={{ color: hovered ? principle.color : "rgba(0,0,0,0.12)" }}
          transition={{ duration: 0.28 }}
          className="font-heading font-black text-sm tracking-[0.18em] md:w-16 flex-shrink-0"
        >
          {principle.num}
        </motion.span>

        {/* Emoji symbol */}
        <motion.span
          animate={{
            color: hovered ? principle.color : "rgba(0,0,0,0.15)",
            scale: hovered ? 1.3 : 1,
            rotate: hovered ? 20 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block text-2xl select-none md:w-16 text-center flex-shrink-0"
        >
          {principle.emoji}
        </motion.span>

        {/* Principle name */}
        <div className="flex-1 min-w-0">
          <motion.h3
            animate={{ color: hovered ? principle.color : "#0f0f0f" }}
            transition={{ duration: 0.28 }}
            className="font-heading font-black leading-none"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)" }}
          >
            {principle.name}
          </motion.h3>
        </div>

        {/* Short tag — shifts out on hover on desktop */}
        <motion.span
          animate={{
            opacity: hovered ? 0 : 1,
            x: hovered ? 12 : 0,
          }}
          transition={{ duration: 0.22 }}
          className="hidden md:block text-[10px] font-black tracking-[0.2em] uppercase text-gray-300 md:w-52 text-right flex-shrink-0"
        >
          {principle.short}
        </motion.span>

        {/* Description — reveals on hover (desktop) */}
        <motion.p
          animate={{
            opacity: hovered ? 1 : 0,
            x: hovered ? 0 : 24,
          }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 text-sm leading-relaxed text-gray-600 max-w-[340px] text-right pointer-events-none"
        >
          {principle.description}
        </motion.p>

        {/* Description — always visible on mobile */}
        <p className="md:hidden text-sm text-gray-500 leading-relaxed">
          {principle.description}
        </p>
      </div>
    </motion.div>
  );
};

/* ─── Section ────────────────────────────────────────────────────────── */
const ServicesSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgCircle1Y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const bgCircle2Y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="services"
      className="relative bg-white overflow-hidden"
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
    >
      {/* Decorative parallax blobs */}
      <motion.div
        style={{ y: bgCircle1Y, background: "radial-gradient(circle, #7c4dff, transparent 70%)" }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.045]"
        aria-hidden
      />
      <motion.div
        style={{ y: bgCircle2Y, background: "radial-gradient(circle, #e91e8c, transparent 70%)" }}
        className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.04]"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-28">

        {/* ── Header — same pattern as Experience section ── */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.22em] text-gray-400 uppercase mb-5"
          >
            Design approach
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.88, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-heading-display font-black text-gray-950 leading-none mb-5 drop-shadow-sm"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            PRINCIPLES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-base font-medium"
          >
            Six beliefs that guide every pixel, every decision, every project — without exception.
          </motion.p>
        </div>

        {/* ── Principles list ── */}
        <div>
          {principles.map((p, i) => (
            <PrincipleRow key={p.num} principle={p} index={i} />
          ))}
          {/* Bottom closing rule */}
          <div className="h-px w-full bg-gray-100" />
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
