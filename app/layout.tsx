import type { Metadata } from "next";
import {
  ClerkProvider,
  ClerkLoaded,
} from '@clerk/nextjs'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@components/theme-provider";
import {Toaster} from "@components/ui/sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rivine Gateway Manager",
  description: "Seamlessly orchestrate and manage multiple API gateways across platforms with a federated architecture designed for flexibility and scalability",
};

const HEADER_HEIGHT = "4rem";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <ClerkProvider>
        <html lang="en">
          <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
              style={
                {
                  "--header-height": HEADER_HEIGHT,
                } as React.CSSProperties
              }
          >
          <ClerkLoaded>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ClerkLoaded>
          <Toaster richColors />
          </body>
        </html>
      </ClerkProvider>
  );
}
