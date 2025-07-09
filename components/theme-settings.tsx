"use client"

import * as React from "react"
import { Settings, Palette, Monitor, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

const colorThemes = [
  {
    name: "Default",
    value: "default",
    primary: "hsl(222.2 84% 4.9%)",
    secondary: "hsl(210 40% 96%)",
  },
  {
    name: "Blue",
    value: "blue",
    primary: "hsl(221.2 83.2% 53.3%)",
    secondary: "hsl(210 40% 96%)",
  },
  {
    name: "Green",
    value: "green",
    primary: "hsl(142.1 76.2% 36.3%)",
    secondary: "hsl(138 76% 97%)",
  },
  {
    name: "Purple",
    value: "purple",
    primary: "hsl(262.1 83.3% 57.8%)",
    secondary: "hsl(270 95% 98%)",
  },
  {
    name: "Orange",
    value: "orange",
    primary: "hsl(24.6 95% 53.1%)",
    secondary: "hsl(33 100% 96%)",
  },
  {
    name: "Rose",
    value: "rose",
    primary: "hsl(346.8 77.2% 49.8%)",
    secondary: "hsl(355 100% 97%)",
  },
]

export function ThemeSettings() {
  const { theme, setTheme } = useTheme()
  const [colorTheme, setColorTheme] = React.useState("default")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const savedColorTheme = localStorage.getItem("color-theme")
    if (savedColorTheme) {
      setColorTheme(savedColorTheme)
      applyColorTheme(savedColorTheme)
    }
  }, [])

  const applyColorTheme = (selectedTheme: string) => {
    const themeConfig = colorThemes.find((t) => t.value === selectedTheme)
    if (themeConfig) {
      const root = document.documentElement
      root.style.setProperty("--primary", themeConfig.primary)
      root.style.setProperty("--secondary", themeConfig.secondary)
      setColorTheme(selectedTheme)
      localStorage.setItem("color-theme", selectedTheme)
    }
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="icon">
        <Settings className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Theme settings</span>
      </Button>
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Theme settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Settings
          </SheetTitle>
          <SheetDescription>Customize the appearance of your application</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Theme Mode */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Theme Mode</Label>
            <RadioGroup value={theme} onValueChange={setTheme}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                  <Sun className="h-4 w-4" />
                  Light
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                  <Moon className="h-4 w-4" />
                  Dark
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="flex items-center gap-2 cursor-pointer">
                  <Monitor className="h-4 w-4" />
                  System
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Color Theme */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Color Theme</Label>
            <div className="grid grid-cols-2 gap-3">
              {colorThemes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => applyColorTheme(themeOption.value)}
                  className={`
                    relative p-3 rounded-lg border-2 transition-all
                    ${
                      colorTheme === themeOption.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: themeOption.primary }} />
                    <span className="text-sm font-medium">{themeOption.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-full h-2 rounded" style={{ backgroundColor: themeOption.primary }} />
                    <div className="w-full h-2 rounded" style={{ backgroundColor: themeOption.secondary }} />
                  </div>
                  {colorTheme === themeOption.value && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Reset */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Reset</Label>
            <Button
              variant="outline"
              onClick={() => {
                setTheme("system")
                applyColorTheme("default")
              }}
              className="w-full"
            >
              Reset to Default
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
