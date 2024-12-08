'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useFinanceStore } from "../../store/finance-store";
import { TransactionForm } from "./transaction-form";
import { Transaction } from "../../types/finance";

interface TransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<Transaction>;
}

export function TransactionDialog({ isOpen, onClose, initialData }: TransactionDialogProps) {
  const { addTransaction } = useFinanceStore();

  const handleSubmit = (data: Omit<Transaction, 'id'>) => {
    addTransaction(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Transaction' : 'Add Transaction'}
          </DialogTitle>
        </DialogHeader>
        <TransactionForm 
          onSubmit={handleSubmit} 
          initialData={initialData}
        />
      </DialogContent>
    </Dialog>
  );
}