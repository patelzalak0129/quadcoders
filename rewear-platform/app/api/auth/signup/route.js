import { NextResponse } from "next/server"

// Mock users database (in a real app, this would be persistent)
const users = [
  { id: 1, email: "admin@rewear.com", password: "admin123", name: "Admin User", points: 1000, isAdmin: true },
  { id: 2, email: "john@example.com", password: "password123", name: "John Doe", points: 150 },
  { id: 3, email: "jane@example.com", password: "password123", name: "Jane Smith", points: 200 },
  { id: 4, email: "mike@example.com", password: "password123", name: "Mike Johnson", points: 120 },
]

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      points: 100, // Starting points
      isAdmin: false,
    }

    users.push(newUser)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      user: userWithoutPassword,
      message: "Account created successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 })
  }
}
