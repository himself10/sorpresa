"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Props = {
  show: boolean;
  href: string;
  handle: string;
};

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
    >
      <path
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Z"
        className="stroke-white/85"
        strokeWidth="1.6"
      />
      <path
        d="M12 16.1a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2Z"
        className="stroke-white/85"
        strokeWidth="1.6"
      />
      <path
        d="M17.6 6.4h.01"
        className="stroke-white/85"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InstagramToast({ show, href, handle }: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [muted, setMuted] = useState(false);
  const reappearTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!show) {
      setMuted(false);
      if (reappearTimeoutRef.current) {
        window.clearTimeout(reappearTimeoutRef.current);
        reappearTimeoutRef.current = null;
      }
    }
  }, [show]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    tlRef.current?.kill();
    tlRef.current = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (show && !muted) {
      tlRef.current.fromTo(
        el,
        { y: 80, opacity: 0, scale: 0.98, filter: "blur(2px)" },
        { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.55 }
      );
    } else {
      gsap.to(el, {
        y: 80,
        opacity: 0,
        scale: 0.98,
        filter: "blur(2px)",
        duration: 0.3,
        ease: "power2.in",
      });
    }

    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, [show, muted]);

  useEffect(() => {
    return () => {
      if (reappearTimeoutRef.current) {
        window.clearTimeout(reappearTimeoutRef.current);
        reappearTimeoutRef.current = null;
      }
    };
  }, []);

  const handleClose = () => {
    // No se “cierra” del todo: solo se oculta y vuelve luego.
    setMuted(true);
    if (reappearTimeoutRef.current) window.clearTimeout(reappearTimeoutRef.current);
    reappearTimeoutRef.current = window.setTimeout(() => {
      setMuted(false);
      reappearTimeoutRef.current = null;
    }, 3200);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4">
      <div
        ref={elRef}
        role="status"
        aria-live="polite"
        aria-hidden={muted}
        className={[
          "w-full max-w-md",
          "rounded-2xl p-[1px]",
          "bg-[linear-gradient(90deg,rgba(255,79,216,0.55),rgba(168,85,247,0.45))]",
          "shadow-[0_20px_80px_rgba(0,0,0,0.55)]",
          muted ? "pointer-events-none" : "",
        ].join(" ")}
      >
        <div
          className={[
            "relative overflow-hidden rounded-2xl",
            "border border-white/10 bg-zinc-950/70 backdrop-blur-2xl",
            "px-4 py-3",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5">
              <InstagramIcon />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white/90">Quien soy?</p>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="mt-0.5 block truncate text-sm text-white hover:underline"
              >
                {handle}
              </a>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl px-3 py-2 text-xs text-white/80 hover:bg-white/5"
              aria-label="Cerrar"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

