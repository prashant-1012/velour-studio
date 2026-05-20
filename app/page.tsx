"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Star, ArrowRight, Scissors, Sparkles, Gem, Heart, Users } from "lucide-react";

/* ── Intersection Observer ──────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
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
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ── Animated Counter ───────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Star Rating ────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? "text-[#C9A84C] fill-[#C9A84C]" : "text-[#DDD0C8]"}
        />
      ))}
    </div>
  );
}

/* ── Data ───────────────────────────────────────────────── */
const stats = [
  { value: 500, suffix: "+", label: "Happy Clients" },
  { value: 19, suffix: "", label: "Years Combined Experience" },
  { value: 23, suffix: "", label: "Services Offered" },
  { value: 4, suffix: ".9★", label: "Google Rating" },
];

const serviceCategories = [
  {
    icon: <Scissors size={28} />,
    name: "Hair",
    description: "From precision cuts to balayage and keratin treatments — expert hair artistry for every texture and style.",
    count: 6,
    anchor: "#hair",
  },
  {
    icon: <Sparkles size={28} />,
    name: "Skin",
    description: "Hydra facials, gold rituals, anti-acne protocols, and more — science-backed treatments for radiant skin.",
    count: 5,
    anchor: "#skin",
  },
  {
    icon: <Gem size={28} />,
    name: "Nails",
    description: "Gel manicures, pedicures, nail art, and extensions by our specialist nail artist Neha Joshi.",
    count: 4,
    anchor: "#nails",
  },
  {
    icon: <Heart size={28} />,
    name: "Bridal",
    description: "Bespoke bridal makeup, pre-bridal packages, and engagement looks crafted to make you unforgettable.",
    count: 3,
    anchor: "#bridal",
  },
  {
    icon: <Users size={28} />,
    name: "Men's Grooming",
    description: "Premium haircuts, beard styling, de-tan, and skin care designed specifically for the modern man.",
    count: 5,
    anchor: "#mens",
  },
];

const whyUs = [
  { icon: "✦", title: "Master Stylists", desc: "Priya & Rohan bring 19 combined years of professional training and artistry." },
  { icon: "✦", title: "Premium Products Only", desc: "L'Oréal Professionnel, Schwarzkopf, Charlotte Tilbury — no compromises." },
  { icon: "✦", title: "Hygiene First", desc: "Sterilised tools, single-use applicators, and hospital-grade sanitisation protocols." },
  { icon: "✦", title: "Relaxing Ambience", desc: "A thoughtfully designed studio — warm, private, and designed for calm." },
  { icon: "✦", title: "Bridal Specialists", desc: "Fully booked bridal seasons since 2017. Your wedding look is in expert hands." },
  { icon: "✦", title: "Flexible Booking", desc: "Online consultation requests, priority slots, and same-day availability on select services." },
];

const testimonials = [
  {
    name: "Ananya Sharma",
    rating: 5,
    treatment: "Balayage",
    text: "Priya made the whole experience completely stress-free. She spent 20 minutes just understanding what I wanted before even picking up a brush. The result was better than anything I'd seen on Pinterest.",
    date: "April 2025",
  },
  {
    name: "Rahul Desai",
    rating: 5,
    treatment: "Men's Grooming",
    text: "Rohan's beard styling and face cleanup combo is genuinely the best grooming experience I've had in Pune. The studio is clean, relaxed, and they actually take their time.",
    date: "March 2025",
  },
  {
    name: "Kavya Reddy",
    rating: 5,
    treatment: "Gel Nail Art",
    text: "Neha is an absolute artist. I showed her a reference and she freestyled on it and made it even better. The gel has lasted three weeks with no chips.",
    date: "May 2025",
  },
];

/* ════════════════════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════════════════════ */
export default function HomePage() {
  useScrollReveal();

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #FAF6F1 0%, #EDE8E3 35%, #F0E6EF 65%, #FAF6F1 100%)",
          }}
        />
        <div
          className="hidden dark:block absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0F0A0F 0%, #170F17 40%, #1A0F1A 70%, #0F0A0F 100%)" }}
        />
        {/* SVG diamond pattern */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diamonds" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#5B2D5E" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diamonds)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <p className="fade-in-up inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-6">
                <span className="w-8 h-px bg-[#C9A84C]" />
                Baner, Pune
                <span className="w-8 h-px bg-[#C9A84C]" />
              </p>
              <h1
                className="fade-in-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] text-[#1C1410] dark:text-[#F5EFE8] mb-6"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Luxury Crafted.
                <br />
                <span className="gradient-text">Beauty Defined.</span>
              </h1>
              <p className="fade-in-up delay-200 text-lg text-[#7A6A60] dark:text-[#9A8A80] leading-relaxed mb-10 max-w-md">
                Velour Studio is Pune&apos;s premier unisex beauty parlour — where every treatment is a ritual and every client leaves transformed. Founded by Priya &amp; Rohan Kapoor.
              </p>
              <div className="fade-in-up delay-300 flex flex-wrap gap-4">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[#FAF6F1] bg-[#5B2D5E] hover:bg-[#7B3D7E] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Request Consultation
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[#5B2D5E] dark:text-[#D4A5C9] border-2 border-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-300"
                >
                  Explore Services
                </Link>
              </div>
              {/* Trust signals */}
              <div className="fade-in-up delay-400 flex items-center gap-4 mt-10">
                <div className="flex -space-x-2">
                  {[
                    { name: "Priya+Kapoor", bg: "5B2D5E" },
                    { name: "Neha+Joshi", bg: "C9A84C" },
                    { name: "Arjun+Mehta", bg: "8B5E8A" },
                  ].map((p, i) => (
                    <Image
                      key={i}
                      src={`https://ui-avatars.com/api/?name=${p.name}&background=${p.bg}&color=fff`}
                      alt={p.name.replace("+", " ")}
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-[#FAF6F1] dark:border-[#0F0A0F]"
                    />
                  ))}
                </div>
                <p className="text-sm text-[#7A6A60] dark:text-[#9A8A80]">
                  <span className="text-[#1C1410] dark:text-[#F5EFE8] font-semibold">500+</span> happy clients &amp; counting
                </p>
              </div>
            </div>

            {/* Hero image */}
            <div className="fade-in-up delay-200 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80"
                  alt="Velour Studio — luxury beauty salon interior"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/30 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-white dark:bg-[#170F17] rounded-xl p-4 shadow-xl border border-[#DDD0C8] dark:border-[#2E2030]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5B2D5E]/10 flex items-center justify-center">
                    <Star size={18} className="text-[#C9A84C] fill-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1C1410] dark:text-[#F5EFE8]">4.9 ★ Rating</p>
                    <p className="text-xs text-[#7A6A60] dark:text-[#9A8A80]">Google Reviews</p>
                  </div>
                </div>
              </div>
              {/* Decorative gold rings */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-[#C9A84C]/30 pointer-events-none" />
              <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border border-[#C9A84C]/15 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR ─────────────────────────────────── */}
      <section
        className="relative py-14"
        style={{ background: "linear-gradient(135deg, #5B2D5E 0%, #3D1A40 50%, #5B2D5E 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="text-4xl lg:text-5xl font-bold text-[#C9A84C] mb-1"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-[#D4A5C9] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SERVICES PREVIEW ──────────────────────────── */}
      <section className="py-20 lg:py-28 section-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="fade-in-up text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-3">What We Offer</p>
            <h2
              className="fade-in-up delay-100 text-4xl lg:text-5xl font-semibold text-[#1C1410] dark:text-[#F5EFE8]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Our Services
            </h2>
            <p className="fade-in-up delay-200 text-[#7A6A60] dark:text-[#9A8A80] mt-3 max-w-xl mx-auto">
              Five categories of premium beauty and grooming — each executed with the same commitment to craft and precision.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {serviceCategories.map((cat, i) => (
              <Link
                key={i}
                href={`/services${cat.anchor}`}
                className="fade-in-up gold-glow-hover group flex flex-col p-6 rounded-2xl border border-[#DDD0C8] dark:border-[#2E2030] bg-white/60 dark:bg-[#170F17]/60 backdrop-blur-sm"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#5B2D5E]/10 dark:bg-[#7B3D7E]/20 flex items-center justify-center text-[#5B2D5E] dark:text-[#D4A5C9] mb-4 group-hover:bg-[#5B2D5E] group-hover:text-white transition-all duration-300">
                  {cat.icon}
                </div>
                <h3
                  className="text-xl font-semibold text-[#1C1410] dark:text-[#F5EFE8] mb-2"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {cat.name}
                </h3>
                <p className="text-sm text-[#7A6A60] dark:text-[#9A8A80] leading-relaxed flex-1">
                  {cat.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#C9A84C] bg-[#C9A84C]/10 px-2.5 py-1 rounded-full">
                    {cat.count} services
                  </span>
                  <ArrowRight size={14} className="text-[#C9A84C] group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="fade-in-up inline-flex items-center gap-2 text-sm font-semibold text-[#5B2D5E] dark:text-[#D4A5C9] border-b-2 border-[#C9A84C] pb-0.5 hover:gap-3 transition-all duration-200"
            >
              View Full Menu <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. WHY CHOOSE US ─────────────────────────────── */}
      <section className="py-20 lg:py-28 section-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="fade-in-up text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-3">Our Promise</p>
            <h2
              className="fade-in-up delay-100 text-4xl lg:text-5xl font-semibold text-[#1C1410] dark:text-[#F5EFE8]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Why Choose Velour Studio
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <div
                key={i}
                className="fade-in-up flex gap-4 p-6 rounded-2xl border border-[#DDD0C8] dark:border-[#2E2030] bg-white/50 dark:bg-[#170F17]/50"
                style={{ transitionDelay: `${(i % 3) * 100}ms` }}
              >
                <span className="text-[#C9A84C] text-lg mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <h3
                    className="text-lg font-semibold text-[#1C1410] dark:text-[#F5EFE8] mb-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#7A6A60] dark:text-[#9A8A80] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. MEET THE OWNERS ───────────────────────────── */}
      <section className="py-20 lg:py-28 section-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="fade-in-up text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-3">The Founders</p>
            <h2
              className="fade-in-up delay-100 text-4xl lg:text-5xl font-semibold text-[#1C1410] dark:text-[#F5EFE8]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Meet the Kapoors
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Priya Kapoor",
                title: "Creative Director & Senior Hair Artist",
                specialty: "Balayage · Bridal Styling · Hair Coloring",
                years: "10 years experience",
                img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
                alt: "Priya Kapoor — Senior Hair Artist",
              },
              {
                name: "Rohan Kapoor",
                title: "Grooming & Skin Specialist",
                specialty: "Hydra Facial · Men's Grooming · Anti-Aging",
                years: "9 years experience",
                img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
                alt: "Rohan Kapoor — Grooming & Skin Specialist",
              },
            ].map((person, i) => (
              <div
                key={i}
                className="fade-in-up gold-glow-hover group relative rounded-2xl overflow-hidden border border-[#DDD0C8] dark:border-[#2E2030]"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative h-72 sm:h-80">
                  <Image
                    src={person.img}
                    alt={person.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/80 via-[#1C1410]/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-medium text-[#C9A84C] uppercase tracking-widest mb-1">{person.years}</p>
                  <h3
                    className="text-2xl font-semibold text-white mb-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {person.name}
                  </h3>
                  <p className="text-sm text-[#D4A5C9] mb-2">{person.title}</p>
                  <p className="text-xs text-[#C9A84C]/80">{person.specialty}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/team"
              className="fade-in-up inline-flex items-center gap-2 text-sm font-semibold text-[#5B2D5E] dark:text-[#D4A5C9] border-b-2 border-[#C9A84C] pb-0.5 hover:gap-3 transition-all duration-200"
            >
              Meet the Full Team <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS PREVIEW ──────────────────────── */}
      <section className="py-20 lg:py-28 section-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="fade-in-up text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-3">Client Love</p>
            <h2
              className="fade-in-up delay-100 text-4xl lg:text-5xl font-semibold text-[#1C1410] dark:text-[#F5EFE8]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="fade-in-up flex flex-col p-6 rounded-2xl border border-[#DDD0C8] dark:border-[#2E2030] bg-white/70 dark:bg-[#170F17]/70 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Stars rating={t.rating} />
                <p className="text-sm text-[#7A6A60] dark:text-[#9A8A80] leading-relaxed mt-4 flex-1 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-[#DDD0C8] dark:border-[#2E2030] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#1C1410] dark:text-[#F5EFE8]">{t.name}</p>
                    <p className="text-xs text-[#C9A84C]">{t.treatment}</p>
                  </div>
                  <p className="text-xs text-[#7A6A60] dark:text-[#9A8A80]">{t.date}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/testimonials"
              className="fade-in-up inline-flex items-center gap-2 text-sm font-semibold text-[#5B2D5E] dark:text-[#D4A5C9] border-b-2 border-[#C9A84C] pb-0.5 hover:gap-3 transition-all duration-200"
            >
              Read All Reviews <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. CTA BANNER ────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden texture-overlay">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #5B2D5E 0%, #3D1A40 40%, #8B5E8A 100%)" }}
        />
        {/* SVG leaf pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaves" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 5 Q55 30 30 55 Q5 30 30 5Z" fill="none" stroke="#C9A84C" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaves)" />
          </svg>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C9A84C]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="fade-in-up text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-4">
            Your Transformation Awaits
          </p>
          <h2
            className="fade-in-up delay-100 text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Ready for Your Transformation?
          </h2>
          <p className="fade-in-up delay-200 text-lg text-[#D4A5C9] mb-10 leading-relaxed">
            Book a consultation with Priya or Rohan — and let us design a beauty experience built entirely around you.
          </p>
          <Link
            href="/consultation"
            className="fade-in-up delay-300 inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-[#1C1410] bg-[#C9A84C] hover:bg-[#E0C06A] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Book Your Consultation
            <ArrowRight size={16} />
          </Link>
          <p className="fade-in-up delay-400 text-sm text-[#D4A5C9]/70 mt-4">
            Tue–Sun · 10:00 AM – 8:00 PM · Baner, Pune
          </p>
        </div>
      </section>
    </>
  );
}
