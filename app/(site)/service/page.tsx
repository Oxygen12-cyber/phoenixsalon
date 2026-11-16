import type { Metadata } from "next";
import ServiceSection from "@/components/service-section";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Book braids, wig installs, wash-and-styles and hair extensions at Phoenix Salon in Liverpool. Shop our hair or book installation and styling.",
  alternates: { canonical: "/service" },
};

const ServicePage = async () => {
  const [hairstyles, extensions] = await Promise.all([
    getProductsByCategory("hairstyle"),
    getProductsByCategory("extension"),
  ]);

  return (
    <div className="w-full">
      {/* intro */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center sm:py-20">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#80726D]">
            What we offer
          </span>
          <h1 className="text-4xl font-bold text-black sm:text-5xl">
            Our Services
          </h1>
          <p className="max-w-xl text-sm font-light text-[#6B6560] sm:text-base">
            Book a hairstyle, or shop and book styling for your extensions — then
            confirm in a quick WhatsApp message.
          </p>
        </div>
      </section>

      <ServiceSection
        id="hairstyles"
        eyebrow="Book an appointment"
        title="Hairstyles"
        description="Pick your style and book it in a message. Not sure? Send a photo and we'll guide you."
        products={hairstyles}
        ctaLabel="Book appointment"
        message="Hi Phoenix Salon, I'd like to book a hairstyle appointment."
        layout="grid"
      />

      <ServiceSection
        id="extensions"
        tint
        eyebrow="Buy or book styling"
        title="Extensions"
        description="Shop our extensions, or book us to install and style them for you."
        products={extensions}
        ctaLabel="Book appointment"
        message="Hi Phoenix Salon, I'd like to buy or book styling for hair extensions."
        layout="scroll"
        sizes="(max-width: 640px) 68vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );
};

export default ServicePage;
