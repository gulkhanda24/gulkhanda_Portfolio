import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getCaseStudy } from "@/data/caseStudies";
import RapidoCaptainCaseStudy from "@/pages/RapidoCaptainCaseStudy";
import CaseStudyDefault from "@/pages/CaseStudyDefault";
import SmartHelmetCaseStudy from "@/pages/SmartHelmetCaseStudy";
import IeltsSpeakingLabCaseStudy from "@/pages/IeltsSpeakingLabCaseStudy";

/**
 * Land on the first case study block (`#case-study-intro`) after route transition.
 * If the URL has another hash, scroll there instead. Retries after AnimatePresence so the target exists in the DOM.
 */
function useScrollToCaseStudySection(enabled: boolean) {
  const { slug } = useParams<{ slug: string }>();
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!enabled || !slug) return;

    const targetId =
      hash && hash.length > 1 ? decodeURIComponent(hash.slice(1)) : "case-study-intro";

    const scrollToTarget = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Run after route exit + enter (~300ms + ~520ms) so the page transition finishes before scrolling to the hero.
    const afterTransition = window.setTimeout(scrollToTarget, 560);
    const settle = window.setTimeout(scrollToTarget, 720);

    return () => {
      window.clearTimeout(afterTransition);
      window.clearTimeout(settle);
    };
  }, [enabled, slug, key, hash]);
}

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = getCaseStudy(slug || "");

  useScrollToCaseStudySection(!!study);

  if (!study) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Case Study Not Found</h1>
          <Link to="/" className="text-primary hover:underline inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (slug === "rapido-captain") {
    return <RapidoCaptainCaseStudy study={study} />;
  }

  if (slug === "smart-helmet-bike-care") {
    return <SmartHelmetCaseStudy study={study} />;
  }

  if (slug === "ielts-speaking-lab") {
    return <IeltsSpeakingLabCaseStudy study={study} />;
  }

  return <CaseStudyDefault study={study} slug={slug!} />;
};

export default CaseStudyPage;
