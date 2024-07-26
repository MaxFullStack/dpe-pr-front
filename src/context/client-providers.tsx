"use client"

import React from "react"
import queryClient from "@/services/query-client"
import { QueryClientProvider } from "@tanstack/react-query"

interface ClientProvidersProps {
  children: React.ReactNode
}

const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ClientProviders
