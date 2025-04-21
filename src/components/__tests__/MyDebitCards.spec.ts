import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import MyDebitCards from '../MyDebitCards.vue'
import DebitCards from '../DebitCards.vue'
import { useCardsStore } from '@/stores/cards'
import { CardStatus, TransactionType } from '@/types'

const mockDebitCardsDetails = [
  {
    cardName: 'Mark Henry',
    cardNumber: '1234-5678-9012-2020',
    expiryDate: '12/20',
    cardType: 'Visa',
    cardCvv: 123,
    cardStatus: CardStatus.UNFROZEN,
    transactions: [],
  },
]

const mockDispatchUpdateDebitCardStatus = vi.fn()

vi.mock('@/stores/cards', () => ({
  useCardsStore: vi.fn(() => ({
    debitCardsDetails: mockDebitCardsDetails,
    dispatchUpdateDebitCardStatus: mockDispatchUpdateDebitCardStatus,
  })),
}))

describe('MyDebitCards.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(MyDebitCards, {
      global: {
        stubs: {
          DetailsContainer: false,
        },
      },
    })
  })

  it('renders the DebitCards component', () => {
    expect(wrapper.findComponent(DebitCards).exists()).toBe(true)
  })

  it('renders the correct number of card actions', () => {
    const actions = wrapper.findAll('.action-item')
    expect(actions.length).toBe(5) // Based on the `cardActions` array
  })

  it('calls the correct action when a card action is clicked', async () => {
    const actions = wrapper.findAll('.action-item')

    await actions[0].trigger('click') // Freeze/Unfreeze card action
    expect(useCardsStore().dispatchUpdateDebitCardStatus).toHaveBeenCalled()
  })

  it('displays the correct card details', async () => {
    const otherDetails = wrapper.find('.other-details')
    const arrowIcon = otherDetails.findAll('.arrow-icon')
    await arrowIcon[0].trigger('click')
    const cardDetails = wrapper.find('.details')
    const allCardDetails = cardDetails.findAll('p')
    expect(allCardDetails[0].text()).toContain('Card Name: Mark Henry')
    expect(allCardDetails[1].text()).toContain('Card Number: 1234-5678-9012-2020')
    expect(allCardDetails[2].text()).toContain('Expiry Date: 12/20')
    expect(allCardDetails[3].text()).toContain('CVV: 123')
    expect(allCardDetails[4].text()).toContain('Card Status: UNFROZEN')
  })

  it('displays "No data" when there are no transactions', async () => {
    const otherDetails = wrapper.find('.other-details')
    const arrowIcon = otherDetails.findAll('.arrow-icon')
    await arrowIcon[1].trigger('click')
    expect(otherDetails.find('.no-data').text()).toContain('No data')
  })

  it('renders the correct number of transactions when available', async () => {
    const store = useCardsStore()
    store.debitCardsDetails[0].transactions = [
      {
        id: 1,
        name: 'Transaction 1',
        date: '2025-04-20',
        type: TransactionType.CHARGED,
        amount: 100,
        image: '',
      },
      {
        id: 2,
        name: 'Transaction 2',
        date: '2025-04-19',
        type: TransactionType.REFUND,
        amount: 50,
        image: '',
      },
    ]

    const otherDetails = wrapper.find('.other-details')
    const arrowIcon = otherDetails.findAll('.arrow-icon')
    await arrowIcon[1].trigger('click')
    const transactionItems = wrapper.findAll('ul li')
    expect(transactionItems.length).toBe(2)
  })
})
