import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Takshashila 2026 | Celebrating 10 Years of TK",
  description: "Join the landmark 10-year edition of Chennai Institute of Technology’s premier cultural festival Takshashila, featuring headline events, talent showcases, pro-shows, and immersive experiences.",
  openGraph: {
    title: "Takshashila 2026 — 10 Years of TK",
    description: "Experience the decade celebration of Chennai Institute of Technology’s flagship cultural festival — bigger stages, grander performances, and unforgettable moments.",
    url: "/",
    siteName: "Takshashila 2026",
    images: ["https://nonprotrusively-candylike-megan.ngrok-free.dev/og-img.png"],
    type: "website"
  },
  icons: {
    apple: "/tk26logo.png",
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
