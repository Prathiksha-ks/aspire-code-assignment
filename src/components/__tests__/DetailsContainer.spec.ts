import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import DetailsContainer from '../DetailsContainer.vue'

// Mock the getImageUrl function
vi.mock('@/utils/index', () => ({
  getImageUrl: vi.fn(() => {
    return '/src/assets/test-icon.svg'
  }),
}))

describe('DetailsContainer.vue', () => {
  it('renders the component with props', () => {
    const wrapper = shallowMount(DetailsContainer, {
      props: {
        text: 'Test Text',
        icon: 'test-icon',
      },
    })

    expect(wrapper.find('p').text()).toBe('Test Text')
    expect(wrapper.find('img').attributes('src')).toContain('/src/assets/test-icon.svg')
  })

  it('toggles isClose state when arrow icon is clicked', async () => {
    const wrapper = shallowMount(DetailsContainer, {
      props: {
        text: 'Test Text',
        icon: 'test-icon',
      },
    })

    const arrowIcon = wrapper.find('.arrow-icon')
    expect(arrowIcon.classes()).not.toContain('open-icon')

    await arrowIcon.trigger('click')
    expect(arrowIcon.classes()).toContain('open-icon')

    await arrowIcon.trigger('click')
    expect(arrowIcon.classes()).not.toContain('open-icon')
  })

  it('renders slot content when isClose is false', async () => {
    const wrapper = shallowMount(DetailsContainer, {
      props: {
        text: 'Test Text',
        icon: 'test-icon',
      },
      slots: {
        details: '<div class="slot-content">Slot Content</div>',
      },
    })

    expect(wrapper.find('.slot-content').exists()).toBe(false)

    await wrapper.find('.arrow-icon').trigger('click')
    expect(wrapper.find('.slot-content').exists()).toBe(true)
  })
})
