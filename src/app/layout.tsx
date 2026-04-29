import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingScreen from "@/components/LoadingScreen";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ho Duc Hoang Quan | Frontend Developer",
  description: "Frontend Developer crafting digital experiences with clean code and thoughtful design. Specializing in modern web applications with React, Next.js, and TypeScript.",
  keywords: ["Frontend Developer", "React Developer", "Next.js", "TypeScript", "Web Developer", "Portfolio"],
  authors: [{ name: "Ho Duc Hoang Quan" }],
  creator: "Ho Duc Hoang Quan",
  openGraph: {
    title: "Ho Duc Hoang Quan | Frontend Developer",
    description: "Frontend Developer crafting digital experiences with clean code and thoughtful design.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ho Duc Hoang Quan | Frontend Developer",
    description: "Frontend Developer crafting digital experiences with clean code and thoughtful design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#252422" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased overflow-x-hidden">
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <SmoothScroll>
            <LoadingScreen />
            <Navigation />
            <main>{children}</main>
            <ScrollToTop />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
