'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'Structured care produces measurable, sustained outcomes. These are not before-and-after stories. They are accounts of bodies returning to regulation.',
    name: 'Prasanna Kumar',
    meta: 'Bengaluru, Karnataka',
    avatar:
      'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    quote:
      'I began the NewME program in April 2025 weighing around 159 pounds, with other health issues like high cholesterol and high blood pressure. Today I am at 143 pounds and my triglycerides are in the normal range.',
    name: 'Abitha Chittilla',
    meta: 'Bengaluru, Karnataka',
    avatar:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    quote:
      'After 3 months of joining NewMe, my A1C has dropped from 6 to 5.7 and my hemoglobin level has improved from 9.9 to 13.4. My weight has also reduced from 125 lbs to 116 lbs. I have extended my program for another 3 months to maintain the healthy habits that I have learned.',
    name: 'Manjari',
    meta: 'Bengaluru, Karnataka',
    avatar:
      'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
]

const ratings = [
  { score: '4.6', label: 'Patient Satisfaction on Trustpilot' },
  { score: '4.7', label: 'Program Completion Rate' },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative px-5 sm:px-6 md:px-10 lg:px-16 py-[clamp(56px,8vw,120px)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.14em] text-white/70 font-[family-name:var(--font-urbanist)]"
            >
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-[family-name:var(--font-bricolage)] font-semibold text-white text-[28px] sm:text-[32px] md:text-[44px] leading-[1.1] md:leading-[1.08] tracking-[-0.01em]"
            >
              Real Patients.
              <br />
              <span className="text-[#FEF272]">Real Experiences.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/70 text-[14.5px] md:text-[15px] leading-[1.6] max-w-[520px] md:justify-self-end font-[family-name:var(--font-poppins)]"
          >
            Structured care produces measurable, sustained outcomes. These are not
            before-and-after stories. They are accounts of bodies returning to regulation.
          </motion.p>
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
