'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { cn } from '@/shared/lib/utils'
import { Search } from 'lucide-react'
import { sidebarMenu } from '@/app/core/config/sidebar-menu'

type SearchPopoverProps = {
  className?: string
}

export default function SearchPopover({ className }: SearchPopoverProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/' && !open) {
        e.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open])

  const runCommand = (command: () => unknown) => {
    setOpen(false)
    command()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'inline-flex items-center justify-between w-full rounded-md text-sm',
            'border border-[#2A2A2A] bg-[#1E1E1E] hover:bg-[#2A2A2A] text-[#888888]',
            'h-9 px-3 transition-colors',
            className
          )}
        >
          <div className="inline-flex items-center">
            <Search className="mr-2 h-4 w-4 opacity-50" />
            <span className="text-sm text-muted-foreground">Search...</span>
          </div>
          <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-[#2A2A2A] bg-[#1E1E1E] px-1.5 font-mono text-[10px] font-medium text-[#888888]">
            /
          </kbd>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--trigger-width)] p-0 bg-[#121212] border-[#2A2A2A]" style={{ "--trigger-width": "var(--radix-popover-trigger-width)" } as any}>
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[#888888]">
          <div className="flex items-center border-b border-[#2A2A2A] px-3 bg-[#1E1E1E]" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-40" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Type to search..."
              className="flex h-9 w-full bg-transparent py-3 text-sm outline-none placeholder:text-[#888888] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-[#888888]">
              No results found.
            </Command.Empty>
            {search === '' && (
              <Command.Group heading="Quick Links">
                {sidebarMenu.map((item) => (
                  <Command.Item
                    key={item.href}
                    onSelect={() => runCommand(() => router.push(item.href))}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-[#E4E4E4] aria-selected:bg-[#2A2A2A] aria-selected:text-white"
                  >
                    <item.icon className="h-4 w-4 opacity-70" />
                    <span className="font-medium">{item.tooltip}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
            {search !== '' && (
              <>
                <Command.Group heading="Pages">
                  {sidebarMenu
                    .filter(item => 
                      item.tooltip.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((item) => (
                      <Command.Item
                        key={item.href}
                        onSelect={() => runCommand(() => router.push(item.href))}
                        className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-[#E4E4E4] aria-selected:bg-[#2A2A2A] aria-selected:text-white"
                      >
                        <item.icon className="h-4 w-4 opacity-70" />
                        <span className="font-medium">{item.tooltip}</span>
                      </Command.Item>
                    ))}
                </Command.Group>
                <Command.Group heading="Actions" className="pt-2">
                  <Command.Item
                    onSelect={() => runCommand(() => router.push('/search?q=' + encodeURIComponent(search)))}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-[#E4E4E4] aria-selected:bg-[#2A2A2A] aria-selected:text-white"
                  >
                    <Search className="h-4 w-4 opacity-70" />
                    <span className="font-medium">Search for "{search}"</span>
                  </Command.Item>
                </Command.Group>
              </>
            )}
          </Command.List>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 