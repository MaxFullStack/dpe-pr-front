import React from "react"

import { ParliamentaryBlock } from "@/types/parliamentary-block"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const ParliamentaryBlockCard = ({
  blockName,
  partyAcronym,
  creationDate,
  members,
}: ParliamentaryBlock) => {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{blockName}</CardTitle>
        <CardDescription className="flex flex-col">
          <span>Sigla: {partyAcronym}</span>
          <span>Data de Criação: {creationDate}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h4>Membros:</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {members.map((member, index) => (
              <div key={index} className="border p-6 shadow-lg">
                <p>
                  <span className="font-semibold">Sigla Partido: </span>
                  {member.party.partyAcronym}
                </p>
                <p>
                  <span className="font-semibold">Nome Partido: </span>
                  {member.party.partyName}
                </p>
                <p>
                  <span className="font-semibold">Data de Adesão: </span>
                  {member.joinDate}
                </p>
                {member.leaveDate && (
                  <p>
                    <span className="font-semibold">
                      Data de Desligamento:{" "}
                    </span>
                    {member.leaveDate}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      {/* <CardFooter>
        <p>Code: {blockCode}</p>
      </CardFooter> */}
    </Card>
  )
}

export default ParliamentaryBlockCard
