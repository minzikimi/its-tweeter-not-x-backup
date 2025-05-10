"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();

  const tabClass = (active: boolean) =>
    `flex-1 flex flex-col items-center py-2 mx-2 rounded-md font-semibold transition-colors
     ${active ? "text-[#68d9c6]" : "text-white"}`;

  return (
    <div className="bg-neutral-900 fixed bottom-0 w-full flex px-6 py-3 border-t border-neutral-700 z-50">
      <Link href="/" className={tabClass(pathname === "/")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-4 0h4"
          />
        </svg>
        Home
      </Link>
      <Link href="/search" className={tabClass(pathname === "/search")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
        </svg>
        Search
      </Link>
      <Link href="/profile" className={tabClass(pathname === "/profile")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Profile
      </Link>
    </div>
  );
}
