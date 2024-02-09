import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ReduxProviders } from "./redux/ReduxProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "M360 ICT TASk",
  description: "created by sihab hossain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="light" lang="en">
      <body className={inter.className}>
        <Providers>
          <ReduxProviders>{children}</ReduxProviders>
        </Providers>
      </body>
    </html>
  );
}
