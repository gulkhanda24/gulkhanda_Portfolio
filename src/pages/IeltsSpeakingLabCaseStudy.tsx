import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import type { CaseStudy } from "@/data/caseStudies";
import { cn } from "@/lib/utils";
import CaseStudySiteChrome from "@/components/CaseStudySiteChrome";
import CaseStudyStandardHero, { caseStudySectionEyebrow } from "@/components/CaseStudyStandardHero";

const ieltsScreensFlow = [
  { src: "/ielts-speaking-lab/home.png", shortLabel: "Home", alt: "IELTS Speaking Lab home dashboard" },
  { src: "/ielts-speaking-lab/part-1-practice.png", shortLabel: "Part 1", alt: "Part 1 practice flow" },
  { src: "/ielts-speaking-lab/part-2-3-practice.png", shortLabel: "Part 2 & 3", alt: "Part 2 and Part 3 practice" },
  { src: "/ielts-speaking-lab/topics-part-1.png", shortLabel: "Topics · Part 1", alt: "My Answers topic grid Part 1" },
  { src: "/ielts-speaking-lab/topics-part-2-3.png", shortLabel: "Topics · Part 2 to 3", alt: "My Answers topic grid Part 2 to 3" },
  { src: "/ielts-speaking-lab/answers-part-1-detail.png", shortLabel: "Saved · Part 1", alt: "Saved answers Part 1 detail" },
  { src: "/ielts-speaking-lab/answers-part-1-list.png", shortLabel: "Saved · Environment", alt: "Saved answers list" },
  { src: "/ielts-speaking-lab/answers-part-2-3-overview.png", shortLabel: "Saved · Overview", alt: "Saved Part 2 and 3 overview" },
  { src: "/ielts-speaking-lab/answers-part-2-3-detail.png", shortLabel: "Saved · Expanded", alt: "Saved answers expanded" },
  { src: "/ielts-speaking-lab/my-vocabulary.png", shortLabel: "Vocabulary", alt: "My Vocabulary" },
  { src: "/ielts-speaking-lab/subscription.png", shortLabel: "Plans", alt: "Subscription plans" },
  { src: "/ielts-speaking-lab/sign-up.png", shortLabel: "Sign up", alt: "Sign up" },
  { src: "/ielts-speaking-lab/view-profile.png", shortLabel: "Profile", alt: "View profile" },
  { src: "/ielts-speaking-lab/edit-profile.png", shortLabel: "Edit profile", alt: "Edit profile" },
] as const;

const ieltsScreensMarqueeLoop = [
  ...ieltsScreensFlow,
  ...ieltsScreensFlow,
  ...ieltsScreensFlow,
  ...ieltsScreensFlow,
] as const;

function IeltsScreenMockupCard({
  item,
  index,
  motionProps = true,
}: {
  item: (typeof ieltsScreensFlow)[number];
  index: number;
  motionProps?: boolean;
}) {
  const inner = (
    <div
      className={cn(
        "flex w-[min(92vw,560px)] flex-shrink-0 cursor-default flex-col items-center gap-2.5 select-none sm:w-[540px]",
        motionProps && "will-change-transform",
      )}
    >
      <div
        className={cn(
          "w-full rounded-2xl border-2 border-dashed border-neutral-300 bg-gradient-to-b from-neutral-100 to-neutral-200/90 p-3 shadow-inner sm:p-4",
          "flex min-h-[120px] min-w-0 items-center justify-center",
        )}
      >
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-[0_14px_44px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.05]">
          <img
            src={item.src}
            alt={item.alt}
            className="block h-[min(42vh,360px)] w-full object-contain object-top sm:h-[min(44vh,400px)]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <span className="max-w-[16rem] text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
        {item.shortLabel}
      </span>
    </div>
  );

  if (!motionProps) {
    return <div>{inner}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.42,
        delay: (index % ieltsScreensFlow.length) * 0.02,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.02, y: -3, transition: { duration: 0.16 } }}
    >
      {inner}
    </motion.div>
  );
}

function IeltsScreensMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 90, damping: 58 });
  const mockupsXShift = useTransform(smoothVelocity, [-2500, 0, 2500], [10, 0, -10]);

  if (prefersReducedMotion) {
    return (
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-neutral-50 py-8">
        <div className="flex w-max items-stretch gap-6 px-5 pb-1">
          {ieltsScreensFlow.map((item, i) => (
            <IeltsScreenMockupCard key={item.src} item={item} index={i} motionProps={false} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="marquee-mask-ielts overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 py-10 shadow-inner">
      <div className="overflow-hidden">
        <motion.div style={{ x: mockupsXShift }}>
          <div className="animate-marquee-ielts flex w-max items-stretch gap-6 px-5">
            {ieltsScreensMarqueeLoop.map((item, i) => (
              <IeltsScreenMockupCard key={`${i}-${item.src}`} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const jumpClass =
  "text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline";

const fadeBlock = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
} as const;

const DOC_TITLE = "IELTS Speaking Lab: Case Study";

const PRE_IELTS_JOURNEY_STEPS = [
  { materialIcon: "travel_explore", t: "Awareness", d: 'Googles "IELTS Speaking tips"' },
  { materialIcon: "local_library", t: "Content Hunt", d: "YouTube, Reddit, PDFs" },
  { materialIcon: "edit_note", t: "Practice", d: "Reads generic model answers" },
  { materialIcon: "trending_flat", t: "Plateau", d: "Progress stalls" },
  { materialIcon: "school", t: "Exam", d: "Freezes on unfamiliar topics" },
] as const;

/** Smooth sinusoidal path across five columns (viewBox 0 0 1000 120). */
const JOURNEY_WAVE_PATH =
  "M0,62 C100,28 140,94 200,62 S320,30 400,62 S520,94 600,62 S720,28 800,62 S920,90 1000,62";

function PreIeltsJourneyStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#e3d9cc] bg-[#f5f0e8]">
      <div className="relative px-4 py-10 md:px-8 md:py-12">
        <motion.p
          className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c7f72] md:mb-8"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-24px" }}
          transition={{ duration: 0.4 }}
        >
          Fragmented prep → rising friction → exam day
        </motion.p>

        {/* One continuous journey row: wave sits behind icons (reference: dashed orange thread through the flow). */}
        <div className="relative min-h-[260px] md:min-h-[280px]">
          <svg
            className="pointer-events-none absolute inset-x-2 top-[52%] z-0 h-[5.25rem] w-[calc(100%-1rem)] -translate-y-1/2 md:inset-x-4 md:h-[5.75rem] md:w-[calc(100%-2rem)]"
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            <motion.path
              d={JOURNEY_WAVE_PATH}
              stroke="#E8501A"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeDasharray="8 10"
              vectorEffect="non-scaling-stroke"
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 0.92 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>

          <div
            className="relative z-[1] flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 pt-1 md:grid md:grid-cols-5 md:gap-2 md:overflow-visible md:pb-0 md:pt-0 md:snap-none"
            role="list"
            aria-label="Learner journey before IELTS Speaking Lab"
          >
            {PRE_IELTS_JOURNEY_STEPS.map((s, i) => (
              <motion.article
                key={s.t}
                role="listitem"
                className="flex w-[min(78vw,188px)] flex-shrink-0 snap-center flex-col items-center bg-transparent px-2 py-1 text-center md:w-auto md:min-w-0 md:px-1.5"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-48px" }}
                transition={{ duration: 0.45, delay: reduceMotion ? 0 : i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <h5 className="max-w-[11rem] font-philosophy text-[0.95rem] font-bold leading-snug text-[#c2410c] md:max-w-none md:text-[1.05rem]">
                  {s.t}
                </h5>
                <p className="mt-1.5 max-w-[11rem] text-[11px] leading-snug text-[#6b635a] md:max-w-none md:text-xs">
                  {s.d}
                </p>
                <div className="relative z-[2] mt-6 flex min-h-[5.5rem] flex-1 flex-col items-center justify-center md:mt-8 md:min-h-[6.25rem]">
                  {/* Soft cream halo so the wave reads “behind” the glyph without a white tile */}
                  <span
                    className="material-symbols-rounded relative inline-flex text-[3rem] leading-none text-neutral-900 drop-shadow-sm after:pointer-events-none after:absolute after:inset-[-10px] after:-z-10 after:rounded-full after:bg-[#f5f0e8]/90 after:blur-[3px] after:content-[''] md:text-[3.5rem]"
                    aria-hidden
                  >
                    {s.materialIcon}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IeltsSpeakingLabCaseStudy({ study }: { study: CaseStudy }) {
  const heroIntroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prev = document.title;
    document.title = DOC_TITLE;
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <CaseStudySiteChrome
      study={study}
      pageKey="ielts-speaking-lab"
      subNav={
        <nav aria-label="Case study sections" className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-b border-border pb-4">
          <a href="#roadmap" className={jumpClass}>
            Roadmap
          </a>
          <a href="#discovery" className={jumpClass}>
            Discovery
          </a>
          <a href="#research" className={jumpClass}>
            Research
          </a>
          <a href="#design" className={jumpClass}>
            Design
          </a>
          <a href="#solution" className={jumpClass}>
            Solution
          </a>
          <a href="#reflection" className={jumpClass}>
            Reflection
          </a>
          <a
            href="https://www.ieltsspeakinglab.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${jumpClass} text-amber-700`}
          >
            Live site →
          </a>
        </nav>
      }
    >
      <CaseStudyStandardHero
        heroIntroRef={heroIntroRef}
        layout="editorial"
        pillText={study.category.toUpperCase()}
        timeline="2024 - 2025"
        title="IELTS Speaking Lab"
        subtitle="An AI-powered web platform that turns a learner's rough ideas into personalised Band 7 to 9 answers and builds the vocabulary to sustain them."
        metaRows={[
          { label: "ROLE", value: "UX · UI · Developer" },
          { label: "PLATFORM", value: "Web (Next.js)" },
          { label: "TOOLS", value: "Figma, Next.js, Claude AI API" },
        ]}
        metrics={[
          { value: "1,200+", description: "Practice questions across Parts 1, 2 & 3" },
          { value: "400+", description: "Cue card topics with AI-powered generation" },
          { value: "$6/mo", description: "Premium tier at accessible global pricing" },
        ]}
        imageSrc="/ielts-speaking-lab/home.png"
        imageAlt="IELTS Speaking Lab home dashboard"
        imageMaxClassName="max-w-[min(100%,440px)]"
      />

      <motion.section {...fadeBlock} id="roadmap" className="mb-20 scroll-mt-28">
        <div className="text-center">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">Design Roadmap</h2>
          <p className="mt-3 text-sm text-neutral-500 md:text-base">A 5-stage case study from discovery to reflection.</p>
        </div>
        <div className="mt-10 rounded-[1.75rem] border border-[#e5ded3] bg-[#f4efe7] px-5 py-8 shadow-[0_14px_38px_rgba(0,0,0,0.06)] md:px-8 md:py-9">
          <div className="text-center">
            <h3 className="font-heading text-3xl font-bold text-neutral-900 md:text-4xl">Process overview</h3>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500 md:text-xs">
              Discovery → Research → Design → Solution → Reflection
            </p>
          </div>
          <div className="mt-6 border-t border-dashed border-[#ddd2c5]" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              {
                phase: "01 · Discovery",
                chips: ["User archetypes", "Speaking pain points"],
              },
              {
                phase: "02 · Research",
                chips: ["Interview insights", "Core workflow priorities"],
              },
              {
                phase: "03 · Design",
                chips: ["IA and journey map", "Interaction model"],
              },
              {
                phase: "04 · Solution",
                chips: ["v1 Part 1 experience", "Part 2/3 module planning"],
              },
              {
                phase: "05 · Reflection",
                chips: ["Risks and constraints", "Iteration priorities"],
              },
            ].map((stage) => (
              <article
                key={stage.phase}
                className="rounded-2xl border border-[#cfcbe3] bg-[#cfcdf0] p-4 shadow-[0_8px_20px_rgba(67,56,202,0.08)] md:p-5"
              >
                <p className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-700">{stage.phase}</p>
                <div className="mt-4 space-y-2.5">
                  {stage.chips.map((chip) => (
                    <div
                      key={chip}
                      className="rounded-xl border border-[#d8d8de] bg-white px-3 py-2 text-center text-xs font-semibold leading-snug text-neutral-700 shadow-sm"
                    >
                      {chip}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeBlock} id="discovery" className="mb-20 scroll-mt-28">
        <h2 className={caseStudySectionEyebrow}>DISCOVERY</h2>
        <h3 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
          A platform born from a real gap in IELTS preparation
        </h3>
        <p className="mt-4 w-full max-w-none text-lg font-medium leading-relaxed text-neutral-800 md:text-xl">
          IELTS Speaking is the most anxiety-inducing component of the world&apos;s most-sat English proficiency exam. Millions
          of candidates struggle not because they lack ideas, but because they cannot convert their thoughts into the fluent,
          band-appropriate language that examiners look for.
        </p>
        <p className="mt-6 w-full max-w-none text-base leading-relaxed text-neutral-600 md:text-lg">
          Generic model answers and rote memorisation strategies have dominated the market for decades, leaving learners with
          answers that feel borrowed, not owned. IELTS Speaking Lab is an AI-powered web application I conceived, designed
          end-to-end, and built from scratch. It turns a candidate&apos;s own rough ideas into polished, personalised Band 7 to 9
          answers and builds the vocabulary to sustain them.
        </p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
          <div className="bg-white px-6 py-8 text-center">
            <p className="font-heading text-3xl font-bold leading-none tracking-tight text-neutral-900 md:text-4xl">1,200+</p>
            <p className="mt-2 text-sm text-neutral-600">Practice questions across Parts 1, 2 &amp; 3</p>
          </div>
          <div className="bg-white px-6 py-8 text-center">
            <p className="font-heading text-3xl font-bold leading-none tracking-tight text-neutral-900 md:text-4xl">400+</p>
            <p className="mt-2 text-sm text-neutral-600">Cue card topics with AI-powered generation</p>
          </div>
          <div className="bg-white px-6 py-8 text-center">
            <p className="font-heading text-3xl font-bold leading-none tracking-tight text-neutral-900 md:text-4xl">5-step</p>
            <p className="mt-2 text-sm text-neutral-600">Streamlined workflow, completable in under 3 minutes</p>
          </div>
        </div>
        <div className="mt-10 rounded-2xl border border-neutral-200 border-l-[3px] border-l-[#E8501A] bg-[#fdf2ee] px-6 py-8 md:px-10">
          <p className="text-base font-medium italic leading-relaxed text-neutral-800 md:text-lg">
            Learners don&apos;t fail IELTS Speaking because they have nothing to say. They fail because the tools available teach
            them to mimic answers rather than construct their own.
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Core design insight</p>
        </div>
      </motion.section>

      <motion.section {...fadeBlock} id="discovery-problem" className="mb-20 scroll-mt-28">
        <h2 className={caseStudySectionEyebrow}>DISCOVERY · PROBLEM SPACE</h2>
        <h3 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
          Four compounding failures in IELTS Speaking preparation
        </h3>
        <p className="mt-4 w-full max-w-none text-base leading-relaxed text-neutral-600 md:text-lg">
          Through desk research, conversations with 20 IELTS candidates, and analysis of online communities (r/IELTS, 180k+
          members), I identified four root-cause failure modes in how people prepare for IELTS Speaking.
        </p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
          {[
            { n: "01", t: "Generic Answers", d: "Model answers are written for a hypothetical average candidate, not the individual learner's experiences. They sound unnatural in the exam room." },
            { n: "02", t: "Vocabulary Disconnect", d: "Learners accumulate word lists but struggle to connect vocabulary to specific speaking contexts. Words learned in isolation rarely transfer to spontaneous speech." },
            { n: "03", t: "No Progress Visibility", d: "Existing platforms offer no meaningful way to track growth across topics. Learners practice in a feedback vacuum, uncertain whether they are improving." },
            { n: "04", t: "Fragmented Workflow", d: "Candidates juggle multiple apps, YouTube channels, and textbooks, which creates cognitive overload and reduces time spent actually speaking." },
          ].map((c) => (
            <div key={c.n} className="bg-white p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">{c.n}</p>
              <h4 className="mt-2 font-heading text-lg font-bold text-neutral-900">{c.t}</h4>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-neutral-200 border-l-[3px] border-l-[#E8501A] bg-[#fdf2ee] px-6 py-8">
          <p className="text-base font-medium italic text-neutral-800 md:text-lg">
            &ldquo;I memorised 50 cue card answers. In the exam they gave me a topic I&apos;d never seen and I just froze.&rdquo;
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Survey respondent · Band 5.5 · Preparing for UK study visa
          </p>
        </div>
      </motion.section>

      <motion.section {...fadeBlock} id="research" className="mb-20 scroll-mt-28">
        <h2 className={caseStudySectionEyebrow}>RESEARCH &amp; DISCOVERY</h2>
        <h3 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">Understanding who actually sits IELTS</h3>
        <p className="mt-4 w-full max-w-none text-base leading-relaxed text-neutral-600 md:text-lg">
          Mixed-methods research including competitive analysis of 12 IELTS platforms, informal interviews with 20 candidates
          across different band target ranges, and large-scale community analysis to understand real pain points.
        </p>
        <h4 className="mt-12 font-heading text-xl font-bold text-neutral-900">User personas</h4>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            {
              role: "Aspirant",
              icon: "🎓",
              initials: "AJ",
              avatarTone: "bg-[#fde8de] text-[#E8501A]",
              title: "Aisha, 24",
              subtitle: "University student · Band 7+ for UK Master's",
              topTone: "bg-[#eeecff]",
              rows: [
                { label: "Goal", value: "Reach Band 7.0 in 6 weeks to meet her university's conditional offer." },
                { label: "Behaviour", value: "Studies 1 to 2 hours daily. Strong ideas but lacks confidence translating them into exam-appropriate English." },
                { label: "Frustration", value: "\"I know what I want to say but the words come out wrong.\"" },
                { label: "Needs", value: "Personalised answer scaffolding, band-targeted output, vocabulary anchored to her own ideas." },
              ],
            },
            {
              role: "Professional",
              icon: "💼",
              initials: "RK",
              avatarTone: "bg-sky-100 text-sky-800",
              title: "Ravi, 32",
              subtitle: "Software engineer · Band 8 for Canadian PR",
              topTone: "bg-[#eceeff]",
              rows: [
                { label: "Goal", value: "Score Band 8 overall. Speaking is his weakest skill at 6.5." },
                { label: "Behaviour", value: "Practices in 20-minute commute windows. Has tried 4 different apps." },
                { label: "Frustration", value: "\"I always use the same words: good, important, interesting.\"" },
                { label: "Needs", value: "Contextual vocabulary tied to topics, saved answer bank, progress tracking." },
              ],
            },
          ].map((persona) => (
            <article key={persona.title} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_14px_36px_rgba(0,0,0,0.06)]">
              <div className={cn("flex items-center justify-between border-b border-neutral-200 px-5 py-4", persona.topTone)}>
                <h5 className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-700">{persona.role}</h5>
                <span className="text-xl" aria-hidden>
                  {persona.icon}
                </span>
              </div>
              <div className="flex items-center gap-4 border-b border-neutral-100 px-5 py-4">
                <div className={cn("flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold", persona.avatarTone)}>
                  {persona.initials}
                </div>
                <div>
                  <p className="font-heading font-bold text-neutral-900">{persona.title}</p>
                  <p className="text-sm text-neutral-500">{persona.subtitle}</p>
                </div>
              </div>
              <div className="space-y-3 p-5">
                {persona.rows.map((row) => (
                  <div key={row.label} className="rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">{row.label}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">{row.value}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <h4 className="mt-12 font-heading text-xl font-bold text-neutral-900">User journey before IELTS Speaking Lab</h4>
        <PreIeltsJourneyStrip />
        <h4 className="mt-12 font-heading text-xl font-bold text-neutral-900">Competitive analysis</h4>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b-2 border-neutral-900 bg-neutral-50">
                {["Platform", "Personalisation", "Vocabulary", "Progress", "Custom topics"].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-neutral-600">
              <tr className="border-b border-neutral-100"><td className="px-4 py-3 font-medium">IELTS Test Pro</td><td className="px-4 py-3">AI feedback on recording</td><td className="px-4 py-3">None</td><td className="px-4 py-3">Score history</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b border-neutral-100"><td className="px-4 py-3 font-medium">IELTS Speaking Assistant</td><td className="px-4 py-3">None</td><td className="px-4 py-3">Topic lists</td><td className="px-4 py-3">None</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b border-neutral-100"><td className="px-4 py-3 font-medium">Generic AI chatbots</td><td className="px-4 py-3">Partial</td><td className="px-4 py-3">Ad hoc</td><td className="px-4 py-3">None</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="bg-emerald-50/80 font-semibold text-neutral-800">
                <td className="px-4 py-3">IELTS Speaking Lab</td>
                <td className="px-4 py-3"><span className="rounded bg-emerald-700 px-2 py-0.5 text-xs text-white">Full</span></td>
                <td className="px-4 py-3"><span className="rounded bg-emerald-700 px-2 py-0.5 text-xs text-white">Word bank</span></td>
                <td className="px-4 py-3"><span className="rounded bg-emerald-700 px-2 py-0.5 text-xs text-white">Per-topic</span></td>
                <td className="px-4 py-3"><span className="rounded bg-emerald-700 px-2 py-0.5 text-xs text-white">Premium</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section
        {...fadeBlock}
        id="design"
        className="mb-20 scroll-mt-28 rounded-[1.75rem] border border-neutral-200/80 bg-gradient-to-b from-white via-[#faf9f7] to-[#f4efe7]/40 p-6 shadow-[0_24px_80px_-28px_rgba(15,23,42,0.12)] md:p-10"
      >
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white/90 px-5 py-8 ring-1 ring-[#E8501A]/[0.08] md:px-8 md:py-10">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#E8501A]/[0.06] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-sky-500/[0.05] blur-3xl"
            aria-hidden
          />
          <h2 className={caseStudySectionEyebrow}>DESIGN PROCESS</h2>
          <h3 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">From insights to interaction design</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
            Each phase is packaged as a scannable card pair so the story reads quickly while staying dense with decisions.
          </p>

          <div className="relative mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {[
              {
                ph: "Phase 1",
                t: "Ideation & Information Architecture",
                p: 'Defined the core user mental model: "I have an idea → I want a great answer → I want to remember the best words." Established the Part 1 / Part 2 / Part 3 taxonomy as the primary navigation axis, matching the official exam structure users already understand.',
                band: "from-[#fff5f0] to-[#fde8de]",
              },
              {
                ph: "Phase 2",
                t: "Wireframing & Flow Prototyping",
                p: "Wireframed 14 screens in Figma. Iterated on the core generate-answer flow, reducing it from 7 steps to 5 after identifying friction where users had to navigate away mid-session. Introduced a panel system so idea input, answer output, and vocabulary all coexist on one screen.",
                band: "from-[#f0f7ff] to-[#e0edff]",
              },
              {
                ph: "Phase 3",
                t: "Visual Design System",
                p: "Built a custom design system with a neutral, high-contrast palette chosen to reduce cognitive load during study sessions. Defined component variants for cards, inputs, buttons, and tag systems at all state variations.",
                band: "from-[#f5f3ff] to-[#ebe7ff]",
              },
              {
                ph: "Phase 4",
                t: "AI Prompt Engineering",
                p: "The AI layer is a core design surface, not just an API call. Designed the prompt architecture to accept the user's raw idea + band level + answer length, returning consistently structured, Band-calibrated answers with integrated vocabulary extraction. Iterated 40+ prompt versions.",
                band: "from-[#fdf2ee] to-[#fce4d8]",
              },
              {
                ph: "Phase 5",
                t: "Build, Test & Iterate",
                p: "Built in Next.js with the Claude AI API. Conducted usability sessions with 8 IELTS candidates. Key findings led to: adding audio playback, vocabulary preview before generation, and per-topic saved-answer counts as a progress proxy.",
                band: "from-[#ecfdf5] to-[#d1fae5]",
              },
            ].map((row) => (
              <article
                key={row.ph}
                className="group flex min-h-[220px] flex-col overflow-hidden rounded-2xl border-2 border-neutral-200 bg-white shadow-[0_12px_40px_-18px_rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(232,80,26,0.18)]"
              >
                <div
                  className={cn(
                    "flex shrink-0 items-center justify-between border-b border-neutral-200/80 bg-gradient-to-br px-4 py-3.5 md:px-5",
                    row.band,
                  )}
                >
                  <span className="rounded-full border border-[#E8501A]/25 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#b83a0f] shadow-sm">
                    {row.ph}
                  </span>
                  <span className="text-lg opacity-70 transition-transform duration-300 group-hover:scale-110" aria-hidden>
                    {row.ph === "Phase 1" && "◇"}
                    {row.ph === "Phase 2" && "◎"}
                    {row.ph === "Phase 3" && "◆"}
                    {row.ph === "Phase 4" && "✦"}
                    {row.ph === "Phase 5" && "✓"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <h4 className="font-heading text-lg font-bold leading-snug text-neutral-900">{row.t}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{row.p}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <h4 className="mt-12 font-heading text-xl font-bold text-neutral-900 md:mt-14">System architecture</h4>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600 md:text-base">
          The product is built as a modular web stack: the learner-facing app talks to a Node API for topics, questions, and
          generation; the API orchestrates prompts and returns structured answers plus glossary-ready markup.
        </p>
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 md:p-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              { label: "Client", sub: "Next.js web app", detail: "Practice UI · Part flows · saves" },
              { label: "API", sub: "Node · Express", detail: "REST · validation · orchestration" },
              { label: "AI", sub: "LLM service", detail: "Answer + glossary generation" },
              { label: "Data", sub: "MySQL", detail: "Topics · questions · future user data" },
            ].map((layer) => (
              <div
                key={layer.label}
                className="flex flex-col rounded-xl border border-neutral-200 bg-white px-3 py-3 text-center shadow-sm md:px-4 md:py-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#E8501A]">{layer.label}</p>
                <p className="mt-1 font-heading text-sm font-bold text-neutral-900">{layer.sub}</p>
                <p className="mt-1 text-[11px] leading-snug text-neutral-500">{layer.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
            Client → API → AI → data
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {[
            {
              src: "/ielts-speaking-lab/part-1-practice.png",
              alt: "Part 1 practice: topic, question, rough answer, generate",
              cap: "Part 1: idea-first input, band targeting, and generated answer with glossary",
            },
            {
              src: "/ielts-speaking-lab/part-2-3-practice.png",
              alt: "Part 2 and Part 3 dual-panel flow",
              cap: "Part 2 and 3: cue card prompts and follow-up questions in one dashboard layout",
            },
          ].map((shot) => (
            <motion.figure
              key={shot.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-50 shadow-[0_20px_56px_rgba(0,0,0,0.08)]"
            >
              <div className="border-b border-neutral-200/80 bg-white px-4 py-2.5">
                <div className="mx-auto flex max-w-[180px] gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
                </div>
              </div>
              <img src={shot.src} alt={shot.alt} className="block w-full object-contain object-top" loading="lazy" decoding="async" />
              <figcaption className="border-t border-neutral-200/80 bg-white px-4 py-3 text-center text-xs font-medium text-neutral-500">
                {shot.cap}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div id="how-it-works" className="mt-14 scroll-mt-28">
          <div className="text-center">
            <h4 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">How It Works</h4>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-600 md:text-base">
              Five steps from choosing a prompt to a band-ready answer and vocabulary you can reuse.
            </p>
          </div>
          <div className="mt-10 rounded-[1.35rem] border border-[#f0e0d8] bg-white p-5 shadow-[0_16px_48px_-24px_rgba(232,80,26,0.14)] md:p-7">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
              <div className="relative rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-sm md:p-5">
                <ol className="relative space-y-0">
                  {[
                    {
                      n: "01",
                      title: "Select or create a question / cue card",
                      desc: "Pick from IELTS Speaking Part 1, 2, or 3.",
                    },
                    {
                      n: "02",
                      title: "Share your own ideas",
                      desc: "Pause and think what you want to say. Just a rough idea is enough.",
                    },
                    {
                      n: "03",
                      title: "Select your band and answer length",
                      desc: "Decide how advanced and detailed your answer should be.",
                    },
                    {
                      n: "04",
                      title: "Generate your personalized answer",
                      desc: "See how to turn your ideas into a fluent, natural answer that examiners love.",
                    },
                    {
                      n: "05",
                      title: "Get your smart vocabulary list",
                      desc: "Save useful words tailored to your chosen band level.",
                    },
                  ].map((step, i, arr) => (
                    <li key={step.n} className="relative flex gap-4 pb-10 last:pb-0">
                      {i < arr.length - 1 ? (
                        <span
                          className="absolute left-5 top-[2.75rem] h-[calc(100%-2.25rem)] w-px bg-[#f5d0c4]"
                          aria-hidden
                        />
                      ) : null}
                      <div className="relative z-[1] flex shrink-0 flex-col items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#E8501A] bg-[#fff5f0] text-[11px] font-bold text-[#E8501A] shadow-sm ring-2 ring-[#fde8de]">
                          {step.n}
                        </div>
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <p className="font-heading text-base font-bold leading-snug text-neutral-900 md:text-lg">{step.title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_18px_44px_-20px_rgba(232,80,26,0.18)] ring-1 ring-[#E8501A]/[0.06]">
                <div className="border-b border-neutral-100 bg-gradient-to-b from-white to-[#fff9f6] px-5 py-5 md:px-6 md:py-6">
                  <p className="font-heading text-lg font-bold text-neutral-900 md:text-xl">&ldquo;What&apos;s your favorite hobby?&rdquo;</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#b83a0f]">Your ideas</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">
                    I like painting. I do it in my free time. It makes me feel happy.
                  </p>
                  <p className="mt-4 text-right font-heading text-sm font-bold text-neutral-500">Band 5.0</p>
                </div>
                <div className="flex min-h-[56px] items-center justify-center border-b border-[#f0e0d8] bg-[#fdf2ee]/80 py-3">
                  <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <line x1="20" y1="4" x2="20" y2="28" stroke="#E8501A" strokeWidth="2.75" strokeLinecap="round" />
                    <path
                      d="M10 28 L20 40 L30 28"
                      stroke="#E8501A"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className="bg-gradient-to-b from-[#fdf2ee] to-[#fce8df] px-5 py-5 md:px-6 md:py-6">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#b83a0f]">Improved answer with AI</p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-800 md:text-base">
                    My favorite hobby is painting because it helps me{" "}
                    <strong className="font-semibold text-neutral-900">express myself through art</strong>
                    <sup className="ml-0.5 text-[10px] font-semibold text-[#E8501A]">1</sup>. Also, whenever I{" "}
                    <strong className="font-semibold text-neutral-900">feel stressed</strong>
                    <sup className="ml-0.5 text-[10px] font-semibold text-[#E8501A]">2</sup>, I spend a few hours mixing colors and
                    creating new designs. It&apos;s a great way to relax and{" "}
                    <strong className="font-semibold text-neutral-900">stay inspired</strong>
                    <sup className="ml-0.5 text-[10px] font-semibold text-[#E8501A]">3</sup>.
                  </p>
                  <p className="mt-4 text-right font-heading text-sm font-bold text-emerald-600 md:text-base">Band 8.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h4 className="mt-14 font-heading text-xl font-bold text-neutral-900">Information architecture</h4>
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-10 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {["Landing Page", "Blog (SEO)", "Direct URL"].map((x) => (
              <span key={x} className="rounded-lg border border-[#E8501A] bg-[#fdf2ee] px-4 py-2 text-xs font-semibold text-[#b83a0f]">
                {x}
              </span>
            ))}
          </div>
          <p className="my-3 text-neutral-400">↓</p>
          <span className="inline-block rounded-lg border border-neutral-900 bg-neutral-900 px-6 py-2 text-xs font-semibold text-white">Dashboard</span>
          <p className="my-3 text-neutral-400">↓</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Part 1 Topics", "Part 2 Cue Cards", "Part 3 Topics", "My Questions"].map((x) => (
              <span key={x} className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800">
                {x}
              </span>
            ))}
          </div>
          <p className="my-3 text-neutral-400">↓</p>
          <span className="inline-block rounded-lg border border-neutral-900 bg-neutral-900 px-4 py-2 text-xs font-semibold text-white">
            Question / Cue Card View
          </span>
          <p className="my-3 text-neutral-400">↓</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Input Ideas", "Select Band + Length", "Generate", "Save Vocabulary"].map((x) => (
              <span key={x} className="rounded-lg border border-[#E8501A] bg-[#fdf2ee] px-3 py-2 text-xs font-semibold text-[#b83a0f]">
                {x}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Core practice loop</p>
        </div>
        <div id="screens" className="relative mt-16 scroll-mt-28 rounded-[1.75rem] border border-neutral-200/90 bg-gradient-to-b from-white via-white to-neutral-50/80 p-7 shadow-[0_32px_100px_-24px_rgba(15,23,42,0.14)] ring-1 ring-neutral-900/[0.04] md:p-10 lg:p-12">
          <header className="mb-10 max-w-3xl border-l-[3px] border-neutral-900 pl-5 md:mb-12 md:pl-6">
            <p className={caseStudySectionEyebrow}>SCREENS</p>
            <h4 className="font-heading mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">High-fidelity screens</h4>
          </header>
          <IeltsScreensMarquee />
        </div>
      </motion.section>

      <motion.section {...fadeBlock} id="solution" className="mb-20 scroll-mt-28">
        <h2 className={caseStudySectionEyebrow}>SOLUTION</h2>
        <h3 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">Every decision tied to a user need</h3>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b-2 border-neutral-900 bg-neutral-50">
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">Feature</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">Decision</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">HCI rationale</th>
              </tr>
            </thead>
            <tbody className="text-neutral-600">
              {[
                ["Idea-first input", "Users type rough ideas before seeing any AI output", "Prevents anchoring bias so the user owns the answer conceptually."],
                ["Band level selector", "Explicit Band 5 to 9 selector", "Uses the user's own mental model."],
                ["Answer length options", "Short / Medium / Long mapped to exam timing", "Simulates real exam constraints."],
                ["Integrated vocabulary panel", "Vocabulary extracted from the generated answer", "Anchors vocabulary to a specific use case."],
                ["Audio playback", "Text-to-speech on generated answers", "Speaking prep is auditory."],
                ["Saved answers counter", "Count per topic on dashboard", "Visible progress signal."],
                ["Create own topics", "Premium custom questions and cue cards", "Rehearse personal life scenarios."],
                ["Freemium gate", "4 AI generations/day free · 1,000/month at $6", "Free tier genuinely useful before paywall."],
              ].map(([f, d, r]) => (
                <tr key={f} className="border-b border-neutral-100">
                  <td className="px-4 py-3 font-medium text-neutral-900">{f}</td>
                  <td className="px-4 py-3">{d}</td>
                  <td className="px-4 py-3">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section {...fadeBlock} id="hci" className="mb-20 scroll-mt-28">
        <h2 className={caseStudySectionEyebrow}>HCI PRINCIPLES APPLIED</h2>
        <h3 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">Grounding design in established theory</h3>
        <p className="mt-4 w-full max-w-none text-base leading-relaxed text-neutral-600 md:text-lg">
          Each major design decision was informed by HCI and cognitive science principles.
        </p>
        <div className="mt-10 grid gap-px rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "🎯", t: "Nielsen's Heuristics", p: "Consistency with the IELTS exam structure reduces learning curve. Error prevention through constrained selectors." },
            { icon: "🧠", t: "Cognitive Load Theory", p: "The 5-step workflow externalises the process. Each screen presents one primary action." },
            { icon: "🔄", t: "Self-Determination Theory", p: "Autonomy, competence, and relatedness are addressed through idea-first input and visible progress." },
            { icon: "📐", t: "Fitts's Law", p: "Primary actions are large and consistently positioned. Touch targets meet WCAG AA on mobile." },
            { icon: "💡", t: "Dual Coding Theory", p: "Answers as text plus audio: verbal and auditory pathways." },
            { icon: "🌊", t: "Flow State Design", p: "Practice loop calibrated so skill matches chosen band and topic difficulty." },
            { icon: "♿", t: "Accessibility", p: "Contrast ≥4.5:1, semantic HTML, keyboard-navigable flows, responsive layout." },
            { icon: "🌍", t: "Cross-Cultural Design", p: "Plain English, bilingual glossary, diverse topics." },
          ].map((c) => (
            <div key={c.t} className="bg-white p-6">
              <p className="text-xl" aria-hidden>{c.icon}</p>
              <h4 className="mt-2 font-heading text-sm font-bold text-neutral-900">{c.t}</h4>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">{c.p}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeBlock} className="mb-20 -mx-6 rounded-none bg-neutral-900 px-6 py-16 text-center md:mx-0 md:rounded-2xl md:px-12">
        <blockquote className="mx-auto max-w-2xl font-heading text-lg italic leading-relaxed text-neutral-200 md:text-xl">
          <span className="text-[#E8501A]" aria-hidden>&ldquo;</span>
          The topic-based vocabulary lists were a game-changer. I built my own word bank and jumped from Band 5.0 to 7.0 within a month.
          <span className="text-[#E8501A]" aria-hidden>&rdquo;</span>
        </blockquote>
        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-neutral-500">Chen Rui · IELTS Speaking Lab user · China</p>
      </motion.section>

      <motion.section {...fadeBlock} id="outcomes" className="mb-20 scroll-mt-28">
        <h2 className={caseStudySectionEyebrow}>OUTCOMES &amp; VALIDATION</h2>
        <h3 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">Validation through use</h3>
        <p className="mt-4 w-full max-w-none text-base text-neutral-600">Organic growth via SEO and communities; eight usability sessions (Band 5 to 7) shaped pre-launch iterations.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
            <p className="font-heading text-3xl font-bold text-neutral-900">Band 7</p>
            <p className="mt-2 text-sm text-neutral-600">Average reported improvement target</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
            <p className="font-heading text-3xl font-bold text-neutral-900">$6/mo</p>
            <p className="mt-2 text-sm text-neutral-600">Accessible premium tier</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
            <p className="font-heading text-3xl font-bold text-neutral-900">50+</p>
            <p className="mt-2 text-sm text-neutral-600">SEO blog articles</p>
          </div>
        </div>
        <h4 className="mt-14 font-heading text-xl font-bold text-neutral-900">Usability testing: key findings</h4>
        <ul className="mt-4 w-full max-w-none space-y-3 text-sm text-neutral-600">
          <li className="flex gap-3"><span className="font-bold text-[#E8501A]">1.</span><span><strong className="text-neutral-900">Vocabulary preview.</strong> Users wanted to see extracted vocabulary before committing to generate a full answer.</span></li>
          <li className="flex gap-3"><span className="font-bold text-[#E8501A]">2.</span><span><strong className="text-neutral-900">Audio is essential.</strong> Band 6+ candidates relied on listening to model answers to internalise rhythm and intonation.</span></li>
          <li className="flex gap-3"><span className="font-bold text-[#E8501A]">3.</span><span><strong className="text-neutral-900">Progress visibility.</strong> Per-topic saved counts reduced anxiety about &ldquo;not doing enough.&rdquo;</span></li>
          <li className="flex gap-3"><span className="font-bold text-[#E8501A]">4.</span><span><strong className="text-neutral-900">Mobile friction.</strong> Long-form typing on phones led to stronger emphasis on desktop-first flows with mobile as secondary.</span></li>
        </ul>
      </motion.section>

      <motion.section {...fadeBlock} id="mockups-mapping" className="mb-20 scroll-mt-28">
        <h2 className={caseStudySectionEyebrow}>SOLUTION · MOCKUPS MAPPING</h2>
        <h3 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">How the ready mockups connect to product delivery</h3>
        <p className="mt-4 w-full max-w-none text-base leading-relaxed text-neutral-600 md:text-lg">
          Each screen is mapped to a concrete learner problem and current delivery status, so the visual direction stays tied to product
          outcomes.
        </p>
        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b-2 border-neutral-900 bg-neutral-50">
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">Mockup screen</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">UX problem solved</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">Status</th>
              </tr>
            </thead>
            <tbody className="text-neutral-600">
              {[
                ["Home dashboard", "Creates one clear starting point for topic selection and practice continuity.", "Live"],
                ["Part 1 practice", "Transforms rough learner ideas into structured speaking responses with vocabulary.", "Live"],
                ["Part 2 and 3 practice", "Supports cue-card and follow-up discussion prep in a linked flow.", "Completed"],
                ["My Answers (topic + detail views)", "Makes revision by topic and part quick and less cognitively heavy.", "Completed"],
                ["My Vocabulary", "Keeps reusable lexical items connected to real generated answers.", "Completed"],
                ["Subscription and profile", "Clarifies account value and plan access without interrupting core practice.", "Planned"],
              ].map(([screen, problem, status]) => (
                <tr key={screen} className="border-b border-neutral-100">
                  <td className="px-4 py-3 font-medium text-neutral-900">{screen}</td>
                  <td className="px-4 py-3">{problem}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
                        status === "Live" && "border-emerald-200 bg-emerald-50 text-emerald-700",
                        status === "Completed" && "border-teal-200 bg-teal-50 text-teal-700",
                        status === "Planned" && "border-violet-200 bg-violet-50 text-violet-700",
                      )}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section {...fadeBlock} id="reflection" className="mb-20 scroll-mt-28">
        <h2 className={caseStudySectionEyebrow}>REFLECTION &amp; FUTURE WORK</h2>
        <h3 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">What I learned. What comes next.</h3>
        <div className="mt-6 w-full max-w-none space-y-4 text-base text-neutral-600">
          <p><strong className="text-neutral-900">AI as design material.</strong> Prompt engineering is interaction design: every parameter (band, length, tone) is a UI affordance mapped to user mental models.</p>
          <p><strong className="text-neutral-900">Exam structure as IA.</strong> Aligning navigation with official IELTS Parts reduced cognitive load more than any visual polish could.</p>
          <p><strong className="text-neutral-900">Ethical freemium.</strong> The free tier had to be genuinely useful; gating only at sustained daily use preserves trust in an education product.</p>
          <p><strong className="text-neutral-900">What&apos;s next.</strong> Voice input for Part 2 cue-card simulation, pronunciation scoring, spaced repetition for vocabulary, and optional peer practice rooms.</p>
        </div>
        <div className="mt-12 rounded-2xl border border-neutral-200 border-l-[3px] border-l-[#E8501A] bg-[#fdf2ee] px-6 py-8 md:px-10">
          <p className="text-base font-medium italic text-neutral-800 md:text-lg">
            IELTS Speaking Lab sits at the intersection of AI-mediated language learning, adaptive personalisation, and the ethics of AI in high-stakes education, a space I continue to explore through product design and hands-on research.
          </p>
        </div>
      </motion.section>

      <motion.section {...fadeBlock} className="mb-8 rounded-2xl border border-neutral-200 bg-neutral-900 px-8 py-12 text-center">
        <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">Explore the platform</h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
          Live practice is already available for the core flow, with expanded IELTS modules rolling out in the next phases.
        </p>
        <a href="https://www.ieltsspeakinglab.com" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center rounded-xl border-2 border-neutral-600 px-8 py-3 text-sm font-bold text-white transition-colors hover:border-white">
          Visit IELTS Speaking Lab →
        </a>
      </motion.section>
    </CaseStudySiteChrome>
  );
}
