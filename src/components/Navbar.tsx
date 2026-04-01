import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Design Philosophy", href: "#philosophy" },
  { label: "Resume", href: "#resume" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  const onHero = !scrolled;

  const linkBase = "text-sm font-medium transition-colors relative group";
  const linkHero = `${linkBase} text-white hover:text-white/90`;
  const linkScrolled = `${linkBase} text-black/80 hover:text-black/90`;

  const underlineHero = "bg-white/90";
  const underlineScrolled = "bg-black/80";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out ${
        scrolled ? "pt-3 sm:pt-4 md:pt-5 px-3 sm:px-4 md:px-6" : "pt-0"
      }`}
    >
      <div
        className={`mx-auto flex w-full flex-col transition-all duration-300 ease-out ${
          scrolled
            ? "max-w-6xl rounded-2xl border border-white/55 bg-[hsla(270,35%,97%,0.78)] px-5 py-3 shadow-[0_12px_40px_-10px_rgba(45,25,80,0.18)] backdrop-blur-xl sm:rounded-full sm:px-8 sm:py-3 md:px-10 md:py-3.5"
            : "max-w-7xl bg-transparent px-6 py-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className={`font-heading text-xl font-bold tracking-tight transition-colors ${
              onHero ? "text-white hover:text-white" : "text-black hover:text-black"
            }`}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            Gulkhanda Jahan
          </motion.a>

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                className={onHero ? linkHero : linkScrolled}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                    onHero ? underlineHero : underlineScrolled
                  }`}
                />
              </motion.a>
            ))}
            <motion.a
              href="mailto:gulkhandajahan@gmail.com"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.65 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={
                onHero
                  ? "rounded-full border border-white/80 bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                  : "rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-900"
              }
            >
              Contact
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <motion.button
            type="button"
            className={`p-1 md:hidden ${onHero ? "text-white" : "text-black"}`}
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.9 }}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`md:hidden overflow-hidden ${
                scrolled ? "border-t border-black/10" : "border-t border-white/15"
              }`}
            >
              <div className="space-y-4 px-1 pb-5 pt-4 sm:px-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={
                      onHero
                        ? "block text-sm font-medium text-white transition-colors hover:text-white/90"
                        : "block text-sm font-medium text-black/80 transition-colors hover:text-black/90"
                    }
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="mailto:gulkhandajahan@gmail.com"
                  className={
                    onHero
                      ? "block rounded-full border border-white/80 bg-white/10 px-6 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/20"
                      : "block rounded-full bg-black px-6 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-neutral-900"
                  }
                  onClick={() => setOpen(false)}
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
