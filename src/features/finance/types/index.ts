export type Transaction = {
  id: string
  amount: number
  description: string
  category: string
  type: 'income' | 'expense'
  date: Date
  merchant?: string
  status: 'completed' | 'pending' | 'failed'
}

export type Merchant = {
  id: string
  name: string
  email: string
  totalTransactions: number
  totalAmount: number
  lastTransaction: Date
  category: string
}

export type FinanceStats = {
  totalRevenue: number
  totalExpenses: number
  netIncome: number
  transactionCount: number
  averageTransactionValue: number
  merchantCount: number
}

export type DateRange = {
  startDate: Date
  endDate: Date
} 