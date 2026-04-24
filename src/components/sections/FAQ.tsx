'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from './Programs'

const ease = [0.22, 1, 0.36, 1] as const

const faqs = [
  {
    q: 'Will NewME require me to take any medications for my lifestyle disorder?',
    a: 'No. NewME is a doctor-led, functional medicine program. Medications are only considered if clinically necessary — we focus on reversing root causes through diet, movement, sleep, stress and lab-guided interventions.',
  },
  {
    q: 'How long do I have to stay on the program?',
    a: 'Depending on your health history and your health or weight goals, the program can vary from a minimum of three months up to a year. Your physician will recommend the right duration during the first review.',
  },
  {
    q: 'Will you be giving me a diet chart or weekly meal plan?',
    a: 'Yes. Every member gets a personalised plan based on labs, lifestyle and preferences, reviewed and updated by your health coach.',
  },
  {
    q: 'How much does the NewME program cost?',
    a: 'Pricing depends on the program you pick (PCOS, Gut Healing, Metabolic Reset or Longevity Labs). Book an introductory call and we will send a full breakdown — no hidden fees.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14">
        <SectionHeader eyebrow="FAQ" />

        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left column: heading + copy + side card */}
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease }}
              className="font-[family-name:var(--font-bricolage)] font-semibold text-[40px] md:text-[56px] leading-[1.04] tracking-[-0.012em]"
            >
              Frequently Asked
              <br />
              Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              className="mt-6 text-[#444] text-[15px] leading-[1.65] font-[family-name:var(--font-bricolage)] font-light max-w-[460px]"
            >
              Root cause functional medicine to resolve your underlying symptoms
              and optimize for lasting health. Sign up for our Complete Care
              program, or start with advanced Longevity Labs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              className="relative mt-10 rounded-[24px] bg-[#EDEDED] p-7 md:p-8 overflow-hidden"
            >
              <Image
                src="/swirl-cream.png"
                alt=""
                aria-hidden
                width={400}
                height={400}
                className="absolute -bottom-10 -right-10 w-[220px] h-[220px] opacity-60"
              />
              <h3 className="relative font-[family-name:var(--font-bricolage)] font-semibold text-[22px] md:text-[24px] text-black">
                Still have questions?
              </h3>
              <p className="relative mt-3 text-[#444] text-[14.5px] leading-[1.55] font-[family-name:var(--font-bricolage)] font-light max-w-[360px]">
                Can&apos;t find the answer to your question? Send us an email
                and we&apos;ll get back to you as soon as possible.
              </p>
              <a
                href="#enroll"
                className="relative mt-6 inline-flex items-center justify-center bg-white text-black rounded-full px-6 py-3 text-[14.5px] font-[family-name:var(--font-poppins)] hover:bg-black hover:text-white transition-colors"
              >
                Ask a Question
              </a>
            </motion.div>
          </div>

          {/* Right column: accordion */}
          <div className="lg:col-span-7">
            <ul className="divide-y divide-black/10 border-t border-black/10">
              {faqs.map((f, i) => {
                const isOpen = open === i
                return (
                  <li key={f.q}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full py-6 md:py-7 flex items-start justify-between gap-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-[family-name:var(--font-bricolage)] font-medium text-[17px] md:text-[19px] text-black leading-snug max-w-[560px]">
                        {f.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease }}
                        className="shrink-0 w-9 h-9 rounded-full border border-black/20 flex items-center justify-center text-black"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 md:pb-7 pr-14 text-[#444] text-[15px] leading-[1.65] font-[family-name:var(--font-bricolage)] font-light max-w-[640px]">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
