import styles from "./Footer.module.css";
import { footer } from "../../data/content";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={`${styles.text} mono`}>{footer.text}</p>
    </footer>
  );
}
