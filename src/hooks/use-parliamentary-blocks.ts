import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { ParliamentaryBlock } from "@/types/parliamentary-block"
import { fetchParliamentaryBlocks } from "@/services/fetch-parliamentary-blocks"

export const useParliamentaryBlocks = (): UseQueryResult<
  ParliamentaryBlock[],
  Error
> => {
  return useQuery<ParliamentaryBlock[], Error>({
    queryKey: ["parliamentary-blocks"],
    queryFn: fetchParliamentaryBlocks,
  })
}
