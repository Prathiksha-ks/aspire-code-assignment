import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NavigationItems from '../NavigationItems.vue'
import HomeIcon from '../icons/HomeIcon.vue'
import CardIcon from '../icons/CardIcon.vue'
import PaymentsIcon from '../icons/PaymentsIcon.vue'
import CreditIcon from '../icons/CreditIcon.vue'
import ProfileIcon from '../icons/ProfileIcon.vue'

const mockPush = vi.fn()

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    name: 'home',
  })),
  useRouter: (): { push: typeof mockPush } => ({
    push: mockPush,
  }),
}))

describe('NavigationItems.vue', () => {
  const iconsList = [
    { component: HomeIcon, title: 'Home', routeName: 'home' },
    { component: CardIcon, title: 'Cards', routeName: 'cards' },
    { component: PaymentsIcon, title: 'Payments', routeName: 'payments' },
    { component: CreditIcon, title: 'Credit', routeName: 'credit' },
    { component: ProfileIcon, title: 'Profile', routeName: 'profile' },
  ]

  it('renders the correct number of navigation items', () => {
    const wrapper = shallowMount(NavigationItems)
    expect(wrapper.findAll('.item').length).toBe(iconsList.length)
  })

  it('renders the correct icons and titles', () => {
    const wrapper = shallowMount(NavigationItems)
    const items = wrapper.findAll('.item')

    items.forEach((item, index) => {
      const icon = item.findComponent(iconsList[index].component)
      expect(icon.exists()).toBe(true)
      expect(item.find('.title').text()).toBe(iconsList[index].title)
    })
  })

  it('navigates to the correct route on click', async () => {
    const wrapper = shallowMount(NavigationItems)

    const items = wrapper.findAll('.item')
    for (let i = 0; i < iconsList.length; i++) {
      await items[i].trigger('click')
      expect(mockPush).toHaveBeenCalledWith({ name: iconsList[i].routeName })
    }
  })

  it('applies the active class to the correct active item', async () => {
    const wrapper = shallowMount(NavigationItems)
    const items = wrapper.findAll('.item')

    for (let i = 0; i < iconsList.length; i++) {
      await items[i].trigger('click')
      expect(items[i].find('.title').classes()).toContain('clicked')
      items.forEach((item, index) => {
        if (index !== i) {
          expect(item.find('.title').classes()).not.toContain('clicked')
        }
      })
    }
  })
})
