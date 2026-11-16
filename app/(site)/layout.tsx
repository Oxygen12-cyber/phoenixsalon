import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { SITE_URL } from "@/lib/site";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Phoenix Salon",
  description:
    "A Liverpool hair studio for braids, wig installs and hair extensions.",
  image: `${SITE_URL}/assets/hero1.png`,
  url: SITE_URL,
  telephone: `+${WHATSAPP_NUMBER}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "St Johns Shopping Centre",
    addressLocality: "Liverpool",
    postalCode: "L1 1LY",
    addressCountry: "GB",
  },
  areaServed: "Liverpool",
  sameAs: [
    "https://www.instagram.com/yvonnelewis2325",
    "https://www.tiktok.com/@phoenixbyyvonne",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday"],
      opens: "14:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:00",
      closes: "17:00",
    },
  ],
};

const SiteLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default SiteLayout;
