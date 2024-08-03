import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

const SENATOR_DETAILS_API_URL = process.env.SENATOR_DETAILS_API_URL as string

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json(
      { error: "ID do senador é obrigatório" },
      { status: 400 }
    )
  }

  try {
    console.log(
      "Fetching details for senator from API:",
      `${SENATOR_DETAILS_API_URL}/${id}`
    )
    const response = await axios.get(`${SENATOR_DETAILS_API_URL}/${id}`)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error fetching details for senator:", error)
    return NextResponse.json(
      { error: "Failed to fetch details for senator" },
      { status: 500 }
    )
  }
}
