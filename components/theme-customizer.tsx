"use client"

import * as React from "react"
import { Palette, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const themes = [
  {
    name: "Default",
    value: "default",
    colors: {
      primary: "hsl(222.2 84% 4.9%)",
      secondary: "hsl(210 40% 96%)",
    }
  },
  {
    name: "Blue",
    value: "blue",
    colors: {
      primary: "hsl(221.2 83.2% 53.3%)",
      secondary: "hsl(210 40% 96%)",
    }
  },
  {
    name: "Green",
    value: "green",
    colors: {
      primary: "hsl(142.1 76.2% 36.3%)",
      secondary: "hsl(138 76% 97%)",
    }
  },
  {
    name: "Purple",
    value: "purple",
    colors: {
      primary: "hsl(262.1 83.3% 57.8%)",
      secondary: "hsl(270 95% 98%)",
    }
  },
  {
    name: "Orange",
    value: "orange",
    colors: {
      primary: "hsl(24.6 95% 53.1%)",
      secondary: "hsl(33 100% 96%)",
    }
  },
]

export function ThemeCustomizer() {
  const [currentTheme, setCurrentTheme] = React.useState("default")

  const applyTheme = (theme: typeof themes[0]) => {
    const root = document.documentElement
    root.style.setProperty("--primary", theme.colors.primary)
    root.style.setProperty("--secondary", theme.colors.secondary)
    setCurrentTheme(theme.value)
    
    // Store in localStorage
    localStorage.setItem("color-theme", theme.value)
  }

  React.useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem("color-theme")
    if (savedTheme) {
      const theme = themes.find(t => t.value === savedTheme)
      if (theme) {
        applyTheme(theme)
      }
    }
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Customize theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => applyTheme(theme)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border"
                style={{ backgroundColor: theme.colors.primary }}
              />
              {theme.name}
            </div>
            {currentTheme === theme.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
