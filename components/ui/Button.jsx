"use client";

import Link from "next/link";

export default function Button({
  children,
  href,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) {
  const baseClasses = `inline-block text-center px-6 py-2 rounded-none
 text-white font-medium text-sm 
    bg-orange-500 hover:bg-black transition-colors duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed`;

  if (href) {
    return (
      <Link href={href} passHref>
        <span className={`${baseClasses} ${className}`}>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
}
