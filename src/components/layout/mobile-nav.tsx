"use client"

import React, { useEffect } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"

import FooterSection from "./footer-section"

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const MobileNav = ({ open, onClose }: MobileMenuProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [open])

  return (
    <>
      <div
        className={`${
          open ? "w-full" : "hidden"
        } absolute z-20 h-[calc(100vh-64px)] border-spacing-y-24 bg-muted md:hidden`}
      >
        <div className="flex flex-col border-y-2 py-6 sm:px-3">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={"py-4 text-center text-2xl font-semibold"}
              onClick={onClose}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="w-full py-6">
          <FooterSection />
        </div>
      </div>
    </>
  )
}

export default MobileNav
