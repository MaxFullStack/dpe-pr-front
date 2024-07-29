import { getParliamentaryBlockDetails } from "@/services/get-parliamentary-block-details-service"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { ParliamentaryBlock } from "@/types/parliamentary-block"

export const useFetchParliamentaryBlockDetails = (
  id: string
): UseQueryResult<ParliamentaryBlock, Error> => {
  return useQuery<ParliamentaryBlock, Error>({
    queryKey: ["parliamentary-block-details", id],
    queryFn: () => getParliamentaryBlockDetails(id),
  })
}
