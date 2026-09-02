import { useRef } from "react";
import styles from "./Contact.module.css";
import { contact } from "../../data/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { GithubIcon, MailIcon, LinkedinIcon } from "../icons/Icons";

const CHANNEL_ICONS = {
  github: GithubIcon,
  mail: MailIcon,
  linkedin: LinkedinIcon,
};

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

        <span className={`${styles.eyebrow} mono`}>{contact.eyebrow}</span>

        <div className={styles.card}>
          <h3 className={styles.heading}>{contact.heading}</h3>
          <p className={styles.supporting}>{contact.supporting}</p>

          <div className={styles.channelList}>
            {contact.channels.map((channel) => {
              const Icon = CHANNEL_ICONS[channel.icon];
              return (
                <a
                  key={channel.label}
                  href={channel.href}
                  className={styles.channel}
                >
                  <span className={styles.channelIcon}>
                    <Icon width={18} height={18} />
                  </span>
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>{channel.label}</span>
                    <span className={styles.channelDescription}>
                      {channel.description}
                    </span>
                  </span>
                  <span className={styles.channelArrow} aria-hidden="true">
                    &#8599;
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
