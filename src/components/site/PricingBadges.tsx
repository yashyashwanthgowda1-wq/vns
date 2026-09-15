"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Crown, Diamond, Gem, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { pricingTiers, type PricingTier } from "@/data/venue";
import { cn } from "@/lib/utils";

type TierSlug = PricingTier["slug"];

const tierMeta: Record<
  TierSlug,
  {
    icon: typeof Gem;
    gradient: string;
    emblem: string;
    ink: string;
    glow: string;
    delay: string;
  }
> = {
  silver: {
    icon: Gem,
    gradient: "linear-gradient(140deg,#f1f2f5 0%,#cfd3da 38%,#9aa0ab 72%,#e7eaef 100%)",
    emblem: "#5f656e",
    ink: "#3a3f47",
    glow: "rgba(122,129,142,0.45)",
    delay: "0s",
  },
  gold: {
    icon: Crown,
    gradient: "linear-gradient(140deg,#f8eec4 0%,#d4af37 42%,#a8842b 70%,#f0e3b0 100%)",
    emblem: "#7a6118",
    ink: "#4a3a12",
    glow: "rgba(168,132,43,0.5)",
    delay: "0.5s",
  },
  platinum: {
    icon: Sparkles,
    gradient: "linear-gradient(140deg,#ffffff 0%,#e4e9ef 40%,#bcc6d4 74%,#f4f6f9 100%)",
    emblem: "#7f8b9a",
    ink: "#333a43",
    glow: "rgba(151,163,179,0.5)",
    delay: "1s",
  },
  diamond: {
    icon: Diamond,
    gradient: "linear-gradient(140deg,#eaf7ff 0%,#a5d4f2 42%,#67aad8 74%,#e2f3ff 100%)",
    emblem: "#1f5f8a",
    ink: "#143b56",
    glow: "rgba(80,160,214,0.5)",
    delay: "1.5s",
  },
};

const inr = (n: number) => `\u20B9${n.toLocaleString("en-IN")}`;

export function PricingBadges() {
  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
      {pricingTiers.map((tier, i) => (
        <PricingBadge key={tier.slug} tier={tier} index={i} />
      ))}
    </div>
  );
}

function PricingBadge({ tier, index }: { tier: PricingTier; index: number }) {
  const meta = tierMeta[tier.slug];
  const Icon = meta.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.09 }}
      className="h-full"
    >
      <div className="badge-float h-full" style={{ animationDelay: meta.delay }}>
        <article
          className={cn(
            "badge-card group relative h-full overflow-hidden border border-ink/10 px-6 pb-7 pt-10 text-center",
            tier.featured && "lg:-my-4",
          )}
          style={{ background: meta.gradient, "--glow": meta.glow } as CSSProperties}
        >
          <span className="badge-shine" aria-hidden="true" />
          <span className="badge-sweep" aria-hidden="true" />

          {tier.featured && (
            <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 bg-ink px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold">
              Most Popular
            </span>
          )}

          <span
            className="badge-emblem mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/60 bg-white/45"
            style={{ color: meta.emblem }}
          >
            <Icon className="h-7 w-7" strokeWidth={1.5} />
          </span>

          <h3 className="mt-5 font-display text-3xl" style={{ color: meta.ink }}>
            {tier.name}
          </h3>
          <p
            className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] opacity-70"
            style={{ color: meta.ink }}
          >
            {tier.tagline}
          </p>

          <p className="mt-7" style={{ color: meta.ink }}>
            <span className="block text-[0.65rem] uppercase tracking-[0.22em] opacity-70">
              Starting at
            </span>
            <span className="mt-1 flex items-end justify-center gap-2" style={{ color: meta.ink }}>
              <span className="badge-price block font-display text-[2.6rem] leading-none">
                {inr(tier.price)}
              </span>
              <span className="pb-1 text-[0.65rem] uppercase tracking-[0.18em] opacity-70">
                + GST
              </span>
            </span>
          </p>

          <Link
            href={`/booking?pkg=${tier.name}`}
            className="mt-7 inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.18em] underline-offset-4 transition-colors hover:underline"
            style={{ color: meta.ink }}
          >
            Check availability <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </article>
      </div>
    </motion.div>
  );
}
