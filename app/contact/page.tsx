"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
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

const subjects = [
  "General Enquiry",
  "Service Question",
  "Bridal Booking",
  "Feedback",
  "Other",
];

const contactDetails: { icon: React.ReactNode; label: string; value: string; href: string | null }[] = [
  { icon: <MapPin size={18} />, label: "Address", value: "Shop 7, The Iris Arcade, Baner Road, Baner, Pune — 411045", href: null },
  { icon: <Phone size={18} />, label: "Phone", value: "+91 96570 88200", href: "tel:+919657088200" },
  { icon: <Mail size={18} />, label: "Email", value: "hello@velourstudio.in", href: "mailto:hello@velourstudio.in" },
  { icon: <Clock size={18} />, label: "Hours", value: "Tue–Sun: 10:00 AM – 8:00 PM\nClosed Mondays", href: null },
];

export default function ContactPage() {
  useScrollReveal();

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Thank you! We'll get back to you within 24 hours.", {
      description: "Our team will reach out to you at " + form.email,
      duration: 5000,
    });
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[460px] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1600&q=90"
            alt="Velour Studio — contact us"
            fill
            className="object-cover"
            style={{ animation: "kenburns 14s ease-in-out infinite alternate" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0608] via-[#0A0608]/60 to-[#0A0608]/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D1A40]/35 to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%"><defs><pattern id="d-c" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M24 2 L46 24 L24 46 L2 24 Z" fill="none" stroke="#C9A84C" strokeWidth="0.6"/></pattern></defs><rect width="100%" height="100%" fill="url(#d-c)"/></svg>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
          <p className="flex items-center gap-3 label-gold mb-4"><span className="w-10 h-px bg-[#C9A84C]"/>Say Hello</p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl text-white" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300, lineHeight:0.95 }}>
            Get In<br/><span style={{ fontStyle:"italic", color:"#C9A84C" }}>Touch</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 hairline-gold"/>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <section className="section-cream py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

            {/* ── LEFT — Form ────────────────────────────── */}
            <div>
              <p className="fade-in-up label-gold mb-4">Send a Message</p>
              <h2 className="fade-in-up delay-100 text-4xl lg:text-5xl text-[#1C1410] dark:text-[#F0E8DF] mb-8" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}>
                We&apos;d love to<br/><span style={{ fontStyle:"italic", color:"#C9A84C" }}>hear from you</span>
              </h2>

              <form onSubmit={handleSubmit} className="fade-in-up delay-200 space-y-5">
                {/* Name + Phone row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="label-gold">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Priya Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-white dark:bg-[#160D16] border-[#DDD0C8] dark:border-[#2A1E2A] focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 h-11 rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="label-gold">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-white dark:bg-[#160D16] border-[#DDD0C8] dark:border-[#2A1E2A] focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 h-11 rounded-xl text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="label-gold">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-white dark:bg-[#160D16] border-[#DDD0C8] dark:border-[#2A1E2A] focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 h-11 rounded-xl text-sm"
                  />
                </div>

                {/* Subject dropdown */}
                <div className="space-y-2">
                  <Label className="label-gold">Subject *</Label>
                  <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v ?? "" })}>
                    <SelectTrigger className="bg-white dark:bg-[#160D16] border-[#DDD0C8] dark:border-[#2A1E2A] focus:border-[#C9A84C] h-11 rounded-xl text-sm">
                      <SelectValue placeholder="Select a subject…" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-[#DDD0C8] dark:border-[#2A1E2A]">
                      {subjects.map((s) => (
                        <SelectItem key={s} value={s} className="text-sm">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="label-gold">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you…"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="bg-white dark:bg-[#160D16] border-[#DDD0C8] dark:border-[#2A1E2A] focus:border-[#C9A84C] focus:ring-[#C9A84C]/20 rounded-xl text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full text-sm font-semibold text-[#1C1410] bg-[#C9A84C] hover:bg-[#E0C06A] disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-lg transition-all duration-300"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                      Sending…
                    </span>
                  ) : (
                    <><span>Send Message</span><ArrowRight size={15}/></>
                  )}
                </button>

                <p className="text-xs text-[#7A6A60] dark:text-[#5A4A5A] text-center">
                  We respond to all enquiries within 24 hours · Tue–Sun, 10AM–8PM
                </p>
              </form>
            </div>

            {/* ── RIGHT — Info sidebar ────────────────────── */}
            <div className="fade-in-up delay-100 space-y-6">
              <div>
                <p className="label-gold mb-4">Find Us</p>
                <h2 className="text-4xl lg:text-5xl text-[#1C1410] dark:text-[#F0E8DF] mb-8" style={{ fontFamily:"var(--font-cormorant)", fontWeight:300 }}>
                  Visit the<br/><span style={{ fontStyle:"italic", color:"#C9A84C" }}>Studio</span>
                </h2>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                {contactDetails.map((d, i) => (
                  <div key={i} className="card-premium rounded-xl p-5 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] flex-shrink-0 mt-0.5">
                      {d.icon}
                    </div>
                    <div>
                      <p className="text-[11px] label-gold mb-1">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} className="text-sm text-[#1C1410] dark:text-[#F0E8DF] hover:text-[#C9A84C] transition-colors duration-200 font-light">
                          {d.value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#1C1410] dark:text-[#F0E8DF] font-light whitespace-pre-line">{d.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="card-premium rounded-xl p-5">
                <p className="text-[11px] label-gold mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { icon: <InstagramIcon/>, label: "Instagram", href: "#" },
                    { icon: <FacebookIcon/>, label: "Facebook", href: "#" },
                    { icon: <WhatsAppIcon/>, label: "WhatsApp", href: "https://wa.me/919657088200" },
                  ].map(({ icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#DDD0C8] dark:border-[#2A1E2A] text-[#7A6A60] dark:text-[#8A7878] hover:text-[#C9A84C] hover:border-[#C9A84C]/50 text-sm font-medium transition-all duration-200"
                    >
                      {icon}
                      <span className="text-xs">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Fake map */}
              <div className="card-dark rounded-xl overflow-hidden relative h-52">
                {/* Grid lines */}
                <div className="absolute inset-0"
                  style={{
                    backgroundImage: "linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                {/* Road lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-px bg-[#C9A84C]/10 top-1/2"/>
                  <div className="absolute w-px h-full bg-[#C9A84C]/10 left-1/2"/>
                  <div className="absolute w-3/4 h-px bg-[#C9A84C]/6 top-1/3"/>
                  <div className="absolute w-px h-2/3 bg-[#C9A84C]/6 left-1/3"/>
                </div>
                {/* Pin */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#5B2D5E] flex items-center justify-center shadow-lg shadow-[#5B2D5E]/40">
                    <MapPin size={18} className="text-[#C9A84C]"/>
                  </div>
                  <div className="text-center bg-[#0A0608]/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#2A1E2A]">
                    <p className="text-xs font-semibold text-[#F0E8DF]">Velour Studio</p>
                    <p className="text-[10px] text-[#8A7878]">The Iris Arcade, Baner, Pune</p>
                  </div>
                </div>
                {/* Label */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] text-[#5A4A5A] uppercase tracking-widest">Map Preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hairline-gold"/>

      {/* ── QUICK LINKS ──────────────────────────────────── */}
      <section className="section-dark py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="fade-in-up label-gold mb-10 text-center">Or Jump Straight In</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { label: "Book a Consultation", desc: "Choose your service, pick a time, and we'll confirm within 2 hours.", href: "/consultation", cta: "Request Consultation" },
              { label: "Browse Services", desc: "Explore our full menu of hair, skin, nail, bridal, and grooming services.", href: "/services", cta: "View All Services" },
              { label: "Meet the Team", desc: "Get to know Priya, Rohan, and the rest of the Velour Studio specialists.", href: "/team", cta: "Meet the Team" },
            ].map((item, i) => (
              <div key={i} className="card-dark fade-in-up rounded-2xl p-8 flex flex-col" style={{ transitionDelay:`${i*90}ms` }}>
                <h3 className="text-2xl text-[#F0E8DF] mb-3" style={{ fontFamily:"var(--font-cormorant)", fontWeight:400 }}>{item.label}</h3>
                <p className="text-sm text-[#8A7878] leading-relaxed font-light flex-1">{item.desc}</p>
                <Link href={item.href} className="inline-flex items-center gap-2 mt-6 text-xs font-semibold text-[#C9A84C] border-b border-[#C9A84C]/40 pb-0.5 hover:gap-3 transition-all duration-200 self-start">
                  {item.cta} <ArrowRight size={11}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
