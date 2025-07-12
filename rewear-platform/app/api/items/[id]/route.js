import { NextResponse } from "next/server"

// Mock items database
const items = [
  {
    id: 1,
    user_id: 2,
    title: "Vintage Denim Jacket",
    description:
      "Classic blue denim jacket in excellent condition. Perfect for casual wear and layering. This jacket has been well-maintained and shows minimal signs of wear.",
    category: "Outerwear",
    type: "Jacket",
    size: "M",
    condition: "Excellent",
    tags: "vintage,denim,casual",
    images:
      '["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400", "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"]',
    status: "available",
    approved: true,
  },
  {
    id: 2,
    user_id: 3,
    title: "Floral Summer Dress",
    description:
      "Beautiful floral print dress, perfect for summer occasions. Worn only twice. Features a flattering A-line silhouette and comfortable fabric.",
    category: "Dresses",
    type: "Dress",
    size: "S",
    condition: "Like New",
    tags: "floral,summer,dress",
    images:
      '["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"]',
    status: "available",
    approved: true,
  },
  {
    id: 3,
    user_id: 4,
    title: "Designer Sneakers",
    description:
      "Limited edition sneakers in great condition. Only worn a few times. Comes with original box and accessories.",
    category: "Footwear",
    type: "Sneakers",
    size: "10",
    condition: "Good",
    tags: "designer,sneakers,limited",
    images:
      '["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400"]',
    status: "available",
    approved: true,
  },
]

export async function GET(request, { params }) {
  try {
    const itemId = Number.parseInt(params.id)
    const item = items.find((item) => item.id === itemId)

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 })
  }
}
