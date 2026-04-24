// Deep-walks Option 1 frame (2527:341) and prints the text content of each
// major section group.
import fs from "node:fs/promises";

const data = JSON.parse(await fs.readFile("figma/node.json", "utf8"));
const rootKey = Object.keys(data.nodes)[0];
const canvas = data.nodes[rootKey].document;

const find = (n, id) => {
  if (n.id === id) return n;
  for (const c of n.children || []) {
    const r = find(c, id);
    if (r) return r;
  }
  return null;
};

const frame = find(canvas, "2527:341");

const collectText = (n, out = []) => {
  if (n.type === "TEXT" && n.characters) out.push(n.characters.trim());
  (n.children || []).forEach((c) => collectText(c, out));
  return out;
};

const sections = [
  { id: "2550:6699", label: "Header" },
  { id: "2527:2713", label: "Hero: headline" },
  { id: "2527:2714", label: "Hero: subcopy" },
  { id: "2533:2931", label: "Hero: CTA group 224" },
  { id: "2527:2925", label: "Hero: rotating card 221" },
  { id: "2527:2720", label: "Hero: pager title" },
  { id: "2527:347", label: "Section 2: What's NewMe" },
  { id: "2527:367", label: "Section 3: Group 165" },
  { id: "2563:13812", label: "Section 4: Group 249" },
  { id: "2563:13813", label: "Section 5: Group 250" },
  { id: "2527:2799", label: "Section 6: Group 210" },
  { id: "2527:2758", label: "Section 6b: Group 202 (nested?)" },
  { id: "2552:8912", label: "Section 7: Group 247" },
  { id: "2563:13825", label: "Section 8: Group 251" },
  { id: "2552:8910", label: "Section 9: Group 246 (footer?)" },
];

for (const s of sections) {
  const node = find(frame, s.id);
  if (!node) {
    console.log(`\n--- ${s.label} (${s.id}) NOT FOUND`);
    continue;
  }
  const b = node.absoluteBoundingBox;
  const texts = collectText(node).filter((t) => t);
  console.log(
    `\n--- ${s.label} (${s.id}) ${Math.round(b.width)}x${Math.round(b.height)} — ${texts.length} text blocks`,
  );
  for (const t of texts.slice(0, 14)) {
    console.log(`   ${t.slice(0, 120).replace(/\n/g, " / ")}`);
  }
  if (texts.length > 14) console.log(`   … +${texts.length - 14} more`);
}
