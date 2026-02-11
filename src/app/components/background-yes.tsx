"use client";

import Lottie from "lottie-react";
import animationData from "@/app/lotties/HeartParticles.json";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

export default function HeartBackground({ className }: Props) {
  const [two, setTwo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setTwo(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className={["pointer-events-none absolute inset-0 z-0 overflow-hidden", className].join(" ")}>
      {/* Móvil: una sola animación */}
      {!two && (
        <Lottie
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35 blur-[0.2px]"
          animationData={animationData}
          loop
          autoplay
          style={{ width: 320, height: 320 }}
          aria-hidden
        />
      )}

      {/* Pantallas grandes: dos animaciones (fondo) */}
      {two && (
        <>
          <Lottie
            className="absolute -left-10 -bottom-12 opacity-35"
            animationData={animationData}
            loop
            autoplay
            style={{ width: 360, height: 360 }}
            aria-hidden
          />
          <Lottie
            className="absolute -right-10 -top-12 opacity-30"
            animationData={animationData}
            loop
            autoplay
            style={{ width: 360, height: 360 }}
            aria-hidden
          />
        </>
      )}
    </div>
  );
}