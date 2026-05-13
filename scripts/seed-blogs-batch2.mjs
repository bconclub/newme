/**
 * seed-blogs-batch2.mjs
 * Adds 3 new blog posts to Sanity, matching the pattern set by
 * scripts/seed-blogs.mjs:
 *   1. Constipation remedies — how to relieve constipation on the toilet
 *   2. How to calculate maintenance calories (BMR + TDEE)
 *   3. SIBO symptoms — 10 warning signs
 *
 * All three are authored by Dr. Pal (already seeded). Uses
 * createOrReplace so the script is idempotent — running it twice is safe.
 *
 * Run:
 *   node scripts/seed-blogs-batch2.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local manually (same pattern as the original seed script).
const envPath = resolve(__dirname, '..', '.env.local')
const envLines = readFileSync(envPath, 'utf-8').split('\n')
for (const line of envLines) {
  const [k, ...rest] = line.split('=')
  if (k && rest.length) process.env[k.trim()] = rest.join('=').trim()
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2024-10-01'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
if (!token) throw new Error('Missing SANITY_API_WRITE_TOKEN in .env.local')

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

// ── Portable Text helpers (identical to seed-blogs.mjs) ──────────────────────
let _k = 0
const key = () => `k${++_k}`

const block = (style, children, listItem, level) => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [],
  ...(listItem ? { listItem, level: level || 1 } : {}),
  children,
})

const span = (text, marks = []) => ({ _type: 'span', _key: key(), text, marks })

const para = (...spans) => block('normal', spans.map(s => typeof s === 'string' ? span(s) : s))
const h2 = (text) => block('h2', [span(text)])
const h3 = (text) => block('h3', [span(text)])
const bullet = (...spans) => block('normal', spans.map(s => typeof s === 'string' ? span(s) : s), 'bullet', 1)
const bold = (text) => span(text, ['strong'])
const em = (text) => span(text, ['em'])

const AUTHOR_ID = 'author-dr-pal'

// ─────────────────────────────────────────────────────────────────────────────
// Blog 1 — Constipation Remedies
// Source: "3. How to relieve constipation on the toilet immediately.docx"
// ─────────────────────────────────────────────────────────────────────────────
const blog1Body = [
  para(
    "Ever felt the need to go to the toilet, but when you do, nothing comes out? Many clients come to me saying, ",
    em("I sit on the toilet for too long but nothing happens"),
    ". If you've ever felt this way, you're not alone."
  ),
  para(
    "Constipation can be frustrating, stressful, and uncomfortable, but what happens on the toilet is just a reflection of what's happening in your daily nutrition and lifestyle habits. The right ",
    bold("constipation remedies"),
    " can not only provide relief but also address the root cause for long-term digestive health. As a clinical health coach, let me break it down for you."
  ),

  h2("Some Common Signs of Constipation"),
  para("Most people think constipation is just irregular bowel movements, but constipation is also:"),
  bullet("Sitting on the toilet for more than 10 minutes without any result — a common sign your gut needs support."),
  bullet("Straining hard but still feeling incomplete evacuation — often a sign of poor digestion."),
  bullet("Hard and dry stools that are painful to pass."),
  bullet("Passing stool only once every 2–3 days — one of the most overlooked signs."),
  para(
    "Over time, this becomes a pattern, and by the time you recognise it, your body has already adapted to the discomfort — making it even more important to address it early with the right ",
    bold("constipation remedy"),
    " and lifestyle changes."
  ),

  h2("Common Causes of Constipation and Irregular Bowel Movements"),
  para("Constipation doesn't happen randomly — it's your body responding to a pattern it has studied over time. The most common driving factors are:"),

  h3("Low fibre intake"),
  para("If your meals lack fruits, vegetables and whole grains, stools become hard and difficult to pass because there isn't enough bulk to keep them soft and moist. Fibre adds bulk and softness, making it one of the most essential foundations for constipation relief."),

  h3("Low water intake"),
  para("Fibre needs water to work. Without water, stools become hard and dry. Proper hydration is key to long-term constipation relief."),

  h3("Low gut motility"),
  para("The human body thrives on routine and predictability. Skipping meals or sitting at a desk all day disrupts your body's natural signalling."),

  h3("Gut-brain connection"),
  para("Your gut is often called your second brain. When the mind is stressed, the body enters survival mode and digestion gets sidelined — leading to delayed bowel movements."),

  h3("Ignoring the natural urge"),
  para("Every time you ignore the urge to poop, you weaken that signal — and over time, make constipation worse and harder to fix, even with constipation remedies."),

  h2("Common Mistakes I See as a Clinical Health Coach"),
  bullet("Suddenly increasing fibre intake — can worsen constipation rather than provide relief."),
  bullet("Drinking very little water or gulping down a lot of water all at once."),
  bullet("Relying only on quick constipation remedies without fixing the root cause."),
  bullet("Skipping meals."),
  bullet("Overusing laxatives."),
  para("Constipation isn't fixed by one superfood. Real constipation relief comes with consistency."),

  h2("Natural Constipation Remedies and Lifestyle Changes"),

  h3("Build balanced meals"),
  para(
    "Each meal should include fibre (vegetables, fruits, whole grains). Instead of just rice and curry, aim for a plate with rice, a bowl of dal, a generous serving of sabzi, some salad like cucumber or carrot, and a little curd. This balance provides ",
    bold("fibre for bulk"),
    ", ",
    bold("water content for softness"),
    ", and ",
    bold("fats for smooth passage"),
    " — making bowel movements easier and more regular over time."
  ),

  h3("Hydration is crucial"),
  para("Water acts as a lubricant of the gut. Your gut cannot function without water, and without proper water intake, constipation remedies will not work."),
  bullet("Start your day with a glass of warm water."),
  bullet("Keep a water bottle with you at all times."),
  bullet("Sip on water throughout the day."),

  h3("Natural laxative foods"),
  para("Foods naturally high in fibre, sugar alcohols, and magnesium can help. Sources include prunes, kiwi, papaya, soaked raisins, leafy greens, nuts & seeds, whole grains, oatmeal, cooked vegetables, berries, pears, apple, and lentils & pulses."),

  h3("Meal timings"),
  para(
    "Eating at consistent times every day — especially breakfast — activates the ",
    bold("gastrocolic reflex"),
    ", which signals your intestines to move and helps trigger a bowel movement. If you skip meals or eat at random times, this rhythm gets disrupted."
  ),

  h3("Daily movement"),
  para("Your intestines are muscles, and when you move, they move too. A sedentary lifestyle can lead to stools sitting in your colon for too long. Even a gentle walk, yoga, or daily chores can help stimulate movement."),

  h2("Natural Laxative Foods — How They Actually Work"),

  h3("Prunes (dried plums)"),
  para(
    bold("Power ingredients: "),
    "Sorbitol, insoluble fibre, phenolic compounds. Sorbitol is a sugar alcohol that acts as an osmotic laxative, pulling water into the intestines to soften stool. The fibre adds bulk."
  ),

  h3("Chia seeds"),
  para(
    bold("Power ingredient: "),
    "Soluble fibre. When mixed with water, chia seeds form a thick, gelatinous substance in the gut, softening stool and making it easier to pass."
  ),

  h3("Apples & pears"),
  para(
    bold("Power ingredients: "),
    "Pectin, sorbitol, fructose. Pectin is a soluble fibre that accelerates stool movement. The natural sugars draw in water."
  ),

  h3("Flaxseeds"),
  para(
    bold("Power ingredients: "),
    "Soluble & insoluble fibre, omega-3 fatty acids. The fibres add bulk and weight to stool, while the natural oils help lubricate the digestive tract."
  ),

  h3("Kiwifruit"),
  para(
    bold("Power ingredients: "),
    "Actinidin, fibre. Actinidin is an enzyme unique to kiwifruit that stimulates receptors in the colon, promoting muscle contractions and regular bowel movements."
  ),

  h3("Leafy greens (spinach, kale)"),
  para(
    bold("Power ingredients: "),
    "Magnesium, insoluble fibre. Magnesium draws water into the intestines, acting as a natural osmotic laxative."
  ),

  h3("Coffee"),
  para(
    bold("Power ingredients: "),
    "Caffeine, chlorogenic acid. Stimulates the release of gastrin, a hormone that triggers muscle contractions in the colon."
  ),

  h3("Oat bran / oatmeal"),
  para(
    bold("Power ingredient: "),
    "Beta-glucan. A highly viscous soluble fibre that absorbs water, adding significant bulk and moisture to stool."
  ),

  h3("Papaya"),
  para(
    bold("Power ingredients: "),
    "Papain, high water content. Papain is an enzyme that aids digestion, while the water and fibre content help keep waste moving."
  ),

  h3("Sweet potatoes"),
  para(
    bold("Power ingredients: "),
    "Insoluble fibre (cellulose, lignin, pectin). Contains a high amount of insoluble fibre, which adds weight and bulk to stool."
  ),

  h3("Aloe vera juice"),
  para(
    bold("Power ingredient: "),
    "Anthraquinones. Compounds with a powerful stimulant laxative effect, increasing intestinal water content and stimulating mucus secretion."
  ),

  h2("What Helps in the Moment (On the Toilet)"),
  bullet(
    bold("Position: "),
    "Raise your feet using a stool (knees aligned with hips) and lean forward — one of the simplest yet most effective constipation remedies."
  ),
  bullet(
    bold("Belly breathing: "),
    "Inhale deeply into your stomach and exhale through your mouth slowly while gently pushing. This relaxes the pelvic muscles and reduces straining."
  ),
  bullet(
    bold("Time: "),
    "Do not spend more than 10 minutes on the toilet. If nothing happens, get up — forcing creates more tension."
  ),

  h2("A Real Client Story"),
  para("I had a client who struggled with constipation for several years. She had tried supplements and home remedies — basically everything. But her routine looked like:"),
  bullet("Irregular meals."),
  bullet("Improper hydration."),
  bullet("Long sitting hours without movement."),
  bullet("Very low fibre intake."),
  bullet("Chronic stress."),
  para("She was already overwhelmed, so we kept it simple:"),
  bullet("Warm water first thing in the morning."),
  bullet("Consistent meal timings."),
  bullet("A small bowl of veggies and a fruit + nuts and seeds in her daily diet."),
  bullet("Encouraged daily movement."),
  bullet("A water bottle with her at all times."),
  bullet("Breathwork techniques to help with stress."),
  para("Sounds basic, right? But within a few days, she felt lighter. Within a few weeks, her bowel movements became regular — real, lasting constipation relief without relying on temporary fixes."),
  para("That's the power of getting the basics right. Your body is not broken — it's simply responding to habits. Fix those, and your digestion will follow naturally."),
]

// ─────────────────────────────────────────────────────────────────────────────
// Blog 2 — How to Calculate Maintenance Calories
// Source: "4. How to calculate maintenance calories.docx"
// ─────────────────────────────────────────────────────────────────────────────
const blog2Body = [
  para(
    "How many calories should I eat? If you're trying to maintain, lose, or gain weight, you've probably asked yourself this question at least once. As a clinical health coach, it's easily the most common question I get asked. But honestly, ",
    bold("that's the wrong question to ask"),
    "."
  ),
  para("The right question is: how many calories do I need to maintain my current weight? In other words — what are my maintenance calories?"),

  para("Most of the time, people are either:"),
  bullet("Eating too much or too little."),
  bullet("Eating healthy but still gaining weight."),
  bullet("Randomly following 900, 1200, or 1500 kcal targets from Instagram or YouTube."),
  bullet("Sometimes all of the above."),
  para("And when we dig deeper, the issue is simple: they don't know their maintenance calories."),

  h2("What Are Maintenance Calories?"),
  para("Maintenance calories are the number of calories your body needs to:"),
  bullet("Keep your weight stable."),
  bullet("Function consistently."),
  bullet("Support daily activity."),
  para(
    "This is also known as your daily calorie needs or ",
    bold("TDEE (Total Daily Energy Expenditure)"),
    ". It includes breathing, digestion, circulation, cell production — plus walking, working, exercising, and other daily activity."
  ),
  para(
    "The basic energy requirement (breathing, digestion, organs working) is called the ",
    bold("Basal Metabolic Rate (BMR)"),
    ". Add your daily activity on top, and you get your TDEE — your maintenance calories."
  ),

  para("Once you know your maintenance calories:"),
  bullet(bold("Eat below "), "your maintenance intake → you lose weight."),
  bullet(bold("Eat above "), "your maintenance intake → you gain weight."),
  bullet(bold("Eat around "), "your maintenance intake → you maintain your weight."),

  h2("Step 1: Calculate Your Basal Metabolic Rate (BMR)"),
  para("BMR is the number of calories your body needs just to stay alive. The most commonly used formulas are:"),

  h3("For women"),
  para(bold("BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age in years) − 161")),

  h3("For men"),
  para(bold("BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age in years) + 5")),

  para("This gives your baseline calories at rest. To fully calculate maintenance calories (TDEE), we still need to factor in your daily activity level — that's Step 2."),

  h2("Step 2: Apply Your Activity Factor to Find TDEE"),
  para(
    bold("Maintenance calories (TDEE) = BMR × activity factor")
  ),
  para("How to choose the activity factor:"),
  bullet(bold("Sedentary "), "(very little movement) → 1.2"),
  bullet(bold("Lightly active "), "(sports/exercise 1–3 days a week) → 1.375"),
  bullet(bold("Moderately active "), "(sports/exercise 3–5 days a week) → 1.55"),
  bullet(bold("Very active "), "(sports/exercise 6–7 days a week) → 1.725"),
  bullet(bold("Extremely active "), "(sports/exercise 2× a day, 7 days a week) → 1.9"),

  h3("Example"),
  para("A 32-year-old woman, 170 cm tall, 65 kg, with a desk job (sedentary), has a BMR of 1670 calories."),
  para(bold("Maintenance calories (TDEE) = 1670 × 1.2 = 2004 calories/day")),
  para("These are her estimated maintenance calories — roughly how much she should eat to maintain her current weight."),

  h2("This Is an Estimate, Not an Exact Number"),
  para("Most people don't realise this. Your actual maintenance calories can vary depending on:"),
  bullet("Daily movement (walking, chores)."),
  bullet("Muscle mass."),
  bullet("Hormones."),
  bullet("Stress levels."),
  para("Even people with similar stats can differ by 200–300 calories in their TDEE. So don't stop at the calculation — refine it."),

  para("Here's what I tell my clients:"),
  bullet("Use the number as a baseline, not a fixed rule."),
  bullet("Eat around your maintenance calories and track for 2–3 weeks. If your weight stays the same, you've found it."),
  bullet("If weight increases → decrease slightly. If weight decreases → increase slightly."),
  bullet("Your body doesn't respond to formulas — it responds to habits. Adjust around activity changes, routine shifts, workout intensity, etc."),

  h2("A Real Client Example"),
  para("I had a client who was eating 1200 calories every day because she thought it would help her lose weight faster. Instead, she felt:"),
  bullet("Tired."),
  bullet("Poor digestion."),
  bullet("Weight loss stalled."),
  para("When we calculated her maintenance calories, her TDEE was around 1900. We increased her intake gradually, closer to maintenance, and:"),
  bullet("Energy improved."),
  bullet("Digestion improved."),
  bullet("Fat loss actually started."),
  para("This is why understanding your maintenance calories is powerful."),

  h2("Final Takeaway"),
  para("If you're confused about your maintenance calories, start here:"),
  bullet("Calculate your BMR."),
  bullet("Adjust to your activity."),
  bullet("Track and refine."),
  para("Your body is not trying to betray you — it just wants enough fuel to function properly. Once you understand and apply your maintenance intake, everything from weight loss to energy levels becomes much easier and more sustainable."),
]

// ─────────────────────────────────────────────────────────────────────────────
// Blog 3 — SIBO Symptoms
// Source: "5. SIBO symptoms .docx"
// ─────────────────────────────────────────────────────────────────────────────
const blog3Body = [
  para("It started with random bloating after meals and abdominal discomfort. These SIBO symptoms are often ignored in the early stages."),
  para("Then came brain fog that made her question her focus. Mood swings were dismissed as just hormonal. Anjali began avoiding outside food and, like many others, shifted to home-cooked meals and improved her protein and fibre intake."),
  para("Within a month, her SIBO symptoms worsened — and this eventually led to a diagnosis of SIBO. Those persistent symptoms were trying to tell her something deeper."),

  h2("What Is SIBO? Understanding SIBO Symptoms"),
  para(
    bold("SIBO (Small Intestinal Bacterial Overgrowth)"),
    " is a gastrointestinal disorder characterised by an overgrowth of bacteria within the small intestine. We often hear about good and bad bacteria — but in SIBO, even the good bacteria are in the wrong place."
  ),
  para("One of the reasons people stay stuck with SIBO undiagnosed is because the symptoms overlap with IBS — bloating after food, abdominal distension, constipation, or diarrhea. SIBO, on the other hand, is a root-cause condition and could possibly be the reason behind IBS in some cases."),

  h2("Most Common SIBO Symptoms You Shouldn't Ignore"),
  bullet(
    bold("Bloating "),
    "— especially if it occurs an hour or two after meals."
  ),
  bullet(
    bold("Gas & distension "),
    "— a feeling of tightness around the abdomen, as if you're six months pregnant."
  ),
  bullet(
    bold("Abdominal discomfort "),
    "— pain after meals or while passing stools; dizziness while passing stools or due to gas."
  ),
  bullet(
    bold("Diarrhea / constipation / alternating "),
    "— change in type, texture, or frequency of bowel movement."
  ),
  bullet(
    bold("Unexplained fatigue & weight changes "),
    "— weight gain or loss due to poor absorption of nutrients."
  ),
  bullet(
    bold("Nutritional deficiencies & energy dips "),
    "— nutrients like iron and B12 can be depleted rapidly."
  ),

  h2("Causes of SIBO: Why Bacteria Overgrow in the Small Intestine"),

  h3("Low stomach acid"),
  para("Your stomach produces acid strong enough to melt metal — yet it's designed to protect you, not harm you. When acid levels drop, bacteria start moving to the wrong place: the small intestine instead of the colon. That's how SIBO symptoms begin."),

  h3("Poor gut motility"),
  para(
    "Your gut has a natural sweeping wave called the ",
    bold("Migrating Motor Complex (MMC)"),
    ", which helps move food and bacteria forward. When this slows down, bacteria aren't cleared effectively. They accumulate in the small intestine, triggering SIBO symptoms."
  ),

  h3("Chronic stress"),
  para("Chronic and prolonged stress weakens stomach acid levels, reduces enzymatic secretions, and disrupts gut functioning — leading to SIBO symptoms."),

  h3("Overuse of antibiotics"),
  para("Frequent or prolonged use of antibiotics can disrupt the gut microbiota, leading to SIBO."),

  h3("Structural abnormalities"),
  para("Conditions like diverticulosis, small bowel obstructions, and abdominal adhesions can also lead to SIBO."),

  h3("Surgical changes"),
  para("Surgeries for ulcers or gastric cancer can promote SIBO due to changes in digestive tract structure that allow bacteria to migrate up to the small intestine and populate."),

  para("SIBO symptoms do not appear overnight — they develop when gut health is compromised over time."),

  h2("How Is SIBO Diagnosed?"),

  h3("Breath test"),
  para("This is the most commonly used approach to detect SIBO. The person consumes a lactulose or glucose solution, and breath is evaluated after a few hours. If SIBO is present, bacteria will ferment the sugar early and release gases like methane and hydrogen — picked up in the test result."),

  h3("Small intestinal aspirate & culture"),
  para("A sample of fluid is drawn from the small intestine and tested for bacterial overgrowth. This approach is precise but invasive — hence not widely used."),

  h3("Blood tests (indirect clues)"),
  para("Signs of malabsorption — chronically low vitamin B12 and iron — can point towards SIBO."),

  h3("Symptom + response based"),
  para("Since SIBO symptoms overlap with IBS, many practitioners take a symptom-based approach. They often begin with targeted dietary changes — low-carb, low-probiotic — for a period of time to reduce and manage symptoms."),

  h2("Should You See a Doctor?"),
  para("If you are experiencing the following symptoms, it would be a good idea to seek medical support:"),
  bullet("Bloating after meals, especially a few hours later — a classic overlooked SIBO symptom."),
  bullet("Symptoms persist despite clean eating."),
  bullet("Feeling unusually full even after small meals."),
  bullet("Discomfort or pain after eating."),
  bullet("Food sensitivities that suddenly appear — often misread as immune dysfunction."),
  bullet("Bad breath (halitosis)."),
  bullet("Unexplained weight loss or weight gain."),
  bullet("Energy loss and fatigue despite good sleep."),
  bullet("Mood changes or irritability."),
  bullet("Brain fog and poor concentration — not always cognitive or age-related."),
  bullet("Hair fall, weak or brittle nails."),

  h2("IBS vs SIBO — How They Differ"),

  h3("Nature of condition"),
  para(
    bold("IBS: "),
    "Functional disorder (a gut-brain interaction problem). ",
    bold("SIBO: "),
    "Structural/microbial condition (excess bacteria)."
  ),

  h3("Primary location"),
  para(
    bold("IBS: "),
    "Primarily affects the large intestine (colon). ",
    bold("SIBO: "),
    "Affects the small intestine."
  ),

  h3("Primary cause"),
  para(
    bold("IBS: "),
    "Unknown — linked to visceral hypersensitivity, stress, food intolerances, or post-infection. ",
    bold("SIBO: "),
    "Slow motility, anatomical issues, low stomach acid, or a faulty ileocecal valve allowing bacteria to migrate."
  ),

  h3("Diagnosis"),
  para(
    bold("IBS: "),
    "Diagnosed by symptom patterns (Rome IV criteria) and ruling out other diseases. ",
    bold("SIBO: "),
    "Diagnosed via a hydrogen/methane breath test or a small intestine fluid aspirate."
  ),

  h3("Primary treatment"),
  para(
    bold("IBS: "),
    "Dietary changes (low-FODMAP), antispasmodics, fibre supplements, stress management. ",
    bold("SIBO: "),
    "Specific antibiotics (like rifaximin) to clear the bacteria, followed by prokinetics and diet changes."
  ),

  h2("The Bottom Line"),
  para("SIBO symptoms are not always loud or obvious — they progress gradually and show up subtly. Don't normalise discomfort or ignore your SIBO symptoms. Seek medical help at the earliest."),
]

// ─────────────────────────────────────────────────────────────────────────────
// Post documents
// ─────────────────────────────────────────────────────────────────────────────
const posts = [
  {
    _id: 'post-constipation-remedies',
    _type: 'post',
    title: "Effective Constipation Remedies: How to Relieve Constipation on the Toilet Immediately",
    slug: { _type: 'slug', current: 'constipation-remedies-relief-guide' },
    subtitle: "Sitting on the toilet but nothing happens? Constipation isn't fixed by one superfood — real relief comes with consistency.",
    excerpt: "Constipation can be frustrating, but what happens on the toilet is a reflection of your daily nutrition and lifestyle. Here are the signs, causes, and natural constipation remedies that actually work.",
    publishedAt: '2026-05-13T00:00:00.000Z',
    author: { _type: 'reference', _ref: AUTHOR_ID },
    tags: ['gut health', 'digestion', 'constipation'],
    body: blog1Body,
    disclaimer: 'This guide is for informational purposes only. Always consult your physician to interpret your specific symptoms.',
    metaTitle: 'Effective Constipation Remedies: How to Relieve Constipation on the Toilet Immediately',
    metaDescription: "Natural constipation remedies that actually work — fibre, hydration, meal timing, daily movement, and what to do on the toilet for instant relief.",
    keywords: [
      'constipation remedies',
      'constipation relief',
      'causes of constipation',
      'constipation causes',
      'signs of constipation',
      'natural laxative foods',
      'gastrocolic reflex',
      'gut motility',
      'gut-brain connection',
      'bowel movements',
      'irregular bowel movements',
    ],
  },
  {
    _id: 'post-maintenance-calories',
    _type: 'post',
    title: "How to Calculate Maintenance Calories",
    slug: { _type: 'slug', current: 'how-to-calculate-maintenance-calories' },
    subtitle: "TDEE = BMR × activity factor. Here's the simple two-step process to find your maintenance intake — and why it's a baseline, not a fixed rule.",
    excerpt: "How many calories should I eat? Actually, that's the wrong question. The right one is: what are my maintenance calories? Here's the simple BMR + TDEE calculation, and how to refine it for your real life.",
    publishedAt: '2026-05-13T00:00:00.000Z',
    author: { _type: 'reference', _ref: AUTHOR_ID },
    tags: ['nutrition', 'metabolic health', 'weight management'],
    body: blog2Body,
    disclaimer: 'This content is for informational purposes only and does not substitute professional medical advice.',
    metaTitle: 'How to Calculate Maintenance Calories — BMR + TDEE Formula',
    metaDescription: "Learn how to calculate your maintenance calories using BMR and activity factor (TDEE). A simple, two-step guide from a clinical health coach.",
    keywords: [
      'maintenance calories',
      'TDEE',
      'BMR formula',
      'basal metabolic rate',
      'daily calorie needs',
      'how many calories should I eat',
      'maintenance intake',
      'total daily energy expenditure',
    ],
  },
  {
    _id: 'post-sibo-symptoms',
    _type: 'post',
    title: "SIBO Symptoms: 10 Warning Signs You Shouldn't Ignore",
    slug: { _type: 'slug', current: 'sibo-symptoms-guide' },
    subtitle: "SIBO is one of the most overlooked and undiagnosed gut conditions. Here are the warning signs, causes, and how it differs from IBS.",
    excerpt: "Bloating an hour after meals, brain fog, mood swings — these can all be SIBO symptoms hiding in plain sight. Here's how SIBO differs from IBS, how it's diagnosed, and when to see a doctor.",
    publishedAt: '2026-05-13T00:00:00.000Z',
    author: { _type: 'reference', _ref: AUTHOR_ID },
    tags: ['gut health', 'SIBO', 'digestion'],
    body: blog3Body,
    disclaimer: 'This guide is for informational purposes only. Always consult your physician to interpret your specific symptoms.',
    metaTitle: "SIBO Symptoms: 10 Warning Signs You Shouldn't Ignore",
    metaDescription: "SIBO symptoms — bloating after meals, brain fog, fatigue, nutritional deficiencies — often go undiagnosed. Here are the signs, causes, and how SIBO differs from IBS.",
    keywords: [
      'SIBO symptoms',
      'SIBO',
      'small intestinal bacterial overgrowth',
      'SIBO vs IBS',
      'SIBO diagnosis',
      'breath test SIBO',
      'gut motility',
      'migrating motor complex',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Seed
// ─────────────────────────────────────────────────────────────────────────────
async function seed() {
  console.log(`\nSeeding batch 2 into project ${projectId} / dataset ${dataset}...\n`)

  for (const post of posts) {
    console.log(`Creating post: "${post.title}"...`)
    await client.createOrReplace(post)
    console.log(`  ✓ ${post._id} → /blog/${post.slug.current}`)
  }

  console.log(`\n✅ Done — ${posts.length} posts created/updated.`)
  console.log('View them at: https://newme.health/studio (or localhost:3000/studio)\n')
}

seed().catch((err) => {
  console.error('\n❌ Seed failed:', err.message)
  process.exit(1)
})
