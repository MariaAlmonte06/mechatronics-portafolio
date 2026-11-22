"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Html } from "@react-three/drei";

interface ModelViewerProps {
  modelPath: string;
  label?: string;
}

// Carga y renderiza la escena 3D desde el archivo .glb
function CADModel({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

export default function ModelViewer({
  modelPath,
  label = "INTERACTIVE CAD VIEWER",
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Detecta si el visor está visible en pantalla para pausar/reanudar el renderizado
  const [isInView, setIsInView] = useState(false);
  // Activa el zoom solo cuando el usuario interactúa con el modelo (evita bloquear el scroll)
  const [isInteractive, setIsInteractive] = useState(false);

  // Pausa el motor 3D cuando el visor sale de pantalla para mantener 60 FPS al scrollear
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // Si el visor sale de pantalla, desactiva el modo zoom automáticamente
        if (!entry.isIntersecting) setIsInteractive(false);
      },
      { rootMargin: "150px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      // Al hacer clic en el visor se habilita el zoom; al sacar el mouse vuelve el scroll normal
      onPointerDown={() => setIsInteractive(true)}
      onPointerLeave={() => setIsInteractive(false)}
      className={`w-full h-[420px] md:h-[520px] relative rounded-2xl overflow-hidden border bg-neutral-950 shadow-2xl transition-colors duration-300 ${
        isInteractive ? "border-cyan-500/60" : "border-neutral-800"
      }`}
    >
      {/* HUD Técnico superior */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 font-mono text-[11px] text-neutral-300 tracking-wider bg-neutral-900/90 px-3 py-1.5 rounded-md border border-neutral-800 pointer-events-none">
        <span
          className={`w-2 h-2 rounded-full ${
            isInteractive ? "bg-cyan-400" : "bg-cyan-400/70 animate-pulse"
          }`}
        />
        <span>SYS.CAD // {label}</span>
      </div>

      {/* Canvas WebGL optimizado sin backdrop-blur ni sombras pesadas */}
      <Canvas
        frameloop={isInView ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ powerPreference: "high-performance", antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />

        {/* Indicador de carga mientras se descomprime el .glb */}
        <Suspense
          fallback={
            <Html center>
              <span className="font-mono text-xs text-cyan-400 tracking-widest animate-pulse whitespace-nowrap">
                LOADING 3D ASSEMBLY...
              </span>
            </Html>
          }
        >
          <Stage environment="city" intensity={0.7} adjustCamera shadows={false}>
            <CADModel path={modelPath} />
          </Stage>
        </Suspense>

        {/* Controles con zoom suave (damping) y rotación automática pausada al interactuar */}
        <OrbitControls
          enableZoom={isInteractive}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.08}
          zoomSpeed={0.8}
          autoRotate={isInView && !isInteractive}
          autoRotateSpeed={0.6}
        />
      </Canvas>

      {/* Indicador inferior dinámico según si el zoom está activo o en espera */}
      <div
        className={`absolute bottom-4 right-4 z-10 font-mono text-[10px] px-2.5 py-1 rounded border transition-colors pointer-events-none ${
          isInteractive
            ? "text-cyan-300 bg-cyan-950/80 border-cyan-500/40"
            : "text-neutral-400 bg-neutral-900/85 border-neutral-800"
        }`}
      >
        {isInteractive
          ? "[ZOOM ACTIVE | DRAG TO ROTATE | SCROLL TO ZOOM]"
          : "[CLICK MODEL TO ROTATE & UNLOCK ZOOM]"}
      </div>
    </div>
  );
}

// Precarga el primer modelo visible para acelerar la carga inicial
useGLTF.preload("/models/Car_Suspension_Assembly.glb");