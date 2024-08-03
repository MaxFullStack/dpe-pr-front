import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { Senator } from "@/types/senator"
import { fetchSenators } from "@/services/fetch-senators"

export const useSenators = (): UseQueryResult<Senator[], Error> => {
  return useQuery<Senator[], Error>({
    queryKey: ["senators"],
    queryFn: fetchSenators,
  })
}
