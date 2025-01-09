/* eslint-disable @typescript-eslint/no-explicit-any */
import tokenApi from '@/api/privateApi'
import type { DraftFrm } from '../interfaces/draftFrm'
import type { Proposal } from '../interfaces/proposal'

import moment from 'moment'

class ProposalService {
  axiosToken = tokenApi

  private transformData(data: DraftFrm) {
    const { url_doc_1, url_doc_2, url_doc_3, url_doc_4, url_image, ...json } = data

    const files = {
      url_doc_1,
      url_doc_2,
      url_doc_3,
      url_doc_4,
      url_image,
    }

    const newJson = this.cleanObject(json)
    const newFiles = this.cleanObject(files)

    return { newJson, newFiles }
  }

  private cleanObject(obj: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== null))
  }

  async createDraft(data: DraftFrm): Promise<any> {
    const newData = this.transformData(data)

    const formData = new FormData()

    // Agregar datos al FormData
    Object.entries(newData.newJson).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    Object.entries(newData.newFiles).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file as string | Blob)
      }
    })

    return await this.axiosToken
      .post<any>(`/proposals`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response: any) => response.data)
      .catch((error: any) => {
        if (error.response?.status === 400) {
          throw new Error('Datos incorrectos')
        }
        if (error.response?.status === 403) {
          throw new Error('No tiene permisos para crear el cliente')
        }
        throw new Error('Error al crear cliente')
      })
  }

  async sendProposal(data: DraftFrm): Promise<any> {
    const newData = this.transformData(data)

    const formData = new FormData()

    // Agregar datos al FormData
    Object.entries(newData.newJson).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    Object.entries(newData.newFiles).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file as string | Blob)
      }
    })

    return await this.axiosToken
      .post<any>(`/proposals`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response: any) => response.data)
      .catch((error: any) => {
        if (error.response?.status === 400) {
          throw new Error('Datos incorrectos')
        }
        if (error.response?.status === 403) {
          throw new Error('No tiene permisos para crear el cliente')
        }
        throw new Error('Error al crear cliente')
      })
  }

  async updateDraft(id: number, data: DraftFrm): Promise<any> {
    const newData = this.transformData(data)

    const formData = new FormData()

    // Agregar datos al FormData
    Object.entries(newData.newJson).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    Object.entries(newData.newFiles).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file as string | Blob)
      }
    })

    return await this.axiosToken
      .post<any>(`/proposals/edit/${id}`, formData)
      .then((response: any) => response.data)
      .catch((error: any) => {
        if (error.response?.status === 400) {
          throw new Error('Datos incorrectos')
        }
        if (error.response?.status === 403) {
          throw new Error('No tiene permisos para crear el cliente')
        }
        throw new Error('Error al crear cliente')
      })
  }

  async updateAndSendProposal(id: number, data: DraftFrm): Promise<any> {
    const newData = this.transformData(data)

    const formData = new FormData()

    // Agregar datos al FormData
    Object.entries(newData.newJson).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    Object.entries(newData.newFiles).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file as string | Blob)
      }
    })

    return await this.axiosToken
      .post<any>(`/proposals/edit/${id}`, formData)
      .then((response: any) => response.data)
      .catch((error: any) => {
        if (error.response?.status === 400) {
          throw new Error('Datos incorrectos')
        }
        if (error.response?.status === 403) {
          throw new Error('No tiene permisos para crear el cliente')
        }
        throw new Error('Error al crear cliente')
      })
  }

  async getDraft(id: number): Promise<Proposal> {
    return await this.axiosToken
      .get<Proposal>(`/proposals/${id}`)
      .then((response: any) => {
        const { url_doc_1, url_doc_2, url_doc_3, url_doc_4, url_image, ...data } = response.data
        return {
          ...data,
          doc_1: url_doc_1 ? url_doc_1 : null,
          doc_2: url_doc_2 ? url_doc_2 : null,
          doc_3: url_doc_3 ? url_doc_3 : null,
          doc_4: url_doc_4 ? url_doc_4 : null,
          image: url_image ? url_image : null,
        }
      })
      .catch((error: any) => {
        if (error.response?.status === 400) {
          throw new Error('Datos incorrectos')
        }
        if (error.response?.status === 403) {
          throw new Error('No tiene permisos para crear el cliente')
        }
        throw new Error('Error al crear cliente')
      })
  }

  async getDrafts(): Promise<Proposal[]> {
    return await this.axiosToken
      .get<Proposal[]>('/proposals')
      .then((response: any) => {
        return response.data.map((data: Proposal) => {
          return {
            ...data,
            created_at: moment(data.created_at).format('DD/MM/YYYY hh:mm:ss').toString(),
            updated_at: data.updated_at
              ? moment(data.updated_at).format('DD/MM/YYYY hh:mm:ss').toString()
              : '',
          }
        })
      })
      .catch((error: any) => {
        if (error.response?.status === 400) {
          throw new Error('Datos incorrectos')
        }
        if (error.response?.status === 403) {
          throw new Error('No tiene permisos para crear el cliente')
        }
        throw new Error('Error al crear cliente')
      })
  }
}

export default new ProposalService()
