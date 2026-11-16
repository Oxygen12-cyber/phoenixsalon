import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ClockIcon,
  HandHeartIcon,
  ScissorsIcon,
  SparkleIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion-utils";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Phoenix Salon — a Liverpool hair studio for braids, installs and extensions, done with quality hair and a gentle hand.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: <SparkleIcon size={24} weight="bold" />,
    title: "Quality hair, always",
    body: "We work with premium hair so your install looks full, moves naturally and lasts.",
  },
  {
    icon: <HandHeartIcon size={24} weight="bold" />,
    title: "A gentle hand",
    body: "No tension, no shortcuts. Every style is installed with care for your scalp and edges.",
  },
  {
    icon: <ClockIcon size={24} weight="bold" />,
    title: "On time, every time",
    body: "Your appointment is yours. We keep to schedule so you're in and out looking your best.",
  },
];

const AboutPage = () => {
  return (
    <div className="w-full">
      {/* hero */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <Reveal y={30}>
              <h1 className="text-4xl font-bold leading-tight text-black sm:text-5xl lg:text-6xl">
                Hair that feels as good as it looks
              </h1>
            </Reveal>
            <Reveal y={30}>
              <p className="max-w-lg text-base font-light leading-relaxed text-[#6B6560] sm:text-lg">
                Phoenix Salon is a Liverpool studio for braids, installs and
                extensions. We believe great hair should never hurt — so every
                appointment is unhurried, tailored to you, and finished with a
                polished touch.
              </p>
            </Reveal>
            <Reveal y={24}>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={waLink("Hi Phoenix Salon, I'd like to book an appointment.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 rounded-full bg-black px-7 py-3.5 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  Book appointment
                  <ArrowRightIcon size={18} weight="bold" />
                </Link>
                <Link
                  href="/service"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-black transition-colors duration-200 hover:bg-[#F7EBE7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  View our styles
                </Link>
              </div>
            </Reveal>
            <Reveal y={20}>
              <dl className="mt-2 grid grid-cols-3 gap-6 border-t border-black/10 pt-6 text-left">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#6B6560]">
                    Location
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-black">
                    Liverpool L1
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#6B6560]">
                    Approach
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-black">
                    Tension-free
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-[#6B6560]">
                    Booking
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-black">
                    1-on-1 studio
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal y={40} className="w-full">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/assets/hero1.png"
                alt="Client with a fresh Phoenix Salon style"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* story */}
      <section className="bg-[#F7EBE7]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <Reveal y={40} className="order-2 w-full lg:order-1">
            <div className="relative mx-auto aspect-[16/11] w-full max-w-md overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 lg:max-w-none">
              <Image
                src="/assets/sec3hero.png"
                alt="Phoenix Salon styling in the studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </Reveal>

          <div className="order-1 flex flex-col items-start gap-5 lg:order-2">
            <Reveal y={20}>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#80726D]">
                Our story
              </span>
            </Reveal>
            <Reveal y={30}>
              <h2 className="text-3xl font-bold text-black sm:text-4xl">
                Polished looks, happier you
              </h2>
            </Reveal>
            <Reveal y={30}>
              <p className="max-w-lg text-sm font-light leading-relaxed text-[#6B6560] sm:text-base">
                What started as styling friends and family grew into a studio
                built on one idea: your hair should feel like you, only better.
                From protective braids to flawless installs, we mix technique
                with real conversation so you leave with a look you love.
              </p>
            </Reveal>
            <Reveal y={30}>
              <p className="max-w-lg text-sm font-light leading-relaxed text-[#6B6560] sm:text-base">
                Whether it&apos;s a bold transformation or everyday polish, we
                take the time to get it right — and we&apos;ll always tell you
                what your hair needs to stay healthy.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:py-20">
          <Reveal className="flex flex-col items-center gap-3 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#80726D]">
              What we stand for
            </span>
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              The Phoenix Salon difference
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} offset={["start 0.98", `start ${0.7 + i * 0.06}`]} y={40}>
                <article className="flex h-full flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F7EBE7] text-black">
                    {value.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-black">
                    {value.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-[#6B6560]">
                    {value.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section
        className="px-6 py-16 sm:py-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(247,235,231,1) 0%, rgba(255,255,255,1) 100%)",
        }}
      >
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-bold text-black sm:text-4xl">
            Ready for your best hair?
          </h2>
          <p className="max-w-lg text-sm font-light text-[#6B6560] sm:text-base">
            Send us a message and we&apos;ll help you pick the perfect style and
            lock in your slot.
          </p>
          <Link
            href={waLink("Hi Phoenix Salon, I'd like to book an appointment.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-3.5 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <ScissorsIcon size={18} weight="bold" />
            Book appointment
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default AboutPage;
