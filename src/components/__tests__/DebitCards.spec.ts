import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import DebitCards from '../DebitCards.vue'
import { debitCardsDetails } from '@/api/data/dummyData'

const createWrapper = () =>
  shallowMount(DebitCards, {
    props: { debitCardsDetails: debitCardsDetails },
    global: {
      stubs: {
        'el-carousel': false,
        'el-carousel-item': false,
      },
    },
  })

describe('DebitCards.vue', () => {
  it('toggles card number visibility properly', async () => {
    const wrapper = createWrapper()

    const button = wrapper.find('.show-card-number')
    expect(button.text()).toBe('Show card number')

    await button.trigger('click')
    expect(button.text()).toBe('Hide card number')

    await button.trigger('click')
    expect(button.text()).toBe('Show card number')
  })

  it('renders the correct number of cards', () => {
    const wrapper = createWrapper()
    const cards = wrapper.findAll('.el-carousel__item')
    expect(cards.length).toBe(debitCardsDetails.length)
  })

  it('formats card number correctly', async () => {
    const wrapper = createWrapper()
    expect(wrapper.findAll('.card-number')[0].text()).toBe('2020')
    const button = wrapper.find('.show-card-number')
    await button.trigger('click')
    expect(wrapper.findAll('.card-number')[0].text()).toBe('1234 5678 9012 2020')
  })

  it('masks CVV correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper.findAll('.cvv')[0].text()).toBe('CVV: ***')
  })

  it('applies grey-out class for frozen cards', () => {
    const wrapper = createWrapper()
    const cards = wrapper.findAll('.el-carousel__item')
    expect(cards[0].classes()).not.toContain('grey-out')
    expect(cards[2].classes()).toContain('grey-out')
  })
})
