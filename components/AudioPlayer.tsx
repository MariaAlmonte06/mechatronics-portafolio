"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.7; // Volumen al 70%
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error al reproducir audio:", error);
        });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      <audio ref={audioRef} src="/track.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggleSound}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/90 backdrop-blur text-[11px] font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition shadow-lg cursor-pointer"
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

      <span className="hidden sm:inline font-mono text-[9px] text-neutral-500/70">
        Andronicus - Make U Whole (Sample)
      </span>
    </div>
  );
}