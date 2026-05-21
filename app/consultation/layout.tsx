import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Consultation — Velour Studio",
  description: "Book your personalised beauty consultation at Velour Studio, Baner, Pune. Choose your service, pick a time, and we'll confirm within 2 hours.",
};

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
