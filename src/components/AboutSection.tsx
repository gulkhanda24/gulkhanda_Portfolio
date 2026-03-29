import { motion, useScroll, useSpring, useVelocity, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ─── Scattered tags ──────────────────────────────────────────────────── */
// filled = deep violet pill  |  outlined = solid-white pill
// x / y are % positions inside the absolute container (desktop only)
const skills = [
  // initSpin = dramatic initial rotation before springing to `rotate` value
  { text: "Information Architecture", x: "2%",  y: "10%", rotate: -9,  filled: false, delay: 0.04, initSpin: -38 },
  { text: "Wireframing",              x: "20%", y: "50%", rotate:  0,  filled: true,  delay: 0.18, initSpin:  26 },
  { text: "Communication",            x: "2%",  y: "70%", rotate:  0,  filled: false, delay: 0.08, initSpin: -22 },
  { text: "Critical Thinking",        x: "30%", y: "72%", rotate:  0,  filled: false, delay: 0.24, initSpin:  18 },
  { text: "Prototyping",              x: "43%", y: "50%", rotate:  0,  filled: false, delay: 0.30, initSpin: -30 },
  { text: "Business Needs",           x: "55%", y: "65%", rotate:  0,  filled: true,  delay: 0.36, initSpin:  24 },
  { text: "User Research",            x: "63%", y: "10%", rotate:  7,  filled: true,  delay: 0.12, initSpin: -16 },
  { text: "Visuals & UI",             x: "78%", y: "48%", rotate:  0,  filled: false, delay: 0.40, initSpin:  32 },
  { text: "User Flow",                x: "82%", y: "26%", rotate:  0,  filled: true,  delay: 0.14, initSpin: -28 },
  { text: "Empathy",                  x: "84%", y: "65%", rotate:  0,  filled: false, delay: 0.26, initSpin:  20 },
];

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
type SkillDatum = (typeof skills)[0];

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
      "inline-block whitespace-nowrap select-none cursor-default",
      "px-5 py-2.5 rounded-full text-sm font-semibold",
      skill.filled
        ? "bg-[hsl(258_68%_56%)] text-white"
        : "border-2 border-white bg-white text-[#1a1a1a]",
    ].join(" ")}
  >
    {skill.text}
  </motion.span>
);

/* ─── Main section ────────────────────────────────────────────────────── */
const AboutSection = () => {
  const { ref, isInView } = useScrollAnimation({ once: true, margin: "-60px" });

  /* Dedicated ref for the mobile tag container — fires when tags scroll into view */
  const mobileTagsRef = useRef<HTMLDivElement>(null);
  const mobileTagsInView = useInView(mobileTagsRef, { once: true, margin: "-40px" });

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
          Currently based in India.
        </motion.p>
      </div>

      {/* ── Tags ─────────────────────────────────────────────────── */}
      <div className="relative pb-4">
        {/*
          Mobile — flex-wrap layout.
          The container ref fires `mobileTagsInView` when this div scrolls
          into view. Each tag then plays its drop animation with stagger.
        */}
        <motion.div
          ref={mobileTagsRef}
          className="md:hidden flex flex-wrap gap-3 justify-center px-6 py-4"
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill.text}
              initial={{ opacity: 0, y: 22 }}
              animate={mobileTagsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{
                duration: 0.58,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.07, y: -3, transition: { duration: 0.16 } }}
              className={[
                "inline-block whitespace-nowrap select-none cursor-default",
                "px-5 py-2.5 rounded-full text-sm font-semibold",
                skill.filled
                  ? "bg-[hsl(258_68%_56%)] text-white"
                  : "border-2 border-white bg-white text-[#1a1a1a]",
              ].join(" ")}
            >
              {skill.text}
            </motion.span>
          ))}
        </motion.div>

        {/*
          Desktop — scattered absolute positions.
          Creative entry: each tag starts blurred, tiny, spinning, then
          springs into place with unique stiffness → organic "scatter snap".
          blur(12px→0) gives a cinematic focus-in as tags arrive.
        */}
        <div className="hidden md:block relative h-[265px] w-full">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.text}
              className="absolute"
              style={{ left: skill.x, top: skill.y }}
              initial={{
                opacity: 0,
                scale: 0.05,
                rotate: skill.initSpin,
                y: -55,
                filter: "blur(14px)",
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: skill.rotate,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                // spring for scale / rotate / y — each tag has unique bounce
                type: "spring",
                stiffness: 140 + i * 14,
                damping: 13,
                delay: skill.delay,
                // tween for blur and opacity (spring doesn't interpolate filters)
                filter:  { type: "tween", duration: 0.55, delay: skill.delay, ease: [0.22, 1, 0.36, 1] },
                opacity: { type: "tween", duration: 0.22, delay: skill.delay },
              }}
              whileHover={{ scale: 1.08, y: -4, transition: { duration: 0.16 } }}
            >
              <span
                className={[
                  "inline-block whitespace-nowrap select-none cursor-default",
                  "px-5 py-2.5 rounded-full text-sm font-semibold",
                  skill.filled
                    ? "bg-[hsl(258_68%_56%)] text-white"
                    : "border-2 border-white bg-white text-[#1a1a1a]",
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
