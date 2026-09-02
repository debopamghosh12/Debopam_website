import { useRef } from "react";
import { useHeroScene } from "./useHeroScene";
import type { Theme } from "../../hooks/useTheme";
import styles from "./Hero.module.css";

export default function HeroScene({
  reducedMotion,
  theme,
}: {
  reducedMotion: boolean;
  theme: Theme;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHeroScene(canvasRef, reducedMotion, theme);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
