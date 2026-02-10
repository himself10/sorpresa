"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const TRAIL_LENGTH = 18;
/**
 * Serpiente/rastro que sigue el cursor. En móvil se mueve sola.
 */
export function CursorTrail() {
    const gradId = `trail-${useId().replace(/:/g, "-")}`;
    const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
    const rafRef = useRef<number>(0);
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const x = e.clientX;
            const y = e.clientY;
            setPoints((prev) => {
                const next = [...prev, { x, y }].slice(-TRAIL_LENGTH);
                return next;
            });
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setPoints([]);
    }, []);

    // Móvil: serpiente se mueve sola (figura suave tipo lemniscata)
    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        const hasCursor = window.matchMedia("(hover: hover)").matches;
        if (hasCursor) return;

        const w = typeof window !== "undefined" ? window.innerWidth : 800;
        const h = typeof window !== "undefined" ? window.innerHeight : 600;
        const cx = w / 2;
        const cy = h / 2;
        const rx = w * 0.35;
        const ry = h * 0.2;
        let t = 0;

        const tick = () => {
            t += 0.008;
            const x = cx + rx * Math.sin(t);
            const y = cy + ry * Math.cos(t * 1.5);
            setPoints((prev) => [...prev, { x, y }].slice(-TRAIL_LENGTH));
        };
        const id = setInterval(tick, 40);
        return () => clearInterval(id);
    }, []);

    // En PC: solo mostramos cuando hay cursor
    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    const show = points.length > 2;

    if (!show) return null;

    const d =
        points.length > 1
            ? points.reduce(
                  (acc, p, i) => acc + (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`),
                  ""
              )
            : "";

    return (
        <svg
            className="pointer-events-none fixed inset-0 z-50 h-full w-full"
            aria-hidden
        >
            <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(236,72,153,0.15)" />
                    <stop offset="100%" stopColor="rgba(236,72,153,0.7)" />
                </linearGradient>
            </defs>
            <path
                d={d}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {points.length > 0 && (
                <circle
                    cx={points[points.length - 1].x}
                    cy={points[points.length - 1].y}
                    r="4"
                    fill="rgba(236,72,153,0.8)"
                    className="drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"
                />
            )}
        </svg>
    );
}
