import { NextResponse } from "next/server"

// Mock swaps data
const swaps = [
  {
    id: 1,
    requester_id: 2,
    owner_id: 3,
    item_id: 3,
    item_title: "Designer Sneakers",
    points_offered: 50,
    status: "pending",
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    requester_id: 3,
    owner_id: 2,
    item_id: 1,
    item_title: "Vintage Denim Jacket",
    points_offered: 0,
    offered_item_id: 2,
    status: "accepted",
    created_at: "2024-01-14T15:20:00Z",
  },
]

export async function GET(request, { params }) {
  try {
    const userId = Number.parseInt(params.id)
    const userSwaps = swaps.filter((swap) => swap.requester_id === userId || swap.owner_id === userId)

    return NextResponse.json(userSwaps)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user swaps" }, { status: 500 })
  }
}
