import { TESTIMONIALS } from "../data/pathways";

export function deriveFlags(a: Record<string, any>) {
  console.log("Deriving flags from answers:", a);
  const r2 = a.r2_symptoms || [], r3 = a.r3_diagnoses || [];
  const long_dur = ["1_3y", "3_5y", "gt5y", "6m_1y"].includes(a.r5_duration);
  const short_dur = ["lt6m"].includes(a.r5_duration);
  const gut_med = a.r4_medication === "gut_med";
  const hormonal_med = a.r4_medication === "hormonal_med";
  const multiple_med = a.r4_medication === "multiple_med";
  const ibd_flag = r3.includes("ibd");
  const q8n = r3.filter((d: string) => d !== "none").length;
  const symptom_count = r2.filter((s: string) => s !== "none").length;
  const gi_diagnosis = (r3.includes("ibs") ? 1 : 0) + (r3.includes("ibd") ? 1 : 0);
  const has_skin_gut = r2.includes("skin") && (a.r1_track === "gut" || a.r1_track === "both" || gi_diagnosis >= 1);
  const gi_symptom = (a.r1_track === "gut" || a.r1_track === "both" ? 1 : 0) + (r2.includes("bloating") ? 1 : 0) + gi_diagnosis + (has_skin_gut ? 1 : 0);
  const gi_threshold_met = gi_symptom >= 2 || (gi_symptom >= 1 && gi_diagnosis >= 1);
  return { long_dur, short_dur, gut_med, hormonal_med, multiple_med, ibd_flag, q8n, symptom_count, gi_symptom, gi_diagnosis, gi_threshold_met };
}

export function routeAnswers(a: Record<string, any>) {
  const f = deriveFlags(a), r3: string[] = a.r3_diagnoses || [];
  let pathway: string;
  if (f.gi_threshold_met) {
    if (f.ibd_flag) {
      console.log("Routing to GI_Advanced due to IBD diagnosis");
      pathway = "GI_Advanced";
    } else if (f.gut_med && f.long_dur) {
      console.log("Routing to GI_Advanced due to gut medication and long duration");
      pathway = "GI_Advanced";
    } else if (f.gi_symptom >= 3 && f.long_dur) {
      console.log("Routing to GI_Advanced due to GI symptoms and long duration");
      pathway = "GI_Advanced";
    } else {
      console.log("Routing to GI_Core");
      pathway = "GI_Core";
    }
  } else {
    if (f.short_dur && f.q8n === 0 && f.symptom_count < 2 && ["first_time", "little"].includes(a.q5_attempts)) pathway = "Reset";
    else if (f.long_dur && f.q8n >= 2) pathway = "Sustain";
    else if (f.q8n >= 3) pathway = "Sustain";
    else if (a.q5_attempts === "nothing_held" && f.long_dur && f.q8n >= 1) pathway = "Sustain";
    else if (f.hormonal_med && f.long_dur && f.q8n >= 2) pathway = "Sustain";
    else if (f.multiple_med) pathway = "Sustain";
    else pathway = "Rebuild";
  }
  const gut_note = ["Rebuild", "Sustain"].includes(pathway) && f.gi_symptom === 1 && f.gi_diagnosis === 0;
  const METABOLIC_DX = ["obesity", "pcos", "thyroid", "diabetes", "cholesterol", "fatty_liver", "autoimmune"];
  const GI_DX_MAP: Record<string, string> = { ibs: "IBS / acid reflux", ibd: "Crohn's / Ulcerative Colitis" };
  const META_DX_MAP: Record<string, string> = { obesity: "Obesity", pcos: "PCOS", thyroid: "thyroid condition", diabetes: "Type 2 diabetes", cholesterol: "high cholesterol", fatty_liver: "fatty liver", autoimmune: "autoimmune condition" };
  const metabolic_note = ["GI_Core", "GI_Advanced"].includes(pathway) ? r3.filter((d: string) => METABOLIC_DX.includes(d)) : [];
  const gi_dx_labels = r3.filter((d: string) => GI_DX_MAP[d]).map((d: string) => GI_DX_MAP[d]);
  const meta_dx_labels = metabolic_note.map((d: string) => META_DX_MAP[d]).filter(Boolean);
  const dx_labels_metabolic = r3.filter((d: string) => META_DX_MAP[d]).map((d: string) => META_DX_MAP[d]);
  return { pathway, gut_note, gi_dx_labels, meta_dx_labels, dx_labels_metabolic, long_dur: f.long_dur };
}

export function getCalcMessages(ans: Record<string, any>) {
  const r3 = ans.r3_diagnoses || [];
  const msgs = ["Looking at your symptom profile…"];
  if (r3.length > 0 && !r3.includes("none")) msgs.push(`Reviewing your ${r3.filter((d: string) => d !== "none").length > 1 ? "diagnoses" : "diagnosis"}…`);
  else msgs.push("Mapping your health history…");
  if (["1_3y", "3_5y", "gt5y", "6m_1y"].includes(ans.r5_duration)) msgs.push("Accounting for how long this has been going on…");
  else msgs.push("Assessing complexity and duration…");
  msgs.push("Your clinical pathway has been identified.");
  return msgs;
}

export function pickStories(phase: string, ans: Record<string, any>, gender: string) {
  const pool = TESTIMONIALS[phase] || [];
  const r3 = ans.r3_diagnoses || [], r2 = ans.r2_symptoms || [], med = ans.r4_medication || "";
  const tags = [...r3, ...r2, med, gender].filter(Boolean);
  const scored = pool.map((t: any) => ({ ...t, score: t.tags.filter((tag: string) => tags.includes(tag)).length })).sort((a: any, b: any) => b.score - a.score);
  return scored.slice(0, 2).length ? scored.slice(0, 2) : pool.slice(0, 2);
}
