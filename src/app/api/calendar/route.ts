import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { calendarEntrySchema } from "@/lib/calendar";
import { sanityApiVersion, sanityConfigured, sanityDataset, sanityProjectId } from "@/sanity/env";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const month = new URL(request.url).searchParams.get("month");
  if (!month || !/^20\d{2}-(0[1-9]|1[0-2])$/.test(month)) {
    return NextResponse.json(
      { success: false, error: "Provide a month in YYYY-MM format." },
      { status: 400 },
    );
  }
  if (!sanityConfigured) {
    return NextResponse.json(
      { success: false, error: "Calendar is not available yet. Please contact our team." },
      { status: 503 },
    );
  }
  try {
    const client = createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: false,
      perspective: "published",
      token: process.env.SANITY_API_READ_TOKEN,
      timeout: 10000,
    });
    const result = await client.fetch<unknown>(
      '*[_type == "calendarDay" && date >= $start && date <= $end] | order(_updatedAt desc)[0...1000]{date, status, note}',
      { start: `${month}-01`, end: `${month}-31` },
      { cache: "no-store" },
    );
    const entries = z.array(calendarEntrySchema).parse(result);
    // Prefer the most recently updated published entry if external writes created duplicates.
    const unique = entries.filter(
      (entry, index) => entries.findIndex((item) => item.date === entry.date) === index,
    );
    return NextResponse.json(
      { success: true, data: unique },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    console.error("Failed to retrieve Sanity calendar availability");
    return NextResponse.json(
      {
        success: false,
        error: "Unable to load availability. Please try again or contact our team.",
      },
      { status: 503 },
    );
  }
}
