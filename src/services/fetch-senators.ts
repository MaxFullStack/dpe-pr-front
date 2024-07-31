import axios from "axios"

import { Senator } from "@/types/senator"

export const fetchSenators = async (): Promise<Senator[]> => {
  const { data } = await axios.get("/api/senadores")
  return data
}
