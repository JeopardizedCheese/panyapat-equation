"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import type { LifeEvent, Friend } from "@/lib/types"

interface LifeGraphProps {
  events: LifeEvent[]
  friends: Friend[]
}

export function LifeGraph({ events, friends }: LifeGraphProps) {
    const chartData = useMemo(() => {
    let directBalance = 0
    let totalNetworkBoost = 0

    const data: Array<{
      index: number
      direct: number
      network: number
      eventType: "M" | "G" | null
    }> = [
      {
        index: 0,
        direct: 0,
        network: 0,
        eventType: null,
      },
    ]

    events.forEach((event, idx) => {
      // Update direct balance
      const value = event.type === "M" ? -event.value : event.value
      directBalance += value

      // Calculate cumulative network effect
      if (event.type === "G" && event.sharedWith.length > 0) {
        const networkBoost = event.sharedWith.reduce((sum, friendId) => {
          const friend = friends.find((f) => f.id === friendId)
          return sum + (friend ? friend.relationshipCoefficient * event.value : 0)
        }, 0)
        totalNetworkBoost += networkBoost
      }

      data.push({
        index: idx + 1,
        direct: directBalance,
        network: directBalance + totalNetworkBoost,
        eventType: event.type,
      })
    })

    return data
  }, [events, friends])

  // Custom dot for events (I hate you TypeScript screw it)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props
    if (!payload.eventType) return null

    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={payload.eventType === "M" ? "#f87171" : "#4ade80"}
        stroke="#000"
        strokeWidth={2}
      />
    )
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null

    return (
      <div className="rounded-lg bg-zinc-900 border border-white/20 p-3 shadow-xl">
        <p className="text-sm font-semibold text-cyan-400 mb-2">
          Event #{payload[0].payload.index}
        </p>
        <div className="space-y-1">
          <p className="text-xs text-emerald-400">
            Direct: <span className="font-mono font-bold">{payload[0].value.toFixed(1)}</span>
          </p>
          {payload[1] && (
            <p className="text-xs text-purple-400">
              Network: <span className="font-mono font-bold">{payload[1].value.toFixed(1)}</span>
            </p>
          )}
          {payload[0].payload.eventType && (
            <p className="text-xs text-gray-400">
              Type:{" "}
              <span className={payload[0].payload.eventType === "M" ? "text-red-400" : "text-green-400"}>
                {payload[0].payload.eventType === "M" ? "Misfortune" : "Good Fortune"}
              </span>
            </p>
          )}
        </div>
      </div>
    )
  }

  // If no events, show empty state
  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
      >
        <h2 className="text-lg font-semibold text-gray-300 mb-4">
          Life Balance Over Time
        </h2>
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">No events logged yet</p>
            <p className="text-gray-600 text-sm">
              Start logging events to see your life balance visualized!
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-300 mb-1">
          Life Balance Over Time
        </h2>
        <p className="text-sm text-gray-500">
          Track your balance with network effects
        </p>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.5} />
            
            <XAxis
              dataKey="index"
              stroke="#71717a"
              label={{
                value: "Events",
                position: "insideBottom",
                offset: -5,
                fill: "#06b6d4",
              }}
            />
            
            <YAxis
              stroke="#71717a"
              label={{
                value: "Balance",
                angle: -90,
                position: "insideLeft",
                fill: "#10b981",
              }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <ReferenceLine y={0} stroke="#71717a" strokeDasharray="3 3" />

            {/* Direct Balance Line */}
            <Line
              type="monotone"
              dataKey="direct"
              stroke="#10b981"
              strokeWidth={3}
              name="Direct Balance"
              dot={<CustomDot />}
            />

            {/* Network Effect Line */}
            <Line
              type="monotone"
              dataKey="network"
              stroke="#a855f7"
              strokeWidth={3}
              name="With Network Effect"
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 shadow-lg shadow-red-400/50" />
          <span className="text-red-400 font-medium">Misfortune</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
          <span className="text-green-400 font-medium">Good Fortune</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-emerald-500 shadow-lg shadow-emerald-500/50" />
          <span className="text-emerald-400 font-medium">Direct Balance</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-0.5 bg-purple-500 shadow-lg shadow-purple-500/50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #a855f7, #a855f7 5px, transparent 5px, transparent 10px)",
            }}
          />
          <span className="text-purple-400 font-medium">Network Effect</span>
        </div>
      </div>
    </motion.div>
  )
}