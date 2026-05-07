import { GRN, INK, INK2, INK3, GOLD, FONT_HEADING, FONT_BODY, FONT_BUTTON } from "../../constants/theme";
import { Header } from "../../components/Header/Header";
import { SectionLabel, Dot } from "../../components/SectionLabel";
import { PW, PW_SEC, PRICING } from "../../data/pathways";
import { pickStories } from "../../utils/routing";
import EyebrowPill from "../../../components/option1/EyebrowPill";

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 16,
  padding: "20px 22px",
  backdropFilter: "blur(12px)",
};

type PhaseScreenProps = {
  phaseKey: string;
  ans: Record<string, any>;
  info: Record<string, string>;
  profile: Record<string, string>;
  isRecommended: boolean;
  onBack?: () => void;
  onSelectPhase?: (phase: string) => void;
};

function PhaseScreen({ phaseKey, ans, info, profile, isRecommended, onBack, onSelectPhase }: PhaseScreenProps) {
  const pw = PW[phaseKey], sec = PW_SEC[phaseKey];
  const name = info.name || "You";
  const h1 = isRecommended ? pw.h1(name, false) : sec.h1;
  const h2 = isRecommended ? pw.h2(false) : sec.h2;
  const hook = isRecommended ? (typeof pw.hook === "function" ? pw.hook(ans) : pw.hook) : sec.hook;
  const extra = isRecommended && pw.extra ? pw.extra(ans) : null;
  const stories = pickStories(phaseKey, ans, profile.gender);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "36px 20px 80px", fontFamily: FONT_BODY }}>
      {onBack && <button className="btnout" onClick={onBack} style={{ marginBottom: 28, fontFamily: FONT_BUTTON }}>← Back to my results</button>}
      <div className="fu">

        {/* Eyebrow pill — uses the site's EyebrowPill */}
        <div style={{ marginBottom: 24 }}>
          <EyebrowPill>{pw.badge}</EyebrowPill>
        </div>

        <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 600, lineHeight: 1.15, marginBottom: 4, letterSpacing: "-0.025em", color: INK, fontFamily: FONT_HEADING }}>{h1}</h1>
        <h2 style={{ fontSize: "clamp(17px,3.5vw,24px)", fontWeight: 500, lineHeight: 1.3, color: INK3, marginBottom: 16, letterSpacing: "-0.015em", fontFamily: FONT_HEADING }}>{h2}</h2>
        <p style={{ fontSize: 14, color: GRN, fontWeight: 600, marginBottom: extra ? 8 : 20 }}>{hook}</p>
        {extra && <p style={{ fontSize: 14, color: INK2, marginBottom: 20, lineHeight: 1.65 }}>{extra}</p>}

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {pw.tags.map((t: string, i: number) => (
            <span key={i} style={{
              fontSize: 12, color: GRN,
              background: "rgba(98,150,117,0.12)",
              border: "1px solid rgba(98,150,117,0.35)",
              borderRadius: 50, padding: "5px 13px", fontWeight: 500,
              fontFamily: FONT_BODY,
            }}>{t}</span>
          ))}
        </div>

        {/* What's included */}
        <div style={{ ...glassCard, marginBottom: 0 }}>
          <SectionLabel>What's included</SectionLabel>
          {pw.bullets.map((b: string, i: number) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < pw.bullets.length - 1 ? 12 : 0 }}>
              <Dot /><span style={{ fontSize: 14, color: INK2, lineHeight: 1.55 }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="sec" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 28, marginTop: 0 }}>
          <SectionLabel>What clients say</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {stories.map((s: any, i: number) => (
              <div key={i} style={{ ...glassCard, padding: "14px 18px", display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(98,150,117,0.2)",
                  border: "1.5px solid rgba(98,150,117,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 800, color: GRN, flexShrink: 0,
                }}>{s.n[0]}</div>
                <div>
                  <p style={{ fontSize: 11, color: INK3, marginBottom: 4, fontWeight: 600, letterSpacing: ".03em" }}>{s.n}, {s.a} · {s.c}</p>
                  <p style={{ fontSize: 14, fontStyle: "italic", color: INK2, lineHeight: 1.5 }}>"{s.q}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA pricing box */}
        <div style={{ marginTop: 28 }}>
          <div style={{
            position: "relative",
            border: `2px solid ${GOLD}`,
            borderRadius: 16, padding: "22px",
            background: "rgba(254,242,114,0.07)",
          }}>
            {isRecommended && (
              <span style={{
                position: "absolute", top: -11, left: 20,
                background: GOLD, color: "#013E37",
                fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
                padding: "3px 12px", borderRadius: 50, fontFamily: FONT_BUTTON,
              }}>RECOMMENDED FOR YOU</span>
            )}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
              <div>
                <p style={{ fontSize: 17, fontWeight: 700, color: INK, marginBottom: 2, fontFamily: FONT_HEADING }}>{pw.badge.split(" · ")[0]}</p>
                <p style={{ fontSize: 12, color: INK2 }}>{PRICING[phaseKey]?.sub}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 24, fontWeight: 700, color: GOLD, lineHeight: 1, fontFamily: FONT_HEADING }}>{PRICING[phaseKey]?.main}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: INK3, marginTop: 4 }}>{PRICING[phaseKey]?.day}</p>
                </div>
                <button
                  onClick={() => onSelectPhase?.(phaseKey)}
                  className="btng"
                  style={{ padding: "13px 24px", fontSize: 14, fontFamily: FONT_BUTTON }}
                >
                  Start now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type PhaseDetailPageProps = {
  detailKey: string;
  ans: any;
  info: any;
  profile: any;
  res: any;
  onBack: () => void;
  onSelectPhase: (k: string) => void;
  attemptsLeft: number | null;
  onRetry: () => void;
  pct: number;
  total: number;
};

export function PhaseDetailPage({ detailKey, ans, info, profile, res, onBack, onSelectPhase, attemptsLeft, onRetry, pct, total }: PhaseDetailPageProps) {
  return (
    <div style={{ minHeight: "100vh", fontFamily: FONT_BODY }}>
      <Header showProgress={false} pct={pct} total={total} />
      <PhaseScreen
        phaseKey={detailKey}
        ans={ans}
        info={info}
        profile={profile}
        isRecommended={detailKey === res?.pathway}
        onBack={onBack}
        onSelectPhase={onSelectPhase}
      />
      {attemptsLeft !== null && (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px 40px" }}>
          <div style={{
            padding: "16px 20px", borderRadius: 14,
            background: attemptsLeft > 0 ? "rgba(98,150,117,0.12)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${attemptsLeft > 0 ? "rgba(98,150,117,0.3)" : "rgba(255,255,255,0.1)"}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 12, flexWrap: "wrap",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", gap: 5 }}>
                {[1, 2].map(n => (
                  <div key={n} style={{ width: 10, height: 10, borderRadius: "50%", background: n <= (2 - attemptsLeft) ? GRN : "rgba(255,255,255,0.2)" }} />
                ))}
              </div>
              <p style={{ fontSize: 13, color: attemptsLeft > 0 ? INK2 : INK3, lineHeight: 1.5 }}>
                {attemptsLeft > 0
                  ? <><strong style={{ color: INK }}>{attemptsLeft} attempt{attemptsLeft > 1 ? "s" : ""} remaining</strong> — retake if your answers don't feel right</>
                  : "You've used both assessment attempts"}
              </p>
            </div>
            {attemptsLeft > 0
              ? <button onClick={onRetry} className="btnout" style={{ whiteSpace: "nowrap", flexShrink: 0, fontFamily: FONT_BUTTON }}>Retake assessment →</button>
              : <a href="mailto:hello@newme.com" style={{ fontSize: 13, color: GRN, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}>Contact us →</a>
            }
          </div>
        </div>
      )}
    </div>
  );
}
