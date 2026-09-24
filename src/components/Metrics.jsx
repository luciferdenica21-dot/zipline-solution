const metrics = [
  { num: '10+', unit: 'Years', desc: 'Engineering & safety audit experience' },
  { num: '12+', unit: 'Ziplines', desc: 'High-speed tracks exceeding 300 meters' },
  { num: '15', unit: 'Ropes Courses', desc: 'Built on natural trees and artificial towers' },
  { num: '2', unit: 'Cable Bridges', desc: 'Suspended spans up to 125 meters each' },
  { num: '4', unit: 'Climbing Walls', desc: 'Custom technical complexity' },
]

const standards = [
  {
    title: 'Structural Engineering',
    body:
      'Full lifecycle execution — structural steel, concrete foundations, timber processing, and chief installation oversight.',
    tags: ['FEM', 'DIN 18800', 'Eurocode 3'],
  },
  {
    title: 'Compliance',
    body:
      'Certified engineering strictly mapped to EN 15567, GOST, and international safety protocols.',
    tags: ['EN 15567', 'GOST', 'CE Marking'],
  },
  {
    title: 'Zipstop Systems',
    body:
      'Deep technical expertise in installing, tuning, and servicing magnetic braking systems.',
    tags: ['Zipstop', 'Magnetic Braking', 'Commissioning'],
  },
]

export default function Metrics() {
  return (
    <section
      id="metrics"
      className="relative w-full bg-ink-950 py-24 md:py-32"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      ></div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-2">
            <div className="label-up !text-safety-500">§ 03 / Track Record</div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <div className="flex items-center gap-5 mb-8 md:mb-10">
              <div className="h-px flex-1 bg-white/10"></div>
              <span className="label-up">Delivered & Audited</span>
            </div>
            <h2 className="font-display tracking-[-0.02em] leading-[0.9] text-[12vw] md:text-[6.8vw] lg:text-[88px] xl:text-[104px]">
              Completed Projects &amp; <br className="hidden md:block" />
              <span className="text-safety-500">Technical Competencies</span>
            </h2>
          </div>
        </div>

        {/* Metric grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 border-t border-l border-white/10 mb-16 md:mb-24">
          {metrics.map((m, i, arr) => (
            <div
              key={m.unit}
              className={`relative p-7 md:p-9 border-r border-b border-white/10 group ${
                i === 0 ? 'bg-safety-500/[0.03]' : ''
              }`}
            >
              <div className="label-up !text-[10px] text-white/40 mb-5">
                {String(i + 1).padStart(2, '0')} / 05
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display text-[64px] md:text-[80px] lg:text-[92px] leading-[0.9] tracking-[-0.02em] text-white">
                  {m.num}
                </span>
              </div>
              <div className="font-display text-[18px] md:text-[20px] tracking-[0.04em] text-safety-500 mb-3">
                {m.unit.toUpperCase()}
              </div>
              <div className="h-px w-8 bg-white/20 mb-3 transition-all group-hover:w-12 group-hover:bg-safety-500"></div>
              <p className="text-[13px] leading-[1.6] text-white/55">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Technical standards sub-grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
          <div className="col-span-12 md:col-span-3">
            <div className="label-up !text-safety-500 mb-4">Standards</div>
            <h3 className="font-display text-[38px] md:text-[46px] lg:text-[52px] leading-[0.95] tracking-[-0.01em] mb-5">
              Technical <br />
              <span className="text-white/40">Standards.</span>
            </h3>
            <p className="text-[13.5px] leading-[1.7] text-white/50">
              Every calculation, drawing, and installation is produced under
              certified engineering workflows and auditable traceability.
            </p>
          </div>
          <div className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10">
            {standards.map((s, i, arr) => (
              <div
                key={s.title}
                className={`p-7 md:p-8 border-r border-b border-white/10`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="label-up !text-[10px] text-white/40">
                    0{i + 1}
                  </span>
                  <div className="w-8 h-px bg-white/15"></div>
                </div>
                <h4 className="font-display text-[24px] md:text-[26px] leading-[1] tracking-[-0.005em] mb-5">
                  {s.title}
                </h4>
                <div className="w-10 h-px bg-safety-500 mb-5"></div>
                <p className="text-[14px] leading-[1.7] text-white/65 mb-7">
                  {s.body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="label-up !text-[10px] !tracking-[0.16em] px-2.5 py-1.5 border border-white/10 text-white/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
