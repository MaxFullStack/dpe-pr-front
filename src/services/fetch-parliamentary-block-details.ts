import axios from "axios"

import { ParliamentaryBlock } from "@/types/parliamentary-block"

export const fetchParliamentaryBlockDetails = async (
  id: string
): Promise<ParliamentaryBlock> => {
  const response = await axios.get(`/api/blocos-parlamentares/${id}`)
  return response.data
}
