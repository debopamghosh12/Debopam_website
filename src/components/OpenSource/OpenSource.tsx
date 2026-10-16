import { useRef } from "react";
import styles from "./OpenSource.module.css";
import { openSourceContent, openSource } from "../../data/content";
import { GithubIcon } from "../icons/Icons";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useStaggerReveal } from "../../hooks/useStaggerReveal";

export default function OpenSource() {
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useScrollReveal(headerRef, reducedMotion);
  useStaggerReveal(listRef, `.${styles.item}`, reducedMotion, {
    y: 16,
    stagger: 0.08,
  });

  return (
    <section id="open-source" className="section">
      <div className="container">
        <div ref={headerRef} className="section-header">
          <span className="section-index mono">{openSourceContent.index} —</span>
          <h2 className="section-title">{openSourceContent.title}</h2>
        </div>
        <div ref={listRef} className={styles.list}>
          {openSource.map((item) => (
            <div key={item.project} className={styles.item}>
              <span className={styles.itemLabel}>{item.project}</span>
              <div>
                <p className={styles.itemValue}>{item.description}</p>
                <a
                  className={`btn btn-ghost ${styles.linkBtn}`}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon width={13} height={13} />
                  Repository
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
