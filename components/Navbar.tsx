"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-[#FAF6F1]/80 dark:bg-[#0F0A0F]/80 shadow-sm border-b border-[#DDD0C8]/60 dark:border-[#2E2030]/60"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group flex-shrink-0"
              onClick={() => setDrawerOpen(false)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#C9A84C] group-hover:rotate-12 transition-transform duration-300"
              >
                <path
                  d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M19 16L19.8 19L22 20L19.8 21L19 24L18.2 21L16 20L18.2 19L19 16Z"
                  fill="currentColor"
                  opacity="0.6"
                />
                <path
                  d="M5 2L5.6 4.5L8 5.5L5.6 6.5L5 9L4.4 6.5L2 5.5L4.4 4.5L5 2Z"
                  fill="currentColor"
                  opacity="0.4"
                />
              </svg>
              <span
                className="text-xl lg:text-2xl font-semibold tracking-wide text-[#1C1410] dark:text-[#F5EFE8]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Velour Studio
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-[#5B2D5E] dark:text-[#D4A5C9]"
                      : "text-[#7A6A60] dark:text-[#9A8A80] hover:text-[#5B2D5E] dark:hover:text-[#D4A5C9]"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="block h-0.5 bg-[#C9A84C] rounded-full mt-0.5" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side: Theme toggle + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full text-[#7A6A60] dark:text-[#9A8A80] hover:text-[#5B2D5E] dark:hover:text-[#D4A5C9] hover:bg-[#EDE8E3] dark:hover:bg-[#1E1520] transition-all duration-200"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
              <Link
                href="/consultation"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-[#FAF6F1] bg-[#5B2D5E] hover:bg-[#7B3D7E] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Request Consultation
              </Link>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full text-[#7A6A60] dark:text-[#9A8A80] hover:bg-[#EDE8E3] dark:hover:bg-[#1E1520] transition-all duration-200"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="p-2 rounded-md text-[#5B2D5E] dark:text-[#D4A5C9] hover:bg-[#EDE8E3] dark:hover:bg-[#1E1520] transition-all duration-200"
                aria-label="Toggle menu"
              >
                {drawerOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-40 w-72 lg:hidden transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "linear-gradient(180deg, #FAF6F1 0%, #EDE8E3 100%)",
        }}
      >
        <div className="dark:hidden absolute inset-0" style={{
          background: "linear-gradient(180deg, #FAF6F1 0%, #EDE8E3 100%)",
        }} />
        <div className="hidden dark:block absolute inset-0" style={{
          background: "linear-gradient(180deg, #0F0A0F 0%, #170F17 100%)",
        }} />

        <div className="relative flex flex-col h-full pt-20 px-6 pb-8">
          {/* Close button */}
          <button
            onClick={() => setDrawerOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md text-[#7A6A60] dark:text-[#9A8A80] hover:bg-[#EDE8E3] dark:hover:bg-[#1E1520]"
          >
            <X size={20} />
          </button>

          {/* Logo in drawer */}
          <div
            className="text-lg font-semibold text-[#5B2D5E] dark:text-[#D4A5C9] mb-8"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Velour Studio
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-[#5B2D5E]/10 dark:bg-[#7B3D7E]/20 text-[#5B2D5E] dark:text-[#D4A5C9]"
                    : "text-[#7A6A60] dark:text-[#9A8A80] hover:bg-[#EDE8E3] dark:hover:bg-[#1E1520] hover:text-[#5B2D5E] dark:hover:text-[#D4A5C9]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/consultation"
            onClick={() => setDrawerOpen(false)}
            className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-[#FAF6F1] bg-[#5B2D5E] hover:bg-[#7B3D7E] shadow-md transition-all duration-200"
          >
            Request Consultation
          </Link>

          {/* Gold separator */}
          <div className="mt-8 pt-6 border-t border-[#C9A84C]/30">
            <p className="text-xs text-[#7A6A60] dark:text-[#9A8A80]">
              Tue–Sun · 10AM–8PM
            </p>
            <p className="text-xs text-[#7A6A60] dark:text-[#9A8A80]">
              Baner, Pune — 411045
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
