import { useQuery } from '@tanstack/vue-query'
import proposalsService from '../services/proposals.service'

const useDrafts = () => {
  const service = proposalsService

  const { isLoading, data } = useQuery({
    queryKey: ['drafts'],
    queryFn: () => service.getDrafts(),
  })

  return {
    isLoading,
    data,
  }
}

export default useDrafts
