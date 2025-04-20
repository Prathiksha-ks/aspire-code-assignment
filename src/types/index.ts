export interface Transaction {
  id: number
  name: string
  date: string
  type: TransactionType
  amount: number
  image: string
}

export interface DebitCard {
  cardName: string
  cardNumber: string
  expiryDate: string
  cardType: string
  cardCvv: number
  cardStatus: CardStatus
  transactions: Transaction[]
}

export enum CardStatus {
  FROZEN = 'FROZEN',
  UNFROZEN = 'UNFROZEN',
}

export enum TransactionType {
  CHARGED = 'CHARGED',
  REFUND = 'REFUND',
}

export type ApiResponse<T> = Promise<{
  isSuccess: boolean
  statusCode: number
  responseData?: T
  error?: Error
}>

export interface CardStatusUpdateRequest {
  cardName: string
  cardStatus: CardStatus
}
