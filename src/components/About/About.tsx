import { useRef } from "react";
import styles from "./About.module.css";
import { about } from "../../data/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

function dotTiming(i: number) {
  return {
    duration: `${(3.6 + (i % 3) * 0.6).toFixed(1)}s`,
    delay: `${(i * 0.45).toFixed(2)}s`,
  };
}

export default function About() {
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(headerRef, reducedMotion);

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={styles.bgLayer} aria-hidden="true">
        <div className={styles.bgGrid} />
        <div className={styles.bgScan} />
      </div>
      <div className={`container ${styles.contentLayer}`}>
        <div ref={headerRef} className="section-header">
          <span className="section-index mono">{about.index} —</span>
          <h2 className="section-title">{about.title}</h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.paragraphs}>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className={styles.facts}>
            {about.facts.map((fact, i) => {
              const timing = dotTiming(i);
              return (
                <li key={fact.label} className={styles.fact}>
                  <span
                    className={`${styles.dividerDot} ${
                      i % 2 === 0 ? styles.dividerDotTeal : styles.dividerDotAmber
                    }`}
                    style={{
                      animationDuration: timing.duration,
                      animationDelay: timing.delay,
                    }}
                    aria-hidden="true"
                  />
                  <span className={styles.factLabel}>{fact.label}</span>
                  <span className={styles.factValue}>{fact.value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
