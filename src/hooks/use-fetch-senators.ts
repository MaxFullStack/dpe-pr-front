import { getSenators } from "@/services/get-senators-service"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { Senator } from "@/types/senator"

export const useFetchSenators = (): UseQueryResult<Senator[], Error> => {
  return useQuery<Senator[], Error>({
    queryKey: ["senators"],
    queryFn: getSenators,
  })
}
