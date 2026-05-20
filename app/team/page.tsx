"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";

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
  const items = ["Priya Kapoor", "Rohan Kapoor", "Neha Joshi", "Arjun Mehta", "Simran Kaur", "Hair Artistry", "Skin Therapy", "Nail Art", "Men's Grooming", "Bridal Specialists"];
  const repeated = [...items, ...items];
  return (
    <div className="py-4 overflow-hidden border-y border-[#2A1E2A] bg-[#06030A]">
      <div className="flex" style={{ animation: "marquee 34s linear infinite", width: "max-content" }}>
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

/* ── Owner flip card ────────────────────────────────────── */
function OwnerCard({ name, title, years, specialty, bio, img, alt, qualifications }: {
  name: string; title: string; years: string; specialty: string; bio: string;
  img: string; alt: string; qualifications: string[];
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          aspectRatio: "3/4",
        }}
      >
        {/* ── FRONT ── */}
        <div className="absolute inset-0 overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
          <Image src={img} alt={alt} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0608] via-[#0A0608]/25 to-transparent" />
          {/* Gold hairline on hover hint */}
          <div className="absolute inset-0 border border-[#C9A84C]/0 hover:border-[#C9A84C]/40 transition-all duration-500" />

          <div className="absolute bottom-0 left-0 right-0 p-7">
            <p className="label-gold mb-1.5">{years}</p>
            <h3 className="text-3xl text-white mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>{name}</h3>
            <p className="text-sm text-white/50 mb-2">{title}</p>
            <p className="text-xs text-[#C9A84C]/70 tracking-wide">{specialty}</p>
            <p className="text-[11px] text-white/30 mt-3 uppercase tracking-widest">Hover to learn more ↻</p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-8"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(160deg, #1A1020 0%, #140C14 100%)",
            border: "1px solid rgba(201,168,76,0.25)",
          }}
        >
          {/* Top accent */}
          <div>
            <div className="w-10 h-px bg-[#C9A84C] mb-6" />
            <p className="label-gold mb-2">{title}</p>
            <h3 className="text-2xl text-[#F0E8DF] mb-4" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>{name}</h3>
            <p className="text-sm text-[#8A7878] leading-relaxed font-light">{bio}</p>
          </div>

          {/* Qualifications */}
          <div>
            <p className="text-[11px] label-gold mb-3">Qualifications</p>
            <ul className="space-y-2">
              {qualifications.map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#8A7878] font-light">
                  <Star size={10} className="text-[#C9A84C] fill-[#C9A84C] mt-0.5 flex-shrink-0" />
                  {q}
                </li>
              ))}
            </ul>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 mt-6 text-xs font-semibold text-[#C9A84C] border-b border-[#C9A84C]/40 pb-0.5 hover:gap-3 transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              Book with {name.split(" ")[0]} <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Staff card ─────────────────────────────────────────── */
function StaffCard({ name, role, bio, funFact, avatarBg }: {
  name: string; role: string; bio: string; funFact: string; avatarBg: string;
}) {
  const [hovered, setHovered] = useState(false);
  const initials = name.split(" ").map((n) => n[0]).join("+");

  return (
    <div
      className="card-premium rounded-2xl overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar strip */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={`https://ui-avatars.com/api/?name=${initials}&background=${avatarBg}&color=fff&size=400&font-size=0.35`}
          alt={name}
          fill
          className="object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Role badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C9A84C] bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#C9A84C]/30">
            {role}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-2xl text-[#1C1410] dark:text-[#F0E8DF] mb-3"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          {name}
        </h3>
        <p className="text-sm text-[#7A6A60] dark:text-[#8A7878] leading-relaxed font-light mb-5">
          {bio}
        </p>

        {/* Fun fact */}
        <div className="border-t border-[#DDD0C8] dark:border-[#2A1E2A] pt-4">
          <p className="text-[11px] label-gold mb-1.5">Signature Service</p>
          <p className="text-sm text-[#7A6A60] dark:text-[#8A7878] italic font-light"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
            &ldquo;{funFact}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   TEAM PAGE
════════════════════════════════════════════════════════════ */
export default function TeamPage() {
  useScrollReveal();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=90"
            alt="Velour Studio team"
            fill
            className="object-cover"
            style={{ animation: "kenburns 14s ease-in-out infinite alternate" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0608] via-[#0A0608]/55 to-[#0A0608]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5B2D5E]/30 to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%"><defs><pattern id="d-team" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M24 2 L46 24 L24 46 L2 24 Z" fill="none" stroke="#C9A84C" strokeWidth="0.6" /></pattern></defs><rect width="100%" height="100%" fill="url(#d-team)" /></svg>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
          <p className="flex items-center gap-3 label-gold mb-4"><span className="w-10 h-px bg-[#C9A84C]" />The People</p>
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl text-white"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 0.95 }}
          >
            Meet Our<br /><span style={{ fontStyle: "italic", color: "#C9A84C" }}>Team</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 hairline-gold" />
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── FOUNDERS ─────────────────────────────────────── */}
      <section className="section-cream py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-14">
            <p className="fade-in-up label-gold mb-4">Co-Founders</p>
            <h2
              className="fade-in-up delay-100 text-5xl lg:text-6xl text-[#1C1410] dark:text-[#F0E8DF]"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              The <span style={{ fontStyle: "italic", color: "#C9A84C" }}>Kapoors</span>
            </h2>
            <p className="fade-in-up delay-200 text-sm text-[#7A6A60] dark:text-[#8A7878] mt-4 max-w-lg font-light leading-relaxed">
              Hover over each card to learn about their background, qualifications, and areas of expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            <div className="fade-in-up">
              <OwnerCard
                name="Priya Kapoor"
                title="Creative Director & Senior Hair Artist"
                years="10 years experience"
                specialty="Balayage · Bridal Styling · Hair Coloring"
                img="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
                alt="Priya Kapoor — Creative Director"
                bio="Priya trained at the L'Oréal Professionnel Academy in Mumbai before co-founding Velour Studio. Her signature balayage technique has earned Velour its reputation as Pune's go-to salon for natural-looking colour. She leads all bridal bookings personally."
                qualifications={[
                  "L'Oréal Professionnel Academy, Mumbai",
                  "Schwarzkopf IGORA Color Certified",
                  "10+ years advanced hair artistry",
                  "Bridal specialist since 2017",
                ]}
              />
            </div>
            <div className="fade-in-up delay-100">
              <OwnerCard
                name="Rohan Kapoor"
                title="Grooming & Skin Specialist"
                years="9 years experience"
                specialty="Hydra Facial · Men's Grooming · Anti-Aging"
                img="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80"
                alt="Rohan Kapoor — Grooming & Skin Specialist"
                bio="Rohan holds a CIDESCO certification in aesthetics and trained in advanced skin therapies across clinics in Delhi and Bengaluru. He launched the men's grooming lounge in 2025 and leads all skin treatment consultations at Velour Studio."
                qualifications={[
                  "CIDESCO Certified Aesthetician",
                  "Advanced Skin Therapy — Bengaluru Academy",
                  "Men's Grooming Specialist",
                  "Hydra Facial Protocol Certified",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="hairline-gold" />

      {/* ── SUPPORTING STAFF ─────────────────────────────── */}
      <section className="section-dark py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-14">
            <p className="fade-in-up label-gold mb-4">Our Specialists</p>
            <h2
              className="fade-in-up delay-100 text-5xl lg:text-6xl text-[#F0E8DF]"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              The <span style={{ fontStyle: "italic", color: "#C9A84C" }}>Studio Team</span>
            </h2>
            <p className="fade-in-up delay-200 text-sm text-[#8A7878] mt-4 max-w-lg font-light leading-relaxed">
              Every member of our team is hand-selected, trained in-house, and shares the same commitment to craft that Velour Studio was built on.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Neha Joshi",
                role: "Senior Nail Artist",
                bio: "Neha specialises in intricate nail art and gel extensions, blending minimalist aesthetics with bold statement pieces. She trained under master nail technicians in Mumbai and has been with Velour Studio since 2019.",
                funFact: "Her marble-effect gel manicures are always booked two weeks in advance.",
                avatarBg: "5B2D5E",
              },
              {
                name: "Arjun Mehta",
                role: "Skin Therapist",
                bio: "Arjun is a certified aesthetician with expertise in hydra-facial, de-tan, and anti-acne protocols. Known for thorough skin consultations and his ability to find the right treatment for every skin type.",
                funFact: "His gold facial ritual takes 45 minutes but clients say the glow lasts for weeks.",
                avatarBg: "C9A84C",
              },
              {
                name: "Simran Kaur",
                role: "Assistant Stylist & Blowout Specialist",
                bio: "Simran joined Velour Studio from the VLCC cosmetology program and has quickly built a loyal following for her effortless blowouts and precise cuts. She assists Priya on all bridal bookings.",
                funFact: "Her 30-minute express blowout is the studio's most popular lunchtime booking.",
                avatarBg: "8B5E8A",
              },
            ].map((staff, i) => (
              <div key={i} className="fade-in-up" style={{ transitionDelay: `${i * 100}ms` }}>
                <StaffCard {...staff} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ── STUDIO CULTURE ───────────────────────────────── */}
      <section className="section-cream py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="fade-in-up relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=900&q=80"
                  alt="Velour Studio team culture"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0608]/20 to-transparent" />
                <div className="absolute inset-0 border border-[#C9A84C]/15" />
              </div>
              {/* Stat card */}
              <div className="card-premium absolute -bottom-5 -right-5 p-5 rounded-xl text-center min-w-[130px]">
                <p className="text-4xl text-[#5B2D5E] dark:text-[#9B5C9E] mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>5</p>
                <p className="text-[11px] label-gold">Team Members</p>
              </div>
            </div>

            {/* Copy */}
            <div>
              <p className="fade-in-up label-gold mb-4">Our Culture</p>
              <h2
                className="fade-in-up delay-100 text-5xl lg:text-6xl text-[#1C1410] dark:text-[#F0E8DF] mb-6"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 0.95 }}
              >
                A Team That<br /><span style={{ fontStyle: "italic", color: "#C9A84C" }}>Grows Together</span>
              </h2>
              <div className="space-y-4 text-sm text-[#7A6A60] dark:text-[#8A7878] leading-relaxed font-light">
                <p className="fade-in-up delay-200">
                  At Velour Studio, we believe the team behind the chair matters as much as the technique in front of it. Every staff member undergoes ongoing training — both technical and client-experience focused — because a great treatment begins with genuine care.
                </p>
                <p className="fade-in-up delay-300">
                  We run monthly skill workshops, brand training sessions with L&apos;Oréal and Schwarzkopf, and regular team reviews to ensure our standards never slip. The result is a studio where the quality is consistent whether you&apos;re booked with Priya or Simran.
                </p>
              </div>

              {/* Values row */}
              <div className="fade-in-up delay-400 grid grid-cols-3 gap-4 mt-8">
                {[
                  { num: "19+", label: "Yrs Combined" },
                  { num: "500+", label: "Clients Served" },
                  { num: "4.9★", label: "Google Rating" },
                ].map((s, i) => (
                  <div key={i} className="text-center p-4 rounded-xl border border-[#DDD0C8] dark:border-[#2A1E2A]">
                    <p className="text-2xl text-[#5B2D5E] dark:text-[#9B5C9E]" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>{s.num}</p>
                    <p className="text-[10px] label-gold mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hairline-gold" />

      {/* ── JOIN OUR TEAM ─────────────────────────────────── */}
      <section className="section-dark py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <p className="fade-in-up label-gold mb-6">Work With Us</p>
          <h2
            className="fade-in-up delay-100 text-5xl lg:text-6xl text-[#F0E8DF] mb-6"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 0.95 }}
          >
            Join the<br /><span style={{ fontStyle: "italic", color: "#C9A84C" }}>Velour Family</span>
          </h2>
          <p className="fade-in-up delay-200 text-sm text-[#8A7878] leading-relaxed font-light max-w-lg mx-auto mb-10">
            We&apos;re always looking for passionate, skilled beauty professionals who share our commitment to craft, care, and continuous learning. If that sounds like you, we&apos;d love to hear from you.
          </p>

          <div className="fade-in-up delay-300 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            {[
              { role: "Hair Stylist", open: true },
              { role: "Skin Therapist", open: false },
              { role: "Nail Technician", open: true },
            ].map((pos, i) => (
              <div key={i} className="card-dark rounded-xl p-5 text-left">
                <p className="text-base text-[#F0E8DF]" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>{pos.role}</p>
                <span className={`inline-block mt-2 text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full ${pos.open ? "text-emerald-400 bg-emerald-400/10" : "text-[#8A7878] bg-[#2A1E2A]"}`}>
                  {pos.open ? "Open" : "Filled"}
                </span>
              </div>
            ))}
          </div>

          <a
            href="mailto:hello@velourstudio.in?subject=Career Enquiry — Velour Studio"
            className="fade-in-up delay-400 inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-semibold text-[#1C1410] bg-[#C9A84C] hover:bg-[#E0C06A] hover:-translate-y-0.5 shadow-xl transition-all duration-300"
          >
            Send Your Portfolio <ArrowRight size={15} />
          </a>
          <p className="fade-in-up delay-500 text-xs text-[#8A7878] mt-4">hello@velourstudio.in · We respond within 48 hours</p>
        </div>
      </section>
    </>
  );
}
