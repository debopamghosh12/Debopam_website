import * as THREE from "three";

export function readThemeColors() {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    new THREE.Color(styles.getPropertyValue(name).trim() || fallback);
  return {
    accentCool: read("--accent-cool", "#3fd9c7"),
    accent: read("--accent", "#f2a93b"),
    text: read("--text", "#edeef0"),
  };
}
