import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NavigationBar from '../NavigationBar.vue'
import NavigationItems from '../NavigationItems.vue'
import { useIsWeb } from '../../composables/useIsWeb'

// Mock the composable
vi.mock('@/composables/useIsWeb', () => ({
  useIsWeb: vi.fn(),
}))

describe('NavigationBar.vue', () => {
  it('renders the mobile logo when isWeb is false', () => {
    ;(useIsWeb as ReturnType<typeof vi.fn>).mockReturnValue({ isWeb: false })
    const wrapper = shallowMount(NavigationBar)
    expect(wrapper.find('.mobile-logo').exists()).toBe(true)
    expect(wrapper.find('.navigation-bar img[alt="logo"]').exists()).toBe(false)
    expect(wrapper.find('.description').exists()).toBe(false)
  })

  it('renders the web logo and description when isWeb is true', () => {
    ;(useIsWeb as ReturnType<typeof vi.fn>).mockReturnValue({ isWeb: true })
    const wrapper = shallowMount(NavigationBar)
    expect(wrapper.find('.mobile-logo').exists()).toBe(false)
    expect(wrapper.find('.navigation-bar img[alt="logo"]').exists()).toBe(true)
    expect(wrapper.find('.description').exists()).toBe(true)
  })

  it('always renders the NavigationItems component', () => {
    ;(useIsWeb as ReturnType<typeof vi.fn>).mockReturnValue({ isWeb: true })
    const wrapper = shallowMount(NavigationBar)
    expect(wrapper.findComponent(NavigationItems).exists()).toBe(true)
  })
})
