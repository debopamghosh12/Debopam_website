import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "../../lib/gsap";

const ACCENT_COOL = 0x3fd9c7;
const ACCENT = 0xf2a93b;
const LINE_STRONG = 0xedeef0;

const HOVER_RADIUS_MULTIPLIER = 1.15;
const POWER_UP_DURATION = 0.35;
const POWER_DOWN_DURATION = 0.55;

type TowerSpec = {
  x: number;
  z: number;
  height: number;
  colorHex: number;
};

// Loose cluster on the platform: a couple of taller amber "core" towers
// scattered among shorter teal ones, not clustered together.
const towerSpecs: TowerSpec[] = [
  { x: -1.4, z: -1.0, height: 0.7, colorHex: ACCENT_COOL },
  { x: -0.6, z: -1.3, height: 1.1, colorHex: ACCENT_COOL },
  { x: 0.3, z: -0.7, height: 1.7, colorHex: ACCENT },
  { x: 1.3, z: -1.1, height: 0.9, colorHex: ACCENT_COOL },
  { x: -1.0, z: 0.9, height: 1.3, colorHex: ACCENT_COOL },
  { x: 0.5, z: 1.1, height: 1.9, colorHex: ACCENT },
  { x: 1.4, z: 0.6, height: 0.8, colorHex: ACCENT_COOL },
];

const TRACE_PAIRS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [4, 5],
  [5, 6],
  [2, 5],
];

const MARKER_TOWER_INDICES = [2, 5];

function buildGrid(disposables: (() => void)[]) {
  const half = 2.3;
  const step = 0.5;
  const points: THREE.Vector3[] = [];
  for (let v = -half; v <= half + 1e-6; v += step) {
    points.push(new THREE.Vector3(-half, 0, v), new THREE.Vector3(half, 0, v));
    points.push(new THREE.Vector3(v, 0, -half), new THREE.Vector3(v, 0, half));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: LINE_STRONG,
    transparent: true,
    opacity: 0.1,
  });
  disposables.push(() => geometry.dispose(), () => material.dispose());
  return new THREE.LineSegments(geometry, material);
}

function buildTower(spec: TowerSpec, disposables: (() => void)[]) {
  const width = 0.4;
  const depth = 0.4;
  const { height, colorHex } = spec;

  const parent = new THREE.Group();
  parent.position.set(spec.x, 0, spec.z);

  const boxGeo = new THREE.BoxGeometry(width, height, depth);
  const fillMat = new THREE.MeshBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.09,
    depthWrite: false,
  });
  const boxMesh = new THREE.Mesh(boxGeo, fillMat);
  boxMesh.position.y = height / 2;
  parent.add(boxMesh);

  const edgesGeo = new THREE.EdgesGeometry(boxGeo);
  const edgesMat = new THREE.LineBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.55,
  });
  const edgesMesh = new THREE.LineSegments(edgesGeo, edgesMat);
  edgesMesh.position.y = height / 2;
  parent.add(edgesMesh);

  const hw = width / 2;
  const hd = depth / 2;
  const glowGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-hw, height, -hd),
    new THREE.Vector3(hw, height, -hd),
    new THREE.Vector3(hw, height, hd),
    new THREE.Vector3(-hw, height, hd),
  ]);
  const glowMat = new THREE.LineBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.85,
  });
  const glowMesh = new THREE.LineLoop(glowGeo, glowMat);
  parent.add(glowMesh);

  disposables.push(
    () => boxGeo.dispose(),
    () => fillMat.dispose(),
    () => edgesGeo.dispose(),
    () => edgesMat.dispose(),
    () => glowGeo.dispose(),
    () => glowMat.dispose()
  );

  return {
    parent,
    height,
    fillMat,
    edgesMat,
    glowMat,
    baseFillOpacity: 0.09,
    boostFillOpacity: 0.22,
    baseEdgesOpacity: 0.55,
    boostEdgesOpacity: 0.9,
    baseGlowOpacity: 0.85,
    boostGlowOpacity: 1,
    boostScaleY: 1.1,
  };
}

function buildMarker(
  tower: ReturnType<typeof buildTower>,
  disposables: (() => void)[]
) {
  const topY = tower.height + 0.6;
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, tower.height, 0),
    new THREE.Vector3(0, topY, 0),
  ]);
  const lineMat = new THREE.LineBasicMaterial({
    color: ACCENT_COOL,
    transparent: true,
    opacity: 0.3,
  });
  const line = new THREE.Line(lineGeo, lineMat);
  tower.parent.add(line);

  const sphereGeo = new THREE.SphereGeometry(0.045, 8, 8);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: ACCENT_COOL,
    transparent: true,
    opacity: 0.8,
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sphere.position.y = topY;
  tower.parent.add(sphere);

  disposables.push(
    () => lineGeo.dispose(),
    () => lineMat.dispose(),
    () => sphereGeo.dispose(),
    () => sphereMat.dispose()
  );
}

function buildTrace(a: TowerSpec, b: TowerSpec, disposables: (() => void)[]) {
  const points = [
    new THREE.Vector3(a.x, 0.01, a.z),
    new THREE.Vector3(b.x, 0.01, a.z),
    new THREE.Vector3(b.x, 0.01, b.z),
  ];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: ACCENT_COOL,
    transparent: true,
    opacity: 0.35,
  });
  disposables.push(() => geometry.dispose(), () => material.dispose());
  const line = new THREE.Line(geometry, material);

  const segmentLengths: number[] = [];
  let totalLength = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const d = points[i].distanceTo(points[i + 1]);
    segmentLengths.push(d);
    totalLength += d;
  }

  return { points, segmentLengths, totalLength, line };
}

function pointAlongPath(
  points: THREE.Vector3[],
  segmentLengths: number[],
  totalLength: number,
  t: number,
  target: THREE.Vector3
) {
  let dist = Math.max(0, Math.min(1, t)) * totalLength;
  for (let i = 0; i < segmentLengths.length; i++) {
    const segLen = segmentLengths[i];
    if (dist <= segLen || i === segmentLengths.length - 1) {
      const segT = segLen > 0 ? dist / segLen : 0;
      target.lerpVectors(points[i], points[i + 1], Math.min(segT, 1));
      return;
    }
    dist -= segLen;
  }
}

function createPulse(colorHex: number, disposables: (() => void)[]) {
  const geometry = new THREE.SphereGeometry(0.045, 8, 8);
  const material = new THREE.MeshBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.95,
  });
  disposables.push(() => geometry.dispose(), () => material.dispose());
  return new THREE.Mesh(geometry, material);
}

export function useHeroScene(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  reducedMotion: boolean
) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const disposables: (() => void)[] = [];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      34,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    const basePosition = new THREE.Vector3(3.6, 4.8, 6.0);
    camera.position.copy(basePosition);
    const lookAtTarget = new THREE.Vector3(0, 0.9, 0);
    camera.lookAt(lookAtTarget);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    group.add(buildGrid(disposables));

    const towers = towerSpecs.map((spec) => buildTower(spec, disposables));
    towers.forEach((t) => group.add(t.parent));
    MARKER_TOWER_INDICES.forEach((i) => buildMarker(towers[i], disposables));

    const traces = TRACE_PAIRS.map(([a, b], i) => {
      const trace = buildTrace(towerSpecs[a], towerSpecs[b], disposables);
      group.add(trace.line);
      const pulse = createPulse(i % 2 === 0 ? ACCENT : ACCENT_COOL, disposables);
      group.add(pulse);
      return { ...trace, pulse, speed: 0.25 + Math.random() * 0.2, phase: Math.random() };
    });

    const maxDist =
      Math.max(...towerSpecs.map((s) => Math.hypot(s.x, s.z))) + 0.4;

    const applyPower = (progress: number) => {
      for (const t of towers) {
        t.parent.scale.y = 1 + (t.boostScaleY - 1) * progress;
        t.fillMat.opacity =
          t.baseFillOpacity + (t.boostFillOpacity - t.baseFillOpacity) * progress;
        t.edgesMat.opacity =
          t.baseEdgesOpacity + (t.boostEdgesOpacity - t.baseEdgesOpacity) * progress;
        t.glowMat.opacity =
          t.baseGlowOpacity + (t.boostGlowOpacity - t.baseGlowOpacity) * progress;
      }
    };

    const powerState = { progress: 0 };
    let powerTween: gsap.core.Tween | null = null;

    let isHovered = false;
    const pointerCanvas = { x: -9999, y: -9999 };
    const resetPointer = () => {
      pointerCanvas.x = -9999;
      pointerCanvas.y = -9999;
    };

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      const rect = canvas.getBoundingClientRect();
      pointerCanvas.x = e.clientX - rect.left;
      pointerCanvas.y = e.clientY - rect.top;
    };
    window.addEventListener("pointermove", handlePointerMove);
    document.documentElement.addEventListener("mouseleave", resetPointer);
    window.addEventListener("blur", resetPointer);

    let frameId = 0;
    const clock = new THREE.Clock();
    const centerWorld = new THREE.Vector3();
    const edgeWorld = new THREE.Vector3();
    const projected = new THREE.Vector3();
    const currentOffset = { x: 0, y: 0 };

    const updateHover = () => {
      group.getWorldPosition(centerWorld);
      edgeWorld.copy(centerWorld).add(new THREE.Vector3(maxDist, 0, 0));

      projected.copy(centerWorld).project(camera);
      const centerPxX = (projected.x * 0.5 + 0.5) * width;
      const centerPxY = (1 - (projected.y * 0.5 + 0.5)) * height;

      projected.copy(edgeWorld).project(camera);
      const edgePxX = (projected.x * 0.5 + 0.5) * width;
      const edgePxY = (1 - (projected.y * 0.5 + 0.5)) * height;

      const screenRadius = Math.hypot(edgePxX - centerPxX, edgePxY - centerPxY);
      const dist = Math.hypot(
        pointerCanvas.x - centerPxX,
        pointerCanvas.y - centerPxY
      );
      const hovering = dist < screenRadius * HOVER_RADIUS_MULTIPLIER;

      if (hovering !== isHovered) {
        isHovered = hovering;
        powerTween?.kill();
        powerTween = gsap.to(powerState, {
          progress: hovering ? 1 : 0,
          duration: reducedMotion
            ? 0
            : hovering
            ? POWER_UP_DURATION
            : POWER_DOWN_DURATION,
          ease: "power2.out",
        });
      }
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        group.rotation.y = elapsed * 0.05;

        const targetX = mouseRef.current.x * 0.3;
        const targetY = -mouseRef.current.y * 0.2;
        currentOffset.x += (targetX - currentOffset.x) * 0.04;
        currentOffset.y += (targetY - currentOffset.y) * 0.04;
      }
      camera.position.set(
        basePosition.x + currentOffset.x,
        basePosition.y + currentOffset.y,
        basePosition.z
      );
      camera.lookAt(lookAtTarget);

      updateHover();
      applyPower(powerState.progress);

      for (const tr of traces) {
        const t = reducedMotion ? 0.5 : (elapsed * tr.speed + tr.phase) % 1;
        pointAlongPath(tr.points, tr.segmentLengths, tr.totalLength, t, tr.pulse.position);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      powerTween?.kill();
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", resetPointer);
      window.removeEventListener("blur", resetPointer);
      disposables.forEach((dispose) => dispose());
      renderer.dispose();
    };
  }, [canvasRef, reducedMotion]);
}
