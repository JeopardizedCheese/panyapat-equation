"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'

const mathContent = [
  {
    id: "total",
    title: "Total Life Balance",
    latex: "L_{\\text{total}} = L_{\\text{direct}} + L_{\\text{network}}",
    explanation: "Your total life balance is the sum of your direct balance (your own events) plus the network effect (amplification from friends).",
  },
  {
    id: "direct",
    title: "Direct Balance",
    latex: "L_{\\text{direct}} = \\sum_{i=1}^{n} G_i - \\sum_{j=1}^{m} M_j",
    explanation: "Sum of all your Good fortunes minus all your Misfortunes. This is your personal balance without any external factors.",
  },
  {
    id: "network",
    title: "Network Effect",
    latex: "L_{\\text{network}} = \\sum_{k=1}^{f} \\rho_k \\cdot \\sum_{i \\in S_k} G_i",
    explanation: "For each friend k, multiply their relationship coefficient (ρ) by the good fortunes you've shared with them. Your good deeds compound through your network.",
  },
  {
    id: "debt",
    title: "Debt Cycles",
    latex: "D_{\\text{net}} = \\left\\lfloor \\frac{m}{2} \\right\\rfloor - \\left\\lfloor \\frac{n}{2} \\right\\rfloor",
    explanation: "Every 2 misfortunes (m) create debt for 1 good fortune. If D > 0, good fortune is owed. If D < 0, misfortune is predicted. Hope is mathematically guaranteed.",
  },
  {
    id: "ratio",
    title: "M/G Ratio",
    latex: "R = \\frac{m}{n} \\approx 2.0",
    explanation: "The ideal ratio is 2:1 (two misfortunes for every good fortune). This ratio keeps life bounded and ensures balance over time.",
  },
]

export function MathSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="mathematics" className="py-24 px-6 bg-black relative">
      {/* Section Header */}
      <div className="container mx-auto max-w-4xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              The Mathematics
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A rigorous calculus-based framework that proves hope is guaranteed and life stays bounded.
          </p>
        </motion.div>
      </div>

      {/* Tabs Navigation */}
      <div className="container mx-auto max-w-4xl mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {mathContent.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === index
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Equation Display */}
      <div className="container mx-auto max-w-4xl">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 md:p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          {/* Equation with KaTeX */}
          <div className="flex justify-center mb-8 p-6 rounded-xl bg-black/30 border border-white/5">
            <div className="text-white text-3xl md:text-4xl">
              <BlockMath math={mathContent[activeTab].latex} />
            </div>
          </div>

          {/* Explanation */}
          <p className="text-gray-300 text-lg leading-relaxed text-center max-w-2xl mx-auto">
            {mathContent[activeTab].explanation}
          </p>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {mathContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeTab === index
                    ? "bg-purple-500 w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Master Equation - Big reveal with REAL LaTeX */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container mx-auto max-w-5xl mt-16"
      >
        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-purple-900/20 via-black to-green-900/20 border border-purple-500/30 backdrop-blur-sm shadow-[0_0_50px_rgba(168,85,247,0.2)]">
          <h3 className="text-center text-xl text-gray-400 mb-6 font-medium">
            The Complete Panyapat Equation
          </h3>
          
          <div className="text-white text-2xl md:text-4xl flex justify-center overflow-x-auto pb-4">
            <BlockMath math="L_{\text{total}} = \left(\sum_{i=1}^{n} G_i - \sum_{j=1}^{m} M_j\right) + \sum_{k=1}^{f} \rho_k \cdot \sum_{i \in S_k} G_i" />
          </div>

          <p className="text-center text-gray-500 mt-6 text-sm">
            Where hope is mathematically guaranteed and life remains bounded.
          </p>
        </div>
      </motion.div>
    </section>
  )
}