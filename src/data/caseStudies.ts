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
    nextSlug: "amazon-bazaar",
    nextTitle: "Redesigning E-Commerce",
  },
  {
    slug: "amazon-bazaar",
    category: "E-Commerce",
    categoryLabel: "E-Commerce Platform",
    year: "2023",
    title: "Redesigning the Future of E-Commerce",
    description:
      "A complete UX overhaul for Amazon Bazaar, reimagining the shopping experience with a focus on local sellers, discovery, and seamless checkout.",
    client: "Amazon Bazaar",
    role: "UX Designer",
    heroImage:
      "https://framerusercontent.com/images/pG0UmSlGHvpWG2nB453EgW8fVY.gif?width=3840&height=2160",
    tags: ["Mobile", "User Experience Design", "User Interface Design"],
    sections: [
      {
        title: "The Challenge",
        subtitle: "Local sellers struggling to stand out",
        content: [
          "Amazon Bazaar needed to differentiate itself in a crowded e-commerce market by highlighting local sellers and artisans. The existing platform treated all products equally, making it hard for small businesses to stand out.",
          "The goal was to create a shopping experience that felt personal, curated, and community-driven.",
        ],
      },
      {
        title: "Phase 1",
        subtitle: "Understanding the Market",
        content: [
          "I mapped the entire seller and buyer journey, identifying pain points through interviews with 20+ local sellers and 30+ regular shoppers.",
          "Key insights included:",
        ],
        bullets: [
          "Shoppers wanted to know the story behind products",
          "Local sellers needed better tools to showcase their craft",
          "Discovery was broken — users couldn't find unique items easily",
          "Trust was a major barrier for first-time buyers from small sellers",
        ],
      },
      {
        title: "Phase 2",
        subtitle: "Designing for Discovery",
        content: [
          "I introduced a 'Stories' feature that let sellers share their craft journey, a curated collections system, and an improved search with visual filters.",
          "The new product pages were designed to highlight the maker, their process, and the uniqueness of each item.",
        ],
        image:
          "https://framerusercontent.com/images/1rhFSirz5rTwCKsi1ornqrMo8.png?width=679&height=1443",
        imageCaption: "New Product Discovery Flow",
      },
      {
        title: "Phase 3",
        subtitle: "Building Trust",
        content: [
          "We implemented verified seller badges, transparent review systems, and a 'Meet the Maker' video feature that significantly improved buyer confidence.",
          "The checkout flow was streamlined from 5 steps to 2, with smart defaults and saved preferences.",
        ],
      },
      {
        title: "The Outcome",
        subtitle: "A marketplace with soul",
        content: [
          "The redesign resulted in a 45% increase in local seller sales, 60% improvement in product discovery rates, and the platform became the go-to destination for unique, locally-made products.",
        ],
      },
    ],
    nextSlug: "qnb-design-system",
    nextTitle: "Banking Design System",
  },
  {
    slug: "qnb-design-system",
    category: "Design System",
    categoryLabel: "Design System",
    year: "2024",
    title: "Reimagining Banking — Design System",
    description:
      "Built a comprehensive design system for Qatar National Bank that unified the visual language across mobile, web, and internal tools — enabling faster development and consistent user experiences.",
    client: "Qatar National Bank",
    role: "Design System Lead",
    heroImage:
      "https://framerusercontent.com/images/6XqIkd0Pmn5Mo9HM6I6Ww5cjIQ.png?width=1108&height=332",
    tags: ["Mobile", "Web", "User Interface Design", "Design System"],
    sections: [
      {
        title: "The Challenge",
        subtitle: "Fragmented design across platforms",
        content: [
          "Qatar National Bank had grown rapidly, and with it came design inconsistency. Multiple teams were building features independently, resulting in fragmented user experiences across platforms.",
          "There was no single source of truth for design decisions, leading to duplicated effort and conflicting patterns.",
        ],
      },
      {
        title: "Phase 1",
        subtitle: "Audit & Foundation",
        content: [
          "I conducted a comprehensive audit across all QNB digital products, cataloging every unique component, color, typography style, and spacing value.",
          "The audit revealed:",
        ],
        bullets: [
          "47 different button styles across platforms",
          "12 variations of the same form input",
          "No consistent spacing scale",
          "Color usage varied significantly between teams",
        ],
      },
      {
        title: "Phase 2",
        subtitle: "Building the System",
        content: [
          "I established design tokens as the foundation — colors, typography, spacing, and elevation that could be shared across platforms. Then built atomic components that composed into larger patterns.",
          "Every component was documented with usage guidelines, accessibility requirements, and code examples.",
        ],
        image:
          "https://framerusercontent.com/images/6XqIkd0Pmn5Mo9HM6I6Ww5cjIQ.png?width=1108&height=332",
        imageCaption: "Design System Component Library",
      },
      {
        title: "Phase 3",
        subtitle: "Adoption & Governance",
        content: [
          "I created an onboarding program for designers and developers, held weekly office hours, and established a contribution model so the system could grow with the organization.",
          "A Figma plugin was built to ensure designers always used the latest components.",
        ],
      },
      {
        title: "The Outcome",
        subtitle: "3x faster feature delivery",
        content: [
          "The design system reduced design-to-development handoff time by 60%, eliminated visual inconsistencies across platforms, and became the foundation for all new product development at QNB.",
          "Feature delivery speed increased by 3x as teams could now compose interfaces from pre-built, tested components.",
        ],
      },
    ],
    nextSlug: "personalised-ai-productivity",
    nextTitle: "Personalised AI Productivity",
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((cs) => cs.slug === slug);
