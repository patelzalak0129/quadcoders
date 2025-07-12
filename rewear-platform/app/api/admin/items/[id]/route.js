import { NextResponse } from "next/server"

export async function PATCH(request, { params }) {
  try {
    const { approved } = await request.json()
    const itemId = Number.parseInt(params.id)

    // In a real app, you'd update the database
    // For demo purposes, we'll just return success

    return NextResponse.json({
      message: `Item ${approved ? "approved" : "rejected"} successfully`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
  }
}
