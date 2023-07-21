import { ref } from 'vue'

export const isCalled = ref(false)
export const toggleIsCalled = () => (isCalled.value = !isCalled.value)