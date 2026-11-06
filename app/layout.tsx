import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hireloop — Find your next opportunity",
  description:
    "Discover jobs, connect with companies, and take the next step in your career with Hireloop.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#141414",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${manrope.variable} ${spaceMono.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
