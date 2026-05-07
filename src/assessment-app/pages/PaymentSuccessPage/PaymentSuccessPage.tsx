import { GRN, INK, INK2, INK3, GOLD, FONT_HEADING, FONT_BODY, FONT_BUTTON } from "../../constants/theme";
import { LogoMark } from "../../components/Logo";
import { PW } from "../../data/pathways";

type PaymentSuccessPageProps = {
  paidPhase: string;
};

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 16,
  padding: "18px 20px",
  backdropFilter: "blur(12px)",
};

export function PaymentSuccessPage({ paidPhase }: PaymentSuccessPageProps) {
  const phaseName = PW[paidPhase]?.badge?.split(" · ")[0] ?? paidPhase;
  const STEPS = [
    { n: 1, title: "Check your email",              body: "Your onboarding form will be waiting. Fill it in at your earliest convenience." },
    { n: 2, title: "Medical committee review",      body: "Your case is reviewed by our medical committee before your clinical pathway begins." },
    { n: 3, title: "Meet your Clinical Health Coach", body: "Your coach will reach out via WhatsApp to book your first call." },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px 64px", fontFamily: FONT_BODY }}>
      <div className="fu" style={{ width: "100%", maxWidth: 520 }}>

        {/* Success badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(98,150,117,0.2)", color: GRN,
            border: "1px solid rgba(98,150,117,0.4)",
            fontWeight: 700, fontSize: 13, letterSpacing: ".06em",
            padding: "8px 20px", borderRadius: 50, fontFamily: FONT_BUTTON,
          }}>
            ✓ PAYMENT CONFIRMED
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: "clamp(28px,5vw,42px)", fontWeight: 600, color: INK,
          textAlign: "center", lineHeight: 1.15, marginBottom: 16,
          letterSpacing: "-0.025em", fontFamily: FONT_HEADING,
        }}>
          Welcome to your<br />Dr. Pal's NewME Journey.
        </h1>

        {/* Pathway pill */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 50, padding: "8px 18px", fontSize: 14, color: INK2,
            fontWeight: 500, backdropFilter: "blur(8px)", fontFamily: FONT_BODY,
          }}>
            <LogoMark size={16} color={GRN} />
            Clinical Pathway · {phaseName}
          </span>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {STEPS.map(s => (
            <div key={s.n} style={{ ...glassCard, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: GOLD, color: "#013E37",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, flexShrink: 0,
              }}>
                {s.n}
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4, fontFamily: FONT_HEADING }}>{s.title}</p>
                <p style={{ fontSize: 13, color: INK3, lineHeight: 1.6 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Support */}
        <p style={{ fontSize: 13, color: INK3, textAlign: "center", lineHeight: 1.6 }}>
          Questions? Reach us at <strong style={{ color: INK }}>info@drpalsnewme.com</strong>
        </p>
      </div>
    </div>
  );
}
