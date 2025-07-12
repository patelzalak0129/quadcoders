import { NextResponse } from "next/server"

// Mock database - in a real app, you'd use a proper database
const items = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    description: "Classic blue denim jacket in excellent condition. Perfect for casual wear.",
    category: "Outerwear",
    size: "M",
    condition: "Excellent",
    tags: "vintage,denim,casual",
    images:
      '["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400", "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"]',
  },
  {
    id: 2,
    title: "Floral Summer Dress",
    description: "Beautiful floral print dress, perfect for summer occasions. Worn only twice.",
    category: "Dresses",
    size: "S",
    condition: "Like New",
    tags: "floral,summer,dress",
    images:
      '["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"]',
  },
  {
    id: 3,
    title: "Designer Sneakers",
    description: "Limited edition sneakers in great condition. Only worn a few times.",
    category: "Footwear",
    size: "10",
    condition: "Good",
    tags: "designer,sneakers,limited",
    images:
      '["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400"]',
  },
]

export async function GET() {
  try {
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch featured items" }, { status: 500 })
  }
}
