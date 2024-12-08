'use client'

import { useEffect, useState, useRef } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { cn } from '@/shared/lib/utils'
import { Search, ArrowRight, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react'
import { sidebarMenu } from '@/app/core/config/sidebar-menu'

type CommandPaletteProps = {
  className?: string
}

export default function CommandPalette({ className }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleScroll = () => {
    if (!listRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = listRef.current
    setShowScrollIndicator(scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight)
  }

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    
    list.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    
    return () => list.removeEventListener('scroll', handleScroll)
  }, [open])

  const runCommand = (command: () => unknown) => {
    setOpen(false)
    command()
  }

  return (
    <>
      <style jsx global>{`
        .command-dialog {
          animation: contentShow 0.15s ease-out;
          background: var(--background);
        }
        
        .command-dialog[data-state='closed'] {
          animation: contentHide 0.15s ease-out;
        }

        @keyframes contentShow {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes contentHide {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        .command-scroll {
          scrollbar-width: thin;
          scrollbar-color: var(--border) var(--background);
        }

        .command-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .command-scroll::-webkit-scrollbar-track {
          background: var(--background);
        }

        .command-scroll::-webkit-scrollbar-thumb {
          background-color: var(--border);
          border-radius: 3px;
          border: 2px solid var(--background);
        }

        .scroll-indicator {
          animation: bounce 1.5s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
      `}</style>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium',
          'transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-1',
          'focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          'border border-border bg-background hover:bg-accent text-muted-foreground hover:text-accent-foreground',
          'h-9 px-4',
          className
        )}
      >
        <Search className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
        <span className="font-medium">Search...</span>
        <div className="ml-4 flex items-center gap-1">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>
          </kbd>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            K
          </kbd>
        </div>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="command-dialog overflow-hidden p-0 shadow-2xl">
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <div className="flex items-center justify-between border-b border-border px-3 py-2 bg-background/50" cmdk-input-wrapper="">
              <div className="flex items-center flex-1">
                <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="flex h-7 w-full bg-transparent text-sm font-medium outline-none text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="flex items-center gap-2 border-l border-border pl-3">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    <ArrowUp className="h-3 w-3 text-muted-foreground" />
                    <ArrowDown className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="text-xs text-muted-foreground">esc</kbd>
                  <span className="text-xs text-muted-foreground">close</span>
                </div>
              </div>
            </div>
            <Command.List 
              ref={listRef}
              className="command-scroll relative max-h-[400px] overflow-y-auto bg-background p-2"
            >
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground font-medium">
                No results found.
              </Command.Empty>
              <Command.Group heading="Navigation" className="pb-2">
                {sidebarMenu.map((item) => (
                  <Command.Item
                    key={item.href}
                    onSelect={() => runCommand(() => router.push(item.href))}
                    className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-foreground transition-colors duration-200 aria-selected:bg-accent aria-selected:text-accent-foreground"
                  >
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{item.tooltip}</span>
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Actions" className="pt-2 pb-2">
                <Command.Item
                  onSelect={() => runCommand(() => router.push('/agenda/new'))}
                  className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-foreground transition-colors duration-200 aria-selected:bg-accent aria-selected:text-accent-foreground"
                >
                  <span className="font-medium">Create New Agenda Item</span>
                </Command.Item>
              </Command.Group>
              {showScrollIndicator && (
                <div className="scroll-indicator absolute bottom-2 left-1/2 -translate-x-1/2">
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
} 