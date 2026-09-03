import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Guntur } from "next/font/google";
import { Toaster } from "sonner";
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
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-full" suppressHydrationWarning>
        {children}
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            classNames: {
              toast: "flex justify-center bg-stone-900 border border-white/10 text-stone-300 rounded-xl shadow-2xl",
              title: "text-md font-medium",
            }
          }}
        />
      </body>
    </html>
  );
}
