import "./globals.css";

import type { Metadata } from "next";
import { Provider } from "./provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "بانک قرض الحسنه مهر ایران",
        template: "%s | بانک قرض الحسنه مهر ایران",
    },
    description: "Created By ADA Group",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa-ir">
            <body className={`${inter.className}`}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
