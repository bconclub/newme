import { GRN, GRN_M, INK, baseStyle } from "../../constants/theme";
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
    <div style={{ ...baseStyle }}>
      <Header showProgress={false} pct={pct} total={total} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 69px)" }}>
        <div style={{ textAlign: "center", padding: "24px", maxWidth: 360, width: "100%" }}>
          <div style={{ width: 56, height: 56, border: `3px solid ${GRN_M}`, borderTopColor: GRN, borderRadius: "50%", margin: "0 auto 36px", animation: "spin 1s linear infinite" }} />
          <p key={calcIdx} className="fu" style={{ fontSize: 16, color: INK, fontWeight: 600, minHeight: 26, marginBottom: 28 }}>{calcMsgs[calcIdx] || ""}</p>
          <div style={{ width: "100%", height: 4, background: "#e2e8df", borderRadius: 4, overflow: "hidden", marginBottom: 12 }}>
            <div style={{ height: "100%", background: GRN, borderRadius: 4, width: `${calcPct}%`, transition: "width .6s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {calcMsgs.map((_, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i <= calcIdx ? GRN : GRN_M, transition: "background .3s" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
