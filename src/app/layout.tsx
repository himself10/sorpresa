import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "A question...",
  description: "Una pregunta...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">

      <body
        className="antialiased"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
