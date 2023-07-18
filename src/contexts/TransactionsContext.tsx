import { createContext, useEffect, useState } from "react";
export interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
}

export const TransactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

interface TransactionsProviderProps extends React.PropsWithChildren {}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    try {
      const response = await fetch("http://localhost:3000/transactions");
      const data = (await response.json()) as Transaction[];
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    void loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
