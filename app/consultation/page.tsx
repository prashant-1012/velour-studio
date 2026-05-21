"use client";

import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight, ArrowLeft, Sparkles, Clock, CalendarDays, User } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

/* ─── Types ──────────────────────────────────────────────── */
type CategoryId = "hair" | "skin" | "nails" | "bridal" | "mens";

interface Category {
  id: CategoryId;
  label: string;
  tagline: string;
  icon: string;
  services: string[];
  image: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

/* ─── Data ───────────────────────────────────────────────── */
const CATEGORIES: Category[] = [
  {
    id: "hair",
    label: "Hair",
    tagline: "Cut · Colour · Treatments",
    icon: "✦",
    services: ["Haircut & Styling", "Balayage / Highlights", "Keratin Treatment", "Hair Spa", "Scalp Treatment"],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=85",
  },
  {
    id: "skin",
    label: "Skin",
    tagline: "Facials · Cleanup · Glow",
    icon: "◈",
    services: ["Signature Facial", "Skin Brightening", "Deep Pore Cleanup", "Anti-Ageing Treatment", "Chemical Peel"],
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85",
  },
  {
    id: "nails",
    label: "Nails",
    tagline: "Manicure · Pedicure · Nail Art",
    icon: "◇",
    services: ["Classic Manicure", "Gel / Shellac Polish", "Nail Art & Extensions", "Spa Pedicure", "Paraffin Treatment"],
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=85",
  },
  {
    id: "bridal",
    label: "Bridal",
    tagline: "Makeup · Mehendi · Packages",
    icon: "❧",
    services: ["Bridal Makeup", "Pre-Bridal Package", "Mehendi Application", "Bridesmaid Package", "Trial Session"],
    image: "https://images.unsplash.com/photo-1596451190630-186aff535bf2?w=800&q=85",
  },
  {
    id: "mens",
    label: "Men's",
    tagline: "Grooming · Beard · Spa",
    icon: "◉",
    services: ["Haircut & Style", "Beard Sculpting", "De-Tan Facial", "Men's Manicure", "Scalp & Hair Spa"],
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=85",
  },
];

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "02:00 PM",
  "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
  "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM",
  "06:30 PM", "07:00 PM", "07:30 PM",
];

const UNAVAILABLE = ["10:30 AM", "11:00 AM", "02:00 PM", "05:00 PM", "06:30 AM"];

const STEP_LABELS = ["Service", "Date & Time", "Your Details", "Confirmed"];

/* ─── Mood Panel content per step ───────────────────────── */
const MOOD: Record<number, { heading: string; sub: string; quote: string }> = {
  1: {
    heading: "What brings you in?",
    sub: "Choose a category and we'll suggest the perfect treatment for you.",
    quote: "Every visit is a ritual, not a routine.",
  },
  2: {
    heading: "Pick your moment.",
    sub: "Select a date and time that suits your schedule. We'll hold it for you.",
    quote: "Luxury is having time that is truly yours.",
  },
  3: {
    heading: "Almost there.",
    sub: "Leave us your details and any special requests. We read every note.",
    quote: "We remember the small things so you don't have to.",
  },
  4: {
    heading: "You're booked.",
    sub: "A confirmation will arrive in your inbox shortly. We can't wait to see you.",
    quote: "Great style begins with great care.",
  },
};

/* ─── Helpers ────────────────────────────────────────────── */
function generateRef() {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `VS-${year}-${num}`;
}

/* ─── Step indicator ─────────────────────────────────────── */
function StepDots({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-0">
      {STEP_LABELS.map((label, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <div key={idx} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500"
                style={{
                  background: done ? "#C9A84C" : active ? "transparent" : "transparent",
                  border: done ? "none" : active ? "2px solid #C9A84C" : "1px solid rgba(201,168,76,0.3)",
                  color: done ? "#1C1410" : active ? "#C9A84C" : "rgba(201,168,76,0.4)",
                  boxShadow: active ? "0 0 0 4px rgba(201,168,76,0.12)" : "none",
                }}
              >
                {done ? <CheckCircle size={13}/> : idx}
              </div>
              <span className="text-[9px] uppercase tracking-widest hidden sm:block"
                style={{ color: active ? "#C9A84C" : done ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.3)" }}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className="w-10 sm:w-16 h-px mx-1 transition-all duration-500"
                style={{ background: done ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.15)" }}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function ConsultationPage() {
  const [step, setStep] = useState(1);
  const [visible, setVisible] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);
  const [service, setService] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [slot, setSlot] = useState<string>("");
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "", notes: "" });
  const [refNum] = useState(generateRef);

  const mood = MOOD[step] ?? MOOD[1];

  function goTo(next: number) {
    setVisible(false);
    setTimeout(() => { setStep(next); setVisible(true); }, 260);
  }

  const canNext1 = !!category && !!service;
  const canNext2 = !!date && !!slot;
  const canNext3 = !!form.name && !!form.phone && !!form.email;

  /* Disable past dates and Mondays */
  function isDisabled(d: Date) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return d < today || d.getDay() === 1;
  }

  return (
    <>
      {/* ── HERO BAR ─────────────────────────────────────── */}
      <div className="section-dark border-b border-[#1E1020] py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="label-gold mb-1.5">Velour Studio · Baner, Pune</p>
              <h1 className="text-4xl sm:text-5xl text-[#F0E8DF]"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 1 }}>
                Request a <span style={{ fontStyle: "italic", color: "#C9A84C" }}>Consultation</span>
              </h1>
            </div>
            <StepDots step={step} />
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ──────────────────────────────────── */}
      <div className="min-h-[calc(100vh-180px)] grid lg:grid-cols-[380px_1fr]">

        {/* ── MOOD PANEL ───────────────────────────────── */}
        <aside className="hidden lg:flex flex-col justify-between bg-[#0A0608] border-r border-[#1E1020] px-10 py-14 relative overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.035]">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="mp-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0L0 0 0 40" fill="none" stroke="#C9A84C" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mp-grid)"/>
            </svg>
          </div>
          {/* Gold vertical bar */}
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#C9A84C]/25 to-transparent"/>

          <div className="relative">
            <div className="w-8 h-px bg-[#C9A84C] mb-8"/>
            <p className="label-gold mb-4">Step {step} of 4</p>
            <h2
              key={step}
              className="text-4xl text-[#F0E8DF] mb-5 transition-all duration-500"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 1.1, opacity: visible ? 1 : 0 }}
            >
              {mood.heading}
            </h2>
            <p className="text-sm text-[#8A7878] leading-relaxed font-light" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
              {mood.sub}
            </p>
          </div>

          {/* Category preview — only show on step 2+ */}
          {step >= 2 && category && (
            <div className="relative mt-8 card-dark rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={category.image} alt={category.label} className="w-full h-32 object-cover opacity-60"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0608] to-transparent"/>
              <div className="absolute bottom-0 p-4">
                <p className="text-[10px] label-gold mb-0.5">{category.label}</p>
                <p className="text-sm text-[#F0E8DF] font-light">{service}</p>
              </div>
            </div>
          )}

          {step >= 3 && date && slot && (
            <div className="mt-4 card-dark rounded-xl p-4 flex items-center gap-3">
              <CalendarDays size={16} className="text-[#C9A84C] flex-shrink-0"/>
              <div>
                <p className="text-[10px] label-gold mb-0.5">Appointment</p>
                <p className="text-sm text-[#F0E8DF] font-light">
                  {date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })} · {slot}
                </p>
              </div>
            </div>
          )}

          {/* Pull quote */}
          <div className="relative mt-auto pt-10">
            <div className="hairline-gold mb-8"/>
            <p className="text-xl text-[#C9A84C]/70 leading-snug"
              style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300, opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
              &ldquo;{mood.quote}&rdquo;
            </p>
          </div>
        </aside>

        {/* ── FORM PANEL ───────────────────────────────── */}
        <div className="section-cream py-12 lg:py-16 px-6 sm:px-8 lg:px-14">
          <div
            className="max-w-2xl"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.3s ease, transform 0.3s ease" }}
          >

            {/* ── STEP 1: Choose Service ─────────────── */}
            {step === 1 && (
              <div>
                <p className="label-gold mb-2">Step 1 of 4</p>
                <h2 className="text-3xl lg:text-4xl text-[#1C1410] dark:text-[#F0E8DF] mb-8"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>
                  Choose your <span style={{ fontStyle: "italic", color: "#C9A84C" }}>service</span>
                </h2>

                {/* Category grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setCategory(cat); setService(""); }}
                      className="relative overflow-hidden rounded-xl border text-left transition-all duration-300 group"
                      style={{
                        borderColor: category?.id === cat.id ? "#C9A84C" : "var(--card-border)",
                        background: category?.id === cat.id ? "rgba(201,168,76,0.06)" : "var(--card-bg)",
                        boxShadow: category?.id === cat.id ? "0 0 0 1px rgba(201,168,76,0.3), var(--card-shadow)" : "var(--card-shadow)",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cat.image} alt={cat.label} className="w-full h-24 object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"/>
                      <div className="p-3.5">
                        <p className="text-xs font-semibold text-[#C9A84C] mb-0.5">{cat.icon} {cat.label}</p>
                        <p className="text-[11px] text-[#7A6A60] dark:text-[#5A4A5A] leading-tight">{cat.tagline}</p>
                      </div>
                      {category?.id === cat.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#C9A84C] flex items-center justify-center">
                          <CheckCircle size={11} className="text-[#1C1410]"/>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Service list */}
                {category && (
                  <div>
                    <p className="label-gold mb-4">Select a specific service</p>
                    <div className="space-y-2">
                      {category.services.map((svc) => (
                        <button
                          key={svc}
                          onClick={() => setService(svc)}
                          className="w-full text-left px-5 py-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between group"
                          style={{
                            borderColor: service === svc ? "#C9A84C" : "var(--card-border)",
                            background: service === svc ? "rgba(201,168,76,0.05)" : "var(--card-bg)",
                          }}
                        >
                          <span className="text-sm text-[#1C1410] dark:text-[#F0E8DF] font-light">{svc}</span>
                          {service === svc
                            ? <CheckCircle size={15} className="text-[#C9A84C]"/>
                            : <ArrowRight size={13} className="text-[#7A6A60] opacity-0 group-hover:opacity-100 transition-opacity"/>
                          }
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10 flex justify-end">
                  <button
                    disabled={!canNext1}
                    onClick={() => goTo(2)}
                    className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
                    style={{ background: "#C9A84C", color: "#1C1410", boxShadow: canNext1 ? "0 8px 24px rgba(201,168,76,0.3)" : "none" }}
                  >
                    Next: Pick a Time <ArrowRight size={14}/>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Date & Time ────────────────── */}
            {step === 2 && (
              <div>
                <p className="label-gold mb-2">Step 2 of 4</p>
                <h2 className="text-3xl lg:text-4xl text-[#1C1410] dark:text-[#F0E8DF] mb-8"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>
                  Choose your <span style={{ fontStyle: "italic", color: "#C9A84C" }}>date & time</span>
                </h2>

                <div className="grid sm:grid-cols-[auto_1fr] gap-8">
                  {/* Calendar */}
                  <div>
                    <p className="label-gold mb-3">Select a date</p>
                    <div className="card-premium rounded-xl p-1 inline-block">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={isDisabled}
                        className="rounded-xl"
                      />
                    </div>
                    <p className="text-[11px] text-[#7A6A60] mt-2">* Studio closed on Mondays</p>
                  </div>

                  {/* Time slots */}
                  <div>
                    <p className="label-gold mb-3">Select a time</p>
                    {date ? (
                      <div className="grid grid-cols-2 gap-2">
                        {TIME_SLOTS.map((t) => {
                          const unavail = UNAVAILABLE.includes(t);
                          const selected = slot === t;
                          return (
                            <button
                              key={t}
                              disabled={unavail}
                              onClick={() => setSlot(t)}
                              className="py-2.5 px-3 rounded-lg text-xs font-medium border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                              style={{
                                borderColor: selected ? "#C9A84C" : "var(--card-border)",
                                background: selected ? "rgba(201,168,76,0.08)" : "var(--card-bg)",
                                color: selected ? "#C9A84C" : "var(--foreground)",
                              }}
                            >
                              <Clock size={10} className="inline mr-1 opacity-60"/>{t}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 text-center text-sm text-[#7A6A60]">
                        <CalendarDays size={28} className="text-[#C9A84C]/30 mb-3"/>
                        <p>Select a date first<br/>to see available slots</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <button onClick={() => goTo(1)} className="flex items-center gap-2 text-sm text-[#7A6A60] hover:text-[#C9A84C] transition-colors">
                    <ArrowLeft size={14}/> Back
                  </button>
                  <button
                    disabled={!canNext2}
                    onClick={() => goTo(3)}
                    className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
                    style={{ background: "#C9A84C", color: "#1C1410", boxShadow: canNext2 ? "0 8px 24px rgba(201,168,76,0.3)" : "none" }}
                  >
                    Next: Your Details <ArrowRight size={14}/>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Details ────────────────────── */}
            {step === 3 && (
              <div>
                <p className="label-gold mb-2">Step 3 of 4</p>
                <h2 className="text-3xl lg:text-4xl text-[#1C1410] dark:text-[#F0E8DF] mb-8"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>
                  Your <span style={{ fontStyle: "italic", color: "#C9A84C" }}>details</span>
                </h2>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="label-gold">Full Name *</Label>
                      <Input
                        placeholder="Priya Sharma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="bg-white dark:bg-[#160D16] border-[#DDD0C8] dark:border-[#2A1E2A] focus:border-[#C9A84C] h-11 rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="label-gold">Phone *</Label>
                      <Input
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="bg-white dark:bg-[#160D16] border-[#DDD0C8] dark:border-[#2A1E2A] focus:border-[#C9A84C] h-11 rounded-xl text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="label-gold">Email Address *</Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bg-white dark:bg-[#160D16] border-[#DDD0C8] dark:border-[#2A1E2A] focus:border-[#C9A84C] h-11 rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="label-gold">Special Requests or Allergies</Label>
                    <Textarea
                      placeholder="Any skin sensitivities, previous treatments, or special requests…"
                      rows={4}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="bg-white dark:bg-[#160D16] border-[#DDD0C8] dark:border-[#2A1E2A] focus:border-[#C9A84C] rounded-xl text-sm resize-none"
                    />
                  </div>
                </div>

                {/* Booking summary */}
                <div className="mt-8 card-premium rounded-xl p-5 space-y-3">
                  <p className="label-gold mb-1">Booking Summary</p>
                  <div className="flex gap-2 text-sm text-[#1C1410] dark:text-[#F0E8DF]">
                    <Sparkles size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5"/>
                    <span className="font-light"><span className="font-medium">{category?.label}</span> — {service}</span>
                  </div>
                  {date && (
                    <div className="flex gap-2 text-sm text-[#1C1410] dark:text-[#F0E8DF]">
                      <CalendarDays size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5"/>
                      <span className="font-light">
                        {date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · {slot}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button onClick={() => goTo(2)} className="flex items-center gap-2 text-sm text-[#7A6A60] hover:text-[#C9A84C] transition-colors">
                    <ArrowLeft size={14}/> Back
                  </button>
                  <button
                    disabled={!canNext3}
                    onClick={() => goTo(4)}
                    className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
                    style={{ background: "#C9A84C", color: "#1C1410", boxShadow: canNext3 ? "0 8px 24px rgba(201,168,76,0.3)" : "none" }}
                  >
                    Confirm Booking <ArrowRight size={14}/>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 4: Confirmation ───────────────── */}
            {step === 4 && (
              <div className="text-center py-8">
                {/* Success icon */}
                <div className="w-20 h-20 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(201,168,76,0.15)]">
                  <CheckCircle size={34} className="text-[#C9A84C]"/>
                </div>

                <p className="label-gold mb-3">Booking Requested</p>
                <h2 className="text-4xl lg:text-5xl text-[#1C1410] dark:text-[#F0E8DF] mb-4"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 1.1 }}>
                  You&apos;re all<br/><span style={{ fontStyle: "italic", color: "#C9A84C" }}>set!</span>
                </h2>
                <p className="text-sm text-[#7A6A60] dark:text-[#5A4A5A] mb-8 max-w-sm mx-auto leading-relaxed">
                  We&apos;ll confirm your appointment within 2 hours via SMS and email. See you soon!
                </p>

                {/* Reference card */}
                <div className="card-premium rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
                  <p className="label-gold mb-5">Confirmation Details</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles size={14} className="text-[#C9A84C]"/>
                      </div>
                      <div>
                        <p className="text-[10px] label-gold mb-0.5">Service</p>
                        <p className="text-sm text-[#1C1410] dark:text-[#F0E8DF] font-light">{category?.label} — {service}</p>
                      </div>
                    </div>
                    {date && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                          <CalendarDays size={14} className="text-[#C9A84C]"/>
                        </div>
                        <div>
                          <p className="text-[10px] label-gold mb-0.5">Date & Time</p>
                          <p className="text-sm text-[#1C1410] dark:text-[#F0E8DF] font-light">
                            {date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · {slot}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-[#C9A84C]"/>
                      </div>
                      <div>
                        <p className="text-[10px] label-gold mb-0.5">Name</p>
                        <p className="text-sm text-[#1C1410] dark:text-[#F0E8DF] font-light">{form.name}</p>
                      </div>
                    </div>
                    <div className="hairline-gold my-2"/>
                    <div className="text-center">
                      <p className="text-[10px] label-gold mb-1">Reference Number</p>
                      <p className="text-2xl text-[#C9A84C] tracking-widest" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
                        {refNum}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#C9A84C]/40 text-sm text-[#C9A84C] hover:bg-[#C9A84C]/8 transition-all duration-200"
                  >
                    Back to Home
                  </Link>
                  <Link
                    href="/services"
                    className="flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: "#C9A84C", color: "#1C1410" }}
                  >
                    Explore Services <ArrowRight size={13}/>
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
