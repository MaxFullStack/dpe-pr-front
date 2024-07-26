"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { useSidebarToggle } from "@/hooks/use-sidebar-toogle"

import FooterSection from "../layout/footer-section"
import Navbar from "./navbar"
import Sidebar from "./sidebar"

const DashboardPanelLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSidebarToggle()

  if (isOpen === undefined) return null

  return (
    <>
      <Sidebar />
      <div className="flex min-h-screen flex-col">
        <main
          className={cn(
            "flex-1 bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
            isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
          )}
        >
          <Navbar />
          {children}
        </main>
        <footer
          className={cn(
            "transition-[margin-left] duration-300 ease-in-out",
            isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
          )}
        >
          <FooterSection />
        </footer>
      </div>
    </>
  )
}

export default DashboardPanelLayout
