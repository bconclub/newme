const API_BASE = (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_ASSESSMENT_API_URL) || "http://localhost:4000";

export const ENDPOINTS = {
  CRM_LEAD:              `${API_BASE}/api/crm/lead`,
  CRM_LEAD_PROFILE:      `${API_BASE}/api/crm/lead/profile`,
  CRM_LEAD_PRE_QUIZ:     `${API_BASE}/api/crm/lead/pre-quiz`,
  CRM_LEAD_CHECK:        (email: string) => `${API_BASE}/api/crm/lead/check?email=${encodeURIComponent(email)}`,
  CRM_LEAD_RESULTS:      (email: string) => `${API_BASE}/api/crm/lead/results?email=${encodeURIComponent(email)}`,
  CRM_LEAD_DELETE:       (id: string) => `${API_BASE}/api/crm/lead/${id}`,
  CRM_LEAD_SUBMIT:       (id: string) => `${API_BASE}/api/crm/lead/${id}/submit`,
  CRM_LEAD_ATTACH:       (id: string) => `${API_BASE}/api/crm/lead/${id}/attach-results`,
  CRM_LEAD_APPOINTMENT:  (id: string) => `${API_BASE}/api/crm/lead/${id}/appointment`,
  CRM_LEAD_SELECT:       (id: string) => `${API_BASE}/api/crm/lead/${id}/select`,
  CRM_LEAD_CONVERT:      (id: string) => `${API_BASE}/api/crm/lead/${id}/convert`,
  PAYMENT_INTENT:        `${API_BASE}/api/payment/create-intent`,
  ASSESSMENT_CHECK:      (email: string) => `${API_BASE}/api/assessment/check?email=${encodeURIComponent(email)}`,
  ASSESSMENT_RECORD:     `${API_BASE}/api/assessment/record`,
  ASSESSMENT_VERIFY:     (email: string) => `${API_BASE}/api/assessment/verify-email?email=${encodeURIComponent(email)}`,
};
