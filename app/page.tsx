"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Activity, Download, Layers, Cpu, Compass } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";

// Import dinámico para que el Canvas 3D no se ejecute en el servidor (SSR)
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

export default function Home() {
  const projects = [
    {
      title: "Formula Student Suspension System",
      category: "Mechanical Design & FEA",
      tag: "Apolo 27 GT / FSAE",
      desc: "Diseño cinemático de horquillas dobles, manguetas en Al 7075-T6, análisis de esfuerzos por elementos finitos y suite completa de planos normados.",
      tools: ["SolidWorks", "FEA Analysis", "BOM Drafting", "GD&T"],
      icon: Compass,
    },
    {
      title: "Ferrari F1 Interactive Steering Wheel",
      category: "Ergonomics & Motorsport Packaging",
      tag: "Motorsport Engineering",
      desc: "Modelado de controles de cabina, empaquetado para pantalla digital y selectores ergonómicos rotativos para mapeo de motor y diferencial.",
      tools: ["Surface Sweep", "Photorealistic CAD", "Industrial Packaging"],
      icon: Layers,
    },
    {
      title: "Dynamic Prosthesis Biomechanical Rig",
      category: "Mechatronics & Control",
      tag: "Biomedical Systems",
      desc: "Banco de pruebas funcional con adquisición de carga en tiempo real, puente H de control motriz y estructura optimizada en manufactura aditiva.",
      tools: ["ESP32", "Load Cells", "C++ Scripting", "Sensors"],
      icon: Cpu,
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-cyan-500 selection:text-black relative">
      {/* Fondo técnico con retícula milimétrica */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293718_1px,transparent_1px),linear-gradient(to_bottom,#1f293718_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Encabezado / Hero */}
        <header className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs mb-6"
          >
            <Activity size={14} className="animate-pulse" />
            <span>MECHATRONICS ENGINEERING & MECHANICAL DESIGN</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
          >
            High-precision design. <br />
            <span className="text-neutral-500">Motorsport & Robotics systems.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 max-w-2xl text-base md:text-lg leading-relaxed mb-8"
          >
            Enfoque en diseño mecánico avanzado, cinemática de vehículos de alta competencia, simulación FEA y desarrollo de hardware mecatrónico.
          </motion.p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="flex items-center gap-2 bg-neutral-100 text-neutral-900 font-medium px-5 py-2.5 rounded-lg hover:bg-neutral-200 transition text-sm shadow-md"
            >
              Explorar Proyectos
            </a>

            {/* Botón de descarga de CV vinculado a public/cv.pdf */}
            <a
              href="/cv.pdf"
              download="cv.pdf"
              className="flex items-center gap-2 border border-neutral-800 bg-neutral-900/50 px-5 py-2.5 rounded-lg hover:bg-neutral-800 transition text-sm text-neutral-300 font-medium cursor-pointer"
            >
              <Download size={15} /> Descargar CV Técnico
            </a>
          </div>
        </header>

        {/* Sección del Visor 3D */}
        <section className="mb-24">
          <ModelViewer modelPath="/models/Car_Suspension_Assembly.glb" />
        </section>

        {/* Proyectos */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4 mb-8">
            <div>
              <h2 className="text-xl font-bold tracking-tight">ENGINEERING SHOWCASE</h2>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">TECHNICAL DOCUMENTATION & PROTOTYPES</p>
            </div>
            <span className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-2.5 py-1 rounded">
              03 ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj, idx) => {
              const Icon = proj.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/70 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-wider">
                        {proj.tag}
                      </span>
                      <Icon size={18} className="text-neutral-500" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-100 mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                      {proj.desc}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-800/60">
                      {proj.tools.map((t, i) => (
                        <span
                          key={i}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-neutral-800/80 text-neutral-300 border border-neutral-700/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Reproductor de audio de fondo */}
      <AudioPlayer />
    </main>
  );
}