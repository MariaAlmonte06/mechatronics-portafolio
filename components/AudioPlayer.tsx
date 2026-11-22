"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Alterna entre reproducir y pausar la pista ambiental
  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Ajusta el volumen (0.0 a 1.0) antes de iniciar
      audioRef.current.volume = 0.7;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Error al reproducir audio:", error));
    }
  };

  return (
    // transform-gpu aísla el botón fijo para evitar tirones durante el scroll
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 transform-gpu">
      {/* preload="metadata" evita descargar todo el mp3 antes que los modelos 3D */}
      <audio ref={audioRef} src="/track.mp3" loop preload="metadata" />

      <button
        type="button"
        onClick={toggleSound}
        // Fondo sólido de alta opacidad en lugar de backdrop-blur para mejorar rendimiento
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/95 text-[11px] font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition shadow-lg cursor-pointer"
      >
        {isPlaying ? (
          <>
            <Volume2 size={13} className="text-cyan-400 animate-pulse" />
            <span>SOUND: ON</span>
          </>
        ) : (
          <>
            <VolumeX size={13} className="text-neutral-500" />
            <span>SOUND: OFF</span>
          </>
        )}
      </button>

      <span className="hidden sm:inline font-mono text-[9px] text-neutral-500/80">
        Andronicus - Make U Whole (Sample)
      </span>
    </div>
  );
}