
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { ParliamentaryBlock } from "@/types/parliamentary-block"
import { fetchParliamentaryBlockDetails } from "@/services/fetch-parliamentary-block-details"

export const useParliamentaryBlockDetails = (
  id: string
): UseQueryResult<ParliamentaryBlock, Error> => {
  return useQuery<ParliamentaryBlock, Error>({
    queryKey: ["parliamentary-block-details", id],
    queryFn: () => fetchParliamentaryBlockDetails(id),
  })
}
