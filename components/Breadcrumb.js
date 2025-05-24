"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <span className="mx-1">/</span>
        </li>
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center">
            <Link
              href={c.href}
              className={`hover:underline ${
                i === crumbs.length - 1
                  ? "font-semibold text-black"
                  : "text-blue-600"
              }`}
            >
              {c.label}
            </Link>
            {i < crumbs.length - 1 && <span className="mx-1">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
