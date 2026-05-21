import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Velour Studio",
  description: "Get in touch with Velour Studio in Baner, Pune. Book an appointment, ask about services, or find us at Shop 7, The Iris Arcade, Baner Road.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
