"use client";

import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { waLink } from "@/lib/whatsapp";
import ProductSearch from "./product-search";

interface navMenuItem {
  label: string;
  url: string;
}

const navMenuItems: navMenuItem[] = [
  { label: "Home", url: "/" },
  { label: "Service", url: "/service" },
  { label: "About", url: "/about" },
  { label: "Contact Us", url: "/contact" },
];

const menuList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};

const menuItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

const NavBar = () => {
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const logoScale = useTransform(
    scrollY,
    [0, 120],
    reduceMotion ? [1, 1] : [1, 0.94],
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white">
      <motion.div
        aria-hidden
        style={{ opacity: shadowOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black/10 shadow-[0_6px_24px_rgba(0,0,0,0.07)]"
      />

      <div className="relative p-2 px-4 sm:px-8 lg:px-12 h-18 flex items-center justify-between">
        {/* logo */}
        <motion.div
          style={{ scale: logoScale }}
          className="flex flex-col items-center justify-center gap-0"
        >
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-center">
            PHOENIX SALON
          </div>
          <div className="text-xs sm:text-sm lg:text-lg font-light text-center text-[#423F3F]">
            By Yvonne
          </div>
        </motion.div>

        {/* nav menu items */}
        <ul className="hidden lg:flex gap-4 items-center justify-between">
          {navMenuItems.map((item) => {
            const isActive = item.url === currentPath;
            return (
              <li key={item.label}>
                <Link
                  href={item.url}
                  className="flex flex-col items-center justify-center gap-0 p-0"
                >
                  <motion.p whileHover={{ y: -1 }}>{item.label}</motion.p>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="px-4 py-0.5 w-6 bg-gray-600 rounded-3xl"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* search + cta */}
        <div className="flex items-center gap-3 sm:gap-5">
          <motion.button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search products"
            aria-haspopup="dialog"
            whileHover={reduceMotion ? undefined : { scale: 1.08 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-black transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
          >
            <MagnifyingGlassIcon size={24} />
          </motion.button>

          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="hidden sm:block"
          >
            <a
              href={waLink("Hi Phoenix Salon, I'd like to book an appointment.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 sm:gap-4 px-4 py-2 sm:px-5 sm:py-3 bg-black rounded-3xl"
            >
              <p className="text-sm sm:text-base text-white font-bold">
                Book Appointment
              </p>
              <ArrowRightIcon size={18} className="text-white font-bold" />
            </a>
          </motion.div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-black"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {open ? <XIcon size={28} /> : <ListIcon size={28} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <motion.ul
              variants={menuList}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-1 px-4 pb-4 pt-2"
            >
              {navMenuItems.map((item) => (
                <motion.li key={item.label} variants={menuItem}>
                  <Link
                    href={item.url}
                    onClick={() => setOpen(false)}
                    className={`block py-3 px-2 rounded-xl ${
                      item.url === currentPath
                        ? "bg-gray-100 font-semibold"
                        : "text-[#423F3F]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={menuItem}>
                <a
                  href={waLink("Hi Phoenix Salon, I'd like to book an appointment.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-between gap-4 px-5 py-3 bg-black rounded-3xl"
                >
                  <p className="text-white font-bold">Book Appointment</p>
                  <ArrowRightIcon size={18} className="text-white font-bold" />
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
      <ProductSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </nav>
  );
};

export default NavBar;
