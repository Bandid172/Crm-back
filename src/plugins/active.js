import { ref } from 'vue'

export const isActive = ref(false)
export const toggleModalWindow = () => (isActive.value = !isActive.value)