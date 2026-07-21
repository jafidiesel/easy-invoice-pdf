import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// NOTE: this app is statically exported (output: "export" in next.config.mjs)
// and served by a plain web server (no Node.js runtime), so there is no
// server to read env vars at request time. These must be NEXT_PUBLIC_* vars,
// which Next.js inlines as literal values into the client JS bundle at
// `next build` time (see src/app/(app)/page.client.tsx, which seeds
// localStorage from them on first load).
export const env = createEnv({
  client: {
    // Preloaded seller data used to seed a fresh invoice
    NEXT_PUBLIC_SELLER_NAME: z.string().optional(),
    NEXT_PUBLIC_SELLER_ADDRESS: z.string().optional(),
    NEXT_PUBLIC_SELLER_VAT_NO: z.string().optional(),
    NEXT_PUBLIC_SELLER_EMAIL: z.string().email().optional().or(z.literal("")),
    NEXT_PUBLIC_SELLER_ACCOUNT_NUMBER: z.string().optional(),
    NEXT_PUBLIC_SELLER_SWIFT_BIC: z.string().optional(),

    // Preloaded buyer data used to seed a fresh invoice
    NEXT_PUBLIC_BUYER_NAME: z.string().optional(),
    NEXT_PUBLIC_BUYER_ADDRESS: z.string().optional(),
    NEXT_PUBLIC_BUYER_VAT_NO: z.string().optional(),
    NEXT_PUBLIC_BUYER_EMAIL: z.string().email().optional().or(z.literal("")),

    // Preloaded default price for the first invoice item
    NEXT_PUBLIC_INVOICE_NET_PRICE: z.string().optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SELLER_NAME: process.env.NEXT_PUBLIC_SELLER_NAME,
    NEXT_PUBLIC_SELLER_ADDRESS: process.env.NEXT_PUBLIC_SELLER_ADDRESS,
    NEXT_PUBLIC_SELLER_VAT_NO: process.env.NEXT_PUBLIC_SELLER_VAT_NO,
    NEXT_PUBLIC_SELLER_EMAIL: process.env.NEXT_PUBLIC_SELLER_EMAIL,
    NEXT_PUBLIC_SELLER_ACCOUNT_NUMBER:
      process.env.NEXT_PUBLIC_SELLER_ACCOUNT_NUMBER,
    NEXT_PUBLIC_SELLER_SWIFT_BIC: process.env.NEXT_PUBLIC_SELLER_SWIFT_BIC,

    NEXT_PUBLIC_BUYER_NAME: process.env.NEXT_PUBLIC_BUYER_NAME,
    NEXT_PUBLIC_BUYER_ADDRESS: process.env.NEXT_PUBLIC_BUYER_ADDRESS,
    NEXT_PUBLIC_BUYER_VAT_NO: process.env.NEXT_PUBLIC_BUYER_VAT_NO,
    NEXT_PUBLIC_BUYER_EMAIL: process.env.NEXT_PUBLIC_BUYER_EMAIL,

    NEXT_PUBLIC_INVOICE_NET_PRICE: process.env.NEXT_PUBLIC_INVOICE_NET_PRICE,
  },
});
