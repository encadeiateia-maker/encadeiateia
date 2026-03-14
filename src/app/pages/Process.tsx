import { Link } from "react-router";
import { ArrowRight, Clock } from "lucide-react";
import content from "@/content/site-content.json";
import { usePageTitle } from "@/app/hooks/usePageTitle";

export function Process() {
  usePageTitle("How Projects Run");
  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              How Projects Run
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A lightweight process designed for founders and CTOs who want to move fast,
            see working software early, and avoid big-consulting overhead.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {content.process.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector Line */}
                {index < content.process.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 to-transparent hidden md:block"></div>
                )}

                <div className="flex gap-8">
                  {/* Step Number */}
                  <div className="shrink-0 hidden md:block">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="md:hidden text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {step.step}.
                      </span>
                      <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                      <div className="flex items-center gap-1 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">
                        <Clock className="size-3" />
                        {step.duration}
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {step.bullets.map((bullet, i) => (
                        <li key={i} className="text-slate-300 flex items-start gap-3">
                          <span className="text-cyan-400 mt-1 shrink-0">-</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing line */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-slate-400 italic">
            You get a single technical partner who ships and operates the system with you,
            not a rotating cast of contractors.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Common Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What does a typical engagement look like?",
                a: "It starts with a 1-2 day discovery. From there, we move fast: architecture and prototype in a week, build phase in 2-4 weeks. Most MVPs ship within 4-6 weeks total.",
              },
              {
                q: "How do you handle pricing?",
                a: "Fixed price for discovery and prototyping. Build phase is typically project-based with weekly milestones. Ongoing operations are monthly retainer.",
              },
              {
                q: "What do you need from me?",
                a: "Access to relevant systems, a decision-maker available for weekly feedback, and clear goals. I handle the rest.",
              },
              {
                q: "Can you work with our existing team?",
                a: "Yes. I can operate independently or integrate with your team. I document everything and use standard tools.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all inline-flex items-center justify-center gap-2 group"
            >
              Start with a discovery
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
