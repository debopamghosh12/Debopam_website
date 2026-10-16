import * as THREE from "three";

export function readThemeColors() {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    new THREE.Color(styles.getPropertyValue(name).trim() || fallback);
  return {
    accentCool: read("--accent-cool", "#f0abfc"),
    accent: read("--accent", "#c4a1ff"),
    text: read("--text", "#ece9f5"),
  };
}
