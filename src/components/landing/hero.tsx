"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pb-12">
      {/* Simple Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium">
            ✨ Mathematical Life Framework
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="bg-gradient-to-r from-white via-purple-200 to-green-200 bg-clip-text text-transparent">
            The Panyapat
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
            Equation Theorem
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          A calculus-based framework proving that{" "}
          <span className="text-purple-400 font-semibold">hope is mathematically guaranteed</span>
          {" "}and life stays bounded. <span className="text-red-400 font-semibold">(Guys, this is a joke project)</span>
        </motion.p>

        {/* Main Equation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 p-8 rounded-2xl bg-white/5 border border-purple-500/30 backdrop-blur-sm inline-block shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        >
          <div className="text-3xl md:text-4xl font-mono text-white">
            <span className="text-green-400">L</span>
            <sub className="text-gray-500">total</sub>
            <span className="text-gray-400 mx-2">=</span>
            <span className="text-gray-400">(</span>
            <span className="text-green-400">∑G</span>
            <span className="text-gray-400 mx-2">-</span>
            <span className="text-red-400">∑M</span>
            <span className="text-gray-400">)</span>
            <span className="text-gray-400 mx-2">+</span>
            <span className="text-gray-400">∑(</span>
            <span className="text-purple-400">ρ</span>
            <span className="text-gray-400 mx-1">×</span>
            <span className="text-green-400">G</span>
            <span className="text-gray-400">)</span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Direct Balance + Network Effect = Total Life Balance
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/life">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-2xl shadow-purple-500/30 border-purple-400/20 group"
            >
              Calculate Your Life Balance
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            className="bg-white/5 hover:bg-white/10 border-white/10 text-white font-medium text-lg px-8 py-6 rounded-xl"
            onClick={() => {
              document.getElementById('mathematics')?.scrollIntoView({
                behavior: "smooth",
                block: "start"
              })
            }}
          >
            Learn the Math
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div>
            <div className="text-3xl font-bold text-white mb-1">2:1</div>
            <div className="text-sm text-gray-500">M/G Ratio</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400 mb-1">∞</div>
            <div className="text-sm text-gray-500">Network Effect</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400 mb-1">100%</div>
            <div className="text-sm text-gray-500">Hope Guaranteed</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}