"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Float } from "@react-three/drei";

function CADModel({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

export default function ModelViewer({ modelPath }: { modelPath: string }) {
  return (
    <div className="w-full h-[480px] md:h-[580px] relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950/70 backdrop-blur-md shadow-2xl">
      {/* HUD Técnico superior */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 font-mono text-[11px] text-neutral-400 tracking-wider bg-neutral-900/80 px-3 py-1.5 rounded-md border border-neutral-800">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>SYS.CAD // INTERACTIVE SUSPENSION VIEWER</span>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
            <Stage environment="city" intensity={0.7} adjustCamera>
              <CADModel path={modelPath} />
            </Stage>
          </Float>
        </Suspense>

        <OrbitControls enablePan={true} autoRotate autoRotateSpeed={0.6} />
      </Canvas>

      {/* Indicador inferior */}
      <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] text-neutral-500 bg-neutral-900/60 px-2.5 py-1 rounded border border-neutral-800/60">
        [CLICK + DRAG TO ROTATE | SCROLL TO ZOOM]
      </div>
    </div>
  );
}

// Precarga del modelo para acelerar la carga en la web
useGLTF.preload("/models/Car_Suspension_Assembly.glb");
