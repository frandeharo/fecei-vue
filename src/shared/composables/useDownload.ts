import { useQuery } from '@tanstack/vue-query'

import { ref } from 'vue'
import saveAs from 'file-saver'
import { useToast } from 'primevue'
import sharedService from '../services/shared.service'

const useDownload = () => {
  const toast = useToast()
  const id = ref<number>()
  const field = ref<string>()
  const name = ref<string>()

  const { refetch, isLoading: isLoadingPdf } = useQuery({
    queryKey: ['download', id.value],
    queryFn: async () => sharedService.downloadFile(+id.value!, field.value!),
    enabled: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
  })

  const getExtension = (file_name: string) => {
    const extension = file_name.split('.').pop()
    return extension
  }

  return {
    isLoadingPdf,
    downloadDoc: (idProposal: number, field_name: string, name_doc: string) => {
      id.value = idProposal
      field.value = field_name
      name.value = name_doc

      refetch()
        .then((response) => {
          const extension = getExtension(name_doc)
          const fileName = `${name_doc}.${extension}`

          saveAs(response.data as Blob, fileName)
        })
        .catch(() => {
          toast.add({ severity: 'error', summary: 'Error', detail: 'Error al descargar el pdf' })
        })
    },
  }
}

export default useDownload
