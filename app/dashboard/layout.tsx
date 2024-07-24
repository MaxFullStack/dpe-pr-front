import DashboardPanelLayout from "@/components/dashboard-panel/dashboard-panel-layout"

interface RootLayoutProps {
  children: React.ReactNode
  charts: React.ReactNode
  users: React.ReactNode
}

export default function DashboardLayout({ children }: RootLayoutProps) {
  return (
    <>
      <DashboardPanelLayout>
        <div className="fixed top-16 z-10 flex h-16 w-full items-center bg-inherit">
          {children}
        </div>
      </DashboardPanelLayout>
    </>
  )
}
