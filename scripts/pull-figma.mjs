// Pulls a Figma node subtree + image exports into ./figma/
// Run: node scripts/pull-figma.mjs
// Requires FIGMA_TOKEN, FIGMA_FILE_KEY, FIGMA_NODE_ID in .env.local

import fs from "node:fs/promises";
import path from "node:path";

const env = await fs
  .readFile(new URL("../.env.local", import.meta.url), "utf8")
  .then((txt) =>
    Object.fromEntries(
      txt
        .split(/\r?\n/)
        .filter((l) => l && !l.startsWith("#"))
        .map((l) => {
          const i = l.indexOf("=");
          return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
        }),
    ),
  );

const TOKEN = env.FIGMA_TOKEN;
const FILE = env.FIGMA_FILE_KEY;
const NODE = env.FIGMA_NODE_ID;
if (!TOKEN || !FILE || !NODE) throw new Error("Missing FIGMA_* in .env.local");

const OUT = path.resolve("figma");
await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(path.join(OUT, "images"), { recursive: true });

const api = async (url, { retry = 10 } = {}) => {
  for (let i = 0; i < retry; i++) {
    const res = await fetch(url, { headers: { "X-Figma-Token": TOKEN } });
    if (res.status === 429) {
      const wait = Math.min(60_000, 5_000 + i * 15_000);
      console.log(`  429 — waiting ${wait / 1000}s (attempt ${i + 1}/${retry})`);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    return res.json();
  }
  throw new Error("rate limited after retries");
};

console.log(`→ fetching node ${NODE}`);
const node = await api(
  `https://api.figma.com/v1/files/${FILE}/nodes?ids=${encodeURIComponent(NODE)}&geometry=paths`,
);
await fs.writeFile(path.join(OUT, "node.json"), JSON.stringify(node, null, 2));

// Collect exportable image fills + vector nodes up to a depth so we don't explode
const ids = new Set();
const walk = (n, depth = 0) => {
  if (!n) return;
  if (depth <= 3 && ["FRAME", "COMPONENT", "INSTANCE"].includes(n.type))
    ids.add(n.id);
  if (n.type === "VECTOR" || n.type === "BOOLEAN_OPERATION") ids.add(n.id);
  if (n.fills?.some((f) => f.type === "IMAGE")) ids.add(n.id);
  n.children?.forEach((c) => walk(c, depth + 1));
};
const root = node.nodes[Object.keys(node.nodes)[0]].document;
walk(root);
console.log(`→ ${ids.size} exportable nodes`);

// Export in batches of 50, as PNG @2x
const batches = [];
const arr = [...ids];
for (let i = 0; i < arr.length; i += 50) batches.push(arr.slice(i, i + 50));

const manifest = {};
for (const [i, batch] of batches.entries()) {
  console.log(`→ export batch ${i + 1}/${batches.length}`);
  const res = await api(
    `https://api.figma.com/v1/images/${FILE}?ids=${batch.join(",")}&format=png&scale=2`,
  );
  Object.assign(manifest, res.images);
}
await fs.writeFile(
  path.join(OUT, "images.json"),
  JSON.stringify(manifest, null, 2),
);

// Download
let n = 0;
for (const [id, url] of Object.entries(manifest)) {
  if (!url) continue;
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await fs.writeFile(
    path.join(OUT, "images", `${id.replace(/[:;]/g, "_")}.png`),
    buf,
  );
  n++;
}
console.log(`✓ wrote ${n} images to figma/images/`);
console.log(`✓ node tree at figma/node.json`);
