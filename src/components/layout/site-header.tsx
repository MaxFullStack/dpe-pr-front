"use client"

import { useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"

import { Icons } from "./icons"
import MainNav from "./main-nav"
import MobileNav from "./mobile-nav"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center space-x-16 px-4 sm:justify-between sm:space-x-0 md:px-12">
        <Link href="/" className="flex items-center space-x-2 md:mr-16">
          <Icons.logo className="size-6 pb-0.5" />
          <div className="inline-block text-xl font-bold">
            {siteConfig.name}
          </div>
        </Link>
        <div className="hidden md:flex">
          <MainNav items={siteConfig.mainNav} />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
            <Button
              className="flex md:hidden"
              variant="outline"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <Icons.x className="size-6" />
              ) : (
                <Icons.menu className="size-6" />
              )}
            </Button>
          </nav>
        </div>
      </div>
      <MobileNav
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  )
}
