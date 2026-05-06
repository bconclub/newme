'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/option1/Header'
import EyebrowPill from '@/components/option1/EyebrowPill'

const EASE = [0.22, 1, 0.36, 1] as const

// ── Types ─────────────────────────────────────────────────────────────────────
type Screen = 'intro' | 'q' | 'stats' | 'calc' | 'results' | 'phase_detail'
type Opt = { v: string; l: string; excl?: boolean }
type Question = { id: string; type: 's' | 'm'; hl: string; q: string; sub?: string; opts: Opt[]; max?: number }

// ── Question data ─────────────────────────────────────────────────────────────
const PERSONALISATION: Question[] = [
  { id: 'q1_aspiration', type: 's', hl: "Let's start somewhere real.", q: 'What would feeling your best actually look like?', sub: 'Select the one that resonates most.', opts: [
    { v: 'energy',     l: 'Feeling energetic throughout the day' },
    { v: 'eating',     l: 'Eating freely, no gas, no indigestion, no worry' },
    { v: 'skin',       l: 'Waking up with clear skin, no breakouts, no overnight inflammation' },
    { v: 'body',       l: 'A body that feels light, clear and ready, not stiff or foggy' },
    { v: 'planning',   l: 'Planning my week without building it around my symptoms' },
    { v: 'confidence', l: 'Feeling confident and comfortable in my body again' },
  ]},
  { id: 'q2_food', type: 's', hl: 'Food tells us a lot.', q: "What's your relationship with food like right now?", opts: [
    { v: 'chaotic',     l: 'Chaotic, no real rhythm or pattern' },
    { v: 'no_response', l: "I eat well but my body doesn't respond" },
    { v: 'restricted',  l: 'I think I follow diet rules but they feel restrictive' },
    { v: 'symptoms',    l: 'Eating causes symptoms: pain, bloating, reactions' },
    { v: 'stable',      l: "Pretty stable, food isn't the main issue" },
  ]},
  { id: 'q3_sleep', type: 's', hl: 'Sleep is data.', q: 'How would you describe your sleep right now?', opts: [
    { v: 'fragmented',    l: 'I fall asleep fine but wake multiple times' },
    { v: 'onset',         l: 'I struggle to fall asleep and stay asleep' },
    { v: 'unrestorative', l: 'I sleep 7+ hours but never feel rested' },
    { v: 'fine',          l: "Sleep isn't an issue for me" },
  ]},
  { id: 'q4_stress', type: 's', hl: 'Be honest with yourself.', q: "Stress, where are you with it?", opts: [
    { v: 'high',     l: "High, it doesn't stop" },
    { v: 'moderate', l: 'Moderate, manageable but always there' },
    { v: 'low',      l: "Low, stress isn't a major factor for me" },
    { v: 'physical', l: 'I cope, but it hits my body more than my mind' },
  ]},
  { id: 'q5_attempts', type: 's', hl: "You've probably tried things before.", q: 'What have you tried before?', opts: [
    { v: 'first_time',   l: 'This is my first time trying anything structured' },
    { v: 'little',       l: "A little, nothing really structured" },
    { v: 'some_progress', l: "I've made some progress but can't seem to sustain it" },
    { v: 'nothing_held', l: "Yes, phases, diets, doctors. Nothing has held." },
  ]},
]

const ROUTING: Question[] = [
  { id: 'r1_track', type: 's', hl: "Let's get specific.", q: "What's the main thing you want to address?", opts: [
    { v: 'metabolic', l: 'My weight, energy or hormones' },
    { v: 'gut',       l: 'My gut: digestion, bloating, reactions to food' },
    { v: 'both',      l: 'Both, but gut symptoms are most disruptive' },
    { v: 'unsure',    l: "I'm not sure yet" },
  ]},
  { id: 'r2_symptoms', type: 'm', hl: 'Your body is communicating.', q: "What does your body do that it really shouldn't?", sub: "Select up to 5, even things you've learned to live with.", max: 5, opts: [
    { v: 'fatigue',    l: 'Fatigue or energy crashes' },
    { v: 'brain_fog',  l: 'Brain fog or difficulty concentrating' },
    { v: 'bloating',   l: 'Bloating or digestive discomfort' },
    { v: 'weight_gain',l: 'Unexplained weight gain' },
    { v: 'periods',    l: 'Irregular or painful periods' },
    { v: 'skin',       l: 'Skin flares, acne or rashes' },
    { v: 'joints',     l: 'Joint pain or stiffness' },
    { v: 'mood',       l: 'Mood swings or anxiety' },
    { v: 'none',       l: 'None of these', excl: true },
  ]},
  { id: 'r3_diagnoses', type: 'm', hl: 'Context matters here.', q: 'Has anything been formally diagnosed?', sub: 'Select everything that applies.', opts: [
    { v: 'pcos',        l: 'PCOS or hormonal imbalance' },
    { v: 'thyroid',     l: 'Thyroid condition' },
    { v: 'diabetes',    l: 'Type 2 diabetes or pre-diabetes' },
    { v: 'cholesterol', l: 'High cholesterol or blood pressure' },
    { v: 'ibs',         l: 'IBS, GERD, gastritis or acid reflux' },
    { v: 'ibd',         l: "Crohn's or Ulcerative Colitis" },
    { v: 'fatty_liver', l: 'Fatty liver' },
    { v: 'autoimmune',  l: "Autoimmune condition (e.g. Hashimoto's, Rheumatoid Arthritis)" },
    { v: 'none',        l: 'Nothing diagnosed', excl: true },
  ]},
  { id: 'r4_medication', type: 's', hl: 'A quick one.', q: 'Are you currently taking any medication?', opts: [
    { v: 'gut_med',      l: 'Yes, for a gut or digestive condition' },
    { v: 'hormonal_med', l: 'Yes, for hormones or metabolism' },
    { v: 'multiple_med', l: 'Yes, for multiple conditions' },
    { v: 'was_on',       l: "I was, but I'm not anymore" },
    { v: 'none',         l: 'No medication' },
  ]},
  { id: 'r5_duration', type: 's', hl: 'Time is a signal.', q: 'How long has this been going on?', sub: 'Be as honest as you can.', opts: [
    { v: 'lt6m',   l: 'Less than 6 months' },
    { v: '6m_1y',  l: '6 months to a year' },
    { v: '1_3y',   l: '1 to 3 years' },
    { v: '3_5y',   l: '3 to 5 years' },
    { v: 'gt5y',   l: 'More than 5 years' },
  ]},
]

const ALL_Q = [...PERSONALISATION, ...ROUTING]
const TOTAL = ALL_Q.length // 10
const R3_STEP = 8 // step at which we show stats interstitial (after r3_diagnoses)

// ── Routing logic ─────────────────────────────────────────────────────────────
function deriveFlags(a: Record<string, unknown>) {
  const r2 = (a.r2_symptoms as string[]) || [], r3 = (a.r3_diagnoses as string[]) || []
  const long_dur  = ['1_3y','3_5y','gt5y'].includes(a.r5_duration as string)
  const short_dur = ['lt6m','6m_1y'].includes(a.r5_duration as string)
  const gut_med       = a.r4_medication === 'gut_med'
  const hormonal_med  = a.r4_medication === 'hormonal_med'
  const multiple_med  = a.r4_medication === 'multiple_med'
  const ibd_flag      = r3.includes('ibd')
  const q8n           = r3.filter(d => d !== 'none').length
  const symptom_count = r2.filter(s => s !== 'none').length
  const gi_diagnosis  = (r3.includes('ibs') ? 1 : 0) + (r3.includes('ibd') ? 1 : 0)
  const has_skin_gut  = r2.includes('skin') && (a.r1_track === 'gut' || a.r1_track === 'both' || gi_diagnosis >= 1)
  const gi_symptom    = (a.r1_track === 'gut' || a.r1_track === 'both' ? 1 : 0) + (r2.includes('bloating') ? 1 : 0) + gi_diagnosis + (has_skin_gut ? 1 : 0)
  const gi_threshold_met = gi_symptom >= 2 || (gi_symptom >= 1 && gi_diagnosis >= 1)
  return { long_dur, short_dur, gut_med, hormonal_med, multiple_med, ibd_flag, q8n, symptom_count, gi_symptom, gi_diagnosis, gi_threshold_met }
}

function routeAnswers(a: Record<string, unknown>) {
  const f = deriveFlags(a), r3 = (a.r3_diagnoses as string[]) || []
  let pathway: string
  if (f.gi_threshold_met) {
    if (f.ibd_flag)                              pathway = 'GI_Advanced'
    else if (f.gut_med && f.long_dur)            pathway = 'GI_Advanced'
    else if (f.gi_symptom >= 3 && f.long_dur)   pathway = 'GI_Advanced'
    else                                          pathway = 'GI_Core'
  } else {
    if (f.short_dur && f.q8n === 0 && f.symptom_count < 2 && ['first_time','little'].includes(a.q5_attempts as string)) pathway = 'Reset'
    else if (f.long_dur && f.q8n >= 2)                                                                                    pathway = 'Sustain'
    else if (f.q8n >= 3)                                                                                                   pathway = 'Sustain'
    else if (a.q5_attempts === 'nothing_held' && f.long_dur && f.q8n >= 1)                                                pathway = 'Sustain'
    else if (f.hormonal_med && f.long_dur && f.q8n >= 2)                                                                  pathway = 'Sustain'
    else if (f.multiple_med)                                                                                               pathway = 'Sustain'
    else                                                                                                                   pathway = 'Rebuild'
  }
  const gut_note = ['Rebuild','Sustain'].includes(pathway) && f.gi_symptom === 1 && f.gi_diagnosis === 0
  const METABOLIC_DX = ['pcos','thyroid','diabetes','cholesterol','fatty_liver','autoimmune']
  const GI_DX_MAP:   Record<string,string> = { ibs: 'IBS / acid reflux', ibd: "Crohn's / Ulcerative Colitis" }
  const META_DX_MAP: Record<string,string> = { pcos: 'PCOS', thyroid: 'thyroid condition', diabetes: 'Type 2 diabetes', cholesterol: 'high cholesterol', fatty_liver: 'fatty liver', autoimmune: 'autoimmune condition' }
  const metabolic_note    = ['GI_Core','GI_Advanced'].includes(pathway) ? r3.filter(d => METABOLIC_DX.includes(d)) : []
  const gi_dx_labels      = r3.filter(d => GI_DX_MAP[d]).map(d => GI_DX_MAP[d])
  const meta_dx_labels    = metabolic_note.map(d => META_DX_MAP[d]).filter(Boolean)
  const dx_labels_metabolic = r3.filter(d => META_DX_MAP[d]).map(d => META_DX_MAP[d])
  return { pathway, gut_note, gi_dx_labels, meta_dx_labels, dx_labels_metabolic, long_dur: f.long_dur }
}

// ── Static content ────────────────────────────────────────────────────────────
const SEC: Record<string,string> = { Reset:'Rebuild', Rebuild:'Sustain', Sustain:'GI_Core', GI_Core:'GI_Advanced', GI_Advanced:'GI_Core' }

const PHASE_META: Record<string,{duration:string;durationLong:string}> = {
  Reset:      { duration: '4 weeks',   durationLong: 'four weeks' },
  Rebuild:    { duration: '12 weeks',  durationLong: 'twelve weeks' },
  Sustain:    { duration: '24 weeks',  durationLong: 'twenty-four weeks' },
  GI_Core:    { duration: '1 month',   durationLong: 'one month' },
  GI_Advanced:{ duration: '1 month',   durationLong: 'one month' },
}

const PRICING: Record<string,{main:string;sub:string;day:string}> = {
  Reset:      { main: '$200 / month',    sub: `${PHASE_META.Reset.duration} phase`,       day: '$6.67 / day' },
  Rebuild:    { main: '$699 / 3 months', sub: `${PHASE_META.Rebuild.duration} phase`,     day: '$7.77 / day' },
  Sustain:    { main: '$899 / 6 months', sub: `${PHASE_META.Sustain.duration} phase`,     day: '$4.99 / day' },
  GI_Core:    { main: '$300 / month',    sub: `${PHASE_META.GI_Core.duration} phase`,     day: '$10 / day' },
  GI_Advanced:{ main: '$600 / month',    sub: `${PHASE_META.GI_Advanced.duration} phase`, day: '$20 / day' },
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const SEC_COPY: Record<string,string> = {
  Reset:       'Twelve weeks of targeted metabolic correction, built around your specific symptoms and what your body actually needs to shift.',
  Rebuild:     `${cap(PHASE_META.Sustain.durationLong)} of structured clinical support, built for complexity and designed so results hold when the phase ends.`,
  Sustain:     'A medically supervised gut phase with daily GI coach support, built to find the root cause of your symptoms with clinical precision.',
  GI_Core:     "Dr. Pal's most clinically intensive gut phase. Direct supervision, weekly therapist sessions and a full clinical team working your case from day one.",
  GI_Advanced: 'A medically supervised gut phase with daily GI coach support, built to find the root cause of your symptoms with clinical precision.',
}

const PW: Record<string,{
  badge:string; tags:string[]; bullets:string[];
  h1:(n:string,l:boolean)=>string; h2:(l:boolean)=>string
  hook:((a:Record<string,unknown>)=>string)|string
  extra:((a:Record<string,unknown>)=>string|null)|null
}> = {
  Reset: {
    badge: `Reset · ${PHASE_META.Reset.duration} Foundation Phase`,
    h1: (n,l) => l ? `${n}, you've had inconsistent habits for a while. Reset is where that changes.` : `${n}, your body can't change until your habits stop fighting you.`,
    h2: () => 'Four weeks of structured, coached stabilization before anything else.',
    hook: () => 'Most people skip this step. They jump straight into diets and routines and wonder why nothing sticks.',
    extra: (a) => {
      if (a.q5_attempts === 'first_time') return 'This is your starting point, built properly from the ground up.'
      if (['some_progress','nothing_held'].includes(a.q5_attempts as string)) return "You've tried things before. This time the foundation comes first."
      return null
    },
    tags: ['Habits first','Daily coach access','Clinically reviewed'],
    bullets: [
      'Dedicated clinical health coach with direct daily text access and weekly progress calls',
      'Blood work and case reviewed by the medical team with insights shared directly with you',
      'Daily meal plate review with real-time qualitative feedback from your coach',
      'Physiotherapist and behavioral therapist screening, breathwork and stress-regulation practices',
      'Weekly Dr. Pal live health education sessions, habit tracking and 180+ Virtual Gym sessions per week',
    ],
  },
  Rebuild: {
    badge: `Rebuild · ${PHASE_META.Rebuild.duration} Metabolic Phase`,
    h1: (n,l) => l ? `${n}, you already know short phases don't work for this.` : `${n}, your body needs more than a generic plan.`,
    h2: (l) => l ? 'Rebuild is built around your diagnosis. Twelve weeks of targeted correction with the time your body actually needs.' : 'Twelve weeks of targeted metabolic correction, built around your specific symptoms and what your body actually needs to shift.',
    hook: (a) => (a.q5_attempts as string) === 'nothing_held' ? "Real metabolic change takes time. Rebuild gives it the twelve weeks it actually needs. You've been through enough to know a generic plan won't cut it." : 'Real metabolic change takes time. Rebuild gives it the twelve weeks it actually needs.',
    extra: (a) => {
      const s = (a.r2_symptoms as string[]) || []
      if (s.includes('brain_fog') || s.includes('fatigue')) return 'Your energy and clarity are part of what this phase addresses, not a side effect.'
      return null
    },
    tags: ['Built around your diagnosis','12 weeks of targeted correction','Progress you can measure'],
    bullets: [
      'Dedicated clinical health coach with daily text access and weekly accountability calls',
      'Condition-specific coaching for thyroid, diabetes, fatty liver and metabolic health',
      'Nutrition progression from balanced plate guidance to calorie awareness, macro tracking and metabolic flexibility',
      'Blood work and case reviewed by the medical team, with ongoing symptom and progress monitoring',
      'Physio and behavioural therapist screening, Dr. Pal live sessions and 180+ Virtual Gym sessions per week',
    ],
  },
  Sustain: {
    badge: `Sustain · ${PHASE_META.Sustain.duration} Comprehensive Phase`,
    h1: (n,l) => l ? `${n}, the results came before. And then quietly left.` : `${n}, three months isn't enough for what you're dealing with.`,
    h2: (l) => l ? "Sustain is built so that doesn't happen again." : `${cap(PHASE_META.Sustain.durationLong)} of structured clinical support, built for complexity and designed so results hold when the phase ends.`,
    hook: (a) => (a.q5_attempts as string) === 'nothing_held' ? 'Complex conditions, overlapping diagnoses, a history of losing progress. This phase is built for exactly that.' : 'Complex conditions, overlapping diagnoses, real complexity that needs time. This phase is built for exactly that.',
    extra: () => null,
    tags: ['24 weeks of structure','Relapse prevention built in','Results that hold'],
    bullets: [
      `A dedicated clinical health coach, condition-specific coaching and weekly accountability calls across the full ${PHASE_META.Sustain.duration}`,
      'Weekly 1:1 virtual personal trainer sessions via the Virtual Gym',
      'Macro flexibility and nutrition autonomy guidance for sustainable, independent eating',
      'Relapse prevention planning built into the final stage so results hold when the phase ends',
      'Full symptom, energy and progress tracking throughout, with specialist referrals if required',
    ],
  },
  GI_Core: {
    badge: `GI Core · ${PHASE_META.GI_Core.duration} Gut Reset Phase`,
    h1: (n,l) => l ? `${n}, you've cut things out, tried elimination diets, googled your symptoms.` : `${n}, you've been guessing at your triggers for long enough.`,
    h2: (l) => l ? 'You need a proper protocol, not another guess.' : 'GI Core is a medically overseen reset that finds the answer.',
    hook: () => 'A structured elimination plan, a guided reintroduction protocol and daily coaching, so you know exactly what your body tolerates and why.',
    extra: (a) => a.q1_aspiration === 'eating' ? "You said you want to eat freely. That's exactly what this phase is designed to get you to." : null,
    tags: ['Medically overseen','Triggers identified precisely','Daily GI coach support'],
    bullets: [
      "Case reviewed by a senior doctor from Dr. Pal's team before your protocol is set",
      'Personalized elimination plan followed by a structured reintroduction, so your triggers are identified with precision',
      'GI coach check-ins and diet review every day, not once a week',
      'Symptoms tracked and corrections made throughout, with supplements chosen for your case',
      'Physiotherapist and behavioral therapist screening included',
      'Monthly live sessions with Dr. Pal and full Virtual Gym access',
    ],
  },
  GI_Advanced: {
    badge: `GI Advanced · ${PHASE_META.GI_Advanced.duration} Clinical Gut Phase`,
    h1: (n,l) => l ? `${n}, you're on medication and your gut is still making your life difficult.` : `${n}, complex gut conditions need more than a diet plan.`,
    h2: (l) => l ? 'GI Advanced is the phase for that.' : 'It needs a full clinical team working your case.',
    hook: () => 'A full clinical team works your case from day one, with a direct Dr. Pal consultation at the mid-point of your phase.',
    extra: (a) => ['gut_med','multiple_med'].includes(a.r4_medication as string) ? "You're already on medication. This phase is built for exactly that, not despite it." : null,
    tags: ['Dr. Pal directly involved','Gut-brain therapy included','Built for chronic and complex'],
    bullets: [
      'Direct supervision by Dr. Pal with a consultation at the mid-point of your phase',
      'Weekly senior GI nutritionist sessions with daily text check-ins and diet review',
      'Weekly therapist sessions and integrative mind-body therapy throughout',
      'Personalized elimination and reintroduction protocol adjusted around your medications in real time',
      'Symptom tracking, supplement guidance, physio screening and Virtual Gym access',
    ],
  },
}

const PW_SEC: Record<string,{h1:string;h2:string;hook:string}> = {
  Reset:      { h1:'Reset is a four-week foundation phase.',                    h2:'Structured habits, daily coaching and clinical review. Before anything else.',              hook:'Most people skip this step. They jump straight into diets and routines and wonder why nothing sticks.' },
  Rebuild:    { h1:'Rebuild is twelve weeks of targeted metabolic correction.',  h2:'Built around your specific symptoms and what your body actually needs to shift.',          hook:'Real metabolic change takes time. Rebuild gives it the twelve weeks it actually needs.' },
  Sustain:    { h1:'Sustain is twenty-four weeks of structured clinical support.',h2:'Built for complexity and designed so results hold when the phase ends.',                  hook:'For complex conditions, overlapping diagnoses and real complexity that needs time.' },
  GI_Core:    { h1:'GI Core is a medically overseen one-month gut reset.',       h2:'Structured elimination, guided reintroduction and daily coaching.',                       hook:'A structured elimination plan and daily GI coaching, so you know exactly what your body tolerates and why.' },
  GI_Advanced:{ h1:"GI Advanced is Dr. Pal's most intensive clinical gut phase.", h2:'A full clinical team working your case from day one.',                                    hook:'A full clinical team works your case from day one, with a direct Dr. Pal consultation at the mid-point of your phase.' },
}

const TESTIMONIALS: Record<string,{n:string;a:string;c:string;q:string;tags:string[]}[]> = {
  Reset: [
    { n:'Priya S.',  a:'33', c:'Thyroid · Reset',   q:'My habits were all over the place. Having a coach who understood my condition from day one made everything click.',   tags:['thyroid','female'] },
    { n:'Aisha M.',  a:'31', c:'Fatigue · Reset',    q:'Everything I was doing was good. It just needed to be in the right order for my body.',                             tags:['fatigue','female'] },
    { n:'Karan P.',  a:'26', c:'Low energy · Reset', q:"I wasn't broken. I just had no foundation.",                                                                        tags:['male'] },
    { n:'Meera V.',  a:'28', c:'Habits · Reset',     q:"Three weeks in I realised I'd never actually built a routine before. I'd just been reacting.",                      tags:['female'] },
    { n:'Rohan D.',  a:'30', c:'Energy · Reset',     q:"I kept starting over. This was the first time starting over actually meant something different.",                    tags:['male'] },
  ],
  Rebuild: [
    { n:'Simran K.',a:'29', c:'PCOS · Rebuild',       q:"Every doctor told me to lose weight. This was the first time someone actually addressed why I couldn't.",           tags:['pcos','female'] },
    { n:'Dawn S.',  a:'36', c:'Thyroid · Rebuild',    q:"I'd made progress before, but I'd never understood why it kept stopping.",                                          tags:['thyroid','female'] },
    { n:'Aniket R.',a:'41', c:'Brain fog · Rebuild',  q:"Turns out the things I was sticking to weren't right for my body.",                                                 tags:['brain_fog','male'] },
    { n:'Fatima H.',a:'34', c:'Weight gain · Rebuild',q:"I'd been told my bloodwork was fine for years. My coach found what the bloodwork didn't.",                          tags:['weight_gain','female'] },
    { n:'Vivek M.', a:'38', c:'Metabolic · Rebuild',  q:'Twelve weeks felt like a lot. Looking back, it was exactly what it needed to be.',                                  tags:['male'] },
  ],
  Sustain: [
    { n:'Anjali S.',  a:'44', c:'PCOS, hypothyroidism · Sustain', q:'I had been managing each condition separately for years. Having one team look at everything together was the difference.', tags:['pcos','thyroid','female'] },
    { n:'Prashant M.',a:'52', c:'Type 2 diabetes · Sustain',      q:'Every other phase ignored the fact that I had conditions. This one started there.',                                       tags:['diabetes','male'] },
    { n:'Leena R.',   a:'47', c:'Autoimmune · Sustain',           q:"Six months felt daunting. But it was the first time I didn't lose everything I'd built when it ended.",                  tags:['autoimmune','female'] },
    { n:'Suresh N.',  a:'49', c:'Cholesterol · Sustain',          q:"I came in sceptical. My markers told a different story by month four.",                                                   tags:['cholesterol','male'] },
  ],
  GI_Core: [
    { n:'Aisha T.',   a:'27', c:'IBS · GI Core',          q:"I had no idea how much I'd shrunk my life to manage my symptoms. Four weeks changed that.",   tags:['ibs','female'] },
    { n:'Prafulla D.',a:'32', c:'IBS, bloating · GI Core',q:"I'd accepted this was just how my body worked. Turns out it wasn't.",                          tags:['ibs','male'] },
    { n:'Nadia K.',   a:'29', c:'GERD · GI Core',         q:"I'd been on medication for two years. Within a month I understood what was actually driving it.", tags:['female'] },
    { n:'Arjun S.',   a:'35', c:'Bloating · GI Core',     q:'The elimination phase was hard. The results made it very simple in hindsight.',                   tags:['bloating','male'] },
  ],
  GI_Advanced: [
    { n:"Priya B.",   a:'38', c:"Crohn's disease · GI Advanced",        q:"Every other approach treated my Crohn's and my diet as separate problems. This treated them as one.", tags:['ibd','female'] },
    { n:'Samarth V.', a:'46', c:'Ulcerative Colitis · GI Advanced',     q:'Years of flare cycles and I finally understand what was driving them. This program changed that.',    tags:['ibd','male'] },
    { n:'Roshni A.',  a:'41', c:"Crohn's, on medication · GI Advanced", q:"I was worried the medication would make this harder. They built the whole protocol around it.",        tags:['ibd','gut_med','female'] },
  ],
}

const CONDITION_CARDS = [
  { name:'Energy & Metabolism', stat:'84%',     desc:'reported consistent energy improvement' },
  { name:'Gut & Digestion',     stat:'91%',     desc:'saw gut symptoms improve within their phase' },
  { name:'Type 2 Diabetes',     stat:'100%',    desc:'reduced HbA1c, without changing medication' },
  { name:'PCOS & Hormonal',     stat:'83%',     desc:'improved weight and energy in their first phase' },
  { name:'Thyroid',             stat:'82%',     desc:'metabolic markers stabilised and energy returned' },
  { name:'IBS & Acid Reflux',   stat:'70%',     desc:'had their specific food trigger identified' },
  { name:"Crohn's & Colitis",   stat:'79%',     desc:'reduced flare frequency under clinical protocol' },
  { name:'Body Composition',    stat:'2,000kg+',desc:'lost collectively across all programmes' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function pickStories(phase: string, ans: Record<string,unknown>, gender: string) {
  const pool = TESTIMONIALS[phase] || []
  const r3 = (ans.r3_diagnoses as string[]) || [], r2 = (ans.r2_symptoms as string[]) || [], med = (ans.r4_medication as string) || ''
  const tags = [...r3, ...r2, med, gender].filter(Boolean)
  const scored = pool.map(t => ({ ...t, score: t.tags.filter(tag => tags.includes(tag)).length })).sort((a,b) => b.score - a.score)
  return scored.slice(0,2).length ? scored.slice(0,2) : pool.slice(0,2)
}

function getCalcMessages(ans: Record<string,unknown>) {
  const r3 = (ans.r3_diagnoses as string[]) || []
  const msgs = ['Looking at your symptom profile…']
  if (r3.length > 0 && !r3.includes('none')) msgs.push(`Reviewing your ${r3.filter(d=>d!=='none').length > 1 ? 'diagnoses' : 'diagnosis'}…`)
  else msgs.push('Mapping your health history…')
  if (['1_3y','3_5y','gt5y'].includes(ans.r5_duration as string)) msgs.push('Accounting for how long this has been going on…')
  else msgs.push('Assessing complexity and duration…')
  msgs.push('Your phase has been identified.')
  return msgs
}

// ── Shared UI helpers ─────────────────────────────────────────────────────────
const NOISE_SVG = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"
const MASK_RADIAL = 'radial-gradient(closest-side, black 0%, black 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.2) 92%, transparent 100%)'

// ── Main component ────────────────────────────────────────────────────────────
export default function AssessmentPage() {
  const [screen,       setScreen]      = useState<Screen>('intro')
  const [step,         setStep]        = useState(0)
  const [profile,      setProfile]     = useState({ dob: '', gender: '' })
  const [dobM,         setDobM]        = useState('')   // '01'–'12'
  const [dobD,         setDobD]        = useState('')   // '01'–'31'
  const [dobY,         setDobY]        = useState('')   // '1940'–current
  const [ans,          setAns]         = useState<Record<string,unknown>>({ r2_symptoms: [], r3_diagnoses: [] })
  const [info,         setInfo]        = useState({ name: '', last: '', email: '', phone: '' })
  const [res,          setRes]         = useState<Record<string,unknown> | null>(null)
  const [calcIdx,      setCalcIdx]     = useState(0)
  const [calcMsgs,     setCalcMsgs]    = useState<string[]>([])
  const [calcPct,      setCalcPct]     = useState(0)
  const [dobErr,       setDobErr]      = useState('')
  const [heroCount,    setHeroCount]   = useState(0)
  const [detailKey,    setDetailKey]   = useState<string | null>(null)
  const [crmLeadId,    setCrmLeadId]   = useState<string | null>(null)
  const [selectedPhase,setSelectedPhase] = useState<string | null>(null)
  const [condPage,     setCondPage]      = useState(0)
  const [secExpanded,  setSecExpanded] = useState(false)
  const [bodyVisible,  setBodyVisible] = useState(false)
  const [showSticky,   setShowSticky]  = useState(false)
  const pricingRef = useRef<HTMLDivElement>(null)

  // Scroll to top on every screen/step change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [step, screen, detailKey])

  // Hero counter on stats screen
  useEffect(() => {
    if (screen !== 'stats') return
    setHeroCount(0)
    let start: number | null = null
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1800, 1)
      setHeroCount(Math.round((1 - Math.pow(1 - p, 3)) * 10000))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [screen])

  // Results body fade-in + sticky CTA trigger
  useEffect(() => {
    if (screen !== 'results') return
    setBodyVisible(false); setShowSticky(false); setSecExpanded(false)
    const t = setTimeout(() => setBodyVisible(true), 420)
    return () => clearTimeout(t)
  }, [screen])

  useEffect(() => {
    if (screen !== 'results' || !pricingRef.current) return
    const obs = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { threshold: 0.1 })
    obs.observe(pricingRef.current)
    return () => obs.disconnect()
  }, [screen, res])

  const qIdx = step - 1
  const q = qIdx >= 0 && qIdx < TOTAL ? ALL_Q[qIdx] : null
  const pct = step === 0 ? 4 : Math.round((step / (TOTAL + 1)) * 100)

  function calcAge(dob: string) {
    if (!dob) return null
    const [y,m,d] = [parseInt(dob.slice(0,4)), parseInt(dob.slice(5,7))-1, parseInt(dob.slice(8,10))]
    const today = new Date(), b = new Date(y,m,d)
    let age = today.getFullYear() - b.getFullYear()
    if (today < new Date(today.getFullYear(), m, d)) age--
    return age
  }
  function handleDOB(v: string) {
    setProfile(p => ({ ...p, dob: v }))
    if (v) { const a = calcAge(v); setDobErr(a === null || a < 18 || a > 65 ? 'Please enter a valid date of birth (age 18 to 65).' : '') }
  }
  function canAdvanceProfile() {
    if (!profile.dob || !profile.gender) return false
    const a = calcAge(profile.dob); return a !== null && a >= 18 && a <= 65
  }
  function pickSingle(v: string) {
    if (!q) return
    setAns(a => ({ ...a, [q.id]: v }))
    setTimeout(() => { if (step < TOTAL) setStep(s => s + 1); else setStep(TOTAL + 1) }, 210)
  }
  function toggleMulti(v: string) {
    if (!q) return
    setAns(a => {
      const cur = (a[q.id] as string[]) || []
      const excl = q.opts.filter(o => o.excl).map(o => o.v)
      if (q.opts.find(o => o.v === v)?.excl) return { ...a, [q.id]: cur.includes(v) ? [] : [v] }
      const base = cur.filter(x => !excl.includes(x))
      if (base.includes(v)) return { ...a, [q.id]: base.filter(x => x !== v) }
      if (q.max && base.length >= q.max) return a
      return { ...a, [q.id]: [...base, v] }
    })
  }
  function advanceMulti() {
    if (step === R3_STEP) { setScreen('stats'); return }
    if (step < TOTAL) setStep(s => s + 1); else setStep(TOTAL + 1)
  }
  function startCalc() {
    const recommended = routeAnswers(ans).pathway
    const secondary = SEC[recommended]
    const crmBase = process.env.NEXT_PUBLIC_CRM_URL || 'http://localhost:4000'
    fetch(`${crmBase}/api/crm/lead`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ info, profile, ans, pathway: recommended, secondary }),
    }).then(r => r.json()).then(d => { if (d.leadId) setCrmLeadId(d.leadId) }).catch(() => {})

    const msgs = getCalcMessages(ans)
    setCalcMsgs(msgs); setCalcIdx(0); setCalcPct(0); setScreen('calc')
    msgs.forEach((_, i) => setTimeout(() => { setCalcIdx(i); setCalcPct(Math.round(((i + 1) / msgs.length) * 85)) }, i * 900))
    setTimeout(() => { setCalcPct(100); setRes(routeAnswers(ans) as Record<string,unknown>); setScreen('results') }, msgs.length * 900 + 600)
  }
  function trackSelectedPhase(phase: string) {
    setSelectedPhase(phase)
    if (!crmLeadId) return
    const crmBase = process.env.NEXT_PUBLIC_CRM_URL || 'http://localhost:4000'
    fetch(`${crmBase}/api/crm/lead/${crmLeadId}/select`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selected_phase: phase }),
    }).then(r => r.json()).catch(() => {})
  }

  // ── Progress bar ─────────────────────────────────────────────────────────────
  function ProgressBar() {
    return (
      <div style={{ height: 3, background: 'rgba(255,255,255,0.12)' }}>
        <div style={{ height: '100%', background: '#FEF272', width: `${pct}%`, transition: 'width .5s ease', borderRadius: '0 2px 2px 0' }} />
      </div>
    )
  }

  // ── Inline header for assessment screens ─────────────────────────────────────
  function AssessmentHeader({ showProgress = true }: { showProgress?: boolean }) {
    return (
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src="/newme-logo.png" alt="Dr. Pal's NewME" style={{ height: 36, width: 'auto' }} />
          {showProgress && step > 0 && step <= TOTAL && (
            <span className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
              {step} of {TOTAL + 1}
            </span>
          )}
        </div>
        {showProgress && <ProgressBar />}
      </div>
    )
  }

  // ── INTRO SCREEN ──────────────────────────────────────────────────────────────
  if (screen === 'intro') return (
    <div className="min-h-screen" style={{ background: '#173B39', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Atmosphere */}
      <AtmosphereBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 'clamp(72px,10vw,120px) 24px 64px' }}>
          <div style={{ maxWidth: 560, width: '100%' }} className="animate-[fadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
            {/* Eyebrow — matches site's EyebrowPill exactly */}
            <div style={{ marginBottom: 32 }}>
              <EyebrowPill>Dr. Pal&apos;s Clinical Phase Assessment</EyebrowPill>
            </div>

            <h1 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(32px,5.5vw,56px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 20, letterSpacing: '-.03em', color: '#fff' }}>
              You&apos;ve been trying.<br />
              Your body hasn&apos;t<br />
              responded.
            </h1>

            <p className="font-[family-name:var(--font-urbanist)]" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(15px,1.2vw,18px)', lineHeight: 1.75, maxWidth: 440, marginBottom: 40 }}>
              Not a diet plan. Not a generic program. A clinical assessment that matches you to a phase built around what&apos;s actually happening in your body, not what worked for someone else.
            </p>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex' }}>
                {[11, 12, 26, 44, 50].map((n, i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/56?img=${n}`}
                    alt="NewME member"
                    width={34} height={34}
                    style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid #173B39', marginLeft: i > 0 ? -10 : 0, objectFit: 'cover', display: 'block' }}
                  />
                ))}
              </div>
              <div>
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>10,000+ people have found their phase</p>
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Free · Private · Takes about 3 minutes</p>
              </div>
            </div>

            <button
              onClick={() => { setScreen('q'); setStep(0) }}
              className="font-[family-name:var(--font-bricolage)]"
              style={{ background: '#FEF272', color: '#013E37', border: 'none', borderRadius: 9999, fontSize: 16, fontWeight: 700, padding: '16px 40px', cursor: 'pointer', letterSpacing: '-.01em', transition: 'all .2s' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = '#FDF185'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'; (e.target as HTMLElement).style.boxShadow = '0 8px 32px rgba(254,242,114,0.35)' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = '#FEF272'; (e.target as HTMLElement).style.transform = ''; (e.target as HTMLElement).style.boxShadow = '' }}
            >
              Find my phase →
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // ── STATS SCREEN ──────────────────────────────────────────────────────────────
  if (screen === 'stats') {
    return (
      <div style={{ background: '#173B39', color: '#fff', position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <AtmosphereBg />
        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AssessmentHeader showProgress={true} />

          {/* Scrollable content — max 520px centred so cards stay compact on desktop */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 100px' }}>
            <div style={{ width: '100%', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', padding: '0 24px' }}>

              {/* ── Hero number ── */}
              <div style={{ paddingTop: 20, paddingBottom: 16, textAlign: 'center' }}>
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 10, color: '#629675', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>Dr. Pal&apos;s NewME · Clinical Outcomes</p>
                <div className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(52px,14vw,80px)', fontWeight: 800, color: '#FEF272', lineHeight: 1, letterSpacing: '-.04em' }}>
                  {heroCount >= 10000 ? '10,000+' : heroCount.toLocaleString()}
                </div>
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(13px,2.2vw,16px)', color: 'rgba(255,255,255,0.6)', marginTop: 6, lineHeight: 1.35 }}>
                  clients helped across metabolic, hormonal and gut health
                </p>
                {/* Two top-line stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
                  {[{ n:'91%', l:'Gut symptoms improved' }, { n:'100%', l:'HbA1c reduced' }].map((c, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 12, padding: '10px 8px', backdropFilter: 'blur(12px)' }}>
                      <div className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 22, fontWeight: 800, color: '#FEF272', lineHeight: 1 }}>{c.n}</div>
                      <div className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 9, color: '#629675', fontWeight: 600, marginTop: 4, letterSpacing: '.03em', textTransform: 'uppercase' }}>{c.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Section heading ── */}
              <p className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.25, letterSpacing: '-.01em', marginBottom: 10 }}>
                Real outcomes. Documented. Across the board.
              </p>

              {/* ── Condition cards — 2-column grid, all visible ── */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {CONDITION_CARDS.map((c, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 14, padding: '14px 12px', backdropFilter: 'blur(12px)' }}>
                    <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 9, color: '#629675', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>{c.name}</p>
                    <p className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 30, fontWeight: 800, color: '#FEF272', lineHeight: 1, letterSpacing: '-.02em' }}>{c.stat}</p>
                    <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4, marginTop: 4 }}>{c.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ── Sticky Continue CTA ── */}
          <div style={{ position: 'sticky', bottom: 0, background: 'linear-gradient(to top, #173B39 80%, transparent)', padding: '24px 24px 20px', zIndex: 10 }}>
            <div style={{ maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
              <button
                onClick={() => { setScreen('q'); setStep(s => s + 1) }}
                className="font-[family-name:var(--font-bricolage)]"
                style={{ width: '100%', background: '#FEF272', color: '#013E37', border: 'none', borderRadius: 9999, fontSize: 16, fontWeight: 700, padding: '15px', cursor: 'pointer' }}
              >
                Continue →
              </button>
              <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 8 }}>Based on documented client outcomes across NewME programs.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── QUESTION SCREEN (profile + questions + contact) ────────────────────────
  if (screen === 'q') {
    const isProfile = step === 0, isDetails = step === TOTAL + 1
    const isMulti = q?.type === 'm'
    const sel = isMulti ? ((ans[q?.id ?? ''] as string[]) || []) : ans[q?.id ?? '']
    const canNext = isMulti ? ((ans[q?.id ?? ''] as string[]) || []).length > 0 : true

    return (
      <div className="min-h-screen" style={{ background: '#173B39', color: '#fff', overflowY: 'auto', position: 'relative' }}>
        <AtmosphereBg />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AssessmentHeader showProgress={true} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 72px)', padding: '32px 24px 48px' }}>
            <AnimatePresence mode="wait" initial={false}>

            {/* PROFILE */}
            {isProfile && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: EASE }}
                style={{ width: '100%', maxWidth: 500 }}
              >
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: '#629675', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>Before we begin</p>
                <h2 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(22px,3.5vw,30px)', fontWeight: 700, lineHeight: 1.25, marginBottom: 6, letterSpacing: '-.015em' }}>A couple of quick things</h2>
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 28, lineHeight: 1.65 }}>We use these to make sure your phase recommendation is specific to you, not a generic result.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label className="font-[family-name:var(--font-urbanist)]" style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginBottom: 8, letterSpacing: '.05em', textTransform: 'uppercase' }}>Date of birth</label>
                    {/* Three plain numeric inputs — Day / Month / Year */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.6fr', gap: 8 }}>
                      <input
                        type="text" inputMode="numeric" maxLength={2} placeholder="DD"
                        value={dobD}
                        onChange={e => {
                          const v = e.target.value.replace(/\D/g,'').slice(0,2)
                          setDobD(v)
                          if (v.length === 2) (e.target.nextElementSibling as HTMLInputElement | null)?.focus()
                          if (v && dobM && dobY) handleDOB(`${dobY}-${dobM.padStart(2,'0')}-${v.padStart(2,'0')}`)
                        }}
                        className="font-[family-name:var(--font-urbanist)]"
                        style={{ ...inputStyle, textAlign: 'center' }}
                      />
                      <input
                        type="text" inputMode="numeric" maxLength={2} placeholder="MM"
                        value={dobM}
                        onChange={e => {
                          const v = e.target.value.replace(/\D/g,'').slice(0,2)
                          setDobM(v)
                          if (v.length === 2) (e.target.nextElementSibling as HTMLInputElement | null)?.focus()
                          if (dobD && v && dobY) handleDOB(`${dobY}-${v.padStart(2,'0')}-${dobD.padStart(2,'0')}`)
                        }}
                        className="font-[family-name:var(--font-urbanist)]"
                        style={{ ...inputStyle, textAlign: 'center' }}
                      />
                      <input
                        type="text" inputMode="numeric" maxLength={4} placeholder="YYYY"
                        value={dobY}
                        onChange={e => {
                          const v = e.target.value.replace(/\D/g,'').slice(0,4)
                          setDobY(v)
                          if (dobD && dobM && v.length === 4) handleDOB(`${v}-${dobM.padStart(2,'0')}-${dobD.padStart(2,'0')}`)
                        }}
                        className="font-[family-name:var(--font-urbanist)]"
                        style={{ ...inputStyle, textAlign: 'center' }}
                      />
                    </div>
                    {dobErr && <p style={{ fontSize: 12, color: '#FF8547', marginTop: 6 }}>{dobErr}</p>}
                  </div>
                  <div>
                    <label className="font-[family-name:var(--font-urbanist)]" style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginBottom: 10, letterSpacing: '.05em', textTransform: 'uppercase' }}>Gender</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[{v:'female',l:'Female'},{v:'male',l:'Male'},{v:'prefer_not',l:'Prefer not to say'}].map(o => (
                        <button key={o.v} onClick={() => setProfile(p => ({ ...p, gender: o.v }))} style={optStyle(profile.gender === o.v)} className="font-[family-name:var(--font-urbanist)]">
                          <div style={radioDot(profile.gender === o.v)} />
                          {o.l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <button disabled={!canAdvanceProfile()} onClick={() => setStep(1)} style={primaryBtn(!canAdvanceProfile())} className="font-[family-name:var(--font-bricolage)]">Continue →</button>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Always private. Never shared.</p>
                </div>
              </motion.div>
            )}

            {/* QUESTION */}
            {!isProfile && !isDetails && q && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: EASE }}
                style={{ width: '100%', maxWidth: 560 }}
              >
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: '#629675', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>{q.hl}</p>
                <h2 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(20px,3.5vw,28px)', fontWeight: 700, lineHeight: 1.3, marginBottom: q.sub ? 8 : 24, letterSpacing: '-.015em' }}>{q.q}</h2>
                {q.sub && <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>{q.sub}</p>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {q.opts.map(o => {
                    const isSel = isMulti ? (sel as string[]).includes(o.v) : sel === o.v
                    return (
                      <button key={o.v} onClick={() => isMulti ? toggleMulti(o.v) : pickSingle(o.v)} style={optStyle(isSel)} className="font-[family-name:var(--font-urbanist)]">
                        <div style={isMulti ? checkDot(isSel) : radioDot(isSel)} />
                        {o.l}
                      </button>
                    )
                  })}
                </div>
                <div style={{ marginTop: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
                  <button onClick={() => setStep(s => s - 1)} style={ghostBtn} className="font-[family-name:var(--font-urbanist)]">← Back</button>
                  {isMulti && <button disabled={!canNext} onClick={advanceMulti} style={primaryBtn(!canNext)} className="font-[family-name:var(--font-bricolage)]">Continue →</button>}
                </div>
              </motion.div>
            )}

            {/* CONTACT DETAILS */}
            {isDetails && (() => {
              const nameOk = info.name.trim().length > 0
              const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)
              const phoneOk = info.phone.trim().length > 0
              const canSubmit = nameOk && emailOk && phoneOk
              const showEmailErr = info.email.length > 0 && !emailOk
              return (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  style={{ width: '100%', maxWidth: 440 }}
                >
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: '#629675', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>Almost there</p>
                  <h2 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 10, letterSpacing: '-.02em' }}>Where should we send your results?</h2>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>Your results are private. We will never share your information.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                    <input className="font-[family-name:var(--font-urbanist)]" placeholder="First name" type="text" value={info.name} onChange={e => setInfo(p => ({ ...p, name: e.target.value }))} style={inputStyle} />
                    <input className="font-[family-name:var(--font-urbanist)]" placeholder="Last name" type="text" value={info.last} onChange={e => setInfo(p => ({ ...p, last: e.target.value }))} style={inputStyle} />
                    <div>
                      <input className="font-[family-name:var(--font-urbanist)]" placeholder="Email address" type="email" value={info.email} onChange={e => setInfo(p => ({ ...p, email: e.target.value }))} style={{ ...inputStyle, borderColor: showEmailErr ? '#FF8547' : 'rgba(255,255,255,0.15)' }} />
                      {showEmailErr && <p style={{ fontSize: 12, color: '#FF8547', marginTop: 5 }}>Please enter a valid email address.</p>}
                    </div>
                    <input className="font-[family-name:var(--font-urbanist)]" placeholder="Phone number" type="tel" value={info.phone} onChange={e => setInfo(p => ({ ...p, phone: e.target.value }))} style={inputStyle} />
                  </div>
                  <button disabled={!canSubmit} onClick={startCalc} style={{ ...primaryBtn(!canSubmit), width: '100%', padding: '16px', fontSize: 16 }} className="font-[family-name:var(--font-bricolage)]">See my phase →</button>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 12 }}>No spam · Unsubscribe anytime</p>
                </motion.div>
              )
            })()}

            </AnimatePresence>
          </div>
        </div>
      </div>
    )
  }

  // ── CALC SCREEN ───────────────────────────────────────────────────────────────
  if (screen === 'calc') return (
    <div className="min-h-screen" style={{ background: '#173B39', color: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <AtmosphereBg />
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AssessmentHeader showProgress={false} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '24px', maxWidth: 360, width: '100%' }}>
            {/* Spinner */}
            <div style={{ width: 52, height: 52, border: '3px solid rgba(254,242,114,0.20)', borderTopColor: '#FEF272', borderRadius: '50%', margin: '0 auto 36px', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <p key={calcIdx} className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 16, color: '#fff', fontWeight: 500, minHeight: 26, marginBottom: 28 }}>{calcMsgs[calcIdx] || ''}</p>
            <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 4, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ height: '100%', background: '#FEF272', borderRadius: 4, width: `${calcPct}%`, transition: 'width .6s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
              {calcMsgs.map((_, i) => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i <= calcIdx ? '#FEF272' : 'rgba(254,242,114,0.25)', transition: 'background .3s' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // ── RESULTS SCREEN ────────────────────────────────────────────────────────────
  if (screen === 'results' && res) {
    const pathway = res.pathway as string
    const pw = PW[pathway]
    const isLong = res.long_dur as boolean
    const name = info.name || 'You'
    const h1 = pw.h1(name, isLong)
    const h2 = pw.h2(isLong)
    const hook = typeof pw.hook === 'function' ? pw.hook(ans) : pw.hook
    const extra = pw.extra ? pw.extra(ans) : null
    const secKey = SEC[pathway], secPW = PW[secKey]
    const secPW_SEC = PW_SEC[secKey]
    const stories = pickStories(pathway, ans, profile.gender)
    const secStories = pickStories(secKey, ans, profile.gender)
    const secHook = typeof secPW.hook === 'function' ? secPW.hook(ans) : secPW.hook
    const stickyCta = secExpanded ? secKey : pathway

    return (
      <div className="min-h-screen" style={{ background: '#173B39', color: '#fff', overflowY: 'auto', position: 'relative' }}>
        <AtmosphereBg />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AssessmentHeader showProgress={false} />
          <div style={{ maxWidth: 640, margin: '0 auto', padding: '36px 20px', paddingBottom: showSticky ? 100 : 56 }}>

            {/* Badge + headline */}
            <div>
              {/* Phase badge */}
              <span className="font-[family-name:var(--font-urbanist)]" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 50, fontSize: 11, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', background: 'rgba(98,150,117,0.20)', color: '#629675', border: '1px solid rgba(98,150,117,0.35)', marginBottom: 24 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#629675' }} />
                {pw.badge}
              </span>
              <h1 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(26px,4.5vw,40px)', fontWeight: 800, lineHeight: 1.18, marginBottom: 6, letterSpacing: '-.025em', color: '#fff' }}>{h1}</h1>
              <h2 className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(16px,2.8vw,22px)', fontWeight: 500, lineHeight: 1.4, color: 'rgba(255,255,255,0.65)', marginBottom: 16, letterSpacing: '-.01em' }}>{h2}</h2>
              <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, color: '#FEF272', fontWeight: 600, marginBottom: extra ? 8 : 20 }}>{hook}</p>
              {extra && <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 20, lineHeight: 1.65 }}>{extra}</p>}

              {/* Context notes */}
              {(res.gut_note as boolean) && (
                <div style={{ background: 'rgba(98,150,117,0.12)', border: '1px solid rgba(98,150,117,0.25)', borderRadius: 12, padding: '12px 16px', marginBottom: 20 }}>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>You mentioned some gut discomfort. If that becomes more central, GI Core may be worth exploring after this phase.</p>
                </div>
              )}
              {(res.gi_dx_labels as string[])?.length > 0 && (
                <div style={{ background: 'rgba(98,150,117,0.12)', border: '1px solid rgba(98,150,117,0.25)', borderRadius: 12, padding: '12px 16px', marginBottom: 20 }}>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>Your {(res.gi_dx_labels as string[]).join(' and ')} diagnosis is central to this phase. The protocol is built around it.</p>
                </div>
              )}
              {(res.meta_dx_labels as string[])?.length > 0 && (
                <div style={{ background: 'rgba(98,150,117,0.12)', border: '1px solid rgba(98,150,117,0.25)', borderRadius: 12, padding: '12px 16px', marginBottom: 20 }}>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>You also have {(res.meta_dx_labels as string[]).join(', ')}. Your GI protocol will account for this alongside your gut treatment.</p>
                </div>
              )}
              {(res.dx_labels_metabolic as string[])?.length > 0 && !['GI_Core','GI_Advanced'].includes(pathway) && (
                <div style={{ background: 'rgba(98,150,117,0.12)', border: '1px solid rgba(98,150,117,0.25)', borderRadius: 12, padding: '12px 16px', marginBottom: 20 }}>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>Your {(res.dx_labels_metabolic as string[]).join(', ')} {(res.dx_labels_metabolic as string[]).length > 1 ? 'diagnoses are' : 'diagnosis is'} factored into your protocol from day one.</p>
                </div>
              )}

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {pw.tags.map((t, i) => (
                  <span key={i} className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: '#629675', background: 'rgba(98,150,117,0.14)', border: '1px solid rgba(98,150,117,0.30)', borderRadius: 50, padding: '5px 13px', fontWeight: 500 }}>{t}</span>
                ))}
              </div>

              {/* Testimonials */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                {stories.map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 14, padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'center', backdropFilter: 'blur(12px)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(98,150,117,0.25)', border: '1.5px solid rgba(98,150,117,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#629675', flexShrink: 0 }}>{s.n[0]}</div>
                    <div>
                      <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 4, fontWeight: 600, letterSpacing: '.03em' }}>{s.n}, {s.a} · {s.c}</p>
                      <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>&ldquo;{s.q}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* OPTIONS */}
            <div style={{ opacity: bodyVisible ? 1 : 0, transition: 'opacity .5s' }}>
              <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Your options</p>

              {/* Primary */}
              <div ref={pricingRef} style={{ position: 'relative', border: `2px solid ${selectedPhase === pathway ? '#FEF272' : 'rgba(254,242,114,0.40)'}`, borderRadius: 16, padding: '20px 22px', background: selectedPhase === pathway ? 'rgba(254,242,114,0.10)' : 'rgba(254,242,114,0.06)', marginBottom: 10, transition: 'all .25s' }}>
                <span className="font-[family-name:var(--font-urbanist)]" style={{ position: 'absolute', top: -11, left: 20, background: selectedPhase === pathway ? '#FEF272' : '#013E37', color: selectedPhase === pathway ? '#013E37' : '#FEF272', border: '1px solid rgba(254,242,114,0.4)', fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 12px', borderRadius: 50 }}>
                  {selectedPhase === pathway ? '✓ SELECTED' : 'RECOMMENDED FOR YOU'}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <p className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{pw.badge.split(' · ')[0]}</p>
                    <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{PRICING[pathway]?.sub}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ textAlign: 'right' }}>
                      <p className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 22, fontWeight: 800, color: '#FEF272', lineHeight: 1 }}>{PRICING[pathway]?.main}</p>
                      <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, fontWeight: 600, color: 'rgba(254,242,114,0.7)', marginTop: 3 }}>{PRICING[pathway]?.day}</p>
                    </div>
                    <button onClick={() => trackSelectedPhase(pathway)} className="font-[family-name:var(--font-bricolage)]" style={{ background: '#FEF272', color: '#013E37', fontWeight: 700, padding: '12px 22px', borderRadius: 50, fontSize: 14, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>Start now →</button>
                  </div>
                </div>
              </div>

              {/* Secondary accordion */}
              {secPW && (
                <div style={{ border: `${selectedPhase === secKey ? '2px solid rgba(254,242,114,0.5)' : '1px solid rgba(255,255,255,0.12)'}`, borderRadius: 16, background: selectedPhase === secKey ? 'rgba(254,242,114,0.06)' : 'rgba(255,255,255,0.04)', overflow: 'hidden', marginBottom: 10, transition: 'all .25s', backdropFilter: 'blur(12px)' }}>
                  <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, cursor: 'pointer' }} onClick={() => setSecExpanded(e => !e)}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                        <p className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{secPW.badge.split(' · ')[0]}</p>
                        {selectedPhase === secKey && <span className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', background: 'rgba(254,242,114,0.15)', color: '#FEF272', borderRadius: 50, padding: '3px 10px' }}>✓ Selected</span>}
                        {selectedPhase !== secKey && <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{PRICING[secKey]?.sub}</p>}
                      </div>
                      <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{SEC_COPY[pathway]}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
                      <div style={{ textAlign: 'right' }}>
                        <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1 }}>{PRICING[secKey]?.main}</p>
                        <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{PRICING[secKey]?.day}</p>
                      </div>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'rgba(255,255,255,0.55)', flexShrink: 0, transition: 'transform .2s', transform: secExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>↑</div>
                    </div>
                  </div>
                  {secExpanded && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', padding: '20px 22px' }}>
                      <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, color: '#629675', fontWeight: 600, marginBottom: 16, lineHeight: 1.6 }}>{secHook}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                        {secPW.tags.map((t: string, i: number) => (
                          <span key={i} className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: '#629675', background: 'rgba(98,150,117,0.14)', border: '1px solid rgba(98,150,117,0.30)', borderRadius: 50, padding: '5px 13px', fontWeight: 500 }}>{t}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                        {secPW.bullets.map((b: string, i: number) => (
                          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#629675', flexShrink: 0, marginTop: 8 }} />
                            <span className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>{b}</span>
                          </div>
                        ))}
                      </div>
                      {secStories.slice(0,1).map((s, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(98,150,117,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#629675', flexShrink: 0 }}>{s.n[0]}</div>
                          <div>
                            <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 3, fontWeight: 600 }}>{s.n}, {s.a} · {s.c}</p>
                            <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>&ldquo;{s.q}&rdquo;</p>
                          </div>
                        </div>
                      ))}
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                        <div>
                          <p className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{secPW.badge.split(' · ')[0]}</p>
                          <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{PRICING[secKey]?.main} · {PRICING[secKey]?.day}</p>
                        </div>
                        <button onClick={() => trackSelectedPhase(secKey)} className="font-[family-name:var(--font-bricolage)]" style={{ background: '#FEF272', color: '#013E37', fontWeight: 700, padding: '12px 22px', borderRadius: 50, fontSize: 14, border: 'none', cursor: 'pointer' }}>Start now →</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* After your phase */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 28, marginTop: 12 }}>
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>After your phase</p>
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: 20 }}>Results don&apos;t end when the phase does. Two pathways keep you on track long-term.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { icon:'360', name:'NewME 360', desc:"The phase ends. The accountability doesn't. Monthly coach calls, weekly habit reviews and relapse prevention, maintenance-level support so what you built stays built." },
                    { icon:'M',   name:'NewME Movement', desc:'Your health is in a good place. Now keep moving. Live sessions, strength and mobility programming, a recorded library and a community, no lifestyle coaching, just structured progressive fitness.' },
                  ].map(p => (
                    <div key={p.name} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 14, padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start', backdropFilter: 'blur(12px)' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(98,150,117,0.18)', border: '1.5px solid rgba(98,150,117,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#629675', flexShrink: 0 }}>{p.icon}</div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                          <span className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{p.name}</span>
                          <span className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>3 or 12 months</span>
                          <span className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: '#629675', background: 'rgba(98,150,117,0.14)', border: '1px solid rgba(98,150,117,0.30)', borderRadius: 50, padding: '3px 10px' }}>Unlocks on completion</span>
                        </div>
                        <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky CTA */}
          {showSticky && (
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(23,59,57,0.95)', borderTop: '1px solid rgba(254,242,114,0.15)', backdropFilter: 'blur(16px)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, zIndex: 50 }}>
              <div>
                <p className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{PW[stickyCta].badge.split(' · ')[0]}</p>
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{PRICING[stickyCta]?.main} · {PRICING[stickyCta]?.day}</p>
              </div>
              <button onClick={() => trackSelectedPhase(stickyCta)} className="font-[family-name:var(--font-bricolage)]" style={{ background: '#FEF272', color: '#013E37', fontWeight: 700, padding: '12px 24px', borderRadius: 50, fontSize: 14, border: 'none', cursor: 'pointer' }}>Start now →</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── PHASE DETAIL ──────────────────────────────────────────────────────────────
  if (screen === 'phase_detail' && detailKey) {
    const pw = PW[detailKey]
    const pwSec = PW_SEC[detailKey]
    const isRec = detailKey === (res?.pathway as string)
    const name = info.name || 'You'
    const h1 = isRec ? pw.h1(name, res?.long_dur as boolean) : pwSec.h1
    const h2 = isRec ? pw.h2(res?.long_dur as boolean) : pwSec.h2
    const hook = isRec ? (typeof pw.hook === 'function' ? pw.hook(ans) : pw.hook) : pwSec.hook
    const extra = isRec && pw.extra ? pw.extra(ans) : null
    const stories = pickStories(detailKey, ans, profile.gender)
    return (
      <div className="min-h-screen" style={{ background: '#173B39', color: '#fff', overflowY: 'auto', position: 'relative' }}>
        <AtmosphereBg />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AssessmentHeader showProgress={false} />
          <div style={{ maxWidth: 640, margin: '0 auto', padding: '36px 20px 80px' }}>
            <button onClick={() => { setScreen('results'); setDetailKey(null) }} className="font-[family-name:var(--font-urbanist)]" style={{ ...ghostBtn, marginBottom: 28 }}>← Back to my results</button>
            <span className="font-[family-name:var(--font-urbanist)]" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 50, fontSize: 11, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', background: 'rgba(98,150,117,0.20)', color: '#629675', border: '1px solid rgba(98,150,117,0.35)', marginBottom: 24 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#629675' }} />{pw.badge}</span>
            <h1 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(26px,4.5vw,40px)', fontWeight: 800, lineHeight: 1.18, marginBottom: 6, letterSpacing: '-.025em', color: '#fff' }}>{h1}</h1>
            <h2 className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(16px,2.8vw,22px)', fontWeight: 500, lineHeight: 1.4, color: 'rgba(255,255,255,0.65)', marginBottom: 16 }}>{h2}</h2>
            <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, color: '#FEF272', fontWeight: 600, marginBottom: extra ? 8 : 20 }}>{hook}</p>
            {extra && <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 20, lineHeight: 1.65 }}>{extra}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {pw.tags.map((t: string, i: number) => <span key={i} className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: '#629675', background: 'rgba(98,150,117,0.14)', border: '1px solid rgba(98,150,117,0.30)', borderRadius: 50, padding: '5px 13px', fontWeight: 500 }}>{t}</span>)}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 16, padding: '20px 22px', marginBottom: 24 }}>
              <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 14 }}>What's included</p>
              {pw.bullets.map((b: string, i: number) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: i < pw.bullets.length - 1 ? 12 : 0 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#629675', flexShrink: 0, marginTop: 8 }} />
                  <span className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>{b}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {stories.map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(98,150,117,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#629675', flexShrink: 0 }}>{s.n[0]}</div>
                  <div>
                    <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 4, fontWeight: 600 }}>{s.n}, {s.a} · {s.c}</p>
                    <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>&ldquo;{s.q}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ position: 'relative', border: '2px solid rgba(254,242,114,0.40)', borderRadius: 16, padding: '22px', background: 'rgba(254,242,114,0.06)' }}>
              {isRec && <span className="font-[family-name:var(--font-urbanist)]" style={{ position: 'absolute', top: -11, left: 20, background: '#013E37', color: '#FEF272', border: '1px solid rgba(254,242,114,0.4)', fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 12px', borderRadius: 50 }}>RECOMMENDED FOR YOU</span>}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
                <div>
                  <p className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{pw.badge.split(' · ')[0]}</p>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{PRICING[detailKey]?.sub}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <div style={{ textAlign: 'right' }}>
                    <p className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 22, fontWeight: 800, color: '#FEF272', lineHeight: 1 }}>{PRICING[detailKey]?.main}</p>
                    <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, fontWeight: 600, color: 'rgba(254,242,114,0.7)', marginTop: 3 }}>{PRICING[detailKey]?.day}</p>
                  </div>
                  <button onClick={() => trackSelectedPhase(detailKey)} className="font-[family-name:var(--font-bricolage)]" style={{ background: '#FEF272', color: '#013E37', fontWeight: 700, padding: '12px 22px', borderRadius: 50, fontSize: 14, border: 'none', cursor: 'pointer' }}>Start now →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

// ── Shared style helpers (outside component to avoid re-creation) ─────────────
const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1.5px solid rgba(255,255,255,0.15)',
  color: '#fff',
  padding: '14px 18px',
  borderRadius: 10,
  fontSize: 15,
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  transition: 'border-color .2s',
}
function optStyle(selected: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '14px 18px',
    borderRadius: 12,
    border: selected ? '1.5px solid #FEF272' : '1.5px solid rgba(255,255,255,0.12)',
    background: selected ? 'rgba(254,242,114,0.10)' : 'rgba(255,255,255,0.04)',
    color: '#fff',
    fontSize: 15,
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all .17s',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontFamily: 'inherit',
    lineHeight: 1.4,
    boxSizing: 'border-box',
    backdropFilter: 'blur(8px)',
  }
}
function radioDot(selected: boolean): React.CSSProperties {
  return {
    width: 18, height: 18, borderRadius: '50%',
    border: `2px solid ${selected ? '#FEF272' : 'rgba(255,255,255,0.25)'}`,
    background: selected ? 'rgba(254,242,114,0.15)' : 'transparent',
    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all .15s',
    ...(selected ? { boxShadow: '0 0 0 3px rgba(254,242,114,0.15)' } : {}),
  }
}
function checkDot(selected: boolean): React.CSSProperties {
  return {
    width: 18, height: 18, borderRadius: 4,
    border: `2px solid ${selected ? '#FEF272' : 'rgba(255,255,255,0.25)'}`,
    background: selected ? 'rgba(254,242,114,0.15)' : 'transparent',
    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all .15s',
  }
}
function primaryBtn(disabled: boolean): React.CSSProperties {
  return {
    background: disabled ? 'rgba(254,242,114,0.35)' : '#FEF272',
    color: '#013E37',
    border: 'none',
    borderRadius: 9999,
    fontWeight: 700,
    padding: '14px 32px',
    fontSize: 15,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '.01em',
    transition: 'all .2s',
  }
}
const ghostBtn: React.CSSProperties = {
  background: 'transparent',
  border: '1.5px solid rgba(255,255,255,0.20)',
  color: 'rgba(255,255,255,0.65)',
  padding: '11px 22px',
  borderRadius: 9999,
  cursor: 'pointer',
  fontSize: 13,
  transition: 'all .18s',
  fontFamily: 'inherit',
}

// ── Background atmosphere component ──────────────────────────────────────────
function AtmosphereBg() {
  const NOISE_SVG = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"
  const MASK = 'radial-gradient(closest-side, black 0%, black 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.2) 92%, transparent 100%)'
  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {/* Dark-to-mid top gradient — mirrors the home page's pine-deep header wash */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #013E37 0%, rgba(1,62,55,0.55) 28%, transparent 55%)',
        pointerEvents: 'none',
      }} />
      {/* Green atmospheric wash — large soft ellipse, slightly off-centre right */}
      <div style={{
        position: 'absolute', width: '220vw', height: '220vw',
        left: '15%', top: '-60vw',
        background: 'linear-gradient(180deg, #629675 0%, #013E37 100%)',
        borderRadius: '50%',
        filter: 'blur(clamp(180px, 22vw, 320px))',
        opacity: 0.38,
        maskImage: MASK,
        WebkitMaskImage: MASK,
      }} />
      {/* Noise overlay on green wash */}
      <div style={{
        position: 'absolute', width: '220vw', height: '220vw',
        left: '15%', top: '-60vw',
        borderRadius: '50%',
        backgroundImage: NOISE_SVG,
        backgroundSize: '220px 220px',
        mixBlendMode: 'soft-light',
        opacity: 0.35,
        maskImage: 'radial-gradient(closest-side, black 0%, black 65%, rgba(0,0,0,0.6) 82%, rgba(0,0,0,0.25) 92%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(closest-side, black 0%, black 65%, rgba(0,0,0,0.6) 82%, rgba(0,0,0,0.25) 92%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      {/* Single gold glow — right side, matches home page's side accent */}
      <div style={{
        position: 'absolute', width: 'clamp(280px, 50vw, 720px)', height: 'clamp(280px, 50vw, 720px)',
        right: 'clamp(-220px, -14vw, -90px)', top: '12%',
        background: '#FEF272', borderRadius: '50%',
        filter: 'blur(clamp(130px, 16vw, 240px))',
        opacity: 0.30,
      }} />
    </div>
  )
}
