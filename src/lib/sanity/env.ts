function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

export const projectId = required(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
);

export const dataset = required(
  "NEXT_PUBLIC_SANITY_DATASET",
  process.env.NEXT_PUBLIC_SANITY_DATASET,
);

export const apiVersion = process.env.SANITY_API_VERSION || "2024-10-01";

export const readToken = process.env.SANITY_API_READ_TOKEN;
