export const PERSONALISATION = [
  {id:"q1_aspiration",type:"s",hl:"Let's start somewhere real.",q:"What would feeling your best actually look like?",sub:"Select the one that resonates most.",opts:[
    {v:"energy",l:"Feeling energetic throughout the day"},
    {v:"eating",l:"Eating freely. No heartburn, no abdominal pain, no gas or bloating"},
    {v:"skin",l:"Waking up with clear skin, no breakouts, no overnight inflammation"},
    {v:"body",l:"A body that feels light, clear and ready, not stiff or foggy"},
    {v:"planning",l:"Planning my week without building it around my symptoms"},
    {v:"confidence",l:"My cholesterol improving through lifestyle, not medication"},
  ]},
  {id:"q2_food",type:"s",hl:"Food tells us a lot.",q:"What's your relationship with food like right now?",opts:[
    {v:"chaotic",l:"Chaotic, no real rhythm or pattern"},
    {v:"no_response",l:"I eat well but my body doesn't respond"},
    {v:"restricted",l:"I think I follow diet rules but they feel restrictive"},
    {v:"symptoms",l:"Eating causes symptoms: pain, bloating, reactions"},
    {v:"stable",l:"Pretty stable, food isn't the main issue"},
  ]},
  {id:"q3_sleep",type:"s",hl:"Sleep is data.",q:"How would you describe your sleep right now?",opts:[
    {v:"fragmented",l:"I fall asleep fine but wake multiple times"},
    {v:"onset",l:"I struggle to fall asleep and stay asleep"},
    {v:"unrestorative",l:"I sleep 7+ hours but never feel rested"},
    {v:"fine",l:"Sleep isn't an issue for me"},
  ]},
  {id:"q4_stress",type:"s",hl:"Be honest with yourself.",q:"Stress, where are you with it?",opts:[
    {v:"high",l:"High, it doesn't stop"},
    {v:"moderate",l:"Moderate, manageable but always there"},
    {v:"low",l:"Low, stress isn't a major factor for me"},
    {v:"physical",l:"I cope, but it hits my body more than my mind"},
  ]},
  {id:"q5_attempts",type:"s",hl:"You've probably tried things before.",q:"What have you tried before?",opts:[
    {v:"first_time",l:"This is my first time trying anything structured"},
    {v:"little",l:"A little, nothing really structured"},
    {v:"some_progress",l:"I've made some progress but can't seem to sustain it"},
    {v:"nothing_held",l:"Different diets, multiple doctors. Nothing has helped."},
  ]},
];

export const ROUTING = [
  {id:"r1_track",type:"s",hl:"Let's get specific.",q:"What's the main thing you want to address?",opts:[
    {v:"metabolic",l:"My weight, energy, hormones, blood pressure or glucose levels"},
    {v:"gut",l:"My gut: digestion, bloating, reactions to food"},
    {v:"both",l:"Both,not but my gut symptoms are most disruptive"},
    {v:"unsure",l:"I'm not sure yet"},
  ]},
  {id:"r2_symptoms",type:"m",hl:"Your body is communicating.",q:"What does your body do that it really shouldn't?",sub:"Select up to 5, even things you've learned to live with.",max:5,opts:[
    {v:"fatigue",l:"Fatigue or energy crashes"},
    {v:"brain_fog",l:"Brain fog or difficulty concentrating"},
    {v:"bloating",l:"Bloating or digestive discomfort"},
    {v:"weight_gain",l:"Unexplained weight gain"},
    {v:"periods",l:"Irregular or painful periods"},
    {v:"skin",l:"Skin flares, acne or rashes"},
    {v:"joints",l:"Joint pain or stiffness"},
    {v:"mood",l:"Mood swings or anxiety"},
    {v:"none",l:"None of these",excl:true},
  ]},
  {id:"r3_diagnoses",type:"m",hl:"Context matters here.",q:"Has anything been formally diagnosed?",sub:"Select everything that applies.",opts:[
    {v:"obesity",l:"Obesity"},
    {v:"pcos",l:"PCOS or hormonal imbalance"},
    {v:"thyroid",l:"Thyroid condition"},
    {v:"diabetes",l:"Type 2 diabetes or pre-diabetes"},
    {v:"cholesterol",l:"High cholesterol or blood pressure"},
    {v:"ibs",l:"IBS, GERD, gastritis or acid reflux"},
    {v:"ibd",l:"Crohn's or Ulcerative Colitis"},
    {v:"fatty_liver",l:"Fatty liver"},
    {v:"autoimmune",l:"Autoimmune condition (e.g. Hashimoto's, Rheumatoid Arthritis)"},
    {v:"none",l:"Nothing diagnosed",excl:true},
  ]},
  {id:"r5_duration",type:"s",hl:"Time is a signal.",q:"How long has this been going on?",sub:"Be as honest as you can.",opts:[
    {v:"lt6m",l:"Less than 6 months"},
    {v:"6m_1y",l:"6 months to a year"},
    {v:"1_3y",l:"1 to 3 years"},
    {v:"3_5y",l:"3 to 5 years"},
    {v:"gt5y",l:"More than 5 years"},
  ]},
  {id:"r4_medication",type:"s",hl:"A quick one.",q:"Are you currently taking any medication?",opts:[
    {v:"gut_med",l:"Yes, for a gut or digestive condition"},
    {v:"hormonal_med",l:"Yes, for hormones or metabolism"},
    {v:"multiple_med",l:"Yes, for multiple conditions"},
    {v:"was_on",l:"I was, but I'm not anymore"},
    {v:"none",l:"No medication"},
  ]},
];

export const ALL_Q = [...PERSONALISATION, ...ROUTING];
export const TOTAL = ALL_Q.length;
export const R3_STEP = 8;
