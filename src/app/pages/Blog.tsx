import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts = [
    {
      id: "ai-automation-trends-2026",
      title: "The Future of AI Automation: Trends to Watch in 2026",
      excerpt:
        "Explore the latest developments in AI automation and how they're reshaping business operations across industries. From autonomous systems to predictive analytics.",
      image:
        "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBmdXR1cmlzdGljfGVufDF8fHx8MTc3MzIwODY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "AI Trends",
      date: "March 10, 2026",
      readTime: "8 min read",
      author: "Ana Silva",
    },
    {
      id: "machine-learning-business-growth",
      title: "How Machine Learning Drives Business Growth",
      excerpt:
        "Discover practical applications of machine learning that can transform your business metrics and create sustainable competitive advantages.",
      image:
        "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3NzMyNTA1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Machine Learning",
      date: "March 8, 2026",
      readTime: "6 min read",
      author: "Miguel Santos",
    },
    {
      id: "building-scalable-automation",
      title: "Building Scalable Automation Systems",
      excerpt:
        "A comprehensive guide to designing and implementing automation systems that grow with your business needs and adapt to changing requirements.",
      image:
        "https://images.unsplash.com/photo-1771923082503-0a3381c46cef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwc29mdHdhcmUlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzczMzI3MjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Automation",
      date: "March 5, 2026",
      readTime: "10 min read",
      author: "Sofia Costa",
    },
    {
      id: "lisbon-tech-hub",
      title: "Why Lisbon is Becoming Europe's Premier Tech Hub",
      excerpt:
        "An inside look at how Lisbon's unique ecosystem is attracting top tech talent and innovative companies from around the world.",
      image:
        "https://images.unsplash.com/photo-1722957881353-fc8bcf84b06d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMaXNib24lMjBQb3J0dWdhbCUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NzMyMjkzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Industry Insights",
      date: "March 3, 2026",
      readTime: "7 min read",
      author: "João Pereira",
    },
    {
      id: "ai-ethics-responsible-development",
      title: "AI Ethics: Building Responsible AI Systems",
      excerpt:
        "Exploring the critical importance of ethics in AI development and how to build systems that are fair, transparent, and accountable.",
      image:
        "https://images.unsplash.com/photo-1672385277648-85eddc237a2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwY29kZXxlbnwxfHx8fDE3NzMzMjcyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Ethics",
      date: "February 28, 2026",
      readTime: "9 min read",
      author: "Ana Silva",
    },
    {
      id: "custom-app-development-guide",
      title: "The Complete Guide to Custom App Development",
      excerpt:
        "From initial planning to deployment, learn the key steps and best practices for successful custom application development projects.",
      image:
        "https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtd29ya3xlbnwxfHx8fDE3NzMzMDQyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Development",
      date: "February 25, 2026",
      readTime: "12 min read",
      author: "Miguel Santos",
    },
  ];

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = blogPosts[0];
  const otherPosts = filteredPosts.slice(searchQuery ? 0 : 1);

  return (
    <div className="w-full py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our Blog
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Insights, trends, and best practices in AI, automation, and software
            development
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </section>

      {/* Featured Post */}
      {!searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <Link
            to={`/blog/${featuredPost.id}`}
            className="group block relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <ImageWithFallback
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-cyan-500 text-white rounded-full text-xs font-semibold">
                    Featured
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-xs">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar className="size-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-400 text-lg mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>{featuredPost.author}</span>
                    <div className="flex items-center gap-2">
                      <Clock className="size-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all">
                    <span>Read More</span>
                    <ArrowRight className="size-5" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-xs">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">
              No articles found matching "{searchQuery}"
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
