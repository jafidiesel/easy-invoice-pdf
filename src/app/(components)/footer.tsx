import { ProjectLogo } from "@/components/etc/project-logo";
import { GITHUB_URL } from "@/config";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <ProjectLogo className="size-6" />
          <p className="text-sm font-semibold text-slate-800">EasyInvoicePDF</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()}</p>
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
