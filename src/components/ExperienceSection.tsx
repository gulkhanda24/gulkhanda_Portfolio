import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ─── Data ────────────────────────────────────────────────────────────── */
const experiences = [
  {
    company: "Zeki Experts",
    logoText: "Zeki",
    logoSub: "Experts",
    logoColor: "#6d28d9",
    logoBg: "#f3f0ff",
    role: "Sr. Product Designer",
    period: "Mar 2025 — Present",
    badge: "Product Design 🎨",
    badgeColor: "#7c3aed",
    badgeBg: "#ede9fe",
    tags: ["SaaS", "B2B", "UX Systems"],
    current: true,
  },
  {
    company: "Sigma Digital Solution",
    logoText: "Sigma",
    logoSub: "Digital",
    logoColor: "#0369a1",
    logoBg: "#e0f2fe",
    role: "UI/UX Designer",
    period: "Sep 2023 — Aug 2024",
    badge: "Fin-tech 💳",
    badgeColor: "#0369a1",
    badgeBg: "#e0f2fe",
    tags: ["Mobile Apps", "Web Apps", "Dashboards"],
    current: false,
  },
  {
    company: "448 Studio",
    logoText: "448",
    logoSub: "Studio",
    logoColor: "#b45309",
    logoBg: "#fef3c7",
    role: "UI/UX Designer",
    period: "Jan 2022 — Sep 2023",
    badge: "Agency Work 🏢",
    badgeColor: "#b45309",
    badgeBg: "#fef3c7",
    tags: ["Branding", "Digital Products", "Startups"],
    current: false,
  },
  {
    company: "Holodeck Technologies",
    logoText: "Holodeck",
    logoSub: "Tech",
    logoColor: "#047857",
    logoBg: "#d1fae5",
    role: "UI Designer",
    period: "Feb 2020 — Jan 2022",
    badge: "AR / VR 🥽",
    badgeColor: "#047857",
    badgeBg: "#d1fae5",
    tags: ["XR", "Mobile", "UI Systems"],
    current: false,
  },
];

const stats = [
  { value: 4,  suffix: "+",  label: "Years Experience" },
  { value: 6,  suffix: "+",  label: "Clients Served" },
  { value: 30, suffix: "+",  label: "Projects Shipped" },
  { value: 10, suffix: "K+", label: "Hours Worked" },
];

const education = [
  {
    degree: "Full Stack UI/UX Design",
    school: "DesignShift by Masai School",
    period: "2021 — 2022",
    credential: "Certification",
    logoText: "DS",
    logoColor: "#7c3aed",
    logoBg: "#ede9fe",
    tags: ["Figma", "Research", "Design Systems"],
  },
  {
    degree: "Bachelor in Arts (Sociology)",
    school: "Mithibai College, Mumbai University",
    period: "2018 — 2021",
    credential: "Bachelor's Degree",
    logoText: "MU",
    logoColor: "#0369a1",
    logoBg: "#e0f2fe",
    tags: ["Human Behaviour", "Psychology", "Research"],
  },
];

/* ─── Animated counter ────────────────────────────────────────────────── */
const AnimatedCounter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <>{count}{suffix}</>;
};

/* ─── Experience card ─────────────────────────────────────────────────── */
const ExpCard = ({ exp, index, inView }: { exp: typeof experiences[0]; index: number; inView: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.08 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3 }}
      className="group relative cursor-default overflow-hidden rounded-3xl border border-gray-200/70 bg-white/90 p-6 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-8"
      style={{
        boxShadow: hovered
          ? `0 20px 48px -12px ${exp.logoColor}33, 0 4px 24px -6px rgba(15,23,42,0.08)`
          : "0 4px 24px -6px rgba(15,23,42,0.08)",
        borderColor: hovered ? `${exp.logoColor}55` : "rgba(229,231,235,0.85)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      {/* Mesh / ambient */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.14] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.22]"
        style={{ background: exp.logoColor }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: exp.badgeColor }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50/40" />

      {/* Top editorial rule */}
      <div
        className="pointer-events-none absolute left-6 right-6 top-0 h-px opacity-60 md:left-8 md:right-8"
        style={{
          background: `linear-gradient(90deg, transparent, ${exp.logoColor}40, transparent)`,
        }}
      />

      {/* Hover gradient edge */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 rounded-full"
        animate={{ opacity: hovered ? 1 : 0.35, scaleY: hovered ? 1 : 0.45 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: `linear-gradient(180deg, ${exp.logoColor}, ${exp.badgeColor})`,
          transformOrigin: "center",
        }}
      />

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center md:gap-8">
        {/* Logo — floating tile */}
        <motion.div
          className="relative flex h-[5.5rem] w-full flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-black/[0.06] shadow-inner sm:h-[5.75rem] sm:w-[7.5rem] md:w-[8.25rem]"
          style={{
            background: `linear-gradient(155deg, ${exp.logoBg} 0%, #ffffff 55%, ${exp.logoBg}cc 100%)`,
          }}
          whileHover={{ scale: 1.03, rotate: -1.5 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(125deg, transparent 35%, ${exp.logoColor} 100%)`,
            }}
          />
          <span className="font-heading relative text-xl font-black leading-none md:text-2xl" style={{ color: exp.logoColor }}>
            {exp.logoText}
          </span>
          <span
            className="relative mt-1 text-[9px] font-bold uppercase tracking-[0.2em] opacity-70"
            style={{ color: exp.logoColor }}
          >
            {exp.logoSub}
          </span>
        </motion.div>

        {/* Role + meta */}
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5 gap-y-1">
            <h3 className="font-heading text-xl font-black leading-[1.15] tracking-tight text-gray-950 md:text-2xl">
              {exp.role}
            </h3>
            {exp.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-emerald-700 shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Now
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">{exp.period}</p>
            <span className="hidden text-gray-300 sm:inline" aria-hidden>
              /
            </span>
            <p className="text-sm font-semibold text-gray-700">{exp.company}</p>
          </div>
        </div>

        {/* Badge + tag chips */}
        <div className="flex w-full flex-shrink-0 flex-col gap-3 sm:w-auto sm:items-end">
          <span
            className="inline-flex w-fit items-center rounded-xl border border-black/[0.04] px-3.5 py-2 text-xs font-bold shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${exp.badgeBg}, #ffffffcc)`,
              color: exp.badgeColor,
              boxShadow: `0 4px 14px -4px ${exp.badgeColor}44`,
            }}
          >
            {exp.badge}
          </span>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-gray-200/90 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600 shadow-sm backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Education card ──────────────────────────────────────────────────── */
const EduCard = ({ edu, index, inView }: { edu: typeof education[0]; index: number; inView: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3 }}
      className="group relative cursor-default overflow-hidden rounded-3xl border border-gray-200/70 bg-white/90 p-6 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-8"
      style={{
        boxShadow: hovered
          ? `0 20px 48px -12px ${edu.logoColor}33, 0 4px 24px -6px rgba(15,23,42,0.08)`
          : "0 4px 24px -6px rgba(15,23,42,0.08)",
        borderColor: hovered ? `${edu.logoColor}55` : "rgba(229,231,235,0.85)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-[0.12] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.2]"
        style={{ background: edu.logoColor }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50/40" />
      <div
        className="pointer-events-none absolute left-6 right-6 top-0 h-px opacity-60 md:left-8 md:right-8"
        style={{
          background: `linear-gradient(90deg, transparent, ${edu.logoColor}40, transparent)`,
        }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 rounded-full"
        animate={{ opacity: hovered ? 1 : 0.35, scaleY: hovered ? 1 : 0.45 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: `linear-gradient(180deg, ${edu.logoColor}, ${edu.logoColor}99)`, transformOrigin: "center" }}
      />

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center md:gap-8">
        <motion.div
          className="relative flex h-[5.5rem] w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-black/[0.06] shadow-inner sm:h-[5.75rem] sm:w-[7.5rem] md:w-[8.25rem]"
          style={{
            background: `linear-gradient(155deg, ${edu.logoBg} 0%, #ffffff 55%, ${edu.logoBg}cc 100%)`,
          }}
          whileHover={{ scale: 1.03, rotate: 1.5 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{ background: `linear-gradient(125deg, transparent 40%, ${edu.logoColor})` }}
          />
          <span className="font-heading relative text-2xl font-black md:text-3xl" style={{ color: edu.logoColor }}>
            {edu.logoText}
          </span>
        </motion.div>

        <div className="min-w-0 flex-1 space-y-3">
          <h3 className="font-heading text-xl font-black leading-[1.15] tracking-tight text-gray-950 md:text-2xl">
            {edu.degree}
          </h3>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">{edu.period}</p>
            <span className="hidden text-gray-300 sm:inline" aria-hidden>
              /
            </span>
            <p className="text-sm font-semibold text-gray-700">{edu.school}</p>
          </div>
        </div>

        <div className="flex w-full flex-shrink-0 flex-col gap-3 sm:w-auto sm:items-end">
          <span
            className="inline-flex w-fit items-center rounded-xl border border-black/[0.04] px-3.5 py-2 text-xs font-bold shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${edu.logoBg}, #ffffffcc)`,
              color: edu.logoColor,
              boxShadow: `0 4px 14px -4px ${edu.logoColor}44`,
            }}
          >
            {edu.credential}
          </span>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {edu.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-gray-200/90 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600 shadow-sm backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main section ────────────────────────────────────────────────────── */
const ExperienceSection = () => {
  const { ref: expRef,   isInView: expInView   } = useScrollAnimation({ once: true, margin: "-60px" });
  const { ref: statsRef, isInView: statsInView } = useScrollAnimation({ once: true, margin: "-60px" });
  const { ref: eduRef,   isInView: eduInView   } = useScrollAnimation({ once: true, margin: "-60px" });
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="resume" ref={sectionRef} className="bg-white py-28 px-6 relative overflow-hidden">

      {/* Subtle background blobs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }} />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #e91e8c, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Experience heading ── */}
        <div ref={expRef} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={expInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.22em] text-gray-400 uppercase mb-5"
          >
            Work History
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={expInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.88, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-heading-display font-black text-gray-950 leading-none mb-5 drop-shadow-sm"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            EXPERIENCE
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={expInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-base font-medium"
          >
            Crafting design solutions across industries.
          </motion.p>
        </div>

        {/* ── Experience cards ── */}
        <div className="mb-16 flex flex-col gap-5">
          {experiences.map((exp, i) => (
            <ExpCard key={i} exp={exp} index={i} inView={expInView} />
          ))}
        </div>

        {/* ── Stats strip ── */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-gray-100 px-6 py-7 text-center cursor-default"
              style={{ background: "linear-gradient(135deg,#fdf4ff,#fff7ed)" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <p
                className="font-heading font-black tabular-nums"
                style={{
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                  background: "linear-gradient(90deg, #e91e8c, #f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Education heading ── */}
        <div ref={eduRef} className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={eduInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.22em] text-gray-400 uppercase mb-5"
          >
            Academic Background
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={eduInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.88, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-heading-display font-black text-gray-950 leading-none mb-5 drop-shadow-sm"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            EDUCATION
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={eduInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-gray-400 text-base font-medium"
          >
            Always learning, always growing.
          </motion.p>
        </div>

        {/* ── Education cards ── */}
        <div className="flex flex-col gap-5">
          {education.map((edu, i) => (
            <EduCard key={i} edu={edu} index={i} inView={eduInView} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
