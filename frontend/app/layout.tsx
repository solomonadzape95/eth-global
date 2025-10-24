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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/manifest.json'
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
