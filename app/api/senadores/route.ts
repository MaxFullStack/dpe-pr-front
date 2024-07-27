import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

const SENATORS_API_URL = process.env.NEXT_PUBLIC_SENATORS_API_URL as string

export async function GET(req: NextRequest) {
  try {
    console.log("Fetching senators from API:", SENATORS_API_URL)
    const response = await axios.get(SENATORS_API_URL)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error fetching senators:", error)
    return NextResponse.json(
      { error: "Failed to fetch senators" },
      { status: 500 }
    )
  }
}
