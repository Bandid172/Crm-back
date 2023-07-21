import { ref } from 'vue'

export const isClicked = ref(false)
export const togglePopUpWindow = () => (isClicked.value = !isClicked.value)