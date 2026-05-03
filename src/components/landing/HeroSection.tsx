interface HeroSectionProps {
  heroTitle: string;
  heroSubtitle: string;
}

export default function HeroSection({ heroTitle, heroSubtitle }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[128px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        {/* Dot Pattern */}
        <div className="absolute inset-0 pattern-overlay" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900" />
      </div>

      {/* Decorative Construction Elements */}
      <div className="absolute top-20 right-10 opacity-10 hidden lg:block">
        <svg className="w-64 h-64 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-sm font-medium tracking-wide">
              20+ Years of Excellence
            </span>
          </div>

          {/* Title */}
          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif", opacity: 0 }}>
            {heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mb-10"
             style={{ opacity: 0 }}>
            {heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4" style={{ opacity: 0 }}>
            <a
              href="#contact"
              className="cta-button inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-900 accent-gradient rounded-xl"
            >
              Get a Free Quote
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-xl hover:bg-white/5 transition-all hover:-translate-y-0.5"
            >
              Our Services
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up delay-500 mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8" style={{ opacity: 0 }}>
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "20+", label: "Years Experience" },
              { value: "150+", label: "Expert Team" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-amber-400 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
