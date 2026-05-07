import { useState } from "react";
import { GRN, INK, INK2, INK3, GOLD, FONT_HEADING, FONT_BODY, FONT_BUTTON } from "../../constants/theme";
import { Header } from "../../components/Header/Header";
import { LogoMark } from "../../components/Logo";
import { PRICING, PHASE_META, PW } from "../../data/pathways";
import { GI_BILLING, getZohoCheckoutUrl } from "../../constants/zohoCheckout";

export type OrderPageProps = {
  phase: string;
  info: any;
  onBack: () => void;
};

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 16,
  padding: "20px 22px",
  backdropFilter: "blur(12px)",
};

export function OrderPage({ phase, info, onBack }: OrderPageProps) {
  const giBilling = GI_BILLING[phase] ?? null;
  const [billing, setBilling] = useState<"monthly" | "upfront">("upfront");

  const effectivePhase = giBilling
    ? (billing === "monthly" ? giBilling.monthly.key : giBilling.upfront.key)
    : phase;

  const pw = PW[phase];
  const phaseName = pw?.badge?.split(" · ")[0] ?? phase;
  const duration = PHASE_META[phase]?.duration ?? "";
  const enrollName = [info.name, info.last].filter(Boolean).join(" ") || "—";

  const priceLabel = giBilling
    ? (billing === "monthly" ? giBilling.monthly.label : giBilling.upfront.label)
    : (PRICING[phase]?.main ?? "");
  const dayLabel = giBilling
    ? (billing === "monthly" ? giBilling.monthly.dayLabel : giBilling.upfront.dayLabel)
    : (PRICING[phase]?.day ?? "");
  const billedAs = giBilling
    ? (billing === "monthly" ? "Monthly" : "3 months upfront")
    : "One-time";

  function handlePay() {
    const url = getZohoCheckoutUrl(effectivePhase);
    if (!url) {
      alert("Checkout is not yet configured for this plan. Please contact support.");
      return;
    }
    try { sessionStorage.setItem("newme_pending_phase", effectivePhase); } catch {}
    window.location.href = url;
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: FONT_BODY }}>
      <Header showProgress={false} />
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 24px 64px" }} className="fu">
        <button className="btnout" onClick={onBack} style={{ marginBottom: 28, fontFamily: FONT_BUTTON }}>← Back</button>

        <p style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: INK3, fontWeight: 700, marginBottom: 10, fontFamily: FONT_BUTTON }}>Order Summary</p>
        <h1 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 600, color: INK, marginBottom: 24, letterSpacing: "-0.02em", fontFamily: FONT_HEADING }}>Review your clinical pathway</h1>

        {/* Billing toggle — GI plans only */}
        {giBilling && (
          <div style={{ display: "flex", gap: 8, marginBottom: 20, background: "rgba(255,255,255,0.06)", borderRadius: 50, padding: 4, border: "1px solid rgba(255,255,255,0.1)" }}>
            {(["upfront", "monthly"] as const).map(opt => {
              const active = billing === opt;
              return (
                <button key={opt} onClick={() => setBilling(opt)} style={{
                  flex: 1, padding: "9px 12px", borderRadius: 50, border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  background: active ? GOLD : "transparent",
                  color: active ? "#013E37" : INK3,
                  transition: "all .15s", whiteSpace: "nowrap", fontFamily: FONT_BUTTON,
                }}>
                  {opt === "monthly" ? "Monthly" : `3 months upfront · save $${giBilling.upfront.savings}`}
                </button>
              );
            })}
          </div>
        )}

        {/* Summary card */}
        <div style={{ ...glassCard, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(98,150,117,0.15)", border: "1.5px solid rgba(98,150,117,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <LogoMark size={22} color={GRN} />
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 2, fontFamily: FONT_HEADING }}>{phaseName}</p>
              <p style={{ fontSize: 12, color: INK3 }}>{duration} Clinical Pathway</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            {[
              { label: "Clinical Pathway", value: phaseName },
              { label: "Duration",         value: duration },
              { label: "Billed as",        value: billedAs },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: INK3 }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{row.value}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: INK, fontFamily: FONT_HEADING }}>Total</span>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 24, fontWeight: 700, color: GOLD, lineHeight: 1, fontFamily: FONT_HEADING }}>{priceLabel}</p>
              <p style={{ fontSize: 12, color: INK3, marginTop: 3 }}>{dayLabel}</p>
            </div>
          </div>
        </div>

        {/* Enrolling card */}
        <div style={{ background: "rgba(98,150,117,0.12)", border: "1px solid rgba(98,150,117,0.3)", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, backdropFilter: "blur(8px)" }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: ".09em", textTransform: "uppercase", color: INK3, fontWeight: 700, marginBottom: 4, fontFamily: FONT_BUTTON }}>Enrolling</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 2 }}>{enrollName}</p>
            <p style={{ fontSize: 13, color: INK3 }}>{info.email || "—"}</p>
          </div>
          <LogoMark size={28} color={GRN} />
        </div>

        {/* GI timeline note */}
        {giBilling && (
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 10, background: GRN, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                <path d="M12 8v4m0 4h.01" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <p style={{ fontSize: 13, color: INK2, lineHeight: 1.65, margin: 0 }}>
              <strong style={{ color: INK }}>3 months</strong> is the recommended timeline to see meaningful improvement in GI symptoms, allowing the gut to adapt and stabilize.
            </p>
          </div>
        )}

        {/* Foundation note */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "rgba(254,242,114,0.08)", border: "1px solid rgba(254,242,114,0.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
          <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>🌱</span>
          <p style={{ fontSize: 13, color: INK3, lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: INK }}>10% of your programme fee</strong> goes towards Dr. Pal's Foundation, supporting access to healthcare for those who need it most.
          </p>
        </div>

        {/* Pay now */}
        <button className="btng" onClick={handlePay} style={{ width: "100%", fontSize: 16, padding: "16px", borderRadius: 50, fontFamily: FONT_BUTTON }}>
          Pay now →
        </button>
        <p style={{ fontSize: 12, color: INK3, textAlign: "center", marginTop: 12 }}>Secure payment · No hidden fees · Cancel anytime</p>
      </div>
    </div>
  );
}
