"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { LifeEvent, Friend } from "@/lib/types"

interface EventListProps {
  events: LifeEvent[]
  friends: Friend[]
  onRemoveEvent: (id: string) => void
}

export function EventList({ events, friends, onRemoveEvent }: EventListProps) {
  // Helper to format timestamp
  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes} min ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    return `${days} day${days > 1 ? "s" : ""} ago`
  }

  // Helper to get friend names from IDs
  const getFriendNames = (friendIds: string[]) => {
    return friendIds
      .map((id) => friends.find((f) => f.id === id)?.name)
      .filter(Boolean)
      .join(", ")
  }

  // Sort events by timestamp (newest first)
  const sortedEvents = [...events].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-300">Event History</h2>
        <span className="text-sm text-gray-500 font-mono">
          {events.length} event{events.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="border-b border-white/10 mb-4" />

      {/* Events List */}
      <ScrollArea className="h-[400px] pr-4">
        {events.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm mb-2">No events logged yet</p>
            <p className="text-gray-600 text-xs">
              Use the Event Logger to add your first event!
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {sortedEvents.map((event, index) => {
                const sharedFriends = getFriendNames(event.sharedWith)

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group rounded-lg bg-white/5 p-4 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      {/* Event icon */}
                      <span className="text-3xl shrink-0">
                        {event.type === "M" ? "😔" : "😊"}
                      </span>

                      {/* Event details */}
                      <div className="flex-1 min-w-0">
                        {/* Description */}
                        <p className="text-white font-medium mb-1 break-words">
                          {event.description}
                        </p>

                        {/* Value and time */}
                        <div className="flex items-center gap-3 text-sm">
                          <span
                            className={`font-mono ${
                              event.type === "M"
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            {event.type === "M" ? "-" : "+"}
                            {event.value} pts
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500">
                            {formatTime(event.timestamp)}
                          </span>
                        </div>

                        {/* Shared with friends */}
                        {sharedFriends && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-purple-400">
                              👥 Shared with:
                            </span>
                            <span className="text-xs text-gray-400">
                              {sharedFriends}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Delete button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveEvent(event.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 h-8 w-8 hover:bg-red-500/20 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </AnimatePresence>
        )}
      </ScrollArea>

      {/* Footer stats */}
      {events.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex justify-between text-xs text-gray-500">
            <span>
              {events.filter((e) => e.type === "M").length} misfortunes
            </span>
            <span>
              {events.filter((e) => e.type === "G").length} good fortunes
            </span>
            <span>
              {events.filter((e) => e.sharedWith.length > 0).length} shared
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}