import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';

const SIZE = 12;
const SEGMENTS = 64;
const PROJECTED_WIDTH = SIZE * 0.125;

function heightAt(x: number, z: number) {
  return (
    Math.sin(x * 0.62) * 0.42 +
    Math.sin(z * 0.78 + x * 0.24) * 0.26 +
    Math.cos(x * 0.3 - z * 0.45) * 0.34 +
    Math.sin(x * 1.7 + z * 2.1) * 0.08
  );
}

const FINE_POINTER =
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

function Terrain({
  progressRef,
  step,
}: {
  progressRef: MutableRefObject<number>;
  step: number;
}) {
  const terrain = useRef<THREE.Mesh>(null);
  const stipple = useRef<THREE.Points>(null);
  const projected = useRef<THREE.Points>(null);
  const route = useRef<THREE.Mesh>(null);
  const wireMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const pointMaterial = useRef<THREE.PointsMaterial>(null);
  const projectedMaterial = useRef<THREE.PointsMaterial>(null);

  const stepRef = useRef(step);
  stepRef.current = step;

  const lift = useRef(0.3);
  const wire = useRef(0.18);
  const projectedAlpha = useRef(0);
  const drawn = useRef(0);

  const { geometry, projectedGeometry, routeGeometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS);
    geo.rotateX(-Math.PI / 2);

    const position = geo.attributes.position as THREE.BufferAttribute;
    const total = position.count;
    const heights = new Float32Array(total);
    let min = Infinity;
    let max = -Infinity;

    for (let i = 0; i < total; i += 1) {
      const x = position.getX(i);
      const z = position.getZ(i);
      const y = heightAt(x, z);
      heights[i] = y;
      position.setY(i, y);
      if (y < min) min = y;
      if (y > max) max = y;
    }
    position.needsUpdate = true;
    geo.computeVertexNormals();

    const colors = new Float32Array(total * 3);
    const low = new THREE.Color('#6C8CFF');
    const high = new THREE.Color('#FF8A6B');
    const mixed = new THREE.Color();
    const span = Math.max(0.0001, max - min);

    for (let i = 0; i < total; i += 1) {
      const t = (heights[i] - min) / span;
      mixed.copy(low).lerp(high, t);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const projectedGeo = new THREE.PlaneGeometry(PROJECTED_WIDTH, SIZE, 6, SEGMENTS);
    projectedGeo.rotateX(-Math.PI / 2);
    projectedGeo.translate(SIZE / 2 - PROJECTED_WIDTH / 2, 0, 0);
    const projectedPosition = projectedGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < projectedPosition.count; i += 1) {
      const x = projectedPosition.getX(i);
      const z = projectedPosition.getZ(i);
      projectedPosition.setY(i, heightAt(x, z) + 0.01);
    }
    projectedPosition.needsUpdate = true;
    projectedGeo.computeVertexNormals();

    const ridge: THREE.Vector3[] = [];
    for (let i = 0; i <= 160; i += 1) {
      const x = -SIZE / 2 + (SIZE * i) / 160;
      const z = 0.45;
      ridge.push(new THREE.Vector3(x, heightAt(x, z) + 0.12, z));
    }
    const curve = new THREE.CatmullRomCurve3(ridge);
    const tube = new THREE.TubeGeometry(curve, 200, 0.022, 6, false);

    return { geometry: geo, projectedGeometry: projectedGeo, routeGeometry: tube };
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      projectedGeometry.dispose();
      routeGeometry.dispose();
    },
    [geometry, projectedGeometry, routeGeometry],
  );

  useFrame((state) => {
    const currentStep = stepRef.current;

    const targetLift = currentStep >= 1 ? 1 : 0.3;
    const targetWire = currentStep >= 1 ? 0.55 : 0.18;
    const targetProjected = currentStep >= 2 ? 0.28 : 0;

    lift.current += (targetLift - lift.current) * 0.07;
    wire.current += (targetWire - wire.current) * 0.07;
    projectedAlpha.current += (targetProjected - projectedAlpha.current) * 0.07;

    if (terrain.current) terrain.current.scale.y = lift.current;
    if (projected.current) projected.current.scale.y = lift.current;
    if (wireMaterial.current) wireMaterial.current.opacity = wire.current;
    if (projectedMaterial.current) projectedMaterial.current.opacity = projectedAlpha.current;
    if (pointMaterial.current) {
      pointMaterial.current.opacity = 0.45 + 0.4 * Math.min(1, lift.current);
    }

    const targetDraw =
      currentStep >= 2 ? Math.min(1, Math.max(0, (progressRef.current - 0.62) / 0.3)) : 0;
    drawn.current += (targetDraw - drawn.current) * 0.09;
    if (routeGeometry.index) {
      routeGeometry.setDrawRange(
        0,
        Math.max(0, Math.floor(routeGeometry.index.count * drawn.current)),
      );
    }
    if (route.current) route.current.visible = drawn.current > 0.002;

    const p = progressRef.current;
    const azimuth =
      THREE.MathUtils.lerp(-0.3, 0.3, p) + (FINE_POINTER ? state.pointer.x * 0.12 : 0);
    const distance = THREE.MathUtils.lerp(9, 7.2, p);
    const targetX = Math.sin(azimuth) * distance;
    const targetZ = Math.cos(azimuth) * distance;
    const targetY = 4.4 + (FINE_POINTER ? state.pointer.y * 0.45 : 0);

    const camera = state.camera;
    camera.position.x += (targetX - camera.position.x) * 0.08;
    camera.position.y += (targetY - camera.position.y) * 0.08;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.lookAt(0, 0.1, 0);
  });

  return (
    <>
      <fog attach="fog" args={['#070918', 9, 20]} />

      <mesh ref={terrain} geometry={geometry}>
        <meshBasicMaterial
          ref={wireMaterial}
          color="#6C8CFF"
          wireframe
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>

      <points ref={stipple} geometry={geometry}>
        <pointsMaterial
          ref={pointMaterial}
          size={0.038}
          vertexColors
          transparent
          opacity={0.45}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <points ref={projected} geometry={projectedGeometry}>
        <pointsMaterial
          ref={projectedMaterial}
          color="#B7C6FF"
          size={0.055}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <mesh ref={route} geometry={routeGeometry}>
        <meshBasicMaterial color="#FFD7A8" transparent opacity={0.9} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function StarTerrain({
  progressRef,
  step,
  active,
  onReady,
  onFail,
}: {
  progressRef: MutableRefObject<number>;
  step: number;
  active: boolean;
  onReady?: () => void;
  onFail?: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 4.4, 9], fov: 45, near: 0.1, far: 60 }}
      frameloop={active ? 'always' : 'never'}
      onCreated={({ gl }) => {
        // A lost GPU context (driver reset, memory pressure on mobile) leaves
        // the canvas permanently blank; hand the slot back to the fallback.
        gl.domElement.addEventListener('webglcontextlost', () => onFail?.(), { once: true });
        onReady?.();
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Terrain progressRef={progressRef} step={step} />
    </Canvas>
  );
}
