import axios from "axios"

import { ParliamentaryBlock } from "@/types/parliamentary-block"

export const getParliamentaryBlockDetailsService = async (
  id: string
): Promise<ParliamentaryBlock> => {
  const { data } = await axios.get(`/api/blocos-parlamentares/${id}`)
  return data
}
