import { useLayoutEffect, useRef } from "react";
import styles from "./Hero.module.css";
import HeroScene from "./HeroScene";
import { heroContent, contactLinks, type ContactLink } from "../../data/content";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useTheme } from "../../hooks/useTheme";
import { FileIcon, MailIcon, GithubIcon, LinkedinIcon } from "../icons/Icons";

const SOCIAL_ICONS = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  mail: MailIcon,
};

// The hero's compact icon row reuses contactLinks (the same data as the
// Contact section's channel list) for each URL, but keeps its own fixed
// order and short aria-labels suited to an icon-only button.
const HERO_ICON_ORDER: { icon: ContactLink["icon"]; label: string }[] = [
  { icon: "linkedin", label: "LinkedIn" },
  { icon: "github", label: "GitHub" },
  { icon: "mail", label: "Email" },
];

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
            <span>{heroContent.eyebrow}</span>
          </div>
          <h1 ref={headlineRef} className={styles.headline}>
            {heroContent.headlinePre}
            <span className={styles.accent}>{heroContent.headlineAccent}</span>
            {heroContent.headlinePost}
          </h1>
          <p ref={subheadRef} className={styles.subhead}>
            {heroContent.subhead}
          </p>
          <div ref={ctasRef} className={styles.ctas}>
            <a className="btn btn-primary" href={heroContent.ctaPrimary.href}>
              {heroContent.ctaPrimary.label}
            </a>
            <div className={styles.actionRow}>
              <a
                className={`btn btn-primary ${styles.actionPill}`}
                href={heroContent.resumeAction.href}
              >
                <FileIcon width={14} height={14} />
                {heroContent.resumeAction.label}
              </a>
              <a
                className={`btn btn-ghost ${styles.actionPill}`}
                href={heroContent.contactAction.href}
              >
                <MailIcon width={14} height={14} />
                {heroContent.contactAction.label}
              </a>
              <span className={styles.actionDivider} aria-hidden="true" />
              {HERO_ICON_ORDER.map(({ icon, label }) => {
                const link = contactLinks.find((l) => l.icon === icon);
                if (!link) return null;
                const Icon = SOCIAL_ICONS[icon];
                return (
                  <a
                    key={icon}
                    className={styles.iconButton}
                    href={link.url}
                    aria-label={label}
                  >
                    <Icon width={16} height={16} />
                  </a>
                );
              })}
            </div>
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
