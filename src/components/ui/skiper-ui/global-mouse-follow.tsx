"use client";

import { motion, useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const SPRING = {
  mass: 0.1, 
  damping: 30,
  stiffness: 250,
  restDelta: 0.001
};

export function GlobalMouseFollow() {
  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(1, SPRING);
  
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Default to visible
  const lastElementRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    setMounted(true);

    const checkMouse = () => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      setIsVisible(hasFinePointer);
      
      // Toggle a class on the html element so we can hide the real cursor via CSS
      // only when the custom cursor is actually active.
      if (hasFinePointer) {
        document.documentElement.classList.add("has-custom-cursor");
      } else {
        document.documentElement.classList.remove("has-custom-cursor");
      }
    };

    checkMouse();
    window.addEventListener("resize", checkMouse);

    const handlePointerMove = (e: MouseEvent) => {
      // Direct, non-throttled position updates
      xSpring.set(e.clientX - 6);
      ySpring.set(e.clientY - 6);

      // Only perform expensive DOM lookup if the target element changes
      if (e.target !== lastElementRef.current) {
        lastElementRef.current = e.target;
        const target = e.target as HTMLElement;
        if (target && target.closest) {
          const isClickable = !!target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');
          setIsHovering(isClickable);
          scaleSpring.set(isClickable ? 2.5 : 1);
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", checkMouse);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [xSpring, ySpring, scaleSpring]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 99999 }}>
      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          scale: scaleSpring,
        }}
        className={`absolute top-0 left-0 rounded-full w-3 h-3 transition-colors duration-200 ${
          isHovering 
            ? "border-2 border-primary bg-primary/20 backdrop-blur-[2px]" 
            : "bg-primary blur-[0.3px] opacity-90 shadow-[0_0_10px_rgba(var(--primary),0.3)]"
        }`}
      />
    </div>
  );
}

