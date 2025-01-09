import tokenApi from '@/api/privateApi'

class SharedService {
  axiosToken = tokenApi

  async downloadFile(id: number, field: string): Promise<Blob> {
    return await this.axiosToken
      .get<Blob>(`/proposals/download/${id}/${field}`, { responseType: 'blob' })
      .then((response) => response.data)
      .catch((error) => {
        if (error.response?.status === 404) {
          throw new Error('Servidor no encontrado')
        }
        if (error.response?.status === 404) {
          throw new Error('No tiene permisos para descargar el fichero')
        }
        throw new Error('Error al descargar')
      })
  }
}

export default new SharedService()
