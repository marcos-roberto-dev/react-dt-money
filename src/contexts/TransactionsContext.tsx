import { createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'
export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionRequest {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionRequest) => Promise<void>
}

export const TransactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType,
)

type TransactionsProviderProps = React.PropsWithChildren

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    try {
      const { data: transactionsReponse } = await api.get<Transaction[]>(
        'transactions',
        {
          params: {
            _sort: 'createdAt',
            _order: 'desc',
            q: query,
          },
        },
      )
      setTransactions(transactionsReponse)
    } catch (error) {
      console.log(error)
    }
  }

  async function createTransaction(data: CreateTransactionRequest) {
    const { data: transactionResponse } = await api.post<Transaction>(
      'transactions',
      {
        ...data,
        createdAt: new Date(),
      },
    )

    setTransactions((state) => [transactionResponse, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
