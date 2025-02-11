/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref, toRaw } from 'vue'
import type { DraftFrm } from '../interfaces/draftFrm'
import proposalsService from '../services/proposals.service'
import { useToast } from 'primevue'
import { useRouter } from 'vue-router'

const useDraftMutation = () => {
  const toast = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()

  const visibleDialog = ref(false)
  const selectedProposal = ref<number | null>()

  const dataFromdraft = (e: any) => {
    const newData: Record<string, any> = {}

    Object.keys(e).forEach((key) => {
      if (e[key].states.value !== undefined) {
        newData[key] = toRaw(e[key].states.value)
      }
    })
    delete newData.undefined

    return newData
  }

  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (data: DraftFrm) => proposalsService.createDraft(data),
    onError: (error) => {
      console.log(error)
      toast.add({
        severity: 'error',
        summary: 'Error al Guardar',
        detail: 'Contacte con el administrador',
      })
    },
    onSuccess: (data) => {
      toast.add({
        severity: 'success',
        summary: 'Nuevo Borrador',
        detail: 'Se ha creado un nuevo borrador',
      })

      router.replace({ name: 'edit-proposal', params: { id: data.proposal_id } })
    },
  })

  const { isPending: isPendingUpdateSend, mutate: mutateUpdateSend } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: DraftFrm }) =>
      proposalsService.updateAndSendProposal(id, data),
    onError: (error) => {
      console.log(error)
      toast.add({
        severity: 'error',
        summary: 'Error al Guardar',
        detail: 'Contacte con el administrador',
      })
    },
    onSuccess: (data) => {
      toast.add({
        severity: 'success',
        summary: 'Propuesta enviada',
        detail: 'Propuesta actualizada y enviada correctamente',
      })

      queryClient.refetchQueries({
        queryKey: ['draft'],
        exact: false,
      })
      router.replace({ name: 'home', params: { id: data.proposal_id } })
    },
  })

  const {
    isPending: isPendingSend,
    isSuccess: isSuccessSend,
    mutate: mutateSend,
  } = useMutation({
    mutationFn: (data: DraftFrm) => proposalsService.createDraft(data),
    onError: (error) => {
      console.log(error)
      toast.add({
        severity: 'error',
        summary: 'Error al Guardar',
        detail: 'Contacte con el administrador',
      })
    },
    onSuccess: (data) => {
      toast.add({ severity: 'success', summary: 'Borrador Guardado', detail: '' })
      router.replace({ name: 'edit-proposal', params: { id: data.proposal_id } })
    },
  })

  const { isPending: isPendingUpdate, mutate: mutateUpdate } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: DraftFrm }) =>
      proposalsService.updateDraft(id, data),
    onError: (error) => {
      console.log(error)
      toast.add({
        severity: 'error',
        summary: 'Error al Guardar',
        detail: 'Contacte con el administrador',
      })
    },
    onSuccess: (data) => {
      toast.add({ severity: 'success', summary: 'Borrador Guardado', detail: '' })

      queryClient.refetchQueries({
        queryKey: ['draft'],
        exact: false,
      })

      router.replace({ name: 'edit-proposal', params: { id: data.proposal_id } })
    },
  })

  const { mutate: openProposal } = useMutation({
    mutationFn: (id: number) => proposalsService.openProposal(id),
    onError: () => {
      toast.add({
        severity: 'error',
        summary: 'Error al abrir la propuesta',
        detail: 'Contacte con el administrador',
      })
    },
    onSuccess: () => {
      toast.add({ severity: 'success', summary: 'Propuesta abierta', detail: '' })
      queryClient.refetchQueries({
        queryKey: ['drafts'],
        exact: false,
      })
    },
  })

  // delete
  const { mutate: deleteProposal } = useMutation({
    mutationFn: () => proposalsService.deleteProposal(selectedProposal.value!),
    onError: () => {
      toast.add({
        severity: 'error',
        summary: 'Error al eliminar la propuesta',
        detail: 'Contacte con el administrador',
      })
    },
    onSuccess: () => {
      toast.add({
        severity: 'error',
        summary: 'Propuesta eliminada',
        detail: `La propuesta #${selectedProposal.value} ha sido eliminada`,
      })
      queryClient.refetchQueries({
        queryKey: ['drafts'],
        exact: false,
      })
      queryClient.refetchQueries({
        queryKey: ['draft'],
        exact: false,
      })
      visibleDialog.value = false
    },
  })

  return {
    isPending,
    isPendingSend,
    isPendingUpdate,
    isPendingUpdateSend,
    isError,
    error,
    isSuccess,
    isSuccessSend,
    visibleDialog,
    selectedProposal,
    saveDraft: (data: DraftFrm) => {
      const newData = dataFromdraft(data)

      if (newData.id !== undefined) {
        mutateUpdate({ id: newData.id, data: newData as DraftFrm })
        return
      } else {
        mutate(newData as DraftFrm)
        return
      }
    },
    sendProposal: (data: DraftFrm) => {
      data.status = 'SENT'

      if (data.id !== undefined) {
        mutateUpdateSend({ id: data.id, data: data })
        return
      } else {
        mutateSend(data)
        return
      }
    },
    openProposal: (id: number) => openProposal(id),
    deleteProposal,
    openDialog: (id: number) => {
      selectedProposal.value = id
      visibleDialog.value = true
    },
  }
}

export default useDraftMutation
