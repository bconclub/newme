// Lists all pages/canvases in a Figma file.
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
  for (let i = 0; i < 6; i++) {
    const res = await fetch(url, { headers: { "X-Figma-Token": TOKEN } });
    if (res.status === 429) {
      const w = 5000 + i * 10000;
      console.log(`  429 — wait ${w / 1000}s`);
      await new Promise((r) => setTimeout(r, w));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
    return res.json();
  }
  throw new Error("rate limited");
};

const j = await api(`https://api.figma.com/v1/files/${FILE}?depth=2`);
console.log("file:", j.name);
for (const page of j.document.children) {
  console.log(`\n[${page.id}] ${page.name}  (${page.type})`);
  for (const frame of page.children || []) {
    const b = frame.absoluteBoundingBox;
    console.log(
      `  ${frame.id}  ${frame.type.padEnd(10)} ${b ? `${Math.round(b.width)}x${Math.round(b.height)}` : ""}  ${frame.name}`,
    );
  }
}
