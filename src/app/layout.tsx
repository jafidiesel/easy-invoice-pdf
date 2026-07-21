import { DeviceContextProvider } from "@/contexts/device-context";
import { checkDeviceUserAgent } from "@/lib/check-device.server";
import { ResponsiveIndicator } from "@/components/dev/responsive-indicator";

import type { Metadata, Viewport } from "next";

import { Toaster } from "sonner";

import { STATIC_ASSETS_URL } from "@/config";

import "./globals.css";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export const viewport: Viewport = {
  initialScale: 1, // Sets the default zoom level to 1 (100%)
  width: "device-width", // Ensures the viewport width matches the device's screen width
  maximumScale: 1, // Prevents users from zooming in
  viewportFit: "cover", // Enables edge-to-edge content display on devices with rounded corners (like iPhones with a notch)
};

export const metadata: Metadata = {
  title: "Create Invoice — EasyInvoicePDF",
  description:
    "Create and download professional invoices instantly. Free and open-source.",
  icons: {
    icon: [
      {
        url: `${STATIC_ASSETS_URL}/favicon.ico`,
      },
      {
        url: `${STATIC_ASSETS_URL}/icon.png`,
        type: "image/png",
        sizes: "96x96",
      },
    ],
    apple: [
      {
        url: `${STATIC_ASSETS_URL}/apple-icon.png`,
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    isDesktop: isDesktopServer,
    isAndroid,
    isMobile,
    inAppInfo,
  } = await checkDeviceUserAgent();

  return (
    <html lang="en">
      <body>
        <DeviceContextProvider
          isDesktop={isDesktopServer}
          isAndroid={isAndroid}
          isMobile={isMobile}
          inAppInfo={inAppInfo}
        >
          {children}

          {/* https://sonner.emilkowal.ski/ */}
          <Toaster visibleToasts={1} richColors closeButton />
          {/* show responsive indicator(tailwind breakpoint) for debugging responsive designs */}
          {process.env.NODE_ENV === "development" ? (
            <ResponsiveIndicator />
          ) : null}
        </DeviceContextProvider>
      </body>
    </html>
  );
}
