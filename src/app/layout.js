import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Background3D from "@/components/Background3D";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "HookNest — Production-ready React Hooks Library",
    template: "%s | HookNest"
  },
  description: "A curated collection of production-ready custom React hooks designed for high-performance applications. Optimized for Next.js, TypeScript, and developer experience.",
  keywords: ["react hooks", "custom hooks", "hooknest", "react library", "next.js hooks", "typescript hooks", "performance", "web development", "frontend library"],
  authors: [{ name: "HookNest Team" }],
  creator: "HookNest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hooknest.dev",
    siteName: "HookNest",
    title: "HookNest — Production-ready React Hooks",
    description: "Curated collection of production-ready custom React hooks for modern web apps.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HookNest" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "HookNest — Production-ready React Hooks",
    description: "Curated collection of production-ready custom React hooks for modern web apps.",
    creator: "@hooknest",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col bg-bg text-text-primary overflow-x-hidden`}
      >
        <Background3D />
        <SmoothScroll>
          <Navbar />
          <main className='flex-1 relative z-10'>
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
