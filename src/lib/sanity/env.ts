// Soft-required: log a warning at module load if vars are absent but do NOT
// throw — throwing at module evaluation time causes Next.js to fail the entire
// "collect page data" build step before any try/catch in the component can run.
// Pages that call client.fetch() already have their own try/catch for runtime
// failures; Sanity just returns an error there rather than crashing the build.
function softRequired(name: string, value: string | undefined): string {
  if (!value) {
    // Only warn in a Node environment so browser bundles stay silent.
    if (typeof window === 'undefined') {
      console.warn(`[sanity] Missing env var: ${name} — Sanity client will not connect.`);
    }
    return '';
  }
  return value;
}

export const projectId = softRequired(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
);

export const dataset = softRequired(
  "NEXT_PUBLIC_SANITY_DATASET",
  process.env.NEXT_PUBLIC_SANITY_DATASET,
);

export const apiVersion = process.env.SANITY_API_VERSION || "2024-10-01";

export const readToken = process.env.SANITY_API_READ_TOKEN;
