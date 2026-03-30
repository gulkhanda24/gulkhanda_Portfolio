import { useRef } from "react";
import type { CaseStudy, CaseStudySection } from "@/data/caseStudies";
import CaseStudySiteChrome from "@/components/CaseStudySiteChrome";
import CaseStudyStandardHero, { caseStudySectionEyebrow } from "@/components/CaseStudyStandardHero";

const jumpClass =
  "text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline";

function toolsFromTags(tags: string[]) {
  const t = tags.slice(0, 4).join(", ");
  return t.length > 56 ? `${t.slice(0, 54)}…` : t;
}

function DefaultSectionBlock({ section, index }: { section: CaseStudySection; index: number }) {
  return (
    <section id={`section-${index}`} className="mb-20 scroll-mt-28">
      <h2 className={caseStudySectionEyebrow}>{section.title.toUpperCase()}</h2>
      <p className="mt-3 max-w-3xl text-lg font-medium text-neutral-700">{section.subtitle}</p>

      <div className="mt-6 max-w-3xl space-y-5">
        {section.content.map((paragraph, pi) => (
          <p key={pi} className="text-base leading-relaxed text-neutral-600 md:text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      {section.bullets && section.bullets.length > 0 ? (
        <ul className="mt-8 max-w-3xl space-y-3">
          {section.bullets.map((bullet, bi) => (
            <li key={bi} className="flex gap-3 text-base leading-relaxed text-neutral-600 md:text-lg">
              <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-900" aria-hidden />
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}

      {section.image ? (
        <figure className="mt-10 w-full min-w-0 overflow-hidden rounded-2xl bg-neutral-100">
          <img
            src={section.image}
            alt={section.imageCaption || section.title}
            className="block h-auto w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          {section.imageCaption ? (
            <figcaption className="border-t border-neutral-200/80 px-4 py-3 text-center text-sm text-neutral-500">
              {section.imageCaption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
    </section>
  );
}

export default function CaseStudyDefault({ study, slug }: { study: CaseStudy; slug: string }) {
  const heroIntroRef = useRef<HTMLElement | null>(null);
  const pill = study.category.toUpperCase();
  const tools = toolsFromTags(study.tags);

  return (
    <CaseStudySiteChrome
      study={study}
      pageKey={slug}
      subNav={
        <nav aria-label="Case study sections" className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-b border-border pb-4">
          {study.sections.map((s, i) => (
            <a key={`${slug}-nav-${i}`} href={`#section-${i}`} className={jumpClass}>
              {s.title}
            </a>
          ))}
        </nav>
      }
    >
      <CaseStudyStandardHero
        heroIntroRef={heroIntroRef}
        pillText={pill}
        title={study.title}
        subtitle={`${study.categoryLabel} · ${study.year}`}
        metaRows={[
          { label: "ROLE", value: study.role },
          { label: "TOOLS", value: tools || "—" },
          { label: "YEAR", value: study.year },
        ]}
        imageSrc={study.heroImage}
        imageAlt={study.title}
      />

      <div className="min-w-0">
        {study.sections.map((section, i) => (
          <DefaultSectionBlock key={`${slug}-${i}-${section.title}`} section={section} index={i} />
        ))}
      </div>
    </CaseStudySiteChrome>
  );
}
