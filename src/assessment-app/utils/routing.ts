import { TESTIMONIALS } from "../data/pathways";

export function deriveFlags(a: Record<string, any>) {
  console.log("Deriving flags from answers:", a);
  const r2 = a.r2_symptoms || [], r3 = a.r3_diagnoses || [];

  const long_dur = ["1_3y", "3_5y", "gt5y", "6m_1y"].includes(a.r5_duration);
  const short_dur = a.r5_duration === "lt6m";

  // v2: IBS threshold lowered to 3+ years. "3_5y" and "gt5y" both qualify.
  const duration_3plus = ["3_5y", "gt5y"].includes(a.r5_duration);

  const gut_med = a.r4_medication === "gut_med";
  const hormonal_med = a.r4_medication === "hormonal_med";
  const multiple_med = a.r4_medication === "multiple_med";

  const ibd_flag = r3.includes("ibd");
  // FIX 2: Added ibs_flag for GI Advanced IBS + 5yr check
  const ibs_flag = r3.includes("ibs");

  const q8n = r3.filter((d: string) => d !== "none").length;
  const symptom_count = r2.filter((s: string) => s !== "none").length;

  const gi_diagnosis =
    (r3.includes("ibs") ? 1 : 0) + (r3.includes("ibd") ? 1 : 0);

  const has_skin_gut =
    r2.includes("skin") &&
    (a.r1_track === "gut" || a.r1_track === "both" || gi_diagnosis >= 1);

  const gi_symptom =
    (a.r1_track === "gut" || a.r1_track === "both" ? 1 : 0) +
    (r2.includes("bloating") ? 1 : 0) +
    gi_diagnosis +
    (has_skin_gut ? 1 : 0);

  const gi_threshold_met =
    gi_symptom >= 2 || (gi_symptom >= 1 && gi_diagnosis >= 1);

  return {
    long_dur,
    short_dur,
    duration_3plus,
    gut_med,
    hormonal_med,
    multiple_med,
    ibd_flag,
    ibs_flag,
    q8n,
    symptom_count,
    gi_symptom,
    gi_diagnosis,
    gi_threshold_met,
  };
}

export function routeAnswers(a: Record<string, any>) {
  const f = deriveFlags(a), r3: string[] = a.r3_diagnoses || [];
  let pathway: string;

  if (f.gi_threshold_met) {
    if (f.ibd_flag) {
      // IBD (Crohn's or Ulcerative Colitis) → GI Advanced
      console.log("Routing to GI_Advanced due to IBD diagnosis");
      pathway = "GI_Advanced";
    } else if (f.ibs_flag && f.duration_3plus) {
      // v2: IBS + 3+ years → GI Advanced (threshold lowered from 5+ years)
      console.log("Routing to GI_Advanced due to IBS with 3+ year duration");
      pathway = "GI_Advanced";
    } else {
      console.log("Routing to GI_Core");
      pathway = "GI_Core";
    }
  } else {
    // FIX 6: Corrected key from q5_attempts → r5_attempts (consistent with all other r-prefixed keys)
    if (
      f.short_dur &&
      f.q8n === 0 &&
      f.symptom_count < 2 &&
      ["first_time", "little"].includes(a.r5_attempts)
    ) {
      pathway = "Reset";
    } else if (f.long_dur && f.q8n >= 2) {
      pathway = "Sustain";
    } else if (f.q8n >= 3) {
      pathway = "Sustain";
    } else if (a.r5_attempts === "nothing_held" && f.long_dur && f.q8n >= 1) {
      pathway = "Sustain";
    } else if (f.hormonal_med && f.long_dur && f.q8n >= 2) {
      pathway = "Sustain";
    } else if (f.multiple_med) {
      pathway = "Sustain";
    } else {
      pathway = "Rebuild";
    }
  }

  // v2: Comorbidity flag — GI Advanced patients who also meet metabolic Sustain
  // criteria are flagged internally for the clinical team. Not shown to patient.
  const would_be_sustain =
    (f.long_dur && f.q8n >= 2) ||
    f.q8n >= 3 ||
    (a.r5_attempts === "nothing_held" && f.long_dur && f.q8n >= 1) ||
    (f.hormonal_med && f.long_dur && f.q8n >= 2) ||
    f.multiple_med;

  const comorbidity_flag = pathway === "GI_Advanced" && would_be_sustain;

  if (comorbidity_flag) {
    console.log("Comorbidity flag: GI Advanced + metabolic Sustain criteria met. Coordinated plan recommended.");
  }


  // users who have any gut signal, not just those with exactly score 1
  const gut_note =
    ["Rebuild", "Sustain"].includes(pathway) &&
    f.gi_symptom >= 1 &&
    f.gi_diagnosis === 0;

  const METABOLIC_DX = [
    "obesity",
    "pcos",
    "thyroid",
    "diabetes",
    "cholesterol",
    "fatty_liver",
    "autoimmune",
  ];

  const GI_DX_MAP: Record<string, string> = {
    ibs: "IBS / acid reflux",
    ibd: "Crohn's / Ulcerative Colitis",
  };

  const META_DX_MAP: Record<string, string> = {
    obesity: "Obesity",
    pcos: "PCOS",
    thyroid: "thyroid condition",
    diabetes: "Type 2 diabetes",
    cholesterol: "high cholesterol",
    fatty_liver: "fatty liver",
    autoimmune: "autoimmune condition",
  };

  const metabolic_note = ["GI_Core", "GI_Advanced"].includes(pathway)
    ? r3.filter((d: string) => METABOLIC_DX.includes(d))
    : [];

  const gi_dx_labels = r3
    .filter((d: string) => GI_DX_MAP[d])
    .map((d: string) => GI_DX_MAP[d]);

  const meta_dx_labels = metabolic_note
    .map((d: string) => META_DX_MAP[d])
    .filter(Boolean);

  const dx_labels_metabolic = r3
    .filter((d: string) => META_DX_MAP[d])
    .map((d: string) => META_DX_MAP[d]);

  return {
    pathway,
    comorbidity_flag,
    gut_note,
    gi_dx_labels,
    meta_dx_labels,
    dx_labels_metabolic,
    long_dur: f.long_dur,
  };
}

export function getCalcMessages(ans: Record<string, any>) {
  const r3 = ans.r3_diagnoses || [];
  const msgs = ["Looking at your symptom profile…"];
  if (r3.length > 0 && !r3.includes("none")) {
    msgs.push(
      `Reviewing your ${
        r3.filter((d: string) => d !== "none").length > 1
          ? "diagnoses"
          : "diagnosis"
      }…`
    );
  } else {
    msgs.push("Mapping your health history…");
  }
  if (["1_3y", "3_5y", "gt5y", "6m_1y"].includes(ans.r5_duration)) {
    msgs.push("Accounting for how long this has been going on…");
  } else {
    msgs.push("Assessing complexity and duration…");
  }
  msgs.push("Your clinical pathway has been identified.");
  return msgs;
}

export function pickStories(
  phase: string,
  ans: Record<string, any>,
  gender: string
) {
  const pool = TESTIMONIALS[phase] || [];
  const r3 = ans.r3_diagnoses || [],
    r2 = ans.r2_symptoms || [],
    med = ans.r4_medication || "";
  const tags = [...r3, ...r2, med, gender].filter(Boolean);
  const scored = pool
    .map((t: any) => ({
      ...t,
      score: t.tags.filter((tag: string) => tags.includes(tag)).length,
    }))
    .sort((a: any, b: any) => b.score - a.score);
  return scored.slice(0, 2).length ? scored.slice(0, 2) : pool.slice(0, 2);
}
