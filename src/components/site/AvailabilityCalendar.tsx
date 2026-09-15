"use client";

import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  availabilityLabels,
  calendarEntrySchema,
  venueToday,
  type CalendarEntry,
} from "@/lib/calendar";

export function AvailabilityCalendar({ onSelect }: { onSelect: (date: string) => void }) {
  const [month, setMonth] = useState(() => parseISO(venueToday()));
  const [selected, setSelected] = useState<Date>();
  const [entries, setEntries] = useState<CalendarEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const monthKey = format(month, "yyyy-MM");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setEntries([]);
    async function load() {
      try {
        const response = await fetch(`/api/calendar?month=${monthKey}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok)
          throw new Error("Availability could not be loaded. Please retry or contact our team.");
        const result = z
          .object({ success: z.literal(true), data: z.array(calendarEntrySchema) })
          .parse(await response.json());
        if (!controller.signal.aborted) setEntries(result.data);
      } catch (error) {
        if (!controller.signal.aborted)
          setError(error instanceof Error ? error.message : "Unable to load availability.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [monthKey, retry]);

  const selectedEntry = entries.find(
    (entry) => selected && entry.date === format(selected, "yyyy-MM-dd"),
  );
  const datesFor = (status: CalendarEntry["status"]) =>
    entries.filter((entry) => entry.status === status).map((entry) => parseISO(entry.date));

  return (
    <section
      className="space-y-4 rounded-md border border-border bg-sand/40 p-4 sm:p-5"
      aria-label="Venue availability calendar"
      aria-busy={loading}
    >
      <div>
        <h3 className="font-display text-xl leading-none">Check your date</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Venue-wide availability, subject to confirmation. Select a date to fill your enquiry.
        </p>
      </div>
      <div className="flex justify-center rounded-md border border-border/50 bg-card p-2 sm:p-3">
        <Calendar
          mode="single"
          month={month}
          onMonthChange={(value) => {
            setMonth(value);
            setSelected(undefined);
          }}
          selected={selected}
          onSelect={(date) => {
            setSelected(date);
            if (date) onSelect(format(date, "yyyy-MM-dd"));
          }}
          disabled={[{ before: parseISO(venueToday()) }, ...datesFor("unavailable")]}
          startMonth={parseISO(venueToday())}
          endMonth={new Date(2099, 11, 1)}
          modifiers={{
            available: datesFor("available"),
            limited: datesFor("limited"),
            unavailable: datesFor("unavailable"),
          }}
          modifiersClassNames={{
            available: "bg-emerald-100 text-emerald-950 rounded-md",
            limited: "bg-amber-100 text-amber-950 rounded-md",
            unavailable: "bg-rose-100 text-rose-950 line-through rounded-md",
          }}
          className="w-full bg-transparent p-0 [--cell-size:2.15rem]"
        />
      </div>
      <ul className="flex flex-wrap items-center gap-2 text-xs" aria-label="Calendar legend">
        <li className="rounded bg-emerald-100 px-2.5 py-1 font-medium text-emerald-950">
          Available
        </li>
        <li className="rounded bg-amber-100 px-2.5 py-1 font-medium text-amber-950">Limited</li>
        <li className="rounded bg-rose-100 px-2.5 py-1 font-medium text-rose-950">Unavailable</li>
        <li className="rounded border border-border bg-card px-2.5 py-1 text-muted-foreground">
          Unmarked: contact us
        </li>
      </ul>
      <div
        aria-live="polite"
        className="min-h-[1.5rem] rounded-md bg-card px-3 py-2 text-sm leading-relaxed"
      >
        {loading ? (
          <p className="text-muted-foreground">Loading availability…</p>
        ) : error ? (
          <div role="alert" className="flex flex-wrap items-center gap-2">
            <p className="text-destructive">{error}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setRetry((value) => value + 1)}
            >
              Retry
            </Button>
          </div>
        ) : selected ? (
          <p>
            <span className="font-medium">{format(selected, "d MMMM yyyy")}:</span>{" "}
            {selectedEntry
              ? availabilityLabels[selectedEntry.status]
              : "Contact us to confirm availability"}
            {selectedEntry?.note ? ` — ${selectedEntry.note}` : ""}
          </p>
        ) : (
          <p className="text-muted-foreground">
            {entries.length
              ? "Select a date to enquire."
              : "No availability has been published for this month. Please enquire for confirmation."}
          </p>
        )}
      </div>
    </section>
  );
}
