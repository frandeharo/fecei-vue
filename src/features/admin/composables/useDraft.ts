import { useQuery } from '@tanstack/vue-query'
import proposalsService from '../services/proposals.service'
import { ref, watch } from 'vue'
import type { Proposal } from '../interfaces/proposal'

const useDraft = (draftId: number) => {
  const service = proposalsService
  const draft = ref<Proposal>()

  const { isLoading, data } = useQuery({
    queryKey: ['draft', draftId],
    queryFn: () => service.getDraft(draftId),
    staleTime: 0,
  })

  watch(
    data,
    () => {
      if (data) draft.value = { ...data.value! }
    },
    { immediate: true },
  )

  return {
    isLoading,
    draft,
  }
}

export default useDraft
