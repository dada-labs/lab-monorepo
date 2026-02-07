import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import LayoutFooter from "@/components/layout/Footer";
import LayoutHeader from "@/components/layout/HeaderUi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dada Lab | 개발·프로젝트 아카이빙",
  description: "다다랩은 개발 관련 문서 및 프로젝트를 기록합니다.",
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
      </body>
    </html>
  );
}
