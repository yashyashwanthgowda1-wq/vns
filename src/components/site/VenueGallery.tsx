"use client";

import Image from "next/image";
import { Tangerine } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, FileText } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { VenueGallery as VenueGalleryData } from "@/data/venue-galleries";

const hallInitialFont = Tangerine({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

function HallHeading({ name }: { name: string }) {
  const [initials, ...rest] = name.split(" ");

  return (
    <h1 className="mt-3 flex items-end gap-2 leading-none">
      <span
        className={cn(
          hallInitialFont.className,
          "text-7xl font-bold leading-[0.7] text-gold sm:text-8xl lg:text-9xl",
        )}
      >
        {initials}
      </span>
      <span className="pb-1 font-display text-4xl font-medium leading-none text-ivory sm:text-5xl lg:pb-2 lg:text-6xl">
        {rest.join(" ")}
      </span>
    </h1>
  );
}

export function VenueGallery({ gallery }: { gallery: VenueGalleryData }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : gallery.images[activeIndex];

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? 0 : (current - 1 + gallery.images.length) % gallery.images.length,
    );
  }, [gallery.images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? 0 : (current + 1) % gallery.images.length));
  }, [gallery.images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, showNext, showPrevious]);

  return (
    <section className="bg-ink px-4 pb-16 pt-28 text-ivory sm:px-5 lg:px-10 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-6 border-b border-ivory/15 pb-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="eyebrow">Explore the Venue</p>
            <HallHeading name={gallery.name} />
          </div>
          <div className="lg:pb-1">
            <p className="max-w-2xl text-base leading-relaxed text-ivory/70 sm:text-lg">
              {gallery.intro}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-gold">
              {gallery.images.length} venue photographs
            </p>
            {gallery.profilePdf && (
              <a
                href={gallery.profilePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center gap-2 border border-gold px-4 py-2 text-sm font-medium uppercase tracking-[0.14em] text-gold transition hover:bg-gold hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                View Profile PDF
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {gallery.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "group relative overflow-hidden border border-ivory/15 bg-ink-soft text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-ink",
                index === 0
                  ? "aspect-[16/10] sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:aspect-auto lg:min-h-[34rem]"
                  : "aspect-[4/3] lg:col-span-4",
              )}
              aria-label={`Open ${image.label} photograph`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes={
                  index === 0
                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <span>
                  <span className="block text-xs uppercase tracking-[0.2em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-display text-2xl text-white">{image.label}</span>
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-white/35 bg-black/25 text-white backdrop-blur-sm transition group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent className="h-[92dvh] max-w-[96vw] border-white/15 bg-black p-0 text-white shadow-2xl sm:rounded-none">
          <DialogTitle className="sr-only">
            {activeImage ? `${gallery.name}: ${activeImage.label}` : gallery.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Expanded venue photograph. Use the previous and next buttons or arrow keys to browse.
          </DialogDescription>

          {activeImage && activeIndex !== null && (
            <>
              <div className="relative h-full w-full p-4 pb-24 pt-14 sm:p-8 sm:pb-24 sm:pt-16">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="96vw"
                  className="object-contain px-3 pb-20 pt-12 sm:px-10 sm:pb-20 sm:pt-14"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 border-t border-white/15 bg-black/85 px-4 py-4 backdrop-blur sm:px-8">
                <div className="min-w-0">
                  <p className="truncate font-display text-xl sm:text-2xl">{activeImage.label}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-white/55">
                    {activeIndex + 1} of {gallery.images.length}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={showPrevious}
                    className="grid h-11 w-11 place-items-center border border-white/30 transition hover:border-gold hover:bg-gold hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="grid h-11 w-11 place-items-center border border-white/30 transition hover:border-gold hover:bg-gold hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label="Next photograph"
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
