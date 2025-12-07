import {ReactNode} from "react";
import type { Metadata } from "next";

import { GeistSans } from 'geist/font/sans';
import "./globals.css";

import { defaultMetadata } from "@/constants/metadata";
export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={GeistSans.className}>
                {children}
            </body>
        </html>
    );
}
