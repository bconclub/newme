import { GRN, INK, INK2, INK3, FONT_HEADING, FONT_BODY, FONT_BUTTON, GOLD } from "../../constants/theme";
import { Header } from "../../components/Header/Header";
import EyebrowPill from "../../../components/option1/EyebrowPill";

type IntroPageProps = {
  onStart: () => void;
  onContinue?: () => void;
  savedStep?: number;
  savedTotal?: number;
  savedScreen?: string;
};

/* Real face photos for avatar stack */
const AVATARS = [
  "/testimonials/nithya.jpg",
  "/testimonials/kat.jpg",
  "/testimonials/thamarai.jpg",
  "/images/team/karthik-ravi.jpg",
  "/images/team/reshmi-sinha.jpg",
];

export function IntroPage({ onStart, onContinue, savedStep, savedTotal, savedScreen }: IntroPageProps) {
  const hasProgress = !!onContinue && (savedScreen === "results" || (savedStep !== undefined && savedStep > 0));
  const progressLabel = savedScreen === "results"
    ? "Assessment complete — view your results"
    : savedStep !== undefined && savedTotal
      ? `Question ${savedStep} of ${savedTotal}`
      : "In progress";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header showProgress={false} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px 64px" }}>
        <div className="fu" style={{ maxWidth: 560, width: "100%" }}>

          {/* ── Eyebrow pill — uses the same EyebrowPill component as the rest of the site ── */}
          <div style={{ marginBottom: 28 }}>
            <EyebrowPill>Clinical Assessment</EyebrowPill>
          </div>

          {/* ── Heading — Bricolage Grotesque ── */}
          <h1 style={{
            fontSize: "clamp(32px,5vw,54px)", fontWeight: 600, lineHeight: 1.1,
            marginBottom: 20, letterSpacing: "-0.02em", color: INK,
            fontFamily: FONT_HEADING,
          }}>
            You've been trying.<br />
            <span style={{ color: INK3 }}>Your body hasn't</span><br />
            <span style={{ color: INK3 }}>responded.</span>
          </h1>

          {/* ── Body ── */}
          <p style={{ color: INK2, fontSize: 16, lineHeight: 1.75, maxWidth: 440, marginBottom: 36, fontFamily: FONT_BODY }}>
            Not a diet plan. Not a generic program. A clinical assessment that matches you to a pathway built around what's actually happening in your body.
          </p>

          {/* ── Avatar stack with real faces ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36, flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              {AVATARS.map((src, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.25)",
                  overflow: "hidden",
                  marginLeft: i > 0 ? -10 : 0,
                  zIndex: 5 - i,
                  position: "relative",
                  background: "#0a4a45",
                  flexShrink: 0,
                }}>
                  <img
                    src={src}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: INK, lineHeight: 1.2, fontFamily: FONT_BODY }}>10,000+ people have found their clinical pathway</p>
              <p style={{ fontSize: 12, color: INK3, marginTop: 3, fontFamily: FONT_BODY }}>Free · Private · Takes about 3 minutes</p>
            </div>
          </div>

          {/* ── Resume session card ── */}
          {hasProgress && (
            <div style={{
              background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.15)",
              borderRadius: 14, padding: "14px 18px", marginBottom: 16,
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
              backdropFilter: "blur(12px)",
            }}>
              <div>
                <p style={{ fontSize: 12, color: GRN, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 3, fontFamily: FONT_BUTTON }}>You left off here</p>
                <p style={{ fontSize: 14, color: INK2, fontWeight: 500, fontFamily: FONT_BODY }}>{progressLabel}</p>
              </div>
              <button className="btng" onClick={onContinue} style={{ fontSize: 14, padding: "11px 22px", whiteSpace: "nowrap" }}>Continue →</button>
            </div>
          )}

          {/* ── Primary CTA ── */}
          <button
            className="btng"
            onClick={onStart}
            style={{
              fontSize: 16, padding: "17px 48px",
              background: hasProgress ? "rgba(255,255,255,0.12)" : GOLD,
              color: hasProgress ? "rgba(255,255,255,0.8)" : "#013E37",
              fontFamily: FONT_BUTTON,
            }}
          >
            {hasProgress ? "Start over" : "Find my clinical pathway →"}
          </button>

        </div>
      </div>
    </div>
  );
}
