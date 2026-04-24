// Exports a specific node id as PNG. Usage:
//   node scripts/export-figma.mjs <nodeId> <scale>
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

const [, , nodeId, scaleStr = "1"] = process.argv;
if (!nodeId) throw new Error("usage: export-figma.mjs <nodeId> [scale]");
const scale = parseFloat(scaleStr);

const TOKEN = env.FIGMA_TOKEN;
const FILE = env.FIGMA_FILE_KEY;

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

console.log(`→ export ${nodeId} @${scale}x`);
const j = await api(
  `https://api.figma.com/v1/images/${FILE}?ids=${encodeURIComponent(nodeId)}&format=png&scale=${scale}`,
);
const url = j.images[nodeId];
if (!url) throw new Error("no image url returned: " + JSON.stringify(j));
console.log("→ downloading", url);
const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
const out = `figma/images/${nodeId.replace(/[:;]/g, "_")}.png`;
await fs.mkdir("figma/images", { recursive: true });
await fs.writeFile(out, buf);
console.log(`✓ ${out} (${(buf.length / 1024).toFixed(0)}KB)`);
