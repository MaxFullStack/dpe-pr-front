import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchParliamentaryBlocks } from '@/services/fetch-parliamentary-blocks';
import { ParliamentaryBlock } from '@/types/parliamentary-block';

const transformBlocksData = (blocksData: any): ParliamentaryBlock[] => {
  if (!blocksData) return []
  return (
    blocksData.ListaBlocoParlamentar?.Blocos?.Bloco?.reduce(
      (acc: ParliamentaryBlock[], block: any) => {
        block.Membros?.Membro?.forEach((member: any) => {
          acc.push({
            blockCode: block.CodigoBloco,
            blockName: block.NomeBloco,
            creationDate: block.DataCriacao,
            partyAcronym: member.Partido.SiglaPartido,
            members: [],
          })
        })
        return acc
      },
      []
    ) || []
  )
}

export const useParliamentaryBlocks = (): UseQueryResult<ParliamentaryBlock[], Error> => {
  return useQuery<ParliamentaryBlock[], Error>({
    queryKey: ['parliamentary-blocks'],
    queryFn: async () => {
      const data = await fetchParliamentaryBlocks();
      return transformBlocksData(data);
    },
  });
};
