"use client";

import { useMemo, useState, type SVGProps } from "react";

function HeartIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            {...props}
        >
            <path
                d="M12 21s-7.2-4.55-9.6-9.03C.53 8.41 2.34 5.5 5.7 5.14c1.68-.18 3.3.56 4.3 1.86 1-1.3 2.62-2.04 4.3-1.86 3.36.36 5.17 3.27 3.3 6.83C19.2 16.45 12 21 12 21Z"
                className="stroke-white/90"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M12 21s-7.2-4.55-9.6-9.03C.53 8.41 2.34 5.5 5.7 5.14c1.68-.18 3.3.56 4.3 1.86 1-1.3 2.62-2.04 4.3-1.86 3.36.36 5.17 3.27 3.3 6.83C19.2 16.45 12 21 12 21Z"
                fill="url(#heartGlow)"
                opacity="0.9"
            />
            <defs>
                <linearGradient id="heartGlow" x1="4" y1="6" x2="20" y2="18">
                    <stop stopColor="#ff4fd8" />
                    <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
            </defs>
        </svg>
    );
}

type Props = {
    accepted: boolean;
    onAccept: () => void;
    yesLabel: string;
    noLabel: string;
};

export function EvasiveButtons({ accepted, onAccept, yesLabel, noLabel }: Props) {
    const [noPressCount, setNoPressCount] = useState(0);

    // Crece con cada intento de click en "No".
    const noScale = useMemo(() => {
        // Crecimiento lineal controlado (se siente “rápido” sin romper layout al instante).
        const scale = 1 + noPressCount * 0.35;
        return Math.min(6, scale);
    }, [noPressCount]);

    const noIsFullscreen = noScale >= 5.0;

    const handleNo = () => {
        if (accepted) return;
        // Cuando ya ocupa pantalla, lo hacemos imposible de presionar (no más clicks).
        if (noIsFullscreen) return;
        setNoPressCount((c) => c + 1);
    };

    return (
        <div className="relative mx-auto h-16 w-full max-w-sm select-none">
            <button
                onClick={onAccept}
                type="button"
                className={[
                    "absolute left-0 top-1/2 -translate-y-1/2",
                    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-white",
                    "bg-[linear-gradient(90deg,rgba(255,79,216,0.95),rgba(236,72,153,0.95),rgba(168,85,247,0.85))]",
                    "transition-transform duration-200 active:scale-[0.98] hover:scale-[1.02]",
                    "focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-300/45",
                    accepted ? "opacity-90" : "",
                ].join(" ")}
            >
                <HeartIcon className="h-5 w-5 drop-shadow-[0_0_14px_rgba(236,72,153,0.85)]" />
                <span className="tracking-wide">{yesLabel}</span>
            </button>

            {/* "No" no se mueve: crece con cada click hasta cubrir la pantalla. */}
            <button
                onClick={handleNo}
                type="button"
                disabled={accepted || noIsFullscreen}
                style={
                    noIsFullscreen
                        ? undefined
                        : {
                            transform: `translateY(-50%) scale(${noScale})`,
                            transformOrigin: "center",
                        }
                }
                className={[
                    noIsFullscreen
                        ? [
                            // Modo “pantalla completa” (decorativo): imposible de presionar.
                            "fixed inset-0 z-0 pointer-events-none",
                            "rounded-none",
                            "bg-[radial-gradient(900px_650px_at_50%_40%,rgba(236,72,153,0.35),transparent_65%),linear-gradient(to_br,#05030a,#08051a,#0a0722)]",
                            "opacity-95",
                        ].join(" ")
                        : [
                            "absolute right-0 top-1/2",
                            "inline-flex items-center gap-2 rounded-full px-6 py-3 text-white/90",
                            "border border-fuchsia-200/20 bg-white/5 backdrop-blur",
                            "transition-[transform,background-color,opacity] duration-200",
                            "hover:bg-white/10",
                            "focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-300/25",
                            accepted ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
                        ].join(" "),
                ].join(" ")}
                aria-label={
                    noIsFullscreen
                        ? "No (ya es imposible decir que no)"
                        : "No (crece cada vez que lo presionas)"
                }
            >
                {!noIsFullscreen && (
                    <>
                        <p className="tracking-wide">{noLabel}</p>
                    </>
                )}
            </button>
        </div>
    );
}