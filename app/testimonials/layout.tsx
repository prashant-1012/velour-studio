import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reviews — Velour Studio",
  description: "Read what our clients say about Velour Studio — 500+ happy clients, 4.9★ Google rating, luxury beauty services in Baner, Pune.",
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
