"use client"

import { useLifeBalance } from "@/hooks/use-life-balance"
import { DebtIndicator } from "@/components/ui/custom/debt-indicator"
import { StatusCard } from "@/components/ui/custom/status-card"
import { EventLogger } from "@/components/ui/custom/event-logger"
import { NetworkPanel } from "@/components/ui/custom/network-panel"
import { EventList } from "@/components/ui/custom/event-list"
import { LifeGraph } from "@/components/ui/custom/life-graph"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LifePage() {
  const { 
    events,
    friends,
    debt,
    totalBalance,
    directBalance,
    networkEffect,
    ratioStatus,
    addEvent,
    addFriend,
    removeFriend,
    removeEvent
  } = useLifeBalance()

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header with Back Button */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button
              variant="outline"
              className="bg-white/5 hover:bg-white/10 border-white/10 text-white gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Life Balance Calculator</h1>
        </div>
      </div>

      {/* First Grid Row - Debt & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DebtIndicator debt={debt} />
        <StatusCard
          events={events}
          totalBalance={totalBalance}
          directBalance={directBalance}
          networkEffect={networkEffect.total}
          ratioStatus={ratioStatus}
        />
      </div>

      {/* Graph - Full Width */}
      <div className="mb-6">
        <LifeGraph events={events} friends={friends}/>
      </div>

      {/* Second Grid Row - Event Logger & Network */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EventLogger debt={debt} onAddEvent={addEvent} friends={friends}/>
        <NetworkPanel
          friends={friends}
          networkEffect={networkEffect}
          onAddFriend={addFriend}
          onRemoveFriend={removeFriend}
        />
      </div>

      {/* Event List - Full Width */}
      <EventList
        events={events}
        friends={friends}
        onRemoveEvent={removeEvent}
      />
    </div>
  )
}