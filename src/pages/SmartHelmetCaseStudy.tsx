import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import bodyHtml from "./smartHelmetCaseStudyBody.html?raw";
import "./smartHelmetCaseStudy.css";
import CaseStudySiteChrome from "@/components/CaseStudySiteChrome";
import CaseStudyStandardHero from "@/components/CaseStudyStandardHero";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/data/caseStudies";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

const DOC_TITLE = "Smart Helmet: UX Case Study";

const SMART_HELMET_FIGMA_URL =
  "https://www.figma.com/design/6sGYTzw3fiAZQDSxQ2CLwm/Smart-Hemet---Safety---Tracking--?node-id=59-900&t=qNiJBgBbgFU4AEka-0";

const DESIGN_DECISIONS_MARKER = "<!-- DESIGN DECISIONS -->";

const smartHelmetScreensFlow = [
  {
    src: "/smart-helmet-screen-01-dashboard.png",
    shortLabel: "Dashboard",
    alt: "Smart Helmet home: helmet and bike status, map preview, emergency controls, and recent activity",
  },
  {
    src: "/smart-helmet-screen-02-live-tracking.png",
    shortLabel: "Live tracking",
    alt: "Live GPS tracking: map route, current location, speed, share location and set alert actions",
  },
  {
    src: "/smart-helmet-screen-03-emergency-alert.png",
    shortLabel: "Emergency sent",
    alt: "Emergency alert confirmation: contacts notified and back to dashboard",
  },
  {
    src: "/smart-helmet-screen-04-report-theft.png",
    shortLabel: "Report theft",
    alt: "Theft report flow: location, map, disable ignition and live tracking actions",
  },
  {
    src: "/smart-helmet-screen-05-alerts.png",
    shortLabel: "Alerts",
    alt: "Alerts inbox: theft, accident, and connection alerts with filters",
  },
  {
    src: "/smart-helmet-screen-06-ride-history.png",
    shortLabel: "Ride history",
    alt: "Ride history: weekly stats, filters, and recent rides with safety status",
  },
] as const;

const smartHelmetScreensMarqueeLoop = [
  ...smartHelmetScreensFlow,
  ...smartHelmetScreensFlow,
  ...smartHelmetScreensFlow,
  ...smartHelmetScreensFlow,
] as const;

function splitSmartHelmetBody(html: string): { beforeScreens: string; afterScreens: string } {
  const idx = html.indexOf(DESIGN_DECISIONS_MARKER);
  if (idx === -1) return { beforeScreens: html, afterScreens: "" };
  return {
    beforeScreens: html.slice(0, idx),
    afterScreens: html.slice(idx),
  };
}

function SmartHelmetScreenMockupCard({
  item,
  index,
  motionProps = true,
}: {
  item: (typeof smartHelmetScreensFlow)[number];
  index: number;
  motionProps?: boolean;
}) {
  const inner = (
    <div
      className={cn(
        "flex flex-shrink-0 cursor-default flex-col items-center gap-2 select-none",
        motionProps && "will-change-transform",
      )}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="block h-auto max-h-[400px] w-auto rounded-2xl object-contain object-top"
      />
      <span className="max-w-[8rem] text-center text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
        {item.shortLabel}
      </span>
    </div>
  );

  if (!motionProps) {
    return <div>{inner}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.4,
        delay: (index % smartHelmetScreensFlow.length) * 0.02,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.16 } }}
    >
      {inner}
    </motion.div>
  );
}

function SmartHelmetScreensMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 180, damping: 45 });
  const mockupsXShift = useTransform(smoothVelocity, [-1500, 0, 1500], [55, 0, -55]);

  if (prefersReducedMotion) {
    return (
      <div className="sh-marquee-root overflow-x-auto rounded-2xl border border-border bg-card/60 py-6">
        <div className="flex w-max items-stretch gap-5 px-4 pb-2">
          {smartHelmetScreensFlow.map((item, i) => (
            <SmartHelmetScreenMockupCard key={item.src} item={item} index={i} motionProps={false} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="sh-marquee-root marquee-mask overflow-hidden rounded-2xl border border-border bg-card/70 py-8 shadow-inner">
      <div className="overflow-hidden">
        <motion.div style={{ x: mockupsXShift }}>
          <div className="animate-marquee-tools flex w-max items-stretch gap-5 px-4">
            {smartHelmetScreensMarqueeLoop.map((item, i) => (
              <SmartHelmetScreenMockupCard key={`${i}-${item.src}`} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SmartHelmetAppScreensBand() {
  return (
    <>
      <div id="screens" />
      <div className="band fade-in">
        <div className="band-inner sh-app-screens-band-inner">
          <div className="section-label">08 · App Screens</div>
          <h2 className="section-title" style={{ marginBottom: 8 }}>
            Every screen built for speed and safety.
          </h2>
          <p className="sh-app-screens-lead">
            Six core screens covering the complete rider experience, from helmet pairing to emergency alerts and trip
            history.
          </p>
          <SmartHelmetScreensMarquee />
        </div>
      </div>
    </>
  );
}

const jumpClass =
  "text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline";

export default function SmartHelmetCaseStudy({ study }: { study: CaseStudy }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroIntroRef = useRef<HTMLElement | null>(null);
  const { beforeScreens, afterScreens } = splitSmartHelmetBody(bodyHtml);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = DOC_TITLE;
    document.documentElement.style.scrollBehavior = "smooth";
    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = "auto";
    return () => {
      document.title = prevTitle;
      document.documentElement.style.scrollBehavior = "";
      document.body.style.cursor = prevCursor;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      /* Slightly earlier trigger + smoother scroll-in for case-study fade sections */
      { threshold: 0.08, rootMargin: "0px 0px 14% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <CaseStudySiteChrome
      study={study}
      pageKey="smart-helmet-bike-care"
      subNav={
        <nav
          aria-label="Case study sections"
          className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-4"
        >
          <a href="#design-roadmap" className={jumpClass}>
            Design Roadmap
          </a>
          <a href="#problem" className={jumpClass}>
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
          <a href="#screens" className={jumpClass}>
            Screens
          </a>
          <a href="#outcomes" className={jumpClass}>
            Outcomes
          </a>
          <Button
            variant="default"
            size="sm"
            className="ml-auto shrink-0 border-0 bg-[hsl(var(--tag-violet))] text-white shadow-sm hover:bg-[hsl(258_58%_48%)] hover:text-white focus-visible:ring-[hsl(var(--tag-violet))]"
            asChild
          >
            <a
              href={SMART_HELMET_FIGMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Smart Helmet Figma file (opens in a new tab)"
            >
              <ExternalLink className="size-4" aria-hidden />
              Figma View
            </a>
          </Button>
        </nav>
      }
    >
      <CaseStudyStandardHero
        heroIntroRef={heroIntroRef}
        layout="bento"
        pillText={study.category.toUpperCase()}
        timeline="2026"
        title={
          <>
            Smart Helmet: Safety{" "}
            <em className="font-heading not-italic text-violet-800">Reimagined</em>
          </>
        }
        subtitle="A connected safety system that enforces helmet use, detects theft, and sends emergency alerts. The redesign prioritizes zero-touch riding and faster response in critical moments."
        metaRows={[
          {
            value: "8s",
            label: "Median helmet pairing time after redesign (was ~45s)",
            source: "Prototype testing · n=18",
          },
          {
            value: "94%",
            label: "User satisfaction score in moderated usability sessions",
            source: "4-week pilot · SUS-style survey",
          },
          {
            value: "3x",
            label: "Self-reported increase in consistent helmet use after two weeks",
            source: "Diary study · same participants",
          },
        ]}
        imageSrc="/smart-helmet-dashboard-mockup.png"
        imageAlt="Smart Helmet app dashboard: helmet and bike status, map preview, and emergency controls"
      />
      <div ref={rootRef} className="smart-helm-case-study w-full min-w-0">
        <div dangerouslySetInnerHTML={{ __html: beforeScreens }} />
        <SmartHelmetAppScreensBand />
        <div dangerouslySetInnerHTML={{ __html: afterScreens }} />
      </div>
    </CaseStudySiteChrome>
  );
}
