import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={cn(
          "mt-3 text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem]",
          light ? "text-ivory" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            light ? "text-ivory/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function Section({
  children,
  tone = "default",
  className,
  id,
}: {
  children: ReactNode;
  tone?: "default" | "sand" | "ink";
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 py-20 sm:px-[20px] lg:px-[40px] lg:py-[60px]",
        tone === "sand" && "bg-sand",
        tone === "ink" && "bg-ink text-ivory",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[58vh] items-end overflow-hidden pt-28">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/72" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] text-ivory sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/75">{description}</p>
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}
