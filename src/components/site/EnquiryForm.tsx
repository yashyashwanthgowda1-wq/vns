"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventTypes, packageOptions, venue, whatsappLink } from "@/data/venue";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "@/lib/utils";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { calendarDateSchema, venueToday } from "@/lib/calendar";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(100, { message: "Name must be under 100 characters" }),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Please enter a valid phone number" })
    .max(20, { message: "Phone number is too long" })
    .regex(/^[+()\d\s-]+$/, { message: "Phone can only contain digits and + ( ) -" }),
  eventType: z.string().min(1, { message: "Select an event type" }),
  date: calendarDateSchema.refine((date) => date >= venueToday(), {
    message: "Choose today or a future date",
  }),
  guests: z
    .string()
    .trim()
    .min(1, { message: "Enter an expected guest count" })
    .max(30, { message: "Guest count must be under 30 characters" })
    .regex(/^[\d\s,+-]+$/, { message: "Use numbers or a range such as 500-700" }),
  pkg: z.string().min(1, { message: "Select a package preference" }),
  message: z.string().trim().max(1000, { message: "Message must be under 1000 characters" }),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  name: "",
  phone: "",
  eventType: "",
  date: "",
  guests: "",
  pkg: "",
  message: "",
};

export function EnquiryForm({
  variant = "full",
  defaultPackage,
  submitLabel = "Request Pricing",
  className,
  id,
}: {
  variant?: "full" | "availability";
  defaultPackage?: string;
  submitLabel?: string;
  className?: string;
  id?: string;
}) {
  const [values, setValues] = useState<Values>({
    ...empty,
    pkg: defaultPackage ?? "",
    message: variant === "availability" ? "Availability enquiry" : "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const set = (key: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setSubmitError("");
  };

  const summary = () =>
    `Hello ${venue.name}, I would like to enquire.%0AName: ${values.name}%0AEvent: ${values.eventType}%0ADate: ${values.date}%0AGuests: ${values.guests}%0APackage: ${values.pkg}`;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        next[issue.path[0] as keyof Values] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      return;
    }
    setStatus("sending");
    setSubmitError("");

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_ENQUIRY_API_URL ?? "http://localhost:4000/api/enquiries";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: parsed.data.name,
          phone: parsed.data.phone,
          eventType: parsed.data.eventType,
          preferredDate: parsed.data.date,
          guestCount: parsed.data.guests,
          packagePreference: parsed.data.pkg,
          message: parsed.data.message,
          sourcePage: window.location.pathname,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit enquiry");
      }

      setStatus("sent");
    } catch {
      setStatus("error");
      setSubmitError(
        "We could not submit your enquiry right now. Please try again or contact us on WhatsApp.",
      );
    }
  };

  if (status === "sent") {
    return (
      <div
        id={id}
        className={cn("border border-gold/40 bg-card p-8 text-center", className)}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
        <h3 className="mt-4 font-display text-2xl">Thank you, {values.name.split(" ")[0]}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your enquiry has been received. Our event team will confirm availability and send
          indicative pricing shortly.
        </p>
        <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-gold">1.</span> We check your date and hold it provisionally.
          </li>
          <li className="flex gap-2">
            <span className="text-gold">2.</span> You receive a written quote for your guest count.
          </li>
          <li className="flex gap-2">
            <span className="text-gold">3.</span> We book your venue tour before you confirm.
          </li>
        </ul>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="whatsapp" size="lg">
            <a
              href={whatsappLink(`Hello ${venue.name}, I just submitted an enquiry.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-4 w-4" /> Continue on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={`tel:${venue.phone}`}>Call {venue.phoneDisplay}</a>
          </Button>
        </div>
      </div>
    );
  }

  const err = (k: keyof Values) =>
    errors[k] ? (
      <p className="mt-1 text-xs text-destructive" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form
      id={id}
      noValidate
      onSubmit={onSubmit}
      className={cn("space-y-4 border border-border bg-card p-6 sm:p-8", className)}
    >
      <AvailabilityCalendar onSelect={(date) => set("date", date)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${id}-name`}>Your Name</Label>
          <Input
            id={`${id}-name`}
            value={values.name}
            maxLength={100}
            autoComplete="name"
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            placeholder="e.g. Priya Iyer"
          />
          {err("name")}
        </div>
        <div>
          <Label htmlFor={`${id}-phone`}>Phone</Label>
          <Input
            id={`${id}-phone`}
            type="tel"
            inputMode="tel"
            maxLength={20}
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            placeholder="+91 98xxx xxxxx"
          />
          {err("phone")}
        </div>
        <div>
          <Label htmlFor={`${id}-type`}>Event type</Label>
          <Select value={values.eventType} onValueChange={(v) => set("eventType", v)}>
            <SelectTrigger id={`${id}-type`} aria-invalid={!!errors.eventType}>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {err("eventType")}
        </div>
        <div>
          <Label htmlFor={`${id}-date`}>Preferred date</Label>
          <Input
            id={`${id}-date`}
            type="date"
            min={venueToday()}
            value={values.date}
            onChange={(e) => set("date", e.target.value)}
            aria-invalid={!!errors.date}
          />
          {err("date")}
        </div>
        <div>
          <Label htmlFor={`${id}-guests`}>Approximate Guests</Label>
          <Input
            id={`${id}-guests`}
            type="text"
            inputMode="numeric"
            maxLength={30}
            value={values.guests}
            onChange={(e) => set("guests", e.target.value)}
            aria-invalid={!!errors.guests}
            placeholder="e.g. 500-700"
          />
          {err("guests")}
        </div>
        <div>
          <Label htmlFor={`${id}-pkg`}>Package preference</Label>
          <Select value={values.pkg} onValueChange={(v) => set("pkg", v)}>
            <SelectTrigger id={`${id}-pkg`} aria-invalid={!!errors.pkg}>
              <SelectValue placeholder="Select package" />
            </SelectTrigger>
            <SelectContent>
              {packageOptions.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {err("pkg")}
        </div>
      </div>

      {variant === "full" && (
        <div>
          <Label htmlFor={`${id}-message`}>Tell us about your celebration</Label>
          <Textarea
            id={`${id}-message`}
            rows={3}
            maxLength={1000}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Theme, special requests, preferred hall..."
          />
          {err("message")}
        </div>
      )}

      {status === "error" && (
        <p className="text-xs text-destructive" role="alert">
          {submitError || "Please correct the highlighted fields and try again."}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="flex-1"
          disabled={status === "sending"}
        >
          {status === "sending" ? <Loader2 className="animate-spin" /> : <Send />}
          {submitLabel}
        </Button>
        <Button asChild variant="whatsapp" size="lg" className="flex-1">
          <a
            href={`https://wa.me/${venue.whatsapp}?text=${summary()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="h-4 w-4" /> Enquire on WhatsApp
          </a>
        </Button>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Our event team will confirm availability shortly. We never share your details.
      </p>
    </form>
  );
}
