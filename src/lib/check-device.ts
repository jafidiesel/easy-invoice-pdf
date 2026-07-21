import { UAParser } from "ua-parser-js";

export interface InAppInfo {
  isInApp: boolean;
  name: string | null;
}

/**
 * Simplified in-app browser detection with detailed app identification.
 *
 * Note: this only inspects the user-agent string (client-side), since the
 * `X-Requested-With` header some in-app browsers send isn't readable from
 * client-side JS. This is a static export app (no server), so header-based
 * detection isn't available.
 */
function detectInAppBrowser(ua: string): InAppInfo {
  const s = ua.toLowerCase();

  function has(token: string): boolean {
    return s.includes(token);
  }

  function ios(): boolean {
    return /iphone|ipad|ipod/.test(s);
  }

  const uaDetectors = [
    {
      name: "Facebook",
      test: () => has("fbav") || has("fban") || has("fb_iab"),
    },
    { name: "Instagram", test: () => has("instagram") },
    {
      name: "Facebook Messenger",
      test: () =>
        has("fban/messengerforio") ||
        has("messengerforio") ||
        has("fb_iab/messenger") ||
        (has("messenger") && (has("fban") || has("fb_iab"))),
    },
    { name: "WhatsApp", test: () => has("whatsapp") },
    {
      name: "Telegram",
      test: () =>
        has("telegram") ||
        has("tgwebview") ||
        has("telegrambot-like") ||
        has("tgbot") ||
        has("telegram-") ||
        has("telegrambot") ||
        has("telegram/") ||
        (ios() && (has("telegram") || has("tg/"))) ||
        (has("android") && has("tg")),
    },
    { name: "Twitter/X", test: () => has("twitter") || has("x-client") },
    { name: "LinkedIn", test: () => has("linkedinapp") },
    { name: "Pinterest", test: () => has("pinterest") },
    { name: "Reddit", test: () => has("reddit") },
    { name: "Snapchat", test: () => has("snapchat") },
    { name: "TikTok", test: () => has("tiktok") || has("com.zhiliaoapp") },
    { name: "WeChat", test: () => has("micromessenger") },
    { name: "LINE", test: () => has("line/") },
    { name: "QQ", test: () => has("qq/") },
    { name: "Gmail", test: () => has("gmail") },
    { name: "Google App", test: () => has("gsa/") || has("googleapp") },
    { name: "Discord", test: () => has("discord") },
    { name: "YouTube", test: () => has("youtube") },
    { name: "Android WebView", test: () => has("wv") && has("android") },
    {
      name: "iOS WebView",
      test: () =>
        ios() &&
        has("applewebkit") &&
        !has("safari") &&
        !has("crios") &&
        !has("fxios") &&
        !has("edgios"),
    },
    {
      name: "Generic WebView",
      test: () =>
        (has("android") && has("webview")) ||
        (has("mobile safari") && !has("safari")),
    },
  ];

  for (const detector of uaDetectors) {
    try {
      if (detector.test()) return { isInApp: true, name: detector.name };
    } catch {
      // ignore failing tests
    }
  }

  return { isInApp: false, name: null };
}

/**
 * Detects device type and in-app browser info from the client-side user-agent.
 * @warning **Should only be used on the client** (reads `navigator.userAgent`)
 */
export function checkDeviceUserAgent() {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : undefined;

  const parser = new UAParser(ua || "");

  const device = parser.getDevice();
  const os = parser.getOS();

  // Detect tablets specifically
  const isTablet =
    device.type === "tablet" ||
    // iPad on iOS 13+ reports as desktop
    (os.name === "iOS" && !ua?.includes("iPhone") && !ua?.includes("iPod"));

  // Detect mobile phones
  const isMobile = device.type === "mobile";

  // Detect Android specifically
  const isAndroid = os.name === "Android";

  // Detect in-app browsers/WebViews with detailed app identification
  const inAppInfo = detectInAppBrowser(ua || "");

  // Desktop is when it's neither tablet nor mobile
  const isDesktop = !isTablet && !isMobile;

  return {
    isDesktop,
    isAndroid,
    isMobile,
    inAppInfo,
  };
}
