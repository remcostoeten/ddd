
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#181818] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 text-center"
      >
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-white">Page not found</h2>
          <p className="text-gray-400">
            Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL?
            Be sure to check your spelling.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <form onSubmit={handleSearch} className="relative">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder-gray-400"
            />
          </form>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-[#3A3A3A] text-white hover:bg-[#2A2A2A] hover:text-[#3ECF8E]"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Button>
            <Button
              className="inline-flex items-center justify-center gap-2 bg-[#3ECF8E] text-black hover:bg-[#3ECF8E]/90"
              asChild
            >
              <Link href="/dashboard">
                <Home className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>

        <div className="pt-8 border-t border-[#2A2A2A]">
          <nav className="flex justify-center gap-6">
            <Link href="/docs" className="text-sm text-gray-400 hover:text-white">
              Documentation
            </Link>
            <Link href="/support" className="text-sm text-gray-400 hover:text-white">
              Support
            </Link>
            <Link href="/status" className="text-sm text-gray-400 hover:text-white">
              Status
            </Link>
          </nav>
        </div>
      </motion.div>
    </div>
  )
}

