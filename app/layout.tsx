import "@/src/styles/global.scss";
import type { Metadata } from "next";
import HeaderClient from "@/src/components/global/HeaderClient";
import Footer from "@/src/components/global/Footer";
import Favicon from "@/src/components/global/Favicon";
import GTM from "@/src/components/analytics/GTM";
import CookieConsentBanner from "@/src/components/analytics/CookieConsent";

export const metadata: Metadata = {
  title: "My Client Site",
  description: "Next.js + Sanity powered website",
  openGraph: {
    title: "Welcome to The Nomas Club",
    description: "We are Bali's fastest growing community with over 500+ members worldwide. Built around movement, mindset and meaning for those who want more out of life.",
    url: "https://www.thenomasclub.com",
    siteName: "The Nomas Club",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
}



export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/xdt4hxj.css" />
        <Favicon />
      </head>
      <body>
        <GTM gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
        <HeaderClient />
          <main>{children}</main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  )
}
