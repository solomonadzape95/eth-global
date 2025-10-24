import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import localFont from 'next/font/local'
 
const myFont = localFont({
  src: '../fonts/Satoshi-Regular.woff',
})

export const metadata: Metadata = {
  title: "Keystone",
  description: "Verify once, Login anywhere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${myFont.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
