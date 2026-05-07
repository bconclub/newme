/**
 * ── Zoho Checkout — one page per plan / billing option ───────────────────────
 *
 * SETUP IN ZOHO (do this once per plan):
 *  1. payments.zoho.in → Payment Pages → + New Payment Page
 *  2. Set Amount → Fixed amount (enter the plan price)
 *  3. Settings → Redirect URL → https://pathway.drpalsnewme.com/?zoho_payment=success
 *  4. Save → Share → copy the Direct Link:
 *       https://zohosecurepay.com/checkout/<TOKEN>/<PageName>
 *  5. Paste the full Direct Link URL for each plan below.
 *
 * GI plans have two billing options — create a separate Zoho page for each.
 * Until a URL is filled in, clicking Pay will show a "not configured" alert.
 */

export const ZOHO_CHECKOUT_BASE = "https://zohosecurepay.com/checkout";

/**
 * Per-plan Direct Link URLs from Zoho Checkout.
 * GI plans have _monthly variants for month-by-month billing.
 */
export const ZOHO_PLAN_URLS: Record<string, string> = {
  Reset:              "https://zohosecurepay.com/checkout/sgn6rrt-fkumb8ianpyx5p/NewMEReset",
  Rebuild:            "https://zohosecurepay.com/checkout/p4oyii7-248bp9em0dweaq/NewMERebuild",
  Sustain:            "https://zohosecurepay.com/checkout/xfeizzh-1i9wyz5h6nt55x/NewMESustain",
  GI_Core:            "https://zohosecurepay.com/checkout/9vh488g-tjd8k5py37qcvu/NewMEGICORE", // 3-month upfront page
  GI_Core_monthly:    "https://zohosecurepay.com/checkout/f5uo22n-uk3s9rgejh4nt4/NewMEGICOREMonthly", // TODO: create a separate Zoho page priced at $300
  GI_Advanced:        "https://zohosecurepay.com/checkout/10zp55l-u106qfh7kbxl5k/NewMEGIAdvance3M", // 3-month upfront page
  GI_Advanced_monthly: "https://zohosecurepay.com/checkout/925hpp9-oe4hpsrwbcn8gw/GIAdvancedMonthly", // TODO: create a separate Zoho page priced at $600
};

/**
 * Billing toggle config for GI plans (display in USD).
 * savings = (monthly price × 3) − upfront price
 */
export const GI_BILLING: Record<string, {
  monthly: { key: string; label: string; dayLabel: string };
  upfront: { key: string; label: string; dayLabel: string; savings: number };
}> = {
  GI_Core: {
    monthly: {
      key:      "GI_Core_monthly",
      label:    "$300 / month",
      dayLabel: "$10.00 / day",
    },
    upfront: {
      key:      "GI_Core",
      label:    "$849 / 3 months",
      dayLabel: "$9.43 / day",
      savings:   51,   // 3 × $300 − $849
    },
  },
  GI_Advanced: {
    monthly: {
      key:      "GI_Advanced_monthly",
      label:    "$599 / month",
      dayLabel: "$19.97 / day",
    },
    upfront: {
      key:      "GI_Advanced",
      label:    "$1,699 / 3 months",
      dayLabel: "$18.88 / day",
      savings:   98,   // 3 × $599 − $1,699
    },
  },
};

/**
 * Returns the Zoho Checkout URL for the given phase key, or null if not configured.
 */
export function getZohoCheckoutUrl(phase: string): string | null {
  const url = ZOHO_PLAN_URLS[phase];
  return url ? url : null;
}
