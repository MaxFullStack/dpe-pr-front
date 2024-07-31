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

  return (
    <DataTable
      data={parliamentaryBlocksList}
      columns={blockColumns}
      columnTranslations={columnTranslations}
      searchPlaceholder="Filtrar por sigla do partido..."
      searchColumnKey="partyAcronym"
      filterOptions={filterOptions(parliamentaryBlocksList)}
      initialVisibility={{ blockCode: false }}
    />
  )
}

export default ParliamentaryBlocksTable
