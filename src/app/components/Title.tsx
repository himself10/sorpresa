"use client";

import { romanceCopy } from "../utils/romanceCopy";

export function Title() {

  return (
    <h1 className="text-animation text-center text-3xl sm:text-4xl font-semibold tracking-tight text-white animate-neon-breathe animate-neon-flicker">
      {romanceCopy.title}
    </h1>
  );
}
