"use client";

import { NextStudio } from "next-sanity/studio";
import { calendarStudioConfig } from "@/sanity/config";

export default function CalendarStudio() {
  return <NextStudio config={calendarStudioConfig()} />;
}
