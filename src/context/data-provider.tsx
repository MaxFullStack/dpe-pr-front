"use client"

import React, { createContext, ReactNode, useContext, useMemo } from "react"

import { ParliamentaryBlock } from "@/types/parliamentary-block"
import { Senator } from "@/types/senator"
import { useParliamentaryBlockDetails } from "@/hooks/use-parliamentary-block-details"
import { useParliamentaryBlocks } from "@/hooks/use-parliamentary-blocks"
import { useSenatorDetails } from "@/hooks/use-senator-details"
import { useSenators } from "@/hooks/use-senators"

interface DataContextProps {
  senatorsList: Senator[]
  parliamentaryBlocksList: ParliamentaryBlock[]
  getParliamentaryBlockDetails: (id: string) => Promise<ParliamentaryBlock>
  getSenatorDetails: (id: string) => Promise<Senator>
}

const DataContext = createContext<DataContextProps | undefined>(undefined)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { data: senatorsData } = useSenators()
  const { data: blocksData } = useParliamentaryBlocks()

  const getParliamentaryBlockDetails = async (
    id: string
  ): Promise<ParliamentaryBlock> => {
    const { data } = await useParliamentaryBlockDetails(id)
    if (!data) {
      throw new Error("Block data not found")
    }
    return data
  }

  const getSenatorDetails = async (id: string): Promise<Senator> => {
    const { data } = await useSenatorDetails(id)
    if (!data) {
      throw new Error("Senator data not found")
    }
    return data
  }

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

  const transformedBlocksList = useMemo(
    () => transformBlocksData(blocksData),
    [blocksData]
  )
  const transformedSenatorsList = useMemo(
    () => transformSenatorsData(senatorsData),
    [senatorsData]
  )

  const value = useMemo(
    () => ({
      senatorsList: transformedSenatorsList,
      parliamentaryBlocksList: transformedBlocksList,
      getParliamentaryBlockDetails,
      getSenatorDetails,
    }),
    [transformedSenatorsList, transformedBlocksList]
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
