import {
  InstagramLogoIcon,
  MapPinIcon,
  TiktokLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Reveal } from "./motion-utils";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/service" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Hair Styling",
  "Hair Extensions",
  "Wig Installs",
  "Wash, Treat and Style",
];

const socials = [
  {
    label: "WhatsApp",
    href: "https://wa.me/447311177774",
    icon: <WhatsappLogoIcon size={22} weight="fill" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/yvonnelewis2325",
    icon: <InstagramLogoIcon size={22} weight="fill" />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@phoenixbyyvonne",
    icon: <TiktokLogoIcon size={22} weight="regular" />,
  },
];

const linkClass =
  "inline-flex min-h-11 items-center text-sm text-gray-600 transition-[color,transform] hover:translate-x-0.5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {/* brand */}
        <Reveal
          className="flex flex-col items-start gap-2"
          offset={["start 0.98", "start 0.6"]}
        >
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight text-black">
              PHOENIX SALON
            </span>
            <span className="text-sm font-light text-[#423F3F]">
              By Yvonne
            </span>
          </Link>
          <p className="mt-2 text-xs font-light text-gray-600">
            Polished Looks, Happier You.
          </p>
        </Reveal>

        {/* quick links */}
        <Reveal offset={["start 0.98", "start 0.67"]}>
          <nav aria-label="Footer" className="flex flex-col">
            <h3 className="text-sm font-bold tracking-wide text-black">
              Quick Links
            </h3>
            <ul className="mt-2 flex flex-col">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        {/* services */}
        <Reveal offset={["start 0.98", "start 0.74"]}>
          <div className="flex flex-col">
            <h3 className="text-sm font-bold tracking-wide text-black">
              Our Services
            </h3>
            <ul className="mt-2 flex flex-col">
              {services.map((service) => (
                <li
                  key={service}
                  className="inline-flex min-h-11 items-center text-sm text-gray-600"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* contact */}
        <Reveal offset={["start 0.98", "start 0.81"]}>
          <div className="flex flex-col">
            <h3 className="text-sm font-bold tracking-wide text-black">
              Contact Us
            </h3>
            <div className="mt-2 flex items-start gap-2">
              <MapPinIcon
                size={18}
                weight="regular"
                className="mt-0.5 shrink-0 text-gray-600"
              />
              <p className="text-sm font-light text-gray-600">
                PHOENIX SALON by YVONNE
                <span className="block text-xs mb-2">HAIR EXTENSIONS AND STYLING</span>
                <span className="block">
                  St Johns Shopping Centre Liverpool, L1 1LY, UK
                </span>
              </p>
            </div>
            <p className="mt-4 text-sm font-light text-gray-600">
              Mon and Tue: 2pm to 6pm
              <br />
              Wed to Sat: 9am to 5pm
              <br />
              Sun and bank holidays: 11am to 5pm
            </p>
          </div>
        </Reveal>
      </div>

      {/* lower bar */}
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-start gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex items-center gap-2">
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
        <p className="text-xs font-light text-gray-600">
          © 2026 Phoenix Salon. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
