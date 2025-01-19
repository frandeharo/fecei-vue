/* eslint-disable @typescript-eslint/no-explicit-any */
import authService from '@/auth/services/auth.service'
import { CustomError } from '@/shared/errors/customError'
import { defineStore } from 'pinia'
import { useToast } from 'primevue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast()

  const router = useRouter()
  const auth = authService
  const name = ref<string>('')
  const user = ref<number | null>(null)
  const status = ref<string>('idle')
  const token = ref<string | null>(localStorage.getItem('token'))
  const role = ref<string | null>(localStorage.getItem('role'))
  const hasError = ref<boolean>(false)
  const errorMessage = ref<string>('')

  const setError = (error: boolean, message: string) => {
    hasError.value = error
    errorMessage.value = message
  }

  const setStatus = (newStatus: string) => (status.value = newStatus)
  const setToken = (newToken: string | null) => (token.value = newToken)
  const setName = (newName: string) => (name.value = newName)
  const setUser = (newUser: number) => (user.value = newUser)
  const setRole = (newRole: string) => (role.value = newRole)

  const login = async (email: string, password: string) => {
    try {
      const res = await auth.login({ email, password })

      localStorage.setItem('token', res.token)
      localStorage.setItem('name', res.name)
      localStorage.setItem('role', res.role)
      setStatus('authenticated')
      setToken(res.token)
      setUser(res.i)
      setName(res.name)
      setRole(res.role)

      setError(false, '')
      router.push({ name: 'home' })
    } catch (error: any) {
      console.log(error)
      toast.add({ severity: 'error', summary: 'Error', detail: error.msg })
      setStatus('idle')
      setToken(null)
      setUser(0)
      setName('')
      setRole('')
      setError(true, error.message)
    }
  }

  const checkStatus = async () => {
    try {
      const token = localStorage.getItem('token')

      if (!token) throw new CustomError('Token Inválido', 401)

      const res = await auth.checkToken()
      if (!res) throw new CustomError('Token Inválido', 401)

      setStatus('authenticated')
      setName(localStorage.getItem('name') || '')
      setRole(localStorage.getItem('role') || '')
      return true
    } catch (error: any) {
      logout()
      setError(true, error.msg)
    }
  }

  const changePassword = async (password: string) => {
    try {
      await auth.changePassword(password, localStorage.getItem('i') || '')
      toast.add({
        severity: 'success',
        summary: 'Contraseña cambiada',
        detail: 'La contraseña se ha cambiado correctamente',
      })
      logout()
    } catch (error) {
      console.log(error)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se ha podido cambiar la contraseña',
      })
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      await auth.register({ email, password, nombre: name })
      toast.add({
        severity: 'success',
        summary: 'Usuario registrado',
        detail: 'El usuario se ha registrado correctamente',
      })
      setError(false, '')
      await login(email, password)
    } catch (error: any) {
      console.log(error)
      setError(true, error.msg)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.msg,
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('i')
    localStorage.removeItem('role')
    setStatus('idle')
    setToken(null)
    setUser(0)
    setName('')
    setRole('')
    router.push({ name: 'login' })
  }

  return {
    login,
    checkStatus,
    hasError,
    errorMessage,
    token,
    status,
    name,
    logout,
    changePassword,
    register,
    role,
  }
})
