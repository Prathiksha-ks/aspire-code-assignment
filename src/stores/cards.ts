import { defineStore } from 'pinia'
import type { CardStatus, DebitCard } from '@/types'
import { addDebitCard, getDebitCardsDetails, updateDebitCardStatus } from '@/api'
import { ref } from 'vue'

export const useCardsStore = defineStore('cards', () => {
  const debitCardsDetails = ref<DebitCard[]>([])

  const dispatchGetDebitCardsDetails = async (userId: number) => {
    try {
      const response = await getDebitCardsDetails(userId)
      if (response.isSuccess) {
        debitCardsDetails.value = response.responseData as DebitCard[]
      }
    } catch (err) {
      throw new Error(err as string)
    }
  }

  const dispatchAddDebitCard = async (newCardName: string) => {
    try {
      const response = await addDebitCard(newCardName)
      if (response.isSuccess) {
        debitCardsDetails.value.push(response.responseData as DebitCard)
      }
    } catch (err) {
      throw new Error(err as string)
    }
  }

  const dispatchUpdateDebitCardStatus = async (cardName: string, cardStatus: CardStatus) => {
    try {
      const response = await updateDebitCardStatus({ cardName, cardStatus })
      if (response.isSuccess) {
        debitCardsDetails.value = response.responseData as DebitCard[]
      }
    } catch (err) {
      throw new Error(err as string)
    }
  }

  return {
    debitCardsDetails,
    dispatchGetDebitCardsDetails,
    dispatchAddDebitCard,
    dispatchUpdateDebitCardStatus,
  }
})
