// @ts-check

import { createJiti } from "jiti";
import { fileURLToPath } from "node:url";

const loadTsFileViaJiti = createJiti(fileURLToPath(import.meta.url));

// Import ENV file here to validate during build. Using jiti@^1 we can import .ts files :)
loadTsFileViaJiti("./src/env");

// Validates our custom translations object against the schema, that is used to translate PDF fields, invoice items table, etc.
async function validateInvoicePDFTranslationFiles() {
  try {
    // @ts-ignore
    const { invoicePDFtranslationsSchema, INVOICE_PDF_TRANSLATIONS } =
      await loadTsFileViaJiti.import(
        "./src/app/(app)/pdf-i18n-translations/pdf-translations.ts",
      );

    const result = invoicePDFtranslationsSchema.safeParse(
      INVOICE_PDF_TRANSLATIONS,
    );

    if (!result.success) {
      console.error("❌ Invalid translations:", result.error.message);
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error validating translations:", error);
    process.exit(1);
  }
}

validateInvoicePDFTranslationFiles().catch((error) => {
  console.error("❌ Fatal error during validation:", error);
  process.exit(1);
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: produces plain HTML/CSS/JS in `out/`, served by Apache (no Node.js runtime)
  // https://nextjs.org/docs/app/guides/static-exports
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.VERCEL_ENV === "production",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
