import { Metadata } from 'next'

type MetadataConfig = {
  [key: string]: Metadata
}

const defaultMetadata: Metadata = {
  title: 'Finance Dashboard',
  description: 'Your personal finance management dashboard',
  icons: {
    icon: '/favicon.ico',
  },
}

export const metadata: MetadataConfig = {
  default: defaultMetadata,
  
  dashboard: {
    ...defaultMetadata,
    title: 'Dashboard | Finance',
    description: 'View and manage your financial overview',
  },

  settings: {
    ...defaultMetadata,
    title: 'Settings | Finance',
    description: 'Customize your dashboard preferences',
  },

  transactions: {
    ...defaultMetadata,
    title: 'Transactions | Finance',
    description: 'View and manage your financial transactions',
  },

  reports: {
    ...defaultMetadata,
    title: 'Reports | Finance',
    description: 'Analyze your financial reports and insights',
  },

  calendar: {
    ...defaultMetadata,
    title: 'Calendar | Finance',
    description: 'View your financial calendar and scheduled events',
  },

  documents: {
    ...defaultMetadata,
    title: 'Documents | Finance',
    description: 'Manage your financial documents and files',
  },
} 