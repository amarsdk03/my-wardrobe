import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "myWardrobe",
  description: "A simple, quick, modern webapp to catalogue and organize digitally your clothes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
