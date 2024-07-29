"use client"

import React from "react"

import ParliamentaryBlocksTable from "@/components/parliamentary-blocks/parliamentary-blocks-table"

const BlocosParlamentaresPage = () => {
  return (
    <div className="container sm:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">Blocos Parlamentares</h1>
        <h2 className="">Lista de blocos parlamentares</h2>
      </div>
      <div>
        <ParliamentaryBlocksTable />
      </div>
    </div>
  )
}

export default BlocosParlamentaresPage
