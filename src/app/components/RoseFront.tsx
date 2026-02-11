"use client";

import Lottie from "lottie-react";
import roseData from "@/app/lotties/Rose.json";

type Props = {
  className?: string;
};

export function RoseFront({ className }: Props) {
  return (
    <div className={["pointer-events-none bg-rose-950/25 rounded-2xl", className].join(" ")} aria-hidden="true">
      <Lottie
        animationData={roseData}
        loop
        autoplay
        style={{ width: 140, height: 140 }}
      />
    </div>
  );
}

