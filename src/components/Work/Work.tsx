import { useRef } from "react";
import styles from "./Work.module.css";
import { workContent, projects } from "../../data/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useStaggerReveal } from "../../hooks/useStaggerReveal";
import { GithubIcon } from "../icons/Icons";

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
          <span className="section-index mono">{workContent.index} —</span>
          <h2 className="section-title">{workContent.title}</h2>
        </div>
        <div ref={pipelineRef} className={styles.pipeline}>
          <div className={styles.spine} aria-hidden="true" />
          {projects.map((project) => (
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
                {(project.githubUrl ||
                  project.demoUrl ||
                  project.marketplaceUrl) && (
                  <div className={styles.linkRow}>
                    {project.githubUrl && (
                      <a
                        className={`btn btn-ghost ${styles.linkBtn}`}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <GithubIcon width={13} height={13} />
                        View code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        className={`btn btn-ghost ${styles.linkBtn}`}
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live demo
                      </a>
                    )}
                    {project.marketplaceUrl && (
                      <a
                        className={`btn btn-ghost ${styles.linkBtn}`}
                        href={project.marketplaceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Marketplace
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
