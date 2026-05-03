interface AboutSectionProps {
  aboutText: string;
}

export default function AboutSection({ aboutText }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[128px]" />
        <div className="absolute inset-0 pattern-overlay" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 text-sm font-semibold text-amber-400 bg-amber-500/10 rounded-full mb-4 tracking-wide uppercase border border-amber-500/20">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
              Building <span className="text-amber-400">Dreams</span> Into Reality
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-slate-400 text-lg leading-relaxed whitespace-pre-line">
              {aboutText}
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Licensed & Insured", "On-Time Delivery", "Premium Materials", "24/7 Support"].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full accent-gradient flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-white/10 p-8 flex flex-col justify-between">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-2xl accent-gradient flex items-center justify-center mb-6 shadow-2xl shadow-amber-500/20">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Excellence in Every Detail
                  </h3>
                  <p className="text-slate-400 text-sm">Quality construction that stands the test of time</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                {[{ value: "A+", label: "Safety" }, { value: "ISO", label: "Certified" }, { value: "#1", label: "In Region" }].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-lg font-bold text-amber-400">{s.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
