"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { ThemeToggle } from "@/components/buttons/theme-toggle";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#speakers", label: "Speakers" },
  { href: "#programme", label: "Programme" },
  { href: "#venue", label: "Venue" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape or when the screen widens to desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const desktop = window.matchMedia("(min-width: 820px)");
    const onResize = () => desktop.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 flex h-[76px] items-center justify-between border-b bg-surface px-[clamp(20px,4vw,56px)] transition-[border-color] duration-300 ${
        scrolled || menuOpen ? "border-line" : "border-surface"
      }`}
    >
      <a href="#top" onClick={closeMenu} className="flex items-center">
        <Image
          src="/dolf-hydrometric-logo.png"
          alt="D-OLF Hydrometric Nigeria Limited"
          width={256}
          height={152}
          preload
          className="block h-[52px] w-auto dark:hidden"
        />
        <Image
          src="/dolf-hydrometric-logo-dark.png"
          alt="D-OLF Hydrometric Nigeria Limited"
          width={249}
          height={146}
          className="hidden h-[52px] w-auto dark:block"
        />
      </a>
      <div className="flex items-center gap-[clamp(12px,2.6vw,36px)]">
        <div className="hidden gap-[clamp(14px,2.2vw,30px)] text-[15px] font-semibold min-[820px]:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-heading hover:text-ocean">
              {link.label}
            </a>
          ))}
        </div>
        <ThemeToggle />
        <PrimaryButton href="#rsvp" size="sm" onClick={closeMenu}>
          Register
        </PrimaryButton>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-mist text-heading hover:bg-ice min-[820px]:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path
              d={menuOpen ? "M6 6l12 12" : "M4 7h16"}
              className="transition-[d] duration-200"
            />
            <path d="M4 12h16" className={`transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <path
              d={menuOpen ? "M6 18L18 6" : "M4 17h16"}
              className="transition-[d] duration-200"
            />
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full border-b border-line bg-surface px-[clamp(20px,4vw,56px)] pt-2 pb-5 shadow-[0_12px_24px_rgba(43,38,106,.08)] min-[820px]:hidden"
      >
        <ul className="m-0 flex list-none flex-col p-0">
          {LINKS.map((link) => (
            <li key={link.href} className="border-b border-line last:border-b-0">
              <a
                href={link.href}
                onClick={closeMenu}
                className="flex h-14 items-center text-lg font-semibold text-heading hover:text-ocean"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#rsvp"
          onClick={closeMenu}
          className="mt-3 flex h-[52px] items-center justify-center rounded-full bg-navy text-base font-bold text-white hover:bg-ocean hover:text-white"
        >
          Register
        </a>
      </div>
    </nav>
  );
}
