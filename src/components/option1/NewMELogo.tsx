'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'

export default function NewMELogo({
  size = 48,
  spinDuration = 18,
}: {
  size?: number
  spinDuration?: number
}) {
  const uid = useId().replace(/:/g, '')
  const iconSize = size * 0.92
  const gradA = `nm-grad-a-${uid}`
  const gradB = `nm-grad-b-${uid}`

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.16,
        lineHeight: 1,
      }}
      aria-label="Dr. Pal's NewME"
    >
      {/* ── Spinning radial icon ─────────────────────────────────── */}
      <motion.svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 80 80"
        fill="none"
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: spinDuration, ease: 'linear', repeat: Infinity }}
        style={{ flexShrink: 0, display: 'block' }}
      >
        <defs>
          <radialGradient id={gradA} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FEF272" />
            <stop offset="55%" stopColor="#FFB347" />
            <stop offset="100%" stopColor="#FF8547" />
          </radialGradient>
          <radialGradient id={gradB} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFD17D" />
            <stop offset="60%" stopColor="#FF9A5C" />
            <stop offset="100%" stopColor="#E86B2B" />
          </radialGradient>
        </defs>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <ellipse
            key={i}
            cx="40"
            cy="14"
            rx="5.2"
            ry="13.5"
            fill={`url(#${i % 2 === 0 ? gradA : gradB})`}
            opacity={0.55 + i * 0.06}
            transform={`rotate(${i * 45} 40 40)`}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}
      </motion.svg>

      {/* ── Static wordmark — real asset ────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/newme-logo-text.webp"
        alt=""
        aria-hidden
        style={{
          height: size,
          width: 'auto',
          display: 'block',
          flexShrink: 0,
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
