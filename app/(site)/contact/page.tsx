import type { Metadata } from "next";
import Link from "next/link";
import {
  ClockIcon,
  InfoIcon,
  InstagramLogoIcon,
  MapPinIcon,
  TiktokLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion-utils";
import ContactForm from "@/components/contact-form";
import { WHATSAPP_NUMBER, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Phoenix Salon in Liverpool — message us on WhatsApp, find the studio at St Johns Shopping Centre, or send us a note.",
  alternates: { canonical: "/contact" },
};

const socials = [
  {
    label: "WhatsApp",
    href: waLink("Hi Phoenix Salon, I'd like to book an appointment."),
    icon: <WhatsappLogoIcon size={20} weight="fill" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/yvonnelewis2325",
    icon: <InstagramLogoIcon size={20} weight="fill" />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@phoenixbyyvonne",
    icon: <TiktokLogoIcon size={20} weight="regular" />,
  },
];

const ContactPage = () => {
  return (
    <div className="w-full">
      {/* hero */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center sm:py-20">
          <Reveal y={30}>
            <h1 className="text-4xl font-bold text-black sm:text-5xl">
              Let&apos;s get you booked
            </h1>
          </Reveal>
          <Reveal y={30}>
            <p className="max-w-xl text-sm font-light text-[#6B6560] sm:text-base">
              Questions about a style, or ready to lock in a slot? Send us a
              message with your preferred style and date, and we&apos;ll reply
              on WhatsApp.
            </p>
          </Reveal>
          <Reveal y={24}>
            <Link
              href={waLink("Hi Phoenix Salon, I'd like to book an appointment.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-black px-7 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <WhatsappLogoIcon size={18} weight="fill" />
              Message on WhatsApp
            </Link>
          </Reveal>
        </div>
      </section>

      {/* info + form */}
      <section className="bg-[#F7EBE7]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-12">
          {/* details */}
          <div className="flex flex-col gap-6">
            <Reveal y={30}>
              <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7EBE7] text-black">
                  <MapPinIcon size={22} weight="bold" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-black">
                    Visit the studio
                  </h2>
                  <p className="mt-1 text-sm font-light text-[#6B6560]">
                    HAIR EXTENSIONS AND STYLING
                    <br />
                    St Johns Shopping Centre
                    <br />
                    Liverpool, L1 1LY, UK
                  </p>
                  <Link
                    href="https://www.google.com/maps/search/?api=1&query=St+Johns+Shopping+Centre+Liverpool+L1+1LY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-semibold text-black underline underline-offset-2 transition-opacity hover:opacity-70"
                  >
                    Open in Google Maps
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal y={30}>
              <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7EBE7] text-black">
                  <ClockIcon size={22} weight="bold" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-black">
                    Opening hours
                  </h2>
                  <p className="mt-1 text-sm font-light text-[#6B6560]">
                    Mon and Tue: 2pm to 6pm
                    <br />
                    Wed to Sat: 9am to 5pm
                    <br />
                    Sun and bank holidays: 11am to 5pm
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal y={30}>
              <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7EBE7] text-black">
                  <WhatsappLogoIcon size={22} weight="fill" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-black">
                    Message us
                  </h2>
                  <Link
                    href={waLink("Hi Phoenix Salon, I'd like to book an appointment.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm font-semibold text-black underline underline-offset-2 transition-opacity hover:opacity-70"
                  >
                    +{WHATSAPP_NUMBER}
                  </Link>
                  <ul className="mt-3 flex items-center gap-2">
                    {socials.map(({ label, href, icon }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-black transition-[background-color,transform] hover:scale-110 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        >
                          {icon}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal y={30}>
              <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7EBE7] text-black">
                  <InfoIcon size={22} weight="bold" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-black">
                    Cancellation policy
                  </h2>
                  <p className="mt-1 text-sm font-light text-[#6B6560]">
                    Confirmed appointments that are canceled are subject to a
                    cancellation fee. No online payment is needed to book.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal y={30}>
              <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
                <iframe
                  title="Phoenix Salon location on the map"
                  src="https://www.google.com/maps?q=St+Johns+Shopping+Centre+Liverpool+L1+1LY&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                />
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal y={40} className="lg:sticky lg:top-24 lg:self-start">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
