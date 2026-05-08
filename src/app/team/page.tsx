'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

const EASE = [0.22, 1, 0.36, 1] as const

type TeamMember = {
  name: string
  role: string
  photo: string
  bio: string
}

const TEAM: TeamMember[] = [
  {
    name: 'Dr. Palaniappan Manickam',
    role: 'Founder',
    photo: '/images/team/dr-palaniappan.jpg',
    bio: 'A gastroenterologist and metabolic health specialist, Dr. Pal founded NewME to deliver structured, clinical-grade care at scale.',
  },
  {
    name: 'Priya Pal',
    role: 'Co Founder',
    photo: '/images/team/priya-pal.jpg',
    bio: 'Priya co-founded NewME with a mission to make precision clinical care accessible and sustainable for everyone.',
  },
  {
    name: 'Shakeela',
    role: 'CEO',
    photo: '/images/team/shakeela.jpg',
    bio: 'Shakeela oversees operations and system execution across NewME. She brings a deep understanding of both client care and operational efficiency to ensure consistent, measurable outcomes.',
  },
  {
    name: 'Karthik Ravi',
    role: 'Head of Business Operations',
    photo: '/images/team/karthik-ravi.jpg',
    bio: 'Karthik oversees all business and operational functions, ensuring the NewME system runs with precision and efficiency.',
  },
  {
    name: 'Gayatri Rajamani',
    role: 'Head of Clinical Nutrition',
    photo: '/images/team/gayatri-rajamani.jpg',
    bio: "Gayatri leads the clinical nutrition team, designing evidence-based protocols tailored to each participant's metabolic markers.",
  },
  {
    name: 'Reshmi Sinha',
    role: 'Clinical Nutrition Lead',
    photo: '/images/team/reshmi-sinha.jpg',
    bio: 'Reshmi drives the daily nutrition coaching process, translating clinical protocols into personalised, actionable guidance.',
  },
  {
    name: 'Devi Palaniappan',
    role: 'Head of Coaching',
    photo: '/images/team/devi-palaniappan.jpg',
    bio: 'Devi heads the coaching division, ensuring every participant receives structured, compassionate support throughout their pathway.',
  },
  {
    name: 'Namratha Nataraj',
    role: 'Head of Research & QA',
    photo: '/images/team/namratha-nataraj.jpg',
    bio: 'Namratha oversees research integrity and quality assurance, ensuring all NewME protocols are evidence-based and outcomes-driven.',
  },
  {
    name: 'Ashwini Saras',
    role: 'Operation Lead',
    photo: '/images/team/ashwini-saras.jpg',
    bio: 'Ashwini leads day-to-day operational delivery, ensuring seamless coordination between clinical, coaching, and administrative teams.',
  },
  {
    name: 'Dr. Indira. MD, DNB',
    role: 'General Medicine',
    photo: '/images/team/dr-indira.jpg',
    bio: 'Dr. Indira provides general medicine oversight across all clinical pathways, reviewing participant health data and co-ordinating medical care.',
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
          height: 'clamp(320px, calc(694 / 1920 * 100vw), 694px)',
          background: '#0E2827',
        }}
      >
        <div className="absolute inset-0">
          {/* Real /team hero supplied by the client (renamed from
              `Team Hero.webp` → `team-hero.webp` so the URL doesn't need
              percent-encoding and matches the rest of the codebase's
              kebab-case convention). */}
          <Image
            src="/images/team/team-hero.webp"
            alt="NewME clinical care team"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1880px"
            className="object-cover [object-position:50%_center]"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(118deg, #629675 0%, #2F7269 28%, #144F49 52%, #013E37 78%)',
            opacity: 0.93,
            maskImage: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.60) 46%, rgba(0,0,0,0.15) 56%, rgba(0,0,0,0) 64%)',
            WebkitMaskImage: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.60) 46%, rgba(0,0,0,0.15) 56%, rgba(0,0,0,0) 64%)',
          }}
        />
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
            style={{ fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)', color: 'rgba(255,255,255,0.65)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)' }}
          >
            NewME Care Team
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{ fontWeight: 600, fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)', lineHeight: 1.08, letterSpacing: '-0.01em', maxWidth: 'clamp(300px, calc(900 / 1920 * 100vw), 900px)' }}
          >
            Meet The Clinical Team<br />Behind Your Care.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.26 }}
            className="font-[family-name:var(--font-urbanist)] text-white"
            style={{ fontWeight: 400, fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)', lineHeight: 1.6, opacity: 0.82, maxWidth: 'clamp(260px, calc(700 / 1920 * 100vw), 700px)', marginTop: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)' }}
          >
            A multidisciplinary team of doctors, nutritionists, coaches, and researchers — all working inside a single clinical system.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

function TeamGrid() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(60px, calc(100 / 1920 * 100vw), 100px) clamp(20px, calc(60 / 1920 * 100vw), 60px) clamp(80px, calc(140 / 1920 * 100vw), 140px)',
        overflow: 'hidden', // contain the side-glow blobs
      }}
    >
      {/* ── Side-glow washes — soft moss-green ellipses anchored to the left
            and right edges so the team grid sits inside a cone of warm light.
            Per design (Figma 137:1437) the cards should feel framed by glow
            on both sides. Pointer-events:none + aria-hidden so they're purely
            decorative. Mobile floors keep them tasteful when the column count
            collapses. ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '8%',
          left: 'clamp(-260px, calc(-180 / 1920 * 100vw), -120px)',
          width: 'clamp(360px, calc(720 / 1920 * 100vw), 720px)',
          height: 'clamp(360px, calc(720 / 1920 * 100vw), 720px)',
          background:
            'radial-gradient(circle, rgba(98,150,117,0.45) 0%, rgba(47,114,105,0.22) 38%, rgba(1,62,55,0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          right: 'clamp(-260px, calc(-180 / 1920 * 100vw), -120px)',
          width: 'clamp(360px, calc(720 / 1920 * 100vw), 720px)',
          height: 'clamp(360px, calc(720 / 1920 * 100vw), 720px)',
          background:
            'radial-gradient(circle, rgba(98,150,117,0.45) 0%, rgba(47,114,105,0.22) 38%, rgba(1,62,55,0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Inner wrapper lifts the heading + grid above the glow layers. */}
      <div style={{ position: 'relative', zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ textAlign: 'center', marginBottom: 'clamp(40px, calc(72 / 1920 * 100vw), 72px)' }}
      >
        <h2
          className="font-[family-name:var(--font-bricolage)] text-white"
          style={{ fontWeight: 600, fontSize: 'clamp(24px, calc(56 / 1920 * 100vw), 56px)', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)' }}
        >
          The Experts Who Will Guide You.
        </h2>
        <p
          className="font-[family-name:var(--font-urbanist)]"
          style={{ fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 680, margin: '0 auto' }}
        >
          Each member of our team brings deep clinical expertise, aligned under Dr. Pal&rsquo;s structured approach to metabolic and gut health.
        </p>
      </motion.div>

      {/* 4 columns at xl (1280px+), 3 at lg, 2 at sm/md */}
      <div
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        style={{ gap: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)', maxWidth: 1800, margin: '0 auto' }}
      >
        {TEAM.map((member, i) => (
          <TeamCard key={member.name} member={member} index={i} />
        ))}
      </div>
      </div>
    </section>
  )
}

// ─── Social icons (inline SVG, white/muted; sized fluidly so they
//     shrink to ~14px on mobile cards and grow to 20px at desktop). ─────────
function SocialIcons() {
  const size = 'clamp(14px, calc(20 / 1920 * 100vw), 20px)'
  const gap = 'clamp(8px, calc(14 / 1920 * 100vw), 14px)'
  return (
    <div style={{ display: 'flex', gap, alignItems: 'center' }}>
      {/* Facebook */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="rgba(255,255,255,0.75)" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
      {/* X */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="rgba(255,255,255,0.75)" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      {/* Instagram */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
      {/* LinkedIn */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="rgba(255,255,255,0.75)" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    </div>
  )
}

// ─── Card — photo always visible; on hover an INSET dark-green panel
//     slides in revealing name (gold) + role + bio + social icons,
//     left-aligned. Figma 122:11461..85. The photo edges show as a thin
//     "frame" around the inset panel — Figma 122:11477 (Shakeela option 2)
//     shows the outer image at 770×650 with the inner panel at 419×524,
//     which works out to ~30px inset from the larger panel size. We use a
//     fluid clamp() so the inset scales with viewport. ─────────────────────
function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [canHover, setCanHover] = useState(true)

  // Detect hover-capable device. On touch devices `onMouseEnter` fires on
  // tap but `onMouseLeave` only fires on tap-elsewhere — that left cards
  // permanently stuck in hover state on mobile. We disable the hover/tap
  // panel entirely when there's no fine pointer + hover capability and
  // instead show a simple name/role pill at the bottom of the photo.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const apply = () => setCanHover(mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  // Trigger model:
  //   • Desktop / hover-capable → mouseenter / mouseleave toggles `hovered`.
  //   • Mobile / touch          → onClick toggles `hovered` (tap to reveal,
  //                                 tap again to dismiss). The panel is
  //                                 hidden by default on mobile, same as
  //                                 desktop — only the trigger differs.
  const showPanel = hovered

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: EASE, delay: (index % 4) * 0.07 }}
      onMouseEnter={canHover ? () => setHovered(true) : undefined}
      onMouseLeave={canHover ? () => setHovered(false) : undefined}
      onClick={!canHover ? () => setHovered((p) => !p) : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden',
        // Bumped from 24 → 36 (Figma 137:1437) — the cards read as more
        // "soft pebble" than rectangle; matches the new design's curvature.
        borderRadius: 'clamp(20px, calc(36 / 1920 * 100vw), 36px)',
        aspectRatio: '435 / 540',
        background: '#013E37',
        cursor: canHover ? 'default' : 'pointer',
      }}
    >
      {/* ── PHOTO LAYER — always visible. Darkens when the inset panel
            is showing so the panel reads cleanly against it as a frame. ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transition: 'transform 0.6s ease, filter 0.45s ease',
          transform: showPanel ? 'scale(1.04)' : 'scale(1)',
          filter: showPanel ? 'brightness(0.55)' : 'brightness(1)',
          pointerEvents: 'none',
        }}
      >
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* ── DEFAULT-STATE NAME PILL — anchored to bottom of card. Always
            visible (both desktop + mobile) per Figma 122:11470/11471 so the
            person's name is readable without hover/click. Hidden when the
            full inset panel slides in (it duplicates the same info plus bio). */}
      <motion.div
        initial={false}
        animate={{ opacity: showPanel ? 0 : 1, y: showPanel ? 6 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{
          position: 'absolute',
          left: 'clamp(8px, calc(12 / 1920 * 100vw), 14px)',
          right: 'clamp(8px, calc(12 / 1920 * 100vw), 14px)',
          bottom: 'clamp(8px, calc(12 / 1920 * 100vw), 14px)',
          background: '#013E37',
          // Bumped to match the new outer curve — was 14, now 22.
          borderRadius: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
          padding: 'clamp(10px, calc(16 / 1920 * 100vw), 18px) clamp(12px, calc(20 / 1920 * 100vw), 22px)',
          pointerEvents: showPanel ? 'none' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <p
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 22px)',
            color: '#FEF272',
            lineHeight: 1.15,
            letterSpacing: '-0.005em',
          }}
        >
          {member.name}
        </p>
        <p
          className="font-[family-name:var(--font-urbanist)] text-white"
          style={{
            fontSize: 'clamp(10px, calc(13 / 1920 * 100vw), 14px)',
            fontWeight: 500,
            opacity: 0.85,
            letterSpacing: '0.01em',
          }}
        >
          {member.role}
        </p>
      </motion.div>

      {/* ── INSET DARK-GREEN PANEL — same component, two trigger modes:
            • Desktop: hidden by default, fades in on hover.
            • Mobile / touch: always visible (no hover available).
            Content (name → role → bio → social icons) is identical and
            left-aligned per Figma 122:11461..85. */}
      <motion.div
        initial={false}
        animate={{
          opacity: showPanel ? 1 : 0,
          scale: showPanel ? 1 : 1.05,
        }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          position: 'absolute',
          inset: 'clamp(8px, calc(20 / 435 * 100%), 22px)',
          background: '#013E37',
          // Inset panel bumped from 18 → 28 to keep it visually nested at
          // the new 36 outer curve.
          borderRadius: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
          padding: 'clamp(12px, calc(28 / 1920 * 100vw), 30px)',
          pointerEvents: showPanel ? 'auto' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(4px, calc(8 / 1920 * 100vw), 10px)',
          boxShadow: '0 18px 32px -16px rgba(0,0,0,0.45)',
          overflow: 'hidden',
        }}
      >
        <p
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontWeight: 500,
            // Floor 14 (was 20) — names like "Dr. Palaniappan Manickam"
            // wrapped to 3 lines and ate half the panel on mobile.
            fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 30px)',
            color: '#FEF272',
            lineHeight: 1.1,
            letterSpacing: '-0.005em',
          }}
        >
          {member.name}
        </p>
        <p
          className="font-[family-name:var(--font-urbanist)] text-white"
          style={{
            fontSize: 'clamp(10px, calc(14 / 1920 * 100vw), 15px)',
            fontWeight: 500,
            opacity: 0.92,
            letterSpacing: '0.02em',
          }}
        >
          {member.role}
        </p>
        {/* Bio gets line-clamped on small panels so it doesn't crash into
            the social icons row (the bios are 1-3 sentences each — long
            enough to overflow a 150px-wide mobile card). */}
        <p
          className="font-[family-name:var(--font-urbanist)] text-white"
          style={{
            fontSize: 'clamp(10px, calc(13 / 1920 * 100vw), 14px)',
            fontWeight: 400,
            lineHeight: 1.5,
            opacity: 0.72,
            marginTop: 'clamp(2px, calc(6 / 1920 * 100vw), 8px)',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 6,
            overflow: 'hidden',
            minHeight: 0,
          }}
        >
          {member.bio}
        </p>
        <div style={{ marginTop: 'auto', paddingTop: 'clamp(6px, calc(14 / 1920 * 100vw), 16px)' }}>
          <SocialIcons />
        </div>
      </motion.div>
    </motion.div>
  )
}
