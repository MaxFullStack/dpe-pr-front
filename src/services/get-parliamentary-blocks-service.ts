import axios from "axios"

import { ParliamentaryBlock } from "@/types/parliamentary-block"

export const getParliamentaryBlocksService = async (): Promise<
  ParliamentaryBlock[]
> => {
  const { data } = await axios.get("/api/blocos-parlamentares")
  return data
}
