import type { Category } from '@/shared/interfaces/category'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('categories', () => {
  const currentPage = ref<number>(1)
  const querySearch = ref<string>('')

  const categories = ref<Category[]>([])

  return {
    // State properties
    currentPage,
    querySearch,
    categories,
    // Getters

    // Actions
    setCategories(newClients: Category[]) {
      categories.value = newClients
    },
    setPage(page: number) {
      if (currentPage.value === page) return
      if (page <= 0) return
      currentPage.value = page
    },
  }
})
