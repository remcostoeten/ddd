'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useFinanceStore } from '../../store/finance-store';
import { formatCurrency } from '../../utils/format';

export function FinanceStats() {
  const { stats } = useFinanceStore();

  const statCards = [
    {
      title: 'Monthly Income',
      value: stats.monthlyIncome,
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Monthly Expenses',
      value: stats.monthlyExpenses,
      icon: TrendingDown,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      title: 'Monthly Balance',
      value: stats.monthlyBalance,
      icon: DollarSign,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 rounded-lg border bg-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {formatCurrency(stat.value)}
              </h3>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}