import { useLayoutEffect, useRef } from "react";
import styles from "./Hero.module.css";
import HeroScene from "./HeroScene";
import { hero } from "../../data/content";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useTheme } from "../../hooks/useTheme";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const targets = [
      eyebrowRef.current,
      headlineRef.current,
      subheadRef.current,
      ctasRef.current,
      scrollCueRef.current,
    ];

    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.35"
        )
        .fromTo(
          subheadRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ctasRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          scrollCueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="top" className={`${styles.hero}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.textCol}>
          <div ref={eyebrowRef} className={styles.eyebrow}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>{hero.eyebrow}</span>
          </div>
          <h1 ref={headlineRef} className={styles.headline}>
            {hero.headlinePre}
            <span className={styles.accent}>{hero.headlineAccent}</span>
            {hero.headlinePost}
          </h1>
          <p ref={subheadRef} className={styles.subhead}>
            {hero.subhead}
          </p>
          <div ref={ctasRef} className={styles.ctas}>
            <a className="btn btn-primary" href={hero.ctaPrimary.href}>
              {hero.ctaPrimary.label}
            </a>
            <a className="btn btn-ghost" href={hero.ctaGhost.href}>
              {hero.ctaGhost.label}
            </a>
          </div>
          <div ref={scrollCueRef} className={styles.scrollCue}>
            <span className={styles.scrollLine} aria-hidden="true" />
            <span>Scroll</span>
          </div>
        </div>
        <div className={styles.sphereCol}>
          <HeroScene reducedMotion={reducedMotion} theme={theme} />
        </div>
      </div>
    </section>
  );
}
