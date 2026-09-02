import styles from "./Nav.module.css";
import { nav } from "../../data/content";

export default function Nav() {
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
