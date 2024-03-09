import { auth } from "@/auth";
import BackToTopButton from "@/components/back-button";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { EdgeStoreProvider } from "../lib/edgestore";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#EA3C12",
};

export const metadata: Metadata = {
  title: "Bloggie",
  manifest: "/manifest.json",
  description: "This is where you main meta description goes",
  keywords: [""], //Add keywords depending on the content of your blog
};

const thicccboi = localFont({
  src: [
    {
      path: "../public/fonts/THICCCBOI-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-thicccboi",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={thicccboi.className}>
          <EdgeStoreProvider>
            {/* Next top loader: Appears at the top of the page on page transition */}
            <NextTopLoader color="#EA3C12" />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="bloggie-theme"
            >
              {children}
              <BackToTopButton />
              <Toaster
                toastOptions={{
                  className: "bg-white dark:bg-gray-700 dark:text-gray-200",
                  duration: 3000,
                }}
              />
            </ThemeProvider>
          </EdgeStoreProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
