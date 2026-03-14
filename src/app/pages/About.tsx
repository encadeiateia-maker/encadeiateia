import { Link } from "react-router";
import {
  ArrowRight,
  MapPin,
  Code2,
  Cpu,
  Server,
  Bot,
  Globe,
} from "lucide-react";
import content from "@/content/site-content.json";
import { usePageTitle } from "@/app/hooks/usePageTitle";

export function About() {
  usePageTitle("About");
  const techStack = [
    { category: "Frontend", items: "React, Next.js, Svelte, Angular, Tailwind" },
    { category: "Backend", items: "Rust, Python, Node.js, FastAPI, Axum" },
    { category: "AI / Agents", items: "Claude, Ollama, Gemini, ADK, MCP" },
    { category: "Infrastructure", items: "Docker, GCP Cloud Run, Traefik, Supabase" },
    { category: "Automation", items: "n8n, Windmill, custom pipelines" },
    { category: "Databases", items: "PostgreSQL, SQLite, Redis" },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About
            </span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 md:p-12">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {content.aboutSnippet.text}
            </p>
            <div className="space-y-4 text-slate-400">
              <p>
                I started encadeiateia in Lisbon because I saw the same problem everywhere:
                companies need AI and automation but can't justify hiring a full engineering team.
                The tools are better than ever — what's missing is someone who can put them
                together into production systems that actually work.
              </p>
              <p>
                Every service I offer is backed by software I built and use daily. The multi-tenant
                web platform runs 18+ live client sites. The agent orchestrator coordinates 10
                specialized AI agents in Rust. The creative studio generates images, video, and
                music entirely offline. These aren't demos — they're production infrastructure.
              </p>
              <p>
                I work directly with founders and CTOs. No account managers, no project
                managers, no handoffs. You talk to the person building and operating the system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            What Makes This Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: "AI-native from day one",
                desc: "AI agents aren't bolted on — they're how I build and deliver. Multi-agent orchestration, automated workflows, intelligent scoring.",
              },
              {
                icon: Code2,
                title: "Build AND operate",
                desc: "I don't hand off code and walk away. I build it, deploy it, monitor it, and iterate on it. One person, full lifecycle.",
              },
              {
                icon: Globe,
                title: "One person, team output",
                desc: "Production tools I built replace the need for a full team. You get senior-level execution without the overhead.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
              >
                <div className="inline-flex p-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl mb-4">
                  <item.icon className="size-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((stack) => (
              <div
                key={stack.category}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
              >
                <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                  {stack.category}
                </h3>
                <p className="text-slate-300">{stack.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-slate-400 mb-6">
            <MapPin className="size-5 text-cyan-400" />
            Lisbon, Portugal
          </div>
          <p className="text-lg text-slate-400 mb-10">
            Working remotely with SMEs and startups across Europe.
            Lisbon timezone (WET/WEST), flexible hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://linkedin.com/company/encadeiateia"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-lg hover:bg-slate-700/50 transition-all"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/encadeiateia-maker"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-lg hover:bg-slate-700/50 transition-all"
            >
              GitHub
            </a>
            <Link
              to="/contact"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all inline-flex items-center gap-2 group"
            >
              Get in touch
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
