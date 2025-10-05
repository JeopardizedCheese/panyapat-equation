"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import type { EventType, DebtState, AddEventInput, Friend } from "@/lib/types"

interface EventLoggerProps {
  debt: DebtState
  friends: Friend[]
  onAddEvent: (input: AddEventInput) => void
}

export function EventLogger({ debt, friends, onAddEvent }: EventLoggerProps) {
  const [selectedType, setSelectedType] = useState<EventType>("M")
  const [description, setDescription] = useState("")
  const [value, setValue] = useState([10])
  const [sharedWith, setSharedWith] = useState<string[]>([])

  const [aiSuggestion, setAiSuggestion] = useState<number | null>(null)
  const [aiReasoning, setAiReasoning] = useState<string>("")
  const [isLoadingAI, setIsLoadingAI] = useState(false)

  // Check if adding this type would violate debt prediction
  const wouldViolateDebt =
    (debt.status === "NEED_G" && selectedType === "M") ||
    (debt.status === "NEED_M" && selectedType === "G")

  const handleSubmit = () => {
    if (!description.trim()) {
      return
    }

    onAddEvent({
      type: selectedType,
      value: value[0],
      description: description.trim(),
      sharedWith: selectedType === "G" ? sharedWith : [], // Only pass if G
    })

    // Reset form
    setDescription("")
    setValue([10])
    setSharedWith([])
    setAiSuggestion(null)
    setAiReasoning("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && description.trim()) {
      handleSubmit()
    }
  }

  const toggleFriend = (friendId: string) => {
    setSharedWith((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    )
  }

  const handleAISuggestion = async () => {
    if (!description.trim()) return


    setIsLoadingAI(true)
    setAiSuggestion(null)
    setAiReasoning("")
  

    try {
      const response = await fetch('/api/suggest-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description.trim(),
          eventType: selectedType,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI suggestion")
      }

      const data = await response.json()
      setAiSuggestion(data.rating)
      setAiReasoning(data.reasoning)
      setValue([data.rating])
    } catch (error) {
      console.error('AI Suggestion Error:', error)
      alert("Failed to get AI Suggestion. Please try again.")
    } finally {
      setIsLoadingAI(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      <h2 className="text-lg font-semibold text-gray-300 mb-6">
        Log New Event
      </h2>

      {/* Event Type Selector */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedType("M")}
          className={`p-6 rounded-lg border-2 transition-all ${
            selectedType === "M"
              ? "border-red-500 bg-red-500/10"
              : "border-white/10 bg-white/5 hover:bg-white/10"
          }`}
        >
          <div className="text-4xl mb-2">😔</div>
          <div className={`font-bold ${selectedType === "M" ? "text-red-400" : "text-gray-400"}`}>
            Misfortune
          </div>
          <div className="text-xs text-gray-500 mt-1">Bad event</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedType("G")}
          className={`p-6 rounded-lg border-2 transition-all ${
            selectedType === "G"
              ? "border-green-500 bg-green-500/10"
              : "border-white/10 bg-white/5 hover:bg-white/10"
          }`}
        >
          <div className="text-4xl mb-2">😊</div>
          <div className={`font-bold ${selectedType === "G" ? "text-green-400" : "text-gray-400"}`}>
            Good Fortune
          </div>
          <div className="text-xs text-gray-500 mt-1">Good event</div>
        </motion.button>
      </div>

      {/* Warning if violating debt prediction */}
      {wouldViolateDebt && (
        <Alert className="mb-6 border-yellow-500/50 bg-yellow-500/10">
          <AlertDescription className="text-yellow-400 text-sm">
            ⚠️ Warning: The theorem predicts a{" "}
            {debt.status === "NEED_G" ? "good fortune" : "misfortune"} should happen next.
            You can still log this event.
          </AlertDescription>
        </Alert>
      )}

      {/* Description Input */}
      <div className="space-y-2 mb-6">
        <Label htmlFor="description" className="text-gray-300">
          Description
        </Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="What happened?"
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
        />
        <p className="text-xs text-gray-500">
          Press Enter to submit
        </p>
      </div>

      {/* Value Slider */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <Label className="text-gray-300">Impact Value</Label>
          <span className="text-2xl font-bold font-mono text-white">
            {value[0]}
          </span>
        </div>

        {/**AI suggestion button */}
        <div className="mb-3">
          <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAISuggestion}
          disabled={!description.trim() || isLoadingAI}
          className="w-full bg-purple-600/20 border-purple-500/50 hover:bg-purple-600/30 text-purple-300 gap-2"
          >
            {isLoadingAI ? (
              <>
                <span className="animate-spin">⚙️</span>
                Analyzing..
              </>
            ) : (
              <>
               ✨Suggest Rating
              </>
            )}
          </Button>

          {aiSuggestion && (
            <motion.div
            initial={{opacity: 0, y: -10}}
            animate={{ opacity: 1, y: 0}}
            className="mt-2 p-2 rounded-lg bg-purple-500/10 border border-purple-500/30"
            >
              <p className="text-sm text-purple-300 font-medium">
                AI suggests: <span className="font-bold">{aiSuggestion}/20</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">{aiReasoning}</p>
            </motion.div>
          )}
        </div>

        <Slider
          value={value}
          onValueChange={setValue}
          min={1}
          max={20}
          step={1}
          className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-red-500 [&_[role=slider]]:to-green-500 [&_[role=slider]]:border-white [&_.relative]:bg-zinc-700 [&_.bg-primary]:bg-gradient-to-r [&_.bg-primary]:from-red-500 [&_.bg-primary]:to-green-500"
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>Minor (1)</span>
          <span>Major (20)</span>
        </div>

        {/* Value guide */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• 1-5: Minor annoyance or small win</p>
          <p>• 6-10: Moderate impact</p>
          <p>• 11-15: Significant event</p>
          <p>• 16-20: Life-changing moment</p>
        </div>
      </div>

      {/* Friend Selector - Only show for Good Fortune */}
      {selectedType === "G" && friends.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <Label className="text-gray-300 mb-3 block">
            Share this fortune with:
          </Label>
          <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Checkbox
                  id={`friend-${friend.id}`}
                  checked={sharedWith.includes(friend.id)}
                  onCheckedChange={() => toggleFriend(friend.id)}
                />
                <label
                  htmlFor={`friend-${friend.id}`}
                  className="flex-1 text-sm text-gray-300 cursor-pointer"
                >
                  {friend.name}
                  <span className="text-xs text-gray-500 ml-2">
                    (ρ = {friend.relationshipCoefficient.toFixed(1)})
                  </span>
                </label>
              </div>
            ))}
          </div>
          {sharedWith.length > 0 && (
            <p className="text-xs text-purple-400 mt-2">
              {sharedWith.length} friend{sharedWith.length !== 1 ? "s" : ""} selected
            </p>
          )}
        </motion.div>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!description.trim()}
        className="w-full bg-gradient-to-r from-red-600 via-zinc-700 to-green-600 hover:from-red-700 hover:via-zinc-800 hover:to-green-700 text-white font-bold shadow-lg"
        size="lg"
      >
        Log Event
      </Button>

      {/* Event preview */}
      {description.trim() && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10"
        >
          <p className="text-xs text-gray-400 mb-1">Preview:</p>
          <div className="flex items-start gap-2">
            <span className="text-2xl">{selectedType === "M" ? "😔" : "😊"}</span>
            <div className="flex-1">
              <p className="text-sm text-white">{description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {selectedType === "M" ? "-" : "+"}
                {value[0]} points
                {selectedType === "G" && sharedWith.length > 0 && (
                  <span className="text-purple-400">
                    {" "}• Shared with {sharedWith.length} friend{sharedWith.length !== 1 ? "s" : ""}
                  </span>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}