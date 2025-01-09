import loginApi from '@/api/publicApi'
import type { LoginFrm, LoginResponse } from '../interfaces/login'
import { CustomError } from '@/shared/errors/customError'
import tokenApi from '@/api/privateApi'

class AuthService {
  axios = loginApi
  axiosToken = tokenApi

  async login(credentials: LoginFrm): Promise<LoginResponse> {
    return await this.axios
      .post<LoginResponse>('/login', credentials)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response?.status === 404) {
          throw new CustomError('Usuario no encontrado', 404)
        }
        if (error.response?.status === 403) {
          throw new CustomError('Credenciales Incorrectas', 403)
        }

        throw new CustomError('Error al iniciar sesión', 500)
      })
  }

  async checkToken(): Promise<boolean> {
    return await this.axiosToken
      .post<[boolean]>('/check')
      .then((response) => response.data[0])
      .catch((error) => {
        if (error.response?.status === 401) {
          throw new Error('Token inválido')
        }

        throw new Error('Error al validar token')
      })
  }

  async changePassword(password: string, user: string): Promise<{ password: string }> {
    return await this.axiosToken
      .patch<{ password: string }>(`/change-password/${user}/`, { password })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          throw new Error('Token inválido')
        }

        throw new Error('Error al validar token')
      })
  }
}

export default new AuthService()
