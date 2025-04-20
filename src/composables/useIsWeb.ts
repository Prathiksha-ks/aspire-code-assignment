import { ref, onBeforeMount, onUnmounted } from 'vue'

export function useIsWeb() {
  const isWeb = ref<boolean>(true)

  const handleResize = () => {
    isWeb.value = window.innerWidth > 1024 // Minimum width for web
  }

  onBeforeMount(() => {
    handleResize() // Initialize on mount
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return { isWeb }
}
