import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

const PARLIAMENTARY_BLOCKS_API_URL = process.env
  .PARLIAMENTARY_BLOCKS_API_URL as string

export async function GET(req: NextRequest) {
  try {
    console.log(
      "Fetching parliamentary blocks from API:",
      PARLIAMENTARY_BLOCKS_API_URL
    )
    const response = await axios.get(PARLIAMENTARY_BLOCKS_API_URL)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error fetching parliamentary blocks:", error)
    return NextResponse.json(
      { error: "Failed to fetch parliamentary blocks" },
      { status: 500 }
    )
  }
}
