import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Users,
  Target,
  Award,
  Globe,
  Heart,
  TrendingUp,
} from "lucide-react";

export function About() {
  const values = [
    {
      icon: Target,
      title: "Innovation First",
      description:
        "We push boundaries and embrace cutting-edge technologies to deliver solutions that set industry standards.",
    },
    {
      icon: Users,
      title: "Client Success",
      description:
        "Your success is our success. We partner with you to understand and exceed your business objectives.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We maintain the highest standards in everything we do, from code quality to customer service.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description:
        "Based in Lisbon, we serve clients worldwide, bringing Portuguese innovation to the global stage.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "We love what we do. Our team is driven by genuine enthusiasm for technology and problem-solving.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description:
        "We never stop learning, evolving, and improving to stay ahead of the technology curve.",
    },
  ];

  const team = [
    {
      name: "Ana Silva",
      role: "CEO & AI Architect",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
      name: "Miguel Santos",
      role: "CTO & Lead Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
      name: "Sofia Costa",
      role: "Head of Automation",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    },
    {
      name: "João Pereira",
      role: "ML Engineer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1722957881353-fc8bcf84b06d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMaXNib24lMjBQb3J0dWdhbCUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NzMyMjkzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Lisbon Portugal"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About encadeiateia
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Pioneering the future of AI and automation from the heart of Lisbon
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Our Story
                </span>
              </h2>
              <div className="space-y-4 text-slate-300">
                <p>
                  Founded in Lisbon, Portugal, encadeiateia emerged from a vision to
                  bridge the gap between cutting-edge AI technology and
                  practical business solutions. Our journey began when a team of
                  passionate technologists recognized the untapped potential of
                  artificial intelligence in transforming everyday business
                  operations.
                </p>
                <p>
                  Today, we stand as a leading software service provider,
                  specializing in AI, automation, and custom app development. We
                  combine Portuguese creativity with global technological
                  expertise to deliver solutions that are not just innovative,
                  but truly transformative.
                </p>
                <p>
                  From our base in Lisbon, we serve clients across 25+ countries,
                  helping businesses of all sizes harness the power of AI to
                  drive growth, efficiency, and innovation. Our commitment to
                  excellence and client success has made us a trusted partner
                  for companies looking to lead in the digital age.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-2xl opacity-20"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtd29ya3xlbnwxfHx8fDE3NzMzMDQyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team Collaboration"
                className="relative rounded-2xl shadow-2xl border border-slate-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="inline-flex p-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl mb-4">
                  <value.icon className="size-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              The brilliant minds behind our innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-2xl opacity-20"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1672385277648-85eddc237a2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kZXxlbnwxfHx8fDE3NzMzMjcyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Software Development"
                className="relative rounded-2xl shadow-2xl border border-slate-800"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Why Lisbon?
                </span>
              </h2>
              <div className="space-y-4 text-slate-300">
                <p>
                  Lisbon has emerged as one of Europe's premier tech hubs,
                  combining a rich cultural heritage with a vibrant innovation
                  ecosystem. The city's unique blend of creativity,
                  entrepreneurial spirit, and technical talent makes it the
                  perfect base for our operations.
                </p>
                <p>
                  Portugal's strategic location, excellent infrastructure, and
                  favorable business environment allow us to serve clients
                  across Europe and beyond efficiently. The city's diverse,
                  multilingual talent pool enables us to build world-class
                  solutions with a global perspective.
                </p>
                <p>
                  From our Lisbon headquarters, we're contributing to
                  Portugal's growing reputation as a leader in technology and
                  innovation, while delivering exceptional value to clients
                  worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}