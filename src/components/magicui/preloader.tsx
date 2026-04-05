"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const words = [
  "Hello", "Bonjour", "Ciao", "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ", "Hola", 
  "नमस्ते", "Guten Tag", "こんにちは", "안녕하세요", "مرحباً", 
  "Olá", "Привет", "Hello"
];

export function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [startWave, setStartWave] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { theme, resolvedTheme } = useTheme();

  // Use resolvedTheme to correctly handle system settings
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    document.body.style.overflow = "hidden";
    
    return () => { 
      document.body.style.overflow = ""; 
    };
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      const t1 = setTimeout(() => setStartWave(true), 150); 
      const t2 = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "";
      }, 1000); 
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 500 : 80); 
    return () => clearTimeout(timeout);
  }, [index]);

  const w = dimension.width || 1920;
  const h = dimension.height || 1080;

  // Paths for the reveal clip-path (M0 0 means top-left, H${w} means horizontal line, etc.)
  // We want to start at full screen and then move the bottom upwards with a curve
  const initialPath = `M0 0 H${w} V${h} Q${w / 2} ${h} 0 ${h} Z`;
  const targetPath = `M0 0 H${w} V0 Q${w / 2} -200 0 0 Z`;

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        key="preloader"
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        // Using bg-foreground and text-background automatically ensures 
        // the preloader is always the inverse of the current theme background.
        className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden h-screen w-screen bg-foreground text-background font-sans"
        style={{
          clipPath: `url(#revealClip)`
        }}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight z-10"
        >
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full animate-pulse capitalize bg-background" />
            {words[index]}
          </div>
        </motion.div>

        {/* The SVG and ClipPath are hidden, but used to clip the motion.div above */}
        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
            <clipPath id="revealClip" clipPathUnits="userSpaceOnUse">
              <motion.path
                initial={{ d: initialPath }}
                animate={startWave ? { d: targetPath } : { d: initialPath }}
                transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              />
            </clipPath>
          </defs>
        </svg>
      </motion.div>
    </AnimatePresence>
  );
}
