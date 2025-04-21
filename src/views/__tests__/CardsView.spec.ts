import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import CardsView from '../CardsView.vue'
import MyDebitCards from '@/components/MyDebitCards.vue'
import AddNewCard from '@/components/AddNewCard.vue'

const mockDispatchGetDebitCardsDetails = vi.fn()

vi.mock('@/stores/cards', () => ({
  useCardsStore: vi.fn(() => ({
    dispatchGetDebitCardsDetails: mockDispatchGetDebitCardsDetails,
  })),
}))

const createWrapper = () => {
  return shallowMount(CardsView, {
    global: {
      stubs: {
        'el-tabs': false,
        'el-tab-pane': false,
      },
    },
  })
}

describe('CardsView.vue', () => {
  it('renders loading state when data is fetched', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.find('.error').exists()).toBe(false)
    expect(wrapper.find('.balance-container').exists()).toBe(false)
  })

  it('renders error state when data fetch is failed', async () => {
    mockDispatchGetDebitCardsDetails.mockReturnValueOnce(
      Promise.reject(new Error('Failed to fetch data')),
    )
    const wrapper = createWrapper()
    await wrapper.vm.$nextTick() // Wait for the next tick to ensure the error state is rendered
    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.find('.loading').exists()).toBe(false)
    expect(wrapper.find('.balance-container').exists()).toBe(false)
  })

  it('renders balance and tabs when data is loaded', async () => {
    const wrapper = createWrapper()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.balance-container').exists()).toBe(true)
    expect(wrapper.find('.amount').text()).toBe('3,000')
    expect(wrapper.findComponent(MyDebitCards).exists()).toBe(true)
  })

  it('toggles isAddNewCardVisible when "New card" button is clicked', async () => {
    const wrapper = createWrapper()
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(AddNewCard).attributes('modelvalue')).toBe('false')
    const button = wrapper.find('.add-card-btn')
    await button.trigger('click')
    expect(wrapper.findComponent(AddNewCard).attributes('modelvalue')).toBe('true')
  })

  it('calls getDebitCardsDetails on mounted', () => {
    createWrapper()
    expect(mockDispatchGetDebitCardsDetails).toHaveBeenCalledWith(1)
  })
})
