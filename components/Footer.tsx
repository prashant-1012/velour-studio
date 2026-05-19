import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/team", label: "Our Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
  { href: "/consultation", label: "Book Consultation" },
];

const topServices = [
  { href: "/services#hair", label: "Balayage & Coloring" },
  { href: "/services#skin", label: "Hydra Facial" },
  { href: "/services#bridal", label: "Bridal Makeup" },
  { href: "/services#nails", label: "Gel Manicure" },
  { href: "/services#mens", label: "Men's Grooming" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative">
      {/* Gold separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <div
        className="relative"
        style={{
          background: "linear-gradient(180deg, #1C1410 0%, #0F0A0F 100%)",
        }}
      >
        {/* Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          {/* 4-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

            {/* Col 1: About */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#C9A84C]">
                  <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
                  <path d="M19 16L19.8 19L22 20L19.8 21L19 24L18.2 21L16 20L18.2 19L19 16Z" fill="currentColor" opacity="0.6" />
                </svg>
                <span
                  className="text-xl font-semibold text-[#F5EFE8]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Velour Studio
                </span>
              </div>
              <p className="text-sm text-[#9A8A80] leading-relaxed mb-5">
                A luxury unisex beauty parlour in Baner, Pune — where precision meets indulgence. Founded by Priya & Rohan Kapoor.
              </p>
              <p className="text-xs text-[#C9A84C] italic mb-5" style={{ fontFamily: "var(--font-cormorant)" }}>
                "Luxury Crafted. Beauty Defined."
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {[
                  { Icon: InstagramIcon, label: "Instagram", href: "#" },
                  { Icon: FacebookIcon, label: "Facebook", href: "#" },
                  { Icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/919657088200" },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-[#2E2030] flex items-center justify-center text-[#9A8A80] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all duration-200"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4
                className="text-sm font-semibold text-[#C9A84C] uppercase tracking-widest mb-5"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#9A8A80] hover:text-[#F5EFE8] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Top Services */}
            <div>
              <h4
                className="text-sm font-semibold text-[#C9A84C] uppercase tracking-widest mb-5"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Our Services
              </h4>
              <ul className="space-y-2.5">
                {topServices.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="text-sm text-[#9A8A80] hover:text-[#F5EFE8] transition-colors duration-200"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact & Hours */}
            <div>
              <h4
                className="text-sm font-semibold text-[#C9A84C] uppercase tracking-widest mb-5"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Find Us
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin size={15} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#9A8A80] leading-relaxed">
                    Shop 7, The Iris Arcade,<br />
                    Baner Road, Baner,<br />
                    Pune — 411045
                  </span>
                </li>
                <li className="flex gap-3 items-center">
                  <Phone size={15} className="text-[#C9A84C] flex-shrink-0" />
                  <a href="tel:+919657088200" className="text-sm text-[#9A8A80] hover:text-[#F5EFE8] transition-colors duration-200">
                    +91 96570 88200
                  </a>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail size={15} className="text-[#C9A84C] flex-shrink-0" />
                  <a href="mailto:hello@velourstudio.in" className="text-sm text-[#9A8A80] hover:text-[#F5EFE8] transition-colors duration-200">
                    hello@velourstudio.in
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock size={15} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#9A8A80] leading-relaxed">
                    Tue–Sun: 10:00 AM – 8:00 PM<br />
                    <span className="text-[#7A6A60]">Closed Mondays</span>
                  </span>
                </li>
              </ul>

              {/* Fake map */}
              <div className="mt-5 rounded-xl overflow-hidden border border-[#2E2030] relative h-28 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1E1520 0%, #2E2030 100%)" }}
              >
                <div className="flex flex-col items-center gap-1">
                  <MapPin size={22} className="text-[#C9A84C]" />
                  <span className="text-xs text-[#9A8A80] text-center leading-tight">
                    Velour Studio<br />
                    <span className="text-[#7A6A60]">Baner, Pune</span>
                  </span>
                </div>
                {/* Subtle grid lines */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Gold separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent mb-6" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A6A60]">
            <p>© 2025 Velour Studio. All rights reserved.</p>
            <p>
              Designed with care in{" "}
              <span className="text-[#C9A84C]">Pune, India</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
