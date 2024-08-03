import * as React from "react"
import { useDataContext } from "@/context/data-provider"

import DataTable from "@/components/data-table"

import {
  blockColumns,
  columnTranslations,
  filterOptions,
} from "./parliamentary-blocks-table-data"

const ParliamentaryBlocksTable = () => {
  const { parliamentaryBlocksList } = useDataContext()
  const { data, isLoading, error } = parliamentaryBlocksList

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>Erro: {error.message}</div>
  }

  return (
    <DataTable
      data={data || []}
      columns={blockColumns}
      columnTranslations={columnTranslations}
      searchPlaceholder="Filtrar por sigla do partido..."
      searchColumnKey="partyAcronym"
      filterOptions={filterOptions(data || [])}
      initialVisibility={{ blockCode: false }}
    />
  )
}

export default ParliamentaryBlocksTable
