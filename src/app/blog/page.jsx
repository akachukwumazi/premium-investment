"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, TrendingUp, Shield, Cpu, Zap, Bitcoin, Lock, Globe, Coins, Gem, Sparkles } from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Topics");

  const featuredPost = {
    id: 1,
    title: "Bitcoin Halving 2024: Alpha Strategies for Maximum Returns",
    excerpt: "Exclusive analysis of pre-halving market dynamics, miner behavior, and portfolio positioning strategies to capitalize on the 2024 Bitcoin halving event.",
    author: "Alexandra Chen",
    date: "Mar 15, 2024",
    readTime: "9 min read",
    category: "Crypto Strategies",
    premium: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "DeFi 2.0: Next-Generation Yield Farming Protocols",
      excerpt: "Deep dive into innovative DeFi protocols offering sustainable yields with minimized impermanent loss and enhanced capital efficiency.",
      author: "Michael Rodriguez",
      date: "Mar 12, 2024",
      readTime: "8 min read",
      category: "DeFi & Web3",
      icon: <Coins className="w-5 h-5" />,
      premium: true
    },
    {
      id: 3,
      title: "Layer 2 Wars: Arbitrum vs Optimism vs zkSync Analysis",
      excerpt: "Comprehensive comparison of leading Ethereum L2 solutions, their tokenomics, ecosystem growth, and investment opportunities.",
      author: "James Wilson",
      date: "Mar 10, 2024",
      readTime: "11 min read",
      category: "Blockchain Analysis",
      icon: <Cpu className="w-5 h-5" />
    },
    {
      id: 4,
      title: "Crypto Security: Protecting Assets from Smart Contract Exploits",
      excerpt: "Advanced security protocols, multi-sig strategies, and wallet management techniques for institutional crypto investors.",
      author: "Lisa Park",
      date: "Mar 8, 2024",
      readTime: "7 min read",
      category: "Crypto Security",
      icon: <Shield className="w-5 h-5" />,
      premium: true
    },
    {
      id: 5,
      title: "NFT Financialization: Collateralized Lending Strategies",
      excerpt: "How to leverage high-value NFTs as collateral for DeFi loans and generate yield from digital art collections.",
      author: "David Kim",
      date: "Mar 5, 2024",
      readTime: "8 min read",
      category: "NFT Investments",
      icon: <Gem className="w-5 h-5" />
    },
    {
      id: 6,
      title: "Real-World Assets (RWA) Tokenization: $16T Opportunity",
      excerpt: "Analysis of tokenized real estate, commodities, and private equity entering the crypto ecosystem.",
      author: "Emma Thompson",
      date: "Mar 3, 2024",
      readTime: "10 min read",
      category: "Tokenomics",
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 7,
      title: "Crypto Quant Trading: Algorithmic Strategies for Alpha",
      excerpt: "Proprietary trading algorithms, market making strategies, and arbitrage opportunities across CEX/DEX venues.",
      author: "Alex Morgan",
      date: "Feb 28, 2024",
      readTime: "9 min read",
      category: "Crypto Strategies",
      icon: <TrendingUp className="w-5 h-5" />,
      premium: true
    },
    {
      id: 8,
      title: "Staking 2.0: Liquid Staking Derivatives & Restaking",
      excerpt: "Advanced staking strategies using LSDs and EigenLayer's restaking protocol for enhanced yields.",
      author: "Robert Chen",
      date: "Feb 25, 2024",
      readTime: "7 min read",
      category: "DeFi & Web3",
      icon: <Lock className="w-5 h-5" />,
      premium: true
    },
    {
      id: 9,
      title: "Crypto Tax Optimization: Legal Structures for Digital Assets",
      excerpt: "Tax-efficient investment vehicles, harvesting strategies, and jurisdiction selection for crypto portfolios.",
      author: "Jennifer Lee",
      date: "Feb 22, 2024",
      readTime: "6 min read",
      category: "Crypto Security",
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 10,
      title: "AI x Crypto: Decentralized Machine Learning Networks",
      excerpt: "Analysis of AI-powered crypto projects and decentralized compute marketplaces.",
      author: "Sam Altman",
      date: "Feb 20, 2024",
      readTime: "8 min read",
      category: "Market Intelligence",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: 11,
      title: "Cross-Chain Interoperability: Bridging & Messaging Protocols",
      excerpt: "Technical analysis of LayerZero, Wormhole, and other cross-chain solutions enabling multi-chain DeFi.",
      author: "Vitalik Buterin",
      date: "Feb 18, 2024",
      readTime: "9 min read",
      category: "Blockchain Analysis"
    },
    {
      id: 12,
      title: "Crypto Venture Capital: Early-Stage Investment Thesis",
      excerpt: "Our framework for evaluating pre-seed and seed stage crypto projects across infrastructure, DeFi, and consumer apps.",
      author: "Marc Andreessen",
      date: "Feb 15, 2024",
      readTime: "7 min read",
      category: "Market Intelligence",
      premium: true
    }
  ];

  const categories = [
    "All Topics",
    "Crypto Strategies",
    "DeFi & Web3",
    "Blockchain Analysis",
    "NFT Investments",
    "Crypto Security",
    "Tokenomics",
    "Market Intelligence"
  ];

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === "All Topics" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section - Crypto Theme */}
      <section className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white pt-20 pt-35 py-16 px-4">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-10 right-10 opacity-10">
          <Bitcoin className="w-64 h-64" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="md:w-2/3">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">Crypto Alpha</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-300">
                  Premium Invest
                </span>
                <br />
                Crypto Intelligence
              </h1>
              <p className="text-xl text-purple-100 max-w-3xl mb-8">
                Exclusive crypto market analysis, DeFi strategies, and blockchain insights 
                to maximize your digital asset portfolio performance. Institutional-grade research 
                for serious crypto investors.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                  <Bitcoin className="w-5 h-5" />
                  Access Crypto Reports
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                  View Portfolio Performance
                </button>
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">On-Chain Alpha</h3>
                    <p className="text-sm text-purple-200">Whale Insights</p>
                  </div>
                </div>
                <p className="text-purple-100 mb-4 italic">
                  &quot;Smart money wallets accumulated 15,000 BTC in the past week. 
                  Our algorithms identified this 48 hours before price movement.&quot;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Satoshi Nakamoto</p>
                    <p className="text-sm text-purple-200">Chief Crypto Strategist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="max-w-7xl mx-auto px-4 py-12 -mt-10">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="md:flex">
            <div className="md:w-2/3 p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Bitcoin className="w-4 h-4" />
                  Featured Analysis
                </span>
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  {featuredPost.date}
                </span>
                <span className="text-gray-500 text-sm">•</span>
                <span className="text-gray-400 text-sm">{featuredPost.readTime}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {featuredPost.title}
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                {featuredPost.excerpt}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                    AC
                  </div>
                  <div>
                    <p className="font-semibold text-white">{featuredPost.author}</p>
                    <p className="text-sm text-gray-400">Senior Crypto Analyst</p>
                  </div>
                </div>
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Read Full Analysis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-8 border-l border-gray-800">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Key Insights</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center gap-2 text-gray-300">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Miner capitulation signals
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Hash rate analysis
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Supply shock projections
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Portfolio allocation models
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 shadow-lg"
                    : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-orange-500 hover:shadow-md"
                }`}
              >
                {category === "Crypto Strategies" && <Bitcoin className="w-4 h-4" />}
                {category === "DeFi & Web3" && <Coins className="w-4 h-4" />}
                {category === "Crypto Security" && <Shield className="w-4 h-4" />}
                {category}
              </button>
            ))}
          </div>
          
          {/* Results count */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-gray-400">
              Showing {filteredPosts.length} of {blogPosts.length} crypto insights
              {selectedCategory !== "All Topics" && (
                <span> in <span className="font-semibold text-orange-400">{selectedCategory}</span></span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Premium Content:</span>
              <div className="flex items-center gap-1">
                <Gem className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-white">{blogPosts.filter(p => p.premium).length} Alpha Reports</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className={`group relative bg-gradient-to-br from-gray-900 to-black rounded-xl border overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  post.premium 
                    ? "border-orange-500/50 shadow-lg" 
                    : "border-gray-800"
                }`}
              >
                {post.premium && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Gem className="w-3 h-3" />
                      ALPHA
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      post.premium 
                        ? "bg-orange-500/20 text-orange-300 border border-orange-500/30" 
                        : "bg-gray-800 text-gray-300 border border-gray-700"
                    }`}>
                      {post.category}
                    </span>
                    {post.icon && (
                      <div className={`${
                        post.premium ? "text-orange-400" : "text-gray-400"
                      }`}>
                        {post.icon}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-gray-800 pt-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        post.premium
                          ? "bg-gradient-to-r from-orange-500 to-yellow-500"
                          : "bg-gradient-to-r from-gray-700 to-gray-800"
                      }`}>
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-white">{post.author}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                          <span className="text-gray-600">•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      href={`/blog/${post.id}`}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        post.premium
                          ? "bg-orange-500/20 text-orange-400 group-hover:bg-orange-500/30 group-hover:scale-110 border border-orange-500/30"
                          : "bg-gray-800 text-gray-400 group-hover:bg-gray-700 group-hover:scale-110 border border-gray-700"
                      }`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
              <Bitcoin className="w-12 h-12 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Crypto Insights Coming Soon</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              We&apos;re preparing exclusive crypto research for the <span className="font-semibold text-orange-400">{selectedCategory}</span> category. 
              Check back soon or explore our current crypto insights.
            </p>
            <button
              onClick={() => setSelectedCategory("All Topics")}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Bitcoin className="w-5 h-5" />
              View All Crypto Insights
            </button>
          </div>
        )}

        {/* Premium CTA */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 rounded-2xl overflow-hidden border border-gray-800">
          <div className="md:flex items-center justify-between p-8 md:p-12">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-8 h-8 text-yellow-400" />
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Unlock Crypto Alpha Intelligence
                </h3>
              </div>
              <p className="text-purple-200 text-lg mb-6">
                Get exclusive access to institutional-grade crypto research, on-chain analytics, 
                and proprietary trading signals used by top crypto funds.
              </p>
              <ul className="space-y-2 text-purple-100">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Real-time whale wallet tracking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Smart contract exploit alerts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  DeFi yield optimization algorithms
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Early access to IDOs and token launches
                </li>
              </ul>
            </div>
            <div className="md:w-1/3">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 shadow-2xl">
                <h4 className="font-bold text-white text-xl mb-4 flex items-center gap-2">
                  <Gem className="w-5 h-5 text-yellow-500" />
                  Premium Crypto Access
                </h4>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="">Select portfolio size</option>
                    <option value="100k">$100K - $500K</option>
                    <option value="500k">$500K - $1M</option>
                    <option value="1m">$1M - $5M</option>
                    <option value="5m">$5M+</option>
                  </select>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-gray-900 font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300">
                    Request Premium Access
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    For accredited investors. Minimum crypto portfolio: 5 BTC equivalent
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 shadow-sm">
            <div className="text-3xl font-bold text-orange-500 mb-2">$500M+</div>
            <div className="text-gray-400">Crypto Assets Managed</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 shadow-sm">
            <div className="text-3xl font-bold text-orange-500 mb-2">94.3%</div>
            <div className="text-gray-400">Annualized Crypto Returns*</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 shadow-sm">
            <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
            <div className="text-gray-400">Blockchains Monitored</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 shadow-sm">
            <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
            <div className="text-gray-400">On-Chain Surveillance</div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">*Past performance. Crypto investments are high risk.</p>
      </section>
    </main>
  );
}