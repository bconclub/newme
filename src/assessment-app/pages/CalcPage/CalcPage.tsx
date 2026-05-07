import { GRN, GRN_M, INK, INK2, FONT_HEADING, FONT_BODY, GOLD } from "../../constants/theme";
import { Header } from "../../components/Header/Header";

type CalcPageProps = {
  calcIdx: number;
  calcMsgs: string[];
  calcPct: number;
  pct: number;
  total: number;
};

export function CalcPage({ calcIdx, calcMsgs, calcPct, pct, total }: CalcPageProps) {
  return (
    <div style={{ minHeight: "100vh", fontFamily: FONT_BODY }}>
      <Header showProgress={false} pct={pct} total={total} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 60px)" }}>
        <div style={{ textAlign: "center", padding: "24px", maxWidth: 380, width: "100%" }}>

          {/* Spinner — yellow accent matches CTA */}
          <div style={{
            width: 56, height: 56,
            border: "3px solid rgba(255,255,255,0.15)",
            borderTopColor: GOLD,
            borderRadius: "50%",
            margin: "0 auto 36px",
            animation: "spin 1s linear infinite",
          }} />

          {/* Current message */}
          <p key={calcIdx} className="fu" style={{
            fontSize: 17, color: INK, fontWeight: 600,
            minHeight: 28, marginBottom: 32,
            fontFamily: FONT_HEADING, letterSpacing: "-0.01em",
            lineHeight: 1.35,
          }}>
            {calcMsgs[calcIdx] || ""}
          </p>

          {/* Progress bar */}
          <div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden", marginBottom: 14 }}>
            <div style={{
              height: "100%", background: GOLD,
              borderRadius: 4, width: `${calcPct}%`, transition: "width .6s ease",
            }} />
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
            {calcMsgs.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: i <= calcIdx ? GOLD : "rgba(255,255,255,0.12)",
                transition: "background .3s",
              }} />
            ))}
          </div>

          <p style={{ marginTop: 20, fontSize: 12, color: INK2, fontFamily: FONT_BODY }}>Analysing your responses…</p>
        </div>
      </div>
    </div>
  );
}
