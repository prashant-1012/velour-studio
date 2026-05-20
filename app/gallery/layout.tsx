import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Velour Lookbook — Gallery",
  description: "Browse transformations from Velour Studio — hair colour, bridal makeup, skin treatments, nail art, and men's grooming in Baner, Pune.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
