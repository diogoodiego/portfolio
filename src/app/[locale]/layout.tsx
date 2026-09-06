import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Guntur } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${hindGuntur.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-full" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster
            theme="dark"
            position="bottom-center"
            toastOptions={{
              classNames: {
                toast: "!bg-stone-900 !border !border-white/10 !text-stone-300 !rounded-xl !shadow-2xl !flex !items-center !justify-center",
                title: "!text-md !font-medium",
              }
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
