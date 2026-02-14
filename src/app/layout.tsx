import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Everyone Who Codes | Elite Tech Interview Workshop",
  description: "Master tech interviews in the age of AI. Elite preparation for the modern software engineer. Practical tactics, zero fluff.",
  keywords: ["tech interview", "AI interviews", "software engineering", "career coaching", "EWC workshop"],
  authors: [{ name: "Everyone Who Codes" }],
  openGraph: {
    title: "Everyone Who Codes | Elite Tech Interview Workshop",
    description: "Master tech interviews in the age of AI. Elite preparation for the modern software engineer.",
    url: "https://everyonewhocode.com",
    siteName: "Everyone Who Codes",
    images: [
      {
        url: "https://everyonewhocode.com/wp-content/uploads/2024/10/EWC_logo1_9_28-removebg-preview-e1727628932676.png.webp",
        width: 1200,
        height: 630,
        alt: "Everyone Who Codes Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Everyone Who Codes | Elite Tech Interview Workshop",
    description: "Master tech interviews in the age of AI.",
    images: ["https://everyonewhocode.com/wp-content/uploads/2024/10/EWC_logo1_9_28-removebg-preview-e1727628932676.png.webp"],
  },
  icons: {
    icon: "https://everyonewhocode.com/wp-content/uploads/2024/10/EWC_logo1_9_28-removebg-preview-e1727628932676.png.webp",
    shortcut: "https://everyonewhocode.com/wp-content/uploads/2024/10/EWC_logo1_9_28-removebg-preview-e1727628932676.png.webp",
    apple: "https://everyonewhocode.com/wp-content/uploads/2024/10/EWC_logo1_9_28-removebg-preview-e1727628932676.png.webp",
  },
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
        {children}
      </body>
    </html>
  );
}
