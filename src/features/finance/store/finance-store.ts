import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Transaction, FinanceState, FinanceStats } from '../types/finance';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

const calculateFinanceStats = (transactions: Transaction[]): FinanceStats => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const monthlyTransactions = transactions.filter(t => 
    isWithinInterval(t.date, { start: monthStart, end: monthEnd })
  );

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    monthlyIncome,
    monthlyExpenses,
    monthlyBalance: monthlyIncome - monthlyExpenses,
  };
};

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      stats: {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        monthlyBalance: 0,
      },
      addTransaction: (transaction) => {
        const newTransaction = {
          ...transaction,
          id: uuidv4(),
        };
        set((state) => {
          const newTransactions = [...state.transactions, newTransaction];
          return {
            transactions: newTransactions,
            stats: calculateFinanceStats(newTransactions),
          };
        });
      },
      updateTransaction: (id, transaction) => {
        set((state) => {
          const newTransactions = state.transactions.map((t) =>
            t.id === id ? { ...t, ...transaction } : t
          );
          return {
            transactions: newTransactions,
            stats: calculateFinanceStats(newTransactions),
          };
        });
      },
      removeTransaction: (id) => {
        set((state) => {
          const newTransactions = state.transactions.filter((t) => t.id !== id);
          return {
            transactions: newTransactions,
            stats: calculateFinanceStats(newTransactions),
          };
        });
      },
      calculateStats: () => {
        set((state) => ({
          stats: calculateFinanceStats(state.transactions),
        }));
      },
    }),
    {
      name: 'finance-storage',
    }
  )
);