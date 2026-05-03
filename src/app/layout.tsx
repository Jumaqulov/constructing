import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "BuildCraft Construction | Quality Building Services",
  description:
    "Premium construction services for residential and commercial projects. Over 20 years of experience building excellence. Get your free quote today.",
  keywords: "construction, building, renovation, commercial, residential, contractor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", inter.variable)}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
