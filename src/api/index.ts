import { debitCardsDetails } from '@/api/data/dummyData'
import { CardStatus, type ApiResponse, type CardStatusUpdateRequest, type DebitCard } from '@/types'

const getDebitCardsDetails = async (userId: number): ApiResponse<DebitCard[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId) {
        resolve({
          isSuccess: true,
          statusCode: 200,
          responseData: debitCardsDetails,
        })
      } else {
        reject({
          isSuccess: false,
          statusCode: 404,
          error: new Error('User not found'),
        })
      }
    }, 500)
  })
}

const addDebitCard = async (newCardName: string): ApiResponse<DebitCard> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (newCardName) {
        resolve({
          isSuccess: true,
          statusCode: 200,
          responseData: {
            cardName: newCardName,
            cardNumber: `1234-5678-9012-2${Math.floor(Math.random() * 1000)}`,
            expiryDate: `12/2${Math.floor(Math.random() * 10)}`,
            cardType: 'Visa',
            cardCvv: 123,
            cardStatus: CardStatus.UNFROZEN,
            transactions: [],
          },
        })
      } else {
        reject({
          isSuccess: false,
          statusCode: 400,
          error: new Error('Invalid card name request'),
        })
      }
    }, 500)
  })
}

const updateDebitCardStatus = async (
  request: CardStatusUpdateRequest,
): ApiResponse<DebitCard[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (request.cardName && request.cardStatus) {
        const cardIndex = debitCardsDetails.findIndex((card) => card.cardName === request.cardName)
        if (cardIndex !== -1) {
          debitCardsDetails[cardIndex].cardStatus = request.cardStatus
          resolve({
            isSuccess: true,
            statusCode: 200,
            responseData: debitCardsDetails,
          })
        } else {
          reject({
            isSuccess: false,
            statusCode: 404,
            error: new Error('Card not found'),
          })
        }
      } else {
        reject({
          isSuccess: false,
          statusCode: 400,
          error: new Error('Invalid request'),
        })
      }
    }, 500)
  })
}

export { getDebitCardsDetails, addDebitCard, updateDebitCardStatus }
