// Update imports
import { GraduationCap } from "lucide-react"
import { ThemeSettings } from "@/components/theme-settings"

// Update the header content
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">EduManage</span>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeSettings />
        </div>
      </div>
    </header>
  )
}
