"use client";

import { useRef, useEffect, useState } from "react";
import { Pause, Music } from "lucide-react";

export default function Audio() {
  const [playing, setPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay failed:", err.message);
        });
      }
    } else {
      audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    const enableAudio = () => {
      setPlaying(true);
      window.removeEventListener("click", enableAudio);
    };
    window.addEventListener("click", enableAudio);
    return () => window.removeEventListener("click", enableAudio);
  }, []);

  return (
    <section
      id="playback"
      className="relative flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-10 pb-4"
    >
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={() => setPlaying(!playing)}
        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all sm:flex-col"
      >
        {playing ? <Pause size={20} /> : <Music size={20} />}
      </button>
    </section>
  );
}
