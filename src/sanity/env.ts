export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const sanityApiVersion = "2025-02-19";
export const sanityConfigured =
  /^[a-z0-9]+$/.test(sanityProjectId) && /^[a-z0-9_-]+$/.test(sanityDataset);
