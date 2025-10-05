"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { LifeEvent, RatioStatus } from "@/lib/types"

interface StatusCardProps {
  events: LifeEvent[]
  totalBalance: number
  directBalance: number
  networkEffect: number
  ratioStatus: RatioStatus
}

export function StatusCard({
  events,
  totalBalance,
  directBalance,
  networkEffect,
  ratioStatus,
}: StatusCardProps) {
  // Count M's and G's
  const mCount = events.filter((e) => e.type === "M").length
  const gCount = events.filter((e) => e.type === "G").length
  const totalEvents = events.length

  // Calculate progress percentage (for visual bar)
  // If we have events, show how "full" our M/G ratio is
  const progressPercentage = totalEvents > 0 
    ? Math.min(100, (totalEvents / 20) * 100) // Scale to 20 events max
    : 0

  // Determine balance color
  const getBalanceColor = () => {
    if (totalBalance > 0) return "text-green-400"
    if (totalBalance < 0) return "text-red-400"
    return "text-gray-400"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-300 mb-4">
        Life Balance Overview
      </h2>

      {/* Total Balance - The Big Number */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-1">Total Balance</p>
        <motion.div
          key={totalBalance}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className={`text-5xl font-bold font-mono ${getBalanceColor()}`}>
            {totalBalance > 0 ? "+" : ""}
            {totalBalance.toFixed(1)}
          </p>
          <p className="text-sm text-gray-500">points</p>
        </motion.div>
      </div>

      {/* Balance Breakdown */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Direct Balance */}
        <div className="rounded-lg bg-white/5 p-3 border border-white/5">
          <p className="text-xs text-gray-400 mb-1">Direct Balance</p>
          <p className={`text-2xl font-bold font-mono ${
            directBalance >= 0 ? "text-emerald-400" : "text-red-400"
          }`}>
            {directBalance > 0 ? "+" : ""}{directBalance.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Your G's - M's</p>
        </div>

        {/* Network Effect */}
        <div className="rounded-lg bg-white/5 p-3 border border-white/5">
          <p className="text-xs text-gray-400 mb-1">Network Effect</p>
          <p className="text-2xl font-bold font-mono text-purple-400">
            +{networkEffect.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-1">From friends</p>
        </div>
      </div>

      {/* Event Counts & Ratio */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-2xl">😔</span>
              <span className="text-sm font-mono text-red-400">{mCount}M</span>
            </div>
            <div className="text-gray-600">/</div>
            <div className="flex items-center gap-1">
              <span className="text-2xl">😊</span>
              <span className="text-sm font-mono text-green-400">{gCount}G</span>
            </div>
          </div>

          {/* Ratio */}
          <div className="text-right">
            <p className="text-xs text-gray-400">Ratio</p>
            <p className="text-sm font-mono text-gray-300">
              {ratioStatus.ratio === Infinity 
                ? "∞:1" 
                : `${ratioStatus.ratio.toFixed(2)}:1`}
            </p>
          </div>
        </div>

        {/* Progress Bar (visual representation of events) */}
        <Progress 
          value={progressPercentage} 
          className="h-2"
        />
        <p className="text-xs text-gray-500 mt-1">
          {totalEvents} total events logged
        </p>
      </div>

      {/* Ratio Status */}
      <div className="flex items-center gap-2">
        <Badge 
          variant={ratioStatus.isHealthy ? "default" : "destructive"}
          className="text-xs"
        >
          {ratioStatus.isHealthy ? "✅ Healthy Ratio" : "⚠️ Ratio Warning"}
        </Badge>

        {ratioStatus.warning && (
          <p className="text-xs text-gray-400 flex-1">
            {ratioStatus.warning}
          </p>
        )}
      </div>

      {/* Footer - Ideal Ratio Info */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-500 text-center">
          Ideal ratio: <span className="font-mono text-gray-400">2:1</span> (Panyapat Theorem)
        </p>
      </div>
    </motion.div>
  )
}