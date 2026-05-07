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
    <div style={{
      background: "#013E37",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <LogoFull height={42} />
        </a>
        {showProgress && step > 0 && step <= total && (
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500, fontFamily: "var(--font-urbanist, 'Urbanist', sans-serif)" }}>{step} of {total + 1}</span>
        )}
      </div>
      {showProgress && (
        <div style={{ height: 3, background: "rgba(255,255,255,0.1)" }}>
          <div style={{ height: "100%", background: "#FEF272", width: pct + "%", transition: "width .5s ease", borderRadius: "0 2px 2px 0" }} />
        </div>
      )}
    </div>
  );
}
