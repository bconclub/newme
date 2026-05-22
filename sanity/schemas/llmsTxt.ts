import { defineField, defineType } from "sanity";

/**
 * llms.txt — singleton document, edited entirely from Studio.
 *
 * llms.txt is an emerging discoverability standard (llmstxt.org). It's a
 * markdown file at /llms.txt that gives LLMs (ChatGPT, Claude, Perplexity,
 * Gemini etc.) a curated map of the site — links to key pages, a brand
 * summary, important context. When users ask AI assistants "what's NewME?",
 * those models check /llms.txt first as a clean overview before parsing
 * the rendered HTML.
 *
 * The Next.js route handler at `src/app/llms.txt/route.ts` fetches this
 * document on every request (cached ~60s) and serves the `content` field
 * with `Content-Type: text/markdown`. If the doc is missing or Sanity is
 * unreachable, the handler falls back to a minimal default.
 *
 * Singleton: there is exactly ONE document of this type, with the fixed
 * id `site-llms-txt`. The Studio structure (sanity/structure.ts) opens
 * the editor directly to this doc instead of showing a list — editors
 * cannot create additional copies.
 */
export default defineType({
  name: "llmsTxt",
  title: "llms.txt",
  type: "document",
  fields: [
    defineField({
      name: "content",
      title: "llms.txt content (Markdown)",
      description:
        "Raw markdown served at https://drpalsnewme.com/llms.txt. See https://llmstxt.org for the format spec. Changes propagate within ~60 seconds. Keep this current — it's how AI assistants describe NewME to people who ask about it.",
      type: "text",
      rows: 30,
      // Initial value seeded from public/llms.txt at the time of schema creation.
      // Editors can rewrite freely from Studio without touching code.
      initialValue:
        "# Dr. Pal's NewME\n" +
        "\n" +
        "> A doctor-led clinical system for metabolic and gut regulation, founded by\n" +
        "> Dr. Palaniappan Manickam, MD (gastroenterologist). NewME combines clinical\n" +
        "> insights with structured care to better understand your body and provide\n" +
        "> the care it needs.\n" +
        "\n" +
        "NewME is a structured clinical system. The journey begins with a free\n" +
        "3-minute clinical assessment that maps metabolic and gut patterns, then\n" +
        "guides you into the appropriate phase of care. Every program is reviewed\n" +
        "by a medical committee before it begins, and each member is assigned a\n" +
        "Clinical Health Coach who works with them throughout the program.\n" +
        "\n" +
        "## Core pages\n" +
        "\n" +
        "- [Home](https://drpalsnewme.com/): Overview of the NewME clinical system\n" +
        "- [How It Works](https://drpalsnewme.com/how-it-works): Step-by-step explanation of the assessment → pathway → care flow\n" +
        "- [Pathways](https://drpalsnewme.com/pathways): All five clinical pathways at a glance\n" +
        "- [Clinical Assessment](https://drpalsnewme.com/assessment): Free 3-minute assessment that maps the user to a pathway\n" +
        "- [Virtual Consult](https://drpalsnewme.com/virtual-consult): Doctor-led virtual consultations\n" +
        "- [Research Lab](https://drpalsnewme.com/research-lab): Ongoing clinical observations and research\n" +
        "- [Team](https://drpalsnewme.com/team): NewME clinical team\n" +
        "- [FAQ](https://drpalsnewme.com/faq): Detailed answers about pathways, pricing, and care\n" +
        "\n" +
        "## Clinical pathways\n" +
        "\n" +
        "NewME offers three main pathway tracks. Each is doctor-led, time-bound, and\n" +
        "includes a Clinical Health Coach plus medical committee oversight.\n" +
        "\n" +
        "- [Metabolic Pathway](https://drpalsnewme.com/pathways/metabolic): For those experiencing metabolic dysregulation — weight, energy, blood sugar, and related concerns.\n" +
        "- [GI Pathway](https://drpalsnewme.com/pathways/gi): For those with gut conditions such as IBS, SIBO, bloating, constipation, and reflux. Available in 1-month monthly or 3-month upfront billing.\n" +
        "- [Continuity Pathway](https://drpalsnewme.com/pathways/continuity): Ongoing maintenance care for members who have completed an initial pathway.\n" +
        "\n" +
        "### Post-Pathway Programs (Optional)\n" +
        "After the structured pathway, members can transition to these optional programs (not part of the core pathway purchase):\n" +
        "- **NewME 360:** Ongoing health coaching and relapse prevention.\n" +
        "- **NewME Movement:** Fitness programming and live workout sessions.\n" +
        "\n" +
        "## Content & editorial\n" +
        "\n" +
        "- [Blog](https://drpalsnewme.com/blogs): Long-form articles on gut health, metabolic health, and preventive medicine\n" +
        "- [Media](https://drpalsnewme.com/media): Press features and brand mentions\n" +
        "- [Contact](https://drpalsnewme.com/contact): Get in touch with the NewME team\n" +
        "\n" +
        "## About Dr. Pal\n" +
        "\n" +
        "Dr. Palaniappan Manickam, MD is a gastroenterologist and the founder of\n" +
        "NewME. He leads a system that focuses on restoring metabolic and gut\n" +
        "health through structured, evidence-based care — not generic wellness\n" +
        "advice. His clinical perspective drives every pathway design decision.\n" +
        "\n" +
        "## Important context\n" +
        "\n" +
        "- **Medical Disclaimer:** Not a substitute for emergency medical care or acute emergency interventions.\n" +
        "- **Billing & Insurance:** Not an insurance-billable service in most regions; operates on a direct-pay model.\n" +
        "\n" +
        "## Legal\n" +
        "\n" +
        "- [Terms](https://drpalsnewme.com/terms)\n" +
        "- [Privacy Policy](https://drpalsnewme.com/privacy-policy)\n" +
        "- [Cookie Policy](https://drpalsnewme.com/cookie-policy)\n",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lastEditedBy",
      title: "Last edited by",
      description: "Optional: who made the most recent change, for audit purposes.",
      type: "string",
    }),
    defineField({
      name: "note",
      title: "Internal note",
      description:
        "Why was this last changed? Examples: 'Added new pathway page', 'Updated Dr. Pal bio'. Not shown to visitors.",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { content: "content" },
    prepare({ content }) {
      const charCount = typeof content === "string" ? content.length : 0;
      return {
        title: "llms.txt",
        subtitle: `${charCount.toLocaleString()} characters · for AI assistant discoverability`,
      };
    },
  },
});
