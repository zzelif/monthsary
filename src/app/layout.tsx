import type { Metadata } from "next";
import { Geist, Geist_Mono, Indie_Flower } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";

const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-indie-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Many more to come",
  description: "2nd monthsary for us, adi. I love you so much",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-touch touch">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${indieFlower.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
