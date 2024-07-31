
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { Senator } from "@/types/senator"
import { fetchSenatorDetails } from "@/services/fetch-senator-details"

export const useSenatorDetails = (
  id: string
): UseQueryResult<Senator, Error> => {
  return useQuery<Senator, Error>({
    queryKey: ["senator-details", id],
    queryFn: () => fetchSenatorDetails(id),
  })
}
