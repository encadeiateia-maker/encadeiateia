import { useState } from "react";
import { MapPin, Mail, ArrowRight } from "lucide-react";
import content from "@/content/site-content.json";

export function Contact() {
  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(content.contact.fields.map((f) => [f.name, ""]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name?.trim()) errs.name = "Name is required";
    if (!formData.email?.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Invalid email format";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    console.log("Lead submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="text-6xl mb-6">&#10003;</div>
          <h1 className="text-3xl font-bold text-white mb-4">Thank you</h1>
          <p className="text-lg text-slate-400">
            I'll review your project details and reply within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Contact
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {content.contact.introText}
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.contact.fields.slice(0, 4).map((field) => (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-slate-300 mb-2"
                        >
                          {field.label}
                          {(field.name === "name" || field.name === "email") && (
                            <span className="text-cyan-400"> *</span>
                          )}
                        </label>
                        <input
                          type={field.name === "email" ? "email" : "text"}
                          id={field.name}
                          value={formData[field.name] || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, [field.name]: e.target.value })
                          }
                          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors ${
                            errors[field.name] ? "border-red-500" : "border-slate-700"
                          }`}
                          placeholder={field.placeholder}
                        />
                        {errors[field.name] && (
                          <p className="mt-1 text-sm text-red-400">{errors[field.name]}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Budget */}
                  {content.contact.fields[4] && (
                    <div>
                      <label
                        htmlFor={content.contact.fields[4].name}
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        {content.contact.fields[4].label}
                      </label>
                      <input
                        type="text"
                        id={content.contact.fields[4].name}
                        value={formData[content.contact.fields[4].name] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [content.contact.fields[4].name]: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder={content.contact.fields[4].placeholder}
                      />
                    </div>
                  )}

                  {/* Project Description */}
                  {content.contact.fields[5] && (
                    <div>
                      <label
                        htmlFor={content.contact.fields[5].name}
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        {content.contact.fields[5].label}
                      </label>
                      <textarea
                        id={content.contact.fields[5].name}
                        value={formData[content.contact.fields[5].name] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [content.contact.fields[5].name]: e.target.value,
                          })
                        }
                        rows={5}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                        placeholder={content.contact.fields[5].placeholder}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all inline-flex items-center justify-center gap-2 group"
                  >
                    {content.contact.submitLabel}
                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-lg">
                    <MapPin className="size-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                    <p className="text-slate-400 text-sm">
                      Lisbon, Portugal<br />
                      Working remote across Europe
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <Mail className="size-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                    <a
                      href="mailto:encadeiateia@gmail.com"
                      className="text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                    >
                      encadeiateia@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
                <div className="space-y-2">
                  <a
                    href="https://linkedin.com/company/encadeiateia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/encadeiateia-maker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
