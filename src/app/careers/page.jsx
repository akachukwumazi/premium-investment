"use client";
import React, { useState } from "react";
import { 
  Bitcoin, 
  Zap, 
  Shield, 
  Globe, 
  TrendingUp, 
  Lock, 
  DollarSign,
  Code,
  BarChart,
  Smartphone,
  Users,
  Target,
  Award,
  Sparkles,
  Cpu,
  Wallet,
  ChevronRight,
  MapPin,
  Clock,
  Briefcase,
  Star
} from "lucide-react";

export default function CareersPage() {
  const [activeDepartment, setActiveDepartment] = useState("All");

  const departments = [
    "All",
    "Crypto Research",
    "Blockchain Engineering", 
    "Trading & Quant",
    "Security & Compliance",
    "DeFi Strategy",
    "Product & UX",
    "Growth & Marketing"
  ];

  const benefits = [
    {
      icon: <Bitcoin className="w-8 h-8" />,
      title: "Crypto Compensation",
      description: "Salary + bonuses paid in crypto options, token allocations"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Web3 Innovation",
      description: "Work with cutting-edge DeFi protocols and blockchain tech"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Remote First",
      description: "Work from anywhere with crypto-native team members worldwide"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Security Focus",
      description: "Learn from top blockchain security experts and auditors"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Market Exposure",
      description: "Direct exposure to crypto markets and trading strategies"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Career Growth",
      description: "Rapid advancement in the fastest-growing financial sector"
    }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Crypto Research Analyst",
      department: "Crypto Research",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years crypto",
      salary: "$150K - $250K + Tokens",
      premium: true,
      description: "Research emerging L1/L2 protocols, DeFi projects, and identify alpha opportunities for our investment funds.",
      tags: ["DeFi", "Tokenomics", "Protocol Analysis", "Alpha Research"]
    },
    {
      id: 2,
      title: "Smart Contract Engineer",
      department: "Blockchain Engineering", 
      location: "Remote",
      type: "Full-time",
      experience: "2+ years Solidity",
      salary: "$180K - $300K + Tokens",
      premium: true,
      description: "Build and audit DeFi protocols, create proprietary trading bots, and develop yield optimization strategies.",
      tags: ["Solidity", "EVM", "Smart Contracts", "DeFi"]
    },
    {
      id: 3,
      title: "Quantitative Trader",
      department: "Trading & Quant",
      location: "Remote",
      type: "Full-time", 
      experience: "4+ years trading",
      salary: "$200K - $400K + PnL Share",
      premium: true,
      description: "Develop algorithmic trading strategies across CEX/DEX venues, market making, and arbitrage opportunities.",
      tags: ["Algorithmic Trading", "Python", "CEX/DEX", "Quant"]
    },
    {
      id: 4,
      title: "Blockchain Security Analyst",
      department: "Security & Compliance",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years security",
      salary: "$160K - $280K + Tokens",
      premium: false,
      description: "Audit smart contracts, conduct security assessments, and ensure compliance across our crypto operations.",
      tags: ["Security", "Auditing", "Compliance", "Blockchain"]
    },
    {
      id: 5,
      title: "DeFi Strategist",
      department: "DeFi Strategy",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years DeFi", 
      salary: "$140K - $220K + Tokens",
      premium: false,
      description: "Design yield farming strategies, manage liquidity positions, and identify new DeFi opportunities.",
      tags: ["Yield Farming", "Liquidity", "DeFi Protocols", "Strategy"]
    },
    {
      id: 6,
      title: "Frontend Developer (Web3)",
      department: "Product & UX",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "$130K - $200K + Tokens",
      premium: false,
      description: "Build our investor dashboard, portfolio tracker, and DeFi interface using modern web3 technologies.",
      tags: ["React", "Web3.js", "Ethers.js", "Tailwind"]
    },
    {
      id: 7,
      title: "Crypto Growth Marketer",
      department: "Growth & Marketing",
      location: "Remote",
      type: "Full-time",
      experience: "2+ years crypto",
      salary: "$120K - $180K + Tokens",
      premium: false,
      description: "Lead marketing campaigns, community building, and growth strategies in the crypto/web3 space.",
      tags: ["Crypto Marketing", "Community", "Growth", "Social"]
    }
  ];

  const values = [
    {
      title: "Decentralization",
      description: "We believe in building permissionless, transparent financial systems",
      color: "from-orange-600 to-yellow-500",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Innovation", 
      description: "Pushing the boundaries of what's possible in DeFi and crypto",
      color: "from-purple-600 to-pink-500",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Security First",
      description: "Uncompromising security for our protocols and client assets",
      color: "from-green-600 to-emerald-500",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Alpha Mindset",
      description: "Always seeking the edge in crypto markets and technology",
      color: "from-blue-600 to-cyan-500",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const filteredJobs = activeDepartment === "All" 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === activeDepartment);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-black">
      {/* Hero Section - Crypto Theme */}
      <section className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white py-24 pt-32 px-4 overflow-hidden ">
        {/* Animated crypto background elements */}
        <div className="absolute top-10 right-10 opacity-10">
          <Bitcoin className="w-64 h-64" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
          <Cpu className="w-48 h-48" />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-2/3">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">Join the Crypto Revolution</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Build the Future of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-300">
                  Crypto Investing
                </span>
              </h1>
              <p className="text-xl text-purple-100 max-w-3xl mb-10">
                Join a team of crypto natives building next-generation investment platforms. 
                Work with cutting-edge DeFi protocols, manage crypto portfolios, and shape 
                the future of decentralized finance.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                  <Wallet className="w-6 h-6" />
                  View Crypto Roles
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                  <Bitcoin className="w-6 h-6" />
                  Crypto Perks
                </button>
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <Bitcoin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Crypto Native</h3>
                    <p className="text-sm text-purple-200">100% Remote Team</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Crypto Experts</span>
                    <span className="font-bold text-xl">50+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Countries</span>
                    <span className="font-bold text-xl">25+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Avg. Crypto Exp</span>
                    <span className="font-bold text-xl">5+ Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Portfolio AUM</span>
                    <span className="font-bold text-xl">$500M+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Crypto Focused */}
      <section className="max-w-7xl mx-auto px-4 py-16 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 text-center">
            <div className="text-4xl font-bold text-orange-500 mb-3">$500M+</div>
            <div className="text-gray-400">Crypto Assets Managed</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 text-center">
            <div className="text-4xl font-bold text-orange-500 mb-3">100%</div>
            <div className="text-gray-400">Remote Crypto Team</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 text-center">
            <div className="text-4xl font-bold text-orange-500 mb-3">50+</div>
            <div className="text-gray-400">Blockchains Supported</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 text-center">
            <div className="text-4xl font-bold text-orange-500 mb-3">24/7</div>
            <div className="text-gray-400">Crypto Market Coverage</div>
          </div>
        </div>
      </section>

      {/* Our Crypto Values */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Crypto Values</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The principles that guide our mission to democratize crypto investing
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="group">
              <div className={`h-2 rounded-t-2xl bg-gradient-to-r ${value.color} mb-6`}></div>
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-b-2xl p-8 border border-gray-800 hover:border-orange-500/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${value.color} flex items-center justify-center text-white mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Crypto Benefits */}
      <section className="bg-gradient-to-b from-gray-900 to-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Crypto <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Native Benefits</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built by crypto natives, for crypto natives
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 hover:border-orange-500/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crypto Job Openings */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Open <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Crypto Roles</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join our team of DeFi degens, crypto researchers, and blockchain builders
          </p>
        </div>

        {/* Department Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDepartment(dept)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeDepartment === dept
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 shadow-lg"
                    : "bg-gray-900 text-gray-300 border border-gray-700 hover:border-orange-500 hover:shadow-md"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
          <div className="text-center mt-6 text-gray-400">
            Showing {filteredJobs.length} crypto roles in {activeDepartment === "All" ? "all departments" : activeDepartment}
          </div>
        </div>

        {/* Crypto Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8 hover:border-orange-500/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {job.title}
                    </h3>
                    {job.premium && (
                      <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        PREMIUM ROLE
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Briefcase className="w-4 h-4" />
                      {job.department}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2 text-orange-400">
                      <Bitcoin className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>

                  <p className="text-gray-400 mb-6 max-w-3xl">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-800 text-orange-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:w-auto">
                  <button className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full lg:w-auto justify-center">
                    Apply in Crypto
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Jobs Message */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-900 to-black rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
              <Bitcoin className="w-12 h-12 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No Open Crypto Roles</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              No current openings in <span className="font-semibold text-orange-400">{activeDepartment}</span>.
              Check back soon or join our crypto talent pool.
            </p>
            <button
              onClick={() => setActiveDepartment("All")}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-bold hover:shadow-xl transition-all duration-300"
            >
              View All Crypto Roles
            </button>
          </div>
        )}
      </section>

      {/* Crypto Culture CTA */}
      <section className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 rounded-3xl mx-4 md:mx-8 lg:mx-16 my-16 overflow-hidden border border-gray-800">
        <div className="md:flex items-center justify-between p-8 md:p-12">
          <div className="md:w-2/3 mb-8 md:mb-0">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl md:text-4xl font-bold text-white">
                Crypto Native Culture
              </h3>
            </div>
            <p className="text-purple-200 text-lg mb-8 max-w-3xl">
              Work with fellow crypto enthusiasts, attend major conferences (ETHGlobal, DevCon, Consensus), 
              and contribute to open-source crypto projects.
            </p>
            <ul className="space-y-3 text-purple-100">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Regular crypto hackathons and builder sessions
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Crypto education and research stipends
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Contribute to DAOs and governance protocols
              </li>
            </ul>
          </div>
          <div className="md:w-1/3">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 shadow-2xl">
              <h4 className="font-bold text-white text-2xl mb-6">Crypto Talent Pool</h4>
              <p className="text-gray-400 mb-6">
                Not seeing your perfect crypto role? Join our talent pool for future opportunities.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option value="">Your crypto expertise</option>
                  <option value="defi">DeFi</option>
                  <option value="trading">Trading</option>
                  <option value="dev">Blockchain Dev</option>
                  <option value="research">Crypto Research</option>
                </select>
                <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300">
                  Join Crypto Talent Pool
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border border-gray-800">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bitcoin className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Go Full Crypto?
          </h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Join the leading crypto investment platform. Work with cutting-edge technology, 
            earn in crypto, and help build the future of decentralized finance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              Apply to Crypto Roles
            </button>
            <button className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-500/10 transition-all duration-300">
              Contact Crypto Team
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-8">
            💡 Pro tip: Include your Ethereum address or crypto portfolio in your application
          </p>
        </div>
      </section>
    </main>
  );
}