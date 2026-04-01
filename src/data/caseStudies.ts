export interface CaseStudySection {
  title: string;
  subtitle: string;
  content: string[];
  image?: string;
  imageCaption?: string;
  bullets?: string[];
}

export interface CaseStudy {
  slug: string;
  category: string;
  categoryLabel: string;
  year: string;
  title: string;
  description: string;
  client: string;
  role: string;
  heroImage: string;
  tags: string[];
  sections: CaseStudySection[];
  nextSlug?: string;
  nextTitle?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "smart-helmet-bike-care",
    category: "IoT",
    categoryLabel: "IoT · Transport Safety",
    year: "2024",
    title: "Smart Helmet & Bike Care — IoT-connected safety for riders",
    description:
      "SmartHelm pairs an IoT helmet with a rider app: accident detection, theft alerts, live tracking, and emergency contacts — designed for instant clarity on the road and peace of mind at home.",
    client: "Smart Helm (portfolio concept)",
    role: "UX / Product Designer",
    heroImage:
      "https://images.unsplash.com/photo-1599819857284-d30acfe5b04f?w=1400&q=80",
    tags: ["IoT", "Mobile", "UX Research", "Safety", "Transport"],
    sections: [
      {
        title: "The problem",
        subtitle: "When the helmet stops at the skull",
        content: [
          "Motorcycle riders face risks that a passive helmet cannot address: crashes can go unreported, theft often goes unnoticed for hours, and families have no lightweight way to know someone arrived safely.",
          "The brief: improve transport safety with a Smart Helmet — IoT sensors that monitor the ride, detect incidents, and surface accident and theft signals in real time in a companion app.",
        ],
        bullets: [
          "~1.35M road traffic deaths globally per year (WHO, 2023)",
          "73% of motorcycle accidents unreported in the first hour (Road Safety Foundation)",
          "38% lower fatality when EMS is alerted within ~5 minutes (NHTSA)",
        ],
      },
      {
        title: "Research",
        subtitle: "Riders, families, and trust",
        content: [
          "24 in-depth interviews, 3 contextual observations, and a survey of 210 motorcyclists shaped the product. Riders wanted one-glance status, automatic help when they cannot act, and zero tolerance for noisy or confusing alerts.",
        ],
        bullets: [
          "Accident response gap: many had no fallback to alert contacts automatically",
          "Theft blind spot: almost no real-time helmet or bike theft notification",
          "Family anxiety on late-night or bad-weather commutes",
          "Distrust of complex safety UIs — readability under stress mattered most",
        ],
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
        imageCaption: "Context: commuting and delivery riders depend on speed and clarity",
      },
      {
        title: "System architecture",
        subtitle: "Helmet → phone → cloud → help",
        content: [
          "The stack runs from helmet hardware (IMU, gyro, GPS, proximity, vibration) through BLE / Wi-Fi to a cloud engine for detection logic, then to the SmartHelm app and emergency channels (push, SMS, auto-dial).",
          "Critical triggers include high G-force impact, helmet movement when it should be idle, sustained unusual tilt, and BLE disconnect beyond range — each mapped to severity so the UI can stay calm until it cannot.",
        ],
      },
      {
        title: "User journey",
        subtitle: "From helmet on to home safe",
        content: [
          "We mapped five stages — pre-ride pairing, active ride with live share, incident detection with countdown, alert dispatch to prioritized contacts, and post-ride summary with a safety score.",
        ],
        bullets: [
          "Pre-ride: one-tap pairing under ~8 seconds (vs. confusing flows before)",
          "Ride active: live location shared so family can watch without spam",
          "Incident: 30-second override before contacts are notified — balances speed and false alarms",
          "Post-ride: trip report builds habit without coercion",
        ],
      },
      {
        title: "Design principles & decisions",
        subtitle: "Built for gloves, sun, and panic",
        content: [
          "Principles: instant clarity, proactive protection, human in the loop, offline resilience, family-first sharing, and signal-not-noise notification tiers.",
          "We validated a 30-second cancel window (vs. 15s / 60s), a dark-first UI for outdoor legibility, and a weekly safety score that kept engagement without alert fatigue.",
        ],
      },
      {
        title: "Outcomes",
        subtitle: "Prototype testing (n=18)",
        content: [
          "In four weeks of moderated sessions, pairing dropped to about 8 seconds from ~45s, the emergency flow stayed under a 30s ceiling to contacts, satisfaction hit 94%, and riders reported roughly 3× more consistent helmet use after two weeks.",
          "The full visual case study (screen-by-screen UI, diagrams, and annotations) opens at /case-study/smart-helmet-bike-care — same layout as the original HTML case study.",
        ],
      },
    ],
    nextSlug: "ielts-speaking-lab",
    nextTitle: "IELTS Speaking Lab",
  },
  {
    slug: "personalised-ai-productivity",
    category: "GenAI",
    categoryLabel: "AI & Productivity",
    year: "2024",
    title: "Building a personalised AI solution to eliminate redundant tasks & boost productivity",
    description:
      "End-to-end UX for an enterprise assistant that learns how people work, suggests automations for repetitive tasks, and keeps humans in control — transparency, personalisation, and measurable productivity gains.",
    client: "Enterprise B2B SaaS",
    role: "Product Designer",
    heroImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
    tags: ["GenAI", "UX Research", "Productivity", "Enterprise UX"],
    sections: [
      {
        title: "The Challenge",
        subtitle: "Busywork was eating the workday",
        content: [
          "Knowledge workers were losing hours each week to copy-paste between tools, reformatting the same reports, and chasing status updates across chat, email, and project trackers. Generic automation tools either broke on edge cases or felt too risky to adopt without transparency.",
          "The product goal was clear: reduce redundant work without removing agency — a personalised AI layer that proposes actions, explains why, and learns from feedback over time.",
        ],
        image:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
        imageCaption: "Context: fragmented workflows across communication and docs",
      },
      {
        title: "Phase 1",
        subtitle: "Discovery & task analysis",
        content: [
          "I ran contextual inquiry and diary studies with 18 participants across operations, sales, and engineering. Sessions were structured around a full week of work: we logged triggers, hand-offs, and repeated micro-tasks.",
          "We synthesised qualitative notes with frequency counts to separate \"true redundancy\" (same intent, same context) from one-off exceptions. Key themes:",
        ],
        bullets: [
          "Top pain: switching between 4+ apps to complete a single \"small\" deliverable",
          "High anxiety around AI changing data without an audit trail or undo",
          "Power users wanted shortcuts; novices needed guardrails and plain-language explanations",
          "Personalisation only mattered if it saved time in the first session — not after weeks of training",
        ],
      },
      {
        title: "Phase 2",
        subtitle: "Framing the personalised AI",
        content: [
          "We defined three pillars: Suggestions (ranked by confidence and impact), Transparency (source, diff, and rollback), and Teach-back (thumbs, edits, and \"never do this\" rules). Wireframes explored a side panel assistant vs. inline chips; testing favoured inline proposals on the object being edited, with a persistent timeline of AI actions.",
          "Information architecture separated \"automations you own\" from \"team playbooks\" so governance teams could approve patterns without blocking individual productivity.",
        ],
        image:
          "https://images.unsplash.com/photo-1531746797559-6f13a9967b5b?w=1200&q=80",
        imageCaption: "Early IA: assistant surface, approval queue, and personal rules",
      },
      {
        title: "Phase 3",
        subtitle: "Design, prototype & validation",
        content: [
          "High-fidelity flows covered: one-click \"repeat last action\" on structured tasks, natural-language creation of multi-step recipes, and conflict resolution when two automations collide. I paired with engineering on latency states — skeleton proposals, stale-data warnings, and graceful degradation when models were uncertain.",
          "Two rounds of moderated usability tests (n=12) refined copy for consent moments, confidence thresholds for auto-run vs. ask-first, and empty states that teach by example.",
        ],
      },
      {
        title: "The Outcome",
        subtitle: "Less repetition, more focus time",
        content: [
          "In pilot, participants reported a median 32% reduction in time spent on self-identified repetitive tasks, with zero critical incidents related to unintended AI writes (rollback and audit log were used in 100% of escalations). Adoption of suggested automations climbed after we added a \"preview diff\" step and per-workspace templates.",
          "The framework is now the reference pattern for other AI-assisted features in the suite — same trust model, shared components, and a single design language for human–AI collaboration.",
        ],
      },
    ],
    nextSlug: "ielts-speaking-lab",
    nextTitle: "IELTS Speaking Lab",
  },
  {
    slug: "ielts-speaking-lab",
    category: "EdTech",
    categoryLabel: "Web · AI & Language Learning",
    year: "2024 – 2025",
    title: "IELTS Speaking Lab — personalised Band 7–9 answers from your ideas",
    description:
      "An AI-powered web platform that turns a learner's rough ideas into personalised Band 7–9 answers — and builds the vocabulary to sustain them.",
    client: "IELTS Speaking Lab (live product)",
    role: "UX Designer · UI Designer · Developer",
    heroImage: "/ielts-speaking-lab/home.png",
    tags: ["Web", "Next.js", "GenAI", "UX Research", "HCI"],
    sections: [],
    nextSlug: "rapido-captain",
    nextTitle: "Rapido Captain",
  },
  {
    slug: "rapido-captain",
    category: "Mobility",
    categoryLabel: "Driver App · Mobility",
    year: "2023 – 2024",
    title: "Rapido Captain — Enhancing pick-up accuracy for drivers",
    description:
      "A case study where I improved pick-up accuracy in the driver app by using image view and street view, which helped reduce order cancellations.",
    client: "Rapido",
    role: "Product Designer",
    heroImage: "/rapido-hero-pickup-screen.png",
    tags: ["UX design", "Driver App", "Mobility"],
    /* Long-form layout: RapidoCaptainCaseStudy.tsx */
    sections: [],
    nextSlug: "smart-helmet-bike-care",
    nextTitle: "Smart Helmet & Bike Care",
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((cs) => cs.slug === slug);
