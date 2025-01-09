import { useAuthStore } from '@/stores/auth.store'
import type { LoginFrm } from '../interfaces/login'
import { computed } from 'vue'

const useAuth = () => {
  const initialValues: LoginFrm = {
    email: '',
    password: '',
  }
  const store = useAuthStore()

  return {
    initialValues,
    hasError: computed(() => store.hasError),
    errorMessage: computed(() => store.errorMessage),
    token: computed(() => store.token),
    name: computed(() => store.name),
    login: (data: LoginFrm) => store.login(data.email, data.password),
    logout: () => store.logout(),
    changePassword: (password: string) => store.changePassword(password),
  }
}

export default useAuth
