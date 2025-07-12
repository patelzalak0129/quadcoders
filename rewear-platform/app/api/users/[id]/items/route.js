import { NextResponse } from "next/server"

// Mock items data
const items = [
  {
    id: 1,
    user_id: 2,
    title: "Vintage Denim Jacket",
    description: "Classic blue denim jacket in excellent condition.",
    category: "Outerwear",
    size: "M",
    condition: "Excellent",
    tags: "vintage,denim,casual",
    images: '["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400"]',
    status: "available",
  },
  {
    id: 2,
    user_id: 2,
    title: "Winter Wool Coat",
    description: "Warm wool coat perfect for winter.",
    category: "Outerwear",
    size: "L",
    condition: "Good",
    tags: "wool,winter,coat",
    images: '["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400"]',
    status: "pending",
  },
]

export async function GET(request, { params }) {
  try {
    const userId = Number.parseInt(params.id)
    const userItems = items.filter((item) => item.user_id === userId)

    return NextResponse.json(userItems)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user items" }, { status: 500 })
  }
}
