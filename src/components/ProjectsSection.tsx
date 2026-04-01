import { motion, useScroll, useTransform } from "framer-motion";
import { Lock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { useRef, type ReactNode } from "react";
import SplitText from "./SplitText";
import IeltsDesignBoardShowcase from "@/components/IeltsDesignBoardShowcase";

const RAPIDO_YELLOW = "#FFD500";
const RAPIDO_YELLOW_SOFT = "#FFEA80";

type ShowcaseTheme = "rapido" | "smartHelm" | "ielts";

const showcaseThemeStyles: Record<
  ShowcaseTheme,
  {
    cardBackground: string;
    cardShadow: string;
    brandPillBg: string;
    brandPillClass: string;
    brandNameClass: string;
    productNameClass: string;
    tagClass: string;
    headlineClass: string;
    bodyClass: string;
    ctaClass: string;
  }
> = {
  rapido: {
    cardBackground: RAPIDO_YELLOW,
    cardShadow: "0 12px 48px rgba(0,0,0,0.18)",
    brandPillBg: RAPIDO_YELLOW_SOFT,
    brandPillClass: "",
    brandNameClass: "font-heading text-sm font-black lowercase tracking-tight text-neutral-900",
    productNameClass: "font-heading text-5xl font-black leading-none tracking-tight text-neutral-900 md:text-6xl",
    tagClass: "rounded-full border-2 border-neutral-900 px-3 py-1 text-xs font-semibold text-neutral-900 md:text-sm",
    headlineClass: "font-heading mt-7 text-xl font-bold leading-snug text-neutral-900 md:text-2xl",
    bodyClass: "mt-3 max-w-lg text-sm leading-relaxed text-neutral-900/85 md:text-base",
    ctaClass:
      "mt-8 inline-flex w-fit items-center rounded-xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-neutral-800",
  },
  smartHelm: {
    cardBackground:
      "linear-gradient(155deg, #ecfdf3 0%, #d8f3dc 38%, #b7e4c7 72%, #95d5b2 100%)",
    cardShadow: "0 14px 48px rgba(34, 84, 61, 0.18)",
    brandPillBg:
      "linear-gradient(125deg, #f7fee7 0%, #ecfccb 42%, #d9f99d 88%, #d4fc79 100%)",
    brandPillClass: "border border-lime-600/15 shadow-[0_1px_3px_rgba(63,98,18,0.08)]",
    brandNameClass:
      "font-heading text-sm font-black tracking-tight text-[#14532d]",
    productNameClass:
      "font-heading text-4xl font-black leading-[1.05] tracking-tight text-neutral-900 md:text-5xl lg:text-[2.75rem]",
    tagClass:
      "rounded-full border-2 border-[#1b4332]/35 bg-white/50 px-3 py-1 text-xs font-semibold text-[#1b4332] backdrop-blur-sm md:text-sm",
    headlineClass: "font-heading mt-7 text-xl font-bold leading-snug text-neutral-900 md:text-2xl",
    bodyClass: "mt-3 max-w-lg text-sm leading-relaxed text-neutral-900/80 md:text-base",
    ctaClass:
      "mt-8 inline-flex w-fit items-center rounded-xl bg-[#1b4332] px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-[#2d6a4f]",
  },
  ielts: {
    cardBackground:
      "linear-gradient(152deg, #fffdfb 0%, #fff5f0 38%, #fde8de 72%, #fcd5c8 100%)",
    cardShadow: "0 14px 48px rgba(232, 80, 26, 0.16)",
    brandPillBg:
      "linear-gradient(125deg, #fff4ed 0%, #ffe8dc 42%, #ffd4c4 88%, #ffc9b5 100%)",
    brandPillClass: "border border-[#E8501A]/20 shadow-[0_1px_3px_rgba(232,80,26,0.12)]",
    brandNameClass:
      "font-heading text-sm font-black tracking-tight text-[#b83a0f]",
    productNameClass:
      "font-heading text-4xl font-black leading-[1.05] tracking-tight text-neutral-900 md:text-5xl lg:text-[2.75rem]",
    tagClass:
      "rounded-full border-2 border-[#E8501A]/35 bg-white/60 px-3 py-1 text-xs font-semibold text-[#7c2d12] backdrop-blur-sm md:text-sm",
    headlineClass: "font-heading mt-7 text-xl font-bold leading-snug text-neutral-900 md:text-2xl",
    bodyClass: "mt-3 max-w-lg text-sm leading-relaxed text-neutral-900/82 md:text-base",
    ctaClass:
      "mt-8 inline-flex w-fit items-center rounded-xl bg-[#E8501A] px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-[#c74315]",
  },
};

type StandardProject = {
  variant?: undefined;
  title: string;
  company: string;
  companyShort: string;
  companyColor: string;
  slug: string;
  tags: string[];
  mockupBg: string;
  phoneImage: string | null;
  fallbackImage: string;
};

type ShowcaseProject = {
  variant: "showcase";
  theme: ShowcaseTheme;
  slug: string;
  brandName: string;
  productName: string;
  headline: string;
  description: string;
  tags: string[];
  mockupSrc: string;
  mockupAlt: string;
  mockupBg: string;
  /** Light panels keep the device screenshot visually dominant (no heavy dark vignette). */
  mockupPanelTone?: "dark" | "light";
  /** Black phone chassis around the screenshot (parallax moves the whole device). */
  mockupDeviceFrame?: "none" | "phone-black";
};

type Project = StandardProject | ShowcaseProject;

const projects: Project[] = [
  {
    variant: "showcase",
    theme: "smartHelm",
    slug: "smart-helmet-bike-care",
    brandName: "Smart Helmet",
    productName: "Smart Helmet",
    headline: "Smart Helmet & Bike Care — connected safety for riders",
    description:
      "IoT helmet companion app: live helmet and bike status, location, emergency controls, and theft reporting — designed for one-glance clarity on the road.",
    tags: ["IoT", "UX Research", "Mobile", "Safety"],
    mockupSrc: "/smart-helmet-dashboard-mockup.png",
    mockupAlt: "Smart Helmet app dashboard — helmet and bike status, map preview, and emergency controls",
    mockupBg: "linear-gradient(165deg, #f7fefb 0%, #ecfdf5 45%, #dff7ea 100%)",
    mockupPanelTone: "light",
    mockupDeviceFrame: "phone-black",
  },
  {
    variant: "showcase",
    theme: "ielts",
    slug: "ielts-speaking-lab",
    brandName: "IELTS Speaking Lab",
    productName: "Speaking Lab",
    headline: "AI-powered answers from your own ideas — and vocabulary that sticks",
    description:
      "A web platform that turns rough speaking ideas into personalised Band 7–9 answers, with topic-linked word banks and a five-step practice loop.",
    tags: ["Web", "UX Research", "GenAI", "EdTech"],
    mockupSrc: "/ielts-speaking-lab/home.png",
    mockupAlt: "IELTS Speaking Lab — home dashboard",
    mockupBg: "linear-gradient(165deg, #1c1917 0%, #292524 45%, #431407 100%)",
    mockupPanelTone: "dark",
  },
  {
    variant: "showcase",
    theme: "rapido",
    slug: "rapido-captain",
    brandName: "rapido",
    productName: "Captain",
    headline: "Enhancing pick-up accuracy for drivers",
    description:
      "A case study where I improved pick-up accuracy in the driver app by using image view and street view, which helped reduce order cancellations.",
    tags: ["UX design", "Driver App", "Mobility"],
    mockupSrc: "/rapido-hero-pickup-screen.png",
    mockupAlt: "Rapido Captain — driver app pickup map",
    mockupBg: "#1e1b4b",
  },
];

type MockupPanelAccent = "default" | "lime" | "orange";

/** Right-column mockup panel — matches AI / standard project cards */
const ProjectMockupPanel = ({
  mockupBg,
  children,
  accent = "default",
  panelTone = "dark",
}: {
  mockupBg: string;
  children: ReactNode;
  accent?: MockupPanelAccent;
  panelTone?: "dark" | "light";
}) => (
  <div className="md:w-[44%] flex-shrink-0 flex items-center justify-center p-5">
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-3xl"
      style={{ background: mockupBg, minHeight: "280px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            panelTone === "light"
              ? "radial-gradient(circle, rgba(22,101,52,0.07) 1px, transparent 1px)"
              : "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            accent === "lime"
              ? panelTone === "light"
                ? "radial-gradient(ellipse 75% 65% at 55% 45%, rgba(163,230,53,0.22) 0%, transparent 68%)"
                : "radial-gradient(ellipse 70% 60% at 60% 60%, rgba(163,230,53,0.14) 0%, transparent 70%)"
              : accent === "orange"
                ? "radial-gradient(ellipse 72% 62% at 55% 48%, rgba(232,80,26,0.2) 0%, transparent 70%)"
                : "radial-gradient(ellipse 70% 60% at 60% 60%, rgba(100,140,255,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            panelTone === "light"
              ? "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(22,101,52,0.06) 100%)"
              : "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      <div className="absolute top-5 left-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
        <Lock className="h-4 w-4 text-gray-700" strokeWidth={2.5} />
      </div>
      {children}
    </div>
  </div>
);

/* ─── Section header ──────────────────────────────────────────────────── */
const ProjectsSection = () => {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();

  return (
    <section id="projects" className="py-28 px-6 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Recent Work
          </motion.p>

          <h2 className="font-heading font-heading-display font-bold text-3xl md:text-4xl text-white mb-4 max-w-xl leading-[1.05] tracking-heading-tight">
            <SplitText
              text="Selection of experienced product design solutions"
              delay={0.05}
              stagger={0.06}
              margin="-30px"
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{ color: "rgba(255,255,255,0.75)" }}
            className="max-w-2xl"
          >
            Innovative digital concepts crafted with precision and purpose.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 mt-14">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Rapido-style showcase cards (yellow Captain + dark Smart Helm) ───── */
const ShowcaseProjectCard = ({
  project,
  index,
}: {
  project: ShowcaseProject;
  index: number;
}) => {
  const { ref, isInView } = useScrollAnimation({ margin: "-60px" });
  const cardRef = useRef<HTMLDivElement>(null);
  const t = showcaseThemeStyles[project.theme];

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [40, -25]);

  return (
    <Link to={`/case-study/${project.slug}#case-study-intro`}>
      <motion.div
        ref={(el) => {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        initial={{ opacity: 0, y: 48 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, transition: { duration: 0.28 } }}
        className="group relative cursor-pointer overflow-hidden rounded-3xl"
        style={{
          background: t.cardBackground,
          boxShadow: t.cardShadow,
        }}
      >
        <div className="flex min-h-[300px] flex-col md:flex-row">
          <div className="flex flex-1 flex-col justify-center px-8 py-10 md:px-10 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + index * 0.1 }}
              className={`mb-5 inline-flex w-fit rounded-full px-4 py-1.5 ${t.brandPillClass}`}
              style={{ background: t.brandPillBg }}
            >
              <span className={t.brandNameClass}>{project.brandName}</span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.18 + index * 0.1 }}
              className={t.productNameClass}
            >
              {project.productName}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.28 + index * 0.1 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <span key={tag} className={t.tagClass}>
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.h4
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.36 + index * 0.1 }}
              className={t.headlineClass}
            >
              {project.headline}
            </motion.h4>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.44 + index * 0.1 }}
              className={t.bodyClass}
            >
              {project.description}
            </motion.p>

            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.52 + index * 0.1 }}
              className={t.ctaClass}
            >
              View Case Study
            </motion.span>
          </div>

          <ProjectMockupPanel
            mockupBg={project.mockupBg}
            accent={
              project.theme === "smartHelm" ? "lime" : project.theme === "ielts" ? "orange" : "default"
            }
            panelTone={project.mockupPanelTone ?? "dark"}
          >
            {project.theme === "ielts" ? (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.25 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: phoneY }}
                className="relative z-10 h-[min(340px,52vw)] w-full max-w-[280px] overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.55)] ring-1 ring-white/15 sm:max-w-[300px] md:h-[min(380px,36vw)] md:max-w-none"
              >
                <IeltsDesignBoardShowcase density="compact" showInnerLock={false} className="min-h-full" />
              </motion.div>
            ) : project.mockupDeviceFrame === "phone-black" ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.95, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: phoneY }}
                className="relative z-10 mx-auto flex shrink-0 items-center justify-center p-6 md:p-8"
              >
                <div className="rounded-[2.35rem] border-2 border-black bg-black p-[9px] shadow-[0_28px_80px_rgba(0,0,0,0.4)]">
                  <img
                    src={project.mockupSrc}
                    alt={project.mockupAlt}
                    className="block h-auto w-[167px] rounded-[1.65rem] md:w-[202px]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.img
                src={project.mockupSrc}
                alt={project.mockupAlt}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.95, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: phoneY }}
                className={`relative z-10 mt-8 w-[185px] rounded-2xl md:w-[220px] ${
                  project.mockupPanelTone === "light"
                    ? "shadow-[0_28px_72px_rgba(15,40,25,0.38)] ring-1 ring-black/[0.07]"
                    : "shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
                }`}
                loading="lazy"
                decoding="async"
              />
            )}
          </ProjectMockupPanel>
        </div>
      </motion.div>
    </Link>
  );
};

/* ─── Standard project card ─────────────────────────────────────────────── */
const StandardProjectCard = ({
  project,
  index,
}: {
  project: StandardProject;
  index: number;
}) => {
  const { ref, isInView } = useScrollAnimation({ margin: "-60px" });
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [40, -25]);

  return (
    <Link to={`/case-study/${project.slug}#case-study-intro`}>
      <motion.div
        ref={(el) => {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        initial={{ opacity: 0, y: 48 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, transition: { duration: 0.28 } }}
        className="group relative rounded-3xl bg-white overflow-hidden cursor-pointer"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.10)" }}
      >
        <div className="flex flex-col md:flex-row min-h-[300px]">

          {/* ── Left: content ── */}
          <div className="flex-1 flex flex-col justify-center px-10 py-12 md:py-14">

            {/* Company badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + index * 0.1 }}
              className="flex items-center gap-3 mb-7"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-base font-black select-none flex-shrink-0 shadow-sm"
                style={{ background: `linear-gradient(135deg, ${project.companyColor}, ${project.companyColor}cc)` }}
              >
                ✦
              </div>
              <span
                className="font-heading font-black text-2xl md:text-3xl tracking-tight leading-none"
                style={{ color: project.companyColor }}
              >
                {project.companyShort}
              </span>
              <span className="text-sm font-medium text-gray-400">
                ({project.company})
              </span>
            </motion.div>

            <h3
              className="font-heading font-black text-gray-900 mb-7 leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}
            >
              <SplitText
                text={project.title}
                delay={0.2 + index * 0.1}
                stagger={0.04}
                margin="-20px"
              />
            </h3>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex flex-wrap items-center gap-x-2 gap-y-2"
            >
              {project.tags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-x-2">
                  <span
                    className="text-base font-semibold tracking-wide"
                    style={{ color: "#374151" }}
                  >
                    {tag}
                  </span>
                  {i < project.tags.length - 1 && (
                    <span
                      className="text-lg font-black select-none"
                      style={{ color: project.companyColor, opacity: 0.7 }}
                    >
                      ◆
                    </span>
                  )}
                </span>
              ))}
            </motion.div>
          </div>

          <ProjectMockupPanel mockupBg={project.mockupBg}>
            {project.phoneImage ? (
              <motion.img
                src={project.phoneImage}
                alt={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.95, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: phoneY }}
                className="relative z-10 mt-8 w-[185px] rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.55)] md:w-[220px]"
              />
            ) : (
              <img
                src={project.fallbackImage}
                alt={project.title}
                className="absolute inset-0 z-0 h-full w-full object-cover opacity-30"
              />
            )}
          </ProjectMockupPanel>

        </div>
      </motion.div>
    </Link>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  if (project.variant === "showcase") {
    return <ShowcaseProjectCard project={project} index={index} />;
  }
  return <StandardProjectCard project={project} index={index} />;
};

export default ProjectsSection;
