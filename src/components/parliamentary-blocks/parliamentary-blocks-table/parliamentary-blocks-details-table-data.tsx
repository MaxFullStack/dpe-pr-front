import React from "react"
import { ColumnDef } from "@tanstack/react-table"

type Party = {
  partyCode: string
  partyAcronym: string
  partyName: string
}

type Member = {
  party: Party
  joinDate: string
  leaveDate?: string
}

export type ParliamentaryBlock = {
  blockCode: string
  blockName: string
  blockNickname: string
  creationDate: string
  members: Member[]
}

export const columnTranslations: { [key: string]: string } = {
  blockCode: "Código do Bloco",
  blockName: "Nome do Bloco",
  blockNickname: "Apelido do Bloco",
  creationDate: "Data de Criação",
  members: "Membros do Bloco",
}

export const blockColumns: ColumnDef<ParliamentaryBlock>[] = [
  {
    accessorKey: "blockCode",
    header: columnTranslations.blockCode,
  },
  {
    accessorKey: "blockName",
    header: columnTranslations.blockName,
  },
  {
    accessorKey: "blockNickname",
    header: columnTranslations.blockNickname,
  },
  {
    accessorKey: "creationDate",
    header: columnTranslations.creationDate,
    cell: ({ row }) => {
      const date = new Date(row.getValue<string>("creationDate"))
      return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
    },
  },
  {
    accessorKey: "members",
    header: columnTranslations.members,
    cell: ({ row }) => {
      const members = row.original.members
      return (
        <div>
          {members.map((member) => (
            <div key={member.party.partyCode}>
              {member.party.partyName} ({member.party.partyAcronym})
            </div>
          ))}
        </div>
      )
    },
  },
]
