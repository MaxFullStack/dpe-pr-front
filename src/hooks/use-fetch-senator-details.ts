import { getSenatorDetails } from "@/services/get-senator-details-service"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { Senator } from "@/types/senator"

export const useFetchSenatorDetails = (
  id: string
): UseQueryResult<Senator, Error> => {
  return useQuery<Senator, Error>({
    queryKey: ["senator-details", id],
    queryFn: () => getSenatorDetails(id),
  })
}
