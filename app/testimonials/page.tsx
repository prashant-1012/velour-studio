"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Star, ArrowRight, Quote } from "lucide-react";

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
  const items = ["5★ Balayage", "5★ Men's Grooming", "4★ Hydra Facial", "5★ Bridal Makeup", "5★ Nail Art", "4★ Keratin Treatment", "5★ Gold Facial", "4.9★ Google Rating"];
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

/* ── Animated counter ───────────────────────────────────── */
function Counter({ target, decimals = 0 }: { target: number; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1600; const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(parseFloat((eased * target).toFixed(decimals)));
          if (p < 1) requestAnimationFrame(step); else setCount(target);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    observer.observe(el); return () => observer.disconnect();
  }, [target, decimals]);
  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}

/* ── Star display ───────────────────────────────────────── */
function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= rating ? "text-[#C9A84C] fill-[#C9A84C]" : "text-[#2A1E2A] fill-[#2A1E2A]"} />
      ))}
    </div>
  );
}

/* ── Rating bar ─────────────────────────────────────────── */
function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#8A7878] w-4 text-right flex-shrink-0">{stars}</span>
      <Star size={11} className="text-[#C9A84C] fill-[#C9A84C] flex-shrink-0" />
      <div className="flex-1 h-1.5 rounded-full bg-[#2A1E2A] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#C9A84C] transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-[#5A4A5A] w-5 flex-shrink-0">{count}</span>
    </div>
  );
}

/* ── Data ───────────────────────────────────────────────── */
const testimonials = [
  {
    name: "Ananya Sharma",
    rating: 5,
    treatment: "Balayage",
    text: "I was so nervous about going balayage for the first time, but Priya made the whole experience completely stress-free. She spent 20 minutes just understanding what I wanted before even picking up a brush. The result was honestly better than anything I'd seen on Pinterest. I've been coming back every 3 months and I won't go anywhere else.",
    date: "April 2025",
    avatar: "Ananya+Sharma",
    avatarBg: "5B2D5E",
  },
  {
    name: "Rahul Desai",
    rating: 5,
    treatment: "Men's Grooming Package",
    text: "Rohan's beard styling and face cleanup combo is genuinely the best grooming experience I've had in Pune. The studio doesn't feel like a typical barber shop — it's clean, relaxed, and they actually take their time. The D-tan treatment worked better than I expected. Will be back monthly.",
    date: "March 2025",
    avatar: "Rahul+Desai",
    avatarBg: "8B5E8A",
  },
  {
    name: "Meera Nair",
    rating: 4,
    treatment: "Hydra Facial",
    text: "Arjun was thorough and professional. My skin felt incredibly smooth after the hydra facial, and he explained every step of what he was doing. The studio itself is very calming — I almost fell asleep during the treatment. Minor note: I had to wait about 10 minutes past my appointment, but they apologised and it wasn't a dealbreaker.",
    date: "April 2025",
    avatar: "Meera+Nair",
    avatarBg: "C9A84C",
  },
  {
    name: "Pooja Kulkarni",
    rating: 5,
    treatment: "Bridal Package",
    text: "Velour Studio did my bridal makeup and pre-bridal package for my wedding in February. Priya understood the look I wanted — natural and glowing, not heavy — and she delivered exactly that. The hair and makeup lasted all day and into the night. My photos turned out beautifully. Worth every rupee.",
    date: "February 2025",
    avatar: "Pooja+Kulkarni",
    avatarBg: "7B3D7E",
  },
  {
    name: "Kavya Reddy",
    rating: 5,
    treatment: "Gel Nail Art",
    text: "Neha is an absolute artist. I showed her a reference for a floral nail art design and she freestyled on it and made it even better. The gel has lasted three weeks with no chips. The studio is beautiful — very premium and clean. Already booked my next appointment.",
    date: "May 2025",
    avatar: "Kavya+Reddy",
    avatarBg: "5B2D5E",
  },
  {
    name: "Sameer Joshi",
    rating: 4,
    treatment: "Keratin Treatment",
    text: "Came in with very frizzy, unmanageable hair and left with the smoothest hair I've had in years. Priya walked me through the aftercare properly, which I appreciated. The treatment took about 2.5 hours but it was worth the wait. My only suggestion would be to have more parking options nearby.",
    date: "March 2025",
    avatar: "Sameer+Joshi",
    avatarBg: "3D1A40",
  },
];

const ratingBreakdown = [
  { stars: 5, count: 4 },
  { stars: 4, count: 2 },
  { stars: 3, count: 0 },
];
const totalReviews = ratingBreakdown.reduce((s, r) => s + r.count, 0);
const avgRating = ratingBreakdown.reduce((s, r) => s + r.stars * r.count, 0) / totalReviews;

/* ════════════════════════════════════════════════════════════
   TESTIMONIALS PAGE
════════════════════════════════════════════════════════════ */
export default function TestimonialsPage() {
  useScrollReveal();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=90"
            alt="Happy Velour Studio client"
            fill
            className="object-cover"
            style={{ animation: "kenburns 14s ease-in-out infinite alternate" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0608] via-[#0A0608]/60 to-[#0A0608]/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D1A40]/35 to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%"><defs><pattern id="d-t" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M24 2 L46 24 L24 46 L2 24 Z" fill="none" stroke="#C9A84C" strokeWidth="0.6"/></pattern></defs><rect width="100%" height="100%" fill="url(#d-t)"/></svg>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
          <p className="flex items-center gap-3 label-gold mb-4"><span className="w-10 h-px bg-[#C9A84C]"/>Client Love</p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl text-white" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300, lineHeight:0.95 }}>
            What Our<br/><span style={{ fontStyle:"italic", color:"#C9A84C" }}>Clients Say</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 hairline-gold"/>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <MarqueeStrip/>

      {/* ── RATING SUMMARY ───────────────────────────────── */}
      <section className="section-dark py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-center">

            {/* Average score */}
            <div className="text-center md:text-left fade-in-up">
              <p
                className="text-8xl lg:text-9xl text-[#C9A84C] leading-none mb-2"
                style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}
              >
                <Counter target={avgRating} decimals={1}/>
              </p>
              <Stars rating={Math.round(avgRating)} size={20}/>
              <p className="text-xs text-[#5A4A5A] mt-3 uppercase tracking-[0.2em]">Average Rating</p>
            </div>

            {/* Bar chart */}
            <div className="fade-in-up delay-100 space-y-3">
              {ratingBreakdown.map((r) => (
                <RatingBar key={r.stars} stars={r.stars} count={r.count} total={totalReviews}/>
              ))}
            </div>

            {/* Google badge + total */}
            <div className="fade-in-up delay-200 flex flex-col items-center md:items-end gap-4">
              {/* Google Reviews badge */}
              <div className="card-dark rounded-2xl p-6 flex items-center gap-4 w-full max-w-[220px]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  {/* Google G */}
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F0E8DF]">Google Reviews</p>
                  <p className="text-xs text-[#8A7878]">{totalReviews} verified reviews</p>
                </div>
              </div>

              <div className="text-center md:text-right">
                <p className="text-4xl text-[#F0E8DF]" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}>
                  <Counter target={totalReviews}/>+
                </p>
                <p className="text-xs text-[#5A4A5A] uppercase tracking-[0.2em] mt-1">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hairline-gold"/>

      {/* ── ALL REVIEWS ──────────────────────────────────── */}
      <section className="section-cream py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-14">
            <p className="fade-in-up label-gold mb-4">All Reviews</p>
            <h2
              className="fade-in-up delay-100 text-5xl lg:text-6xl text-[#1C1410] dark:text-[#F0E8DF]"
              style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}
            >
              Every <span style={{ fontStyle:"italic", color:"#C9A84C" }}>Story</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="card-premium fade-in-up rounded-2xl p-8 flex flex-col"
                style={{ transitionDelay:`${(i % 3) * 90}ms` }}
              >
                {/* Quote icon */}
                <Quote size={28} className="text-[#C9A84C]/30 mb-4" />

                {/* Pull quote — large Cormorant italic */}
                <p
                  className="flex-1 text-[#1C1410] dark:text-[#F0E8DF] leading-snug mb-6"
                  style={{ fontFamily:"var(--font-cormorant)", fontSize:"1.25rem", fontWeight:300, fontStyle:"italic" }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Treatment badge */}
                <span className="inline-block self-start text-[10px] font-semibold tracking-[0.18em] uppercase text-[#C9A84C] bg-[#C9A84C]/8 dark:bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-3 py-1.5 rounded-full mb-5">
                  {t.treatment}
                </span>

                {/* Divider */}
                <div className="h-px bg-[#DDD0C8] dark:bg-[#2A1E2A] mb-5"/>

                {/* Footer */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${t.avatar}&background=${t.avatarBg}&color=fff&size=80`}
                      alt={t.name.replace("+", " ")}
                      width={38}
                      height={38}
                      className="rounded-full flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#1C1410] dark:text-[#F0E8DF]">{t.name}</p>
                      <p className="text-xs text-[#7A6A60] dark:text-[#5A4A5A]">{t.date}</p>
                    </div>
                  </div>
                  <Stars rating={t.rating} size={13}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline-gold"/>

      {/* ── FEATURED QUOTE ───────────────────────────────── */}
      <section className="section-dark py-24 lg:py-36">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="fade-in-up label-gold mb-8">Most Loved</p>
          <div className="fade-in-up delay-100 relative">
            <Quote size={48} className="text-[#C9A84C]/20 mx-auto mb-6"/>
            <p
              className="text-3xl sm:text-4xl lg:text-5xl text-[#F0E8DF] leading-tight mb-8"
              style={{ fontFamily:"var(--font-cormorant)", fontWeight:300, fontStyle:"italic" }}
            >
              &ldquo;Priya understood the look I wanted — natural and glowing, not heavy — and she delivered exactly that. The hair and makeup lasted all day and into the night.&rdquo;
            </p>
          </div>
          <div className="fade-in-up delay-200 flex items-center justify-center gap-4">
            <Image
              src="https://ui-avatars.com/api/?name=Pooja+Kulkarni&background=7B3D7E&color=fff&size=80"
              alt="Pooja Kulkarni"
              width={44}
              height={44}
              className="rounded-full"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-[#F0E8DF]">Pooja Kulkarni</p>
              <p className="text-xs text-[#8A7878]">Bridal Package · February 2025</p>
            </div>
            <div className="w-px h-8 bg-[#2A1E2A] mx-2"/>
            <Stars rating={5} size={14}/>
          </div>
        </div>
      </section>

      <MarqueeStrip/>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section-cream py-24 lg:py-32 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%"><defs><pattern id="l-t" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M30 5 Q55 30 30 55 Q5 30 30 5Z" fill="none" stroke="#5B2D5E" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#l-t)"/></svg>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="fade-in-up label-gold mb-6">Love What You See?</p>
          <h2
            className="fade-in-up delay-100 text-5xl lg:text-6xl text-[#1C1410] dark:text-[#F0E8DF] mb-6"
            style={{ fontFamily:"var(--font-cormorant)", fontWeight:300, lineHeight:0.95 }}
          >
            Your story starts
            <br/><span style={{ fontStyle:"italic", color:"#5B2D5E" }}>with a visit</span>
          </h2>
          <p className="fade-in-up delay-200 text-sm text-[#7A6A60] dark:text-[#8A7878] mb-10 leading-relaxed font-light max-w-md mx-auto">
            Join 500+ clients who trust Velour Studio for their most important beauty moments. Book your consultation today.
          </p>
          <Link
            href="/consultation"
            className="fade-in-up delay-300 inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-semibold text-[#FAF6F1] bg-[#5B2D5E] hover:bg-[#7B3D7E] hover:-translate-y-0.5 shadow-xl transition-all duration-300"
          >
            Book Your Visit <ArrowRight size={15}/>
          </Link>
        </div>
      </section>
    </>
  );
}
