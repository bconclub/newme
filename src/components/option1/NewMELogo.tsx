'use client'

import { motion, MotionValue } from 'framer-motion'

export default function NewMELogo({
  size = 48,
  spinDuration = 18,
  rotateValue,
}: {
  size?: number
  spinDuration?: number
  rotateValue?: MotionValue<number>
}) {
  const iconSize = size

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.04,
        lineHeight: 1,
      }}
      aria-label="Dr. Pal's NewME"
    >
      {/* Spinning favicon — driven by rotateValue when provided, else auto-spins */}
      <motion.img
        src="/favicon.png"
        alt=""
        aria-hidden
        width={iconSize}
        height={iconSize}
        animate={rotateValue ? undefined : { rotate: 360 }}
        transition={rotateValue ? undefined : { duration: spinDuration, ease: 'linear', repeat: Infinity }}
        style={{
          width: iconSize,
          height: iconSize,
          flexShrink: 0,
          display: 'block',
          objectFit: 'contain',
          rotate: rotateValue,
        }}
      />

      {/* Static wordmark */}
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
