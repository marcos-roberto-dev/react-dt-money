import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
export function Header() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] =
    useState<boolean>(false)
  function handleTransactionModalOpenChange(value: boolean) {
    setIsTransactionModalOpen(value)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="Logo DTMoney" />
        <Dialog.Root
          open={isTransactionModalOpen}
          onOpenChange={handleTransactionModalOpenChange}
        >
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal
            handleTransactionModalCloseChange={handleTransactionModalOpenChange}
          />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
