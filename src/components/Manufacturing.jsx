const cards = [
  {
    k: 'A — 01',
    title: 'Equipment Design',
    body:
      'Engineering custom trolleys, harnesses, clamps, and safety nodes with strict safety factor calculations.',
    bullets: [
      'Trolley kinematics & wheel geometry',
      'Load-tested harness & clamp assemblies',
      'Safety factor ≥ 5:1 on critical nodes',
    ],
    meta: 'CAD · FEA · Certification',
  },
  {
    k: 'B — 02',
    title: 'Contract Production',
    body:
      'Direct manufacturing management with specialized overseas foundries, precise alloy selection, and stress testing.',
    bullets: [
      'Alloy 6061-T6 / 7075 & stainless 316L',
      'Overseas foundry QC & batch traceability',
      'Destructive / non-destructive testing',
    ],
    meta: 'OEM · ODM · Batch QC',
  },
  {
    k: 'C — 03',
    title: 'Component Integration',
    body:
      'Direct technical cooperation with global manufacturers to secure optimal pricing and custom spec modifications.',
    bullets: [
      'Zipstop, Trollley, PETZL integration',
      'Non-standard spec modifications',
      'Consolidated logistics & pricing',
    ],
    meta: 'Supply Chain · Procurement',
  },
]

export default function Manufacturing() {
  return (
    <section
      id="manufacturing"
      className="relative w-full bg-ink-850 py-24 md:py-32 border-t border-b border-white/5"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-2">
            <div className="label-up !text-safety-500">§ 04 / Production</div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <div className="flex items-center gap-5 mb-8 md:mb-10">
              <div className="h-px flex-1 bg-white/10"></div>
              <span className="label-up">OEM · ODM · Prototyping</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
              <h2 className="lg:col-span-8 font-display tracking-[-0.02em] leading-[0.9] text-[12vw] md:text-[6.8vw] lg:text-[88px] xl:text-[104px]">
                Prototyping &amp; <br />
                <span className="text-safety-500">OEM / ODM Manufacturing</span>
              </h2>
              <p className="lg:col-span-4 text-[14.5px] leading-[1.7] text-white/60 mb-2">
                From first-principles R&amp;D to volume production. Every
                component engineered to survive 10,000+ operating cycles under
                audited loads.
              </p>
            </div>
          </div>
        </div>

        {/* 3-column card layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10">
          {cards.map((c, i, arr) => (
            <article
              key={c.k}
              className={`relative group flex flex-col border-r border-b border-white/10 bg-ink-900/40 hover:bg-ink-900/80 transition-colors`}
            >
              {/* Label */}
              <div className="flex items-center justify-between px-7 md:px-8 py-5 hairline-b">
                <span className="label-up !text-safety-500 !tracking-[0.25em]">
                  {c.k}
                </span>
                <span className="label-up !text-[10px] text-white/40">
                  {c.meta}
                </span>
              </div>

              {/* Content */}
              <div className="p-7 md:p-8 md:pt-9 flex-1 flex flex-col">
                <h3 className="font-display text-[34px] md:text-[40px] lg:text-[44px] leading-[0.95] tracking-[-0.01em] mb-6">
                  {c.title}
                </h3>

                <div className="w-12 h-px bg-safety-500 mb-7"></div>

                <p className="text-[14.5px] leading-[1.7] text-white/65 mb-8">
                  {c.body}
                </p>

                <ul className="space-y-3 mb-10">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-4 text-[13.5px] text-white/70 leading-[1.55]"
                    >
                      <span className="mt-[8px] shrink-0 w-2 h-px bg-safety-500 inline-block"></span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7 hairline-t flex items-center justify-between">
                  <span className="label-up !text-[10px] text-white/35">
                    Datasheet available
                  </span>
                  <span className="inline-flex items-center gap-2 label-up !text-[11px] text-white/60 group-hover:text-safety-500 transition-colors">
                    SPECS
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 13L13 3M13 3H6M13 3v7" strokeLinecap="square"/>
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
