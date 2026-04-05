"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const BARS = [1, 2, 3, 4, 5];

function VisualizerBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-3">
      {[1, 2, 3, 4].map((bar) => (
        <motion.span
          key={bar}
          className="w-[2px] rounded-full bg-primary"
          animate={
            isPlaying
              ? {
                  height: ["20%", "100%", "40%", "90%", "30%", "70%", "20%"],
                  transition: {
                    duration: 0.7 + bar * 0.12,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: bar * 0.06,
                  },
                }
              : { height: "20%" }
          }
          style={{ height: "20%" }}
        />
      ))}
    </div>
  );
}

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => audio.duration && setProgress((audio.currentTime / audio.duration) * 100);
    const meta = () => setDuration(audio.duration);
    const ended = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", meta);
    audio.addEventListener("ended", ended);
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", meta);
      audio.removeEventListener("ended", ended);
    };
  }, []);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audio.currentTime = pct * duration;
    setProgress(pct * 100);
  };

  return (
    <>
      <audio ref={audioRef} src="/songs/4_raws.mp3" preload="metadata" loop />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-fit group pointer-events-auto mt-4"
      >
        <div className="relative flex items-center gap-3 pl-1.5 pr-2 py-1.5 rounded-full border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm transition-all duration-300 hover:shadow-primary/5 hover:border-border/80 overflow-hidden min-w-[200px]">
          
          {/* Progress baseline */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-muted cursor-pointer group/progress"
            onClick={handleSeek}
          >
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          {/* Cover */}
          <div className="relative shrink-0 w-8 h-8 rounded-full overflow-hidden border border-border/20">
            <Image
              src="/songs/4_raws.png"
              alt="4 RAWS"
              fill
              className={`object-cover transition-transform duration-700 ${isPlaying ? "scale-110" : "scale-100"}`}
            />
          </div>

          {/* Info + Visualizer */}
          <div className="flex flex-col flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium text-foreground tracking-tight truncate leading-none">
                4 RAWS
              </span>
              <VisualizerBars isPlaying={isPlaying} />
            </div>
          </div>

          {/* Play/Pause */}
          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.9 }}
            className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isPlaying ? "pause" : "play"}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 fill-current" />
                ) : (
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>

        </div>
      </motion.div>
    </>
  );
}
