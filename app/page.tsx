"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Star, ArrowRight, Scissors, Sparkles, Gem, Heart, Users } from "lucide-react";

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in-up");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in-view"); observer.unobserve(e.target); } }); },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800; const start = performance.now();
        const step = (now: number) => { const p = Math.min((now - start) / duration, 1); const e = 1 - Math.pow(1 - p, 3); setCount(Math.floor(e * target)); if (p < 1) requestAnimationFrame(step); else setCount(target); };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    observer.observe(el); return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Stars({ rating }: { rating: number }) {
  return <div className="flex gap-0.5">{[1,2,3,4,5].map((i) => <Star key={i} size={13} className={i <= rating ? "text-[#C9A84C] fill-[#C9A84C]" : "text-[#DDD0C8] dark:text-[#2A1E2A]"} />)}</div>;
}

function MarqueeStrip() {
  const items = ["Balayage","Bridal Makeup","Hydra Facial","Gel Manicure","Men's Grooming","Keratin Treatment","Gold Facial","Nail Art","Hair Spa","Beard Styling"];
  const repeated = [...items, ...items];
  return (
    <div className="py-4 overflow-hidden border-y border-[#2A1E2A] bg-[#06030A]">
      <div className="flex" style={{ animation: "marquee 32s linear infinite", width: "max-content" }}>
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

const stats = [
  { value: 500, suffix: "+", label: "Happy Clients" },
  { value: 19, suffix: "", label: "Years Combined Experience" },
  { value: 23, suffix: "", label: "Services Offered" },
  { value: 4, suffix: ".9★", label: "Google Rating" },
];

const serviceCategories = [
  { icon: <Scissors size={22} />, name: "Hair", description: "Precision cuts, balayage, keratin, and color by master stylists.", count: 6, anchor: "#hair" },
  { icon: <Sparkles size={22} />, name: "Skin", description: "Hydra facials, gold rituals, anti-acne protocols for radiant skin.", count: 5, anchor: "#skin" },
  { icon: <Gem size={22} />, name: "Nails", description: "Gel manicures, pedicures, nail art and extensions by Neha Joshi.", count: 4, anchor: "#nails" },
  { icon: <Heart size={22} />, name: "Bridal", description: "Bespoke bridal makeup and pre-bridal packages for your big day.", count: 3, anchor: "#bridal" },
  { icon: <Users size={22} />, name: "Men's Grooming", description: "Haircuts, beard styling, de-tan, and skin care for the modern man.", count: 5, anchor: "#mens" },
];

const whyUs = [
  { title: "Master Stylists", desc: "Priya & Rohan bring 19 combined years of professional training and artistry." },
  { title: "Premium Products Only", desc: "L'Oréal Professionnel, Schwarzkopf, Charlotte Tilbury — no compromises." },
  { title: "Hygiene First", desc: "Sterilised tools, single-use applicators, and hospital-grade sanitisation." },
  { title: "Relaxing Ambience", desc: "A thoughtfully designed studio — warm, private, and designed for calm." },
  { title: "Bridal Specialists", desc: "Fully booked bridal seasons since 2017. Your wedding look is in expert hands." },
  { title: "Flexible Booking", desc: "Online requests, priority slots, and same-day availability on select services." },
];

const testimonials = [
  { name: "Ananya Sharma", rating: 5, treatment: "Balayage", text: "Priya made the whole experience completely stress-free. She spent 20 minutes understanding what I wanted before picking up a brush. The result was better than anything I'd seen on Pinterest.", date: "April 2025", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=90" },
  { name: "Rahul Desai", rating: 5, treatment: "Men's Grooming", text: "Rohan's beard styling and face cleanup combo is genuinely the best grooming experience I've had in Pune. The studio is clean, relaxed, and they actually take their time.", date: "March 2025", avatar: "https://images.unsplash.com/photo-1598966739654-5e9a252d8c32?w=400&q=90" },
  { name: "Kavya Reddy", rating: 5, treatment: "Gel Nail Art", text: "Neha is an absolute artist. I showed her a reference and she freestyled on it and made it even better. The gel has lasted three weeks with no chips at all.", date: "May 2025", avatar: "https://plus.unsplash.com/premium_photo-1723773715903-fed95064c2ef?w=400&q=90" },
];

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=90" alt="Velour Studio interior" fill className="object-cover" style={{ animation: "kenburns 14s ease-in-out infinite alternate" }} priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0608] via-[#0A0608]/55 to-[#0A0608]/15" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#5B2D5E]/20 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%"><defs><pattern id="d" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M24 2 L46 24 L24 46 L2 24 Z" fill="none" stroke="#C9A84C" strokeWidth="0.6"/></pattern></defs><rect width="100%" height="100%" fill="url(#d)"/></svg>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 lg:pb-28 pt-40">
          <div className="max-w-3xl">
            <p className="fade-in-up flex items-center gap-3 label-gold mb-7"><span className="w-10 h-px bg-[#C9A84C]"/>Est. 2015 · Baner, Pune</p>
            <h1 className="fade-in-up delay-100 text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-white mb-8" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300, lineHeight:0.95 }}>
              Luxury<br/><span style={{ fontStyle:"italic", color:"#C9A84C" }}>Crafted.</span><br/>Beauty<br/>Defined.
            </h1>
            <p className="fade-in-up delay-200 text-base lg:text-lg text-white/55 leading-relaxed mb-10 max-w-lg font-light">
              Velour Studio is Pune&apos;s premier unisex beauty parlour — where every treatment is a ritual and every client leaves transformed.
            </p>
            <div className="fade-in-up delay-300 flex flex-wrap gap-4 items-center">
              <Link href="/consultation" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-[#1C1410] bg-[#C9A84C] hover:bg-[#E0C06A] hover:-translate-y-0.5 shadow-xl transition-all duration-300">
                Request Consultation <ArrowRight size={15}/>
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white border-b border-white/25 hover:border-[#C9A84C] pb-0.5 transition-all duration-300">
                Explore Services <ArrowRight size={13}/>
              </Link>
            </div>
          </div>
          {/* Floating stat */}
          <div className="hidden lg:flex absolute right-12 bottom-28 items-center gap-4 bg-[#0A0608]/70 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-xl">
            <div className="text-right"><p className="text-2xl font-semibold text-[#C9A84C]" style={{ fontFamily:"var(--font-cormorant)" }}>4.9★</p><p className="text-xs text-white/60 uppercase tracking-widest">Google Rating</p></div>
            <div className="w-px h-10 bg-white/20"/>
            <div className="text-right"><p className="text-2xl font-semibold text-white" style={{ fontFamily:"var(--font-cormorant)" }}>500+</p><p className="text-xs text-white/60 uppercase tracking-widest">Happy Clients</p></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 hairline-gold"/>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <MarqueeStrip/>

      {/* ── 2. STATS ─────────────────────────────────────── */}
      <section className="section-dark py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#2A1E2A]">
            {stats.map((stat, i) => (
              <div key={i} className="text-center lg:px-8">
                <p className="text-5xl lg:text-6xl text-[#C9A84C] mb-2" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}>
                  <Counter target={stat.value} suffix={stat.suffix}/>
                </p>
                <p className="text-xs text-[#8A7878] uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline-gold"/>

      {/* ── 3. SERVICES PREVIEW ──────────────────────────── */}
      <section className="section-cream py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <p className="fade-in-up label-gold mb-4">What We Offer</p>
              <h2 className="fade-in-up delay-100 text-5xl lg:text-6xl xl:text-7xl text-[#1C1410] dark:text-[#F0E8DF]" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}>Our Services</h2>
            </div>
            <Link href="/services" className="fade-in-up delay-200 cta-link self-start lg:self-auto">View Full Menu <ArrowRight size={14}/></Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {serviceCategories.map((cat, i) => (
              <Link key={i} href={`/services${cat.anchor}`} className="card-premium hover:!transform-none fade-in-up group flex flex-col p-7 rounded-2xl" style={{ transitionDelay:`${i*80}ms` }}>
                <div className="w-11 h-11 rounded-xl bg-[#5B2D5E]/8 dark:bg-[#9B5C9E]/15 flex items-center justify-center text-[#5B2D5E] dark:text-[#D4A5C9] mb-5 group-hover:bg-[#5B2D5E] group-hover:text-white transition-all duration-300">
                  {cat.icon}
                </div>
                <h3 className="text-2xl text-[#1C1410] dark:text-[#F0E8DF] mb-2" style={{ fontFamily:"var(--font-cormorant)", fontWeight:400 }}>{cat.name}</h3>
                <p className="text-sm text-[#7A6A60] dark:text-[#8A7878] leading-relaxed flex-1 font-light">{cat.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[11px] text-[#C9A84C] uppercase tracking-[0.15em]">{cat.count} services</span>
                  <ArrowRight size={13} className="text-[#DDD0C8] dark:text-[#2A1E2A] group-hover:text-[#C9A84C] group-hover:translate-x-1 transition-all duration-200"/>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline-gold"/>

      {/* ── 4. WHY CHOOSE US ─────────────────────────────── */}
      <section className="section-dark py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-32">
              <p className="fade-in-up label-gold mb-4">Our Promise</p>
              <h2 className="fade-in-up delay-100 text-5xl lg:text-6xl xl:text-7xl text-[#F0E8DF]" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}>
                Why Choose<br/><span style={{ fontStyle:"italic", color:"#C9A84C" }}>Velour Studio</span>
              </h2>
              <p className="fade-in-up delay-200 text-sm text-[#8A7878] mt-6 leading-relaxed max-w-sm font-light">
                Every detail at Velour Studio is considered — from the products we stock to the temperature of the towels.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {whyUs.map((item, i) => (
                <div key={i} className="card-dark fade-in-up rounded-xl p-6" style={{ transitionDelay:`${(i%2)*100}ms` }}>
                  <span className="block text-[#C9A84C] text-sm font-medium mb-4 tracking-[0.2em]">0{i+1}</span>
                  <h3 className="text-xl text-[#F0E8DF] mb-2" style={{ fontFamily:"var(--font-cormorant)", fontWeight:400 }}>{item.title}</h3>
                  <p className="text-sm text-[#8A7878] leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip/>

      {/* ── 5. MEET THE OWNERS ───────────────────────────── */}
      <section className="section-cream py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <p className="fade-in-up label-gold mb-4">The Founders</p>
              <h2 className="fade-in-up delay-100 text-5xl lg:text-6xl xl:text-7xl text-[#1C1410] dark:text-[#F0E8DF]" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}>Meet the Kapoors</h2>
            </div>
            <Link href="/team" className="fade-in-up delay-200 cta-link self-start lg:self-auto">Meet the Full Team <ArrowRight size={14}/></Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name:"Priya Kapoor", title:"Creative Director & Senior Hair Artist", specialty:"Balayage · Bridal Styling · Hair Coloring", years:"10 years experience", img:"https://plus.unsplash.com/premium_photo-1708271598114-5e6e8892a2ad?w=800&q=80", alt:"Priya Kapoor" },
              { name:"Rohan Kapoor", title:"Grooming & Skin Specialist", specialty:"Hydra Facial · Men's Grooming · Anti-Aging", years:"9 years experience", img:"https://plus.unsplash.com/premium_photo-1779194564446-ed5059f6cc3f?w=800&q=80", alt:"Rohan Kapoor" },
            ].map((person, i) => (
              <Link key={i} href="/team" className="fade-in-up group relative overflow-hidden cursor-pointer" style={{ transitionDelay:`${i*150}ms` }}>
                <div className="relative overflow-hidden" style={{ aspectRatio:"3/4" }}>
                  <Image src={person.img} alt={person.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0608] via-[#0A0608]/20 to-transparent"/>
                  <div className="absolute inset-0 border border-[#C9A84C]/0 group-hover:border-[#C9A84C]/50 transition-all duration-500"/>
                  {/* View Team overlay — appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C9A84C] text-[#1C1410] text-xs font-semibold tracking-wide shadow-lg">
                      View Team <ArrowRight size={12}/>
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="label-gold mb-1.5">{person.years}</p>
                  <h3 className="text-3xl text-white mb-1" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}>{person.name}</h3>
                  <p className="text-sm text-white/50 mb-1">{person.title}</p>
                  <p className="text-xs text-[#C9A84C]/70 tracking-wide">{person.specialty}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline-gold"/>

      {/* ── 6. TESTIMONIALS ──────────────────────────────── */}
      <section className="section-dark py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <p className="fade-in-up label-gold mb-4">Client Love</p>
              <h2 className="fade-in-up delay-100 text-5xl lg:text-6xl xl:text-7xl text-[#F0E8DF]" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}>
                What Our<br/><span style={{ fontStyle:"italic" }}>Clients Say</span>
              </h2>
            </div>
            <Link href="/testimonials" className="fade-in-up delay-200 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A84C] border-b border-[#C9A84C]/40 pb-0.5 hover:gap-3 transition-all duration-200 self-start lg:self-auto">
              Read All Reviews <ArrowRight size={14}/>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="card-dark fade-in-up flex flex-col p-7 rounded-2xl" style={{ transitionDelay:`${i*100}ms` }}>
                <Stars rating={t.rating}/>
                <p className="text-2xl text-[#F0E8DF]/75 leading-snug mt-5 flex-1" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300, fontStyle:"italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-7 pt-5 border-t border-[#2A1E2A] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#C9A84C]/30 flex-shrink-0">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#F0E8DF]">{t.name}</p>
                      <p className="text-xs text-[#C9A84C] mt-0.5 tracking-wide">{t.treatment}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#8A7878]">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA BANNER ────────────────────────────────── */}
      <section className="relative py-32 lg:py-44 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1600&q=80" alt="Velour Studio ambience" fill className="object-cover" style={{ animation:"kenburns 16s ease-in-out infinite alternate" }}/>
          <div className="absolute inset-0 bg-gradient-to-br from-[#5B2D5E]/92 via-[#3D1A40]/88 to-[#0A0608]/92"/>
        </div>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%"><defs><pattern id="l" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M30 5 Q55 30 30 55 Q5 30 30 5Z" fill="none" stroke="#C9A84C" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#l)"/></svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <p className="fade-in-up label-gold mb-6">Your Transformation Awaits</p>
          <h2 className="fade-in-up delay-100 text-6xl sm:text-7xl lg:text-8xl text-white mb-8" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300, lineHeight:0.95 }}>
            Ready for Your<br/><span style={{ fontStyle:"italic", color:"#C9A84C" }}>Transformation?</span>
          </h2>
          <p className="fade-in-up delay-200 text-base text-white/45 mb-12 leading-relaxed font-light max-w-lg mx-auto">
            Book a consultation with Priya or Rohan — and let us design a beauty experience built entirely around you.
          </p>
          <Link href="/consultation" className="fade-in-up delay-300 inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm font-semibold text-[#1C1410] bg-[#C9A84C] hover:bg-[#E0C06A] hover:-translate-y-0.5 shadow-2xl transition-all duration-300">
            Book Your Consultation <ArrowRight size={15}/>
          </Link>
          <p className="fade-in-up delay-400 text-xs text-white/25 mt-6 tracking-[0.2em] uppercase">Tue–Sun · 10:00 AM – 8:00 PM · Baner, Pune</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 hairline-gold"/>
      </section>
    </>
  );
}
