import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk"

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
    try {
        const { description, eventType } = await request.json();

        if (!description) {
            return NextResponse.json (
                { error: "Description is required"},
                { status: 400 }
            )
        }

        //Call Groq
        const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert at rating life event impacts on a scale of 1-20 based on the Panyapat Life Balance Theorem.

Rating Scale:
- 1-5: Minor impact (small annoyance or small win)
- 6-10: Moderate impact (noticeable effect on your day)
- 11-15: Significant impact (affects your week or emotional state)
- 16-20: Life-changing impact (major life events)

Consider: emotional weight, practical consequences, duration of impact, and context.

Respond ONLY with a JSON object in this exact format:
{"rating": <number 1-20>, "reasoning": "<brief 1 sentence explanation>"}`,
        },
        {
          role: "user",
          content: `Event Type: ${eventType === "M" ? "Misfortune (negative)" : "Good Fortune (positive)"}
Description: "${description}"

Rate this event's impact (1-20):`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 150,
      response_format: { type: "json_object" },
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
        throw new Error("No response from AI")
    }

    const parsed = JSON.parse(response);

    return NextResponse.json({
        rating: parsed.rating,
        reasoning: parsed.reasoning
    })
    } catch (error) {
        console.error("Groq API Error:", error)

        return NextResponse.json(
            { error: "Failed to get AI suggestion"},
            { status: 500 }
        )
    }
}