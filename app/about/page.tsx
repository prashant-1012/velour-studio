"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, Award, CheckCircle } from "lucide-react";
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in-up");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in-view"); observer.unobserve(e.target); } }); },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function MarqueeStrip() {
  const items = ["Craft & Precision", "Premium Always", "Inclusive Luxury", "Client First", "Est. 2015", "Baner, Pune", "CIDESCO Affiliated", "L'Oréal Professionnel Partner"];
  const repeated = [...items, ...items];
  return (
    <div className="py-4 overflow-hidden border-y border-[#2A1E2A] bg-[#06030A]">
      <div className="flex" style={{ animation: "marquee 36s linear infinite", width: "max-content" }}>
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-4">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8A7878] whitespace-nowrap">{item}</span>
            <span className="text-[#C9A84C] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const values = [
  {
    icon: "✦",
    title: "Craft & Precision",
    desc: "Every service at Velour Studio is treated as an art form. We do not rush, and we do not cut corners — whether it's a 30-minute blowout or a full bridal transformation.",
  },
  {
    icon: "◆",
    title: "Premium Always",
    desc: "We use only professional-grade products: L'Oréal Professionnel, Schwarzkopf, Charlotte Tilbury, Kama Ayurveda. What touches your hair and skin matters deeply to us.",
  },
  {
    icon: "○",
    title: "Inclusive Luxury",
    desc: "Premium beauty is for everyone. Velour Studio is a welcoming, judgment-free space for all genders, all ages, and all styles — from first-timers to regulars.",
  },
  {
    icon: "◇",
    title: "Client First",
    desc: "Your comfort, preferences, and time are our highest priority — every single visit. We listen before we act, and we never recommend what you don't need.",
  },
];

const certifications = [
  { name: "CIDESCO Affiliated Studio", detail: "International Beauty Therapy & Cosmetology", icon: <Award size={18} /> },
  { name: "L'Oréal Professionnel Certified Partner", detail: "Authorised to use professional-grade L'Oréal systems", icon: <Award size={18} /> },
  { name: "Schwarzkopf Professional Authorised Salon", detail: "IGORA and BlondMe color-certified studio", icon: <Award size={18} /> },
  { name: "Member, Professional Beauty Association of India", detail: "PBAI registered and compliant salon", icon: <Award size={18} /> },
];

const timeline = [
  { year: "2015", title: "Velour Studio Founded", desc: "Priya & Rohan Kapoor open their first compact studio in Aundh, Pune — with 4 chairs, a shared vision, and a 6-month waitlist within weeks." },
  { year: "2017", title: "Full Bridal Suite Launched", desc: "Expanded services to include a dedicated bridal suite. Fully booked for the 2017 and 2018 wedding seasons within 3 months of launch." },
  { year: "2019", title: "Advanced Skin Certifications", desc: "Rohan completes his CIDESCO certification in aesthetics at the Academy in Bengaluru, and introduces medical-grade skin treatments to the menu." },
  { year: "2021", title: "Relocated to Baner", desc: "Moved to a purpose-designed, larger studio at The Iris Arcade, Baner — featuring a dedicated nail lounge, skin bay, and private bridal prep room." },
  { year: "2023", title: "500+ Happy Clients", desc: "Crossed the milestone of 500 loyal clients with a sustained 4.9★ average on Google. Velour Studio becomes Baner's most-reviewed salon." },
  { year: "2025", title: "Men's Grooming Lounge Opens", desc: "Launched a dedicated men's grooming lounge under Rohan's leadership — bringing the same precision and luxury that Velour Studio is known for to grooming." },
];

export default function AboutPage() {
  useScrollReveal();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1600&q=90"
            alt="Velour Studio interior"
            fill
            className="object-cover"
            style={{ animation: "kenburns 14s ease-in-out infinite alternate" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0608] via-[#0A0608]/55 to-[#0A0608]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D1A40]/40 to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%"><defs><pattern id="d-about" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M24 2 L46 24 L24 46 L2 24 Z" fill="none" stroke="#C9A84C" strokeWidth="0.6"/></pattern></defs><rect width="100%" height="100%" fill="url(#d-about)"/></svg>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
          <p className="flex items-center gap-3 label-gold mb-4"><span className="w-10 h-px bg-[#C9A84C]"/>Our Story</p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl text-white" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300, lineHeight:0.95 }}>
            About<br/><span style={{ fontStyle:"italic", color:"#C9A84C" }}>Velour Studio</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 hairline-gold"/>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <MarqueeStrip/>

      {/* ── OUR STORY ────────────────────────────────────── */}
      <section className="section-cream py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Copy */}
            <div>
              <p className="fade-in-up label-gold mb-4">Est. 2015, Pune</p>
              <h2 className="fade-in-up delay-100 text-5xl lg:text-6xl text-[#1C1410] dark:text-[#F0E8DF] mb-8" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300, lineHeight:0.95 }}>
                A Studio Built on<br/><span style={{ fontStyle:"italic", color:"#C9A84C" }}>Belief</span>
              </h2>
              <div className="space-y-5 text-sm text-[#7A6A60] dark:text-[#8A7878] leading-relaxed font-light">
                <p className="fade-in-up delay-200">
                  Velour Studio was born from a simple, deeply held belief — that luxury beauty should not be reserved for a privileged few. When Priya and Rohan Kapoor opened their first studio in 2015, they chose the name Velour deliberately: the texture of something that is both soft and enduring, refined but accessible.
                </p>
                <p className="fade-in-up delay-300">
                  Priya trained at the L&apos;Oréal Professionnel Academy in Mumbai and spent years refining her colour artistry before co-founding the studio. Rohan, certified in advanced aesthetics through CIDESCO, brought a scientific rigour to skin and grooming care that Pune had rarely seen outside of clinical settings.
                </p>
                <p className="fade-in-up delay-400">
                  Together, they built a studio that treats every client as an individual — not a service ticket. Every consultation begins with listening. Every treatment is adapted, not templated. And every client, whether coming in for a quick cleanup or a full bridal transformation, leaves feeling seen.
                </p>
                <p className="fade-in-up delay-500">
                  Today, from their purpose-designed studio in Baner, Priya, Rohan, and their team of three serve 500+ loyal clients — and the waiting list grows every season.
                </p>
              </div>
            </div>

            {/* Image — tall portrait */}
            <div className="fade-in-up delay-100 relative">
              <div className="relative overflow-hidden" style={{ aspectRatio:"3/4" }}>
                <Image
                  src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=900&q=80"
                  alt="Velour Studio interior — Baner, Pune"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0608]/30 to-transparent"/>
                <div className="absolute inset-0 border border-[#C9A84C]/20"/>
              </div>
              {/* Floating quote card */}
              <div className="card-premium absolute -bottom-6 -left-6 max-w-[220px] p-5 rounded-xl">
                <p className="text-[#C9A84C] text-xs label-gold mb-2">Our Tagline</p>
                <p className="text-[#1C1410] dark:text-[#F0E8DF]" style={{ fontFamily:"var(--font-cormorant)", fontSize:"1.1rem", fontStyle:"italic", fontWeight:300 }}>
                  &ldquo;Luxury Crafted. Beauty Defined.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hairline-gold"/>

      {/* ── CORE VALUES ──────────────────────────────────── */}
      <section className="section-dark py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-16">
            <p className="fade-in-up label-gold mb-4">What We Stand For</p>
            <h2 className="fade-in-up delay-100 text-5xl lg:text-6xl text-[#F0E8DF]" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}>
              Core <span style={{ fontStyle:"italic", color:"#C9A84C" }}>Values</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div key={i} className="card-dark fade-in-up rounded-2xl p-8 flex flex-col group" style={{ transitionDelay:`${i*90}ms` }}>
                <span className="text-[#C9A84C] text-xl mb-6 block transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 inline-block w-fit">{v.icon}</span>
                <h3 className="text-2xl text-[#F0E8DF] mb-3" style={{ fontFamily:"var(--font-cormorant)", fontWeight:400 }}>{v.title}</h3>
                <p className="text-sm text-[#8A7878] leading-relaxed font-light flex-1">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarqueeStrip/>

      {/* ── CERTIFICATIONS ───────────────────────────────── */}
      <section className="section-cream py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="fade-in-up label-gold mb-4">Trust & Standards</p>
              <h2 className="fade-in-up delay-100 text-5xl lg:text-6xl text-[#1C1410] dark:text-[#F0E8DF] mb-4" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}>
                Certifications &<br/><span style={{ fontStyle:"italic", color:"#C9A84C" }}>Affiliations</span>
              </h2>
              <p className="fade-in-up delay-200 text-sm text-[#7A6A60] dark:text-[#8A7878] leading-relaxed font-light max-w-sm">
                We hold ourselves to international standards — so you never have to wonder about the quality of what goes into your treatment.
              </p>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <div key={i} className="card-premium hover:!transform-none fade-in-up flex items-start gap-5 p-6 rounded-xl border-l-2 border-transparent hover:border-[#C9A84C] transition-all duration-200" style={{ transitionDelay:`${i*80}ms` }}>
                  <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] flex-shrink-0">
                    {cert.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle size={13} className="text-[#C9A84C]"/>
                      <h3 className="text-base font-semibold text-[#1C1410] dark:text-[#F0E8DF]">{cert.name}</h3>
                    </div>
                    <p className="text-xs text-[#7A6A60] dark:text-[#8A7878] leading-relaxed font-light">{cert.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="hairline-gold"/>

      {/* ── TIMELINE ─────────────────────────────────────── */}
      <section className="section-dark py-24 lg:py-36">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-16">
            <p className="fade-in-up label-gold mb-4">A Decade of Growth</p>
            <h2 className="fade-in-up delay-100 text-5xl lg:text-6xl text-[#F0E8DF]" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}>
              Our <span style={{ fontStyle:"italic", color:"#C9A84C" }}>Journey</span>
            </h2>
          </div>

          {/* Vertical gold line timeline */}
          <div className="relative">
            {/* Vertical gold line — mobile: left-4 (16px, clear of dot), desktop: centered */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[#C9A84C]/60 via-[#C9A84C]/30 to-transparent sm:left-[calc(50%-1px)]"/>

            <div className="space-y-0">
              {timeline.map((event, i) => {
                const isRight = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`fade-in-up relative flex gap-6 pb-12 ${
                      isRight ? "sm:flex-row" : "sm:flex-row-reverse"
                    } flex-row`}
                    style={{ transitionDelay:`${i*100}ms` }}
                  >
                    {/* Dot — mobile: absolute at left-4 center-aligned; desktop: centered on line */}
                    <div className="absolute left-[9px] sm:left-1/2 top-1.5 w-4 h-4 rounded-full bg-[#C9A84C] border-2 border-[#06030A] sm:-translate-x-1/2 z-10 flex-shrink-0 shadow-[0_0_0_3px_rgba(201,168,76,0.2)]"/>

                    {/* Content — mobile: offset right of the dot+line (pl-12); desktop: split layout */}
                    <div className={`pl-12 sm:pl-0 sm:w-[calc(50%-2rem)] ${isRight ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                      <span className="label-gold block mb-1">{event.year}</span>
                      <h3 className="text-xl text-[#F0E8DF] mb-2" style={{ fontFamily:"var(--font-cormorant)", fontWeight:400 }}>{event.title}</h3>
                      <p className="text-sm text-[#8A7878] leading-relaxed font-light">{event.desc}</p>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden sm:block sm:w-[calc(50%-2rem)]"/>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section-cream py-24 lg:py-32 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%"><defs><pattern id="l-about" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M30 5 Q55 30 30 55 Q5 30 30 5Z" fill="none" stroke="#5B2D5E" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#l-about)"/></svg>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="fade-in-up label-gold mb-6">Come Meet Us</p>
          <h2 className="fade-in-up delay-100 text-5xl lg:text-6xl text-[#1C1410] dark:text-[#F0E8DF] mb-6" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300, lineHeight:0.95 }}>
            Experience Velour<br/><span style={{ fontStyle:"italic", color:"#5B2D5E" }}>for Yourself</span>
          </h2>
          <p className="fade-in-up delay-200 text-sm text-[#7A6A60] dark:text-[#8A7878] mb-10 leading-relaxed font-light max-w-md mx-auto">
            Words can only tell you so much. Book a consultation and experience the Velour difference in person.
          </p>
          <div className="fade-in-up delay-300 flex flex-wrap gap-4 justify-center">
            <Link href="/consultation" className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-semibold text-[#FAF6F1] bg-[#5B2D5E] hover:bg-[#7B3D7E] hover:-translate-y-0.5 shadow-xl transition-all duration-300">
              Book a Consultation <ArrowRight size={15}/>
            </Link>
            <Link href="/team" className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-semibold text-[#5B2D5E] dark:text-[#D4A5C9] border border-[#C9A84C]/50 hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-300">
              Meet Our Team <ArrowRight size={15}/>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
