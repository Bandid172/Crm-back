import { ref, computed, onMounted, onUnmounted } from 'vue'

export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH = 256
export const SIDEBAR_WIDTH_COLLAPSED = 48

const sidebarWidth = computed(() =>
    `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)

const handleResize = () => {
    if (window.innerWidth <= 768) {
        collapsed.value = true
    } else {
        collapsed.value = false
    }
}

export function useWindowResize() {
    onMounted(() => {
        window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
    })
}

// Call the handleResize function initially to set the initial collapsed state
handleResize()

// Export the computed sidebarWidth
export { sidebarWidth }