"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = decodeURIComponent(seg).replace(/-/g, " ");
    return { href, label };
  });

  return (
    <div
      className="w-full px-4 sm:px-6 py-2 mb-6 rounded-xl backdrop-blur-md overflow-x-auto"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-2 text-base sm:text-lg text-gray-700 whitespace-nowrap">
        <li className="flex items-center">
          <Link
            href="/"
            className="text-orange-600 font-medium hover:underline hover:text-orange-500 transition-colors"
          >
            Home
          </Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              href={c.href}
              className={`transition-colors ${
                i === crumbs.length - 1
                  ? "text-gray-900 font-semibold"
                  : "text-orange-600 hover:text-orange-500 hover:underline"
              }`}
              scroll={false}
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
