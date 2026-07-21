import type { Metadata } from "next";
import { AppPageClient } from "./page.client";

export const metadata: Metadata = {
  title: "Create Invoice — EasyInvoicePDF",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppPage() {
  return <AppPageClient />;
}
