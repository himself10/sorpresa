"use client";

import { useEffect, useRef, useState, type SVGProps } from "react";

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
    const START_REMAINING = 12;
    const [remaining, setRemaining] = useState(START_REMAINING);
    const [finale, setFinale] = useState<"idle" | "inflate" | "explode" | "done">("idle");
    const timeoutsRef = useRef<number[]>([]);
    const lastNoPressAtRef = useRef<number | null>(null);
    const rapidNoStreakRef = useRef(0);
    const forceAcceptRef = useRef(false);

    const schedule = (fn: () => void, ms: number) => {
        const id = window.setTimeout(fn, ms);
        timeoutsRef.current.push(id);
    };

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach((id) => window.clearTimeout(id));
            timeoutsRef.current = [];
        };
    }, []);

    const triggerFinale = () => {
        if (finale !== "idle") return;
        setFinale("inflate");
        // 1) “Sí” se agranda (ancho + escala) y empuja al “No”
        schedule(() => setFinale("explode"), 180);
        // 2) “No” explota y desaparece
        schedule(() => setFinale("done"), 650);
        // Si spamearon “No” rápido, al final “cuenta como Sí”.
        if (forceAcceptRef.current) {
            schedule(() => onAccept(), 520);
        }
    };

    const handleNo = () => {
        if (accepted) return;
        if (finale !== "idle") return;
        const now = Date.now();
        if (lastNoPressAtRef.current !== null && now - lastNoPressAtRef.current < 140) {
            rapidNoStreakRef.current += 1;
        } else {
            rapidNoStreakRef.current = 0;
        }
        lastNoPressAtRef.current = now;
        // Tras varios clicks muy seguidos, marcamos “misclick” forzado al final.
        if (rapidNoStreakRef.current >= 3) {
            forceAcceptRef.current = true;
        }
        if (remaining > 1) {
            setRemaining((r) => Math.max(1, r - 1));
            return;
        }
        // Click cuando llega a 1
        triggerFinale();
    };

    return (
        <div className="mx-auto w-full max-w-sm select-none">
            <div className="flex min-h-16 items-center justify-center gap-4">
                <button
                    onClick={onAccept}
                    type="button"
                    className={[
                        "inline-flex items-center justify-center gap-2 rounded-full text-white",
                        "bg-[linear-gradient(90deg,rgba(255,79,216,0.95),rgba(236,72,153,0.95),rgba(168,85,247,0.85))]",
                        "focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-300/45",
                        // Importante: al inflarse, ocupa casi todo para provocar misclick.
                        "transition-[transform,padding] duration-[0.9s]",
                        "active:scale-[0.98]",
                        accepted ? "opacity-90" : "hover:scale-[1.02] cursor-pointer",
                        finale === "inflate"
                            ? [
                                "animate-yes-surge",
                                "px-[100vw] py-4",
                                "shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_0_26px_rgba(236,72,153,0.25)]",
                                "hover:scale-100",
                            ].join(" ")
                            : "px-6 py-3",
                    ].join(" ")}
                    aria-label={yesLabel}
                >
                    <HeartIcon className="h-5 w-5 drop-shadow-[0_0_14px_rgba(236,72,153,0.85)]" />
                    <span className="tracking-wide">{yesLabel}</span>
                </button>

                {finale !== "done" && (
                    <button
                        onClick={handleNo}
                        type="button"
                        disabled={accepted || finale !== "idle"}
                        className={[
                            "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-white/90",
                            "border border-fuchsia-200/20 bg-white/5 backdrop-blur",
                            "focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-300/25",
                            "transition-[transform,background-color,opacity,filter] duration-150",
                            "hover:bg-white/10",
                            accepted ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
                            finale === "inflate" ? "translate-x-6 opacity-80" : "",
                            finale === "explode" ? "animate-no-explode pointer-events-none" : "",
                        ].join(" ")}
                        aria-label="No (cuenta regresiva hasta 1)"
                    >
                        <span className="tracking-wide">{noLabel}</span>
                    </button>
                )}
            </div>

            {!accepted && finale !== "done" && (
                <p className="mt-3 text-center text-sm text-white/80">
                    Falta <span className="font-semibold text-white">{remaining}</span>. Hay sorpresa al final.
                </p>
            )}
        </div>
    );
}