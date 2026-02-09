import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import LayoutFooter from "@/components/layout/Footer";
import LayoutHeader from "@/components/layout/HeaderUi";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const metadata: Metadata = {
  title: {
    default: "Dada Lab | 개발·프로젝트 아카이빙",
    template: "%s | Dada Lab",
  },
  description:
    "다다랩에서 진행한 다양한 개발 프로젝트와 기술로그를 기록하고 있습니다.",
  openGraph: {
    title: "Dada Lab",
    description: "개발 프로젝트 아카이빙",
    url: baseUrl,
    siteName: "Dada Lab",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={<header className="h-16" />}>
              <LayoutHeader />
            </Suspense>
            <main className="flex-1 flex flex-col">
              <div className="w-full max-w-7xl mx-auto py-10 px-6">
                {children}
              </div>
            </main>
            <LayoutFooter />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
