"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ThemeToggle } from "../layout/theme-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import SheetMenu from "./sheet-menu"
import { UserNav } from "./user-nav"

const Navbar = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  const titleMap: { [key: string]: string } = {
    dashboard: "Dashboard",
    blocks: "Blocos",
    senators: "Senadores",
    // Adicione mais mapeamentos conforme necessário
  }

  const title = pathSegments
    .map((segment) => titleMap[segment] || segment)
    .join(" / ")

  return (
    <header className="sticky top-0 z-10 w-full border-b shadow-sm supports-[backdrop-filter]:bg-background">
      <div className="mx-4 flex h-16 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pathSegments.map((segment, index) => (
                <React.Fragment key={segment}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === pathSegments.length - 1 ? (
                      <BreadcrumbPage>
                        {titleMap[segment] || segment}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link
                          href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                        >
                          {titleMap[segment] || segment}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
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
