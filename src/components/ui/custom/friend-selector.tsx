"use client"

import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Friend } from "@/lib/types"

interface FriendSelectorProps {
  friends: Friend[]
  selected: string[]
  onChange: (selectedIds: string[]) => void
}

export function FriendSelector({
  friends,
  selected,
  onChange,
}: FriendSelectorProps) {
  const handleToggle = (friendId: string) => {
    if (selected.includes(friendId)) {
      // Remove from selection
      onChange(selected.filter((id) => id !== friendId))
    } else {
      // Add to selection
      onChange([...selected, friendId])
    }
  }

  const handleSelectAll = () => {
    if (selected.length === friends.length) {
      // Deselect all
      onChange([])
    } else {
      // Select all
      onChange(friends.map((f) => f.id))
    }
  }

  if (friends.length === 0) {
    return (
      <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-center">
        <p className="text-sm text-gray-500 mb-1">
          No friends in your network yet
        </p>
        <p className="text-xs text-gray-600">
          Add friends in the Network Panel to share events with them
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-3"
    >
      {/* Header with Select All */}
      <div className="flex items-center justify-between">
        <Label className="text-gray-300">
          Share this event with:
        </Label>
        <button
          onClick={handleSelectAll}
          className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
        >
          {selected.length === friends.length ? "Deselect All" : "Select All"}
        </button>
      </div>

      {/* Friend List */}
      <ScrollArea className="max-h-[200px] rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="space-y-2">
          {friends.map((friend) => {
            const isSelected = selected.includes(friend.id)

            return (
              <motion.div
                key={friend.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-purple-500/20 border border-purple-500/50"
                    : "hover:bg-white/5"
                }`}
                onClick={() => handleToggle(friend.id)}
              >
                <Checkbox
                  id={friend.id}
                  checked={isSelected}
                  onCheckedChange={() => handleToggle(friend.id)}
                  className="pointer-events-none"
                />
                <Label
                  htmlFor={friend.id}
                  className="flex-1 cursor-pointer flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">👤</span>
                    <span className="text-sm text-white">{friend.name}</span>
                  </span>
                  <span className="text-xs text-gray-500 font-mono">
                    ρ={friend.relationshipCoefficient.toFixed(1)}
                  </span>
                </Label>
              </motion.div>
            )
          })}
        </div>
      </ScrollArea>

      {/* Selected count */}
      <p className="text-xs text-gray-500 text-center">
        {selected.length === 0
          ? "No friends selected"
          : `${selected.length} friend${selected.length !== 1 ? "s" : ""} selected`}
      </p>
    </motion.div>
  )
}