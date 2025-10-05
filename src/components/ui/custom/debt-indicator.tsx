"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { DebtState } from "@/lib/types"

interface DebtIndicatorProps {
  debt: DebtState
}

export function DebtIndicator({ debt }: DebtIndicatorProps) {
    
    const isBalanced = debt.status === "BALANCED";
    const needsG = debt.status === "NEED_G";
    const needsM = debt.status === "NEED_M";

  // Determine color based on debt status
  const getColor = () => {
    if (needsG) return "text-red-400"
    if (needsM) return "text-blue-400"
    return "text-green-400"
  }

  const getBgColor = () => {
    if (needsG) return "bg-red-500/10"
    if (needsM) return "bg-blue-500/10"
    return "bg-green-500/10"
  }

  const getGlowColor = () => {
    if (needsG) return "shadow-red-500/50"
    if (needsM) return "shadow-blue-500/50"
    return "shadow-green-500/50"
  }

  return (
    <div className={`relative rounded-xl p-8 border border-white/10 ${getBgColor()}`}>
      {/* Glow effect when debt is not balanced */}
      {isBalanced && (
        <motion.div
          className={`absolute inset-0 rounded-xl ${getGlowColor()}`}
          animate={{
            boxShadow: [
              "0 0 20px rgba(255, 255, 255, 0.1)",
              "0 0 40px rgba(255, 255, 255, 0.2)",
              "0 0 20px rgba(255, 255, 255, 0.1)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <div className="relative z-10-">
        {/* Label */}
        <p className="text-sm text-gray-400 mb-2 text-center font-medium">
          Current Debt
        </p>

        {/* The Big Number */}
        <AnimatePresence mode="wait">
          <motion.div
            key={debt.netDebt} // Re-animate when debt changes
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-center"
          >
            <span className={`text-9xl font-bold font-mono ${getColor()}`}>
              {debt.netDebt > 0 ? "+" : ""}
              {debt.netDebt}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Prediction Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-2xl font-bold text-gray-300 mt-10"
        >
          {debt.prediction}
        </motion.p>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-4"
        >
          <span
            className={`px-3 py-1 rounded-full text-xl font-medium ${
              isBalanced
                ? "bg-green-500/20 text-green-400"
                : needsG
                  ? "bg-red-500/20 text-red-400"
                  : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {isBalanced && "⚖️ Balanced"}
            {needsG  && "🔮 Good Fortune Predicted"}
            {needsM && "⚡ Too Lucky!"}
          </span>
        </motion.div>
      </div>
    </div>
  )
}