import type { Metadata } from "next";
import { Poppins, Antonio } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TheDreamUni | Study Abroad AI Advisor",
  description: "Find your dream university with AI-powered guidance and a fresh student-first perspective.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${poppins.variable} ${antonio.variable} antialiased min-h-screen bg-[#030014] font-sans`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
