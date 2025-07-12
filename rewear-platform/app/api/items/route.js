import { NextResponse } from "next/server"

// Mock items database (in a real app, this would be persistent)
const items = [
  {
    id: 1,
    user_id: 2,
    title: "Vintage Denim Jacket",
    description: "Classic blue denim jacket in excellent condition.",
    category: "Outerwear",
    type: "Jacket",
    size: "M",
    condition: "Excellent",
    tags: "vintage,denim,casual",
    images: '["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400"]',
    status: "available",
    approved: true,
  },
]

export async function GET() {
  try {
    const availableItems = items.filter((item) => item.approved && item.status === "available")
    return NextResponse.json(availableItems)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const itemData = await request.json()

    const newItem = {
      id: items.length + 1,
      ...itemData,
      status: "available",
      approved: false, // Requires admin approval
      created_at: new Date().toISOString(),
    }

    items.push(newItem)

    return NextResponse.json({
      message: "Item submitted for approval",
      item: newItem,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 })
  }
}
