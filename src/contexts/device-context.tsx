"use client";

import { useIsDesktop } from "@/hooks/use-media-query";
import { checkDeviceUserAgent, type InAppInfo } from "@/lib/check-device";
import { createContext, useContext, useEffect, useState } from "react";

interface DeviceContextType {
  isDesktop: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  inAppInfo: InAppInfo;
  /**
   * we use this when generating the invoice link, to show navigagor.share or copy to clipboard
   */
  isUADesktop: boolean;
}

const DEFAULT_DEVICE_STATE = {
  isDesktop: true,
  isAndroid: false,
  isMobile: false,
  inAppInfo: { isInApp: false, name: null } satisfies InAppInfo,
};

const DeviceContext = createContext<DeviceContextType | null>(null);

export function useDeviceContext() {
  const context = useContext(DeviceContext);

  if (!context) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
}

export function DeviceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // we use this to show either desktop or mobile (tabs) UI
  const [isDesktopClient, setIsDesktopClient] = useState(
    DEFAULT_DEVICE_STATE.isDesktop,
  );
  const [isAndroid, setIsAndroid] = useState(DEFAULT_DEVICE_STATE.isAndroid);
  const [isMobile, setIsMobile] = useState(DEFAULT_DEVICE_STATE.isMobile);
  const [inAppInfo, setInAppInfo] = useState<InAppInfo>(
    DEFAULT_DEVICE_STATE.inAppInfo,
  );

  // we use this when generating the invoice link, to show navigagor.share or copy to clipboard
  const [isUADesktop, setIsUADesktop] = useState(
    DEFAULT_DEVICE_STATE.isDesktop,
  );

  // Check media query on client side as an additional check
  const isMediaQueryDesktop = useIsDesktop();

  // Detect device/UA info on mount (client-only: reads navigator.userAgent)
  useEffect(() => {
    const detected = checkDeviceUserAgent();

    setIsDesktopClient(detected.isDesktop);
    setIsAndroid(detected.isAndroid);
    setIsMobile(detected.isMobile);
    setInAppInfo(detected.inAppInfo);
    setIsUADesktop(detected.isDesktop);
  }, []);

  /**
   * Update the client state if the media query is defined
   * This is to ensure that the client state is always up to date, we use this to show either desktop or mobile (tabs) UI
   */
  useEffect(() => {
    if (isMediaQueryDesktop !== undefined) {
      setIsDesktopClient(isMediaQueryDesktop);
    }
  }, [isMediaQueryDesktop]);

  return (
    <DeviceContext.Provider
      value={{
        isDesktop: isDesktopClient,
        isAndroid,
        isMobile,
        inAppInfo,
        /**
         * we use this when generating the invoice link, to show navigagor.share or copy to clipboard
         */
        isUADesktop,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}
