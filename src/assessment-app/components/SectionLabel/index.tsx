import React from "react";
import { GRN, INK3 } from "../../constants/theme";

export function Dot() {
  return <div style={{ width: 6, height: 6, borderRadius: "50%", background: GRN, flexShrink: 0, marginTop: 7 }} />;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: INK3, fontWeight: 700, marginBottom: 14 }}>
      {children}
    </p>
  );
}
