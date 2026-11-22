"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Activity,
  Download,
  Layers,
  Compass,
  Wind,
  Clock,
  ArrowDown,
  ChevronRight,
} from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";

// Importación dinámica sin SSR porque Three.js necesita acceso al navegador (WebGL)
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

// Curva de desaceleración larga y suave para que el texto suba sin prisa
const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Texto completo de la introducción para el efecto de escritura
const INTRO_TEXT =
  " I'm a Sophomore Mechatronics Engineering student focused on 3D CAD assemblies, FEA validation, and hands-on robotics prototypes. This portfolio documents the mechanical systems I build and test as I grow in motorsport and hardware engineering.";

// Subcomponente aislado para escribir el texto letra por letra sin provocar re-renders en los visores 3D
function TypewriterText({
  text,
  speed = 48, // Ritmo más pausado (ms por letra)
  startDelay = 700, // Espera a que terminen de subir el nombre y subtítulo
}: {
  text: string;
  speed?: number;
  startDelay?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          setIsDone(true);
          if (intervalId) clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return (
    <span className="relative block">
      {/* Reserva la altura exacta del párrafo para evitar saltos en los botones */}
      <span
        className="opacity-0 select-none pointer-events-none"
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Capa visible con el texto escribiéndose */}
      <span className="absolute inset-0">
        {displayed}
        <span
          className={`inline-block w-[2px] h-[1.05em] bg-cyan-400 ml-1 align-middle ${
            isDone ? "animate-pulse" : ""
          }`}
        />
      </span>
    </span>
  );
}

export default function Home() {
  // Barra de credenciales técnicas
  const specs = [
    { label: "CERTIFICATIONS", value: "SolidWorks CSWA/CSWP/CSWA/S/CSWA-AM/CSWA-Sustainability" },
    { label: "SPECIALTY", value: "3D CAD & FEA Simulation" },
    { label: "FOCUS", value: "Motorsport & Mechatronics" },
  ];

  // Lista secuencial de proyectos: primero tarjeta, debajo su visor 3D (si tiene .glb)
  const projects = [
    {
      title: "Formula Student Suspension System",
      tag: "Automotive Kinematics / FEA",
      status: "COMPLETED",
      modelPath: "/models/Car_Suspension_Assembly.glb",
      viewerLabel: "DOUBLE WISHBONE SUSPENSION",
      desc: "Kinematic design of a double wishbone suspension, uprights, and mounting geometry, featuring wheel motion analysis, finite element stress analysis (FEA), and standardized technical drawings.",
      tools: [
        "SolidWorks",
        "FEA Analysis",
        "Motion Analysis",
        "BOM Drafting",
        "GD&T",
      ],
      icon: Compass,
    },
    {
      title: "Ferrari SF-26 Interactive Steering Wheel",
      tag: "Motorsport Packaging / CAD",
      status: "COMPLETED",
      modelPath: "/models/SF-26_Steering_Wheel.glb",
      viewerLabel: "SF-26 F1 STEERING WHEEL",
      desc: "Advanced surface modeling and mechanical assembly of an F1 steering wheel. Features ergonomic grips, rotary switch layout, rear shift paddles, integrated display packaging, and carbon fiber texturing.",
      tools: [
        "SolidWorks",
        "Surface Modeling",
        "Blender",
        "Motorsport Ergonomics",
      ],
      icon: Layers,
    },
    {
      title: "Formula 1 Rear Wing",
      tag: "Aerodynamics & Structures",
      status: "IN DEVELOPMENT",
      modelPath: null, // Sin visor 3D todavía
      viewerLabel: "",
      desc: "Aerodynamic and structural design of a multi-element rear wing featuring optimized endplates, main plane, DRS flap, and preliminary aerodynamic load analysis.",
      tools: [
        "SolidWorks",
        "Aerodynamic Surfaces",
        "CFD Prep",
        "Carbon Composite",
      ],
      icon: Wind,
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-cyan-500 selection:text-black relative overflow-x-clip">
      {/* Retícula técnica milimétrica de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293718_1px,transparent_1px),linear-gradient(to_bottom,#1f293718_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      {/* Resplandor ambiental estático en la parte superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* ================= HERO / PRESENTACIÓN ================= */}
        <header className="min-h-[88vh] flex flex-col justify-center py-20">
          {/* Etiqueta superior con entrada pausada */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: SMOOTH_EASE }}
            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-[11px] tracking-wider mb-8"
          >
            <Activity size={14} className="animate-pulse" />
            <span>MECHATRONICS ENGINEERING // MECHANICAL DESIGN</span>
          </motion.div>

          {/* Nombre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.15, ease: SMOOTH_EASE }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4"
          >
            María Almonte<span className="text-cyan-400">.</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: SMOOTH_EASE }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-neutral-400 mb-7 max-w-3xl"
          >
            Mechanical design & simulation.{" "}
            <span className="text-neutral-200">
              From 3D CAD to functional systems.
            </span>
          </motion.h2>

          {/* Introducción con efecto de escritura pausado */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-neutral-400 max-w-2xl text-base md:text-lg leading-relaxed mb-10"
          >
            <TypewriterText text={INTRO_TEXT} speed={48} startDelay={700} />
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.55, ease: SMOOTH_EASE }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 bg-cyan-400 text-neutral-950 font-semibold px-6 py-3 rounded-lg hover:bg-cyan-300 transition text-sm shadow-lg shadow-cyan-500/15"
            >
              Explore 3D Assemblies
              <ChevronRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </a>

            <a
              href="/cv.pdf"
              download="Maria_Almonte_CV.pdf"
              className="flex items-center gap-2 border border-neutral-800 bg-neutral-900/70 px-6 py-3 rounded-lg hover:bg-neutral-800 hover:border-neutral-700 transition text-sm text-neutral-200 font-medium cursor-pointer"
            >
              <Download size={15} /> Download Technical CV
            </a>
          </motion.div>

          {/* Barra de credenciales / telemetría */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.75, ease: SMOOTH_EASE }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-neutral-800/80"
          >
            {specs.map((item, i) => (
              <div key={i}>
                <p className="font-mono text-[10px] tracking-widest text-neutral-500 mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-medium text-neutral-200">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Indicador para hacer scroll */}
          <motion.a
            href="#projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="mt-14 inline-flex items-center gap-2 self-start font-mono text-[11px] text-neutral-500 hover:text-cyan-400 transition-colors"
          >
            <ArrowDown size={14} className="animate-bounce" />
            <span>SCROLL TO EXPLORE CAD SHOWCASE</span>
          </motion.a>
        </header>

        {/* ================= ENGINEERING SHOWCASE ================= */}
        <section id="projects" className="pb-28 pt-6 scroll-mt-8">
          {/* Encabezado de sección: sube lento y marcado al bajar */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease: SMOOTH_EASE }}
            className="flex items-center justify-between border-b border-neutral-800/80 pb-4 mb-14"
          >
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                ENGINEERING SHOWCASE
              </h2>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                INTERACTIVE 3D CAD ASSEMBLIES & TECHNICAL PROTOTYPES
              </p>
            </div>
            <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-2.5 py-1 rounded">
              03 PROJECTS
            </span>
          </motion.div>

          {/* Flujo vertical progresivo: Tarjeta -> Visor 3D */}
          <div className="space-y-24">
            {projects.map((proj, idx) => {
              const Icon = proj.icon;
              const isInDev = proj.status === "IN DEVELOPMENT";

              return (
                <article key={idx} className="space-y-6">
                  {/* Bloque 1: Tarjeta técnica con subida más lenta y notoria al scrollear */}
                  <motion.div
                    initial={{ opacity: 0, y: 65 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 1.1, ease: SMOOTH_EASE }}
                    className="p-6 md:p-8 rounded-2xl border border-neutral-800/80 bg-neutral-900/45 hover:border-neutral-700 hover:bg-neutral-900/70 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] uppercase text-cyan-400 tracking-wider">
                          {proj.tag}
                        </span>

                        {isInDev && (
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            <Clock size={11} />
                            IN DEVELOPMENT
                          </span>
                        )}
                      </div>

                      <Icon size={20} className="text-neutral-500" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-neutral-100 mb-3">
                      {proj.title}
                    </h3>

                    <p className="text-sm md:text-base text-neutral-400 leading-relaxed mb-6 max-w-3xl">
                      {proj.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-5 border-t border-neutral-800/60">
                      {proj.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="font-mono text-[11px] px-2.5 py-1 rounded bg-neutral-800/80 text-neutral-300 border border-neutral-700/40"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Bloque 2: Visor 3D debajo de la tarjeta */}
                  {proj.modelPath && (
                    <motion.div
                      initial={{ opacity: 0, y: 65 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1.1, ease: SMOOTH_EASE }}
                    >
                      <ModelViewer
                        modelPath={proj.modelPath}
                        label={proj.viewerLabel}
                      />
                    </motion.div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>

      {/* Reproductor de audio ambiental */}
      <AudioPlayer />
    </main>
  );
}