import { type ReactNode, type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Smile, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/** Captain case study — yellow category pill (shared inner-page layout). */
export const caseStudyHeroYellow = "bg-[#F5D547] text-neutral-900";

export const caseStudySectionEyebrow =
  "font-heading text-sm font-bold uppercase tracking-[0.2em] text-amber-600";

const heroTwoColStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.06 },
  },
};

const heroLeftStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

const heroScrollItem = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroMetricsStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.02 },
  },
};

/** `source` — optional citation line (bento KPI tiles). When omitted, `label` renders uppercase under the value (e.g. ROLE). */
export type CaseStudyHeroMetaRow = { label: string; value: string; source?: string };

export type CaseStudyHeroMetric = { value: string; description: string };

const bentoCard =
  "rounded-[1.25rem] border border-neutral-200/90 bg-white shadow-sm md:rounded-[1.5rem]";
const bentoMetricCard =
  "rounded-xl border border-neutral-200/90 bg-white px-4 py-4 shadow-sm md:rounded-[1.2rem] md:px-5 md:py-5";

/** Default icons for bento outcome / KPI tiles (speed, satisfaction, lift). */
const bentoOutcomeIcons = [Zap, Smile, TrendingUp] as const;
const bentoOutcomeValueTone = ["text-violet-600", "text-emerald-600", "text-amber-600"] as const;
const bentoOutcomeIconTone = ["text-violet-600", "text-emerald-600", "text-amber-600"] as const;

type CaseStudyStandardHeroProps = {
  heroIntroRef: RefObject<HTMLElement | null>;
  pillText: string;
  title: ReactNode;
  subtitle: string;
  /** Exactly three items — ROLE / TOOLS / DURATION style row. */
  metaRows: [CaseStudyHeroMetaRow, CaseStudyHeroMetaRow, CaseStudyHeroMetaRow];
  /** Optional second row — large number + caption cards (Captain KPIs). */
  metrics?: [CaseStudyHeroMetric, CaseStudyHeroMetric, CaseStudyHeroMetric];
  imageSrc: string;
  imageAlt: string;
  /** Match Captain mockup column width */
  imageMaxClassName?: string;
  /** Hero layouts for different case-study presentation styles. */
  layout?: "classic" | "bento" | "editorial";
  /** Shown under the pill in bento layout (e.g. year or date range). */
  timeline?: string;
};

function useHeroMockupMotion(heroIntroRef: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroIntroRef,
    offset: ["start end", "end start"],
  });
  const mockupParallaxY = useTransform(
    heroScrollProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [18, -36],
  );
  const mockupRotate = useTransform(
    heroScrollProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [0, 0, 0] : [-1.5, 0, 2],
  );
  return { prefersReducedMotion, mockupParallaxY, mockupRotate };
}

type BentoHeroMotionProps = {
  prefersReducedMotion: boolean | null;
  mockupParallaxY: MotionValue<number>;
  mockupRotate: MotionValue<number>;
};

function CaseStudyBentoHero({
  heroIntroRef,
  pillText,
  title,
  subtitle,
  metaRows,
  timeline,
  imageSrc,
  imageAlt,
  prefersReducedMotion,
  mockupParallaxY,
  mockupRotate,
}: Omit<CaseStudyStandardHeroProps, "layout" | "metrics" | "imageMaxClassName"> & BentoHeroMotionProps) {
  return (
    <section
      ref={heroIntroRef}
      id="case-study-intro"
      className="mb-20 scroll-mt-28 rounded-[1.5rem] bg-[hsl(270_35%_97%)] p-3 sm:p-4 md:rounded-[1.75rem] md:p-5"
    >
      <motion.div
        className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-[minmax(0,1.22fr)_minmax(240px,0.4fr)] lg:grid-rows-[auto_minmax(0,1fr)]"
        variants={heroTwoColStagger}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
      >
        {/* Main story card */}
        <motion.div
          variants={heroScrollItem}
          className={cn(bentoCard, "p-5 md:p-6 lg:col-start-1 lg:row-start-1")}
        >
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
                caseStudyHeroYellow,
              )}
            >
              {pillText}
            </span>
            <span className="font-heading text-sm font-semibold tracking-tight text-neutral-800">
              Smart <span className="text-violet-700">Helmet</span>
            </span>
          </div>
          {timeline ? (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">{timeline}</p>
          ) : null}
          <h1 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-neutral-900 md:text-4xl lg:text-[2.35rem]">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600 md:text-[17px]">{subtitle}</p>
        </motion.div>

        {/* Three metric / meta tiles */}
        <motion.div
          variants={heroLeftStagger}
          className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-stretch sm:gap-3 md:gap-4 lg:col-start-1 lg:row-start-2"
        >
          {metaRows.map((row, i) => {
            const Icon = bentoOutcomeIcons[i] ?? TrendingUp;
            const valueClass = bentoOutcomeValueTone[i] ?? "text-violet-600";
            const iconClass = bentoOutcomeIconTone[i] ?? "text-violet-600";
            return (
              <motion.div
                key={`${row.value}-${row.label}`}
                variants={heroScrollItem}
                className={cn(bentoMetricCard, "flex h-full min-h-0 flex-col justify-center gap-3.5")}
              >
                <div className="flex items-center justify-between gap-3">
                  <p
                    className={cn(
                      "font-heading min-w-0 text-2xl font-bold leading-none tracking-tight sm:text-[1.65rem] md:text-3xl lg:text-[2rem]",
                      valueClass,
                    )}
                  >
                    {row.value}
                  </p>
                  <Icon
                    className={cn("h-6 w-6 shrink-0 opacity-95 sm:h-7 sm:w-7", iconClass)}
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>
                {row.source ? (
                  <div className="flex flex-col gap-2 text-left">
                    <p className="text-sm font-medium leading-snug text-neutral-700 md:text-[15px] md:leading-relaxed">
                      {row.label}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-400 md:text-xs">
                      {row.source}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500 md:text-[15px]">{row.label}</p>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tall mockup column */}
        <motion.div
          variants={heroScrollItem}
          className={cn(
            bentoCard,
            "flex min-h-[220px] items-center justify-center overflow-hidden p-3 sm:min-h-[240px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-[min(100%,400px)] lg:self-stretch",
          )}
        >
          <motion.div
            style={{ y: mockupParallaxY, rotate: mockupRotate }}
            className="relative w-full max-w-[min(100%,280px)] will-change-transform lg:max-w-[min(100%,300px)]"
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-neutral-200/80 bg-white shadow-md">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="block h-auto w-full object-cover object-top"
                loading="eager"
                decoding="async"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function CaseStudyStandardHero({
  heroIntroRef,
  pillText,
  title,
  subtitle,
  metaRows,
  metrics,
  imageSrc,
  imageAlt,
  imageMaxClassName = "max-w-[260px]",
  layout = "classic",
  timeline,
}: CaseStudyStandardHeroProps) {
  const { prefersReducedMotion, mockupParallaxY, mockupRotate } = useHeroMockupMotion(heroIntroRef);

  if (layout === "bento") {
    return (
      <CaseStudyBentoHero
        heroIntroRef={heroIntroRef}
        pillText={pillText}
        title={title}
        subtitle={subtitle}
        metaRows={metaRows}
        timeline={timeline}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        prefersReducedMotion={prefersReducedMotion}
        mockupParallaxY={mockupParallaxY}
        mockupRotate={mockupRotate}
      />
    );
  }

  if (layout === "editorial") {
    return (
      <section
        ref={heroIntroRef}
        id="case-study-intro"
        className="mb-20 scroll-mt-28 rounded-[1.5rem] border border-neutral-200/90 bg-white p-5 md:rounded-[1.75rem] md:p-7"
      >
        <motion.div
          className="space-y-6"
          variants={heroTwoColStagger}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
        >
          <motion.div variants={heroLeftStagger} className="space-y-4">
            <motion.div variants={heroScrollItem} className="flex flex-wrap items-center gap-3">
              <p
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
                  caseStudyHeroYellow,
                )}
              >
                {pillText}
              </p>
              {timeline ? (
                <p className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-sky-800">
                  {timeline}
                </p>
              ) : null}
            </motion.div>
            <motion.h1
              variants={heroScrollItem}
              className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-neutral-900 md:text-5xl"
            >
              {title}
            </motion.h1>
            <motion.p variants={heroScrollItem} className="max-w-none text-[1.04rem] leading-relaxed text-neutral-700 md:text-[1.14rem]">
              {subtitle}
            </motion.p>
          </motion.div>

          <motion.div variants={heroScrollItem} className="flex flex-wrap gap-2.5">
            {metaRows.map((row) => (
              <span
                key={row.label}
                className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-neutral-700 md:text-sm"
              >
                {row.value}
              </span>
            ))}
            {metrics
              ? metrics.map((m) => (
                  <span
                    key={m.value + m.description}
                    className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-neutral-700 md:text-sm"
                  >
                    {m.value} · {m.description}
                  </span>
                ))
              : null}
          </motion.div>

          <motion.div variants={heroScrollItem} className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-50 shadow-sm">
            <div className="will-change-transform">
              <img src={imageSrc} alt={imageAlt} className="block h-auto w-full object-contain object-center" loading="eager" decoding="async" />
            </div>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      ref={heroIntroRef}
      id="case-study-intro"
      className="mb-20 scroll-mt-28 rounded-[1.5rem] bg-neutral-100 p-8 md:p-12"
    >
      <motion.div
        className="grid gap-10 lg:grid-cols-2 lg:items-start"
        variants={heroTwoColStagger}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      >
        <motion.div variants={heroLeftStagger} className="min-w-0 space-y-8">
          <motion.div variants={heroScrollItem} className="space-y-4">
            <p className={cn("inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider", caseStudyHeroYellow)}>
              {pillText}
            </p>
            <h1 className="font-heading text-4xl font-bold text-neutral-900 md:text-5xl">{title}</h1>
            <p className="text-lg text-neutral-600">{subtitle}</p>
          </motion.div>
          <motion.div variants={heroScrollItem} className="grid gap-3 sm:grid-cols-3">
            {metaRows.map((row) => (
              <div key={row.label} className="rounded-xl bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-neutral-500">{row.label}</p>
                <p className="text-sm font-medium text-neutral-900">{row.value}</p>
              </div>
            ))}
          </motion.div>
          {metrics ? (
            <motion.div variants={heroMetricsStagger} className="grid gap-4 sm:grid-cols-3">
              {metrics.map((m) => (
                <motion.div
                  key={m.value + m.description}
                  variants={heroScrollItem}
                  className="flex h-full min-h-0 flex-col justify-center gap-3.5 rounded-xl border border-neutral-200/90 bg-white px-4 py-4 shadow-sm md:rounded-[1.2rem] md:px-5 md:py-5"
                >
                  <p className="font-heading text-3xl font-bold leading-none tracking-tight text-neutral-900 md:text-4xl">{m.value}</p>
                  <p className="text-sm font-medium leading-snug text-neutral-700 md:text-[15px] md:leading-relaxed">{m.description}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </motion.div>
        <motion.div variants={heroScrollItem} className="flex justify-center lg:justify-end">
          <motion.div
            style={{ y: mockupParallaxY, rotate: mockupRotate }}
            className={cn("w-full will-change-transform", imageMaxClassName)}
          >
            <div className="overflow-hidden rounded-[1.75rem] border border-neutral-200/80 bg-neutral-900/5 shadow-[0_22px_56px_rgba(0,0,0,0.22)]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="block h-auto w-full object-cover object-top"
                loading="eager"
                decoding="async"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
