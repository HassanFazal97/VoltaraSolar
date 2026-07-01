"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const GOLD = "#f9ae0e";
const SPIN_SPEED = 0.6;

const EXTRUDE_SETTINGS: THREE.ExtrudeGeometryOptions = {
  depth: 40,
  bevelEnabled: true,
  bevelThickness: 4,
  bevelSize: 2,
  bevelOffset: 0,
  bevelSegments: 3,
  curveSegments: 12,
};

function VoltaraLogo3D() {
  const data = useLoader(SVGLoader, "/voltaralogosimple.svg");
  const prefersReducedMotion = useReducedMotion();
  const spinRef = useRef<THREE.Group>(null);

  const geometries = useMemo(() => {
    const result: { geometry: THREE.BufferGeometry; key: string }[] = [];
    data.paths.forEach((path, pathIndex) => {
      const shapes = SVGLoader.createShapes(path);
      shapes.forEach((shape, shapeIndex) => {
        const geometry = new THREE.ExtrudeGeometry(shape, EXTRUDE_SETTINGS);
        geometry.computeVertexNormals();
        result.push({ geometry, key: `${pathIndex}-${shapeIndex}` });
      });
    });
    return result;
  }, [data]);

  useFrame((_, delta) => {
    if (prefersReducedMotion || !spinRef.current) return;
    spinRef.current.rotation.y += delta * SPIN_SPEED;
  });

  return (
    <group ref={spinRef}>
      <Center>
        <group scale={[1, -1, 1]}>
          {geometries.map(({ geometry, key }) => (
            <mesh key={key} geometry={geometry} castShadow receiveShadow>
              <meshStandardMaterial
                color={GOLD}
                metalness={0.4}
                roughness={0.45}
                emissive={GOLD}
                emissiveIntensity={0.18}
              />
            </mesh>
          ))}
        </group>
      </Center>
    </group>
  );
}

export function VoltaraLogo3DCanvas({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 1700], fov: 28, near: 1, far: 4000 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[400, 600, 800]} intensity={1.1} />
        <directionalLight
          position={[-500, -200, 400]}
          intensity={0.4}
          color="#ffe9b0"
        />
        <pointLight
          position={[0, -420, 220]}
          intensity={2.8}
          distance={1400}
          decay={2}
          color={GOLD}
        />
        <Suspense fallback={null}>
          <VoltaraLogo3D />
        </Suspense>
      </Canvas>
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-6 h-1/4"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(249,174,14,0.32) 0%, rgba(249,174,14,0.14) 40%, transparent 78%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}
