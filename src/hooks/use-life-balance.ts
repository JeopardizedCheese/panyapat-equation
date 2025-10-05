"use client"

import { useState, useEffect, useMemo } from 'react'
import {
  calculateDebt,
  calculateDirectBalance,
  calculateNetworkEffect,
  calculateNetworkMultiplier,
  calculateRatio,
} from "@/lib/calculations"
import type {
  LifeEvent,
  Friend,
  DebtState,
  NetworkEffect,
  RatioStatus,
  AddEventInput,
  AddFriendInput,
} from "@/lib/types"

/**
 * Main hook for the Life Balance Calculator
 * 
 * Manages all state and provides calculated values + actions
 */
export function useLifeBalance() {
  // ===== STATE =====
  const [events, setEvents] = useState<LifeEvent[]>([])
  const [friends, setFriends] = useState<Friend[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // ===== LOAD FROM LOCALSTORAGE ON MOUNT =====
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem("panyapat_events")
      const savedFriends = localStorage.getItem("panyapat_friends")

      if (savedEvents) {
        setEvents(JSON.parse(savedEvents))
      }

      if (savedFriends) {
        setFriends(JSON.parse(savedFriends))
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error)
    } finally {
      setIsInitialized(true)
    }
  }, []) // Trigger only once

  // ===== SAVE TO LOCALSTORAGE WHEN DATA CHANGES =====
  useEffect(() => {
    if (!isInitialized) return

    try {
      localStorage.setItem("panyapat_events", JSON.stringify(events))
    } catch (error) {
      console.error("Failed to save events:", error)
    }
  }, [events, isInitialized])

  useEffect(() => {
    if (!isInitialized) return

    try {
      localStorage.setItem("panyapat_friends", JSON.stringify(friends))
    } catch (error) {
      console.error("Failed to save friends:", error)
    }
  }, [friends, isInitialized])

  // ===== CALCULATIONS (ONLY RECALCULATE WHEN DATA CHANGES) =====
  const debt: DebtState = useMemo(() => {
    return calculateDebt(events)
  }, [events])

  const directBalance: number = useMemo(() => {
    return calculateDirectBalance(events)
  }, [events])

  const networkEffect: NetworkEffect = useMemo(() => {
    return calculateNetworkEffect(events, friends)
  }, [events, friends])

  const networkMultiplier: number = useMemo(() => {
    return calculateNetworkMultiplier(friends)
  }, [friends])

  const totalBalance: number = useMemo(() => {
    return directBalance + networkEffect.total
  }, [directBalance, networkEffect.total])

  const ratioStatus: RatioStatus = useMemo(() => {
    return calculateRatio(events)
  }, [events])

  // ===== ACTIONS =====

  /**
   * Add a new life event
   */
  const addEvent = (input: AddEventInput) => {
    // Warn if violating debt prediction (but don't block)
    if (debt.status === "NEED_G" && input.type === "M") {
      console.warn(
        `⚠️ Warning: Adding M when debt predicts G. Current debt: +${debt.netDebt}`
      )
    } else if (debt.status === "NEED_M" && input.type === "G") {
      console.warn(
        `⚠️ Warning: Adding G when debt predicts M. Current debt: ${debt.netDebt}`
      )
    }

    const newEvent: LifeEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      type: input.type,
      value: input.value,
      description: input.description,
      timestamp: Date.now(),
      sharedWith: input.sharedWith || [],
    }

    setEvents((prev) => [...prev, newEvent])
  }

  /**
   * Add a new friend to the network
   */
  const addFriend = (input: AddFriendInput) => {
    const newFriend: Friend = {
      id: `friend_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: input.name,
      relationshipCoefficient: input.relationshipCoefficient,
    }

    setFriends((prev) => [...prev, newFriend])
  }

  /**
   * Remove a friend from the network
   */
  const removeFriend = (id: string) => {
    setFriends((prev) => prev.filter((f) => f.id !== id))
  }

  /**
   * Remove an event
   */
  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  /**
   * Clear all data (with confirmation)
   */
  const clearAllData = () => {
    if (typeof window === "undefined") return

    const confirmed = window.confirm(
      "Are you sure you want to delete all events and friends? This cannot be undone."
    )

    if (confirmed) {
      setEvents([])
      setFriends([])
      localStorage.removeItem("panyapat_events")
      localStorage.removeItem("panyapat_friends")
    }
  }

  // ===== RETURN EVERYTHING =====
  return {
    // Raw data
    events,
    friends,

    // Calculated values
    debt,
    directBalance,
    networkEffect,
    networkMultiplier,
    totalBalance,
    ratioStatus,

    // Actions
    addEvent,
    addFriend,
    removeEvent,
    removeFriend,
    clearAllData,

    // Metadata
    isInitialized,
  }
}