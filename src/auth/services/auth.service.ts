import loginApi from '@/api/publicApi'
import type { LoginFrm, LoginResponse, RegisterFrm } from '../interfaces/login'
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
      .post<[boolean]>(
        '/check',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((response) => response.data[0])
      .catch((error) => {
        console.log(error)
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

  async register(credentials: RegisterFrm): Promise<LoginResponse> {
    return await this.axios
      .post<LoginResponse>('/register', credentials)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response?.status === 404) {
          throw new CustomError('Usuario no encontrado', 404)
        }
        if (error.response?.status === 400) {
          throw new CustomError('Email ya registrado', 400)
        }
        if (error.response?.status === 403) {
          throw new CustomError('Credenciales Incorrectas', 403)
        }
        throw new CustomError('Error al iniciar sesión', 500)
      })
  }
}

export default new AuthService()
