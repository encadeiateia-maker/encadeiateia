import { Link } from "react-router";
import {
  ArrowRight,
  LayoutDashboard,
  Workflow,
  Sparkles,
  FileCode2,
  Radar,
  CheckCircle,
  Zap,
} from "lucide-react";
import content from "@/content/site-content.json";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Workflow,
  Sparkles,
  FileCode2,
  Radar,
};

export function Services() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            I build and operate production systems for SMEs and startups across Europe.
            Every service is backed by tools I use daily — not theory, not slides.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {content.services.map((service, index) => {
            const Icon = iconMap[service.icon] || Sparkles;
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${isEven ? "" : "lg:direction-rtl"}`}>
                  {/* Info */}
                  <div>
                    <div className="inline-flex p-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl mb-4">
                      <Icon className="size-8 text-cyan-400" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-slate-300 mb-8">
                      {service.shortDescription}
                    </p>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all group"
                    >
                      Discuss this service
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Deliverables + Outcomes */}
                  <div className="space-y-8">
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Zap className="size-5 text-cyan-400" />
                        What you get
                      </h3>
                      <ul className="space-y-3">
                        {service.deliverables.map((d, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-300">
                            <CheckCircle className="size-5 text-cyan-400 mt-0.5 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <ArrowRight className="size-5 text-purple-400" />
                        Why it matters
                      </h3>
                      <ul className="space-y-3">
                        {service.outcomes.map((o, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-400">
                            <span className="text-purple-400 mt-1 shrink-0">-</span>
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {index < content.services.length - 1 && (
                  <div className="border-b border-slate-800 mt-20"></div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Not sure which service fits?
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Describe your problem. I'll tell you what's possible.
          </p>
          <Link
            to="/contact"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all inline-flex items-center justify-center gap-2 group"
          >
            {content.hero.primaryCtaLabel}
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
