export function LogoMark({ size = 32, color = "#2d4a28" }: { size?: number; color?: string }) {
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

/** Renders the actual newme-logo.png used across the site */
export function LogoFull({ height = 38, light = false }: { height?: number; light?: boolean }) {
  return (
    <img
      src="/newme-logo.png"
      alt="Dr. Pal's NewME"
      style={{ height, width: "auto", display: "block", filter: light ? "brightness(0) invert(1)" : "none" }}
    />
  );
}
