import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ExternalLink, Code, Zap, TrendingUp } from "lucide-react";

export function Showcase() {
  const projects = [
    {
      title: "AI-Powered Analytics Platform",
      category: "Data Analytics",
      description:
        "A comprehensive analytics platform leveraging machine learning to provide real-time insights and predictive analytics for enterprise clients.",
      image:
        "https://images.unsplash.com/photo-1771923082503-0a3381c46cef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwc29mdHdhcmUlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzczMzI3MjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Machine Learning", "Python", "React", "TensorFlow"],
      stats: { metric1: "85% faster", metric2: "10M+ data points" },
    },
    {
      title: "Smart Automation Hub",
      category: "Process Automation",
      description:
        "End-to-end automation solution that streamlines business processes, reducing manual work by 70% and improving accuracy across operations.",
      image:
        "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBmdXR1cmlzdGljfGVufDF8fHx8MTc3MzIwODY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Automation", "AI", "Node.js", "Docker"],
      stats: { metric1: "70% cost reduction", metric2: "99.9% uptime" },
    },
    {
      title: "E-Commerce AI Assistant",
      category: "Conversational AI",
      description:
        "Intelligent chatbot and recommendation engine that personalizes customer experiences and drives conversion rates through AI-powered interactions.",
      image:
        "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3NzMyNTA1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["NLP", "GPT", "TypeScript", "AWS"],
      stats: { metric1: "45% conversion boost", metric2: "500K+ interactions" },
    },
    {
      title: "Supply Chain Optimizer",
      category: "Logistics AI",
      description:
        "Advanced optimization system using AI to predict demand, optimize routes, and manage inventory across global supply chains.",
      image:
        "https://images.unsplash.com/photo-1672385277648-85eddc237a2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kZXxlbnwxfHx8fDE3NzMzMjcyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Optimization", "ML", "PostgreSQL", "GraphQL"],
      stats: { metric1: "35% cost savings", metric2: "20+ countries" },
    },
    {
      title: "Healthcare Diagnostic AI",
      category: "Medical Tech",
      description:
        "Computer vision and ML-powered diagnostic tool assisting medical professionals in early disease detection and treatment planning.",
      image:
        "https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtd29ya3xlbnwxfHx8fDE3NzMzMDQyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Computer Vision", "Healthcare", "PyTorch", "HIPAA"],
      stats: { metric1: "92% accuracy", metric2: "50K+ diagnoses" },
    },
    {
      title: "Financial Fraud Detection",
      category: "FinTech Security",
      description:
        "Real-time fraud detection system using advanced machine learning to identify and prevent fraudulent transactions before they occur.",
      image:
        "https://images.unsplash.com/photo-1722957881353-fc8bcf84b06d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMaXNib24lMjBQb3J0dWdhbCUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NzMyMjkzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Security", "Real-time", "Kafka", "Redis"],
      stats: { metric1: "99.5% detection", metric2: "<100ms response" },
    },
  ];

  const categories = [
    "All",
    "Data Analytics",
    "Process Automation",
    "Conversational AI",
    "Logistics AI",
    "Medical Tech",
    "FinTech Security",
  ];

  return (
    <div className="w-full py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our Showcase
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore our portfolio of cutting-edge AI and automation solutions
            that have transformed businesses across industries
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 text-center">
            <div className="inline-flex p-3 bg-cyan-500/10 rounded-xl mb-4">
              <Code className="size-8 text-cyan-400" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              200+
            </div>
            <div className="text-slate-400">Projects Delivered</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 text-center">
            <div className="inline-flex p-3 bg-purple-500/10 rounded-xl mb-4">
              <Zap className="size-8 text-purple-400" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              150+
            </div>
            <div className="text-slate-400">Happy Clients</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 text-center">
            <div className="inline-flex p-3 bg-pink-500/10 rounded-xl mb-4">
              <TrendingUp className="size-8 text-pink-400" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              98%
            </div>
            <div className="text-slate-400">Success Rate</div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/50 rounded-full text-cyan-400 text-xs">
                    {project.category}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-6">{project.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-cyan-400 font-semibold">
                      {project.stats.metric1}
                    </div>
                    <div className="text-xs text-slate-500">Performance</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-purple-400 font-semibold">
                      {project.stats.metric2}
                    </div>
                    <div className="text-xs text-slate-500">Scale</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group/btn">
                  <span>View Case Study</span>
                  <ExternalLink className="size-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="relative bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Build Something Amazing?
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a solution that exceeds
              expectations
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                  window.location.href = "/#contact";
                }, 500);
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
            >
              Start Your Project
              <ExternalLink className="size-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
