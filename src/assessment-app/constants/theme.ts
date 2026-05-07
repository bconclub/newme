// ── Brand palette (dark atmospheric, matches NewME site design system) ────────

/** Primary CTA yellow — matches Header "Start My Assessment" button */
export const GOLD    = "#FEF272";
/** Primary pine-teal surface */
export const PINE    = "#013E37";
/** Raised card surface */
export const PINE_C  = "rgba(255,255,255,0.06)";
/** Card hover surface */
export const PINE_CR = "rgba(255,255,255,0.10)";
/** Moss green accent (option selected highlight) */
export const GRN     = "#629675";
export const GRN_D   = "#4D8060";
/** Tinted selected option background */
export const GRN_L   = "rgba(98,150,117,0.15)";
/** Selected option border */
export const GRN_M   = "rgba(98,150,117,0.55)";
/** Page background (transparent — atmospheric bg is in page.tsx) */
export const SAND    = "transparent";
export const WHITE   = "#ffffff";
/** Primary heading text */
export const INK     = "#ffffff";
/** Body / secondary text */
export const INK2    = "rgba(255,255,255,0.72)";
/** Muted / hint text */
export const INK3    = "rgba(255,255,255,0.45)";

// ── Font stacks — reference Next.js CSS variables on <html> ──────────────────
export const FONT_HEADING = "var(--font-bricolage),'Bricolage Grotesque',-apple-system,sans-serif";
export const FONT_BODY    = "var(--font-urbanist),'Urbanist',-apple-system,sans-serif";
export const FONT_BUTTON  = "var(--font-poppins),'Poppins',-apple-system,sans-serif";

export const baseStyle = {
  minHeight: "100vh",
  overflowY: "auto" as const,
  background: "transparent",
  color: INK,
  fontFamily: FONT_BODY,
};
