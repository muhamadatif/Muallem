import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/providers";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap", weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Mudaris — Connect Schools with Teachers in Egypt",
  description: "Mudaris helps private schools, colleges and nurseries in Cairo & Giza find qualified teachers across all years. Teachers register free.",
  metadataBase: new URL("https://mudaris.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
