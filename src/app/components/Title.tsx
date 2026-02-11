"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { romanceCopy } from "../utils/romanceCopy";

gsap.registerPlugin(SplitText);

export function Title() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const splitText = new SplitText(titleRef.current, {
      type: "words",
    });

    gsap.from(splitText.words, {
      delay: 2,
      duration: 1,
      y: 15,
      stagger: 0.1,
      opacity: 0,
      filter: "blur(8px)",
      ease: "power3.out",
    });

    // 🧹 Limpieza (MUY importante con SplitText)
    return () => {
      splitText.revert();
    };
  }, []);

  return (
    <h1
      ref={titleRef}
      className="text-animation text-center text-3xl sm:text-4xl font-semibold tracking-tight text-white animate-neon-breathe animate-neon-flicker"
    >
      {romanceCopy.title}
    </h1>
  );
}
