import type { Metadata } from "next";
import { Bree_Serif, Lato } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/motion-provider";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

const breeSerif = Bree_Serif({
  variable: "--bree",
  subsets: ["latin"],
  weight: "400",
});

const lato = Lato({
  variable: "--lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Phoenix Salon | Hair Stylist & Extensions in Liverpool",
    template: "%s | Phoenix Salon",
  },
  description:
    "Phoenix Salon is a Liverpool hair studio for braids, wig installs and hair extensions. Tension-free styling, premium hair and easy WhatsApp booking.",
  applicationName: "Phoenix Salon",
  authors: [{ name: "Phoenix Salon", url: SITE_URL }],
  creator: "Phoenix Salon",
  publisher: "Phoenix Salon",
  category: "beauty",
  keywords: [
    "Phoenix Salon",
    "hair salon Liverpool",
    "hair stylist Liverpool",
    "braids Liverpool",
    "wig installs Liverpool",
    "hair extensions Liverpool",
    "St Johns Shopping Centre",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Phoenix Salon",
    title: "Phoenix Salon | Hair Stylist & Extensions in Liverpool",
    description:
      "A Liverpool hair studio for braids, wig installs and hair extensions. Tension-free styling, premium hair and easy WhatsApp booking.",
    images: [
      {
        url: "/phoenix_shop.jpeg",
        width: 1029,
        height: 557,
        alt: "Hair styled at Phoenix Salon in Liverpool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phoenix Salon | Hair Stylist & Extensions in Liverpool",
    description:
      "A Liverpool hair studio for braids, wig installs and hair extensions.",
    images: ["/phoenix_shop.jpeg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${breeSerif.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
