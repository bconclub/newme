// Exports the 8 pillar icon frames + a few key section images as SVG/PNG
// for pixel-accurate reproduction.
import fs from "node:fs/promises";

const env = Object.fromEntries(
  (await fs.readFile(".env.local", "utf8"))
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const TOKEN = env.FIGMA_TOKEN;
const FILE = env.FIGMA_FILE_KEY;

const api = async (url) => {
  for (let i = 0; i < 10; i++) {
    const res = await fetch(url, { headers: { "X-Figma-Token": TOKEN } });
    if (res.status === 429) {
      const w = Math.min(60_000, 5_000 + i * 12_000);
      console.log(`  429 — wait ${w / 1000}s`);
      await new Promise((r) => setTimeout(r, w));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
    return res.json();
  }
  throw new Error("rate limited after retries");
};

// Option 1 pillar icon frames (130x130 each)
const PILLAR_FRAMES = [
  "2414:1393",
  "2414:1396",
  "2414:1399",
  "2414:1402",
  "2414:1405",
  "2414:1408",
  "2414:1411",
  "2414:1414",
];

const TARGETS = {
  svg: PILLAR_FRAMES,
  png: [
    { id: "2527:2702", name: "option1-hero-photo" },   // hero mask group
    { id: "2527:347",  name: "option1-whatis" },        // What is NewMe section
    { id: "2527:367",  name: "option1-drpal" },         // Dr Pal section
    { id: "2563:13812", name: "option1-pathways" },     // Pathways section
    { id: "2552:8912", name: "option1-structured" },    // StructuredCare
    { id: "2552:8910", name: "option1-footer" },        // Footer
  ],
};

await fs.mkdir("figma/icons", { recursive: true });
await fs.mkdir("figma/images", { recursive: true });

// --- SVG pillar icons
console.log(`→ SVG export: ${TARGETS.svg.length} icon frames`);
const svgJ = await api(
  `https://api.figma.com/v1/images/${FILE}?ids=${TARGETS.svg.join(",")}&format=svg`,
);
let ok = 0;
for (const id of TARGETS.svg) {
  const url = svgJ.images[id];
  if (!url) {
    console.log(`  ✗ ${id}: no url`);
    continue;
  }
  const body = await (await fetch(url)).text();
  await fs.writeFile(
    `figma/icons/pillar-${id.replace(/[:;]/g, "_")}.svg`,
    body,
  );
  ok++;
}
console.log(`  ✓ ${ok}/${TARGETS.svg.length} SVG icons`);

// --- PNG sections
console.log(`\n→ PNG export: ${TARGETS.png.length} sections @1x`);
const ids = TARGETS.png.map((t) => t.id).join(",");
const pngJ = await api(
  `https://api.figma.com/v1/images/${FILE}?ids=${encodeURIComponent(ids)}&format=png&scale=1`,
);
for (const t of TARGETS.png) {
  const url = pngJ.images[t.id];
  if (!url) {
    console.log(`  ✗ ${t.id} (${t.name}): no url`);
    continue;
  }
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  const fname = `figma/images/${t.name}.png`;
  await fs.writeFile(fname, buf);
  console.log(`  ✓ ${fname} (${(buf.length / 1024).toFixed(0)}KB)`);
}
