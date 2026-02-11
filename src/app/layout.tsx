import type { Metadata } from "next";
import "./styles/globals.css";

const siteTitle = "Una pregunta";
const siteDescription =
  "Algo corto. Algo inesperado. Entra sin suponer demasiado.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: siteTitle,
    template: `%s · ${siteTitle}`,
  },
  description: siteDescription,
  applicationName: siteTitle,
  keywords: ["sorpresa", "pregunta", "juego", "interactivo", "secreto", "curiosidad"],
  alternates: {
    canonical: "/sorpresa/",
  },
  icons: {
    icon: [
      { url: "/sorpresa/assets/icono.png", type: "image/png" },
    ],
    apple: [
      { url: "/sorpresa/assets/icono.png", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/sorpresa/",
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "https://github.com/himself10/sorpresa/blob/main/assets/image.png?raw=true",
        width: 1200,
        height: 630,
        alt: "Una pista visual, sin spoilers.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["https://github.com/himself10/sorpresa/blob/main/assets/image.png?raw=true"],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": -1,
      "max-image-preview": "none",
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#120019",
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
