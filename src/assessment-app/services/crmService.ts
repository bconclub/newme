import { ENDPOINTS } from "../constants/urlConstants";

const LEAD_SOURCE: string = (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_LEAD_SOURCE) || "";

export async function createLeadFromProfile(payload: {
  firstName: string;
  phone?: string;
  dob?: string;
  gender?: string;
}): Promise<{ leadId?: string }> {
  const r = await fetch(ENDPOINTS.CRM_LEAD_PROFILE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, leadSource: LEAD_SOURCE }),
  });
  return r.json();
}

export async function saveCalendlyAppointment(leadId: string, eventUri: string, inviteeUri: string): Promise<void> {
  try {
    await fetch(ENDPOINTS.CRM_LEAD_APPOINTMENT(leadId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventUri, inviteeUri }),
    });
  } catch { /* fire-and-forget */ }
}

export async function attachResultsPDF(leadId: string, payload: Record<string, any>): Promise<void> {
  try {
    console.log("payload pdf",payload)
    await fetch(ENDPOINTS.CRM_LEAD_ATTACH(leadId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch { /* fire-and-forget */ }
}

export async function deleteLeadById(leadId: string): Promise<void> {
  try {
    await fetch(ENDPOINTS.CRM_LEAD_DELETE(leadId), { method: "DELETE" });
  } catch { /* fail silently */ }
}

export async function checkLeadByEmail(email: string): Promise<{ id: string; status: string } | null> {
  try {
    const r = await fetch(ENDPOINTS.CRM_LEAD_CHECK(email));
    const data = await r.json();
    return data.lead || null;
  } catch {
    return null;
  }
}

export async function createPreQuizLead(name: string, last: string, email: string): Promise<{ leadId?: string }> {
  const r = await fetch(ENDPOINTS.CRM_LEAD_PRE_QUIZ, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, last, email, leadSource: LEAD_SOURCE }),
  });
  return r.json();
}

export async function updateLeadQuizData(leadId: string, payload: Record<string, any>): Promise<void> {
  await fetch(ENDPOINTS.CRM_LEAD_SUBMIT(leadId), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function createLead(payload: Record<string, any>): Promise<{ leadId?: string }> {
  const r = await fetch(ENDPOINTS.CRM_LEAD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, leadSource: LEAD_SOURCE }),
  });
  return r.json();
}

export async function selectPhase(leadId: string, phase: string): Promise<void> {
  await fetch(ENDPOINTS.CRM_LEAD_SELECT(leadId), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ selected_phase: phase }),
  });
}

export async function convertLead(leadId: string, phase: string): Promise<void> {
  await fetch(ENDPOINTS.CRM_LEAD_CONVERT(leadId), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paid_phase: phase }),
  });
}
