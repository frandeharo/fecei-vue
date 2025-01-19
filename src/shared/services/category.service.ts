import type { Category } from '../interfaces/category'
import tokenApi from '@/api/privateApi'

class CategoryService {
  axiosToken = tokenApi

  async getAll(): Promise<Category[]> {
    const clients = await this.axiosToken
      .get<Category[]>('/categories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        if (error.response?.status === 404) {
          throw new Error('Servidor no encontrado')
        }
        if (error.response?.status === 404) {
          throw new Error('No tiene permisos para buscar clientes')
        }
        throw new Error('Error al buscar clientes')
      })
    return clients
  }

  async getOne(id: number): Promise<Category> {
    const client = await this.axiosToken
      .get<Category>(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        if (error.response?.status === 404) {
          throw new Error('Servidor no encontrado')
        }
        if (error.response?.status === 404) {
          throw new Error('No tiene permisos para obtener la categoría')
        }
        throw new Error('Error al obtener los datos de la categoría')
      })
    return client
  }
}

export default new CategoryService()
