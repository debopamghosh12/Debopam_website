import { useRef } from "react";
import styles from "./Contact.module.css";
import { contact } from "../../data/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function Contact() {
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(headerRef, reducedMotion);

  return (
    <section id="contact" className="section">
      <div className="container">
        <div ref={headerRef} className="section-header">
          <span className="section-index mono">{contact.index} —</span>
          <h2 className="section-title">{contact.title}</h2>
        </div>
        <div className={styles.wrap}>
          <h3 className={styles.headline}>{contact.headline}</h3>
          <p className={styles.supporting}>{contact.supporting}</p>
          <div className={styles.links}>
            {contact.links.map((link) => (
              <a key={link.label} className={styles.link} href={link.href}>
                {link.label}
                <span className={`${styles.arrow} mono`}>&#8599;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
