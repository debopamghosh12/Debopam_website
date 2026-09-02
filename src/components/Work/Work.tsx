import { useRef } from "react";
import styles from "./Work.module.css";
import { work } from "../../data/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useStaggerReveal } from "../../hooks/useStaggerReveal";

export default function Work() {
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  useScrollReveal(headerRef, reducedMotion);
  useStaggerReveal(pipelineRef, `.${styles.module}`, reducedMotion, {
    y: 30,
    stagger: 0.18,
  });

  return (
    <section id="work" className="section">
      <div className="container">
        <div ref={headerRef} className="section-header">
          <span className="section-index mono">{work.index} —</span>
          <h2 className="section-title">{work.title}</h2>
        </div>
        <div ref={pipelineRef} className={styles.pipeline}>
          <div className={styles.spine} aria-hidden="true" />
          {work.projects.map((project) => (
            <article key={project.name} className={styles.module}>
              <div className={styles.marker}>
                <span
                  className={`${styles.dot} ${
                    project.flagship ? styles.dotFilled : ""
                  }`}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.body}>
                <div className={styles.headRow}>
                  <h3 className={styles.name}>{project.name}</h3>
                  <span className={`${styles.tag} mono`}>{project.tag}</span>
                </div>
                <p className={styles.description}>{project.description}</p>
                {project.metric && (
                  <p className={styles.metric}>{project.metric}</p>
                )}
                <div className={styles.techTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={`${styles.techTag} mono`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
