import { ColumnDef } from "@tanstack/react-table"

import { ParliamentaryBlock } from "@/types/parliamentary-block"
import { formatDate } from "@/lib/utils"

export const columnTranslations: { [key: string]: string } = {
  blockCode: "Código do Bloco",
  blockName: "Nome do Bloco",
  blockNickname: "Apelido do Bloco",
  creationDate: "Data de Criação",
  partyAcronym: "Sigla do Partido",
}

export const blockColumns: ColumnDef<ParliamentaryBlock>[] = [
  {
    accessorKey: "partyAcronym",
    header: columnTranslations.partyAcronym,
  },
  {
    accessorKey: "blockName",
    header: columnTranslations.blockName,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "creationDate",
    header: columnTranslations.creationDate,
    /*  cell: ({ row }) => {
      const date = new Date(row.getValue<string>("creationDate"))
      return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
    }, */
    cell: ({ cell }) => formatDate(cell.getValue() as Date),
  },
]

export const filterOptions = (data: ParliamentaryBlock[]) => {
  const uniqueBlockNames = Array.from(
    new Set(data.map((item) => item.blockName))
  )
  return [
    {
      columnKey: "blockName" as keyof ParliamentaryBlock,
      title: "Nome do Bloco",
      options: uniqueBlockNames.map((blockName) => ({
        label: blockName,
        value: blockName,
      })),
    },
  ]
}
