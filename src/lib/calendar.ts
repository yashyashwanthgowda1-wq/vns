import { z } from "zod";

export const calendarDateSchema = z.string().date();
export const calendarEntrySchema = z.object({
  date: calendarDateSchema,
  status: z.enum(["available", "limited", "unavailable"]),
  note: z.string().max(240).nullable().optional(),
});
export type CalendarEntry = z.infer<typeof calendarEntrySchema>;
export const availabilityLabels = {
  available: "Available",
  limited: "Limited availability",
  unavailable: "Unavailable",
};

export function venueToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
