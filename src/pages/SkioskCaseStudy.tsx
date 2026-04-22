import { useEffect, useState, type ReactNode } from "react";
import type { CaseStudy } from "@/data/caseStudies";
import CaseStudySiteChrome from "@/components/CaseStudySiteChrome";
import { cn } from "@/lib/utils";

const CDN = "https://cdn.prod.website-files.com/6526aaa1b1597702d5fea358";

const I = {
  heroSmall: `${CDN}/655aa02ac91e9d877fc92161_Group%20546%20(2).png`,
  heroWide: `${CDN}/652748a0a7c9cf6733d6d92c_Group%20430.png`,
  roadmap: `${CDN}/65400bed30d5e24ea399714f_DiScovery%20(1).png`,
  w1Interview: `${CDN}/652752dc046d98a4d1d7f933_Group%20431%20(1).png`,
  questionnaire: `${CDN}/652757464045e2dceabbfc18_Group%20432%20(2).png`,
  scenarioA: `${CDN}/652761d306a3d77b1465dbcc_image.png`,
  scenarioB: `${CDN}/652761df86f7c95d10c18316_image%20(1).png`,
  scenarioC: `${CDN}/65276290a7f179ec308e656b_Unbenanntes_Projekt%205.jpg`,
  scenarioD: `${CDN}/6527629cfe012e6d41a9540e_Unbenanntes_Projekt%206.jpg`,
  scenarioE: `${CDN}/652761f0bebbd3cdc6c9b41c_Interaction%20snippet%201-1.jpg`,
  scenarioF: `${CDN}/6527628406a3d77b1466c164_Capture.PNG`,
  personaA: `${CDN}/65276d09f1d7d3709d2a0676_Group%20440.png`,
  personaB: `${CDN}/65276ff819666fe579307054_Group%20441-min.png`,
  personaC: `${CDN}/65276f9af1d7d3709d2da9cb_Group%20436.png`,
  personaD: `${CDN}/65276fbb2dea9c09529bdd37_Group%20439.png`,
  painSort: `${CDN}/65275a180f644d671d652a33_Group%20433%20(2).png`,
  problemsBoard: `${CDN}/6527e355d280808ec9600cd4_Group%20450%20(1).png`,
  moodA: `${CDN}/6527783277415832f0c620b2_Capture.PNG`,
  moodB: `${CDN}/652778f12237331bccf49deb_Capture.PNG`,
  func: `${CDN}/6527e7f06eadcf9b4d1457ca_Capture-removebg-preview%20(22).png`,
  interact: `${CDN}/6527e94fc93bfffe8a807ff0_Capture-removebg-preview%20(23).png`,
  pdMain: `${CDN}/6529018cfd428277d3f7eab4_Group%20453.png`,
  pd1: `${CDN}/65290ad0997559049b8ff56f_Group%20453%20(1).png`,
  pd2: `${CDN}/65290ca8997559049b9238df_Group%20454.png`,
  pd3: `${CDN}/65290b15fd428277d30475d2_Group%20454.png`,
  pd4: `${CDN}/65296e4495af6cd99eee9ae5_Group%20457.png`,
  pd5: `${CDN}/65296ee420f2a123247f129c_Group%20458.png`,
  baseConcept: `${CDN}/652995efb417280809fc95c4_Group%20462%20(2).png`,
  redesignA: `${CDN}/652981d8c964e56c4fce5541_%E6%88%AA%E5%B1%8F2023-02-05%2014.27.50.png`,
  redesignB: `${CDN}/652981d8799cd4cd2b33348f_%E6%88%AA%E5%B1%8F2023-02-05%2014.38.58.png`,
  redesignC: `${CDN}/652981d8bdda2dafc7f0ab09_%E6%88%AA%E5%B1%8F2023-02-05%2014.28.14.png`,
  storyA: `${CDN}/65299dbdd70a43d788c0e3e9_1697226140665641.JPG`,
  storyB: `${CDN}/65299e8643bbdb2c55693f7f_1697226351243951.JPG`,
  storyC: `${CDN}/65299edf89d339380e8518fe_1697226442581354.JPG`,
  storyWideA: `${CDN}/652992bccb9c5d556684eef5_Group%20460%20(3).png`,
  storyWideB: `${CDN}/652992e1be9d9e60b3822e7e_Group%20461.png`,
  poster: `${CDN}/6529cd38622571ba14bdf00f_AdvancedDOIS%20-%20Poster%20in%20A4.jpg`,
} as const;

const REFLECTION = [
  `${CDN}/6529c927b8dc5f55fec05e50_Group%20463.png`,
  `${CDN}/6529c986e4e95fb82fa2475b_Group%20464.png`,
  `${CDN}/6529c9ab4611e9ca1e67bebe_Group%20465.png`,
  `${CDN}/6529c9c36af926707a9d2340_Group%20466.png`,
  `${CDN}/6529c9e8fd19962a33fbc2f3_Group%20467.png`,
  `${CDN}/6529c9f479cbf4ed075387c3_Group%20468.png`,
  `${CDN}/6529ca40161daabd6b03a951_Group%20469.png`,
  `${CDN}/6529ca4f675e9e3c34a74292_Group%20470.png`,
  `${CDN}/6529ca5c622571ba14bac4cc_Group%20471.png`,
  `${CDN}/6529ca67e3e8f97337c47618_Group%20472.png`,
] as const;

const YT_EMBED = "https://www.youtube.com/embed/qELbf-KQTDQ";

const jumpClass =
  "text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline";

const body = "text-base leading-[1.75] text-neutral-600 md:text-lg";
const bodyLead = "text-lg font-medium leading-relaxed text-neutral-800 md:text-xl";
const hWeek = "font-heading text-[clamp(1.35rem,3.2vw,1.85rem)] font-semibold leading-snug text-neutral-900";
const hGuide = "mt-6 text-center font-heading text-[clamp(1.65rem,4vw,2.35rem)] font-bold leading-[1.15] tracking-tight text-neutral-900";
const hBlock = "font-heading text-[1.05rem] font-semibold text-neutral-900 md:text-xl";
const subNav = (
  <nav aria-label="Case study sections" className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-b border-border pb-4">
    <a href="#Discovery" className={jumpClass}>
      Week 1 · Discovery
    </a>
    <a href="#Inspiration" className={jumpClass}>
      Week 2 · Inspiration
    </a>
    <a href="#Design" className={jumpClass}>
      Week 3 · Design
    </a>
    <a href="#video-prototype" className={jumpClass}>
      Video prototype
    </a>
    <a href="#Reflection" className={jumpClass}>
      Week 4 · Reflections
    </a>
    <a href="#FinalPoster" className={jumpClass}>
      Final poster
    </a>
  </nav>
);

function SkioskFigure({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={cn("w-full min-w-0 overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50", className)}>
      <img src={src} alt={alt} className="block h-auto w-full object-contain" loading="lazy" decoding="async" />
    </figure>
  );
}

function TwoCol({
  reverse,
  className,
  children,
}: {
  reverse?: boolean;
  className?: string;
  children: [ReactNode, ReactNode];
}) {
  return (
    <div
      className={cn(
        "mt-12 grid gap-10 md:grid-cols-2 md:items-start md:gap-14",
        reverse && "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1",
        className,
      )}
    >
      <div className="min-w-0">{children[0]}</div>
      <div className="min-w-0">{children[1]}</div>
    </div>
  );
}

function ImageGrid({ items }: { items: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((it) => (
        <SkioskFigure key={it.src} src={it.src} alt={it.alt} />
      ))}
    </div>
  );
}

export default function SkioskCaseStudy({ study }: { study: CaseStudy }) {
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const href = "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap";
    const el = document.createElement("link");
    el.rel = "stylesheet";
    el.href = href;
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, []);

  useEffect(() => {
    if (!videoOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [videoOpen]);

  return (
    <CaseStudySiteChrome study={study} pageKey="skiosk" subNav={subNav}>
      <div className="skiosk-case-study min-w-0" style={{ fontFamily: '"Open Sans", system-ui, sans-serif' }}>
        <header id="case-study-intro" className="mb-10 scroll-mt-28 md:mb-14">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-start">
            <h1 id="skiosk-hero-title" className="font-heading text-[clamp(2.5rem,6vw,3.75rem)] font-bold leading-none tracking-tight text-neutral-900">
              Skiosk
            </h1>
            <div className="space-y-6">
              <p className={bodyLead}>
                Skiosk is an information center found on the ski slopes, featuring a large interactive screen for users to interact with.
              </p>
              <p className={body}>It is connected to a digital ski-pass worn around the arm which tracks GPS features.</p>
              <p className={body}>
                Join me as I guide you through this 4-week design sprint, a group project that brought Skiosk to life.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="rounded-md bg-neutral-900 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  Video
                </button>
                <a
                  href="#FinalPoster"
                  className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  Poster
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="mb-10 flex justify-center md:mb-14">
          <img src={I.heroSmall} alt="Skiosk product overview diagram" className="max-w-full object-contain" loading="eager" decoding="async" />
        </div>
        <SkioskFigure src={I.heroWide} alt="Skiosk dashboard and ski pass system overview" className="mb-16 md:mb-20" />

        <section id="design-roadmap" className="mb-20 scroll-mt-28 md:mb-24">
          <h2 className="text-center font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-neutral-900">
            Design Roadmap
          </h2>
          <p className={`mx-auto mt-6 max-w-3xl text-center ${body}`}>
            Let me walk you through the 4-week design sprint. Here&apos;s what to expect.
          </p>
          <p className="mx-auto mt-8 max-w-4xl text-center text-base font-semibold leading-relaxed text-neutral-800 md:text-lg">
            <a href="#Discovery" className="text-neutral-900 underline-offset-2 hover:underline">
              Discovery
            </a>{" "}
            |{" "}
            <a href="#Inspiration" className="text-neutral-900 underline-offset-2 hover:underline">
              Inspiration
            </a>{" "}
            |{" "}
            <a href="#Design" className="text-neutral-900 underline-offset-2 hover:underline">
              Design and Prototype
            </a>{" "}
            |{" "}
            <a href="#Reflection" className="text-neutral-900 underline-offset-2 hover:underline">
              Reflection
            </a>
          </p>
          <div className="mx-auto mt-10 flex max-w-3xl justify-center">
            <SkioskFigure src={I.roadmap} alt="Design roadmap — discovery through reflection" />
          </div>
        </section>

        <section id="Discovery" className="mb-20 scroll-mt-28 md:mb-24">
          <h2 className={hWeek}>Week 1 : Discovery</h2>
          <h3 className={hGuide}>Who are the users?</h3>
          <ul className="mx-auto mt-8 max-w-3xl list-none space-y-3 text-center">
            {["Understanding the users and their needs", "Understanding the sport", "Discovering the current scenarios and user breakdowns"].map((t) => (
              <li key={t} className={`${body} before:mr-2 before:content-['-']`}>
                {t}
              </li>
            ))}
          </ul>

          <TwoCol>
            <SkioskFigure src={I.w1Interview} alt="User interview research board" />
            <article>
              <h4 className={hBlock}>User Interview</h4>
              <p className={`mt-4 ${body}`}>
                I interviewed 5 skiing enthusiasts of various skill levels to document their detailed skiing experiences and interactions, with the aim of
                gathering insights and identifying user breakdowns.
              </p>
              <p className={`mt-6 ${body}`}>
                Duration of each interview: Around 10-15 minutes
                <br />
                Resources: Recording, Hand-written notes
              </p>
            </article>
          </TwoCol>

          <TwoCol>
            <article>
              <h4 className={hBlock}>Questionnaire</h4>
              <p className={`mt-4 ${body}`}>
                My team and I expanded our research by creating a Google Forms questionnaire, enabling us to engage with a wider range of skiing
                enthusiasts alongside in-depth story interviews.
              </p>
            </article>
            <SkioskFigure src={I.questionnaire} alt="Questionnaire and survey results" />
          </TwoCol>

          <TwoCol>
            <ImageGrid
              items={[
                { src: I.scenarioA, alt: "Current scenario sketch A" },
                { src: I.scenarioB, alt: "Current scenario sketch B" },
                { src: I.scenarioC, alt: "Current scenario sketch C" },
                { src: I.scenarioD, alt: "Current scenario sketch D" },
                { src: I.scenarioE, alt: "Interaction snippet sketch" },
                { src: I.scenarioF, alt: "Current scenario capture" },
              ]}
            />
            <article>
              <h4 className={hBlock}>Current Scenarios</h4>
              <p className={`mt-4 ${body}`}>
                I visualized user interactions from interviews by reviewing my notes, observations, and recordings, and sketched key moments to understand
                the AS IS scenario and guide the design process.
              </p>
            </article>
          </TwoCol>

          <TwoCol>
            <article>
              <h4 className={hBlock}>User Personas</h4>
              <p className={`mt-4 ${body}`}>- Representation of the users (from interviews and questionnaire)</p>
              <p className={`mt-3 ${body}`}>- Thinking beyond regular users (extreme users), to test the limits of the design</p>
            </article>
            <ImageGrid
              items={[
                { src: I.personaA, alt: "User persona board one" },
                { src: I.personaB, alt: "User persona board two" },
                { src: I.personaC, alt: "User persona board three" },
                { src: I.personaD, alt: "User persona board four" },
              ]}
            />
          </TwoCol>

          <TwoCol>
            <SkioskFigure src={I.painSort} alt="User pain points card sorting" />
            <article>
              <h4 className={hBlock}>User Painpoints - Card Sorting</h4>
              <p className={`mt-4 ${body}`}>
                As a team, we grouped and organized user breakdowns and pain points identified in interviews and questionnaires using a &apos;card
                sorting&apos; method, color-coding related issues into themes.
              </p>
            </article>
          </TwoCol>
        </section>

        <section id="Inspiration" className="mb-20 scroll-mt-28 md:mb-24">
          <h2 className={hWeek}>Week 2 : Inspiration</h2>
          <h3 className={hGuide}>What is possible?</h3>
          <ul className="mx-auto mt-8 max-w-3xl list-none space-y-3 text-center">
            {[
              "Identifying the problem to solve.",
              "Generating a variety of ideas that offer potential solutions.",
              "Creating a design space to embody the set of alternatives.",
              "Choosing a concept to explore, considering not just functionality but also the interaction with functionality.",
            ].map((t) => (
              <li key={t} className={`${body} before:mr-2 before:content-['-']`}>
                {t}
              </li>
            ))}
          </ul>

          <TwoCol>
            <article>
              <h4 className={hBlock}>User Problems &amp; Needs</h4>
              <p className={`mt-4 ${body}`}>
                We identified four key user problems/needs that we attempt to address through our solution:
                <br />
                <br />
                1. <em className="font-semibold not-italic text-neutral-800">Signal issues</em> on slopes due to inadequate network connectivity.
                <br />
                <br />
                2. <em className="font-semibold not-italic text-neutral-800">Collaboration</em> challenges arise on slopes as users struggle to communicate
                with friends and family.
                <br />
                <br />
                3. Users rely on <em className="font-semibold not-italic text-neutral-800">multiple navigation tools,</em> including Google Maps and physical
                signs, but face reliability issues due to poor network coverage and inclement weather.
                <br />
                <br />
                4. Users require a <em className="font-semibold not-italic text-neutral-800">simple way to plan</em> their entire day of skiing.
              </p>
            </article>
            <SkioskFigure src={I.problemsBoard} alt="User problems and needs synthesis" />
          </TwoCol>

          <TwoCol>
            <ImageGrid
              items={[
                { src: I.moodA, alt: "Brainstorming capture one" },
                { src: I.moodB, alt: "Brainstorming capture two" },
              ]}
            />
            <article>
              <h4 className={hBlock}>Brainstorming + Moodboard</h4>
              <p className={`mt-4 ${body}`}>
                In brainstorming, our aim was to generate a large quantity of ideas rather than focusing on quality. We encouraged suggesting alternatives
                without discussing or debating the ideas.
              </p>
            </article>
          </TwoCol>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
            <article>
              <h4 className={hBlock}>Possible Functionalities</h4>
              <SkioskFigure src={I.func} alt="Possible functionalities diagram" className="mt-4" />
            </article>
            <article>
              <h4 className={hBlock}>Possible Interactions</h4>
              <SkioskFigure src={I.interact} alt="Possible interactions diagram" className="mt-4" />
            </article>
          </div>

          <TwoCol className="mt-12">
            <article>
              <h4 className={hBlock}>Participatory Design Workshop</h4>
              <p className={`mt-4 ${body}`}>
                Understanding the user&apos;s perspective was hard especially because we were not the regular skiers.
                <br />
                Our instincts may have been wrong. Hence, we felt just asking questions was not enough.
                <br />
                <br />
                Our motive behind the workshop: <br />- prevent major errors
                <br />- contributes new insights
                <br />- generate inexpensive user innovations
              </p>
            </article>
            <SkioskFigure src={I.pdMain} alt="Participatory design workshop overview" />
          </TwoCol>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <SkioskFigure src={I.pd1} alt="Workshop activity board one" />
            <SkioskFigure src={I.pd2} alt="Workshop activity board two" />
            <SkioskFigure src={I.pd3} alt="Workshop activity board three" />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <SkioskFigure src={I.pd4} alt="Workshop outcomes board one" />
            <SkioskFigure src={I.pd5} alt="Workshop outcomes board two" />
          </div>
        </section>

        <section id="Design" className="mb-20 scroll-mt-28 md:mb-24">
          <h2 className={hWeek}>Week 3: Design</h2>
          <h3 className={hGuide}>What should it do?</h3>
          <ul className="mx-auto mt-8 max-w-3xl list-none space-y-3 text-center">
            {[
              "Creating a design space and reiterating on the design concept",
              "Transforming ideas into a storyboard: Converting conceptual notions and future scenarios into a compelling narrative.",
              "Paper prototyping to aid the final video prototype",
            ].map((t) => (
              <li key={t} className={`${body} before:mr-2 before:content-['-']`}>
                {t}
              </li>
            ))}
          </ul>

          <TwoCol>
            <article>
              <h4 className={hBlock}>Base Design Concept</h4>
              <p className={`mt-4 ${body}`}>
                Our base design concept included a wearable ski pass, functioning like a watch, and strategically placed kiosks. The pass + kiosks offers
                convenience and provide real-time gps tracking, enhancing the collaboration aspects of skiing. Together, they tried to solve the user needs.
              </p>
            </article>
            <SkioskFigure src={I.baseConcept} alt="Base design concept — ski pass and kiosk" />
          </TwoCol>

          <TwoCol>
            <ImageGrid
              items={[
                { src: I.redesignA, alt: "Redesigned concept screen one" },
                { src: I.redesignB, alt: "Redesigned concept screen two" },
                { src: I.redesignC, alt: "Redesigned concept screen three" },
              ]}
            />
            <article>
              <h4 className={hBlock}>Redesigned Design Concept</h4>
              <h5 className="mt-2 font-heading text-sm font-medium leading-snug text-neutral-800 md:text-base">
                Enhancements to base Design Concept based on Participatory Design workshop feedback
              </h5>
              <p className={`mt-4 ${body}`}>
                <strong>Ski Pass Enhancements:</strong>
                <br />
                SOS Emergency Alerts for user and staff | Pending Friend Messages Notification | Speed and Location Tracking | Lift Access Pass Functionality
                <br />
                <br />
                <strong>Kiosk Enhancements:</strong>
                <br />
                Leaderboards and Mini Games | Personal Skiing Stats Viewing | Friends&apos; Location on Ski Routes | Sending Message Notifications for Friends
                | Timetable, Route, and Restaurant Information Access
              </p>
            </article>
          </TwoCol>

          <TwoCol>
            <ImageGrid
              items={[
                { src: I.storyA, alt: "Storyboard frame one" },
                { src: I.storyB, alt: "Storyboard frame two" },
                { src: I.storyC, alt: "Storyboard frame three" },
              ]}
            />
            <article>
              <h4 className={hBlock}>Storyboarding</h4>
              <p className={`mt-4 ${body}`}>
                In this storyboard, we observe four personas navigating a ski resort in challenging weather conditions. Katie and Alex use innovative ski passes
                and kiosks to coordinate and ensure their safety. Jane and her daughters find shelter and engage with skiing statistics in a kiosk. Meanwhile,
                experienced skier Erik encounters an accident, triggering an SOS response from the resort staff.
                <br />
                <br />
                Our Goal:
                <br />- Identify key interaction snippets in the scenario
                <br />- Examine the key ideas from the design space(brainstormed ideas)
                <br />- Illustrate the interactions between user and our novel system
              </p>
            </article>
          </TwoCol>

          <TwoCol>
            <ImageGrid
              items={[
                { src: I.storyWideA, alt: "Storyboard spread one" },
                { src: I.storyWideB, alt: "Storyboard spread two" },
              ]}
            />
            <article>
              <h4 className={hBlock}>Paper Prototype</h4>
              <p className={`mt-4 ${body}`}>
                We employed a &apos;Wizard of Oz&apos; approach, crafting paper prototypes and acting out the storyboard scenarios to create a video prototype
                of the ski kiosk concept, allowing us to test user interactions and visualize the user experience effectively.
              </p>
            </article>
          </TwoCol>
        </section>

        <section id="video-prototype" className="mb-20 scroll-mt-28 md:mb-24">
          <h3 className={hBlock}>Video Prototype</h3>
          <div className="relative mt-6 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-black pt-[56.25%] shadow-lg">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`${YT_EMBED}?rel=0`}
              title="Advanced DOIS: SKiosk (Video Prototype)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>

        <section id="Reflection" className="mb-20 scroll-mt-28 md:mb-24">
          <h2 className={hWeek}>Week 4 : Reflections</h2>
          <h3 className={hGuide}>What went well? What didn&apos;t?</h3>
          <ul className="mx-auto mt-8 max-w-3xl list-none space-y-3 text-center">
            {[
              "We reflect on the methods: why we chose them, potential drawbacks, other reflections",
              "we also propose future steps",
            ].map((t) => (
              <li key={t} className={`${body} before:mr-2 before:content-['-']`}>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
            {REFLECTION.slice(0, 5).map((src, i) => (
              <SkioskFigure key={src} src={src} alt={`Reflection board ${i + 1}`} className="rounded-xl" />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-5 md:gap-4">
            {REFLECTION.slice(5).map((src, i) => (
              <SkioskFigure key={src} src={src} alt={`Reflection board ${i + 6}`} className="rounded-xl" />
            ))}
          </div>

          <article className="mx-auto mt-16 max-w-3xl text-center md:text-left">
            <h4 className={hBlock}>Future Steps</h4>
            <p className={`mt-4 ${body}`}>
              In the next phases of this project, our objectives include revamping the current design concept and exploring additional design alternatives, such
              as the integration of drone technology on the ski slopes. Furthermore, we plan to conduct a formal experiment to compare these different design
              approaches.
            </p>
          </article>
        </section>

        <section id="FinalPoster" className="scroll-mt-28 pb-8">
          <h3 className={hBlock}>Final Poster</h3>
          <SkioskFigure src={I.poster} alt="Skiosk final A4 poster" className="mt-6" />
        </section>
      </div>

      {videoOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Video prototype"
        >
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close video" onClick={() => setVideoOpen(false)} />
          <div className="relative z-10 w-full max-w-4xl rounded-2xl border border-white/10 bg-neutral-950 p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="absolute right-3 top-3 z-20 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white hover:bg-white/20"
            >
              Close
            </button>
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute inset-0 h-full w-full rounded-lg"
                src={`${YT_EMBED}?autoplay=1&rel=0`}
                title="Video Prototype Skiosk"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </CaseStudySiteChrome>
  );
}
