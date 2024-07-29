import { getParliamentaryBlocks } from "@/services/get-parliamentary-blocks-service"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { ParliamentaryBlock } from "@/types/parliamentary-block"

export const useFetchParliamentaryBlocks = (): UseQueryResult<
  ParliamentaryBlock[],
  Error
> => {
  return useQuery<ParliamentaryBlock[], Error>({
    queryKey: ["parliamentary-blocks"],
    queryFn: getParliamentaryBlocks,
  })
}
