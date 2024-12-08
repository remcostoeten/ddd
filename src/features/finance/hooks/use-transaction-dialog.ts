'use client';

import { useState } from 'react';
import { Transaction } from '../types/finance';

export function useTransactionDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Partial<Transaction> | undefined>();

  const openDialog = (transaction?: Partial<Transaction>) => {
    setSelectedTransaction(transaction);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setSelectedTransaction(undefined);
    setIsOpen(false);
  };

  return {
    isOpen,
    selectedTransaction,
    openDialog,
    closeDialog,
  };
}