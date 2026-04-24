// Exports a list of Figma nodes as labeled PNGs.
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

// Node id → friendly filename
const NODES = {
  "2013:63": "hero-portrait",
  "2024:271": "mission-card",
  "2024:238": "what-will-you-get",
  "2036:195": "transformative-journeys",
  "2052:356": "get-more-stats",
  "2017:113": "program-card-1",
  "2017:114": "program-card-2",
  "2017:126": "program-card-3",
  "2017:138": "program-card-4",
  "2052:360": "testimonial-1",
  "2052:359": "testimonial-2",
  "2052:330": "testimonial-3",
  "2040:256": "faq-accordion-item",
};

const api = async (url) => {
  for (let i = 0; i < 8; i++) {
    const res = await fetch(url, { headers: { "X-Figma-Token": TOKEN } });
    if (res.status === 429) {
      const wait = 5000 + i * 10000;
      console.log(`  429 — wait ${wait / 1000}s`);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    return res.json();
  }
  throw new Error("rate limited");
};

const ids = Object.keys(NODES).join(",");
console.log(`→ export ${Object.keys(NODES).length} nodes @2x`);
const j = await api(
  `https://api.figma.com/v1/images/${FILE}?ids=${encodeURIComponent(ids)}&format=png&scale=2`,
);

await fs.mkdir("figma/images", { recursive: true });
let n = 0;
for (const [id, url] of Object.entries(j.images)) {
  if (!url) {
    console.log(`✗ no url for ${id}`);
    continue;
  }
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  const fname = `figma/images/${NODES[id] || id.replace(/[:;]/g, "_")}.png`;
  await fs.writeFile(fname, buf);
  console.log(`✓ ${fname} (${(buf.length / 1024).toFixed(0)}KB)`);
  n++;
}
console.log(`done — ${n} images`);
