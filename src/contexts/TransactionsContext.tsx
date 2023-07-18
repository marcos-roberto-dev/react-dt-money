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
  fetchTransactions: (query?: string) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

interface TransactionsProviderProps extends React.PropsWithChildren {}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    try {
      const url = new URL("http://localhost:3000/transactions");

      if (query) {
        url.searchParams.append("q", query);
      }

      const response = await fetch(url);
      const data = (await response.json()) as Transaction[];
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    void fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
