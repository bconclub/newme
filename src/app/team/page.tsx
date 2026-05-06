'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

const EASE = [0.22, 1, 0.36, 1] as const

// ─── Team data from Figma 122:10180 ──────────────────────────────────────────
// Cards: 435×540px in a 4-column grid, 3 rows. x positions: 60, 515, 970, 1425
// Row 1 (y=1330): Founders & Leadership
// Row 2 (y=1890): Clinical Team
// Row 3 (y=2450): Specialists
const TEAM = [
  // Row 1 — Leadership
  {
    name: 'Dr. Palaniappan Manickam',
    role: 'Founder',
    initials: 'PM',
    color: '#1a5a4a',
    photo: null,
  },
  {
    name: 'Priya Pal',
    role: 'Co Founder',
    initials: 'PP',
    color: '#2d6b58',
    photo: null,
  },
  {
    name: 'Shakeela',
    role: 'CEO',
    initials: 'SK',
    color: '#1e5c4a',
    photo: null,
    featured: true,
  },
  {
    name: 'Karthik Ravi',
    role: 'Head of Business Operations',
    initials: 'KR',
    color: '#245040',
    photo: null,
  },
  // Row 2 — Clinical
  {
    name: 'Gayatri Rajamani',
    role: 'Head of Clinical Nutrition',
    initials: 'GR',
    color: '#2a6454',
    photo: null,
  },
  {
    name: 'Rashmi Sinha',
    role: 'Clinical Nutrition Lead',
    initials: 'RS',
    color: '#1f5746',
    photo: null,
  },
  {
    name: 'Devi Palaniappan',
    role: 'Head of Coaching',
    initials: 'DP',
    color: '#275a4a',
    photo: null,
  },
  {
    name: 'Namratha Nataraj',
    role: 'Head of Research & QA',
    initials: 'NN',
    color: '#234e40',
    photo: null,
  },
  // Row 3 — Specialists
  {
    name: 'Dr. Indira MD DNB',
    role: 'General Medicine',
    initials: 'IN',
    color: '#1e5040',
    photo: null,
  },
  {
    name: 'Ashwini Saras',
    role: 'Operation Lead',
    initials: 'AS',
    color: '#265a48',
    photo: null,
  },
]

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="newme-page">
        <TeamHero />
        <TeamGrid />
      </main>
      <Footer />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero — Figma 122:10180 — 1880×694 card
// "Meet The Clinical Team Behind Your Care."
// ─────────────────────────────────────────────────────────────────────────────
function TeamHero() {
  return (
    <section
      className="relative"
      style={{
        paddingTop: 'clamp(72px, calc(80 / 1920 * 100vw), 80px)',
        paddingLeft: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
        paddingRight: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
        paddingBottom: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 'clamp(20px, calc(48 / 1920 * 100vw), 48px)',
          height: 'clamp(280px, calc(694 / 1920 * 100vw), 694px)',
          background: '#0E2827',
        }}
      >
        {/* Hero image */}
        <div className="absolute inset-0">
          <Image
            src="/clinic/virtual-clinic-hero.webp"
            alt="NewME clinical team"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1880px"
            className="object-cover [object-position:55%_center] md:object-center"
          />
        </div>

        {/* Pine gradient wash — heavier coverage for team page */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(118deg, #629675 0%, #2F7269 28%, #144F49 52%, #013E37 78%)',
            opacity: 0.93,
            maskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.60) 46%, rgba(0,0,0,0.15) 56%, rgba(0,0,0,0) 64%)',
            WebkitMaskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.60) 46%, rgba(0,0,0,0.15) 56%, rgba(0,0,0,0) 64%)',
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col justify-end h-full"
          style={{
            padding: 'clamp(24px, calc(60 / 1920 * 100vw), 60px) clamp(24px, calc(120 / 1920 * 100vw), 120px) clamp(48px, calc(88 / 1920 * 100vw), 88px)',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
            className="font-[family-name:var(--font-urbanist)]"
            style={{
              fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)',
              color: 'rgba(255,255,255,0.65)',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
            }}
          >
            NewME Care Team
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              maxWidth: 'clamp(300px, calc(900 / 1920 * 100vw), 900px)',
            }}
          >
            Meet The Clinical Team<br />Behind Your Care.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.26 }}
            className="font-[family-name:var(--font-urbanist)] text-white"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
              lineHeight: 1.6,
              opacity: 0.82,
              maxWidth: 'clamp(260px, calc(700 / 1920 * 100vw), 700px)',
              marginTop: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
            }}
          >
            A multidisciplinary team of doctors, nutritionists, coaches, and
            researchers — all working inside a single clinical system.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Team grid — Figma: 4 columns, 435×540 cards, 3 rows
// ─────────────────────────────────────────────────────────────────────────────
function TeamGrid() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(60px, calc(100 / 1920 * 100vw), 100px) clamp(20px, calc(60 / 1920 * 100vw), 60px) clamp(80px, calc(140 / 1920 * 100vw), 140px)',
      }}
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ textAlign: 'center', marginBottom: 'clamp(40px, calc(72 / 1920 * 100vw), 72px)' }}
      >
        <h2
          className="font-[family-name:var(--font-bricolage)] text-white"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(24px, calc(56 / 1920 * 100vw), 56px)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
          }}
        >
          The Experts Who Will Guide You.
        </h2>
        <p
          className="font-[family-name:var(--font-urbanist)]"
          style={{
            fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.6,
            maxWidth: 680,
            margin: '0 auto',
          }}
        >
          Each member of our team brings deep clinical expertise, aligned under
          Dr. Pal&rsquo;s structured approach to metabolic and gut health.
        </p>
      </motion.div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, clamp(200px, calc(435 / 1920 * 100vw), 435px)), 1fr))',
          gap: 'clamp(16px, calc(20 / 1920 * 100vw), 20px)',
          maxWidth: 1800,
          margin: '0 auto',
        }}
      >
        {TEAM.map((member, i) => (
          <TeamCard key={member.name} member={member} index={i} />
        ))}
      </div>
    </section>
  )
}

function TeamCard({
  member,
  index,
}: {
  member: (typeof TEAM)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: EASE, delay: (index % 4) * 0.07 }}
      style={{
        borderRadius: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
        overflow: 'hidden',
        aspectRatio: '435 / 540',
        position: 'relative',
        background: member.color,
      }}
    >
      {/* Placeholder gradient (replace with actual <Image> when photos are ready) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 60% 30%, ${member.color}cc 0%, #013E37 80%)`,
        }}
      />

      {/* Initials — shown while no photo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontSize: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.18)',
            letterSpacing: '0.05em',
            userSelect: 'none',
          }}
        >
          {member.initials}
        </span>
      </div>

      {/* Name + role overlay at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(0deg, rgba(1,62,55,0.96) 0%, rgba(1,62,55,0.70) 60%, rgba(1,62,55,0) 100%)',
          padding: 'clamp(36px, calc(60 / 1920 * 100vw), 60px) clamp(18px, calc(28 / 1920 * 100vw), 28px) clamp(18px, calc(28 / 1920 * 100vw), 28px)',
        }}
      >
        <p
          className="font-[family-name:var(--font-bricolage)] text-white"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(15px, calc(22 / 1920 * 100vw), 22px)',
            lineHeight: 1.2,
            marginBottom: 'clamp(4px, calc(6 / 1920 * 100vw), 6px)',
          }}
        >
          {member.name}
        </p>
        <p
          className="font-[family-name:var(--font-urbanist)]"
          style={{
            fontSize: 'clamp(12px, calc(15 / 1920 * 100vw), 15px)',
            color: 'rgba(255,255,255,0.65)',
            fontWeight: 400,
          }}
        >
          {member.role}
        </p>
      </div>

      {/* Featured badge (CEO card) */}
      {member.featured && (
        <div
          style={{
            position: 'absolute',
            top: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
            right: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
            background: '#FEF272',
            color: '#013E37',
            borderRadius: 9999,
            padding: '4px clamp(10px, calc(14 / 1920 * 100vw), 14px)',
            fontSize: 'clamp(10px, calc(12 / 1920 * 100vw), 12px)',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
          className="font-[family-name:var(--font-bricolage)]"
        >
          Leadership
        </div>
      )}
    </motion.div>
  )
}
