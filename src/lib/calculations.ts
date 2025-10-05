import { stat } from "fs";
import type {
    LifeEvent,
    Friend,
    DebtState,
    NetworkEffect,
    FriendContribution,
    RatioStatus
} from "./types"


// ===== DEBT CALCULATIONS =====

/**
 * Calculate debt state according to the Panyapat Theorem
 * 
 * Rules:
 * - Every 2 M's create debt of 1 G
 * - Every 2 G's create debt of 1 M (too lucky penalty)
 * - netDebt = mDebt - gDebt
 * 
 * Examples:
 * - [M, M] → mDebt=1, gDebt=0, netDebt=+1 (need 1 G)
 * - [G, G] → mDebt=0, gDebt=1, netDebt=-1 (need 1 M)
 * - [M, M, G, G] → mDebt=1, gDebt=1, netDebt=0 (balanced)
 */

export function calculateDebt(events: LifeEvent[]): DebtState {
    //Count M and Gs
    const mCount = events.filter((e) => e.type === "M").length
    const gCount = events.filter((e) => e.type === "G").length

    //Calculate debts
    const mDebt = Math.floor(mCount / 2);
    const gDebt = Math.floor(gCount / 2);

    const netDebt = mDebt - gDebt

    let status: DebtState["status"]
    let prediction: string

    if (netDebt > 0) {
        status = "NEED_G";
        prediction = netDebt === 1 ? "1 good fortune predicted" : `${netDebt} good fortunes predicted`
    } else if (netDebt < 0) {
        status = "NEED_M";
        const absDebt = Math.abs(netDebt) //abs -> absolute
        prediction = absDebt === 1 ? "1 misfortune predicted" : `${absDebt} misfortunes predicted (too lucky)`
    } else {
        status = "BALANCED";
        prediction = "Life is balanced";
    }

    return {
        mDebt,
        gDebt,
        netDebt,
        status,
        prediction
    }
}


// ===== BALANCE CALCULATIONS =====

/**
 * Calculate direct life balance: Σ(G) - Σ(M)
 * 
 * This is YOUR personal balance without network effects
 */

export function calculateDirectBalance(events: LifeEvent[]) : number {
    return events.reduce((balance, event) => {
        if (event.type === "M") {
            return balance - event.value
        } else {
            return balance + event.value
        }
    }, 0)
}


/**
 * Calculate network effect: Σ(ρᵢ × Gᵢ)
 * 
 * For each friend:
 * - Find all G events they were involved in (sharedWith includes their ID)
 * - Sum those G values
 * - Multiply by their relationship coefficient (ρ)
 * 
 * Example:
 * Friend Aussy (ρ=0.5) was in events with G values [10, 20]
 * Her contribution: 0.5 × (10 + 20) = 15
 */

export function calculateNetworkEffect(
    events: LifeEvent[],
    friends: Friend[]
) : NetworkEffect {

    const breakdown: FriendContribution[] = [];

    for (const friend of friends) {
        //All Good events that this friend is involved in.
        const sharedEvents = events.filter((e) => e.type === "G" && e.sharedWith.includes(friend.id));

        //Sum of THE G values
        const totalSharedValue = sharedEvents.reduce((sum, e) => sum + e.value, 0) //0 as the starting value of sum

        // Calculate contribution: ρ × total G value
        const contribution = friend.relationshipCoefficient * totalSharedValue

        breakdown.push({
            friendId: friend.id,
            friendName: friend.name,
            contribution,
            eventIds: sharedEvents.map((e) => e.id)
        })
    }

    //Total network effect
    const total = breakdown.reduce((sum, b) => sum + b.contribution, 0)

    return {total, breakdown}
}

/**
 * Calculate network multiplier: 1 + Σ(ρᵢ)
 * 
 * This shows the theoretical maximum amplification
 * Example: 3 friends with ρ = 0.2, 0.3, 0.5
 * Multiplier = 1 + 0.2 + 0.3 + 0.5 = 2.0x
 */

export function calculateNetworkMultiplier(friends: Friend[]): number {
  const sumOfCoefficients = friends.reduce(
    (sum, friend) => sum + friend.relationshipCoefficient,
    0
  )
  return 1 + sumOfCoefficients
}


// ===== RATIO CALCULATIONS =====

/**
 * Check M/G ratio and warn if unhealthy
 * 
 * According to the Panyapat Theorem:
 * - Ideal ratio: 2.0 (2 M's for every 1 G)
 * - Healthy range: 1.5 to 2.5
 * - Warning range: 1.0 to 3.0
 * - Unhealthy: < 1.0 or > 3.0
 */

export function calculateRatio(events: LifeEvent[]) : RatioStatus {
    const mCount = events.filter((e) => e.type === "M").length;
    const gCount = events.filter((e) => e.type === "G").length;

    //edge cases handling
    if (events.length === 0) {
        return {
            ratio: 0,
            theoreticalRatio: 2.0,
            isHealthy: true,
            warning: null,
        }
    }

    if (gCount === 0) {
        return {
            ratio: mCount > 0 ? Infinity : 0,
            theoreticalRatio: 2.0,
            isHealthy: mCount <= 2,
            warning:
            mCount > 2
            ? "You have many misfortunes without any good fortune yet!"
            : null,
        }
    }

    const ratio = mCount/gCount

    //Determine health status
    let isHealthy = true;
    let warning: string | null = null;

    if (ratio < 1.0) {
        isHealthy = false,
        warning = "Blimey, you lucky bastard! I CANT HAVE THAT!"
    } else if (ratio > 3.0) {
        isHealthy = false,
        warning = "Damn.. I am sorry to hear that."
    } else if (ratio > 2.5) {
        isHealthy = true,
        warning = "Something good might happen! Hang in there."
    } else if (ratio < 1.5) {
        isHealthy = true,
        warning = "Have fun while your good fortune lasts."
    }

    return {
        ratio,
        theoreticalRatio: 2.0,
        isHealthy,
        warning
    }
}

// ===== UTILITY FUNCTIONS =====

/**
 * Get a human-readable summary of the current state
 */

export function getStateSummary(
  events: LifeEvent[],
  friends: Friend[]
): {
  directBalance: number
  networkEffect: number
  totalBalance: number
  debt: DebtState
  ratio: RatioStatus
} {
  const directBalance = calculateDirectBalance(events)
  const { total: networkEffect } = calculateNetworkEffect(events, friends)
  const totalBalance = directBalance + networkEffect
  const debt = calculateDebt(events)
  const ratio = calculateRatio(events)

  return {
    directBalance,
    networkEffect,
    totalBalance,
    debt,
    ratio,
  }
}