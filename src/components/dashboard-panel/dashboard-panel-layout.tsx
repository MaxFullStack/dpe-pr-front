"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { useSidebarToggle } from "@/hooks/use-sidebar-toogle"
import { useStore } from "@/hooks/use-store"

import FooterSection from "../layout/footer-section"
import { Navbar } from "./navbar"
import Sidebar from "./sidebar"

const DashboarPanelLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null

  return (
    <>
      <Sidebar />
      <div className="flex min-h-screen flex-col">
        <main
          className={cn(
            "flex-1 bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
            sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
          )}
        >
          <Navbar title="Dashboard" />
          {children}
        </main>
        <footer
          className={cn(
            "transition-[margin-left] duration-300 ease-in-out",
            sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
          )}
        >
          <FooterSection />
        </footer>
      </div>
    </>
  )
}

export default DashboarPanelLayout
