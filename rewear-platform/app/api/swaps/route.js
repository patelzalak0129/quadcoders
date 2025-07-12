import { NextResponse } from "next/server"

// Mock swaps database
const swaps = []

export async function POST(request) {
  try {
    const swapData = await request.json()

    const newSwap = {
      id: swaps.length + 1,
      ...swapData,
      status: "pending",
      created_at: new Date().toISOString(),
    }

    swaps.push(newSwap)

    return NextResponse.json({
      message: "Swap request sent successfully",
      swap: newSwap,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create swap request" }, { status: 500 })
  }
}
