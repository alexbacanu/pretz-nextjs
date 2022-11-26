import { Inter } from "@next/font/google";
import UIFooter from "ui/UIFooter";
import UIHeader from "ui/UIHeader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="flex flex-col">
        <UIHeader />
        <main className="mx-auto min-h-screen w-full max-w-[1920px] p-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <UIFooter />
      </body>
    </html>
  );
}
