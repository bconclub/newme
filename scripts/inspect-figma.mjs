// Groups children of the landing-page frame into sections by Y band.
import fs from "node:fs/promises";

const data = JSON.parse(await fs.readFile("figma/node.json", "utf8"));
const rootKey = Object.keys(data.nodes)[0];
const canvas = data.nodes[rootKey].document;
const frame = canvas.children.find((c) => c.name.includes("landing"));

const kids = (frame.children || []).map((c) => ({
  id: c.id,
  name: c.name,
  type: c.type,
  x: c.absoluteBoundingBox?.x,
  y: c.absoluteBoundingBox?.y,
  w: c.absoluteBoundingBox?.width,
  h: c.absoluteBoundingBox?.height,
}));

// Sort by y
kids.sort((a, b) => a.y - b.y);

// Print a condensed listing: only TEXT + FRAME/GROUP/INSTANCE large items, round y to 10px
const rows = kids
  .filter(
    (k) =>
      k.type === "TEXT" ||
      ((k.type === "FRAME" || k.type === "GROUP" || k.type === "INSTANCE") &&
        k.w > 50 &&
        k.h > 50),
  )
  .map((k) => ({
    y: Math.round(k.y),
    h: Math.round(k.h),
    w: Math.round(k.w),
    x: Math.round(k.x),
    type: k.type,
    id: k.id,
    name: k.name.slice(0, 60),
  }));

for (const r of rows)
  console.log(
    `${String(r.y).padStart(5)} (${String(r.w).padStart(4)}x${String(r.h).padStart(4)}) [${r.type.padEnd(9)}] ${r.id}  ${r.name}`,
  );
