import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/data/caseStudies";
import { caseStudies } from "@/data/caseStudies";
import type { ReactNode } from "react";

const yellow = "bg-[#F5D547] text-neutral-900";

const caseStudyPageTransition = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

type CaseStudySiteChromeProps = {
  study: CaseStudy;
  pageKey: string;
  children: ReactNode;
  /** Optional row under “Back to projects” (e.g. in-page anchor links) */
  subNav?: ReactNode;
};

export default function CaseStudySiteChrome({ study, pageKey, children, subNav }: CaseStudySiteChromeProps) {
  const prefersReducedMotion = useReducedMotion();
  const idx = caseStudies.findIndex((c) => c.slug === study.slug);
  const prevStudy = idx > 0 ? caseStudies[idx - 1] : null;
  const nextStudy = study.nextSlug ? caseStudies.find((c) => c.slug === study.nextSlug) : null;

  return (
    <motion.div
      key={pageKey}
      variants={caseStudyPageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <motion.nav
        initial={prefersReducedMotion ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className={cn("flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold", yellow)}>G</span>
            <Link to="/" className="font-heading text-lg font-bold text-foreground">
              Gulkhanda
            </Link>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link to="/#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Project
            </Link>
            <Link to="/#about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              About
            </Link>
            <a
              href="mailto:gulkhandajahan@gmail.com?subject=Resume%20request"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Resume
            </a>
          </div>
          <a
            href="mailto:gulkhandajahan@gmail.com"
            className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Let&apos;s Talk
          </a>
        </div>
      </motion.nav>

      <div className="mx-auto max-w-6xl px-6 pt-8 pb-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="/#projects"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to All Projects
          </Link>
        </motion.div>

        {subNav}

        <div className="min-w-0">{children}</div>

        <div className="mt-16 flex flex-col items-stretch justify-between gap-6 border-t border-border pt-12 sm:flex-row sm:items-center">
          {prevStudy ? (
            <Link
              to={`/case-study/${prevStudy.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              Previous Project
            </Link>
          ) : (
            <span />
          )}
          {nextStudy ? (
            <Link
              to={`/case-study/${nextStudy.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground sm:ml-auto"
            >
              Next Project
            </Link>
          ) : null}
        </div>
      </div>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 Gulkhanda Jahan. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:gulkhandajahan@gmail.com" className="text-sm text-muted-foreground hover:text-foreground">
              Email
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Dribbble
            </a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
