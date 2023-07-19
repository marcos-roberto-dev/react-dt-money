import { MagnifyingGlass } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useContextSelector } from 'use-context-selector'
import { SearchFormContainer } from './styles'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactions,
  )

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer
      onSubmit={handleSubmit(handleSearchTransactions) as unknown as undefined}
    >
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
