'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

const EASE = [0.22, 1, 0.36, 1] as const

type TeamMember = {
  name: string
  role: string
  photo: string
  special?: boolean
  bio?: string
}

const TEAM: TeamMember[] = [
  // Row 1 — Leadership
  {
    name: 'Dr. Palaniappan Manickam',
    role: 'Founder',
    photo: '/images/team/dr-palaniappan.jpg',
  },
  {
    name: 'Priya Pal',
    role: 'Co Founder',
    photo: '/images/team/priya-pal.jpg',
  },
  {
    name: 'Shakeela',
    role: 'CEO',
    photo: '/images/team/shakeela.jpg',
    special: true,
    bio: 'Shakeela oversees operations and system execution across NewME. She brings a deep understanding of both client care and operational efficiency to ensure consistent, measurable outcomes.',
  },
  {
    name: 'Karthik Ravi',
    role: 'Head of Business Operations',
    photo: '/images/team/karthik-ravi.jpg',
  },
  // Row 2 — Clinical
  {
    name: 'Gayatri Rajamani',
    role: 'Head of Clinical Nutrition',
    photo: '/images/team/gayatri-rajamani.jpg',
  },
  {
    name: 'Reshmi Sinha',
    role: 'Clinical Nutrition Lead',
    photo: '/images/team/reshmi-sinha.jpg',
  },
  {
    name: 'Devi Palaniappan',
    role: 'Head of Coaching',
    photo: '/images/team/devi-palaniappan.jpg',
  },
  {
    name: 'Namratha Nataraj',
    role: 'Head of Research & QA',
    photo: '/images/team/namratha-nataraj.jpg',
  },
  // Row 3 — Specialists
  {
    name: 'Ashwini Saras',
    role: 'Operation Lead',
    photo: '/images/team/ashwini-saras.jpg',
  },
  {
    name: 'Dr. Indira. MD, DNB',
    role: 'General Medicine',
    photo: '/images/team/dr-indira.jpg',
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
// Hero — Figma 122:10180
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

        {/* Pine gradient wash */}
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
            padding:
              'clamp(24px, calc(60 / 1920 * 100vw), 60px) clamp(24px, calc(120 / 1920 * 100vw), 120px) clamp(48px, calc(88 / 1920 * 100vw), 88px)',
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
            Meet The Clinical Team
            <br />
            Behind Your Care.
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
// Team grid
// ─────────────────────────────────────────────────────────────────────────────
function TeamGrid() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 1,
        padding:
          'clamp(60px, calc(100 / 1920 * 100vw), 100px) clamp(20px, calc(60 / 1920 * 100vw), 60px) clamp(80px, calc(140 / 1920 * 100vw), 140px)',
      }}
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(40px, calc(72 / 1920 * 100vw), 72px)',
        }}
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
          gridTemplateColumns:
            'repeat(auto-fill, minmax(min(100%, clamp(200px, calc(435 / 1920 * 100vw), 435px)), 1fr))',
          gap: 'clamp(16px, calc(20 / 1920 * 100vw), 20px)',
          maxWidth: 1800,
          margin: '0 auto',
        }}
      >
        {TEAM.map((member, i) =>
          member.special ? (
            <ShakeelaCard key={member.name} member={member} index={i} />
          ) : (
            <TeamCard key={member.name} member={member} index={i} />
          )
        )}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Standard photo card — photo fills card, dark pill overlay at bottom
// ─────────────────────────────────────────────────────────────────────────────
function TeamCard({
  member,
  index,
}: {
  member: TeamMember
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
        background: '#013E37',
      }}
    >
      {/* Photo */}
      <Image
        src={member.photo}
        alt={member.name}
        fill
        className="object-cover object-top"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />

      {/* Subtle gradient at bottom for better contrast */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '50% 0 0 0',
          background:
            'linear-gradient(0deg, rgba(1,62,55,0.55) 0%, rgba(1,62,55,0) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Name + role pill at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(8px, calc(12 / 1920 * 100vw), 12px)',
          left: 'clamp(8px, calc(12 / 1920 * 100vw), 12px)',
          right: 'clamp(8px, calc(12 / 1920 * 100vw), 12px)',
          background: '#013E37',
          borderRadius: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
          padding:
            'clamp(12px, calc(18 / 1920 * 100vw), 18px) clamp(16px, calc(24 / 1920 * 100vw), 24px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(3px, calc(5 / 1920 * 100vw), 5px)',
        }}
      >
        <p
          className="font-[family-name:var(--font-bricolage)] text-white"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(13px, calc(22 / 1920 * 100vw), 22px)',
            lineHeight: 1.2,
          }}
        >
          {member.name}
        </p>
        <p
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontSize: 'clamp(11px, calc(16 / 1920 * 100vw), 16px)',
            color: 'rgba(255,255,255,0.65)',
            fontWeight: 400,
            lineHeight: 1.3,
          }}
        >
          {member.role}
        </p>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Shakeela special card — dark bg, photo right side, text + bio + social left
// ─────────────────────────────────────────────────────────────────────────────
function ShakeelaCard({
  member,
  index,
}: {
  member: TeamMember
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
        background: '#013E37',
      }}
    >
      {/* Photo — right side, shows through dark bg */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '70%',
          height: '100%',
        }}
      >
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 18vw"
        />
      </div>

      {/* Left-to-right dark fade so text stays readable */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(95deg, #013E37 42%, rgba(1,62,55,0.80) 62%, rgba(1,62,55,0.15) 80%, rgba(1,62,55,0) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding:
            'clamp(20px, calc(32 / 1920 * 100vw), 32px) clamp(20px, calc(28 / 1920 * 100vw), 28px)',
        }}
      >
        <div>
          {/* Yellow name */}
          <p
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
              color: '#FEF272',
              lineHeight: 1.2,
              marginBottom: 'clamp(4px, calc(6 / 1920 * 100vw), 6px)',
            }}
          >
            {member.name}
          </p>

          {/* White role */}
          <p
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontSize: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
              fontWeight: 400,
              marginBottom: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
              opacity: 0.90,
            }}
          >
            {member.role}
          </p>

          {/* Bio text */}
          {member.bio && (
            <p
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontSize: 'clamp(10px, calc(15 / 1920 * 100vw), 15px)',
                fontWeight: 400,
                lineHeight: 1.65,
                opacity: 0.80,
                maxWidth: '75%',
              }}
            >
              {member.bio}
            </p>
          )}
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)', alignItems: 'center' }}>
          {/* Facebook */}
          <a href="#" aria-label="Facebook" style={{ color: 'rgba(255,255,255,0.70)', transition: 'color 0.2s' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          {/* X / Twitter */}
          <a href="#" aria-label="X / Twitter" style={{ color: 'rgba(255,255,255,0.70)', transition: 'color 0.2s' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* Instagram */}
          <a href="#" aria-label="Instagram" style={{ color: 'rgba(255,255,255,0.70)', transition: 'color 0.2s' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="#" aria-label="LinkedIn" style={{ color: 'rgba(255,255,255,0.70)', transition: 'color 0.2s' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
