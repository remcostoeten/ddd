'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Transaction, type Merchant, type FinanceStats } from '../types'

type FinanceStore = {
  transactions: Transaction[]
  merchants: Merchant[]
  stats: FinanceStats
  dateRange: {
    startDate: Date
    endDate: Date
  }
  addTransaction: (transaction: Omit<Transaction, 'id' | 'status'>) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  calculateStats: () => void
  setDateRange: (startDate: Date, endDate: Date) => void
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      merchants: [],
      stats: {
        totalRevenue: 0,
        totalExpenses: 0,
        netIncome: 0,
        transactionCount: 0,
        averageTransactionValue: 0,
        merchantCount: 0,
      },
      dateRange: {
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
        endDate: new Date(),
      },

      addTransaction: (transactionData) => {
        const transaction: Transaction = {
          ...transactionData,
          id: crypto.randomUUID(),
          status: 'completed',
        }

        set((state) => {
          const newTransactions = [...state.transactions, transaction]
          const updatedMerchants = updateMerchants(newTransactions, state.merchants)
          return {
            transactions: newTransactions,
            merchants: updatedMerchants,
          }
        })

        get().calculateStats()
      },

      updateTransaction: (id, transactionData) => {
        set((state) => {
          const newTransactions = state.transactions.map((t) =>
            t.id === id ? { ...t, ...transactionData } : t
          )
          const updatedMerchants = updateMerchants(newTransactions, state.merchants)
          return {
            transactions: newTransactions,
            merchants: updatedMerchants,
          }
        })

        get().calculateStats()
      },

      deleteTransaction: (id) => {
        set((state) => {
          const newTransactions = state.transactions.filter((t) => t.id !== id)
          const updatedMerchants = updateMerchants(newTransactions, state.merchants)
          return {
            transactions: newTransactions,
            merchants: updatedMerchants,
          }
        })

        get().calculateStats()
      },

      calculateStats: () => {
        set((state) => {
          const { startDate, endDate } = state.dateRange
          const filteredTransactions = state.transactions.filter(
            (t) => t.date >= startDate && t.date <= endDate
          )

          const stats = filteredTransactions.reduce(
            (acc, transaction) => {
              if (transaction.type === 'income') {
                acc.totalRevenue += transaction.amount
              } else {
                acc.totalExpenses += transaction.amount
              }
              return acc
            },
            {
              totalRevenue: 0,
              totalExpenses: 0,
              netIncome: 0,
              transactionCount: filteredTransactions.length,
              averageTransactionValue: 0,
              merchantCount: new Set(
                filteredTransactions.map((t) => t.merchant).filter(Boolean)
              ).size,
            }
          )

          stats.netIncome = stats.totalRevenue - stats.totalExpenses
          stats.averageTransactionValue =
            filteredTransactions.length > 0
              ? filteredTransactions.reduce((sum, t) => sum + t.amount, 0) /
                filteredTransactions.length
              : 0

          return { stats }
        })
      },

      setDateRange: (startDate, endDate) => {
        set({ dateRange: { startDate, endDate } })
        get().calculateStats()
      },
    }),
    {
      name: 'finance-store',
    }
  )
)

function updateMerchants(transactions: Transaction[], currentMerchants: Merchant[]): Merchant[] {
  const merchantMap = new Map<string, Merchant>()

  transactions.forEach((transaction) => {
    if (!transaction.merchant) return

    const existing = merchantMap.get(transaction.merchant) || {
      id: crypto.randomUUID(),
      name: transaction.merchant,
      email: '', // This would need to be set when creating a merchant profile
      totalTransactions: 0,
      totalAmount: 0,
      lastTransaction: new Date(0),
      category: transaction.category,
    }

    merchantMap.set(transaction.merchant, {
      ...existing,
      totalTransactions: (existing.totalTransactions || 0) + 1,
      totalAmount: (existing.totalAmount || 0) + transaction.amount,
      lastTransaction:
        transaction.date > existing.lastTransaction ? transaction.date : existing.lastTransaction,
    })
  })

  return Array.from(merchantMap.values())
} 