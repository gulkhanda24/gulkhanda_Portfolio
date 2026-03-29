import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SplitTextProps {
  /** The string to animate word-by-word */
  text: string;
  className?: string;
  /** Base delay before the first word starts (seconds) */
  delay?: number;
  /** Gap between each word's animation (seconds) */
  stagger?: number;
  /** Trigger only on first entry */
  once?: boolean;
  /** IntersectionObserver root margin */
  margin?: string;
  /** Element tag to render as */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Splits `text` into words and reveals each one by sliding it up
 * from behind a clipping mask as the element scrolls into view.
 *
 * Mirrors the .framer-wqhvd5 animation:
 *   opacity 0→1  +  translateY(20px→0)  with per-word stagger.
 */
const SplitText = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.07,
  once = true,
  margin = "-40px",
  as: Tag = "span",
}: SplitTextProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, {
    once,
    margin: margin as `${number}px`,
  });

  const words = text.split(" ");

  return (
    // @ts-expect-error polymorphic tag
    <Tag
      ref={containerRef}
      className={`inline ${className}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          /* Each wrapper clips the sliding word */
          className="inline-block overflow-hidden leading-[1.1]"
          style={{ marginRight: "0.25em", verticalAlign: "bottom" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "105%", opacity: 0 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1 }
                : { y: "105%", opacity: 0 }
            }
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
