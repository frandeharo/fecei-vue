import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import { useCategoryStore } from '@/stores/category.store'
import categoryService from '../services/category.service'

const useCategories = () => {
  const service = categoryService
  const store = useCategoryStore()
  const { currentPage, categories } = storeToRefs(store)

  const { isLoading, data } = useQuery({
    queryKey: ['categories', currentPage],
    queryFn: () => service.getAll(),
    staleTime: 1000 * 60 * 5,
  })

  watch(
    data,
    (categories) => {
      if (categories) store.setCategories(categories)
    },
    { immediate: true },
  )

  return {
    isLoading,
    categories,
  }
}

export default useCategories
