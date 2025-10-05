"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="py-24 px-6 bg-black relative border-t border-white/10">
      {/* Final CTA */}
      <div className="container mx-auto max-w-4xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
              Ready to Calculate Your Life?
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Start tracking your events, discover patterns, and prove that hope is mathematically guaranteed.
          </p>
          
          <Link href="/life">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white font-bold text-xl px-12 py-8 rounded-xl shadow-2xl shadow-purple-500/40 border-purple-400/20 group"
            >
              Start Calculating
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Powered By Section */}
      <div className="container mx-auto max-w-4xl pt-12 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm mb-6">Powered by</p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {/* Next.js */}
            <div className="flex items-center gap-2 group">
              <svg className="w-8 h-8" viewBox="0 0 180 180" fill="none">
                <mask id="mask0_408_134" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                  <circle cx="90" cy="90" r="90" fill="black"/>
                </mask>
                <g mask="url(#mask0_408_134)">
                  <circle cx="90" cy="90" r="90" fill="black"/>
                  <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)"/>
                  <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-gray-400 font-medium group-hover:text-white transition-colors">Next.js</span>
            </div>

            {/* React */}
            <div className="flex items-center gap-2 group">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
                <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
                <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)"/>
                <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(-60 12 12)"/>
              </svg>
              <span className="text-gray-400 font-medium group-hover:text-white transition-colors">React</span>
            </div>
            

            {/* Tailwind */}
            <div className="flex items-center gap-2 group">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.17 8.17 10.5 8.5C11.26 8.67 11.81 9.23 12.41 9.84C13.39 10.84 14.53 12 17 12C19.67 12 21.33 10.67 22 8C21 9.33 19.83 9.83 18.5 9.5C17.74 9.33 17.19 8.77 16.59 8.16C15.61 7.16 14.47 6 12 6ZM7 12C4.33 12 2.67 13.33 2 16C3 14.67 4.17 14.17 5.5 14.5C6.26 14.67 6.81 15.23 7.41 15.84C8.39 16.84 9.53 18 12 18C14.67 18 16.33 16.67 17 14C16 15.33 14.83 15.83 13.5 15.5C12.74 15.33 12.19 14.77 11.59 14.16C10.61 13.16 9.47 12 7 12Z" fill="#06B6D4"/>
              </svg>
              <span className="text-gray-400 font-medium group-hover:text-white transition-colors">Tailwind CSS</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto max-w-4xl mt-12 text-center">
        <p className="text-gray-600 text-sm">
          © 2025 The Panyapat Equation Theorem. Built with calculus and hope.
        </p>
      </div>
    </footer>
  )
}