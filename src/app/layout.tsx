import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ThemeProvider } from "@/components/Theme-Provider";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/ui/SideBar";
import UIProvider from "@/context/ui/ProviderUi";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dashboard of Products",
  description: "Dashboard of Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UIProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-full h-screen flex">
              <SideBar />
              <main className="grow h-full overflow-y-auto ">
                <Navbar />
                <div className="p-4">
                  {children}
                </div>
              </main>
            </div>
          </ThemeProvider>
        </UIProvider>
      </body>
    </html>
  );
}
