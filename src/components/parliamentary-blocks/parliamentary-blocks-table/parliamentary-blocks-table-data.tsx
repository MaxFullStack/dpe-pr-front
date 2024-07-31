import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { ParliamentaryBlock } from "@/types/parliamentary-block"
import { formatDate } from "@/lib/utils"

export const columnTranslations: { [key: string]: string } = {
  blockCode: "Código do Bloco",
  blockName: "Nome do Bloco",
  creationDate: "Data de Criação",
  partyAcronym: "Sigla do Partido",
}

export const blockColumns: ColumnDef<ParliamentaryBlock>[] = [
  {
    accessorKey: "blockCode",
    header: columnTranslations.blockCode,
  },

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
    cell: ({ row }) => {
      const blockCode = row.getValue<string>("blockCode")
      const blockName = row.getValue<string>("blockName")
      return (
        <Link href={`/dashboard/blocos-parlamentares/${blockCode}`}>
          <div className="text-blue-500 underline">{blockName}</div>
        </Link>
      )
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
