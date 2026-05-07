import { GRN, GRN_M, INK3, WHITE } from "../../constants/theme";

export function LogoMark({ size = 32, color = GRN }: { size?: number; color?: string }) {
  const arms = 8;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {Array.from({ length: arms }).map((_, i) => {
        const a = (i / arms) * Math.PI * 2 - Math.PI * 0.15;
        const cx = 50 + 28 * Math.cos(a), cy = 50 + 28 * Math.sin(a);
        return <ellipse key={i} cx={cx} cy={cy} rx="8" ry="13" transform={`rotate(${(i / arms) * 360 + 80},${cx},${cy})`} fill={color} />;
      })}
      <circle cx="50" cy="50" r="7" fill={color} />
    </svg>
  );
}

export function LogoFull({ height = 38, light = false }: { height?: number; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <LogoMark size={height} color={light ? GRN_M : GRN} />
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontSize: height * 0.26, color: light ? "rgba(255,255,255,.55)" : INK3, fontWeight: 500, letterSpacing: ".04em", marginBottom: 1 }}>Dr. Pal's</div>
        <div style={{ fontSize: height * 0.52, color: light ? WHITE : GRN, fontWeight: 800, letterSpacing: "-.01em", lineHeight: 1 }}><span style={{ fontWeight: 400 }}>New</span>ME</div>
      </div>
    </div>
  );
}
