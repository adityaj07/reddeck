import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Reddit_Mono, Reddit_Sans } from "next/font/google";
import "./globals.css";

const redditSans = Reddit_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const redditMono = Reddit_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | RedDeck",
    default: "RedDeck",
  },
  description:
    "RedDeck lets you browse multiple subreddits, search and filter posts, and get AI-powered summaries and insights in one workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${redditSans.variable} ${redditMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
