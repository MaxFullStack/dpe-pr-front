"use client"

import React, { createContext, ReactNode, useContext } from "react"
import { UseQueryResult } from "@tanstack/react-query"

import { ParliamentaryBlock } from "@/types/parliamentary-block"
import { Senator } from "@/types/senator"
import { useParliamentaryBlockDetails } from "@/hooks/use-parliamentary-block-details"
import { useParliamentaryBlocks } from "@/hooks/use-parliamentary-blocks"
import { useSenatorDetails } from "@/hooks/use-senator-details"
import { useSenators } from "@/hooks/use-senators"

interface DataContextProps {
  senatorsList: UseQueryResult<Senator[], Error>
  parliamentaryBlocksList: UseQueryResult<ParliamentaryBlock[], Error>
  getParliamentaryBlockDetails: (
    id: string
  ) => UseQueryResult<ParliamentaryBlock, Error>
  getSenatorDetails: (id: string) => UseQueryResult<Senator, Error>
}

const DataContext = createContext<DataContextProps | undefined>(undefined)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const senatorsList = useSenators()
  const parliamentaryBlocksList = useParliamentaryBlocks()

  const getParliamentaryBlockDetails = (id: string) => {
    return useParliamentaryBlockDetails(id)
  }

  const getSenatorDetails = (id: string) => {
    return useSenatorDetails(id)
  }

  return (
    <DataContext.Provider
      value={{
        senatorsList,
        parliamentaryBlocksList,
        getParliamentaryBlockDetails,
        getSenatorDetails,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider")
  }
  return context
}
