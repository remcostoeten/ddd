'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown, MoreVertical, Repeat } from 'lucide-react';
import { useFinanceStore } from '../../store/finance-store';
import { formatCurrency } from '../../utils/format';
import { Transaction } from '../../types/finance';
import { TransactionFilters } from './transaction-filters';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';

export function TransactionList() {
  const { transactions, removeTransaction } = useFinanceStore();
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    startDate: null,
    endDate: null,
  });

  const filteredTransactions = transactions.filter((transaction) => {
    if (filters.type !== 'all' && transaction.type !== filters.type) return false;
    if (filters.category !== 'all' && transaction.category !== filters.category) return false;
    if (filters.startDate && transaction.date < filters.startDate) return false;
    if (filters.endDate && transaction.date > filters.endDate) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <TransactionFilters filters={filters} onFilterChange={setFilters} />
      
      <div className="rounded-lg border bg-card">
        <div className="p-4 grid grid-cols-[1fr,auto,auto,auto] gap-4 border-b text-sm font-medium text-muted-foreground">
          <div>Description</div>
          <div>Category</div>
          <div>Date</div>
          <div>Amount</div>
        </div>

        <AnimatePresence initial={false}>
          {filteredTransactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-[1fr,auto,auto,auto] gap-4 p-4 items-center border-b last:border-0 hover:bg-accent/50"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  {transaction.isRecurring && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Repeat className="w-3 h-3" />
                      <span>Recurring {transaction.recurringInterval}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                {transaction.category}
              </div>

              <div className="text-sm text-muted-foreground">
                {format(transaction.date, 'MMM d, yyyy')}
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className={`font-medium ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => removeTransaction(transaction.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTransactions.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No transactions found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}