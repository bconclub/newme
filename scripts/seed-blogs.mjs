/**
 * seed-blogs.mjs
 * Creates the Dr. Pal author + 3 test blog posts in Sanity.
 *
 * Requirements:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID  — already in .env.local
 *   NEXT_PUBLIC_SANITY_DATASET     — already in .env.local
 *   SANITY_API_WRITE_TOKEN         — add this to .env.local
 *     Get it at: https://sanity.io/manage → project → API → Tokens → Add API token (Editor)
 *
 * Run:
 *   node scripts/seed-blogs.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local manually
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
if (!token) throw new Error('Missing SANITY_API_WRITE_TOKEN in .env.local — add an Editor token from sanity.io/manage')

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

// ── Portable Text helpers ─────────────────────────────────────────────────────
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

// ── Author ────────────────────────────────────────────────────────────────────
const AUTHOR_ID = 'author-dr-pal'

const authorDoc = {
  _id: AUTHOR_ID,
  _type: 'author',
  name: 'Dr. Palaniappan Manickam',
  slug: { _type: 'slug', current: 'dr-pal' },
  role: 'Gastroenterologist & Founder, NewME',
  bio: 'Dr. Pal is a US-based gastroenterologist who founded NewME after his own health crisis at 35. He leads a doctor-led clinical system focused on metabolic and gut regulation through structured care.',
}

// ── Blog 1: Comprehensive Metabolic Panel ────────────────────────────────────
const blog1Body = [
  h2('Introduction'),
  para('Routine blood work plays a central role in preventive healthcare, and the ', bold('comprehensive metabolic panel test'), ' is one of the most powerful tools available. If your doctor has ever ordered one or if you\'ve seen it listed on a lab slip, this guide walks you through exactly what it means, why it matters, and what to expect.'),

  h2('What Is a Comprehensive Metabolic Panel Test?'),
  para('The ', bold('comprehensive metabolic panel test'), ' (CMP) is a blood test that evaluates your body\'s chemical balance and metabolism in a single draw. It gives healthcare providers a snapshot of blood sugar levels, kidney function, liver health, and electrolyte balance all at once.'),
  para('Doctors frequently order the ', bold('comprehensive metabolic panel test'), ' during annual physicals or to monitor chronic conditions such as diabetes, kidney disease, or liver disorders. Because it screens so broadly, the ', bold('comprehensive metabolic panel test'), ' can detect problems before symptoms appear — a hallmark of effective preventive care.'),

  h2('6 Components of a Comprehensive Metabolic Panel Test'),
  para('The ', bold('comprehensive metabolic panel test'), ' includes 6 individual measurements grouped into four areas:'),
  bullet(bold('Glucose'), ' — Blood sugar level; key indicator for diabetes risk.'),
  bullet(bold('Calcium'), ' — Vital for bones, muscles, nerves, and heart function.'),
  bullet(bold('Electrolytes'), ' — Sodium, potassium, chloride, bicarbonate — regulates fluid balance.'),
  bullet(bold('Kidney Markers'), ' — BUN and creatinine reveal how well kidneys filter waste.'),
  bullet(bold('Liver Enzymes'), ' — ALT, AST, albumin, total protein assess liver health and nutrition.'),
  bullet(bold('CO₂'), ' — Maintains the body\'s acid-base (pH) balance.'),
  para('Together, these markers build a full picture of your metabolic health. No other single test delivers this breadth from one blood draw.'),

  h2('What Do High or Low CMP Results Mean?'),
  para('The results of an abnormal ', bold('comprehensive metabolic panel test'), ' can give initial indications as to underlying health conditions. Although ranges can differ slightly across labs, the following is how common deviations are to be read:'),
  bullet(bold('Glucose:'), ' An increase in glucose level can indicate diabetes or insulin resistance; glucose can also decrease indicating hypoglycemia or abnormal eating habits.'),
  bullet(bold('Kidney markers (BUN, creatinine):'), ' An increased value may indicate kidney malfunction, dehydration or decreased efficiency of kidney filtration.'),
  bullet(bold('Liver enzymes (ALT, AST, proteins):'), ' High enzymes could indicate inflammation or damage to the liver, whereas low protein levels may be a sign of poor nutrition or liver problems.'),
  bullet(bold('Electrolytes (sodium, potassium, chloride, bicarbonate):'), ' Imbalances may affect hydration, nerve signaling, and muscle functioning, and are often associated with kidney or hormonal issues.'),
  bullet(bold('Calcium:'), ' Either high or low values can be linked to bone diseases, kidney diseases, or hormonal disorders.'),
  bullet(bold('CO₂ (bicarbonate):'), ' An abnormal level can be a sign of disproportion of the acid-base (pH) status of the body, which could be due to the condition of the lungs or kidneys.'),
  para('The slightest variation of your CMP blood test must be taken in context — at all times, the results of your CMP blood test should be interpreted in context with a healthcare professional to ensure proper diagnosis.'),

  h2('Why Should You Get a Comprehensive Metabolic Panel Test?'),
  para('The flexibility of the wide-range testing of the metabolic panel test is what makes it a cornerstone of routine screening. It can be used by your doctor to:'),
  bullet('Follow chronic diseases — diabetes, kidney or liver disease can be monitored with time-serial CMP results.'),
  bullet('Identify electrolyte imbalances — imbalances may result in dehydration, muscle cramps or severe heart events when not properly addressed.'),
  bullet('Screen for metabolic dysfunction — the ', bold('comprehensive metabolic panel test'), ' indicates organ problems long before the patient starts showing signs.'),
  bullet('Promote a yearly wellness check — a complete metabolic panel test annually will provide an individual place of reference.'),
  para('Since the comprehensive test of the metabolic panel covers a great deal of systems, it saves a lot of time that would have been used to take multiple blood draws.'),

  h2('How to Prepare for a Comprehensive Metabolic Panel Test'),
  para('A thorough metabolic panel (CMP) test is easy to get, but proper preparation is essential:'),
  bullet('Fast 8–12 hours prior to the test to have proper glucose and metabolic values.'),
  bullet('Drink plenty of water — this will not influence the outcome but will make blood drawing easier.'),
  bullet('Report to your doctor any medications or supplements that might affect CMP values.'),
  bullet('Wait 24–48 hours then analyze the results with your health practitioner so that they can be properly interpreted.'),

  h2('Conclusion'),
  para('One of the most effective and informative tests in present-day preventive healthcare is the ', bold('comprehensive metabolic panel test'), '. The complete metabolic panel test gives a broad perspective of your internal health based on a single blood sample. The test covers 14 markers including blood sugar, kidney function, liver health, and electrolyte balance.'),
  para('Asking your doctor to consider the ', bold('comprehensive metabolic panel test'), ' at your next check-up is a brilliant, proactive measure towards long-term well-being.'),
]

// ── Blog 2: Why Am I So Bloated I Look Pregnant ───────────────────────────────
const blog2Body = [
  h2('Introduction'),
  para('You wake up in a regular manner. In the afternoon your jeans become tight. By evening your stomach appears to be swollen to a point you look pregnant and you wonder to yourself — ', span('why am i so bloated i look pregnant?', ['em'])),
  para('This is among the most recurrent issues that individuals have when attempting to comprehend the causes of bloating and gases. The pain is not only physical but can have an impact on confidence, choice of clothing, and how you feel about your own skin.'),
  para('Most individuals believe that bloating occurs once people overeat or consume unhealthy foods. However, in practice, the gas-inducing habits are mostly associated with the sequence of digestion, daily routine, stress, and the functionality of your gut to digest food.'),
  para('The first step to regaining some of the lightness and comfort in your body is to understand the actual gas-inducing habits behind your symptoms.'),

  h2('Problem Explanation'),
  para('Bloating occurs when your stomach is full, tight, or stretched. It is merely a feeling at times. At other times, your stomach literally swells up and appears swollen, generally being associated with causes of bloating and gas, which affect digestion.'),
  para('Bloating is a common occurrence to most people particularly after consuming big meals. However, when it becomes common, the chances are that there has been repetition of bloating and gas causes that have not been dealt with.'),
  para('It is also necessary to realize the fact that bloating and gaining weight are not similar. Gas accumulation, slowing down of digestion, or fluid retention are the usual causes of visible swelling which come and go depending on your routine.'),
  para('The digestive system needs constant motion to digest food and empty the waste. Once that movement is slowed down or made irregular, the ', bold('digestive bloating causes'), ' people to think "why does my stomach look swollen?".'),

  h2('6 Common Reasons Why Your Stomach Looks Swollen'),
  para('Not only is there one cause of bloating and gas. The combination of several triggers experienced by the majority of the population causes the condition.'),

  h3('Accumulation of gases during digestion'),
  para('One of the most common bloating and gas causes is gas production during digestion. Gas is naturally produced in the intestines as food decomposes — in particular carbohydrates and food rich in fiber. When this gas moves at a low pace or is trapped, abdominal pressure accumulates. The causes of these abdominal bloating symptoms are particularly more apparent later in the day when digestion is slower.'),

  h3('Eating too quickly or irregularly'),
  para('Eating rate contributes significantly to causes of bloating and gases. Rushing meals results in more air being swallowed into the digestive tract which increases pressure within it. Missing meals and then consuming huge meals later on can also be a cause of digestive bloating, which will overload the stomach, thus slackening the digestive rate.'),

  h3('Food sensitivities'),
  para('There are types of foods that cause symptoms in individuals that are sensitive to some food types. Some of the most common ', bold('bloated stomach causes'), ' in sensitive individuals are dairy, wheat, and high fiber vegetables. These causes of bloating and gases do not necessarily manifest themselves instantly — symptoms can appear several hours after, making it more difficult to trace the symptoms to a particular food.'),

  h3('Hormonal changes'),
  para('Bloating and gas causes can also be influenced by hormones, particularly prior to menstruation. Slower digestion and retention of fluids is typical during hormonal changes. All these causes of abdominal bloating are usually temporary and may be uncomfortable until they go away.'),

  h3('Gut response and stress'),
  para('Among the least appreciated causes of bloating and gas is stress. The gut and brain are very much related — being stressed may slow the gut and make it more sensitive. The slowing of the digestive process means gas will be held longer by the intestines, which is one of the most important causes of digestive bloating that will cause discomfort.'),

  h3('Slow bowel movements and constipation'),
  para('One of the most common bloating and gas causes is constipation. Remaining contents in the digestive system are one of the key ', bold('causes of excessive gas'), ' accumulating around it. These ', bold('bloated stomach causes'), ' usually disappear when bowel movements are normal.'),

  h3('Underlying digestive conditions'),
  para('Persistent symptoms can be indicative of deeper causes of bloating and gas like irritable bowel syndrome (IBS) or other digestive imbalances. The ', bold('chronic bloating causes'), ' are typically to be carefully considered and given specific instructions.'),

  h2('Reframing the Problem'),
  para('A lot of individuals think that the bloating can be simply due to overeating. Although portion size may play a role, the causes of most bloating and gas are beyond the extent of the portion size.'),
  para('Routines have a significant influence on a daily basis. Abnormal meals, inadequate hydration, sleep deprivation, and high levels of stress are all causing recurring causes of bloating and gases.'),
  para('Rather than just concentrating on what to take out of your diet, it helps to take a step back and make observations. In many cases, the actual causes of digestive bloating are behavioral in nature, not necessarily a food.'),

  h2('What Actually Helps'),
  para('There is no need to have drastic changes in addressing the cause of bloating and gas. The majority of the improvement is based on the regular habits that will aid digestion.'),

  h3('Reduce the rate of your meals'),
  para('Slowing down meals assists in decreasing one of the easiest causes of bloating and gases: swallowed air. Fully chewing your food provides your digestive system with a better starting point to reduce causes of digestive bloating caused by incomplete breakdown of food.'),

  h3('Be mindful of timing'),
  para('The timing of meals is also a factor in causes of bloating and gas. Consumption of big meals at late hours stresses the digestive system. Regular meal timing will aid in avoiding some of the ', bold('abdominal bloating causes'), ' that accumulate throughout the day.'),

  h3('Aid regular bowel movements'),
  para('Water and adequate fiber intake will help in alleviating bloating and gas causes associated with constipation. Slowly adding fiber helps ease the digestive process and lessen the effects of a bloated stomach related to irregularity.'),

  h3('Stay physically active'),
  para('Movement assists the digestive system to move naturally and helps decrease bloating and gas by assisting the gas to move through the intestines. Even brief post-meal walks can help to curb the causes of post-meal digestive bloating associated with immobility.'),

  h3('Manage stress consistently'),
  para('Stress management is directly correlated with decreasing causes of bloating and gas. Digestion is enhanced when the level of stress is reduced. Recurrent causes of abdominal bloating can be reduced by better sleep, short breaks, and relaxation routines.'),

  h3('Get expert advice when necessary'),
  para('When symptoms persist even after lifestyle changes, it is necessary to determine more profound causes of bloating and gas. Professional assessment can be used to reveal concealed ', bold('chronic bloating causes'), ' and offers specific assistance.'),

  h2('A Typical Day'),
  para('Consider how the bulk of days go:'),
  bullet(bold('Morning (7:00 AM – 10:00 AM):'), ' Breakfast is hurried or not taken.'),
  bullet(bold('Midday (12:30 PM – 3:00 PM):'), ' Lunch occurs between activities.'),
  bullet(bold('Afternoon (3:00 PM – 6:00 PM):'), ' Daily stress is accumulated.'),
  bullet(bold('Night (7:30 PM – 10:30 PM):'), ' Dinner will be the most substantial meal, and frequently taken late.'),
  para('By now, a number of causes of bloating and gas have accumulated: irregular meals, swallowed air, stress, slow digestion. It is hardly ever a single issue. The majority of visible swelling is due to a combination of various causes of digestive bloating working in concert over time.'),

  h2('Conclusion'),
  para('When you have been asking yourself, "', span('why am i so bloated i look pregnant?', ['em']), '" it is usually more of a signal that your body is reacting to a recurring cause of bloating and gas, and not a single mistake. The majority of symptoms are also related to everyday activities: the way you eat, how you cope with stress, how regular your digestive system is. As soon as you start determining your own bloating and gas triggers, you can anticipate relief.'),

  h2('Take the Next Step Toward a Healthier Gut'),
  para('If you are experiencing frequent discomfort and are unable to identify the causes of your bloating and gas issues, you do not need to solve it by yourself. Get in touch with our gut health experts and learn what you are reacting to and get a customized plan developed based on your lifestyle and food preferences. With the appropriate assistance, you will be able to go beyond the temporary remedies and begin tackling the underlying causes of bloating and gas that impact your overall level of comfort.'),
]

// ── Blog 3: Fermented Foods for Gut Health ────────────────────────────────────
const blog3Body = [
  h2('What Science Says About Fermented Foods'),
  para('One of the most studied areas of nutrition today is fermented foods to promote gut health. Research has affirmed that consuming foods and beverages rich in probiotics — such as yogurt, kimchi, kefir, or kombucha — can enhance the diversity of the microbiome and promote healthy digestion. A trial published in ', span('Cell', ['em']), ' (2021) at Stanford University revealed that adults who consumed greater amounts of fermented foods had a quantifiable increase in the diversity of the gut microbiome and a reduction in the levels of inflammatory markers associated with chronic diseases.'),
  para('Fermented foods are good for improving gut health because they contain probiotics — helpful microbes that interact with your gut lining, helping to digest food and protect against infections. Nevertheless, fermented foods in isolation will not be able to remediate an unbalanced gut microbiome, particularly when other problems such as dysbiosis have already been established. They are a supportive tool, not a stand-alone cure.'),

  h2('Why You Still Feel Bloated After Eating Fermented Foods'),
  para('When you experience bloating after adding fermented foods to your gut health routine, your gut microbiome balance might already be disturbed. Dysbiosis — an imbalance of gut bacteria — can cause your gut to overreact to new probiotics. This can happen due to:'),
  bullet('Overuse of antibiotics'),
  bullet('Diets high in sugar and ultra-processed foods'),
  bullet('Chronic stress, which weakens the gut-brain axis'),
  bullet('Lack of enough prebiotic fibre intake'),
  para('Once dysbiosis has been established, even healthy foods could not be properly digested by your gut, which as a result produces gas, bloating, discomfort, or pain even after eating fermented foods. If your bloating has not improved after these changes, you may be experiencing SIBO symptoms or chronic constipation.'),

  h2('Common Gut Health Mistakes to Avoid'),

  h3('1. Choosing "fermented" products without probiotics'),
  para('Many supermarket "fermented" options are pasteurised, killing off live bacteria. Real fermented foods for gut health must say "contains live and active cultures." Always look for refrigerated, unpasteurised varieties.'),

  h3('2. Eating too much too soon'),
  para('Jumping from none to multiple servings per day overwhelms your digestion. The Stanford FeFiFo study used a gradual 4-week ramp-up phase for a reason — it gives your microbiome time to adapt.'),

  h3('3. Ignoring prebiotics'),
  para('Fibre is necessary in promoting the growth of probiotics in probiotic foods to promote gut health. Good bacteria are fed on foods rich in prebiotics including oats, garlic, onions, bananas, and lentils. In their absence, probiotics find it difficult to thrive and continue with a healthy digestive system.'),

  h2('Prebiotics vs Probiotics'),
  para('Understanding the difference between prebiotics and probiotics is key to making fermented foods actually work for you:'),
  bullet(bold('Prebiotics:'), ' Non-digestible fibres that feed good gut bacteria. Found in oats, garlic, onions, bananas, lentils. Help existing bacteria grow and thrive. Essential for long-term gut balance.'),
  bullet(bold('Probiotics:'), ' Live beneficial bacteria that support the gut microbiome. Found in fermented foods like yogurt, kefir, kimchi, kombucha. Introduce new beneficial bacteria into the gut. Help improve microbiome diversity and bloating relief.'),

  h2('How to Make Fermented Foods Actually Work for You'),
  para('To truly benefit from fermented foods for gut health:'),
  bullet(bold('Start small.'), ' Begin with 1–2 tablespoons of daily sauerkraut, kefir, or yogurt. Allow your body to acclimatize over two to three weeks before increasing.'),
  bullet(bold('Rotate your options.'), ' Try different fermented foods throughout the week to add a broader collection of probiotic species to your gut microbiome.'),
  bullet(bold('Pair with prebiotics.'), ' Combine fermented foods with meals rich in fibre to enhance nutrient absorption and control inflammation.'),
  para('This daily mix of probiotics and prebiotics enhances both microbiome diversity and bloating relief.'),

  h2('Consistency Beats Quick Fixes'),
  para('It is not a matter of going in and changing your diet in one night — a drastic change that won\'t last long. Habits are best when they are consistent and balanced, as opposed to extreme cleanses or superfood trends. A steady strategy — kefir in the morning, high-fibre foods, less sugar, and relaxation exercises — will help your gut microbiome flourish by default.'),
  para('When used intelligently, fermented foods to promote gut health are important in the recovery process. They, in combination with prebiotics and a nutrient-dense diet, will empower healthy digestion and lasting alleviation of bloating or constipation.'),
]

// ── Post documents ────────────────────────────────────────────────────────────
const posts = [
  {
    _id: 'post-cmp-guide',
    _type: 'post',
    title: 'Comprehensive Metabolic Panel (CMP) Test: A Complete Guide',
    slug: { _type: 'slug', current: 'comprehensive-metabolic-panel-test' },
    subtitle: 'Everything you need to know about the CMP blood test — what it measures, how to prepare, and how to read your results.',
    excerpt: 'The comprehensive metabolic panel test (CMP) is a single blood draw that screens blood sugar, kidney function, liver health, and electrolyte balance. Here\'s a complete guide.',
    publishedAt: '2025-05-08T00:00:00.000Z',
    author: { _type: 'reference', _ref: AUTHOR_ID },
    tags: ['metabolic health', 'lab tests', 'preventive care'],
    body: blog1Body,
    disclaimer: 'This guide is for informational purposes only. Always consult your physician to interpret your specific lab results.',
    metaTitle: 'Comprehensive Metabolic Panel (CMP) Test: A Complete Guide',
    metaDescription: 'Learn what the comprehensive metabolic panel test measures, why doctors order it, how to prepare, and how to interpret your results.',
    keywords: ['comprehensive metabolic panel test', 'CMP blood test', 'metabolic panel results', 'kidney function test', 'liver function test', 'electrolyte balance', 'blood chemistry panel', 'routine blood work'],
  },
  {
    _id: 'post-bloated-pregnant',
    _type: 'post',
    title: 'Why Am I So Bloated I Look Pregnant? Understanding Bloating and Gas Causes',
    slug: { _type: 'slug', current: 'why-am-i-so-bloated-i-look-pregnant' },
    subtitle: 'Chronic bloating that makes your stomach look swollen is rarely about overeating. Here\'s what\'s actually causing it.',
    excerpt: 'If you\'re asking "why am I so bloated I look pregnant?", your body is likely reacting to a combination of everyday habits — not a single mistake. Here are the 6 most common causes and what actually helps.',
    publishedAt: '2025-05-08T00:00:00.000Z',
    author: { _type: 'reference', _ref: AUTHOR_ID },
    tags: ['gut health', 'digestion', 'bloating'],
    body: blog2Body,
    disclaimer: 'This guide is for informational purposes only. Always consult your physician to interpret your specific symptoms.',
    metaTitle: 'Why Am I So Bloated I Look Pregnant? Understanding Bloating and Gas Causes',
    metaDescription: 'Bloating that makes you look pregnant is often caused by everyday habits — irregular meals, stress, food sensitivities. Here\'s what\'s behind it and what actually helps.',
    keywords: ['why am i so bloated i look pregnant', 'bloated stomach causes', 'abdominal bloating causes', 'causes of excessive gas', 'chronic bloating causes', 'digestive bloating causes'],
  },
  {
    _id: 'post-fermented-foods',
    _type: 'post',
    title: 'Fermented Foods for Gut Health: Why They Alone Won\'t Fix Your Microbiome',
    slug: { _type: 'slug', current: 'fermented-foods-for-gut-health-guide' },
    subtitle: 'Fermented foods are a powerful tool for gut health — but not a standalone cure. Here\'s what the science actually says.',
    excerpt: 'Yogurt, kimchi, kefir, and kombucha can improve microbiome diversity — but if you\'re still bloated after eating fermented foods, dysbiosis may be the problem. Here\'s how to make them actually work.',
    publishedAt: '2025-05-08T00:00:00.000Z',
    author: { _type: 'reference', _ref: AUTHOR_ID },
    tags: ['gut health', 'nutrition', 'microbiome'],
    body: blog3Body,
    disclaimer: 'Always consult with a healthcare professional before making significant changes to your diet, especially if you have existing digestive conditions.',
    metaTitle: 'Fermented Foods for Gut Health: Why They Alone Won\'t Fix Your Microbiome',
    metaDescription: 'Fermented foods like yogurt and kimchi improve gut microbiome diversity, but they\'re not enough on their own. Here\'s how to pair them with prebiotics for real results.',
    keywords: ['fermented foods for gut health', 'gut microbiome', 'probiotics', 'dysbiosis', 'prebiotics', 'healthy digestion', 'bloating relief'],
  },
]

// ── Seed ──────────────────────────────────────────────────────────────────────
async function seed() {
  console.log(`\nSeeding into project ${projectId} / dataset ${dataset}...\n`)

  console.log('Creating author: Dr. Pal...')
  await client.createOrReplace(authorDoc)
  console.log('  ✓ author-dr-pal')

  for (const post of posts) {
    console.log(`Creating post: "${post.title}"...`)
    await client.createOrReplace(post)
    console.log(`  ✓ ${post._id} → /blog/${post.slug.current}`)
  }

  console.log('\n✅ Done — 1 author + 3 posts created.')
  console.log('View them at: https://newme.health/studio (or localhost:3000/studio)\n')
}

seed().catch((err) => {
  console.error('\n❌ Seed failed:', err.message)
  process.exit(1)
})
