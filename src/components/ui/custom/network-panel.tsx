"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, UserPlus } from "lucide-react"
import type { Friend, NetworkEffect, AddFriendInput } from "@/lib/types"

interface NetworkPanelProps {
    friends: Friend[]
    networkEffect: NetworkEffect
    onAddFriend: (input: AddFriendInput) => void
    onRemoveFriend: (id: string) => void
}

export function NetworkPanel({  // I HATE TYPO AAAAAAAAA
    friends,
    networkEffect,
    onAddFriend,
    onRemoveFriend
}: NetworkPanelProps) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [coefficient, setCoefficient] = useState([0.5])

    const handleSubmit = () => {
        if (!name.trim()) return

        onAddFriend({
            name: name.trim(),
            relationshipCoefficient: coefficient[0],
        })

        setName("")
        setCoefficient([0.5])
        setOpen(false)
    }  

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-300">
                        Your Network
                    </h2>
                    <p className="text-2xl font-mono text-purple-400 mt-1">
                        +{networkEffect.total.toFixed(1)} pts
                    </p>
                </div>

                {/* Add Friend Button */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add Friend
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-zinc-900 border-white/10">
                        <DialogHeader>
                            <DialogTitle className="text-white">
                                Add to your network
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 mt-4">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <Label htmlFor="friend-name" className="text-gray-300">
                                    Name
                                </Label>
                                <Input
                                    id="friend-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Friend's name"
                                    className="bg-white/5 border-white/10 text-white"
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                />
                            </div>

                            {/* Relationship Coefficient Slider */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label className="text-gray-300">
                                        Relationship Strength (ρ)
                                    </Label>
                                    <span className="text-xl font-mono text-white">
                                        {coefficient[0].toFixed(1)}
                                    </span>
                                </div>

                                <Slider
                                    value={coefficient}
                                    onValueChange={setCoefficient}
                                    min={0.1}
                                    max={1.0}
                                    step={0.1}
                                    className="w-full [&_[role=slider]]:bg-purple-200 [&_[role=slider]]:border-purple-400 [&_.relative]:bg-zinc-700 [&_.bg-primary]:bg-purple-500"
                                />

                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Acquaintance (0.1)</span>
                                    <span>Best Friend (1.0)</span>
                                </div>

                                {/* Coefficient guide */}
                                <div className="text-xs text-purple-200 space-y-1 mt-2 font-bold">
                                    <p>• 0.1-0.3: Casual friend, occasional contact</p>
                                    <p>• 0.4-0.6: Good friend, regular interaction</p>
                                    <p>• 0.7-0.9: Close friend, strong bond</p>
                                    <p>• 1.0: Best friend, soulmate, family</p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 border-zinc-600 text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!name.trim()}
                                    className="flex-1 bg-purple-400 hover:bg-purple-700 text-white border-purple-500 shadow-lg shadow-purple-500/20"
                                >
                                    Add Friend
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Friends List */}
            <ScrollArea className="h-[300px] pr-4">
                <AnimatePresence>
                    {friends.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-xl mb-2">
                                Lmao you have no friends 🤓
                            </p>
                            <p className="text-gray-600 text-xs">
                                Add friends to amplify your good fortune through network effect
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {friends.map((friend) => {
                                const contribution = networkEffect.breakdown.find(
                                    (b) => b.friendId === friend.id
                                )

                                return (
                                    <motion.div
                                        key={friend.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="group rounded-lg bg-white/5 p-4 border border-white/10 hover:border-white/20 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                {/* Friend info */}
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-2xl">👤</span>
                                                    <span className="font-bold text-white">
                                                        {friend.name}
                                                    </span>
                                                    <span className="text-xs text-gray-500 font-mono">
                                                        ρ={friend.relationshipCoefficient.toFixed(1)}
                                                    </span>
                                                </div>

                                                {/* Contribution */}
                                                <div className="ml-8">
                                                    {contribution && contribution.contribution > 0 ? (
                                                        <>
                                                            <p className="text-sm text-purple-400 font-mono">
                                                                +{contribution.contribution.toFixed(1)} pts
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                From {contribution.eventIds.length} shared event
                                                                {contribution.eventIds.length !== 1 ? "s" : ""}
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <p className="text-xs text-gray-600">
                                                            No shared events yet
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Delete button */}
                                            <button
                                                onClick={() => onRemoveFriend(friend.id)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/20 rounded-lg"
                                                title="Remove friend"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}
                </AnimatePresence>
            </ScrollArea>

            {/* Footer info */}
            <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">
                    Network effect = Σ(ρᵢ × Gᵢ) where Gᵢ are shared good fortunes
                </p>
            </div>
        </motion.div>
    )
}