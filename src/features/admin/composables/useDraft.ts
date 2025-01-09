import { useQuery } from '@tanstack/vue-query'
import proposalsService from '../services/proposals.service'

const useDraft = (draftId: number) => {
  const service = proposalsService

  const { isLoading, data } = useQuery({
    queryKey: ['draft', draftId],
    queryFn: () => service.getDraft(draftId),
  })

  return {
    isLoading,
    data,
  }
}

export default useDraft
