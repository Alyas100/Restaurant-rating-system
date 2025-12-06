"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: Star,
      title: "Authentic Reviews",
      description:
        "Read genuine reviews from real diners who've experienced the food",
    },
    {
      icon: Zap,
      title: "Quick Discovery",
      description: "Find your perfect restaurant in seconds with smart filters",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of food lovers sharing their experiences",
    },
    {
      icon: Shield,
      title: "Verified Ratings",
      description: "Trust ratings based on verified customer experiences",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Blogger",
      content:
        "FoodReview has transformed how I discover new restaurants. The reviews are honest and detailed!",
      emoji: "😍",
    },
    {
      name: "Michael Chen",
      role: "Restaurant Owner",
      content:
        "This platform helped me understand my customers better and improve my service.",
      emoji: "🙌",
    },
    {
      name: "Emma Davis",
      role: "Foodie",
      content:
        "Finally a place where I can share my dining experiences with people who actually care!",
      emoji: "⭐",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            🍽️ FoodReview
          </div>
          <div className="flex gap-4 items-center">
            <Link
              href="/restaurants"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute inset-0 bg-grid-white/5" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-semibold">
              ✨ Discover Amazing Restaurants
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Find Your Next Favorite
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Restaurant
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto"
          >
            Get Honest Review from real customer, dont get fooled by influencer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              href="/restaurants"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold flex items-center gap-2 transition-all hover:scale-105"
            >
              Explore Restaurants
              <ArrowRight size={20} />
            </Link>
            <button className="px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 text-white font-semibold transition-colors">
              Learn More
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { number: "1,248", label: "Restaurants" },
              { number: "8,543", label: "Reviews" },
              { number: "50K+", label: "Users" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <p className="text-3xl font-bold text-indigo-400 mb-1">
                  {stat.number}
                </p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose FoodReview?
            </h2>
            <p className="text-xl text-slate-400">
              Everything you need to find, rate, and share restaurant
              experiences
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-panel rounded-2xl p-8 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all group"
              >
                <div className="mb-4 w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/40 transition-colors">
                  <feature.icon className="text-indigo-400" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                title: "Search",
                description: "Find restaurants by name, cuisine, or location",
              },
              {
                step: "02",
                title: "Read Reviews",
                description:
                  "Check authentic reviews and ratings from other diners",
              },
              {
                step: "03",
                title: "Share Your Experience",
                description:
                  "Leave your own review and help others make decisions",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="relative">
                <div className="absolute -top-6 left-0 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="pt-12 glass-panel rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-20 -right-4">
                    <ChevronRight className="text-indigo-500/50" size={32} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What People Say
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-panel rounded-2xl p-8 border border-white/10 hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                  <span className="text-3xl">{testimonial.emoji}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-slate-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto glass-panel rounded-3xl p-12 border border-white/10 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Find Your Next Favorite?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of food lovers discovering amazing restaurants
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/restaurants"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold transition-all hover:scale-105"
            >
              Start Exploring
            </Link>
            <div className="flex items-center justify-center px-6 py-4 rounded-xl border border-white/20 hover:border-white/40 transition-colors">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none text-white placeholder-slate-500 w-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🍽️ FoodReview</h3>
              <p className="text-slate-400">
                Discover, rate, and share your dining experiences
              </p>
            </div>
            {[
              { title: "Product", links: ["Explore", "Dashboard", "Features"] },
              { title: "Company", links: ["About", "Blog", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2 text-slate-400">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2025 FoodReview. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
