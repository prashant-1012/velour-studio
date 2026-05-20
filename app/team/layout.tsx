import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Team — Velour Studio",
  description: "Meet the artists behind Velour Studio — Priya & Rohan Kapoor and their team of specialist stylists, skin therapists, and nail artists in Baner, Pune.",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
