import { ENDPOINTS } from "../constants/urlConstants";

export interface AttemptCheckResult {
  allowed: boolean;
  attemptsUsed: number;
  attemptsLeft: number;
}

export async function checkAssessmentLimit(email: string): Promise<AttemptCheckResult> {
  const r = await fetch(ENDPOINTS.ASSESSMENT_CHECK(email));
  return r.json();
}

export async function verifyEmail(email: string): Promise<{ valid: boolean; reason: string }> {
  const r = await fetch(ENDPOINTS.ASSESSMENT_VERIFY(email));
  return r.json();
}

export async function recordAssessmentAttempt(email: string, pathway: string): Promise<void> {
  await fetch(ENDPOINTS.ASSESSMENT_RECORD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, pathway }),
  });
}
