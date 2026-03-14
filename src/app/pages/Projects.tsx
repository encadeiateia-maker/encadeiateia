import { Link } from "react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import content from "@/content/site-content.json";

export function Projects() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Production systems I built and operate. Real problems, real solutions, real results.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {content.portfolio.map((project) => (
              <div
                key={project.id}
                className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs inline-block mb-4">
                  {project.category}
                </div>

                <h3 className="text-2xl font-semibold text-white mb-6 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <div className="space-y-4">
                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Problem</div>
                    <p className="text-slate-300">{project.problem}</p>
                  </div>

                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Solution</div>
                    <p className="text-slate-300">{project.solution}</p>
                  </div>

                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
                    <div className="text-xs text-cyan-500 uppercase tracking-wider mb-1">Result</div>
                    <p className="text-cyan-400 flex items-start gap-2">
                      <CheckCircle className="size-5 mt-0.5 shrink-0" />
                      {project.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Want something similar?
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Let's talk about what you're building.
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
