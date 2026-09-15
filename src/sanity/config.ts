import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityDataset, sanityProjectId } from "./env";
import { calendarDay } from "./schemaTypes/calendarDay";

export function calendarStudioConfig() {
  return defineConfig({
    name: "venus-park",
    title: "Venus Park Calendar",
    projectId: sanityProjectId,
    dataset: sanityDataset,
    basePath: "/admin/calendar",
    plugins: [structureTool()],
    schema: { types: [calendarDay] },
  });
}
