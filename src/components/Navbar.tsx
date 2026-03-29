import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Resume", href: "#resume" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.9]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-b border-white/20 shadow-sm" : ""
      }`}
    >
      <motion.div
        className="absolute inset-0 bg-background"
        style={{ opacity: bgOpacity }}
      />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        <motion.a
          href="#"
          className="font-heading font-bold text-xl text-white tracking-tight hover:text-white/90"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          Gulkhanda Jahan
        </motion.a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              className="text-sm font-medium text-white hover:text-white/90 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.a
            href="mailto:gulkhandajahan@gmail.com"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.65 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-white/80 text-white px-6 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors"
          >
            Contact
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
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
            className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/15 overflow-hidden relative z-10"
          >
            <div className="px-6 pb-6 pt-4 space-y-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="block text-sm font-medium text-white hover:text-white/90 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="mailto:gulkhandajahan@gmail.com"
                className="block border border-white/80 text-white bg-white/10 px-6 py-2.5 rounded-full text-sm font-medium text-center hover:bg-white/20 transition-colors"
                onClick={() => setOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
