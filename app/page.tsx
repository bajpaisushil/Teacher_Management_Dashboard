import { Suspense } from "react"
import { TeacherDashboard } from "@/components/teacher-dashboard"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<DashboardSkeleton />}>
        <TeacherDashboard />
      </Suspense>
    </div>
  )
}
