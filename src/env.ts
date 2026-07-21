import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Preloaded seller data used to seed a fresh invoice (see src/app/(app)/page.tsx)
    SELLER_NAME: z.string().optional(),
    SELLER_ADDRESS: z.string().optional(),
    SELLER_VAT_NO: z.string().optional(),
    SELLER_EMAIL: z.string().email().optional().or(z.literal("")),
    SELLER_ACCOUNT_NUMBER: z.string().optional(),
    SELLER_SWIFT_BIC: z.string().optional(),

    // Preloaded buyer data used to seed a fresh invoice
    BUYER_NAME: z.string().optional(),
    BUYER_ADDRESS: z.string().optional(),
    BUYER_VAT_NO: z.string().optional(),
    BUYER_EMAIL: z.string().email().optional().or(z.literal("")),

    // Preloaded default price for the first invoice item
    INVOICE_NET_PRICE: z.string().optional(),
  },
  runtimeEnv: {
    SELLER_NAME: process.env.SELLER_NAME,
    SELLER_ADDRESS: process.env.SELLER_ADDRESS,
    SELLER_VAT_NO: process.env.SELLER_VAT_NO,
    SELLER_EMAIL: process.env.SELLER_EMAIL,
    SELLER_ACCOUNT_NUMBER: process.env.SELLER_ACCOUNT_NUMBER,
    SELLER_SWIFT_BIC: process.env.SELLER_SWIFT_BIC,

    BUYER_NAME: process.env.BUYER_NAME,
    BUYER_ADDRESS: process.env.BUYER_ADDRESS,
    BUYER_VAT_NO: process.env.BUYER_VAT_NO,
    BUYER_EMAIL: process.env.BUYER_EMAIL,

    INVOICE_NET_PRICE: process.env.INVOICE_NET_PRICE,
  },
});
