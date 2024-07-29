import { Bookmark, LayoutGrid, LucideIcon, SquarePen } from "lucide-react"

type Submenu = {
  href: string
  label: string
  active: boolean
}

type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
  submenus: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Pesquisa",
      menus: [
        {
          href: "/dashboard/blocos-parlamentares",
          label: "Blocos Parlamentares",
          active: pathname.includes("/dashboard/blocos-parlamentares"),
          icon: SquarePen,
          submenus: [],
        },
        {
          href: "/dashboard/senadores",
          label: "Senadores",
          active: pathname.includes("/dashboard/senadores"),
          icon: Bookmark,
          submenus: [],
        },
      ],
    },
  ]
}
