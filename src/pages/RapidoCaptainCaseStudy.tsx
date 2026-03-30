import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import type { CaseStudy } from "@/data/caseStudies";
import { cn } from "@/lib/utils";
import CaseStudySiteChrome from "@/components/CaseStudySiteChrome";
import CaseStudyStandardHero, { caseStudySectionEyebrow } from "@/components/CaseStudyStandardHero";

const rapidoAllScreensFlow = [
  {
    src: "/rapido-all-screens-01.png",
    shortLabel: "Pickup map",
    alt: "Go to pickup — map with route, pickup pin, rider card, message field, and Arrived button",
  },
  {
    src: "/rapido-all-screens-02.png",
    shortLabel: "Street view",
    alt: "Immersive pickup view with Pickup point label and ground marker on the station entrance",
  },
  {
    src: "/rapido-all-screens-03.png",
    shortLabel: "Reset view",
    alt: "Same pickup Street View with Reset to pickup point floating action",
  },
  {
    src: "/rapido-all-screens-04.png",
    shortLabel: "Navigation",
    alt: "Turn-by-turn navigation map with pickup pin, street thumbnail, geofence, and ETA bar",
  },
  {
    src: "/rapido-all-screens-05.png",
    shortLabel: "Camera",
    alt: "Camera capture — viewfinder, close control, and yellow shutter",
  },
  {
    src: "/rapido-all-screens-06.png",
    shortLabel: "Photo preview",
    alt: "Captured station photo with Send Photo and Retake actions",
  },
  {
    src: "/rapido-all-screens-07.png",
    shortLabel: "Chat + photo",
    alt: "Chat with passenger — thread including sent location photo and quick replies",
  },
  {
    src: "/rapido-all-screens-08.png",
    shortLabel: "Voice record",
    alt: "Chat with active voice recording bar, timer, and waveform",
  },
  {
    src: "/rapido-all-screens-09.png",
    shortLabel: "Voice sent",
    alt: "Chat showing sent voice message with play control and duration",
  },
  {
    src: "/rapido-all-screens-10.png",
    shortLabel: "Chat thread",
    alt: "Go to pickup chat with passenger messages, photo bubble, and input with camera and mic",
  },
] as const;

const rapidoAllScreensMarqueeLoop = [
  ...rapidoAllScreensFlow,
  ...rapidoAllScreensFlow,
  ...rapidoAllScreensFlow,
  ...rapidoAllScreensFlow,
] as const;

function RapidoAllScreensMockupCard({
  item,
  index,
  motionProps = true,
}: {
  item: (typeof rapidoAllScreensFlow)[number];
  index: number;
  motionProps?: boolean;
}) {
  const inner = (
    <div
      className={cn(
        "flex flex-shrink-0 cursor-default flex-col items-center gap-2 select-none",
        motionProps && "will-change-transform"
      )}
    >
      <div
        className={cn(
          "rounded-2xl border-2 border-dashed border-neutral-300 bg-gradient-to-b from-neutral-100 to-neutral-200/90 p-3 shadow-inner sm:p-4",
          "flex min-h-[120px] min-w-0 items-center justify-center"
        )}
      >
        <div className="rounded-[1.35rem] border-[3px] border-black bg-neutral-950 p-1 shadow-[0_12px_40px_rgba(0,0,0,0.25)] ring-1 ring-black/30">
          <img
            src={item.src}
            alt={item.alt}
            className="block h-[min(48vh,400px)] w-auto max-h-[400px] rounded-[1.05rem] object-contain object-top"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <span className="max-w-[7.5rem] text-center text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
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
        delay: (index % rapidoAllScreensFlow.length) * 0.02,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.16 } }}
    >
      {inner}
    </motion.div>
  );
}

function RapidoAllScreensMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 180, damping: 45 });
  const mockupsXShift = useTransform(smoothVelocity, [-1500, 0, 1500], [55, 0, -55]);

  if (prefersReducedMotion) {
    return (
      <div className="overflow-x-auto rounded-2xl border border-neutral-200/70 bg-neutral-100 py-6">
        <div className="flex w-max items-stretch gap-5 px-4 pb-2">
          {rapidoAllScreensFlow.map((item, i) => (
            <RapidoAllScreensMockupCard key={item.src} item={item} index={i} motionProps={false} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="marquee-mask overflow-hidden rounded-2xl border border-neutral-200/70 bg-neutral-100 py-8">
      <div className="overflow-hidden">
        <motion.div style={{ x: mockupsXShift }}>
          <div className="animate-marquee-tools flex w-max items-stretch gap-5 px-4">
            {rapidoAllScreensMarqueeLoop.map((item, i) => (
              <RapidoAllScreensMockupCard key={`${i}-${item.src}`} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function RapidoCaptainCaseStudy({ study }: { study: CaseStudy }) {
  const heroIntroRef = useRef<HTMLElement | null>(null);

  return (
    <CaseStudySiteChrome study={study} pageKey="rapido-captain">
        <CaseStudyStandardHero
          heroIntroRef={heroIntroRef}
          pillText="RAPIDO"
          title="Rapido Captain"
          subtitle="Enhancing pick-up accuracy · 2023 – 2024"
          metaRows={[
            { label: "ROLE", value: "Product Designer" },
            { label: "TOOLS", value: "Figma, Miro, Protopie" },
            { label: "DURATION", value: "4 Months" },
          ]}
          metrics={[
            {
              value: "82%",
              description: "Reduction in cancellations due to 'Unable to find customer'",
            },
            {
              value: "15%",
              description: "Increase in overall completed rides",
            },
            {
              value: "44%",
              description: "Improvement in pickup time accuracy",
            },
          ]}
          imageSrc="/rapido-hero-pickup-screen.png"
          imageAlt="Rapido Captain — Go to pickup map with green route, pickup pin, and rider card"
        />

        {/* Overview */}
        <section className="mb-20 max-w-3xl">
          <h2 className={caseStudySectionEyebrow}>OVERVIEW</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
            Rapido Captains operate in fast, dense urban corridors where every second counts. Finding the exact pick-up point is
            one of the biggest friction points in their journey. This project aimed to refine the pick-up experience, reducing
            friction for both Captains and customers.
          </p>
        </section>

        {/* The Problem */}
        <section className="mb-20">
          <h2 className={caseStudySectionEyebrow}>THE PROBLEM</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg">
            The &quot;last mile&quot; of a pick-up is often the most stressful. Ambiguous locations lead to excessive calling,
            cancelled rides, and wasted fuel. Captains often struggle to locate the customer in crowded areas, leading to a poor
            experience for everyone involved.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-neutral-900 px-5 py-6 text-center text-white">
              <p className="font-heading text-2xl font-bold md:text-3xl">Avg. 2.5</p>
              <p className="mt-2 text-sm text-neutral-300">Calls per ride for location</p>
            </div>
            <div className="rounded-2xl bg-neutral-900 px-5 py-6 text-center text-white">
              <p className="font-heading text-2xl font-bold md:text-3xl">8%</p>
              <p className="mt-2 text-sm text-neutral-300">Ride cancellation rate due to location mismatch</p>
            </div>
            <div className="rounded-2xl bg-neutral-900 px-5 py-6 text-center text-white">
              <p className="font-heading text-2xl font-bold md:text-3xl">$1.2M</p>
              <p className="mt-2 text-sm text-neutral-300">Estimated monthly revenue loss from cancellations</p>
            </div>
          </div>
          <div className="mt-10 rounded-2xl bg-neutral-100 px-6 py-10 text-center md:px-12 md:py-12">
            <p className="font-heading text-xl font-bold text-neutral-900 md:text-2xl lg:text-3xl">
              Captains don&apos;t need more data; they need clarity at the right moment.
            </p>
          </div>
        </section>

        {/* The Process */}
        <section className="mb-20">
          <h2 className={caseStudySectionEyebrow}>THE PROCESS</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
              <p className="font-heading text-3xl font-bold text-neutral-900">3 Weeks</p>
              <p className="mt-2 text-sm text-neutral-600">User Research</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
              <p className="font-heading text-3xl font-bold text-neutral-900">4 Weeks</p>
              <p className="mt-2 text-sm text-neutral-600">Ideation &amp; Prototyping</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
              <p className="font-heading text-3xl font-bold text-neutral-900">12</p>
              <p className="mt-2 text-sm text-neutral-600">Iterations</p>
            </div>
          </div>
        </section>

        {/* User Research */}
        <section className="mb-20">
          <h2 className={caseStudySectionEyebrow}>USER RESEARCH</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg">
            I spent 2 weeks shadowing Captains in Bangalore. Observing their real-world struggles provided insights that data
            alone couldn&apos;t reveal.
          </p>
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-sm font-bold text-neutral-600">
                R
              </div>
              <blockquote className="text-base italic leading-relaxed text-neutral-700 md:text-lg">
                &ldquo;Sometimes the pin is inside a building, but the customer is on the main road. I have to call to
                confirm.&rdquo; — Rajesh, 4.8★ Captain
              </blockquote>
            </div>
          </div>
          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-neutral-900">Mapping the &quot;Last Mile&quot;</h3>
              <p className="mt-2 text-neutral-600 leading-relaxed">
                The GPS pin is often several meters away from the actual standing point.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-neutral-900">Contextual Blindness</h3>
              <p className="mt-2 text-neutral-600 leading-relaxed">
                Captains can&apos;t safely look at small map details while maneuvering in traffic.
              </p>
            </div>
          </div>
        </section>

        {/* The Redesign */}
        <section className="mb-20">
          <h2 className={caseStudySectionEyebrow}>THE REDESIGN</h2>
          <h3 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl">The Redesign</h3>
          <p className="mt-4 text-lg font-medium text-neutral-700 md:text-xl">
            Here&apos;s how we transformed the experience:
          </p>
          <div className="mt-10 max-w-3xl">
            <h4 className="font-heading text-xl font-bold text-neutral-900 md:text-2xl">
              1. Visual Intelligence on the Map
            </h4>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
              Integrating an Image View within the Pickup Screen helped drivers visually identify exact pickup points instead
              of relying solely on abstract map pins. It bridged the gap between digital navigation and real-world context,
              reducing confusion and search time. This visual clarity led to faster, more accurate pickups and improved driver
              confidence at busy transit hubs.
            </p>
          </div>
          <div className="mt-10 w-full min-w-0 overflow-hidden rounded-2xl bg-neutral-100">
            <img
              src="/rapido-visual-intelligence-mockup.png"
              alt="Pickup Screen annotated mockup — pickup marker distance cue, street view ingress from thumbnail, chat and call for quick contact"
              className="block h-auto w-full max-w-none border-0 object-contain shadow-none ring-0 outline-none [box-shadow:none]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="mt-16 max-w-3xl">
            <h4 className="font-heading text-xl font-bold text-neutral-900 md:text-2xl">
              2. Street View of the pick up spot
            </h4>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
              The Pickup Screen first attempts to load a Street View of the exact pickup spot, showing a 360° real-world
              image with a highlighted marker. If Street View isn&apos;t available, the app automatically switches to a
              static Image View — a cached photo of the location with the same visual cues — ensuring drivers always have a
              reliable visual reference regardless of connectivity or data availability.
            </p>
          </div>
          <div className="mt-10 w-full min-w-0 overflow-hidden rounded-2xl bg-neutral-100 p-6 sm:p-8 md:p-10">
            <img
              src="/rapido-street-view-comparison.png"
              alt="Street View pickup marker and Reset to pickup point — two-column comparison of the driver experience"
              className="block h-auto w-full max-w-none rounded-lg border-0 object-contain shadow-none ring-0 outline-none [box-shadow:none]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="mt-16 max-w-3xl">
            <h4 className="font-heading text-xl font-bold text-neutral-900 md:text-2xl">3. Navigation Reimagined</h4>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
              As the driver approaches the pickup point, the default navigation marker seamlessly transitions into a Street View
              marker. The driver can click the marker, and the street view of the exact pickup spot appears for quick visual
              confirmation.
            </p>
          </div>
          <div className="mt-10 w-full min-w-0 overflow-hidden rounded-2xl bg-neutral-100 p-6 sm:p-8 md:p-10">
            <img
              src="/rapido-navigation-screen-mockup.png"
              alt="Navigation screen — pickup pin with street view thumbnail card, geofence, turn banner, and chat ingress"
              className="block h-auto w-full max-w-none rounded-lg border-0 object-contain shadow-none ring-0 outline-none [box-shadow:none]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="mt-16 max-w-3xl">
            <h4 className="font-heading text-xl font-bold text-neutral-900 md:text-2xl">Go to pickup — full screen flow</h4>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
              Map overview and rider context, immersive Street View with a clear pickup marker, reset when the view drifts,
              turn-by-turn navigation into the geofence, then camera capture when a photo helps close the loop with the rider.
            </p>
          </div>
          <div className="mt-10 w-full min-w-0 overflow-x-auto rounded-2xl bg-neutral-100 p-4 sm:p-6 md:p-8">
            <img
              src="/rapido-go-to-pickup-five-mockups.png"
              alt="Five phone mockups: Go to pickup map with rider card, Street View with pickup point, Reset to pickup point, navigation with turn banner and geofence, and camera shutter"
              className="mx-auto block h-auto w-full max-w-[1400px] rounded-lg border-0 object-contain shadow-none ring-0 outline-none [box-shadow:none] min-w-[840px] md:min-w-0"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="mt-16 max-w-3xl">
            <h4 className="font-heading text-xl font-bold text-neutral-900 md:text-2xl">
              4. Photo &amp; Voice Message Integration on Chat
            </h4>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
              The Photo and Voice Message Integration in chat enables drivers and passengers to communicate more effectively
              during pickups. Drivers can send a quick photo of their exact location or a short voice message when typing
              isn&apos;t convenient, reducing misunderstandings and delays. This feature adds a personal, real-time layer to
              communication, helping both parties identify each other faster and complete pickups smoothly even in crowded or
              noisy environments.
            </p>
          </div>
          <div className="mt-10 w-full min-w-0 overflow-hidden rounded-2xl bg-neutral-100 p-6 sm:p-8 md:p-10">
            <img
              src="/rapido-chat-photo-camera-mockup.png"
              alt="Chat — photo capability with shared pickup image and camera integration with Send Photo and Retake"
              className="block h-auto w-full max-w-none rounded-lg border-0 object-contain shadow-none ring-0 outline-none [box-shadow:none]"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="mt-10 w-full min-w-0 overflow-hidden rounded-2xl bg-neutral-100 p-6 sm:p-8 md:p-10">
            <img
              src="/rapido-chat-voice-message-mockup.png"
              alt="Chat — recording voice with waveform timer, then sent voice message bubble with play control"
              className="block h-auto w-full max-w-none rounded-lg border-0 object-contain shadow-none ring-0 outline-none [box-shadow:none]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="mt-16 max-w-3xl">
            <h4 className="font-heading text-xl font-bold text-neutral-900 md:text-2xl">5. All screens</h4>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
              Here are the screens that I designed as part of this initiative.
            </p>
          </div>
          <div className="mt-10">
            <RapidoAllScreensMarquee />
          </div>
        </section>

        {/* The Impact */}
        <section className="mb-20">
          <h2 className={caseStudySectionEyebrow}>THE IMPACT</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg">
            The redesign was rolled out to a pilot group of 5,000 Captains over 2 months. The results exceeded our initial KPIs.
          </p>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-6 py-4 font-heading font-bold text-neutral-900">Metric</th>
                  <th className="px-6 py-4 font-heading font-bold text-neutral-900">Before</th>
                  <th className="px-6 py-4 font-heading font-bold text-neutral-900">After</th>
                  <th className="px-6 py-4 font-heading font-bold text-neutral-900">Improvement</th>
                </tr>
              </thead>
              <tbody className="text-neutral-700">
                <tr className="border-b border-neutral-100">
                  <td className="px-6 py-4 font-medium">Pick-up Success Rate</td>
                  <td className="px-6 py-4">72%</td>
                  <td className="px-6 py-4">86%</td>
                  <td className="px-6 py-4 font-semibold text-emerald-700">+14%</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="px-6 py-4 font-medium">Avg. Calls per Ride</td>
                  <td className="px-6 py-4">2.8</td>
                  <td className="px-6 py-4">1.2</td>
                  <td className="px-6 py-4 font-semibold text-emerald-700">-57%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Driver Satisfaction</td>
                  <td className="px-6 py-4">3.4/5</td>
                  <td className="px-6 py-4">4.5/5</td>
                  <td className="px-6 py-4 font-semibold text-emerald-700">+32%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <blockquote className="mt-12 border-l-4 border-amber-500 pl-6 text-lg italic text-neutral-800 md:text-xl">
            &ldquo;The new interface feels like it&apos;s riding with me, not fighting against me.&rdquo;
          </blockquote>
        </section>

    </CaseStudySiteChrome>
  );
}
