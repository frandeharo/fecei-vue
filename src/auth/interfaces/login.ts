export interface LoginFrm {
  email: string
  password: string
}

export interface LoginResponse {
  i: number
  token: string
  name: string
  role: string
}

export interface RegisterFrm {
  email: string
  nombre: string
  password: string
}

export interface RegisterResponse {
  success: boolean
  message: string
  user: User
}

export interface User {
  id: string
  nombre: string
  email: string
}
