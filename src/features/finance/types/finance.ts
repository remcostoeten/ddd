import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.string(),
  type: z.enum(['income', 'expense']),
  amount: z.number().positive(),
  description: z.string(),
  category: z.string(),
  date: z.date(),
  isRecurring: z.boolean(),
  recurringInterval: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
  isPaid: z.boolean(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;

export type FinanceStats = {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyBalance: number;
};

export type FinanceState = {
  transactions: Transaction[];
  stats: FinanceStats;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  removeTransaction: (id: string) => void;
  calculateStats: () => void;
};