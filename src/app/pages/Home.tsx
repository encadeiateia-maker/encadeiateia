import { Link } from "react-router";
import {
  ArrowRight,
  LayoutDashboard,
  Workflow,
  Sparkles,
  FileCode2,
  Radar,
  CheckCircle,
  Clock,
} from "lucide-react";
import content from "@/content/site-content.json";
import { usePageTitle } from "@/app/hooks/usePageTitle";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Workflow,
  Sparkles,
  FileCode2,
  Radar,
};

export function Home() {
  usePageTitle();
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              {content.hero.headline}
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            {content.hero.subhead}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all inline-flex items-center justify-center gap-2 group"
            >
              {content.hero.primaryCtaLabel}
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-slate-700/50 transition-all border border-slate-700 inline-flex items-center justify-center gap-2"
            >
              {content.hero.secondaryCtaLabel}
            </Link>
          </div>

          <p className="text-sm text-slate-500 mt-6">{content.hero.microCopy}</p>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                What I Build
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Real services backed by production tools I use daily
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.map((service) => {
              const Icon = iconMap[service.icon] || Sparkles;
              return (
                <Link
                  key={service.id}
                  to={`/services#${service.id}`}
                  className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-300"></div>
                  <div className="relative">
                    <div className="inline-flex p-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="size-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{service.shortDescription}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              View all services
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Real Projects
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Production systems I built and operate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.portfolio.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs inline-block mb-4">
                  {project.category}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {project.title}
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-slate-400">
                    <span className="text-slate-500 font-medium">Problem:</span>{" "}
                    {project.problem}
                  </p>
                  <p className="text-slate-400">
                    <span className="text-slate-500 font-medium">Solution:</span>{" "}
                    {project.solution}
                  </p>
                  <p className="text-cyan-400">
                    <CheckCircle className="size-4 inline mr-1" />
                    {project.result}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              See all projects
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                How Projects Run
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A lightweight process designed for founders and CTOs who want to move fast
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.process.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-6xl font-bold text-slate-800/50 mb-4">
                  {String(step.step).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <div className="flex items-center gap-1 text-cyan-400 text-sm mb-3">
                  <Clock className="size-3" />
                  {step.duration}
                </div>
                <ul className="space-y-2">
                  {step.bullets.map((bullet, i) => (
                    <li key={i} className="text-slate-400 text-sm">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet + CTA */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            {content.aboutSnippet.text}
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
