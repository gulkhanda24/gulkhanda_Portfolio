import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef } from "react";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gulkhandajahan/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Mail",
    href: "mailto:gulkhandajahan@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/gulkhandajahan",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.048 6.36 1.73 1.349 3.92 2.16 6.299 2.16 1.42 0 2.77-.29 4.005-.77zm-9.565-2.05c.247-.42 3.027-5.055 8.344-6.718.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C9.12 16.65 4.74 16.854 4.34 16.87l.01.804c0 .568.064 1.12.17 1.656zm-1.907-4.065c.41.002 4.11-.05 8.702-1.86-1.5-2.672-3.112-4.91-3.36-5.23-2.644 1.24-4.598 3.622-5.342 6.09zM9.07 4.276c.258.33 1.91 2.564 3.392 5.29 3.233-1.21 4.6-3.05 4.758-3.276-1.48-1.317-3.42-2.12-5.55-2.12-.885 0-1.74.143-2.55.4z" />
      </svg>
    ),
  },
  {
    label: "Medium",
    href: "https://medium.com/@gulkhandajahan",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
];

const footerLinks = [
  { label: "About Me", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Design Philosophy", href: "#philosophy" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "mailto:gulkhandajahan@gmail.com" },
];

const Footer = () => {
  const { ref, isInView } = useScrollAnimation();
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [45, 0]);

  return (
    <motion.footer
      className="bg-primary py-20 px-6 relative overflow-hidden rounded-t-3xl"
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
        (footerRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      style={{ scale: bgScale, transformOrigin: "bottom center" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, hsl(268 38% 40% / 0.15), transparent)",
        }}
      />

      <motion.div className="max-w-5xl mx-auto relative z-10" style={{ y: contentY }}>
        {/* Scrolling label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading font-bold text-sm md:text-base text-primary-foreground/30 tracking-[0.25em] uppercase mb-10 text-center"
        >
          PRODUCT DESIGNER · PRODUCT DESIGNER · PRODUCT DESIGNER
        </motion.p>

        {/* Social links row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-5 mb-14"
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              whileHover={{ y: -4, scale: 1.12, transition: { duration: 0.18 } }}
              whileTap={{ scale: 0.92 }}
              className="w-11 h-11 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground hover:border-primary-foreground/50 transition-colors duration-200"
              title={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Passion statement */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-primary-foreground/60 text-base md:text-lg leading-relaxed mb-16 max-w-lg mx-auto text-center"
        >
          My passion lies in the intersection of art and technology, creating
          visually captivating interfaces and elevating overall user digital experiences.
        </motion.p>

        {/* Big brand name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <a
            href="#"
            className="font-heading font-black text-primary-foreground/90 hover:text-primary-foreground transition-colors leading-none block"
            style={{ fontSize: "clamp(2.8rem, 10vw, 8rem)", letterSpacing: "-0.03em" }}
          >
            Gulkhanda Jahan
          </a>
          <p className="text-primary-foreground/30 text-sm tracking-[0.25em] uppercase font-medium mt-3">
            PRODUCT DESIGNER
          </p>
        </motion.div>

        {/* Nav links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {footerLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.45 + i * 0.055 }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              className="text-sm text-primary-foreground/40 hover:text-primary-foreground/80 transition-colors font-medium"
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-primary-foreground/20 text-xs mt-14 text-center"
        >
          © 2024 Gulkhanda Jahan. All rights reserved.
        </motion.p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
