import { ENDPOINTS } from "../constants/urlConstants";

export async function createPaymentIntent({
  amount,
  currency,
  leadId,
  pathway,
}: {
  amount: number;
  currency: string;
  leadId: string | null;
  pathway: string;
}): Promise<{ clientSecret?: string }> {
  const r = await fetch(ENDPOINTS.PAYMENT_INTENT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency, leadId, pathway }),
  });
  return r.json();
}
