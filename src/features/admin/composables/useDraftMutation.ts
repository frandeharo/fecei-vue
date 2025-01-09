/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/vue-query'
import { toRaw } from 'vue'
import type { DraftFrm } from '../interfaces/draftFrm'
import proposalsService from '../services/proposals.service'
import { useToast } from 'primevue'
import { useRouter } from 'vue-router'

const useDraftMutation = () => {
  const toast = useToast()
  const router = useRouter()

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
        summary: 'Propuesta enviada',
        detail: 'Se ha enviado correctamente',
      })
      router.replace({ name: 'home', params: { id: data.proposal_id } })
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
      router.replace({ name: 'edit-proposal', params: { id: data.proposal_id } })
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
  }
}

export default useDraftMutation
