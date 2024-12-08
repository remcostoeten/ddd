'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import { Label } from "@/shared/components/ui/label"
import { Skeleton } from "@/shared/components/ui/skeleton"

const themes = ['light', 'dark', 'system']

export function ThemeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedTheme, setSelectedTheme] = useState('system')
  const [loading, setLoading] = useState(false)

  const handleThemeChange = (theme: string) => {
    setLoading(true)
    setSelectedTheme(theme)
    // Simulate theme change delay
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose a theme</DialogTitle>
        </DialogHeader>
        <RadioGroup value={selectedTheme} onValueChange={handleThemeChange}>
          {themes.map((theme) => (
            <div key={theme} className="flex items-center space-x-2">
              <RadioGroupItem value={theme} id={theme} />
              <Label htmlFor={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</Label>
            </div>
          ))}
        </RadioGroup>
        {loading && (
          <div className="mt-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px] mt-2" />
            <Skeleton className="h-4 w-[150px] mt-2" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

