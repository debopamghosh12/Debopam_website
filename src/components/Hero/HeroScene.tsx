import { useRef } from "react";
import { useHeroScene } from "./useHeroScene";
import styles from "./Hero.module.css";

export default function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHeroScene(canvasRef, reducedMotion);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
