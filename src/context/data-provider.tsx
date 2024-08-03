"use client"

import React, { createContext, ReactNode, useContext, useMemo } from "react"

import { ParliamentaryBlock } from "@/types/parliamentary-block"
import { Senator } from "@/types/senator"
import { useParliamentaryBlockDetails } from "@/hooks/use-parliamentary-block-details"
import { useParliamentaryBlocks } from "@/hooks/use-parliamentary-blocks"
import { useSenatorDetails } from "@/hooks/use-senator-details"
import { useSenators } from "@/hooks/use-senators"
import { UseQueryResult } from "@tanstack/react-query"

interface DataContextProps {
  senatorsList: UseQueryResult<Senator[], Error>;
  parliamentaryBlocksList: UseQueryResult<ParliamentaryBlock[], Error>;
  getParliamentaryBlockDetails: (id: string) => UseQueryResult<ParliamentaryBlock, Error>;
  getSenatorDetails: (id: string) => UseQueryResult<Senator, Error>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const parliamentaryBlocksQuery = useParliamentaryBlocks();
  const senatorsQuery = useSenators();
  const getParliamentaryBlockDetails = (id: string) => useParliamentaryBlockDetails(id);
  const getSenatorDetails = (id: string) => useSenatorDetails(id);

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

  const value = useMemo(() => {
    return {
      senatorsList: senatorsQuery,
      parliamentaryBlocksList: parliamentaryBlocksQuery,
      getParliamentaryBlockDetails,
      getSenatorDetails,
    };
  }, [parliamentaryBlocksQuery, senatorsQuery, getParliamentaryBlockDetails, getSenatorDetails]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useDataContext = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider")
  }
  return context
}
