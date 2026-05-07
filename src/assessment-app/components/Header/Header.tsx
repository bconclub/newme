import { GRN, GRN_M, INK3, WHITE } from "../../constants/theme";
import { LogoFull } from "../Logo";

export type HeaderProps = {
  showProgress?: boolean;
  light?: boolean;
  step?: number;
  total?: number;
  pct?: number;
};

export function Header({ showProgress = true, light = false, step = 0, total = 0, pct = 0 }: HeaderProps) {
  return (
    <div style={{ background: light ? GRN : WHITE, borderBottom: `1px solid ${light ? "rgba(255,255,255,.1)" : "#e8ede6"}` }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <LogoFull height={38} light={light} />
        {showProgress && step > 0 && step <= total && (
          <span style={{ fontSize: 12, color: light ? "rgba(255,255,255,.55)" : INK3, fontWeight: 500 }}>{step} of {total + 1}</span>
        )}
      </div>
      {showProgress && (
        <div style={{ height: 3, background: light ? "rgba(255,255,255,.15)" : "#e8ede6" }}>
          <div style={{ height: "100%", background: light ? GRN_M : GRN, width: pct + "%", transition: "width .5s ease", borderRadius: "0 2px 2px 0" }} />
        </div>
      )}
    </div>
  );
}
