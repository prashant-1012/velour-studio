import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Velour Studio",
  description: "Learn the story behind Velour Studio — founded by Priya & Rohan Kapoor in Baner, Pune in 2015. Our values, certifications, and journey.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
