import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Efla | Logistics Ecommerce & Printing Services",
  description: "Efla, We are the best Logistics, Courier, Ecommerce & Printing Service Provider",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased`}>{children}</body>
    </html>
  );
}
