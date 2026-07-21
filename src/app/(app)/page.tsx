import type { Metadata } from "next";
import { AppPageClient } from "./page.client";
import type { InvoiceEnvDefaults } from "@/app/constants";
import { env } from "@/env";

export const metadata: Metadata = {
  title: "Create Invoice — EasyInvoicePDF",
  robots: {
    index: false,
    follow: false,
  },
};

function getInvoiceEnvDefaults(): InvoiceEnvDefaults {
  const seller = {
    ...(env.SELLER_NAME && { name: env.SELLER_NAME }),
    ...(env.SELLER_ADDRESS && { address: env.SELLER_ADDRESS }),
    ...(env.SELLER_VAT_NO && { vatNo: env.SELLER_VAT_NO }),
    ...(env.SELLER_EMAIL && { email: env.SELLER_EMAIL }),
    ...(env.SELLER_ACCOUNT_NUMBER && {
      accountNumber: env.SELLER_ACCOUNT_NUMBER,
    }),
    ...(env.SELLER_SWIFT_BIC && { swiftBic: env.SELLER_SWIFT_BIC }),
  };

  const buyer = {
    ...(env.BUYER_NAME && { name: env.BUYER_NAME }),
    ...(env.BUYER_ADDRESS && { address: env.BUYER_ADDRESS }),
    ...(env.BUYER_VAT_NO && { vatNo: env.BUYER_VAT_NO }),
    ...(env.BUYER_EMAIL && { email: env.BUYER_EMAIL }),
  };

  const itemNetPrice = env.INVOICE_NET_PRICE
    ? Number(env.INVOICE_NET_PRICE)
    : undefined;

  return {
    ...(Object.keys(seller).length > 0 && { seller }),
    ...(Object.keys(buyer).length > 0 && { buyer }),
    ...(itemNetPrice !== undefined &&
      !Number.isNaN(itemNetPrice) && { itemNetPrice }),
  };
}

export default function AppPage() {
  return <AppPageClient envDefaults={getInvoiceEnvDefaults()} />;
}
