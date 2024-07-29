import * as React from "react"
import { useDataContext } from "@/context/data-provider"

import DataTable from "@/components/data-table"

import {
  blockColumns,
  columnTranslations,
  filterOptions,
} from "./parliamentary-blocks-table-data"

const ParliamentaryBlocksTable = () => {
  const { parliamentaryBlocks } = useDataContext()

  return (
    <DataTable
      data={parliamentaryBlocks}
      columns={blockColumns}
      columnTranslations={columnTranslations}
      searchPlaceholder="Filtrar por sigla do partido..."
      searchColumnKey="partyAcronym"
      filterOptions={filterOptions(parliamentaryBlocks)}
    />
  )
}

export default ParliamentaryBlocksTable
