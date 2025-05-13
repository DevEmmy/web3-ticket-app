import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import  { Wallet } from "@/context/WalletProvider";
import Footer from "@/components/widgets/Footer";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { AnchorLayoutProvider } from "@/context/AnchorProvider";
import { WalletContextProvider } from "@/context/WalletContextProvider";
import { QueryProvider } from '../providers/QueryProvider'

const spaceGro = Space_Grotesk({
  variable: "--font-space-gro",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dmSans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventFi", 
  description: "EventFi is a Web3-powered ticket platform that allows you to create, manage, and sell tickets to your events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${spaceGro.variable} ${dmSans.variable} antialiased`}
      >
        <QueryProvider>
          <Wallet>
            <WalletContextProvider>
              <Toaster />
              {children}
            </WalletContextProvider>
          </Wallet>
        </QueryProvider>
      </body>
    </html>
  );
}
