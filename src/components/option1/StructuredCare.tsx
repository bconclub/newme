'use client'

import { motion } from 'framer-motion'

// Figma "Group 259" (1:6322): comparison of typical wellness vs the NewME
// method. Left card 573×920 (dim/typical), right card 680×1092 (highlighted/
// NewME). Heading "What Structured Care Looks Like" at y=6169 above.
const typical = [
  'Generic protocols applied to everyone',
  'Baseline assessment at intake only',
  'Coach-only guidance',
  'Isolated interventions (diet or exercise or sleep)',
  'Single point of contact',
  'Short-terms fixes and quick wins',
]

const newme = [
  'Pathway personalised to your physiology and history',
  'Baseline assessment with scheduled clinical reviews',
  'Doctor-led oversight through every phase',
  'Integrated approach across gut, metabolic, and lifestyle system',
  'Coordinated team of coaches, clinicians, and specialists',
  'Built for long-term stability and sustained outcomes',
]

export default function StructuredCare() {
  return (
    <section
      id="structured-care"
      className="relative pb-0"
      style={{
        // Figma: heading y=6169, prev (Pathways) cards end ~y=5856 → ~313px
        // artboard gap. Tuned to 200 since Pathways already has post-content
        // breathing room and the comparison area visually sits inside the
        // shared dark backdrop.
        paddingTop: 'clamp(80px, calc(200 / 1920 * 100vw), 200px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/* Heading — Figma 1:5111: x=555, y=6169, w=759, h=144 (2 lines × 72).
            Bricolage SemiBold 72px lh 72, white, centered. */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-bricolage)] text-white text-center mx-auto"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
            lineHeight: 1,
            letterSpacing: 0,
            maxWidth: 759,
          }}
        >
          What Structured Care
          <br />
          Looks Like
        </motion.h2>

        {/* Comparison row — Figma: total span 1223 wide. Left card 573×920
            offset down 90 (y=6467 vs right y=6377). Right card 680×1092 sits
            taller and wider to emphasize the NewME column. */}
        <div
          className="relative mx-auto flex items-end justify-center"
          style={{
            maxWidth: 1223,
            marginTop: 'clamp(40px, calc(64 / 1920 * 100vw), 64px)',
          }}
        >
          {/* Left card — Typical (dim) */}
          <CompareCard
            kind="typical"
            title="Typical Wellness Program"
            items={typical}
          />
          {/* Right card — NewME (highlighted) */}
          <CompareCard
            kind="newme"
            title="Structured Care With NewME Method"
            items={newme}
          />
        </div>
      </div>
    </section>
  )
}

function CompareCard({
  kind,
  title,
  items,
}: {
  kind: 'typical' | 'newme'
  title: string
  items: string[]
}) {
  const isNewme = kind === 'newme'
  // Figma exact widths: typical 573, newme 680 → 573:680 ≈ 0.457 : 0.543
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: isNewme ? 0.15 : 0 }}
      className="relative overflow-hidden flex flex-col"
      style={{
        // Use proportional widths so both cards together hit ~1223 max.
        flex: isNewme ? '680 1 0' : '573 1 0',
        // Right card is 1092 tall, left card 920 tall, right starts 90 higher.
        minHeight: isNewme
          ? 'clamp(540px, calc(1092 / 1920 * 100vw), 1092px)'
          : 'clamp(460px, calc(920 / 1920 * 100vw), 920px)',
        background: isNewme ? '#0E2827' : 'rgba(255, 255, 255, 0.04)',
        border: isNewme
          ? '1px solid rgba(254, 242, 114, 0.35)'
          : '1px solid rgba(255, 255, 255, 0.12)',
        backdropFilter: isNewme ? undefined : 'blur(10px)',
        borderRadius: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
        marginLeft: isNewme ? 0 : 0,
        zIndex: isNewme ? 2 : 1,
      }}
    >
      {/* Header band — Figma left 162 tall, right 192 tall. Title centered. */}
      <div
        className="relative flex items-center justify-center text-center"
        style={{
          minHeight: isNewme
            ? 'clamp(120px, calc(192 / 1920 * 100vw), 192px)'
            : 'clamp(96px, calc(162 / 1920 * 100vw), 162px)',
          paddingLeft: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
          paddingRight: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
          background: isNewme
            ? 'rgba(254, 242, 114, 0.08)'
            : 'rgba(255, 255, 255, 0.04)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <h3
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontWeight: 600,
            // Right title (1:6352) 463×96 fits ~48px font on 2 lines, left
            // (1:6337) 345×81 ≈ 64px on 1 line. Use 40-48px clamps.
            fontSize: isNewme
              ? 'clamp(20px, calc(48 / 1920 * 100vw), 48px)'
              : 'clamp(18px, calc(40 / 1920 * 100vw), 40px)',
            lineHeight: 1.1,
            color: isNewme ? '#FEF272' : 'rgba(255,255,255,0.65)',
          }}
        >
          {title}
        </h3>
      </div>

      {/* Item rows — Figma: dividers ~123px apart on left, ~145px on right.
          Use flex-1 so the items distribute evenly across remaining height. */}
      <ul className="flex flex-col flex-1">
        {items.map((it, i) => (
          <li
            key={it}
            className="flex items-center text-center justify-center"
            style={{
              flex: '1 1 0',
              paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
              paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
              borderTop:
                i === 0 ? 'none' : '1px solid rgba(255, 255, 255, 0.10)',
              color: isNewme ? '#FFFFFF' : 'rgba(255, 255, 255, 0.72)',
            }}
          >
            <span
              className="font-[family-name:var(--font-urbanist)]"
              style={{
                fontWeight: isNewme ? 500 : 400,
                fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                lineHeight: 'clamp(18px, calc(34 / 1920 * 100vw), 34px)',
                letterSpacing: 0,
              }}
            >
              {it}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
