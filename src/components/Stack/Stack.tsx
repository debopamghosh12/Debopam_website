import { useRef } from "react";
import type { SimpleIcon } from "simple-icons";
import {
  siTypescript,
  siJavascript,
  siPython,
  siCplusplus,
  siNodedotjs,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siExpress,
  siFlask,
  siSpringboot,
  siDocker,
  siVercel,
  siPostgresql,
  siMongodb,
  siSupabase,
  siGit,
  siGithub,
  siFigma,
  siPostman,
} from "simple-icons";
import styles from "./Stack.module.css";
import { stackContent, stackIcons } from "../../data/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useStaggerReveal } from "../../hooks/useStaggerReveal";

// Icons whose official brand color is near-black — rendered in --text instead
// so they're visible against the site's dark background (matches how these
// brands themselves invert to white/light marks in dark UI contexts).
const NEAR_BLACK_HEX = new Set(["000000", "0a0a0a", "181717"]);

// simple-icons has thousands of icons, so only the ones actually used are
// imported here. `stackIcons` in content.ts references each by `iconKey`
// (e.g. "siReact") — adding a brand new icon (not already in this map)
// means adding its import above and a matching entry below, in addition to
// the content.ts entry. See WORKFLOW.md.
const ICON_MAP: Record<string, SimpleIcon> = {
  siTypescript,
  siJavascript,
  siPython,
  siCplusplus,
  siNodedotjs,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siExpress,
  siFlask,
  siSpringboot,
  siDocker,
  siVercel,
  siPostgresql,
  siMongodb,
  siSupabase,
  siGit,
  siGithub,
  siFigma,
  siPostman,
};

export default function Stack() {
  const reducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useScrollReveal(headerRef, reducedMotion);
  useStaggerReveal(gridRef, `.${styles.iconWrap}`, reducedMotion, {
    y: 12,
    stagger: 0.04,
  });

  return (
    <section id="stack" className="section">
      <div className="container">
        <div ref={headerRef} className="section-header">
          <span className="section-index mono">{stackContent.index} —</span>
          <h2 className="section-title">{stackContent.title}</h2>
        </div>
        <span className={`${styles.label} mono`}>{stackContent.label}</span>
        <div ref={gridRef} className={styles.grid}>
          {stackIcons.map(({ name, iconKey }) => {
            const icon = ICON_MAP[iconKey];
            return (
              <div
                key={iconKey}
                className={styles.iconWrap}
                tabIndex={0}
                role="img"
                aria-label={name}
              >
                <span className={`${styles.tooltip} mono`} aria-hidden="true">
                  {name}
                </span>
                <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
                  <path
                    d={icon.path}
                    fill={
                      NEAR_BLACK_HEX.has(icon.hex.toLowerCase())
                        ? "var(--text)"
                        : `#${icon.hex}`
                    }
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
