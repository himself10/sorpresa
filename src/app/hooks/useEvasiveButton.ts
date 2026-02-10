import { useCallback, useEffect, useRef, useState } from "react";

export type Position = { x: number; y: number };

const clamp = (n: number, min: number, max: number) =>
    Math.min(max, Math.max(min, n));

export function useEvasiveButton(accepted: boolean) {
    const arenaRef = useRef<HTMLDivElement | null>(null);
    const yesRef = useRef<HTMLButtonElement | null>(null);
    const noRef = useRef<HTMLButtonElement | null>(null);

    const [noPos, setNoPos] = useState<Position>({ x: 0, y: 0 });
    const [arenaReady, setArenaReady] = useState(false);

    const computeInitialNoPos = useCallback((): Position => {
        const arena = arenaRef.current;
        const noBtn = noRef.current;
        if (!arena || !noBtn) return { x: 0, y: 0 };

        const padding = 8;
        return {
            x: clamp(
                arena.clientWidth - noBtn.offsetWidth - padding,
                padding,
                arena.clientWidth,
            ),
            y: clamp(
                (arena.clientHeight - noBtn.offsetHeight) / 2,
                padding,
                arena.clientHeight,
            ),
        };
    }, []);

    const moveNo = useCallback(() => {
        if (accepted) return;

        const arena = arenaRef.current;
        const noBtn = noRef.current;
        const yesBtn = yesRef.current;
        if (!arena || !noBtn) return;

        const padding = 8;
        const minX =
            padding + (yesBtn?.offsetWidth ? yesBtn.offsetWidth + 14 : 0);
        const maxX = arena.clientWidth - noBtn.offsetWidth - padding;
        const maxY = arena.clientHeight - noBtn.offsetHeight - padding;

        let next = noPos;
        for (let i = 0; i < 8; i++) {
            const x = minX + Math.random() * (maxX - minX);
            const y = padding + Math.random() * (maxY - padding);
            if (Math.hypot(x - noPos.x, y - noPos.y) > 18) {
                next = { x, y };
                break;
            }
        }

        setNoPos(next);
    }, [accepted, noPos]);

    useEffect(() => {
        const place = () => {
            setNoPos(computeInitialNoPos());
            setArenaReady(true);
        };
        place();
        window.addEventListener("resize", place);
        return () => window.removeEventListener("resize", place);
    }, [computeInitialNoPos]);

    return {
        arenaRef,
        yesRef,
        noRef,
        noPos,
        arenaReady,
        moveNo,
    };
}