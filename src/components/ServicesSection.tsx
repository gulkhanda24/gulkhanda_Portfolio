import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

type CardTone = "cream" | "butter";

const philosophyCards: {
  headline: string;
  caption: string;
  tone: CardTone;
}[] = [
  {
    headline: "Outcomes before outputs",
    caption:
      "I anchor work in the problem, the person, and what “done” means before locking features or visuals.",
    tone: "cream",
  },
  {
    headline: "One system, one conversation",
    caption:
      "Tokens, components, and shared rules keep design and engineering aligned as the product grows.",
    tone: "butter",
  },
  {
    headline: "Clarity is respect",
    caption:
      "Hierarchy and copy answer what matters first—attention is finite and never owed to the UI.",
    tone: "cream",
  },
  {
    headline: "Motion that explains",
    caption:
      "Movement shows state and relationship; I use it to orient and connect, not to decorate.",
    tone: "butter",
  },
  {
    headline: "Trust lives off the happy path",
    caption:
      "Errors, waits, and empty states get the same rigour as the hero flow—that is where belief is won or lost.",
    tone: "cream",
  },
];

const stackCss = `
  .philosophy-slot { position: absolute; pointer-events: none; }
  .philosophy-slot[data-i="0"] { top: 0; left: 50%; }
  .philosophy-slot[data-i="1"] { top: 52px; left: calc(50% + 12px); }
  .philosophy-slot[data-i="2"] { top: 108px; left: calc(50% - 10px); }
  .philosophy-slot[data-i="3"] { top: 172px; left: calc(50% + 8px); }
  .philosophy-slot[data-i="4"] { top: 232px; left: calc(50% - 4px); }

  .philosophy-slot-inner[data-i="0"] { transform: translateX(-50%) rotate(-5deg); }
  .philosophy-slot-inner[data-i="1"] { transform: translateX(-50%) rotate(4deg); }
  .philosophy-slot-inner[data-i="2"] { transform: translateX(-50%) rotate(-3deg); }
  .philosophy-slot-inner[data-i="3"] { transform: translateX(-50%) rotate(5deg); }
  .philosophy-slot-inner[data-i="4"] { transform: translateX(-50%) rotate(-4deg); }

  @media (min-width: 768px) {
    .philosophy-slot[data-i="0"] { top: 0; left: 50%; }
    .philosophy-slot[data-i="1"] { top: 64px; left: calc(50% + 22px); }
    .philosophy-slot[data-i="2"] { top: 132px; left: calc(50% - 18px); }
    .philosophy-slot[data-i="3"] { top: 204px; left: calc(50% + 14px); }
    .philosophy-slot[data-i="4"] { top: 276px; left: calc(50% - 6px); }

    .philosophy-slot-inner[data-i="0"] { transform: translateX(-50%) rotate(-6deg); }
    .philosophy-slot-inner[data-i="1"] { transform: translateX(-50%) rotate(5deg); }
    .philosophy-slot-inner[data-i="2"] { transform: translateX(-50%) rotate(-4deg); }
    .philosophy-slot-inner[data-i="3"] { transform: translateX(-50%) rotate(6deg); }
    .philosophy-slot-inner[data-i="4"] { transform: translateX(-50%) rotate(-5deg); }
  }
`;

/** Final stack: card 0 = back (low z), each newer card sits on top — last card = front */
const SETTLED_Z = (i: number) => 10 + i * 10;

function CardFace({
  card,
  bgClass,
}: {
  card: (typeof philosophyCards)[0];
  bgClass: string;
}) {
  return (
    <article
      className={`${bgClass} flex min-h-[200px] w-[min(100%,280px)] flex-col justify-between rounded-[1.35rem] border border-border/60 p-6 shadow-[0_16px_48px_-14px_rgba(15,23,42,0.14)] sm:w-[min(100%,292px)] md:min-h-[236px] md:w-[300px] md:rounded-[1.75rem] md:p-8`}
    >
      <h3 className="font-heading text-[1.3rem] font-bold leading-[1.22] tracking-heading-tight text-foreground md:text-2xl">
        {card.headline}
      </h3>
      <p className="mt-5 font-heading text-sm font-medium leading-relaxed text-muted-foreground md:mt-7 md:text-[0.9375rem]">
        {card.caption}
      </p>
    </article>
  );
}

function StackingCard({
  card,
  index,
  scrollYProgress,
  reducedMotion,
}: {
  card: (typeof philosophyCards)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const settledZ = SETTLED_Z(index);
  /* Card 0 leads (start > 0 avoids duplicate keyframes in useTransform); rest stagger with gap */
  const start = index === 0 ? 0.03 : 0.17 + (index - 1) * 0.12;
  const end = start + 0.12;
  const fadeEnd = start + 0.045;

  const yRaw = useTransform(
    scrollYProgress,
    [0, start, end, 1],
    reducedMotion ? [0, 0, 0, 0] : [220, 220, 0, 0],
  );

  const opacityRaw = useTransform(
    scrollYProgress,
    [0, start, fadeEnd, 1],
    reducedMotion ? [1, 1, 1, 1] : [0, 0, 1, 1],
  );

  const zIndexMotion = useTransform(scrollYProgress, (p) => {
    if (reducedMotion) return settledZ;
    if (p >= start && p < end) return 80 + index;
    return settledZ;
  });

  const y = useSpring(yRaw, { stiffness: 100, damping: 32, mass: 0.38 });
  const opacity = useSpring(opacityRaw, { stiffness: 115, damping: 36 });

  const bg = card.tone === "cream" ? "bg-[#faf9f5]" : "bg-[#f7edb8]";

  return (
    <motion.div className="philosophy-slot" data-i={String(index)} style={{ zIndex: zIndexMotion }}>
      <motion.div style={{ y, opacity }}>
        <div className="philosophy-slot-inner" data-i={String(index)}>
          <CardFace card={card} bgClass={bg} />
        </div>
      </motion.div>
    </motion.div>
  );
}

const ServicesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="philosophy" className="relative overflow-x-hidden bg-background">
      <style>{stackCss}</style>

      {/* Track ≈ 1 viewport + small scrub range — keeps tail after sticky short */}
      <div ref={scrollRef} className="relative min-h-[calc(100dvh+16rem)] md:min-h-[calc(100dvh+20rem)]">
        <div className="sticky top-0 z-10 flex min-h-[100dvh] w-full items-center justify-center px-0 py-6 md:py-8">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 grid-rows-[auto_auto] gap-x-10 gap-y-8 px-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.05fr)] lg:grid-rows-[minmax(0,auto)] lg:items-center lg:gap-y-0 lg:gap-x-10">
          {/* Pinned with the card column — no separate sticky so the grid stays one unit */}
          <div className="max-w-xl lg:py-1">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">What guides my work</p>
              <h2
                className="font-heading font-heading-display bg-gradient-to-r from-[hsl(258_68%_46%)] via-[hsl(330_58%_52%)] to-[hsl(25_90%_52%)] bg-clip-text pb-1 font-black leading-[1.05] text-transparent [background-clip:text] [-webkit-background-clip:text]"
                style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
              >
                Design Philosophy
              </h2>
              <div className="mt-6 space-y-4 text-base font-medium leading-relaxed text-muted-foreground">
                <p className="text-foreground/90">
                  Design philosophy is what you lean on when timelines shrink, stakeholders disagree, and there is no single
                  “right” mockup in the file.
                </p>
                <p>
                  It is the layer beneath deliverables—the commitments that keep work honest toward the people who use it and
                  the organisation that ships it.
                </p>
              </div>
            </div>
          </div>

          <div className="hidden shrink-0 self-center lg:flex" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-border" />
          </div>

          {/* Scroll-scrubbed cards only */}
          <div className="relative flex min-h-0 items-center justify-center lg:justify-end lg:pr-2">
            <div className="relative h-[420px] w-full max-w-[300px] md:h-[500px] md:max-w-[360px]">
              {philosophyCards.map((card, i) => (
                <StackingCard
                  key={card.headline}
                  card={card}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
