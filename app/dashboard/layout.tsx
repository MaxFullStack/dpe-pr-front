import { DataProvider } from "@/context/data-provider"

import DashboardPanelLayout from "@/components/dashboard-panel/dashboard-panel-layout"

interface RootLayoutProps {
  children: React.ReactNode
  charts: React.ReactNode
  users: React.ReactNode
}

export default function DashboardLayout({ children }: RootLayoutProps) {
  return (
    <>
      <DataProvider>
        <DashboardPanelLayout>
          <div className="mt-6 flex w-full flex-col bg-inherit">{children}</div>
        </DashboardPanelLayout>
      </DataProvider>
    </>
  )
}
