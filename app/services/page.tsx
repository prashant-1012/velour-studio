"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, Scissors, Sparkles, Gem, Heart, Users } from "lucide-react";

/* ── Scroll Reveal ──────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll(".fade-in-up");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in-view");
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      els.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    };
    return run();
  }, []);
}

/* ── Marquee ────────────────────────────────────────────── */
function MarqueeStrip() {
  const items = ["Balayage", "Bridal Makeup", "Hydra Facial", "Gel Manicure", "Men's Grooming", "Keratin Treatment", "Gold Facial", "Nail Art", "Hair Spa", "Beard Styling"];
  const repeated = [...items, ...items];
  return (
    <div className="py-4 overflow-hidden border-y border-[#2E2030] bg-[#0F0A0F]">
      <div className="flex" style={{ animation: "marquee 32s linear infinite", width: "max-content" }}>
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-4">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#9A8A80] whitespace-nowrap">{item}</span>
            <span className="text-[#C9A84C] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Data ───────────────────────────────────────────────── */
const categories = [
  { id: "hair", label: "Hair", icon: <Scissors size={16} /> },
  { id: "skin", label: "Skin", icon: <Sparkles size={16} /> },
  { id: "nails", label: "Nails", icon: <Gem size={16} /> },
  { id: "bridal", label: "Bridal", icon: <Heart size={16} /> },
  { id: "mens", label: "Men's Grooming", icon: <Users size={16} /> },
];

const services = {
  hair: {
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80",
    tagline: "Artistry in every strand.",
    items: [
      { icon: "✂", name: "Haircut & Styling", desc: "A precision cut tailored to your face shape and lifestyle, finished with a professional blowout. Includes a complimentary scalp massage and personalised styling advice from Priya or Simran.", duration: "60 mins" },
      { icon: "💨", name: "Blowout & Finish", desc: "Transform your hair with a salon-quality blowout using Dyson and ghd professional tools. A mid-week refresh or pre-event essential — smooth, voluminous, and long-lasting.", duration: "30 mins" },
      { icon: "✦", name: "Keratin Treatment", desc: "A deep-conditioning keratin smoothing treatment that eliminates frizz, adds mirror shine, and dramatically improves manageability. Results last up to 3 months with the right aftercare.", duration: "150 mins" },
      { icon: "🎨", name: "Hair Coloring", desc: "Full head single-shade color using L'Oréal Professionnel or Schwarzkopf IGORA systems. Includes a nourishing conditioning treatment, toner if required, and a blowout finish.", duration: "90 mins" },
      { icon: "☀", name: "Balayage", desc: "Priya's signature hand-painted balayage technique for beautifully blended, sun-kissed color that grows out naturally. A full consultation is included to ensure the right tones for your skin and style.", duration: "180 mins" },
      { icon: "💆", name: "Hair Spa", desc: "A deeply nourishing treatment for damaged or over-processed hair. Includes steam therapy, a protein mask, scalp pressure massage, and a reconstructive conditioning finish.", duration: "60 mins" },
    ],
  },
  skin: {
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80",
    tagline: "Skin that speaks for itself.",
    items: [
      { icon: "💧", name: "Hydra Facial", desc: "Our signature 6-step facial that cleanses, exfoliates, extracts, and infuses hyaluronic acid and antioxidant serums. Immediate, visible glow with zero downtime — our most popular treatment.", duration: "60 mins" },
      { icon: "✦", name: "Skin Cleanup", desc: "A thorough deep-pore cleanse and mild enzyme peel that leaves skin fresh, clear, and balanced. Ideal for all skin types and a great introduction to regular facial care.", duration: "45 mins" },
      { icon: "🌟", name: "De-Tan Treatment", desc: "A targeted tan-removal facial using natural enzyme peels and brightening serums enriched with vitamin C and niacinamide. Visibly lightens sun damage after just one session.", duration: "45 mins" },
      { icon: "⚡", name: "Anti-Acne Treatment", desc: "A medical-grade protocol combining salicylic acid exfoliation, blue-light therapy, and zinc-based soothing masks to target active acne and reduce future breakouts without stripping the skin.", duration: "60 mins" },
      { icon: "✨", name: "Gold Facial", desc: "An indulgent 24-karat gold-infused ritual that boosts collagen, firms the skin, and leaves a luminous, long-lasting glow. A Velour Studio signature treatment — the most requested bridal add-on.", duration: "75 mins" },
    ],
  },
  nails: {
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=80",
    tagline: "Precision at your fingertips.",
    items: [
      { icon: "💅", name: "Gel Manicure", desc: "Long-lasting gel polish in any shade from our curated collection of 150+ colors. Includes nail shaping, full cuticle care, hand exfoliation, and a relaxing hand and wrist massage.", duration: "45 mins" },
      { icon: "🦶", name: "Gel Pedicure", desc: "A thorough foot soak, scrub, and gel polish application with callus removal using professional electric file and a relaxing foot and calf massage with Kama Ayurveda oil.", duration: "60 mins" },
      { icon: "🎨", name: "Nail Art", desc: "Intricate custom nail designs by Neha Joshi — from minimalist line work and negative-space art to detailed florals and 3D nail designs. A design consultation is always included.", duration: "60–90 mins" },
      { icon: "💎", name: "Nail Extensions", desc: "Full set of acrylic or Builder-in-a-Bottle gel (BIAB) extensions, shaped and finished in your preferred length and style. Strong, natural-looking results that won't damage the nail plate.", duration: "90 mins" },
    ],
  },
  bridal: {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",
    tagline: "Your most beautiful day, perfected.",
    items: [
      { icon: "👰", name: "Bridal Makeup", desc: "A full bridal makeup look using airbrush foundation and premium products from Charlotte Tilbury, MAC, and NARS. Designed to last from ceremony to reception. Includes a mandatory trial session scheduled 2–4 weeks before the wedding.", duration: "180 mins" },
      { icon: "✦", name: "Pre-Bridal Package", desc: "A curated 3-session package completed across the month before your wedding. Includes hydra facial, full-body de-tan, gel manicure and pedicure, and a nourishing hair spa. Designed so you glow from head to toe on your big day.", duration: "3 sessions" },
      { icon: "💍", name: "Engagement Look", desc: "A polished, camera-ready makeup and hair styling look for engagement and ring ceremonies. Lighter and more natural than full bridal — fully customisable to your outfit, jewelry, and personal aesthetic.", duration: "120 mins" },
    ],
  },
  mens: {
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=900&q=80",
    tagline: "Grooming elevated.",
    items: [
      { icon: "✂", name: "Haircut & Styling", desc: "A precision cut from Rohan or Simran, tailored to your preferred length, lifestyle, and face shape. Includes a hot towel refresh, product styling, and a quick scalp massage to finish.", duration: "45 mins" },
      { icon: "🧔", name: "Beard Styling & Shaping", desc: "A detailed beard shaping, trim, and define service using straight-edge technique. Includes a hot towel treatment, premium beard oil conditioning, and clean edge lines at jaw, cheek, and neck.", duration: "30 mins" },
      { icon: "✦", name: "Face Cleanup", desc: "A men's-specific deep-cleansing facial with exfoliation, steam extraction, and a brightening mask formulated for thicker, oilier skin. The ideal regular maintenance treatment.", duration: "45 mins" },
      { icon: "💆", name: "Head Massage", desc: "A deeply relaxing scalp and neck pressure massage with warm Kama Ayurveda oil. Reduces tension, stimulates circulation, and is the perfect standalone treatment or add-on to any service.", duration: "30 mins" },
      { icon: "🌟", name: "D-Tan Treatment", desc: "A full-face and neck tan-removal treatment formulated specifically for men's skin. Uses natural enzyme peels and brightening peptides to visibly lighten sun damage in a single session.", duration: "45 mins" },
    ],
  },
};

type CategoryId = keyof typeof services;

/* ════════════════════════════════════════════════════════════
   SERVICES PAGE
════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  const [active, setActive] = useState<CategoryId>("hair");
  const [imgError, setImgError] = useState(false);
  useScrollReveal();

  // Reset image error state when category changes
  const handleCategoryChange = (id: CategoryId) => {
    setImgError(false);
    setActive(id);
  };

  const current = services[active];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&q=90"
            alt="Velour Studio services"
            fill
            className="object-cover"
            style={{ animation: "kenburns 14s ease-in-out infinite alternate" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A0F] via-[#0F0A0F]/50 to-[#0F0A0F]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5B2D5E]/30 to-transparent" />
        </div>
        {/* Diamond pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="diamonds-svc" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M24 2 L46 24 L24 46 L2 24 Z" fill="none" stroke="#C9A84C" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diamonds-svc)" />
          </svg>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
          <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#C9A84C] mb-4 flex items-center gap-3">
            <span className="w-10 h-px bg-[#C9A84C]" />
            Velour Studio
          </p>
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl text-white"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 0.95 }}
          >
            Our
            <br />
            <span style={{ fontStyle: "italic", color: "#C9A84C" }}>Services</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── CATEGORY TABS ────────────────────────────────── */}
      <div
        className="sticky top-16 lg:top-20 z-30 border-b border-[#2E2030]"
        style={{ background: "#0F0A0F" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id as CategoryId)}
                className={`relative flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-200 ${
                  active === cat.id
                    ? "text-[#C9A84C]"
                    : "text-[#7A6A60] hover:text-[#9A8A80]"
                }`}
              >
                <span className={`transition-colors duration-200 ${active === cat.id ? "text-[#C9A84C]" : "text-[#7A6A60]"}`}>
                  {cat.icon}
                </span>
                {cat.label}
                {/* Sliding underline per-tab — fades in/out smoothly */}
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A84C] transition-all duration-300"
                  style={{ opacity: active === cat.id ? 1 : 0, transform: active === cat.id ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left" }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACTIVE CATEGORY SECTION ──────────────────────── */}
      <section
        id={active}
        className="py-24 lg:py-36 bg-[#FAF6F1] dark:bg-[#0F0A0F]"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section header — two column */}
          <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
            <div>
              <p className="fade-in-up text-[11px] font-semibold tracking-[0.35em] uppercase text-[#C9A84C] mb-4">
                {categories.find((c) => c.id === active)?.label}
              </p>
              <h2
                className="fade-in-up delay-100 text-5xl lg:text-6xl xl:text-7xl text-[#1C1410] dark:text-[#F5EFE8]"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 0.95 }}
              >
                {active === "hair" && <>Expert Hair<br /><span style={{ fontStyle: "italic", color: "#C9A84C" }}>Artistry</span></>}
                {active === "skin" && <>Radiant<br /><span style={{ fontStyle: "italic", color: "#C9A84C" }}>Skin Care</span></>}
                {active === "nails" && <>Precision<br /><span style={{ fontStyle: "italic", color: "#C9A84C" }}>Nail Studio</span></>}
                {active === "bridal" && <>Bridal<br /><span style={{ fontStyle: "italic", color: "#C9A84C" }}>Excellence</span></>}
                {active === "mens" && <>Premium<br /><span style={{ fontStyle: "italic", color: "#C9A84C" }}>Grooming</span></>}
              </h2>
              <p className="fade-in-up delay-200 text-sm text-[#7A6A60] dark:text-[#9A8A80] mt-6 leading-relaxed font-light max-w-sm italic"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}>
                &ldquo;{current.tagline}&rdquo;
              </p>
            </div>

            {/* Featured image — tall portrait */}
            <div className="fade-in-up delay-100 relative overflow-hidden" style={{ aspectRatio: "3/4", maxHeight: "480px" }}>
              {imgError ? (
                <div className="absolute inset-0 bg-[#EDE8E3] dark:bg-[#1A1020] flex flex-col items-center justify-center gap-3">
                  <span className="text-4xl text-[#C9A84C]/40">✦</span>
                  <p className="text-xs text-[#7A6A60] dark:text-[#9A8A80] uppercase tracking-[0.2em]">{categories.find(c => c.id === active)?.label}</p>
                </div>
              ) : (
                <Image
                  src={current.image}
                  alt={`Velour Studio ${active} services`}
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/40 to-transparent" />
              {/* Gold hairline */}
              <div className="absolute inset-0 border border-[#C9A84C]/20" />
            </div>
          </div>

          {/* Gold hairline divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent mb-16" />

          {/* Service cards — flush gap-px grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#DDD0C8]/70 dark:bg-[#2E2030]/60">
            {current.items.map((service, i) => (
              <div
                key={i}
                className="fade-in-up group flex flex-col p-8 bg-[#FAF6F1] dark:bg-[#0F0A0F] hover:bg-white dark:hover:bg-[#170F17] transition-all duration-300 relative border-l-2 border-transparent hover:border-[#C9A84C] hover:shadow-[4px_0_0_0_#C9A84C]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Icon */}
                <span className="text-2xl mb-5 block">{service.icon}</span>

                {/* Duration badge */}
                <div className="flex items-center gap-1.5 mb-4">
                  <Clock size={11} className="text-[#C9A84C]" />
                  <span className="text-[11px] text-[#C9A84C] uppercase tracking-[0.15em] font-medium">{service.duration}</span>
                </div>

                {/* Name */}
                <h3
                  className="text-2xl text-[#1C1410] dark:text-[#F5EFE8] mb-3"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#7A6A60] dark:text-[#9A8A80] leading-relaxed font-light flex-1">
                  {service.desc}
                </p>

                {/* CTA */}
                <Link
                  href="/consultation"
                  className="mt-7 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-[#5B2D5E] dark:text-[#D4A5C9] border-b border-[#C9A84C]/50 pb-0.5 hover:gap-3 hover:border-[#C9A84C] transition-all duration-200 self-start"
                >
                  Book This Service <ArrowRight size={11} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold hairline */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      {/* ── ALL CATEGORIES OVERVIEW ───────────────────────── */}
      <section
        className="py-24 lg:py-36"
        style={{ background: "linear-gradient(135deg, #0F0A0F 0%, #170F17 60%, #0F0A0F 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-16">
            <p className="fade-in-up text-[11px] font-semibold tracking-[0.35em] uppercase text-[#C9A84C] mb-4">Browse All</p>
            <h2
              className="fade-in-up delay-100 text-5xl lg:text-6xl text-[#F5EFE8]"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Every Category
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#2E2030]/60">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActive(cat.id as CategoryId);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="fade-in-up group flex flex-col items-start p-8 bg-[#0F0A0F] hover:bg-[#170F17] transition-colors duration-300 text-left"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="text-[#5B2D5E] group-hover:text-[#C9A84C] transition-colors duration-300 mb-6">
                  {cat.icon}
                </div>
                <h3
                  className="text-2xl text-[#F5EFE8] mb-2"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  {cat.label}
                </h3>
                <p className="text-[11px] text-[#7A6A60] uppercase tracking-[0.15em]">
                  {services[cat.id as CategoryId].items.length} services
                </p>
                <ArrowRight size={13} className="text-[#2E2030] group-hover:text-[#C9A84C] mt-4 group-hover:translate-x-1 transition-all duration-200" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#FAF6F1] dark:bg-[#0F0A0F]">
        {/* Gold leaf pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="leaves-svc" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 5 Q55 30 30 55 Q5 30 30 5Z" fill="none" stroke="#5B2D5E" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaves-svc)" />
          </svg>
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="fade-in-up text-[11px] font-semibold tracking-[0.35em] uppercase text-[#C9A84C] mb-6">Ready to Begin?</p>
          <h2
            className="fade-in-up delay-100 text-5xl lg:text-6xl xl:text-7xl text-[#1C1410] dark:text-[#F5EFE8] mb-6"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 0.95 }}
          >
            Not sure where
            <br />
            <span style={{ fontStyle: "italic", color: "#5B2D5E" }}>to start?</span>
          </h2>
          <p className="fade-in-up delay-200 text-sm text-[#7A6A60] dark:text-[#9A8A80] mb-10 leading-relaxed font-light max-w-md mx-auto">
            Book a free consultation and let Priya or Rohan guide you to the perfect treatment for your needs.
          </p>
          <Link
            href="/consultation"
            className="fade-in-up delay-300 inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-semibold text-[#FAF6F1] bg-[#5B2D5E] hover:bg-[#7B3D7E] hover:-translate-y-0.5 shadow-xl transition-all duration-300"
          >
            Request a Consultation
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
