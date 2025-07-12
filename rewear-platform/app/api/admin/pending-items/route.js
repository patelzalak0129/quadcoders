import { NextResponse } from "next/server"

// Mock items database
const items = [
  {
    id: 5,
    user_id: 3,
    title: "Leather Boots",
    description: "High-quality leather boots in excellent condition. Perfect for winter.",
    category: "Footwear",
    type: "Boots",
    size: "9",
    condition: "Excellent",
    tags: "leather,boots,winter",
    images: '["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400"]',
    status: "available",
    approved: false,
  },
  {
    id: 6,
    user_id: 4,
    title: "Summer Blouse",
    description: "Light and airy summer blouse in floral print.",
    category: "Tops",
    type: "Blouse",
    size: "M",
    condition: "Like New",
    tags: "summer,blouse,floral",
    images: '["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"]',
    status: "available",
    approved: false,
  },
]

export async function GET() {
  try {
    const pendingItems = items.filter((item) => !item.approved)
    return NextResponse.json(pendingItems)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pending items" }, { status: 500 })
  }
}
