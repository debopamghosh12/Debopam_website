import { useRef } from "react";
import styles from "./Achievements.module.css";
import { achievements } from "../../data/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useStaggerReveal } from "../../hooks/useStaggerReveal";

export default function Achievements() {
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useScrollReveal(headerRef, reducedMotion);
  useStaggerReveal(listRef, `.${styles.item}`, reducedMotion, {
    y: 16,
    stagger: 0.08,
  });

  return (
    <section id="achievements" className="section">
      <div className="container">
        <div ref={headerRef} className="section-header">
          <span className="section-index mono">{achievements.index} —</span>
          <h2 className="section-title">{achievements.title}</h2>
        </div>
        <div ref={listRef} className={styles.list}>
          {achievements.items.map((item) => (
            <div key={item.label} className={styles.item}>
              <span className={styles.itemLabel}>{item.label}</span>
              <p className={styles.itemValue}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
