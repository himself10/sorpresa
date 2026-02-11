"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  // Nada explícito: solo un “salto” silencioso.
  return <div className="min-h-screen bg-[#120019]" aria-hidden="true" />;
}

