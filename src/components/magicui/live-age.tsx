"use client";

import { useEffect, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";

interface LiveAgeProps {
  birthday: string;
  delay?: number;
  className?: string;
}

export function LiveAge({ birthday, delay = 0, className }: LiveAgeProps) {
  const [age, setAge] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Use the exact date or parse it. The user said 03/06/2007.
    // To be safe against timezone issues, we'll parse it as a local date
    const birthparts = birthday.includes("/") ? birthday.split("/") : [];
    let birthDate: number;
    
    if (birthparts.length === 3) {
      // Assuming DD/MM/YYYY or MM/DD/YYYY. The user said 03/06/2007.
      // If it's India, usually DD/MM/YYYY so 3rd June 2007 or 6th March 2007.
      // Let's rely on standard Date parsing if possible, or ISO.
      birthDate = new Date(birthday).getTime();
    } else {
      birthDate = new Date(birthday).getTime();
    }

    const updateAge = () => {
      const now = new Date().getTime();
      const ageInYears = (now - birthDate) / (1000 * 60 * 60 * 24 * 365.25);
      setAge(ageInYears.toFixed(9));
    };
    
    updateAge();
    const interval = setInterval(updateAge, 50);

    return () => clearInterval(interval);
  }, [birthday]);

  if (!mounted) {
    return (
      <BlurFade delay={delay}>
        <span className={className}>
          been here for <span className="font-mono tabular-nums opacity-0">00.000000000</span> years
        </span>
      </BlurFade>
    );
  }

  return (
    <BlurFade delay={delay}>
      <span className={className}>
        been here for <span className="font-mono tabular-nums">{age}</span> years
      </span>
    </BlurFade>
  );
}
