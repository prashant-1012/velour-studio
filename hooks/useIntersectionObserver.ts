"use client";

import { useEffect, useRef } from "react";

export function useIntersectionObserver(
  selector = ".fade-in-up",
  options: IntersectionObserverInit = { threshold: 0.15 }
) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(selector);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, options]);

  return containerRef;
}
