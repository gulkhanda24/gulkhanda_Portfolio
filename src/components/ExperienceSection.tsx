import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ─── Data ────────────────────────────────────────────────────────────── */
const experiences = [
  {
    company: "Zeki Experts",
    role: "Product Engineer",
    period: "Mar 2025 to Present",
    badge: "Product & Engineering",
    tags: ["SaaS", "B2B", "UX", "Full-stack"],
    current: true,
  },
  {
    company: "Sigma Digital Solution",
    role: "UI/UX Designer",
    period: "Sep 2023 to Aug 2024",
    badge: "Fin-tech",
    tags: ["Mobile Apps", "Web Apps", "Dashboards"],
    current: false,
  },
  {
    company: "448 Studio",
    role: "UI/UX Designer",
    period: "Jan 2022 to Sep 2023",
    badge: "Agency",
    tags: ["Branding", "Digital Products", "Startups"],
    current: false,
  },
  {
    company: "Holodeck Technologies",
    role: "UI Designer",
    period: "Feb 2020 to Jan 2022",
    badge: "AR / VR",
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
    degree: "Bachelor's in Information Technology",
    school: "Bahria University, Pakistan",
    period: "2016 to 2020",
    credential: "Bachelor's Degree",
    tags: ["Information Systems", "Software", "Academics"],
  },
  {
    degree: "UX Research Certificate",
    school: "Google",
    period: "2024 to 2025",
    credential: "Certificate",
    tags: ["User Research", "Methods", "Insights"],
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
const ExpCard = ({ exp, index, inView }: { exp: typeof experiences[0]; index: number; inView: boolean }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: 0.06 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -2 }}
    className="cursor-default rounded-2xl border border-border bg-card p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-foreground/12 hover:shadow-md md:p-8"
  >
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
      <div className="min-w-0 space-y-3">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-heading text-xl font-bold leading-snug tracking-heading-tight text-foreground md:text-2xl">
            {exp.role}
          </h3>
          {exp.current && (
            <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Current
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium tabular-nums text-foreground/80">{exp.period}</span>
          <span className="mx-2 text-border" aria-hidden>
            ·
          </span>
          <span>{exp.company}</span>
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 border-t border-border pt-5 md:w-auto md:min-w-[12rem] md:border-l md:border-t-0 md:pl-8 md:pt-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{exp.badge}</p>
        <ul className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <li key={tag}>
              <span className="inline-block rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground/80">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.article>
);

/* ─── Education card ──────────────────────────────────────────────────── */
const EduCard = ({ edu, index, inView }: { edu: typeof education[0]; index: number; inView: boolean }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -2 }}
    className="cursor-default rounded-2xl border border-border bg-card p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-foreground/12 hover:shadow-md md:p-8"
  >
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
      <div className="min-w-0 space-y-3">
        <h3 className="font-heading text-xl font-bold leading-snug tracking-heading-tight text-foreground md:text-2xl">
          {edu.degree}
        </h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium tabular-nums text-foreground/80">{edu.period}</span>
          <span className="mx-2 text-border" aria-hidden>
            ·
          </span>
          <span>{edu.school}</span>
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 border-t border-border pt-5 md:w-auto md:min-w-[12rem] md:border-l md:border-t-0 md:pl-8 md:pt-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{edu.credential}</p>
        <ul className="flex flex-wrap gap-2">
          {edu.tags.map((tag) => (
            <li key={tag}>
              <span className="inline-block rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground/80">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.article>
);

/* ─── Main section ────────────────────────────────────────────────────── */
const ExperienceSection = () => {
  const { ref: expRef,   isInView: expInView   } = useScrollAnimation({ once: true, margin: "-60px" });
  const { ref: statsRef, isInView: statsInView } = useScrollAnimation({ once: true, margin: "-60px" });
  const { ref: eduRef,   isInView: eduInView   } = useScrollAnimation({ once: true, margin: "-60px" });
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="resume" ref={sectionRef} className="relative overflow-hidden px-6 py-28 md:py-32">
      {/* Brand atmosphere — lavender / rose (portfolio tokens) */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted via-background to-[hsl(268_40%_98%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-28 right-[-12%] h-[min(520px,90vw)] w-[min(520px,90vw)] rounded-full bg-lavender/50 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-8%] left-[-18%] h-[min(420px,75vw)] w-[min(420px,75vw)] rounded-full bg-pink-accent/40 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_100%)]"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* ── Experience heading ── */}
        <div ref={expRef} className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={expInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground"
          >
            Work History
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={expInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.88, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-heading-display mb-5 bg-gradient-to-r from-[hsl(258_68%_46%)] via-[hsl(330_58%_52%)] to-[hsl(25_90%_52%)] bg-clip-text font-black leading-none text-transparent drop-shadow-sm"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            EXPERIENCE
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={expInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-md text-base font-medium text-muted-foreground"
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
        <div ref={statsRef} className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="cursor-default rounded-2xl border border-border/70 bg-card/40 px-6 py-7 text-center shadow-[0_8px_32px_-12px_hsl(268_40%_45%/0.12)] backdrop-blur-md"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <p
                className="font-heading font-black tabular-nums"
                style={{
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                  background: "linear-gradient(90deg, hsl(258 68% 52%), hsl(330 60% 55%), hsl(25 90% 52%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Education heading ── */}
        <div ref={eduRef} className="mb-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={eduInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground"
          >
            Academic Background
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={eduInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.88, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-heading-display mb-5 bg-gradient-to-r from-[hsl(258_68%_46%)] via-[hsl(330_58%_52%)] to-[hsl(25_90%_52%)] bg-clip-text font-black leading-none text-transparent drop-shadow-sm"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            EDUCATION
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={eduInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mx-auto max-w-md text-base font-medium text-muted-foreground"
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
