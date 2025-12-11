import Link from "next/link";
import { ArrowRight, CheckCircle, BarChart2, Shield, Zap, Play, Hexagon, Cpu, Globe, Layers, Users, HelpCircle, ChevronDown } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                <Cpu className="w-6 h-6 text-white" />
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Crucible
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Log in
              </Link>
              <Link
                href="/signup"
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300 opacity-20" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Powered by Gemini 2.0 Flash
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="block text-white mb-2">Validate ideas</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
              at lightspeed
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            Deploy a swarm of autonomous AI agents to stress-test your business model.
            Get comprehensive market, financial, and technical analysis in seconds.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <Link
              href="/signup"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-100 group-hover:opacity-90 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Validate My Idea
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/login"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <Play className="w-5 h-5 mr-2 fill-white" />
              View Demo
            </Link>
          </div>

          {/* Floating Cards / Visuals */}
          <div className="mt-24 relative max-w-5xl mx-auto animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
                <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">Global</div>
                <div className="text-sm text-slate-400">Market Analysis</div>
              </div>
              <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors">
                <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">Instant</div>
                <div className="text-sm text-slate-400">Feasibility Check</div>
              </div>
              <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-pink-500/30 transition-colors">
                <div className="h-12 w-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-pink-400" />
                </div>
                <div className="text-2xl font-bold text-white">Secure</div>
                <div className="text-sm text-slate-400">Risk Assessment</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-blue-400 font-semibold tracking-wide uppercase text-sm mb-3">The Engine</h2>
            <p className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI Advisory Board</span>
            </p>
            <p className="max-w-2xl mx-auto text-xl text-slate-400">
              We deploy specialized autonomous agents to analyze every dimension of your startup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Market Intelligence",
                desc: "Deep dive into TAM, SAM, SOM and competitor landscape analysis.",
                icon: BarChart2,
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Financial Modeling",
                desc: "Detailed unit economics, break-even analysis, and startup cost estimation.",
                icon: Hexagon,
                gradient: "from-amber-500 to-orange-500"
              },
              {
                title: "Tech Stack",
                desc: "Architecture recommendations, tech stack selection, and complexity assessment.",
                icon: Cpu,
                gradient: "from-emerald-500 to-green-500"
              },
              {
                title: "Risk Radar",
                desc: "Identification of regulatory, operational, and market risks with mitigation strategies.",
                icon: Shield,
                gradient: "from-rose-500 to-red-500"
              }
            ].map((feature, idx) => (
              <div key={idx} className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-blue-500/50 hover:to-purple-500/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative h-full bg-slate-900/90 backdrop-blur-xl rounded-xl p-8 flex flex-col items-start">
                  <div className={`inline-flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 relative z-10 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-purple-400 font-semibold tracking-wide uppercase text-sm mb-3">Workflow</h2>
            <p className="text-3xl md:text-4xl font-bold text-white">
              From Idea to Validation in <span className="text-purple-400">3 Steps</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>

            {[
              {
                step: "01",
                title: "Submit Concept",
                desc: "Describe your startup idea, target audience, and business model in our smart form.",
                icon: Layers
              },
              {
                step: "02",
                title: "AI Analysis",
                desc: "Our agent swarm analyzes market data, competitors, and financial viability instantly.",
                icon: Cpu
              },
              {
                step: "03",
                title: "Get Report",
                desc: "Receive a comprehensive validation report with actionable insights and scores.",
                icon: CheckCircle
              }
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 h-24 w-24 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center mb-6 shadow-xl shadow-purple-500/5 group hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
                  <item.icon className="h-10 w-10 text-white" />
                  <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold border-2 border-slate-900">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Sample Report Preview Section */}
      <div className="py-32 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-3">Preview</h2>
            <p className="text-3xl md:text-4xl font-bold text-white mb-6">
              See what you get
            </p>
            <p className="max-w-2xl mx-auto text-xl text-slate-400">
              A comprehensive 15+ page report covering every angle of your business.
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl perspective-1000 group">
            {/* Abstract decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden rotate-x-12 group-hover:rotate-0 transition-all duration-700 ease-out origin-center tilt-shift-blur group-hover:[mask-image:none]">
              {/* Mock Browser Header */}
              <div className="h-12 bg-slate-800 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-4 flex-1 h-6 bg-slate-950/50 rounded-md flex items-center px-3 text-xs text-slate-500 font-mono">
                  crucible.com/report/8f92a...
                </div>
              </div>

              {/* Mock Report Content */}
              <div className="p-8 md:p-12 bg-slate-950">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <div className="text-sm text-blue-400 font-bold uppercase tracking-wider mb-2">Validation Report</div>
                    <h3 className="text-3xl font-bold text-white">Eco-Friendly Food Delivery</h3>
                    <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">
                      <span>Generated just now</span>
                      <span>•</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-5xl font-bold text-emerald-400">8.5</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider mt-1">Overall Score</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[
                    { label: "Market Size", val: "Large", color: "text-blue-400" },
                    { label: "Competition", val: "High", color: "text-orange-400" },
                    { label: "Tech Feasibility", val: "Easy", color: "text-green-400" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-slate-900/50 rounded-lg p-4 border border-white/5">
                      <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">{stat.label}</div>
                      <div className={`text-xl font-bold ${stat.color}`}>{stat.val}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="h-4 bg-slate-900 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-900 rounded w-full"></div>
                  <div className="h-4 bg-slate-900 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-900 rounded w-1/2"></div>
                </div>

                {/* Fade out effect */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-medium shadow-lg shadow-blue-500/20 transition-colors">
                    View Full Sample Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-24 relative z-10 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-3">Target Audience</h2>
            <p className="text-3xl md:text-4xl font-bold text-white">
              Built for visionaries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Solo Founders",
                desc: "Stop wasting months building products nobody wants. Validate your hunch in seconds before writing a single line of code.",
                icon: Users
              },
              {
                title: "Incubators & Accelerators",
                desc: "Screen thousands of applications instantly. Identify the most promising startups with data-driven scoring.",
                icon: Layers
              },
              {
                title: "Angel Investors",
                desc: "Perform due diligence at scale. Get an objective second opinion on market size and technical risks.",
                icon: BarChart2
              }
            ].map((useCase, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-6">
                  <useCase.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {useCase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table Section */}
      <div className="py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-orange-400 font-semibold tracking-wide uppercase text-sm mb-3">Why Us</h2>
            <p className="text-3xl md:text-4xl font-bold text-white">
              Smarter than the old way
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50">
            <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-white/5 text-sm font-bold text-slate-300 uppercase tracking-wider">
              <div className="col-span-1">Feature</div>
              <div className="col-span-1 text-center text-white">Crucible</div>
              <div className="col-span-1 text-center text-slate-500">Traditional Consultants</div>
            </div>
            {[
              { feature: "Time to Result", us: "30 Seconds", them: "4-6 Weeks" },
              { feature: "Cost", us: "$0 - $29", them: "$5,000+" },
              { feature: "Data Source", us: "Real-time Web Data", them: "Outdated Reports" },
              { feature: "Availability", us: "24/7 Instant", them: "9-5 Mon-Fri" },
              { feature: "Bias", us: "Objective AI", them: "Subjective Human" }
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors items-center">
                <div className="col-span-1 font-medium text-slate-300">{row.feature}</div>
                <div className="col-span-1 text-center font-bold text-emerald-400">{row.us}</div>
                <div className="col-span-1 text-center text-slate-500">{row.them}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 relative z-10 bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-blue-400 font-semibold tracking-wide uppercase text-sm mb-3">FAQ</h2>
            <p className="text-3xl md:text-4xl font-bold text-white">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How accurate is the AI analysis?",
                a: "Our agents use real-time market data and proven financial models. While no prediction is 100% guaranteed, we provide data-backed probabilities and risk assessments to guide your decisions."
              },
              {
                q: "Is my idea data secure?",
                a: "Absolutely. We use enterprise-grade encryption and your idea data is never used to train our public models. Your intellectual property remains yours."
              },
              {
                q: "Can I export the reports?",
                a: "Yes, Pro plan users can export full validation reports as professional PDF documents, perfect for sharing with co-founders or investors."
              }
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                    <HelpCircle className="h-5 w-5 text-blue-500 mr-3" />
                    {item.q}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed pl-8">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-white/10 p-12 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to validate your next big thing?
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Join thousands of founders who use Crucible to build with confidence.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 hover:scale-105"
              >
                Get Started for Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">Crucible</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          </div>
          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Crucible. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
