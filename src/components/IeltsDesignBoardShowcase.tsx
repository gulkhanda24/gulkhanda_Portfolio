import { Lock, Info } from "lucide-react";

const NAVY = "linear-gradient(165deg, #0c1929 0%, #0f2744 48%, #152a45 100%)";
const BANNER = "#7ec8e3";

const dashedFrame = "rounded-lg border border-dashed border-violet-400/70";

export type IeltsDesignBoardDensity = "hero" | "compact";

export interface IeltsDesignBoardShowcaseProps {
  density?: IeltsDesignBoardDensity;
  /** When false, omit lock inside the top frame (e.g. parent panel already shows one). */
  showInnerLock?: boolean;
  className?: string;
}

const bottomScreens = [
  {
    src: "/ielts-speaking-lab/topics-part-1.png",
    footer: "Topics · Part 1",
    disabled: true,
  },
  {
    src: "/ielts-speaking-lab/home.png",
    footer: "Dashboard · streak & parts",
    disabled: false,
  },
  {
    src: "/ielts-speaking-lab/my-vocabulary.png",
    footer: "Vocabulary bank",
    disabled: false,
  },
] as const;

/**
 * Design-system style board: status-style cards, atomic-design strip, and IELTS screen thumbnails.
 * Used in the hero frame and on the IELTS project card mockup panel.
 */
const IeltsDesignBoardShowcase = ({
  density = "hero",
  showInnerLock = true,
  className = "",
}: IeltsDesignBoardShowcaseProps) => {
  const compact = density === "compact";

  const pad = compact ? "p-1.5 sm:p-2" : "p-2.5 sm:p-3 md:p-3.5";
  const gapY = compact ? "gap-1 sm:gap-1.5" : "gap-1.5 sm:gap-2 md:gap-2.5";
  const innerPad = compact ? "p-1.5 sm:p-2" : "p-2";
  const topGap = compact ? "gap-1 sm:gap-1.5" : "gap-1.5 sm:gap-2";
  const cardPad = compact ? "p-1 sm:p-1.5" : "p-1.5 sm:p-2";
  const lockWrap = compact ? "h-6 w-6 sm:h-7 sm:w-7" : "h-7 w-7 sm:h-8 sm:w-8";
  const lockIcon = compact ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "h-3.5 w-3.5 sm:h-4 sm:w-4";
  const topOffset = compact ? "mt-6 sm:mt-7" : "mt-7 sm:mt-8";
  const bannerText = compact
    ? "text-[5px] sm:text-[6px] md:text-[7px]"
    : "text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px]";
  const labelXs = compact
    ? "text-[4px] sm:text-[5px] md:text-[6px]"
    : "text-[5px] sm:text-[6px] md:text-[7px]";
  const titleSm = compact
    ? "text-[6px] sm:text-[7px] md:text-[8px]"
    : "text-[7px] sm:text-[8px] md:text-[9px]";
  const btnH = compact ? "h-3.5 sm:h-4" : "h-4 sm:h-[18px]";
  const btnText = compact ? "text-[4px] sm:text-[5px] sm:leading-4" : "text-[6px] sm:text-[7px] sm:leading-[18px]";
  const pillText = compact ? "text-[3px] sm:text-[4px] md:text-[5px]" : "text-[5px] sm:text-[6px]";
  const activePill = compact ? "text-[3px] sm:text-[4px] md:text-[5px]" : "text-[4px] sm:text-[5px] md:text-[6px]";
  const footerText = compact ? "text-[4px] sm:text-[5px]" : "text-[5px] sm:text-[6px] md:text-[7px]";
  const bottomGap = compact ? "gap-1 sm:gap-1.5" : "gap-1.5 sm:gap-2";

  return (
    <div
      className={`flex h-full min-h-0 w-full flex-col overflow-hidden ${pad} ${gapY} ${className}`.trim()}
      style={{ background: NAVY }}
    >
      {/* Top — status-style cards */}
      <div className={`relative flex min-h-0 flex-1 flex-col ${dashedFrame} bg-[#0a1628]/40 ${innerPad}`}>
        {showInnerLock && (
          <div
            className={`absolute left-1.5 top-1.5 z-10 flex items-center justify-center rounded-full bg-white shadow-md sm:left-2 sm:top-2 ${lockWrap}`}
          >
            <Lock className={`text-neutral-800 ${lockIcon}`} strokeWidth={2.2} aria-hidden />
          </div>
        )}
        <div className={`grid min-h-0 flex-1 grid-cols-2 grid-rows-2 ${topGap} ${topOffset} sm:grid-cols-4 sm:grid-rows-1`}>
          <div className={`flex min-h-0 min-w-0 flex-col justify-center rounded-md bg-white shadow-sm ${cardPad}`}>
            <p className={`font-bold uppercase tracking-wide text-neutral-500 ${labelXs}`}>Session</p>
            <p className={`truncate font-bold text-neutral-900 ${titleSm}`}>Part 1 · Warm-up</p>
            <div className="mt-0.5 flex flex-wrap items-center gap-0.5">
              <span className={`rounded bg-amber-500/15 px-1 py-0.5 font-semibold text-amber-800 ${pillText}`}>
                Due in 2 days
              </span>
            </div>
            <div
              className={`mt-1 rounded bg-[#2563eb] text-center font-semibold leading-4 text-white ${btnH} ${btnText}`}
            >
              Practice
            </div>
          </div>
          <div className={`flex min-h-0 min-w-0 flex-col justify-center rounded-md bg-white shadow-sm ${cardPad}`}>
            <p className={`font-bold uppercase tracking-wide text-neutral-500 ${labelXs}`}>Band target</p>
            <p className={`truncate font-bold text-neutral-900 ${titleSm}`}>7.0 · Speaking</p>
            <div className="mt-0.5 flex flex-wrap items-center gap-0.5">
              <span className={`rounded bg-red-500/15 px-1 py-0.5 font-semibold text-red-700 ${pillText}`}>
                Overdue
              </span>
            </div>
            <div
              className={`mt-1 rounded bg-[#2563eb] text-center font-semibold leading-4 text-white ${btnH} ${btnText}`}
            >
              Review
            </div>
          </div>
          <div className={`flex min-h-0 min-w-0 flex-col justify-center rounded-md bg-white shadow-sm ${cardPad}`}>
            <p className={`font-bold uppercase tracking-wide text-neutral-500 ${labelXs}`}>Progress</p>
            <p className={`truncate font-bold text-neutral-900 ${titleSm}`}>Topic coverage</p>
            <div className={`mt-1 w-full overflow-hidden rounded-full bg-red-100 ${compact ? "h-1 sm:h-1.5" : "h-1.5 sm:h-2"}`}>
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-red-500 to-orange-400" />
            </div>
            <div
              className={`mt-1 rounded bg-[#2563eb] text-center font-semibold leading-4 text-white ${btnH} ${btnText}`}
            >
              Continue
            </div>
          </div>
          <div className={`flex min-h-0 min-w-0 flex-col justify-center rounded-md bg-white shadow-sm ${cardPad}`}>
            <p className={`font-bold uppercase tracking-wide text-neutral-500 ${labelXs}`}>Practice load</p>
            <p className={`truncate font-bold text-neutral-900 ${titleSm}`}>Part 2 cue card</p>
            <div className={`mt-1 w-full overflow-hidden rounded-full bg-orange-100 ${compact ? "h-1 sm:h-1.5" : "h-1.5 sm:h-2"}`}>
              <div className="h-full w-[112%] max-w-full rounded-full bg-gradient-to-r from-red-500 to-red-400" />
            </div>
            <p className={`mt-0.5 font-medium text-neutral-500 ${compact ? "text-[3px] sm:text-[4px]" : "text-[4px] sm:text-[5px]"}`}>
              112% · expand ideas
            </p>
            <div
              className={`mt-0.5 rounded bg-[#2563eb] text-center font-semibold leading-4 text-white ${btnH} ${btnText}`}
            >
              Refine
            </div>
          </div>
        </div>
      </div>

      {/* Atomic design strip */}
      <div
        className={`flex flex-shrink-0 items-center justify-center px-1 ${compact ? "py-1 sm:py-1.5" : "py-1.5 sm:py-2"}`}
        style={{ background: BANNER }}
      >
        <p className={`text-center font-extrabold leading-tight text-neutral-900 ${bannerText}`}>
          #Tokens #Variables #Molecules #Organisms
        </p>
      </div>

      {/* Bottom — screen mockups + footers */}
      <div className={`flex min-h-0 flex-1 ${bottomGap} ${dashedFrame} bg-[#0a1628]/40 ${innerPad}`}>
        {bottomScreens.map((screen) => (
          <div key={screen.src} className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div
              className={`relative min-h-0 flex-1 overflow-hidden rounded-md ${
                screen.disabled ? "" : "ring-1 ring-white/20"
              }`}
            >
              <img
                src={screen.src}
                alt=""
                className="h-full min-h-[48px] w-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              {screen.disabled ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-black/55">
                  <Info className={`text-white/90 ${compact ? "h-2.5 w-2.5 sm:h-3 sm:w-3" : "h-3 w-3 sm:h-3.5 sm:w-3.5"}`} strokeWidth={2} aria-hidden />
                  <span className={`font-bold text-white ${compact ? "text-[4px] sm:text-[5px]" : "text-[5px] sm:text-[6px] md:text-[7px]"}`}>
                    Disabled
                  </span>
                </div>
              ) : (
                <span
                  className={`absolute right-0.5 top-0.5 rounded-full bg-emerald-500 px-1 py-0.5 font-bold text-white sm:right-1 sm:top-1 ${activePill}`}
                >
                  Active
                </span>
              )}
            </div>
            <div className="mt-0.5 flex flex-shrink-0 items-center rounded-b-md bg-white px-1 py-0.5 shadow-sm sm:px-1.5 sm:py-1">
              <p className={`truncate font-semibold text-neutral-800 ${footerText}`}>{screen.footer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IeltsDesignBoardShowcase;
