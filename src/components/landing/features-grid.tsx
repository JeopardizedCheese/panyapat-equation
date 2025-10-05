"use client"

import { motion } from "framer-motion"
import { Brain, TrendingUp, Users, BarChart3, Sparkles, Shield } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Event Tracking",
    description: "Log life's ups and downs with customizable impact ratings from 1-20.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Brain,
    title: "AI-Powered Rating",
    description: "Let AI analyze your events and suggest accurate impact scores.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Users,
    title: "Network Effect",
    description: "Share good fortunes with friends and multiply your life balance through relationships.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Debt Cycles",
    description: "Every 2 misfortunes guarantee 1 good fortune. The theorem predicts when hope arrives.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Track your balance over time with interactive graphs showing direct and network effects.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Bounded Life",
    description: "Mathematical proof that your life stays balanced—no infinite spirals of despair.",
    gradient: "from-teal-500 to-cyan-500",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-12 px-6 bg-black relative">
      {/* Section Header */}
      <div className="container mx-auto max-w-6xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
              Features That Matter
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A complete system for tracking, analyzing, and understanding your life's balance.
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all"
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-xl`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-4 shadow-lg`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </section>
  )
}