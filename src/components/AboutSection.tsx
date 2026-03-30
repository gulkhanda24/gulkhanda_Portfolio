import { motion, useScroll, useSpring, useVelocity, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ─── Scattered tags ──────────────────────────────────────────────────── */
// blue = accent gradient | white = solid pill | outline = glass + white stroke | lavender = solid blue
type SkillVariant = "blue" | "white" | "outline" | "lavender";

type SkillDatum = {
  text: string;
  rotate: number;
  variant: SkillVariant;
  delay: number;
  initSpin: number;
};

const skills: SkillDatum[] = [
  { text: "Information Architecture", rotate: -17, variant: "outline",  delay: 0.03, initSpin: -26 },
  { text: "Wireframing",              rotate:  -2, variant: "blue",     delay: 0.08, initSpin:  12 },
  { text: "Communication",            rotate:   0, variant: "white",    delay: 0.05, initSpin: -10 },
  { text: "Prototyping",              rotate:   1, variant: "white",    delay: 0.11, initSpin:  -8 },
  { text: "Critical Thinking",        rotate:   0, variant: "lavender", delay: 0.14, initSpin:   8 },
  { text: "Business Needs",           rotate:   4, variant: "outline",  delay: 0.10, initSpin:  10 },
  { text: "User Research",            rotate:  -3, variant: "white",    delay: 0.16, initSpin: -12 },
  { text: "Visuals & UI",             rotate:   2, variant: "white",    delay: 0.18, initSpin:   6 },
  { text: "User Flow",                rotate:  -4, variant: "outline",  delay: 0.12, initSpin:  10 },
  { text: "Empathy",                  rotate:   5, variant: "white",    delay: 0.20, initSpin:  -8 },
];

function skillSurfaceClass(variant: SkillVariant): string {
  switch (variant) {
    case "blue":
      return [
        "border border-white/40 text-white shadow-[0_10px_32px_rgba(20,70,160,0.32)]",
        "bg-gradient-to-br from-[hsl(210_85%_62%)] via-[hsl(218_72%_50%)] to-[hsl(228_65%_38%)]",
      ].join(" ");
    case "white":
      return [
        "bg-white text-neutral-800 border border-white/95",
        "shadow-[0_4px_0_rgba(255,255,255,0.65)_inset,0_10px_36px_rgba(40,20,60,0.12)]",
      ].join(" ");
    case "outline":
      return [
        "border-2 border-white text-white",
        "bg-white/[0.12] backdrop-blur-md",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_32px_rgba(30,15,50,0.12)]",
      ].join(" ");
    case "lavender":
      return [
        "border border-white/40 text-white shadow-[0_8px_28px_rgba(25,75,170,0.28)]",
        "bg-[hsl(218_62%_48%)]",
      ].join(" ");
  }
}

function skillPillClass(): string {
  return "inline-block whitespace-nowrap px-8 py-2 md:px-10 md:py-2.5 rounded-full text-base md:text-lg font-semibold tracking-tight leading-snug";
}

/* ─── Tool icons ──────────────────────────────────────────────────────── */
// We repeat the list once → CSS -50% loop works seamlessly
const toolIcons = [
  {
    name: "Webflow",
    // blue W on light bg — simpleicons returns brand-colour SVG
    url: "https://cdn.simpleicons.org/webflow/4353FF",
    bg: "hsl(222 80% 96%)",
  },
  {
    name: "Figma",
    // multi-colour via devicons
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    bg: "hsl(330 40% 95%)",
  },
  {
    name: "Wix",
    url: "https://cdn.simpleicons.org/wix/000000",
    bg: "hsl(0 0% 95%)",
  },
  {
    name: "After Effects",
    // Wikipedia SVG — self-contained dark-purple square icon
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
    bg: "hsl(270 40% 96%)",
  },
  {
    name: "Illustrator",
    // Wikipedia SVG — self-contained orange square icon
    url: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
    bg: "hsl(28 80% 96%)",
  },
  {
    name: "Notion",
    url: "https://cdn.simpleicons.org/notion/000000",
    bg: "hsl(0 0% 96%)",
  },
  {
    name: "Framer",
    url: "https://cdn.simpleicons.org/framer/0055FF",
    bg: "hsl(222 80% 96%)",
  },
  {
    name: "Photoshop",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
    bg: "hsl(210 60% 96%)",
  },
  {
    name: "Sketch",
    url: "https://cdn.simpleicons.org/sketch/F7B500",
    bg: "hsl(44 80% 96%)",
  },
];

// Triple list → ample width even on ultra-wide screens; -50% translateX loops on 2× set
const toolsLoop = [...toolIcons, ...toolIcons, ...toolIcons, ...toolIcons];

/* ─── Logo pill card ──────────────────────────────────────────────── */
const LogoPill = ({ tool, index }: { tool: (typeof toolIcons)[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7, y: 12 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{
      duration: 0.45,
      delay: (index % toolIcons.length) * 0.05,
      ease: [0.22, 1, 0.36, 1],
    }}
    whileHover={{ scale: 1.12, y: -5, transition: { duration: 0.18 } }}
    className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-full cursor-default select-none"
    style={{
      background: "rgba(255,255,255,0.28)",
      border: "1.5px solid rgba(255,255,255,0.55)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.4)",
    }}
    title={tool.name}
  >
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
      style={{ background: tool.bg }}
    >
      <img
        src={tool.url}
        alt={tool.name}
        className="w-5 h-5 object-contain"
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    </div>
    <span className="text-black font-semibold text-sm whitespace-nowrap tracking-wide">
      {tool.name}
    </span>
  </motion.div>
);

/* ─── Teal sparkle decoration ─────────────────────────────────────────── */
const TealSparkle = () => (
  <motion.svg
    initial={{ opacity: 0, scale: 0, rotate: -45 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 160 }}
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    className="absolute bottom-16 right-12 hidden md:block"
  >
    <path
      d="M18 0 C18 10 26 18 36 18 C26 18 18 26 18 36 C18 26 10 18 0 18 C10 18 18 10 18 0Z"
      fill="hsl(174 72% 56%)"
    />
  </motion.svg>
);

/* ─── SkillTag ────────────────────────────────────────────────────────── */
/**
 * Each tag owns its own IntersectionObserver via `whileInView`.
 * This ensures the drop animation plays exactly when the tag
 * scrolls into view — regardless of when the parent section loads.
 *
 * Animation: opacity 0→1 + translateY(20px→0), staggered by `delay`.
 */
const SkillTag = ({ skill }: { skill: SkillDatum }) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-8px" }}
    transition={{
      duration: 0.58,
      delay: skill.delay,
      ease: [0.22, 1, 0.36, 1],
    }}
    style={{ rotate: skill.rotate }}
    whileHover={{ scale: 1.07, y: -3, transition: { duration: 0.16 } }}
    className={[
      "select-none cursor-default font-semibold",
      skillPillClass(),
      skillSurfaceClass(skill.variant),
    ].join(" ")}
  >
    {skill.text}
  </motion.span>
);

/* ─── Main section ────────────────────────────────────────────────────── */
const AboutSection = () => {
  const { ref, isInView } = useScrollAnimation({ once: true, margin: "-60px" });

  /* Scroll velocity → horizontal parallax on tools strip */
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 180, damping: 45 });
  const toolsXShift = useTransform(smoothVelocity, [-1500, 0, 1500], [70, 0, -70]);
  const toolsXShiftReverse = useTransform(smoothVelocity, [-1500, 0, 1500], [-70, 0, 70]);

  /* Soft parallax on the heading */
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [35, -20]);

  return (
    <section
      id="about"
      className="overflow-hidden relative"
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
    >
      {/* ── Heading ──────────────────────────────────────────────── */}
      <div className="pt-24 pb-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold tracking-[0.22em] text-white/60 uppercase mb-5"
        >
          About Me
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 50, scale: 0.92 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.88, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{
            y: headingY,
            fontSize: "clamp(3rem, 10vw, 9rem)",
          }}
          className="font-heading font-heading-display font-black text-white leading-none mb-7 drop-shadow-sm"
        >
          ABOUT ME
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.62, delay: 0.2 }}
          className="text-white/75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
        >
          A multidisciplinary designer specialized in digital product design.
          Currently based in Pakistan.
        </motion.p>
      </div>

      {/* ── Tags ─────────────────────────────────────────────────── */}
      <div className="relative pb-4">
        {/* Mobile — flex-wrap; each tag uses whileInView for scroll-triggered drop */}
        <div className="md:hidden flex flex-wrap gap-2 justify-center w-full px-4 sm:px-6 md:px-8 py-4">
          {skills.map((skill, i) => (
            <motion.span
              key={skill.text}
              initial={{ opacity: 0, y: -36, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
              transition={{
                delay: i * 0.06,
                opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                y: { type: "spring", stiffness: 320, damping: 20, mass: 0.85 },
                scale: { type: "spring", stiffness: 400, damping: 26, mass: 0.8 },
              }}
              style={{ rotate: skill.rotate }}
              whileHover={{ scale: 1.06, y: -2, transition: { type: "spring", stiffness: 420, damping: 26 } }}
              className={[
                "select-none cursor-default font-semibold",
                skillPillClass(),
                skillSurfaceClass(skill.variant),
              ].join(" ")}
            >
              {skill.text}
            </motion.span>
          ))}
        </div>

        {/* Desktop — flex-wrap + gap-2 for even spacing; per-tag whileInView drop */}
        <div className="hidden md:flex flex-wrap justify-center gap-2 w-full max-w-none mx-auto px-4 md:px-8 lg:px-12 xl:px-16 py-2">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.text}
              initial={{
                opacity: 0,
                scale: 0.84,
                rotate: skill.initSpin,
                y: -64,
                filter: "blur(12px)",
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: skill.rotate,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, amount: 0.15, margin: "0px 0px -48px 0px" }}
              transition={{
                delay: skill.delay,
                opacity: { type: "tween", duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                filter: { type: "tween", duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                scale: { type: "spring", stiffness: 380 + i * 12, damping: 24, mass: 0.88 },
                rotate: { type: "spring", stiffness: 240, damping: 22, mass: 0.8 },
                y: { type: "spring", stiffness: 300, damping: 19, mass: 0.92 },
              }}
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { type: "spring", stiffness: 450, damping: 24 },
              }}
            >
              <span
                className={[
                  "select-none cursor-default font-semibold",
                  skillPillClass(),
                  skillSurfaceClass(skill.variant),
                ].join(" ")}
              >
                {skill.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Teal sparkle accent */}
        <TealSparkle />
      </div>

      {/* ── Tools marquee ─────────────────────────────────────────── */}
      {/*
        Two rows — row 1 scrolls left, row 2 scrolls right.
        Velocity-based skewX and x-shift add a kinetic parallax feel on scroll.
        CSS mask-image fades the edges to avoid hard cuts.
      */}
      <div className="border-t border-white/20 pt-6 pb-8 marquee-mask overflow-hidden">

        {/* Decorative label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[10px] font-bold tracking-[0.28em] text-white uppercase mb-5"
        >
          Tools & Software
        </motion.p>

        {/* Row 1 — left */}
        <div className="overflow-hidden mb-4">
          <motion.div style={{ x: toolsXShift }}>
            <div
              className="animate-marquee-tools flex items-center gap-4"
              style={{ width: "max-content" }}
            >
              {toolsLoop.map((tool, i) => (
                <LogoPill key={i} tool={tool} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Row 2 — right (reverse direction, negated x-shift for symmetry) */}
        <div className="overflow-hidden">
          <motion.div style={{ x: toolsXShiftReverse }}>
            <div
              className="animate-marquee-tools-reverse flex items-center gap-4"
              style={{ width: "max-content" }}
            >
              {[...toolsLoop].reverse().map((tool, i) => (
                <LogoPill key={i} tool={tool} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
