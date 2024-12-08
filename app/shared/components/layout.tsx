'use client'

import { Sidebar } from './sidebar'
import { useSettingsStore } from '../../features/settings/settings-store'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { 
    fontSize, 
    highContrastMode, 
    dyslexicFont, 
    cursorSize, 
    reducedMotion, 
    compactMode 
  } = useSettingsStore()

  return (
    <div className={`
      flex dark 
      ${fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-lg' : 'text-base'}
      ${highContrastMode ? 'high-contrast' : ''}
      ${dyslexicFont ? 'font-dyslexic' : ''}
      ${cursorSize === 'small' ? 'cursor-small' : cursorSize === 'large' ? 'cursor-large' : ''}
      ${reducedMotion ? 'motion-reduce' : ''}
      ${compactMode ? 'compact-mode' : ''}
    `}>
      <Sidebar />
      <main className="flex-1 p-8 bg-[#1C1C1C] text-white">{children}</main>
    </div>
  )
}

