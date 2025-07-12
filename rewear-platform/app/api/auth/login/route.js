import { NextResponse } from "next/server"

// Mock users database
const users = [
  { id: 1, email: "admin@rewear.com", password: "admin123", name: "Admin User", points: 1000, isAdmin: true },
  { id: 2, email: "john@example.com", password: "password123", name: "John Doe", points: 150 },
  { id: 3, email: "jane@example.com", password: "password123", name: "Jane Smith", points: 200 },
  { id: 4, email: "mike@example.com", password: "password123", name: "Mike Johnson", points: 120 },
]

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      message: "Login successful",
    })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
