import { GRN, GRN_L, GRN_M, WHITE, INK, INK2, INK3 } from "../constants/theme";

// Re-export colors used by consumers of this module
export { GRN, GRN_L, GRN_M, WHITE, INK, INK2, INK3 };

export const PHASE_META: Record<string, { duration: string; durationLong: string }> = {
  Reset:       { duration: "4 weeks",  durationLong: "four weeks" },
  Rebuild:     { duration: "12 weeks", durationLong: "twelve weeks" },
  Sustain:     { duration: "24 weeks", durationLong: "twenty-four weeks" },
  GI_Core:     { duration: "1 month",  durationLong: "one month" },
  GI_Advanced: { duration: "1 month",  durationLong: "one month" },
};

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const PRICING_CENTS: Record<string, number> = {
  Reset:       20000,
  Rebuild:     69900,
  Sustain:     89900,
  GI_Core:     30000,
  GI_Advanced: 60000,
};

export const PRICING: Record<string, { main: string; sub: string; day: string }> = {
  Reset:       { main: "$200 / month",    sub: `${PHASE_META.Reset.duration} clinical pathway`,       day: "$6.67 / day" },
  Rebuild:     { main: "$699 / 3 months", sub: `${PHASE_META.Rebuild.duration} clinical pathway`,     day: "$7.77 / day" },
  Sustain:     { main: "$999 / 6 months", sub: `${PHASE_META.Sustain.duration} clinical pathway`,     day: "$5.55 / day" },
  GI_Core:     { main: "$300 / month",    sub: `${PHASE_META.GI_Core.duration} clinical pathway`,     day: "$10.00 / day" },
  GI_Advanced: { main: "$599 / month",    sub: `${PHASE_META.GI_Advanced.duration} clinical pathway`, day: "$19.97 / day" },
};

export const SEC: Record<string, string> = {
  Reset: "Rebuild",
  Rebuild: "Sustain",
  Sustain: "GI_Core",
  GI_Core: "GI_Advanced",
  GI_Advanced: "GI_Core",
};

export const DUR: Record<string, string> = {
  lt6m: "less than 6 months",
  "6m_1y": "6 months to a year",
  "1_3y": "1 to 3 years",
  "3_5y": "3 to 5 years",
  gt5y: "over 5 years",
};

export const PW: Record<string, any> = {
  Reset: {
    badge: `Reset · ${PHASE_META.Reset.duration} Clinical Pathway`,
    headline: "You're early. This is when change is easiest.",
    severityStatement: "Based on your assessment, your gut-brain axis dysfunction is at risk.",
    isGI: false,
    h1: (n: string, l: boolean) => l ? `${n}, you've had inconsistent habits for a while. Reset is where that changes.` : `${n}, your body can't change until your habits stop fighting you.`,
    h2: (_l: boolean) => "Four weeks of structured, coached stabilization before anything else.",
    hook: () => "Most people skip this step. They jump straight into diets and routines and wonder why nothing sticks.",
    extra: (ans: Record<string, any>) => {
      if (ans.q5_attempts === "first_time") return "This is your starting point, built properly from the ground up.";
      if (["some_progress", "nothing_held"].includes(ans.q5_attempts)) return "You've tried things before. This time the foundation comes first.";
      return null;
    },
    bullets: [
      "Dedicated clinical health coach with daily text support and weekly calls",
      "Blood work and case reviewed by the medical team",
      "Daily meal plate review with coach feedback",
      "Physiotherapist evaluation at baseline with exercise routine recommendations",
      "Breathwork and stress-regulation practices",
      "Behavioural therapist training to support habit change",
      "Virtual health education sessions with Dr. Pal and his team of doctors",
      "Unlimited fitness sessions. Login anytime, anywhere. 180+ live virtual sessions per week across yoga, strength, Zumba and Tabata.",
    ],
    tags: ["Habits first", "Daily coach access", "Clinically reviewed"],
  },
  Rebuild: {
    badge: `Rebuild · ${PHASE_META.Rebuild.duration} Clinical Pathway`,
    headline: "Time and the right protocol. That's what your body needs.",
    severityStatement: "Based on your assessment, your gut-brain axis dysfunction is mild.",
    isGI: false,
    h1: (n: string, l: boolean) => l ? `${n}, you already know short phases don't work for this.` : `${n}, your body needs more than a generic plan.`,
    h2: (l: boolean) => l ? "Rebuild is built around your diagnosis. Twelve weeks of targeted correction with the time your body actually needs." : "Twelve weeks of targeted metabolic correction, built around your specific symptoms and what your body actually needs to shift.",
    hook: (ans: Record<string, any>) => ans.q5_attempts === "nothing_held" ? "Real metabolic change takes time. Rebuild gives it the twelve weeks it actually needs. You've been through enough to know a generic plan won't cut it." : "Real metabolic change takes time. Rebuild gives it the twelve weeks it actually needs.",
    extra: (ans: Record<string, any>) => {
      const s = ans.r2_symptoms || [];
      if (s.includes("brain_fog") || s.includes("fatigue")) return "Your energy and clarity are part of what this phase addresses, not a side effect.";
      return null;
    },
    bullets: [
      "Dedicated clinical health coach with daily text access and diet review",
      "Disease-specific coaching built around your diagnosis",
      "Blood work reviewed by the medical team, with ongoing symptom tracking",
      "Physiotherapist evaluation at baseline with exercise routine recommendations",
      "1:1 behavioural therapist evaluation for habit change and stress support",
      "Weekly virtual health education sessions with Dr. Pal and his team of doctors",
      "Unlimited fitness sessions. Login anytime, anywhere. 180+ live virtual sessions per week across yoga, strength, Zumba and Tabata.",
    ],
    tags: ["Built around your diagnosis", "12 weeks of targeted correction", "Progress you can measure"],
  },
  Sustain: {
    badge: `Sustain · ${PHASE_META.Sustain.duration} Clinical Pathway`,
    headline: "Multiple layers, one coordinated plan. That's what makes change hold.",
    severityStatement: "Based on your assessment, your gut-brain axis dysfunction is moderate.",
    isGI: false,
    h1: (n: string, l: boolean) => l ? `${n}, the results came before. And then quietly left.` : `${n}, three months isn't enough for what you're dealing with.`,
    h2: (l: boolean) => l ? "Sustain is built so that doesn't happen again." : `${cap(PHASE_META.Sustain.durationLong)} of structured clinical support, built for complexity and designed so results hold when the phase ends.`,
    hook: (ans: Record<string, any>) => ans.q5_attempts === "nothing_held" ? "Complex conditions, overlapping diagnoses, a history of losing progress. This phase is built for exactly that." : "Complex conditions, overlapping diagnoses, real complexity that needs time. This phase is built for exactly that.",
    extra: () => null,
    bullets: [
      "Dedicated health coach, daily diet review, disease-specific coaching",
      "Physiotherapist evaluation at baseline with exercise routine recommendations, reassessed at mid-pathway",
      "Weekly physiotherapist sessions or 1:1 personal trainer sessions, prescribed based on your assessment",
      "1:1 behavioural therapist evaluation for habit change and stress support",
      "Weekly virtual health education sessions with Dr. Pal and his team of doctors",
      "Symptoms, progress and labs monitored by the medical team",
      "Unlimited fitness sessions. Login anytime, anywhere. 180+ live virtual sessions per week across yoga, strength, Zumba and Tabata.",
    ],
    tags: ["24 weeks of structure", "Relapse prevention built in", "Results that hold"],
  },
  GI_Core: {
    badge: `GI Core · ${PHASE_META.GI_Core.duration} Clinical Pathway`,
    headline: "Start with your gut. The rest of your body follows.",
    severityStatement: "Based on your assessment, your gut-brain axis dysfunction is severe.",
    isGI: true,
    h1: (n: string, l: boolean) => l ? `${n}, you've cut things out, tried elimination diets, googled your symptoms.` : `${n}, you've been guessing at your triggers for long enough.`,
    h2: (l: boolean) => l ? "You need a proper protocol, not another guess." : "GI Core is a medically overseen reset that finds the answer.",
    hook: () => "A structured elimination plan, a guided reintroduction protocol and daily coaching, so you know exactly what your body tolerates and why.",
    extra: (ans: Record<string, any>) => {
      if (ans.q1_aspiration === "eating") return "You said you want to eat freely. That's exactly what this phase is designed to get you to.";
      return null;
    },
    bullets: [
      "Initial consultation with a Senior Doctor from Dr. Pal's team",
      "Weekly consultations with a GI dietitian, daily text-based check-ins",
      "Physiotherapist evaluation at baseline with exercise routine recommendations",
      "Monthly 1:1 gut-brain focused behavioural therapist evaluation and counselling",
      "Weekly virtual health education sessions with Dr. Pal and his team of doctors",
      "Unlimited fitness sessions. Login anytime, anywhere. 180+ live virtual sessions per week across yoga, strength, Zumba and Tabata.",
    ],
    tags: ["Medically overseen", "Triggers identified precisely", "Daily GI coach support"],
  },
  GI_Advanced: {
    badge: `GI Advanced · ${PHASE_META.GI_Advanced.duration} Clinical Pathway`,
    headline: "You've worked around your gut for years. Let's work with it.",
    severityStatement: "Based on your assessment, your gut-brain axis dysfunction is very severe.",
    isGI: true,
    h1: (n: string, l: boolean) => l ? `${n}, you're on medication and your gut is still making your life difficult.` : `${n}, complex gut conditions need more than a diet plan.`,
    h2: (l: boolean) => l ? "GI Advanced is the phase for that." : "It needs a full clinical team working your case.",
    hook: () => "A full clinical team works your case from day one, with a direct Dr. Pal consultation at the mid-point of your phase.",
    extra: (ans: Record<string, any>) => {
      if (["gut_med", "multiple_med"].includes(ans.r4_medication)) return "You're already on medication. This phase is built for exactly that, not despite it.";
      return null;
    },
    bullets: [
      "Initial consultation with a Senior Doctor from Dr. Pal's team",
      "One-on-one mid-month consultation with Dr. Pal",
      "Weekly one-on-one sessions with a Senior GI Nutritionist, daily text access and diet review",
      "Weekly 1:1 gut-brain focused behavioural therapist evaluation and counselling",
      "Weekly integrative mind-body therapy sessions",
      "Physiotherapist evaluation at baseline with exercise routine recommendations",
      "Weekly virtual health education sessions with Dr. Pal and his team of doctors",
      "Unlimited fitness sessions. Login anytime, anywhere. 180+ live virtual sessions per week across yoga, strength, Zumba and Tabata.",
    ],
    tags: ["Dr. Pal directly involved", "Gut-brain therapy included", "Built for chronic and complex"],
  },
};

export const PW_SEC: Record<string, any> = {
  Reset:       { h1: "Reset is a four-week foundation phase.",                         h2: "Structured habits, daily coaching and clinical review. Before anything else.",                 hook: "Most people skip this step. They jump straight into diets and routines and wonder why nothing sticks." },
  Rebuild:     { h1: "Rebuild is twelve weeks of targeted metabolic correction.",       h2: "Built around your specific symptoms and what your body actually needs to shift.",              hook: "Real metabolic change takes time. Rebuild gives it the twelve weeks it actually needs." },
  Sustain:     { h1: "Sustain is twenty-four weeks of structured clinical support.",    h2: "Built for complexity and designed so results hold when the phase ends.",                       hook: "For complex conditions, overlapping diagnoses and real complexity that needs time." },
  GI_Core:     { h1: "GI Core is a medically overseen one-month gut reset.",           h2: "Structured elimination, guided reintroduction and daily coaching.",                            hook: "A structured elimination plan and daily GI coaching, so you know exactly what your body tolerates and why." },
  GI_Advanced: { h1: "GI Advanced is Dr. Pal's most intensive clinical gut phase.",    h2: "A full clinical team working your case from day one.",                                         hook: "A full clinical team works your case from day one, with a direct Dr. Pal consultation at the mid-point of your phase." },
};

export const SEC_COPY: Record<string, string> = {
  Reset:       "Twelve weeks of targeted metabolic correction, built around your specific symptoms and what your body actually needs to shift.",
  Rebuild:     `${cap(PHASE_META.Sustain.durationLong)} of structured clinical support, built for complexity and designed so results hold when the phase ends.`,
  Sustain:     "A medically supervised gut phase with daily GI coach support, built to find the root cause of your symptoms with clinical precision.",
  GI_Core:     "Dr. Pal's most clinically intensive gut phase. Direct supervision, weekly therapist sessions and a full clinical team working your case from day one.",
  GI_Advanced: "A medically supervised gut phase with daily GI coach support, built to find the root cause of your symptoms with clinical precision.",
};

export const CONDITION_CARDS = [
  { name: "Energy & Metabolism", stat: "84%",     desc: "reported consistent energy improvement" },
  { name: "Gut & Digestion",     stat: "91%",     desc: "saw gut symptoms improve within their phase" },
  { name: "Type 2 Diabetes",     stat: "100%",    desc: "reduced HbA1c, without changing medication" },
  { name: "PCOS & Hormonal",     stat: "83%",     desc: "improved weight and energy in their first phase" },
  { name: "Thyroid",             stat: "82%",     desc: "metabolic markers stabilised and energy returned" },
  { name: "IBS & Acid Reflux",   stat: "70%",     desc: "had their specific food trigger identified" },
  { name: "Crohn's & Colitis",   stat: "79%",     desc: "reduced flare frequency under clinical protocol" },
  { name: "Body Composition",    stat: "2,000kg+", desc: "lost collectively across all programmes" },
];

export const UNIVERSAL = [
  { n: "91%",  l: "Gut symptoms improved" },
  { n: "100%", l: "HbA1c reduced" },
];

export const TESTIMONIALS: Record<string, any[]> = {
  Reset: [
    { n: "Priya S.",    a: "33", c: "Thyroid · Reset",      q: "My habits were all over the place. Having a coach who understood my condition from day one made everything click.",  tags: ["thyroid", "female"] },
    { n: "Aisha M.",    a: "31", c: "Fatigue · Reset",       q: "Everything I was doing was good. It just needed to be in the right order for my body.",                             tags: ["fatigue", "female"] },
    { n: "Karan P.",    a: "26", c: "Low energy · Reset",    q: "I wasn't broken. I just had no foundation.",                                                                        tags: ["male"] },
    { n: "Meera V.",    a: "28", c: "Habits · Reset",        q: "Three weeks in I realised I'd never actually built a routine before. I'd just been reacting.",                      tags: ["female"] },
    { n: "Rohan D.",    a: "30", c: "Energy · Reset",        q: "I kept starting over. This was the first time starting over actually meant something different.",                    tags: ["male"] },
  ],
  Rebuild: [
    { n: "Simran K.",   a: "29", c: "PCOS · Rebuild",        q: "Every doctor told me to lose weight. This was the first time someone actually addressed why I couldn't.",           tags: ["pcos", "female"] },
    { n: "Dawn S.",     a: "36", c: "Thyroid · Rebuild",     q: "I'd made progress before, but I'd never understood why it kept stopping.",                                          tags: ["thyroid", "female"] },
    { n: "Aniket R.",   a: "41", c: "Brain fog · Rebuild",   q: "Turns out the things I was sticking to weren't right for my body.",                                                tags: ["brain_fog", "male"] },
    { n: "Fatima H.",   a: "34", c: "Weight gain · Rebuild", q: "I'd been told my bloodwork was fine for years. My coach found what the bloodwork didn't.",                         tags: ["weight_gain", "female"] },
    { n: "Vivek M.",    a: "38", c: "Metabolic · Rebuild",   q: "Twelve weeks felt like a lot. Looking back, it was exactly what it needed to be.",                                 tags: ["male"] },
  ],
  Sustain: [
    { n: "Anjali S.",   a: "44", c: "PCOS, hypothyroidism · Sustain",    q: "I had been managing each condition separately for years. Having one team look at everything together was the difference.", tags: ["pcos", "thyroid", "female"] },
    { n: "Prashant M.", a: "52", c: "Type 2 diabetes · Sustain",         q: "Every other phase ignored the fact that I had conditions. This one started there.",                    tags: ["diabetes", "male"] },
    { n: "Leena R.",    a: "47", c: "Autoimmune · Sustain",              q: "Six months felt daunting. But it was the first time I didn't lose everything I'd built when it ended.", tags: ["autoimmune", "female"] },
    { n: "Suresh N.",   a: "49", c: "Cholesterol · Sustain",             q: "I came in sceptical. My markers told a different story by month four.",                                tags: ["cholesterol", "male"] },
  ],
  GI_Core: [
    { n: "Aisha T.",    a: "27", c: "IBS · GI Core",          q: "I had no idea how much I'd shrunk my life to manage my symptoms. Four weeks changed that.",                       tags: ["ibs", "female"] },
    { n: "Prafulla D.", a: "32", c: "IBS, bloating · GI Core",q: "I'd accepted this was just how my body worked. Turns out it wasn't.",                                             tags: ["ibs", "male"] },
    { n: "Nadia K.",    a: "29", c: "GERD · GI Core",         q: "I'd been on medication for two years. Within a month I understood what was actually driving it.",                  tags: ["female"] },
    { n: "Arjun S.",    a: "35", c: "Bloating · GI Core",     q: "The elimination phase was hard. The results made it very simple in hindsight.",                                    tags: ["bloating", "male"] },
  ],
  GI_Advanced: [
    { n: "Priya B.",    a: "38", c: "Crohn's disease · GI Advanced",        q: "Every other approach treated my Crohn's and my diet as separate problems. This treated them as one.", tags: ["ibd", "female"] },
    { n: "Samarth V.",  a: "46", c: "Ulcerative Colitis · GI Advanced",     q: "Years of flare cycles and I finally understand what was driving them. This program changed that.",   tags: ["ibd", "male"] },
    { n: "Roshni A.",   a: "41", c: "Crohn's, on medication · GI Advanced", q: "I was worried the medication would make this harder. They built the whole protocol around it.",       tags: ["ibd", "gut_med", "female"] },
  ],
};

export const PATHWAY_SEVERITY: Record<string, { label: string; color: string; bg: string; border: string }> = {
  Reset:       { label: "At Risk",     color: "#86efac", bg: "rgba(134,239,172,0.10)", border: "rgba(134,239,172,0.30)" },
  Rebuild:     { label: "Mild",        color: "#fcd34d", bg: "rgba(252,211,77,0.10)",  border: "rgba(252,211,77,0.30)"  },
  Sustain:     { label: "Moderate",    color: "#fdba74", bg: "rgba(253,186,116,0.10)", border: "rgba(253,186,116,0.30)" },
  GI_Core:     { label: "Severe",      color: "#fca5a5", bg: "rgba(252,165,165,0.10)", border: "rgba(252,165,165,0.30)" },
  GI_Advanced: { label: "Very Severe", color: "#f87171", bg: "rgba(248,113,113,0.10)", border: "rgba(248,113,113,0.30)" },
};

export const FRAMING_BODY = "When the gut-brain axis is disrupted by food, stress, or inflammation, symptoms go beyond digestion: energy, skin, mood, sleep. Identifying what your body reacts to is where change starts.";

export const BRIDGE_SENTENCE = "Based on the above and your entire history, here's your recommended plan.";

export const ASSURANCE: Record<string, string> = {
  Reset:       "Your body isn't broken, it just hasn't been given a pattern to work with. Set the rhythm, and your energy, hunger and hormones fall back into place.",
  Rebuild:     "Your body has been compensating long enough that it's learned to stay stuck. Addressing that takes a protocol built for what's actually happening, not a generic plan.",
  Sustain:     "Years of layered diagnoses require a different kind of care. Single-track fixes won't hold. Coordinated clinical care will.",
  GI_Core:     "Your gut health drives most of your symptoms. So your care plan treats both your gut and your metabolic health. You'll have a dedicated team working together, not in silos.",
  GI_Advanced: "Your gut-brain axis has been under sustained pressure for years, the result of chronic symptoms, ongoing medication, and the compounding stress these conditions create. Treating this requires coordinated clinical care from a dedicated team, including a 1:1 mid-pathway consultation with Dr. Pal.",
};

export const ACTIONABLE_POINTS: Record<string, string[]> = {
  metabolic: [
    "Eat gut-friendly, wholesome nutritious food. No rigid diet chart.",
    "Regulate cortisol with daily mindfulness-based practices.",
    "Restore insulin sensitivity through aligned fasting, sleep and movement.",
    "A clinical team that tailors your care as you progress.",
  ],
  gi: [
    "Eliminate trigger foods, then reintroduce systematically.",
    "Follow a phased gut-healing diet.",
    "Track symptoms daily through your pathway.",
    "Take supplements only where clinically guided.",
    "Maintain daily gut-brain regulating practices.",
  ],
};
