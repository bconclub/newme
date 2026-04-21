'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'Within eight weeks my HbA1c moved from 8.2 to 6.1. The weekly clinician reviews kept me honest.',
    name: 'Anita R.',
    meta: 'Bengaluru · 42',
    avatar:
      'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    quote:
      'Finally a plan that reads my gut instead of guessing. The food-trigger map alone was worth it.',
    name: 'Rohit M.',
    meta: 'Chennai · 38',
    avatar:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    quote:
      'Lost 11 kg, kept it off for a year, and my inflammation markers are back to normal.',
    name: 'Priya S.',
    meta: 'Hyderabad · 34',
    avatar:
      'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
]

const ratings = [
  { score: '4.6', label: 'Google Reviews' },
  { score: '4.7', label: 'Trustpilot' },
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="newme-testimonials newme-section relative px-5 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 items-end">
          <div>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.14em] text-white/70 font-[family-name:var(--font-urbanist)]">
              Outcomes
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-bricolage)] font-semibold text-white text-[28px] sm:text-[32px] md:text-[44px] leading-[1.1] md:leading-[1.08] tracking-[-0.01em]">
              Real Patients,
              <br />
              <span className="text-[#FEF272]">Real Experiences.</span>
            </h2>
          </div>
          <p className="text-white/70 text-[14.5px] md:text-[15px] leading-[1.6] max-w-[520px] md:justify-self-end font-[family-name:var(--font-poppins)]">
            Stories from people who used NewME to measurably change the way
            their body behaves.
          </p>
        </div>

        <div className="mt-10 md:mt-12 grid md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-[20px] bg-[#0A4A45] border border-white/10 p-5 md:p-6"
            >
              <p className="text-[#FEF272] text-lg leading-none">★★★★★</p>
              <p className="mt-4 text-white/90 text-[14.5px] leading-[1.6] font-[family-name:var(--font-poppins)]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${t.avatar}')` }}
                />
                <div>
                  <p className="text-white text-[13.5px] font-semibold font-[family-name:var(--font-bricolage)] leading-none">
                    {t.name}
                  </p>
                  <p className="text-white/60 text-[11.5px] mt-1 font-[family-name:var(--font-poppins)]">
                    {t.meta}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ratings row */}
        <div className="mt-10 md:mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 max-w-[720px] mx-auto">
          {ratings.map((r) => (
            <div
              key={r.label}
              className="rounded-[18px] md:rounded-[20px] bg-[#FEF272] text-[#043C39] px-4 py-4 sm:px-5 sm:py-5 md:px-6 flex items-center gap-3 md:gap-4"
            >
              <p className="text-[32px] sm:text-[40px] md:text-[48px] leading-none font-semibold font-[family-name:var(--font-bricolage)]">
                {r.score}
              </p>
              <div className="min-w-0">
                <p className="text-base md:text-lg leading-none tracking-wide">★★★★★</p>
                <p className="mt-1.5 md:mt-2 text-[12px] md:text-[13px] font-medium font-[family-name:var(--font-urbanist)]">
                  {r.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
