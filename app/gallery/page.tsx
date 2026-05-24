"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

function useScrollReveal(dep?: unknown) {
  useEffect(() => {
    // Small delay so the DOM has updated after a tab/filter change
    const timer = setTimeout(() => {
      const els = document.querySelectorAll(".fade-in-up:not(.in-view)");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in-view");
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.01 }
      );
      els.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  }, [dep]);
}

/* ── Gallery data ───────────────────────────────────────── */
type Category = "All" | "Hair" | "Skin" | "Nails" | "Bridal" | "Men's";

interface GalleryImage {
  src: string;
  alt: string;
  category: Exclude<Category, "All">;
  span: number; // row span — 2 = normal, 3 = tall
}

const images: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1635273051937-a0ddef9573b6?w=800&q=85", alt: "Man getting hair cut by a barber", category: "Hair", span: 3 },
  { src: "https://images.unsplash.com/photo-1684868268327-7e5590bcfbd6?w=800&q=85", alt: "Bridal makeup artistry", category: "Bridal", span: 2 },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85", alt: "Hydra facial skin treatment", category: "Skin", span: 2 },
  { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=85", alt: "Nail art close-up", category: "Nails", span: 3 },
  { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=85", alt: "Beauty portrait", category: "Skin", span: 2 },
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=85", alt: "Men's grooming session", category: "Men's", span: 2 },
  { src: "https://images.unsplash.com/photo-1672788694268-ecc234591d31?w=800&q=85", alt: "Woman getting her hair styled", category: "Hair", span: 2 },
  { src: "https://images.unsplash.com/flagged/photo-1551854716-8b811be39e7e?w=800&q=85", alt: "Bridal look full glam", category: "Bridal", span: 3 },
  { src: "https://images.unsplash.com/photo-1675034741473-afed58a142e8?w=800&q=85", alt: "Woman cutting another woman's hair in a salon", category: "Hair", span: 2 },
  { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=85", alt: "Spa skincare ritual", category: "Skin", span: 2 },
  { src: "https://plus.unsplash.com/premium_photo-1676809172626-34d0538cc8e5?w=800&q=85", alt: "Woman getting her hair done in a salon", category: "Hair", span: 3 },
  { src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=85", alt: "Gel nail art detail", category: "Nails", span: 2 },
  { src: "https://plus.unsplash.com/premium_photo-1664048713117-bf8a405e4933?w=800&q=85", alt: "Woman cutting another woman's hair in a salon", category: "Hair", span: 2 },
  { src: "https://images.unsplash.com/photo-1740674570259-a47d713a2976?w=800&q=85", alt: "Bridal hair styling", category: "Bridal", span: 2 },
  { src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=85", alt: "Men's beard grooming", category: "Men's", span: 3 },
];

const tabs: Category[] = ["All", "Hair", "Skin", "Nails", "Bridal", "Men's"];

/* ════════════════════════════════════════════════════════════
   GALLERY PAGE
════════════════════════════════════════════════════════════ */
export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  useScrollReveal(activeTab);

  const handleTabChange = (tab: Category) => {
    setActiveTab(tab);
    setLightboxIndex(null);
  };

  const filtered = activeTab === "All" ? images : images.filter((img) => img.category === activeTab);

  /* Lightbox navigation */
  const openLightbox = (idx: number) => { setLightboxIndex(idx); document.body.style.overflow = "hidden"; };
  const closeLightbox = useCallback(() => { setLightboxIndex(null); document.body.style.overflow = ""; }, []);
  const prev = useCallback(() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length)), [filtered.length]);
  const next = useCallback(() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length)), [filtered.length]);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next, closeLightbox]);

  /* Cleanup overflow on unmount */
  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  return (
    <div style={{ background: "#0A060A", minHeight: "100vh" }}>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[540px] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=90"
            alt="Velour Studio lookbook"
            fill
            className="object-cover"
            style={{ animation: "kenburns 16s ease-in-out infinite alternate" }}
            priority
          />
          {/* Very dark overlay — editorial, moody */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A060A] via-[#0A060A]/70 to-[#0A060A]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A060A]/60 to-transparent" />
        </div>

        {/* Diamond pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs><pattern id="d-gallery" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M24 2 L46 24 L24 46 L2 24 Z" fill="none" stroke="#C9A84C" strokeWidth="0.6" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#d-gallery)" />
          </svg>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
          <p className="flex items-center gap-3 label-gold mb-4">
            <span className="w-10 h-px bg-[#C9A84C]" />
            Portfolio
          </p>
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-white"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 0.9 }}
          >
            The Velour<br />
            <span style={{ fontStyle: "italic", color: "#C9A84C" }}>Lookbook</span>
          </h1>
          <p className="text-sm text-white/35 mt-5 font-light tracking-wide max-w-sm">
            Transformations we&apos;re proud of — captured in their most honest light.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 hairline-gold" />
      </section>

      {/* ── FILTER TABS ──────────────────────────────────── */}
      <div className="sticky top-16 lg:top-20 z-30 border-b border-[#1E1420]" style={{ background: "#0A060A" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex overflow-x-auto -mb-px">
            {tabs.map((tab) => {
              const count = tab === "All" ? images.length : images.filter((i) => i.category === tab).length;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 flex-shrink-0 ${
                    activeTab === tab
                      ? "border-[#C9A84C] text-[#C9A84C]"
                      : "border-transparent text-[#5A4A5A] hover:text-[#8A7878]"
                  }`}
                >
                  {tab}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "bg-[#1E1420] text-[#5A4A5A]"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MASONRY GRID ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#5A4A5A]">No images in this category yet.</div>
        ) : (
          <div
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
            style={{ gridAutoRows: "180px" }}
          >
            {filtered.map((img, i) => (
              <div
                key={`${activeTab}-${i}`}
                className="fade-in-up gallery-item group relative overflow-hidden cursor-pointer"
                style={{
                  gridRow: `span ${img.span}`,
                  transitionDelay: `${(i % 6) * 60}ms`,
                }}
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Dark hover overlay */}
                <div className="absolute inset-0 bg-[#0A060A]/0 group-hover:bg-[#0A060A]/55 transition-all duration-400" />

                {/* Gold category tag + view icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[#C9A84C] text-2xl">✦</span>
                    <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white">View</span>
                  </div>
                </div>

                {/* Category badge — bottom left */}
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C9A84C] bg-[#0A060A]/70 backdrop-blur-sm px-2.5 py-1.5 border border-[#C9A84C]/25">
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(10,6,10,0.97)" }}
          onClick={closeLightbox}
        >
          {/* Image container */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-4xl max-h-[85vh] w-full h-full">
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            {/* Category + counter */}
            <div className="absolute top-5 left-6 flex items-center gap-4">
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C9A84C]">
                {filtered[lightboxIndex].category}
              </span>
              <span className="text-[11px] text-[#5A4A5A] tracking-widest">
                {lightboxIndex + 1} / {filtered.length}
              </span>
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-5 sm:right-6 w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center text-[#8A7878] hover:text-white bg-[#0A060A]/60 sm:bg-transparent border border-[#2A1E2A] hover:border-[#C9A84C]/50 rounded-full transition-all duration-200 z-10"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              disabled={lightboxIndex === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-200 ${
                lightboxIndex === 0
                  ? "text-[#3A2E3A] border-[#1E1420] opacity-40 cursor-not-allowed"
                  : "text-[#8A7878] hover:text-white border-[#2A1E2A] hover:border-[#C9A84C]/50 hover:scale-110"
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
              onClick={next}
              disabled={lightboxIndex === filtered.length - 1}
              className={`absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-200 ${
                lightboxIndex === filtered.length - 1
                  ? "text-[#3A2E3A] border-[#1E1420] opacity-40 cursor-not-allowed"
                  : "text-[#8A7878] hover:text-white border-[#2A1E2A] hover:border-[#C9A84C]/50 hover:scale-110"
              }`}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Caption */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center">
              <p className="text-xs text-[#5A4A5A] font-light tracking-wide">
                {filtered[lightboxIndex].alt}
              </p>
            </div>

            {/* Keyboard hint */}
            <div className="absolute bottom-5 right-6 hidden sm:flex items-center gap-3 text-[10px] text-[#3A2E3A] tracking-widest uppercase">
              <span>← → Navigate</span>
              <span>·</span>
              <span>Esc Close</span>
            </div>
          </div>
        </div>
      )}

      {/* ── BOTTOM CTA ───────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-t border-[#1E1420]">
        {/* Subtle gold leaf pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%">
            <defs><pattern id="l-gallery" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 5 Q55 30 30 55 Q5 30 30 5Z" fill="none" stroke="#C9A84C" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#l-gallery)" />
          </svg>
        </div>

        {/* Gold orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#5B2D5E]/8 blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="fade-in-up label-gold mb-6">Your Turn</p>
          <h2
            className="fade-in-up delay-100 text-5xl lg:text-6xl text-white mb-6"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 0.95 }}
          >
            Ready to be in
            <br />
            <span style={{ fontStyle: "italic", color: "#C9A84C" }}>the lookbook?</span>
          </h2>
          <p className="fade-in-up delay-200 text-sm text-[#5A4A5A] mb-10 leading-relaxed font-light">
            Every transformation starts with a conversation. Book your consultation and let us create something worth sharing.
          </p>
          <div className="fade-in-up delay-300 flex flex-wrap gap-4 justify-center">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-[#1C1410] bg-[#C9A84C] hover:bg-[#E0C06A] hover:-translate-y-0.5 shadow-xl transition-all duration-300"
            >
              Book a Consultation <ArrowRight size={15} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-[#8A7878] border border-[#2A1E2A] hover:border-[#C9A84C]/40 hover:text-white transition-all duration-300"
            >
              View Services <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
