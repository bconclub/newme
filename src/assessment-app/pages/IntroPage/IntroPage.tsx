import { GRN, GRN_L, GRN_M, SAND, INK, INK2, INK3, WHITE, baseStyle } from "../../constants/theme";
import { LogoMark } from "../../components/Logo";
import { Header } from "../../components/Header/Header";

type IntroPageProps = {
  onStart: () => void;
  onContinue?: () => void;
  savedStep?: number;
  savedTotal?: number;
  savedScreen?: string;
};

export function IntroPage({ onStart, onContinue, savedStep, savedTotal, savedScreen }: IntroPageProps) {
  const hasProgress = !!onContinue && (savedScreen === "results" || (savedStep !== undefined && savedStep > 0));
  const progressLabel = savedScreen === "results"
    ? "Assessment complete — view your results"
    : savedStep !== undefined && savedTotal
      ? `Question ${savedStep} of ${savedTotal}`
      : "In progress";
  return (
    <div style={{ ...baseStyle, display: "flex", flexDirection: "column" }}>
      <Header showProgress={false} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px 56px" }}>
        <div className="fu" style={{ maxWidth: 540, width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: GRN_L, border: `1px solid ${GRN_M}`, borderRadius: 50, padding: "6px 14px", marginBottom: 32 }}>
            <LogoMark size={14} color={GRN} />
            <span style={{ fontSize: 11, color: GRN, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Dr. Pal's Clinical Assessment</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px,6vw,52px)", fontWeight: 800, lineHeight: 1.12, marginBottom: 20, letterSpacing: "-.03em", color: INK }}>
            You've been trying.<br />
            <span style={{ color: INK3 }}>Your body hasn't</span><br />
            <span style={{ color: INK3 }}>responded.</span>
          </h1>
          <p style={{ color: INK2, fontSize: 16, lineHeight: 1.75, maxWidth: 420, marginBottom: 36 }}>Not a diet plan. Not a generic program. A clinical assessment that matches you to a pathway. One built around what's actually happening in your body, not what worked for someone else.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36, flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              {["P", "A", "K", "R", "M"].map((l, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: i % 2 === 0 ? GRN : GRN_M, border: `2px solid ${SAND}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: WHITE, marginLeft: i > 0 ? -8 : 0, zIndex: 5 - i }}>{l}</div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: INK, lineHeight: 1.2 }}>10,000+ people have found their clinical pathway</p>
              <p style={{ fontSize: 12, color: INK3, marginTop: 2 }}>Free · Private · Takes about 3 minutes</p>
            </div>
          </div>
          {hasProgress && (
            <div style={{ background: WHITE, border: `1.5px solid ${GRN_M}`, borderRadius: 14, padding: "14px 18px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div>
                <p style={{ fontSize: 12, color: GRN, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 3 }}>You left off here</p>
                <p style={{ fontSize: 14, color: INK2, fontWeight: 500 }}>{progressLabel}</p>
              </div>
              <button className="btng" onClick={onContinue} style={{ fontSize: 14, padding: "11px 22px", whiteSpace: "nowrap" }}>Continue →</button>
            </div>
          )}
          <button className="btng" onClick={onStart} style={{ fontSize: 16, padding: "17px 48px", background: hasProgress ? INK3 : undefined }}>
            {hasProgress ? "Start over" : "Find my clinical pathway →"}
          </button>
        </div>
      </div>
    </div>
  );
}
