import axios from "axios"

import { Senator } from "@/types/senator"

export const fetchSenatorDetails = async (id: string): Promise<Senator> => {
  const { data } = await axios.get(`/api/senadores/${id}`)
  return data
}
