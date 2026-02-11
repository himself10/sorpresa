"use client";

import { EvasiveButtons } from "./../components/EvasiveButton";
import { Title } from "./../components/Title";
import HeartBackground from "./../components/background-yes";
import { RoseFront } from "./../components/RoseFront";
import { InstagramToast } from "./../components/InstagramToast";

import { romanceCopy } from "./../utils/romanceCopy";

import { useState } from "react";

export function Main() {
    const [accepted, setAccepted] = useState(false);
    const [showInstagram, setShowInstagram] = useState(false);

    const accept = () => {
        setAccepted(true);
        setShowInstagram(true);
    };

    return (
        <main transition-style="entry-main" className="w-full max-w-xl">
            {/* Marco neón normal (como antes) */}
            <div
                className={[
                    "relative rounded-3xl p-[1px]",
                    "bg-[linear-gradient(90deg,rgba(168,85,247,0.85),rgba(236,72,153,0.90))]",
                    "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_70px_rgba(0,0,0,0.55),0_0_28px_rgba(236,72,153,0.18)]",
                ].join(" ")}
            >
                <section
                    className={[
                        "relative overflow-hidden rounded-3xl",
                        "border border-white/10 bg-zinc-950/70 backdrop-blur-2xl",
                        // "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]",
                        "shadow-2xl shadow-[rgba(168,85,247)] w-full max-w-xl",
                        "px-7 py-10 sm:px-10",
                        "transition-transform duration-500",
                        accepted ? "animate-soft-pulse" : "",
                    ].join(" ")}
                    aria-live="polite"
                >
                    {/* Halos dentro de la tarjeta (más pequeños y discretos) */}
                    <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-fuchsia-500/18 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-violet-400/14 blur-3xl" />

                    {/* Corazones (solo al aceptar) */}
                    {accepted && <HeartBackground />}

                    {/* Contenido encima del fondo */}
                    <div className="relative z-10">
                        <Title />

                        {/* Mensaje al aceptar (más llamativo) */}
                        <div className="mt-6 flex justify-center">
                            <div
                                className={[
                                    "rounded-3xl p-[1px]",
                                    "bg-[linear-gradient(90deg,rgba(255,79,216,0.55),rgba(168,85,247,0.45))]",
                                    "transition-all duration-500 ease-out",
                                    accepted
                                        ? "opacity-100 translate-y-0 scale-100"
                                        : "opacity-0 translate-y-2 scale-[0.98]",
                                ].join(" ")}
                                aria-hidden={!accepted}
                            >
                                <div
                                    className={[
                                        "rounded-3xl px-4 py-3 text-white shadow-sm",
                                        "border border-white/10 bg-white/5 backdrop-blur",
                                        "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_26px_rgba(236,72,153,0.18)]",
                                        "flex items-center gap-3 sm:gap-4",
                                    ].join(" ")}
                                >
                                    {accepted && (
                                        <div className="relative -ml-1">
                                            <div className="absolute inset-0 rounded-full bg-fuchsia-500/15 blur-2xl" />
                                            <RoseFront className="relative" />
                                        </div>
                                    )}
                                    <div className="min-w-0 text-left">
                                        <p
                                            className={[
                                                "text-base sm:text-lg font-semibold tracking-tight",
                                                accepted ? "animate-pop-in" : "",
                                                "drop-shadow-[0_0_18px_rgba(236,72,153,0.25)]",
                                            ].join(" ")}
                                        >
                                            {romanceCopy.success}
                                        </p>
                                        <p className="mt-0.5 text-xs text-white/70">
                                            - himself10
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="mt-8">
                            <EvasiveButtons
                                accepted={accepted}
                                onAccept={accept}
                                onReveal={() => setShowInstagram(true)}
                                yesLabel={romanceCopy.yes}
                                noLabel={romanceCopy.no}
                            />
                        </div>
                    </div>
                </section>
            </div>

            <InstagramToast
                show={accepted || showInstagram}
                href="https://www.instagram.com/salva_cot_/"
                handle="@salva_cot_"
            />
        </main>
    );
}

