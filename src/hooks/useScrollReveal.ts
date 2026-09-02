import { useLayoutEffect, RefObject } from "react";
import { gsap } from "../lib/gsap";

export function useScrollReveal(
  ref: RefObject<Element>,
  reducedMotion: boolean,
  options?: { y?: number; duration?: number }
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: options?.y ?? 24 },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, reducedMotion, options?.y, options?.duration]);
}
