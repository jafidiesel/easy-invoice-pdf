/**
 * STATIC_ASSETS_URL is used to serve static assets for the PDF templates
 */
export const STATIC_ASSETS_URL = "https://static.easyinvoicepdf.com";

/**
 * YouTube URL for main demo video in the "How it works" dialog
 */
export const VIDEO_DEMO_YOUTUBE_URL =
  "https://www.youtube.com/embed/iAROeCIcZ40?si=EyJKCsUr43Z8zY1f";

export const YOUTUBE_VIDEO_HOW_TO_ADD_SELLER =
  "https://www.youtube.com/embed/xfSF35c0vfU";

const YOUTUBE_VIDEO_HOW_TO_ADD_BUYER =
  "https://www.youtube.com/embed/XxAY0YGgXIk";

const YOUTUBE_VIDEO_HOW_TO_ADD_INVOICE_FOR_ONE_WEEK =
  "https://www.youtube.com/embed/6KzDBBiAJmg";

/**
 * Video catalog for the "How it works" dialog
 */
export const HOW_IT_WORKS_VIDEOS = [
  {
    id: "overview",
    tabLabel: "Overview",
    tabLabelShort: "Overview",
    title: "How EasyInvoicePDF Works",
    description: "Learn how to create and customize your invoices.",
    embedUrl: VIDEO_DEMO_YOUTUBE_URL,
    watchUrl: "https://www.youtube.com/watch?v=iAROeCIcZ40",
    iframeTitle: "EasyInvoicePDF Demo Video",
  },
  {
    id: "add-seller",
    tabLabel: "Add seller",
    tabLabelShort: "Seller",
    title: "How to add a seller",
    description: "Save seller details and reuse them on future invoices.",
    embedUrl: YOUTUBE_VIDEO_HOW_TO_ADD_SELLER,
    watchUrl: "https://www.youtube.com/watch?v=xfSF35c0vfU",
    iframeTitle: "How to add a seller - EasyInvoicePDF",
  },
  {
    id: "add-buyer",
    tabLabel: "Add buyer",
    tabLabelShort: "Buyer",
    title: "How to add a buyer",
    description: "Save buyer details and reuse them on future invoices.",
    embedUrl: YOUTUBE_VIDEO_HOW_TO_ADD_BUYER,
    watchUrl: "https://www.youtube.com/watch?v=XxAY0YGgXIk",
    iframeTitle: "How to add a buyer - EasyInvoicePDF",
  },
  {
    id: "weekly-invoices",
    tabLabel: "Weekly invoices",
    tabLabelShort: "Weekly",
    title: "How to create invoices for one week",
    description: "Learn how to generate invoices for a week of work.",
    embedUrl: YOUTUBE_VIDEO_HOW_TO_ADD_INVOICE_FOR_ONE_WEEK,
    watchUrl: "https://www.youtube.com/watch?v=6KzDBBiAJmg",
    iframeTitle: "How to create weekly invoices - EasyInvoicePDF",
  },
] as const satisfies {
  id: string;
  tabLabel: string;
  tabLabelShort: string;
  title: string;
  description: string;
  embedUrl: string;
  watchUrl: string;
  iframeTitle: string;
}[];

export const GITHUB_URL = "https://github.com/VladSez/easy-invoice-pdf";

export const BUG_REPORT_URL =
  "https://pdfinvoicegenerator.userjot.com/board/bugs";

export const CONTACT_SUPPORT_EMAIL = "vlad@mail.easyinvoicepdf.com";

/**
 * Fonts that we use to render invoice pdf templates via `@react-pdf/renderer`
 */
export const INVOICE_PDF_FONTS = {
  DEFAULT_TEMPLATE: {
    OPEN_SANS_REGULAR: `${STATIC_ASSETS_URL}/open-sans-regular.ttf`,
    OPEN_SANS_700: `${STATIC_ASSETS_URL}/open-sans-700.ttf`,
  },
  STRIPE_TEMPLATE: {
    INTER_REGULAR: `${STATIC_ASSETS_URL}/Inter-Regular.ttf`,
    INTER_MEDIUM: `${STATIC_ASSETS_URL}/Inter-Medium.ttf`,
    INTER_SEMIBOLD: `${STATIC_ASSETS_URL}/Inter-SemiBold.ttf`,
  },
} as const satisfies Record<
  "DEFAULT_TEMPLATE" | "STRIPE_TEMPLATE",
  { [key: string]: string }
>;
