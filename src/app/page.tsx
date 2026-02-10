"use client";

import { CursorTrail } from "./components/CursorTrail";
import { Main } from "./layout/Main";

export default function Home() {
  return (
    <div className="bg-pink-100">
      <CursorTrail />
      <div transition-style="in:circle:hesitate" className="relative bg-[#120019]">

        {/* Background - Grid */}
        <div
          className={[
            "pointer-events-none absolute inset-0 opacity-25",
            "[background-image:linear-gradient(rgba(236,72,153,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.08)_1px,transparent_1px)]",
            "[background-size:64px_64px]",
            "animate-grid-drift",
          ].join(" ")}
        />

        {/* Capa para centrar */}
        <div className="relative min-h-screen w-full flex items-center justify-center px-5 py-10">
          <Main />
        </div>
      </div>
    </div>
  );
}