"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

const PageHero = ({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: PageHeroProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-chip",
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-line",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        }
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="pt-32 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="hero-chip inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
          <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
          {eyebrow}
        </div>
        <h1 className="hero-line mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
          {title}
        </h1>
        <p className="hero-line mt-5 max-w-2xl text-base sm:text-lg text-white/70">
          {subtitle}
        </p>
        <div className="hero-cta mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={primaryCta.href}
            className="rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 hover:text-white hover:border-white/40 transition-colors"
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
