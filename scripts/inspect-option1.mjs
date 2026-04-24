// Maps children of the Option 1 frame (2527:341) by Y position.
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
if (!frame) {
  console.error("frame 2527:341 not found in node.json");
  process.exit(1);
}
console.log(
  `frame: ${frame.name} ${Math.round(frame.absoluteBoundingBox.width)}x${Math.round(frame.absoluteBoundingBox.height)}`,
);

const frameY = frame.absoluteBoundingBox.y;
const kids = (frame.children || []).map((c) => ({
  id: c.id,
  name: c.name,
  type: c.type,
  x: Math.round((c.absoluteBoundingBox?.x || 0)),
  y: Math.round((c.absoluteBoundingBox?.y || 0) - frameY),
  w: Math.round(c.absoluteBoundingBox?.width || 0),
  h: Math.round(c.absoluteBoundingBox?.height || 0),
}));

kids.sort((a, b) => a.y - b.y);

const rows = kids.filter(
  (k) =>
    k.type === "TEXT" ||
    ((["FRAME", "GROUP", "INSTANCE", "COMPONENT"].includes(k.type)) &&
      k.w > 60 &&
      k.h > 60),
);

for (const r of rows) {
  console.log(
    `${String(r.y).padStart(5)} (${String(r.w).padStart(4)}x${String(r.h).padStart(4)}) [${r.type.padEnd(9)}] ${r.id.padEnd(11)}  ${r.name.slice(0, 70)}`,
  );
}
