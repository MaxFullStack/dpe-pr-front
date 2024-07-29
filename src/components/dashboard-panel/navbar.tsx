"use client"

import React from "react"

import { ThemeToggle } from "../layout/theme-toggle"
import { Breadcrumbs } from "./breadcrumbs"
import SheetMenu from "./sheet-menu"
import { UserNav } from "./user-nav"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b shadow-sm supports-[backdrop-filter]:bg-background">
      <div className="mx-4 flex h-16 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <Breadcrumbs />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

export default Navbar
