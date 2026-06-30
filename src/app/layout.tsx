import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Guntur } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hindGuntur = Hind_Guntur({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-hind-guntur",
});

export const metadata: Metadata = {
  title: "Dio | Product Designer Portfolio",
  description: "Crafting digital products focused on utility, aesthetics, and precision. Explore design systems, user experience case studies, and interface design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${hindGuntur.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
