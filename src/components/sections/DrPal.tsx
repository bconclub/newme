'use client'

import { motion } from 'framer-motion'

export default function DrPal() {
  return (
    <section
      id="care-team"
      className="newme-drpal newme-section relative px-5 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-10 lg:gap-16 items-center">
        {/* Left — portrait card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative rounded-[20px] md:rounded-[24px] overflow-hidden aspect-[4/5] max-w-[440px] mx-auto lg:mx-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1200')",
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,60,57,0.1)_0%,rgba(4,60,57,0.55)_100%)]" />
            <div className="absolute left-4 bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2.5">
              <p className="text-white text-[13px] font-medium font-[family-name:var(--font-bricolage)]">
                Dr. Palaniappan Manickam
              </p>
              <p className="text-white/65 text-[11px] font-[family-name:var(--font-poppins)]">
                Gastroenterologist · 15+ yrs
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right — copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.14em] text-white/70 font-[family-name:var(--font-urbanist)]">
            Meet Dr. Pal
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-bricolage)] font-semibold text-white text-[26px] sm:text-[30px] md:text-[40px] lg:text-[48px] leading-[1.12] md:leading-[1.08] tracking-[-0.01em]">
            Clinical Expertise,
            <br />
            Shaped By <span className="text-[#FEF272]">Real Experiences.</span>
          </h2>
          <p className="mt-5 text-white/75 text-[15px] md:text-[16px] leading-[1.6] max-w-[560px] font-[family-name:var(--font-poppins)]">
            Dr. Pal has spent over fifteen years helping patients navigate
            chronic metabolic and gut conditions. NewME distills that
            first-hand clinical experience into a structured, measurable
            program.
          </p>
          <p className="mt-4 text-white/65 text-[14px] leading-[1.6] max-w-[560px] font-[family-name:var(--font-poppins)]">
            Every protocol inside NewME is rooted in bedside observation, peer
            reviewed science, and outcomes tracked across thousands of real
            clients.
          </p>

          <a
            href="#pathways"
            className="mt-7 inline-flex items-center gap-2 text-[#FEF272] hover:text-[#FFF8B8] text-[14px] font-semibold font-[family-name:var(--font-urbanist)] transition-colors"
          >
            Explore the pathways
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
