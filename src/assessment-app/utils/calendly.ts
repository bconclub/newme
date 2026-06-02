export const CALENDLY_URL = "https://calendly.com/d/ct35-rpb-xkg/dr-pal-s-newme-program";

export function openCalendly(prefill?: { name?: string; email?: string; phone?: string }) {
  const url = CALENDLY_URL || "https://calendly.com";
  const cal = (window as any).Calendly;
  if (cal && CALENDLY_URL) {
    cal.initPopupWidget({
      url,
      prefill: {
        name:          prefill?.name  || "",
        email:         prefill?.email || "",
        customAnswers: { a1: prefill?.phone || "" },
      },
    });
  } else {
    window.open(url, "_blank");
  }
}
