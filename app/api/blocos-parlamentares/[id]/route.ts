import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

const PARLIAMENTARY_BLOCK_DETAILS_API_URL = process.env
  .NEXT_PUBLIC_PARLIAMENTARY_BLOCK_DETAILS_API_URL as string

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json(
      { error: "ID do bloco parlamentar é obrigatório" },
      { status: 400 }
    )
  }

  try {
    console.log(
      "Fetching parliamentary block details from API:",
      `${PARLIAMENTARY_BLOCK_DETAILS_API_URL}/${id}`
    )
    const response = await axios.get(
      `${PARLIAMENTARY_BLOCK_DETAILS_API_URL}/${id}`
    )
    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error fetching parliamentary block details:", error)
    return NextResponse.json(
      { error: "Failed to fetch parliamentary block details" },
      { status: 500 }
    )
  }
}
