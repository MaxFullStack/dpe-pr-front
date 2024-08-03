import axios from "axios"

import { ParliamentaryBlock } from "@/types/parliamentary-block"

export const fetchParliamentaryBlocks = async (): Promise<
  ParliamentaryBlock[]
> => {
  const response = await axios.get("/api/blocos-parlamentares")
  return response.data
}
