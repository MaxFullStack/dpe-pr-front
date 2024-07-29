"use client"

import React, { createContext, ReactNode, useContext, useMemo } from "react"

import { ParliamentaryBlock } from "@/types/parliamentary-block"
import { Senator } from "@/types/senator"
import { useFetchParliamentaryBlockDetails } from "@/hooks/use-fetch-parliamentary-block-details"
import { useFetchParliamentaryBlocks } from "@/hooks/use-fetch-parliamentary-blocks"
import { useFetchSenatorDetails } from "@/hooks/use-fetch-senator-details"
import { useFetchSenators } from "@/hooks/use-fetch-senators"

interface DataContextProps {
  senators: Senator[]
  parliamentaryBlocks: ParliamentaryBlock[]
  fetchParliamentaryBlockDetails: (id: string) => Promise<ParliamentaryBlock>
  fetchSenatorDetails: (id: string) => Promise<Senator>
}

const DataContext = createContext<DataContextProps | undefined>(undefined)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { data: senatorsData } = useFetchSenators()
  const { data: blocksData } = useFetchParliamentaryBlocks()

  const fetchParliamentaryBlockDetails = async (
    id: string
  ): Promise<ParliamentaryBlock> => {
    const { data } = useFetchParliamentaryBlockDetails(id)
    if (!data) {
      throw new Error("Block data not found")
    }
    return data
  }

  const fetchSenatorDetails = async (id: string): Promise<Senator> => {
    const { data } = useFetchSenatorDetails(id)
    if (!data) {
      throw new Error("Senator data not found")
    }
    return data
  }

  /* const transformBlocksDetailsData = (blocksData: any): ParliamentaryBlock[] => {
    if (!blocksData) return []
    return (
      blocksData.ListaBlocoParlamentar?.Blocos?.Bloco?.reduce(
        (acc: ParliamentaryBlock[], block: any) => {
          block.Membros?.Membro.forEach((member: any) => {
            acc.push({
              blockCode: block.CodigoBloco,
              blockName: block.NomeBloco,
              blockNickname: block.NomeApelido,
              creationDate: block.DataCriacao,
              members: [
                {
                  party: {
                    partyCode: member.Partido.CodigoPartido,
                    partyAcronym: member.Partido.SiglaPartido,
                    partyName: member.Partido.NomePartido,
                  },
                  joinDate: member.DataAdesao,
                  leaveDate: member.DataDesligamento || null,
                },
              ],
            })
          })
          return acc
        },
        []
      ) || []
    )
  } */

  const transformBlocksData = (blocksData: any): ParliamentaryBlock[] => {
    if (!blocksData) return []
    return (
      blocksData.ListaBlocoParlamentar?.Blocos?.Bloco?.reduce(
        (acc: ParliamentaryBlock[], block: any) => {
          block.Membros?.Membro?.forEach((member: any) => {
            acc.push({
              blockCode: block.CodigoBloco,
              blockName: block.NomeBloco,
              blockNickname: block.NomeApelido,
              creationDate: block.DataCriacao,
              partyAcronym: member.Partido.SiglaPartido,
              members:
                block.Membros?.Membro.map((m: any) => ({
                  party: {
                    partyCode: m.Partido.CodigoPartido,
                    partyAcronym: m.Partido.SiglaPartido,
                    partyName: m.Partido.NomePartido,
                  },
                  joinDate: m.DataAdesao,
                  leaveDate: m.DataDesligamento || null,
                })) || [],
            })
          })
          return acc
        },
        []
      ) || []
    )
  }

  const transformSenatorsData = (senatorsData: any): Senator[] => {
    if (!senatorsData) return []
    return (
      senatorsData.ListaParlamentar?.Parlamentar?.map((senator: any) => ({
        name: senator.NomeParlamentar,
        state: senator.UfParlamentar,
        parliamentaryBlock: senator.BlocoParlamentar?.NomeBloco || "",
        photo: senator.UrlFotoParlamentar,
        email: senator.EmailParlamentar,
        phone: senator.TelefoneParlamentar,
        parliamentaryPageUrl: senator.UrlPaginaParlamentar,
      })) || []
    )
  }

  const transformedBlocks = useMemo(
    () => transformBlocksData(blocksData),
    [blocksData]
  )
  const transformedSenators = useMemo(
    () => transformSenatorsData(senatorsData),
    [senatorsData]
  )

  const value = useMemo(
    () => ({
      senators: transformedSenators,
      parliamentaryBlocks: transformedBlocks,
      fetchParliamentaryBlockDetails,
      fetchSenatorDetails,
    }),
    [transformedSenators, transformedBlocks]
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useDataContext = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider")
  }
  return context
}
