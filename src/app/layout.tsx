import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netflix Clone",
  description:
    "Watch your favorite movies and TV shows - Stream unlimited entertainment",
  keywords: "netflix, movies, tv shows, streaming, entertainment",
  authors: [{ name: "Netflix Clone" }],
  creator: "Netflix Clone App",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon.png", sizes: "800x800", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "800x800", type: "image/png" }],
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="#E50914"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #E50914,0 0 5px #E50914"
        />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
