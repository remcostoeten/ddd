import { Metadata } from 'next'
import { metadata as metadataConfig } from '@/core/config/metadata'

export const metadata: Metadata = metadataConfig.settings

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
    </div>
  )
}

