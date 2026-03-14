import { useParams, Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";

export function BlogPost() {
  const { id } = useParams();

  // Mock blog post data
  const blogPosts: Record<string, any> = {
    "ai-automation-trends-2026": {
      title: "The Future of AI Automation: Trends to Watch in 2026",
      image:
        "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBmdXR1cmlzdGljfGVufDF8fHx8MTc3MzIwODY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "AI Trends",
      date: "March 10, 2026",
      readTime: "8 min read",
      author: "Ana Silva",
      content: `
        <p>As we move through 2026, artificial intelligence and automation continue to reshape the business landscape at an unprecedented pace. The convergence of advanced AI technologies with practical business applications is creating opportunities that were once the realm of science fiction.</p>

        <h2>The Rise of Autonomous Systems</h2>
        <p>One of the most significant trends we're observing is the rapid advancement of autonomous systems. These AI-powered solutions are no longer confined to simple, repetitive tasks. Today's autonomous systems can handle complex decision-making processes, adapt to changing conditions in real-time, and learn from their experiences to continuously improve performance.</p>

        <p>Organizations across industries are leveraging these systems to:</p>
        <ul>
          <li>Optimize supply chain operations with predictive analytics</li>
          <li>Enhance customer service through intelligent chatbots and virtual assistants</li>
          <li>Automate complex financial processes and risk assessments</li>
          <li>Streamline manufacturing with smart robotics and quality control</li>
        </ul>

        <h2>Predictive Analytics and Business Intelligence</h2>
        <p>The integration of machine learning with business intelligence platforms has transformed how companies make strategic decisions. Predictive analytics now offers unprecedented accuracy in forecasting market trends, customer behavior, and operational challenges.</p>

        <p>Modern AI systems can analyze vast amounts of data from multiple sources, identifying patterns and insights that would be impossible for human analysts to detect. This capability enables businesses to stay ahead of market changes and make data-driven decisions with confidence.</p>

        <h2>The Human-AI Collaboration Model</h2>
        <p>Perhaps the most important trend is the shift towards collaborative AI – systems designed to augment human capabilities rather than replace them. This approach recognizes that the most powerful outcomes come from combining human creativity, intuition, and emotional intelligence with AI's computational power and pattern recognition abilities.</p>

        <p>In our work at encadeiateia, we've seen firsthand how this collaborative approach leads to better outcomes. Teams that effectively integrate AI tools into their workflows report significant improvements in productivity, innovation, and job satisfaction.</p>

        <h2>Looking Ahead</h2>
        <p>As AI automation continues to evolve, we expect to see even more sophisticated applications emerging. The key to success will be staying informed about these developments and being willing to adapt and innovate. Organizations that embrace these technologies thoughtfully and strategically will be well-positioned to thrive in the AI-driven future.</p>

        <p>At encadeiateia, we're committed to helping businesses navigate this exciting landscape, developing custom solutions that harness the power of AI while maintaining a human-centered approach to technology.</p>
      `,
    },
    "machine-learning-business-growth": {
      title: "How Machine Learning Drives Business Growth",
      image:
        "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3NzMyNTA1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Machine Learning",
      date: "March 8, 2026",
      readTime: "6 min read",
      author: "Miguel Santos",
      content: `
        <p>Machine learning has evolved from a cutting-edge technology to a business necessity. Companies that successfully integrate ML into their operations are seeing measurable improvements in efficiency, customer satisfaction, and revenue growth.</p>

        <h2>Understanding the Business Impact</h2>
        <p>Machine learning's true value lies in its ability to extract actionable insights from data that would otherwise remain hidden. By identifying patterns, predicting outcomes, and automating complex decisions, ML systems enable businesses to operate with unprecedented intelligence and agility.</p>

        <h2>Key Applications Driving Growth</h2>
        <p>Some of the most impactful applications we've implemented include:</p>
        <ul>
          <li>Customer segmentation and personalization engines</li>
          <li>Demand forecasting and inventory optimization</li>
          <li>Fraud detection and risk management systems</li>
          <li>Quality control and predictive maintenance</li>
        </ul>

        <p>Each of these applications delivers tangible ROI by reducing costs, increasing revenue, or both.</p>

        <h2>Getting Started with ML</h2>
        <p>The key to successful ML implementation is starting with clear business objectives and quality data. Focus on problems where ML can provide measurable value, and build from there.</p>
      `,
    },
    "building-scalable-automation": {
      title: "Building Scalable Automation Systems",
      image:
        "https://images.unsplash.com/photo-1771923082503-0a3381c46cef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwc29mdHdhcmUlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzczMzI3MjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Automation",
      date: "March 5, 2026",
      readTime: "10 min read",
      author: "Sofia Costa",
      content: `
        <p>Automation is no longer just about replacing manual tasks—it's about building intelligent systems that can grow and adapt with your business. Here's how to design automation that scales.</p>

        <h2>The Foundation: Architecture</h2>
        <p>Scalable automation starts with robust architecture. Design your systems with modularity in mind, using microservices and APIs that can be easily extended and integrated as your needs evolve.</p>

        <h2>Key Principles</h2>
        <ul>
          <li>Start small, think big: Begin with high-impact processes</li>
          <li>Build for flexibility: Ensure your systems can adapt to changing requirements</li>
          <li>Monitor and optimize: Use data to continuously improve performance</li>
          <li>Plan for failure: Build resilience into your automation systems</li>
        </ul>

        <h2>Real-World Success</h2>
        <p>We've helped companies reduce operational costs by up to 70% while improving accuracy and speed. The key is thoughtful design and implementation.</p>
      `,
    },
  };

  const post = blogPosts[id || ""] || blogPosts["ai-automation-trends-2026"];

  return (
    <div className="w-full py-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </Link>

        {/* Category and Date */}
        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm">
            {post.category}
          </span>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Calendar className="size-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Clock className="size-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            {post.title}
          </span>
        </h1>

        {/* Author */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-semibold">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="text-white font-medium">{post.author}</div>
              <div className="text-slate-400 text-sm">Author</div>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-slate-300 transition-all">
            <Share2 className="size-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Featured Image */}
        <div className="relative mb-12 rounded-2xl overflow-hidden">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-auto"
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:bg-gradient-to-r prose-headings:from-cyan-400 prose-headings:to-purple-400 prose-headings:bg-clip-text prose-headings:text-transparent
            prose-p:text-slate-300 prose-p:leading-relaxed
            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
            prose-strong:text-white
            prose-ul:text-slate-300 prose-li:text-slate-300
            prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="text-slate-400">
              Enjoyed this article? Share it with your network!
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all inline-flex items-center gap-2">
              <Share2 className="size-4" />
              Share Article
            </button>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Continue Reading
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/blog/machine-learning-business-growth"
              className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="text-cyan-400 text-sm mb-2">Machine Learning</div>
              <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                How Machine Learning Drives Business Growth
              </h4>
            </Link>
            <Link
              to="/blog/building-scalable-automation"
              className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="text-purple-400 text-sm mb-2">Automation</div>
              <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                Building Scalable Automation Systems
              </h4>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}