import { Metadata } from 'next'
import { metadata as metadataConfig } from '@/core/config/metadata'

export const metadata: Metadata = metadataConfig.dashboard

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

