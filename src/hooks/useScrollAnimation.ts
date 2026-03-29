import { useInView } from "framer-motion";
import { useRef } from "react";

export const useScrollAnimation = (options?: { once?: boolean; margin?: string; amount?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: (options?.margin ?? "-100px") as any,
    amount: options?.amount ?? 0.2,
  });
  return { ref, isInView };
};
