'use client'

import { motion } from 'framer-motion'

export default function DrPal() {
  return (
    <section id="care-team" className="relative px-5 sm:px-6 md:px-10 lg:px-16 py-[clamp(56px,8vw,120px)]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[32px] md:rounded-[40px] overflow-hidden"
          style={{
            background:
              'linear-gradient(120deg, #013E37 0%, #114B45 30%, #2A6A5E 65%, #629675 100%)',
          }}
        >
          {/* Radial highlight — softens the right side */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 80% 40%, rgba(180,220,180,0.22) 0%, rgba(0,0,0,0) 55%)',
            }}
          />

          {/* Monotone noise grain — matches Figma effect spec */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.32,
              mixBlendMode: 'multiply',
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              backgroundSize: '180px 180px',
            }}
          />

          <div className="relative grid lg:grid-cols-[0.85fr_1.15fr] gap-0">
            {/* Left — portrait */}
            <div className="relative h-[380px] sm:h-[460px] lg:h-auto min-h-[460px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1200')",
                }}
              />
              {/* Gentle teal tint to blend portrait with card gradient */}
              <div
                className="absolute inset-0 mix-blend-multiply pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(1,62,55,0.05) 0%, rgba(1,62,55,0.22) 100%)',
                }}
              />
            </div>

            {/* Right — copy */}
            <div className="relative p-8 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-center">
              <p className="text-white/85 text-[14px] md:text-[16px] font-[family-name:var(--font-bricolage)] font-light tracking-[0.02em]">
                Meet Dr. Pal
              </p>

              <h2 className="mt-4 font-[family-name:var(--font-bricolage)] font-semibold text-white text-[30px] sm:text-[38px] md:text-[48px] lg:text-[56px] leading-[1.06] tracking-[-0.012em]">
                Clinical Expertise,
                <br />
                Shaped By Real
                <br />
                Experience
              </h2>

              <p className="mt-6 md:mt-8 text-white/90 text-[14.5px] md:text-[16px] leading-[1.6] max-w-[560px] font-[family-name:var(--font-bricolage)] font-light">
                Dr. Pal is a US-based gastroenterologist whose clinical perspective is
                shaped not just by medical training, but by personal experience. Today,
                he leads a system that focuses on restoring metabolic and gut regulation
                through structured care, guided accountability, and consistency over time,
                bringing together clinical insight and real-world application to support
                lasting health.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
