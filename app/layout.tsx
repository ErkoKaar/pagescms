import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/providers";
import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { getBaseUrl } from "@/lib/base-url";
import { cn } from "@/lib/utils";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
const appUrl = getBaseUrl();
const socialImage = "/images/social-card.png";
const description = "Content manager for the Thor Group websites";

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  metadataBase: new URL(appUrl),
  title: {
    template: "%s | Thor CMS",
    default: "Thor CMS",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: appUrl,
    siteName: "Thor CMS",
    title: "Thor CMS",
    description,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Thor CMS social card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thor CMS",
    description,
    images: [socialImage],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
	return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          archivo.variable,
          jetbrainsMono.variable,
        )}
      >
        <Providers user={null}>
          {children}
        </Providers>
        <Toaster/>
      </body>
    </html>
  );
}
