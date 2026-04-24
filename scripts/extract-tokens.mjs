// Extracts fills and text styles from figma/node.json into design-tokens.json
import fs from "node:fs/promises";

const data = JSON.parse(await fs.readFile("figma/node.json", "utf8"));
const rootKey = Object.keys(data.nodes)[0];
const canvas = data.nodes[rootKey].document;

const colors = new Map(); // hex => count
const fonts = new Map(); // "family|weight|size" => count, sample
const hex = (c) => {
  const r = Math.round(c.r * 255)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(c.g * 255)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(c.b * 255)
    .toString(16)
    .padStart(2, "0");
  const a = c.a === 1 || c.a === undefined ? "" : Math.round(c.a * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}${a}`.toUpperCase();
};

const walk = (n) => {
  for (const f of n.fills || []) {
    if (f.type === "SOLID" && f.color) {
      const k = hex({ ...f.color, a: f.opacity ?? f.color.a ?? 1 });
      colors.set(k, (colors.get(k) || 0) + 1);
    }
  }
  if (n.type === "TEXT" && n.style) {
    const s = n.style;
    const key = `${s.fontFamily}|${s.fontWeight}|${s.fontSize}|${s.lineHeightPx?.toFixed(0) || s.lineHeightPercent}`;
    const sample = (n.characters || "").slice(0, 40);
    const e = fonts.get(key) || { count: 0, samples: [] };
    e.count++;
    if (e.samples.length < 3 && sample && !e.samples.includes(sample))
      e.samples.push(sample);
    fonts.set(key, e);
  }
  (n.children || []).forEach(walk);
};
walk(canvas);

const colorList = [...colors.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([hex, count]) => ({ hex, count }));
const fontList = [...fonts.entries()]
  .sort((a, b) => b[1].count - a[1].count)
  .map(([key, v]) => {
    const [family, weight, size, lh] = key.split("|");
    return {
      family,
      weight: Number(weight),
      size: Number(size),
      lineHeight: lh,
      count: v.count,
      samples: v.samples,
    };
  });

await fs.writeFile(
  "figma/design-tokens.json",
  JSON.stringify({ colors: colorList, fonts: fontList }, null, 2),
);
console.log(
  `colors: ${colorList.length}   fonts: ${fontList.length}`,
);
console.log("\nTop colors:");
colorList.slice(0, 20).forEach((c) => console.log(`  ${c.hex}  × ${c.count}`));
console.log("\nTop fonts:");
fontList
  .slice(0, 15)
  .forEach((f) =>
    console.log(
      `  ${f.family.padEnd(20)} ${String(f.weight).padEnd(3)} ${String(f.size).padStart(4)}px  × ${f.count}   "${f.samples[0]}"`,
    ),
  );
