'use client';

import { useState } from 'react'
import { useFinanceStore } from '@/features/finance/stores/finance-store'
import { RevenueChart } from '@/features/finance/components/charts/revenue-chart'
import { MerchantList } from '@/features/finance/components/merchants/merchant-list'
import { OverviewStats } from '@/features/finance/components/stats/overview-stats'
import TransactionForm from '@/features/finance/components/transaction/transaction-form'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import {DateRangePicker} from '@/shared/components/ui/date-range-picker'    
type ChartDataItem = {
  date: Date
  revenue: number
  transactions: number
}

export default function FinancePage() {
  const [isAddingTransaction, setIsAddingTransaction] = useState(false)
  const { transactions, merchants, stats, dateRange, addTransaction, setDateRange } = useFinanceStore()

  const chartData: ChartDataItem[] = transactions
    .filter((t) => t.date >= dateRange.startDate && t.date <= dateRange.endDate)
    .map((t) => ({
      date: t.date,
      revenue: t.type === 'income' ? t.amount : 0,
      transactions: 1,
    }))
    .reduce((acc: ChartDataItem[], curr) => {
      const dateStr = curr.date.toISOString().split('T')[0]
      const existing = acc.find((item: ChartDataItem) => item.date.toISOString().split('T')[0] === dateStr)
      if (existing) {
        existing.revenue += curr.revenue
        existing.transactions += curr.transactions
      } else {
        acc.push(curr)
      }
      return acc
    }, [])
    .sort((a: ChartDataItem, b: ChartDataItem) => a.date.getTime() - b.date.getTime())

  // Convert stats object to array format expected by OverviewStats
  const statsArray = [
    {
      title: 'Total Revenue',
      value: stats.totalRevenue,
      change: 0, // Calculate change if needed
      period: 'Current period',
    },
    {
      title: 'Total Expenses',
      value: stats.totalExpenses,
      change: 0,
      period: 'Current period',
    },
    {
      title: 'Net Income',
      value: stats.netIncome,
      change: 0,
      period: 'Current period',
    },
    {
      title: 'Average Transaction',
      value: stats.averageTransactionValue,
      change: 0,
      period: 'Current period',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <DateRangePicker
          from={dateRange.startDate}
          to={dateRange.endDate}
          onSelect={(from, to) => {
            if (from && to) setDateRange(from, to)
          }}
        />
        <Dialog open={isAddingTransaction} onOpenChange={setIsAddingTransaction}>
          <DialogTrigger asChild>
            <Button>Add Transaction</Button>
          </DialogTrigger>
          <DialogContent className="bg-background text-foreground">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm
              onSubmit={(data) => {
                addTransaction(data)
                setIsAddingTransaction(false)
              }}
              isLoading={false}
            />
          </DialogContent>
        </Dialog>
      </div>

      <OverviewStats stats={statsArray} />

      <div className="grid gap-6 md:grid-cols-4">
        <RevenueChart data={chartData} />
        <MerchantList 
          merchants={merchants.map(m => ({
            id: m.id,
            name: m.name,
            email: m.email,
            amount: m.totalAmount
          }))} 
        />
      </div>
    </div>
  )
}