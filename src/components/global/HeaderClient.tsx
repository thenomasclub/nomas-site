"use client";

import { usePathname } from "next/navigation";
import Header from "@/src/components/global/Header"; // adjust import if needed

export default function HeaderClient() {
  const pathname = usePathname() || "";

  // Hide header for anything under /studio
  if (pathname.startsWith("/studio")) return null;

  return <Header />;
}
