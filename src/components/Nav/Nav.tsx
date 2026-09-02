import styles from "./Nav.module.css";
import { nav } from "../../data/content";
import { useTheme } from "../../hooks/useTheme";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.wordmark}>
          debopam<span>.dev</span>
        </a>
        <nav>
          <ul className={styles.links}>
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <button
                type="button"
                className={styles.themeToggle}
                onClick={(e) => toggleTheme(e.clientX, e.clientY)}
                aria-label={
                  theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                <span className={styles.iconStack} aria-hidden="true">
                  <svg
                    className={`${styles.icon} ${styles.sun}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <line x1="12" y1="2" x2="12" y2="4" />
                    <line x1="12" y1="20" x2="12" y2="22" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="2" y1="12" x2="4" y2="12" />
                    <line x1="20" y1="12" x2="22" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <svg
                    className={`${styles.icon} ${styles.moon}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                  </svg>
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
