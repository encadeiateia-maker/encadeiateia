import { Link } from "react-router";
import { Home, Search } from "lucide-react";
import { usePageTitle } from "@/app/hooks/usePageTitle";

export function NotFound() {
  usePageTitle("Page Not Found");
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[200px] font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-none">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-slate-400 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
          >
            <Home className="size-5" />
            Back to Home
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800/50 border border-slate-700 text-white rounded-lg font-semibold hover:bg-slate-700/50 transition-all"
          >
            <Search className="size-5" />
            Browse Services
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-400 mb-4">Quick Links</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/services"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Services
            </Link>
            <Link
              to="/projects"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Projects
            </Link>
            <Link
              to="/about"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
