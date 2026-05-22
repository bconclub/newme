/**
 * One-time seed: creates a `page` document in Sanity for every marketing route.
 *
 * Run with:
 *   npx sanity@latest exec sanity/migrations/seed-pages.ts --with-user-token
 *
 * Safe to re-run — uses createIfNotExists so existing docs are left untouched.
 */

import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-01-01" });

const pages = [
  {
    route: "/",
    metaTitle: "NewME | Doctor-Led Care, Personalized For Your Body",
    metaDescription:
      "NewME combines clinical insights with structured care to better understand your body and provide the care it needs. A doctor-led clinical system for metabolic and gut regulation.",
    keywords: ["metabolic health", "gut health", "Dr Pal", "NewME", "clinical care"],
  },
  {
    route: "/how-it-works",
    metaTitle: "How It Works | Dr. Pal's NewME",
    metaDescription:
      "How NewME structures care across assessment, pathways, and continuity — a doctor-led clinical system for metabolic and gut regulation.",
  },
  {
    route: "/pathways",
    metaTitle: "Pathways | Dr. Pal's NewME",
    metaDescription:
      "Choose the clinical pathway that fits your health goals — Metabolic, GI, or Continuity care led by Dr. Palaniappan Manickam.",
  },
  {
    route: "/pathways/metabolic",
    metaTitle: "Metabolic Pathway | Dr. Pal's NewME",
    metaDescription:
      "A structured metabolic health program combining clinical assessment, personalised protocols, and ongoing monitoring — led by Dr. Pal.",
  },
  {
    route: "/pathways/gi",
    metaTitle: "GI Pathway | Dr. Pal's NewME",
    metaDescription:
      "Doctor-led gastrointestinal care addressing bloating, IBS, and gut dysregulation through a structured clinical pathway.",
  },
  {
    route: "/pathways/continuity",
    metaTitle: "Continuity Care | Dr. Pal's NewME",
    metaDescription:
      "Ongoing care and monitoring after your primary pathway — keeping your metabolic and gut health on track long-term.",
  },
  {
    route: "/virtual-consult",
    metaTitle: "Virtual Consult | Dr. Pal's NewME",
    metaDescription:
      "Doctor-led virtual consult from NewME. Consult with our clinical team from wherever you are — focused, evidence-based care without referral chains or waiting.",
  },
  {
    route: "/research-lab",
    metaTitle: "Research Lab | Dr. Pal's NewME",
    metaDescription:
      "The NewME Research Lab publishes clinical findings drawn directly from our practice — evidence-led protocols and observed patient outcomes.",
  },
  {
    route: "/team",
    metaTitle: "Our Team | Dr. Pal's NewME",
    metaDescription:
      "Meet the clinical team behind NewME — led by Dr. Palaniappan Manickam, specialist in metabolic and gut health.",
  },
  {
    route: "/contact",
    metaTitle: "Contact | Dr. Pal's NewME",
    metaDescription:
      "Get in touch with the NewME team — questions about our programs, clinical pathways, or appointments.",
  },
  {
    route: "/faq",
    metaTitle: "FAQ | Dr. Pal's NewME",
    metaDescription:
      "Answers to common questions about NewME programs, clinical pathways, pricing, and how the process works.",
  },
  {
    route: "/media",
    metaTitle: "Media | Dr. Pal's NewME",
    metaDescription:
      "NewME in the media — coverage of our work in metabolic and gut regulation across leading publications.",
  },
  {
    route: "/blogs",
    metaTitle: "Blog | Dr. Pal's NewME",
    metaDescription:
      "Long-form articles on metabolic health, gut regulation, and structured care from the NewME team.",
  },
  {
    route: "/terms",
    metaTitle: "Terms and Conditions | Dr. Pal's NewME",
    metaDescription:
      "Terms and Conditions governing participation in NewME's programs and services provided by NEWME.FIT LLC.",
    noIndex: false,
  },
  {
    route: "/cookie-policy",
    metaTitle: "Cookie Policy | Dr. Pal's NewME",
    metaDescription: "How drpalsnewme.com uses cookies and similar technologies.",
    noIndex: false,
  },
] as const;

async function seed() {
  console.log(`Seeding ${pages.length} page documents…`);

  const transaction = client.transaction();

  for (const p of pages) {
    // Stable deterministic ID: "page-" + route slug (slashes → hyphens)
    const id = `page${p.route.replace(/\//g, "-").replace(/-$/, "") || "-home"}`;

    transaction.createIfNotExists({
      _id: id,
      _type: "page",
      route: p.route,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      noIndex: ("noIndex" in p ? p.noIndex : false) as boolean,
      ...("keywords" in p && p.keywords
        ? { keywords: [...p.keywords] }
        : {}),
    });
  }

  const result = await transaction.commit();
  console.log(`Done. ${result.results.length} operations committed.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
