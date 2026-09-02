import { useLayoutEffect, RefObject } from "react";
import { gsap } from "../lib/gsap";

export function useStaggerReveal(
  containerRef: RefObject<Element>,
  itemSelector: string,
  reducedMotion: boolean,
  options?: { y?: number; stagger?: number }
) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll(itemSelector);
    if (!items.length) return;

    if (reducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: options?.y ?? 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: options?.stagger ?? 0.12,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [containerRef, itemSelector, reducedMotion, options?.y, options?.stagger]);
}
