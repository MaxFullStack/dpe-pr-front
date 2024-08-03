"use client"

import React from "react"
import { useDataContext } from "@/context/data-provider"

import BlockCard from "./parliamentary-block-card"

const ParliamentaryBlockDetails = ({ blockId }: { blockId: string }) => {
  const { getParliamentaryBlockDetails } = useDataContext()
  const {
    data: details,
    error,
    isLoading,
  } = getParliamentaryBlockDetails(blockId)
  console.log(details, "data")
  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro: {error.message}</div>
  }

  if (!details) {
    return <div>Nenhum detalhe disponível.</div>
  }

  return (
    <div>
      <BlockCard
        blockName={details.blockName}
        partyAcronym={details.blockAcronym}
        creationDate={details.creationDate}
        members={details.members}
        blockCode={""}
      />
    </div>
  )
}

export default ParliamentaryBlockDetails
