'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionHeader } from './Programs'

const ease = [0.22, 1, 0.36, 1] as const

const items = [
  {
    title: '"I feel that I have really discovered my NewME',
    body:
      "Hi..I started my weight loss journey in July 2023. I was weighing 82.3 kgs then. Randomly, I bumped into one of Dr Pal's you tube videos and immediately got hooked on to his channel. Thereafter, got addicted/inspired with the various you tube videos.",
    name: 'Kishore Raviprolu',
    location: 'Bangalore, Karnataka',
  },
  {
    title: '"The program gave my life structure again"',
    body:
      'The coaching and the weekly lab reviews gave me the accountability I lacked. In four months I have reversed my pre-diabetic markers and my sleep is finally consistent.',
    name: 'Aparna Menon',
    location: 'Chennai, Tamil Nadu',
  },
  {
    title: '"More than a weight-loss program"',
    body:
      'The focus on gut health and the root cause made this different from any program I had tried. The team is patient and genuinely invested in the outcome.',
    name: 'Rohit Shinde',
    location: 'Pune, Maharashtra',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14">
        <SectionHeader eyebrow="Testimonials" />

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
            className="font-[family-name:var(--font-bricolage)] font-semibold text-[42px] md:text-[64px] leading-[1.02] tracking-[-0.012em] max-w-[560px]"
          >
            What our users say about us!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
            className="text-[#444] text-[16px] md:text-[18px] leading-[1.5] font-[family-name:var(--font-bricolage)] font-light max-w-[520px]"
          >
            Read the experiences of users who have participated in the NewME
            program and transformed their lives.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {items.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="relative rounded-[24px] bg-[#F3F3F3] p-7 md:p-8 overflow-hidden"
            >
              <Image
                src="/swirl-cream.png"
                alt=""
                aria-hidden
                width={300}
                height={300}
                className="absolute -bottom-6 -right-6 w-[170px] h-[170px] opacity-40"
              />
              <span className="absolute bottom-6 right-8 text-black text-[80px] leading-none font-[family-name:var(--font-bricolage)] font-semibold pointer-events-none">
                &rdquo;
              </span>

              <p className="relative font-[family-name:var(--font-bricolage)] font-medium text-[17px] md:text-[18px] text-black leading-snug">
                {t.title}
              </p>
              <p className="relative mt-4 text-[#444] text-[14.5px] leading-[1.55] font-[family-name:var(--font-bricolage)] font-light line-clamp-6">
                {t.body}
              </p>

              <div className="relative mt-8 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-black shrink-0" />
                <div>
                  <p className="font-[family-name:var(--font-bricolage)] font-semibold text-[15px] text-black">
                    {t.name}
                  </p>
                  <p className="text-[#666] text-[13px] font-[family-name:var(--font-urbanist)]">
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
