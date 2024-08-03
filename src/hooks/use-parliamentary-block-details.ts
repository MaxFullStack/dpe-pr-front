import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ParliamentaryBlock } from '@/types/parliamentary-block';
import { fetchParliamentaryBlockDetails } from '@/services/fetch-parliamentary-block-details';

const transformBlockData = (blockData: any): ParliamentaryBlock => {
  return {
    blockAcronym: blockData.siglaCasa,
    blockName: blockData.nomeBloco,
    blockCode: blockData.codigoBloco,
    creationDate: blockData.dataCriacao,
    members: blockData.composicaoBloco.composicao_bloco.map((member: any) => ({
      party: {
        partyCode: member.partido.codigoPartido,
        partyAcronym: member.partido.siglaPartido,
        partyName: member.partido.nomePartido,
      },
      joinDate: member.dataAdesao,
      leaveDate: member.dataDesligamento,
    })) || [],
  };
};

const transformBlockDetailsData = (data: any): ParliamentaryBlock => {
  const blockData = data.blocos.bloco;
  console.log(blockData, "bloco data")
  return transformBlockData(blockData);
};

export const useParliamentaryBlockDetails = (
  id: string
): UseQueryResult<ParliamentaryBlock, Error> => {
  return useQuery<ParliamentaryBlock, Error>({
    queryKey: ['parliamentary-block-details', id],
    queryFn: async () => {
      const data = await fetchParliamentaryBlockDetails(id);
      return transformBlockDetailsData(data);
    },
  });
};