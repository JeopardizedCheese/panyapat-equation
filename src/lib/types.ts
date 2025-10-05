/* EVENT TYPES 
M : MISFORTUNE
G: GOOD FORTUNE*/

export type EventType = "M" | "G"

/*Debt status based on Panyapat Theorem:
Balanced = NO DEBT (M and G is equal)
Too Many G's =, misfortune is predicted
Too Many M's =, good fortune is sure to come*/

export type DebtStatus = "BALANCED" | "NEED_G" | "NEED_M"

export interface LifeEvent {
    id: string,
    type: EventType,
    value: number //1-20 scale (severity/magnitude)
    description: string,
    timestamp: number,
    sharedWith: string[] //IDs of friends who experienced this event
}

// A friend in our network

export interface Friend {
    id: string,
    name: string,
    relationshipCoefficient: number // ρ (rho): 0.1 to 1.0
}

/**
 * Debt state according to the Panyapat Theorem
 * 
 * Rules:
 * - Every 2 M's → 1 G is owed (positive debt)
 * - Every 2 G's → 1 M is predicted (negative debt)
 * - netDebt = floor(M/2) - floor(G/2)
 */

export interface DebtState {
    mDebt: number,
    gDebt: number,
    netDebt: number,
    status: DebtStatus,
    prediction: string
}

/**
 * Network effect breakdown
 * Shows how each friend contributes to your total balance
 */

export interface NetworkEffect {
    total: number,
    breakdown: FriendContribution[]
}

export interface FriendContribution {
    friendId: string,
    friendName: string,
    contribution: number, // ρ × Σ(shared G values)
    eventIds: string[]
}

/**
 * M/G ratio status
 */

export interface RatioStatus {
    ratio: number, // M_count / G_count
    theoreticalRatio: number //Should be 2.0
    isHealthy: boolean //Within acceptable range
    warning: string | null
}

/*Input Types
**INPUT FOR ADDING A NEW EVENT*/

export interface AddEventInput {
    type: EventType,
    value: number,
    description: string,
    sharedWith?: string[]
}

/*Adding a new friend* */

export interface AddFriendInput {
    name: string,
    relationshipCoefficient: number
}